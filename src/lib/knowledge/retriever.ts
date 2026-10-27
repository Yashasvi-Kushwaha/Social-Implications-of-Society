import { CURATED_EVIDENCE_DATASET } from "./dataset";
import { EvidenceRecord, RetrievalResult } from "./types";

/**
 * Normalizes text for comparison by lowercasing, stripping excessive punctuation,
 * and collapsing multiple whitespace characters.
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Checks whether an alias or target term appears as a whole word or distinct token in the query.
 */
function containsTerm(normalizedQuery: string, term: string): boolean {
  const normalizedTerm = normalizeText(term);
  if (!normalizedTerm) return false;
  // Match as word boundary or exact substring
  const regex = new RegExp(`\\b${normalizedTerm}\\b`, "i");
  return regex.test(normalizedQuery) || normalizedQuery.includes(normalizedTerm);
}

/**
 * Common broad terms that do not constitute a specific investigable claim.
 */
const AMBIGUOUS_BROAD_TERMS = new Set([
  "ayurveda",
  "ayurvedic",
  "medicine",
  "herb",
  "herbs",
  "natural cure",
  "wellness",
  "health",
  "remedy",
  "remedies",
  "cure",
  "detox",
  "treatment",
  "disease"
]);

/**
 * Evaluates direct relevance of a user's health claim against the curated evidence dataset.
 * Adheres strictly to epistemic safety:
 * 1. Checks input validity.
 * 2. Distinguishes overly broad queries from specific claims.
 * 3. Distinguishes topic mentions from supported clinical claims.
 * 4. Yields INSUFFICIENT_CURATED_EVIDENCE rather than speculating on novel claims.
 */
