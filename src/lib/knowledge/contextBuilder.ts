import { GemmaBoundedContext, RetrievalResult } from "./types";

/**
 * Constructs a strictly bounded prompt context for Gemma 4 based on retrieval results.
 * Enforces key responsible AI principles:
 * 1. Only supported matches with verified curated records can generate AI queries.
 * 2. Unindexed, unsupported, or ambiguous queries are rejected from AI generation to prevent hallucination.
 * 3. Verified citations come strictly from the curated record, never from model imagination.
 * 4. Prepares a fallback dossier for zero-downtime resilient judging demonstrations.
 */
export function buildGemmaBoundedContext(result: RetrievalResult): GemmaBoundedContext {
  // If retrieval did not yield a supported curated match, do NOT query the model
  if (result.statusCode !== "SUPPORTED_MATCH" || !result.matchedRecord) {
    return {
      canQueryModel: false,
      systemInstruction: "",
      userPrompt: "",
      verifiedCitations: [],
      retrievalStatus: result.statusCode,
    };
  }

  const record = result.matchedRecord;

  // Format verified sources into traceable strings
  const sourceCitationsText = record.sources
    .map(
      (s, idx) =>
        `[Source ${idx + 1}] "${s.title}" (${s.authorsOrOrganization}, ${s.publicationDate || "N/D"})\n` +
        ` Identifier: ${s.identifier || "N/A"} | URL: ${s.url}\n` +
        ` Key Findings: ${s.keyFindings}\n` +
        ` Limitations: ${s.limitations}`
    )
    .join("\n\n");

  const systemInstruction = `You are AyurVeda_Setu's evidence analysis assistant, built to bridge traditional Ayurvedic concepts with modern biomedical science.

CRITICAL INSTRUCTIONS & GROUNDING RULES:
1. Grounding Rule: Use ONLY the provided Curated Evidence Record and Verified Sources below. Do NOT introduce external clinical claims, invent citations, or generate fictional author names.
2. Structure: Format your response into 4 distinct, clearly labeled sections:
   - Section 1: Traditional Ayurvedic Understanding (Explain classical concepts: ${record.traditionalContext.classicalConcepts.join(", ")} from ${record.traditionalContext.primaryTreatise}).
   - Section 2: Modern Biomedical Trial Evidence (Summarize molecular pathways, human RCT outcomes, and bioavailability considerations).
   - Section 3: Evidence Limitations & Uncertainty (Sample sizes, preliminary vs conclusive status, in vitro vs in vivo distinctions).
   - Section 4: Critical Safety & Contraindications (List safety alerts, drug interactions, and toxicological boundaries).
3. Non-Diagnostic Rule: Never state that this herb or formulation diagnoses, prevents, or cures severe diseases without qualified medical supervision.
4. Transparency: Citations will be attached directly by the system; do not invent new reference numbers or fabricate URLs.`;

  const userPrompt = `USER WELLNESS CLAIM TO INVESTIGATE:
"${result.query}"

CURATED EVIDENCE DOSSIER FOR GROUNDING:
- Topic: ${record.topic}
- Canonical Claim: ${record.canonicalClaim}
- Evidence Strength Tier: ${record.scientificEvidence.evidenceTier}

TRADITIONAL AYURVEDIC CONTEXT:
- Canonical Treatise: ${record.traditionalContext.primaryTreatise}
- Classical Concepts: ${record.traditionalContext.classicalConcepts.join(", ")}
- Traditional Indications: ${record.traditionalContext.traditionalIndications}
- Traditional Preparation Method: ${record.traditionalContext.traditionalPreparationMethod || "Standard traditional preparation"}

MODERN BIOMEDICAL TRIAL EVIDENCE:
- Summary: ${record.scientificEvidence.biomedicalSummary}
- Target Biological Pathways: ${record.scientificEvidence.targetPathways.join("; ")}
- Bioavailability Factors: ${record.scientificEvidence.bioavailabilityConsiderations || "Standard pharmacokinetic profile"}
- Contraindications & Safety Alerts: ${record.scientificEvidence.contraindicationsAndSafety.join("; ")}

VERIFIED PEER-REVIEWED SOURCES:
${sourceCitationsText}

Synthesize a structured, evidence-grounded analysis adhering strictly to the above facts.`;

  return {
    canQueryModel: true,
    systemInstruction,
    userPrompt,
    verifiedCitations: record.sources,
    retrievalStatus: result.statusCode,
    fallbackDossier: {
      topic: record.topic,
      traditionalSummary: `${record.traditionalContext.traditionalIndications} (Referenced in ${record.traditionalContext.primaryTreatise}).`,
      biomedicalSummary: record.scientificEvidence.biomedicalSummary,
      safetyWarnings: record.scientificEvidence.contraindicationsAndSafety,
      evidenceTier: record.scientificEvidence.evidenceTier,
    },
  };
}