export function retrieveCuratedEvidence(query: string): RetrievalResult {
  const trimmed = query.trim();

  // 1. Input Validation
  if (!trimmed || trimmed.length < 3) {
    return {
      statusCode: "INVALID_INPUT",
      query,
      confidenceScore: 0,
      relevanceRationale: "The submitted claim is empty or too short to analyze. Please provide a clear claim sentence (minimum 3 characters).",
      verifiedSources: [],
      safetyWarnings: ["Input too short for scientific evaluation."],
    };
  }

  if (trimmed.length > 500) {
    return {
      statusCode: "INVALID_INPUT",
      query,
      confidenceScore: 0,
      relevanceRationale: "The submitted claim exceeds the 500-character safety limit. Please refine your query into a concise claim statement.",
      verifiedSources: [],
      safetyWarnings: ["Input length exceeds permitted bounds."],
    };
  }

  const normalized = normalizeText(trimmed);
  const words = normalized.split(" ");

  // 2. Ambiguous / Overly Broad Query Detection
  const allBroad = words.every((w) => AMBIGUOUS_BROAD_TERMS.has(w));
  if (allBroad) {
    return {
      statusCode: "AMBIGUOUS_QUERY",
      query,
      confidenceScore: 0.1,
      relevanceRationale:
        "The query contains only general wellness terminology without specifying a particular botanical entity (e.g., Turmeric, Ashwagandha, Bhasma) or target health outcome. Please specify both the botanical/formulation and the condition.",
      verifiedSources: [],
      safetyWarnings: [
        "Broad queries lack sufficient clinical specificity for evidence verification."
      ],
    };
  }

  // 3. Evaluate Candidate Matches Across Curated Records
  interface CandidateMatch {
    record: EvidenceRecord;
    entityScore: number;
    outcomeScore: number;
    totalScore: number;
    matchedEntities: string[];
    matchedOutcomes: string[];
    triggeredRejections: string[];
  }

  const candidates: CandidateMatch[] = [];

  for (const record of CURATED_EVIDENCE_DATASET) {
    // A. Check entity matches
    const matchedEntities = record.entityAliases.filter((alias) =>
      containsTerm(normalized, alias)
    );

    // B. Check target outcome / indication matches
    const matchedOutcomes = record.targetOutcomes.filter((outcome) =>
      containsTerm(normalized, outcome)
    );

    // C. Check rejection triggers (unsupported exaggerations or false targets)
    const triggeredRejections = (record.rejectionTriggers || []).filter((trigger) =>
      containsTerm(normalized, trigger)
    );

    const entityScore = matchedEntities.length > 0 ? 0.5 : 0;
    const outcomeScore = matchedOutcomes.length > 0 ? 0.5 : 0;
    const totalScore = entityScore + outcomeScore;

    if (matchedEntities.length > 0 || matchedOutcomes.length > 0) {
      candidates.push({
        record,
        entityScore,
        outcomeScore,
        totalScore,
        matchedEntities,
        matchedOutcomes,
        triggeredRejections,
      });
    }
  }

  // Sort candidate matches by totalScore descending
  candidates.sort((a, b) => b.totalScore - a.totalScore);
  const bestCandidate = candidates[0];

  // 4. Case: No Entity or Outcome Matched (Completely Unrelated to Curated Archive)
  if (!bestCandidate || bestCandidate.totalScore === 0) {
    return {
      statusCode: "INSUFFICIENT_CURATED_EVIDENCE",
      query,
      confidenceScore: 0,
      relevanceRationale:
        "Insufficient Curated Evidence: No peer-reviewed biomedical trials or classical treatise entries in our curated archive address this claim. Ayur_Veda_Setu strictly enforces grounded retrieval and refuses to fabricate citations or speculate without verified evidence.",
      verifiedSources: [],
      safetyWarnings: [
        "Unindexed claim. Absence of curated evidence does not verify or refute the assertion; independent clinical trial search recommended."
      ],
    };
  }

  // 5. Case: Topic Mentioned, but Target Claim / Outcome is Unsupported or Contradicted
  // Example: User asks "Can Ashwagandha cure diabetes?"
  // Entity matched (Ashwagandha), but outcome (diabetes) is NOT in targetOutcomes (stress/cortisol)
  if (bestCandidate.entityScore > 0 && bestCandidate.outcomeScore === 0) {
    return {
      statusCode: "TOPIC_MENTIONED_CLAIM_UNSUPPORTED",
      query,
      confidenceScore: 0.35,
      relevanceRationale: `Our curated archive contains peer-reviewed evidence for ${bestCandidate.record.topic}, but contains Insufficient Curated Evidence supporting the specific claim outcome requested in: "${trimmed}". Ayur_Veda_Setu does not extrapolate evidence across unrelated clinical indications.`,
      matchedRecord: bestCandidate.record,
      verifiedSources: [], // Do NOT return citations as if they support the unsupported claim
      safetyWarnings: [
        `Clinical trials for ${bestCandidate.record.topic} cannot be generalized to unverified indications.`,
        ...bestCandidate.record.scientificEvidence.contraindicationsAndSafety
      ],
    };
  }

  // 6. Case: Outcome Mentioned without Botanical Entity
  if (bestCandidate.entityScore === 0 && bestCandidate.outcomeScore > 0) {
    if (words.length > 5) {
      return {
        statusCode: "INSUFFICIENT_CURATED_EVIDENCE",
        query,
        confidenceScore: 0,
        relevanceRationale:
          "Insufficient Curated Evidence: The submitted claim refers to health indications but does not match any verified Ayurvedic botanical or formulation records in our curated archive.",
        verifiedSources: [],
        safetyWarnings: [
          "Unindexed claim. Absence of curated evidence does not verify or refute the assertion; independent clinical trial search recommended."
        ],
      };
    }
    return {
      statusCode: "AMBIGUOUS_QUERY",
      query,
      confidenceScore: 0.3,
      relevanceRationale: `The query mentions a clinical condition (${bestCandidate.matchedOutcomes.join(", ")}) but does not specify an Ayurvedic herb, formulation, or traditional concept to evaluate.`,
      verifiedSources: [],
      safetyWarnings: ["Clinical diagnosis and therapeutic decisions require medical evaluation."],
    };
  }

  // 7. Case: Supported Match (Both Entity & Target Outcome Aligned)
  if (bestCandidate.entityScore > 0 && bestCandidate.outcomeScore > 0) {
    // If the query contains explicit rejection triggers (e.g. "cures in 48 hours", "replaces knee replacement"):
    // It is an unsupported overclaim on a known topic. Enforce strict epistemic boundary.
    if (bestCandidate.triggeredRejections.length > 0) {
      return {
        statusCode: "TOPIC_MENTIONED_CLAIM_UNSUPPORTED",
        query,
        confidenceScore: 0.3,
        relevanceRationale: `The botanical entity (${bestCandidate.matchedEntities.join(", ")}) is indexed in our archive, but the specific assertion (${bestCandidate.triggeredRejections.join("; ")}) is an exaggerated or unsupported overclaim contradicted by clinical trial evidence.`,
        matchedRecord: bestCandidate.record,
        verifiedSources: [], // Strict: do not provide citations as if they support an overclaim
        safetyWarnings: [
          "Unsubstantiated overclaims can lead to delayed critical medical care.",
          ...bestCandidate.record.scientificEvidence.contraindicationsAndSafety,
        ],
      };
    }

    let finalScore = 0.85;
    if (bestCandidate.matchedEntities.length > 1) finalScore += 0.05;
    if (bestCandidate.matchedOutcomes.length > 1) finalScore += 0.05;
    finalScore = Math.min(Math.max(finalScore, 0.5), 0.98);

    const rationale = `Supported Curated Match: The claim directly aligns with peer-reviewed biomedical trials and classical literature for ${bestCandidate.record.topic}. High evidence relevance.`;

    return {
      statusCode: "SUPPORTED_MATCH",
      query,
      confidenceScore: finalScore,
      relevanceRationale: rationale,
      matchedRecord: bestCandidate.record,
      verifiedSources: bestCandidate.record.sources,
      safetyWarnings: bestCandidate.record.scientificEvidence.contraindicationsAndSafety,
    };
  }

  // Fallback safe state
  return {
    statusCode: "INSUFFICIENT_CURATED_EVIDENCE",
    query,
    confidenceScore: 0,
    relevanceRationale: "Insufficient Curated Evidence: The submitted claim could not be matched with sufficient confidence to our verified archive.",
    verifiedSources: [],
    safetyWarnings: [],
  };
}
