/**
 * Ayur_Veda_Setu Evidence Architecture Types
 * Strongly typed definitions for peer-reviewed citations, classical treatises,
 * evidence dossiers, and relevance retrieval results.
 */

export type SourceType =
  | "rct"                  // Randomized Controlled Trial
  | "systematic_review"    // Systematic Review / Meta-analysis
  | "observational"        // Cohort / Epidemiological study
  | "in_vitro"             // Cell-line / In vitro laboratory assay
  | "toxicology"           // Pharmacovigilance / Heavy metal toxicological assay
  | "classical_treatise"   // Canonical Sanskrit Ayurvedic literature (Charaka, Sushruta, etc.)
  | "pharmacopoeia";       // Official Pharmacopoeial Standard (API, WHO, etc.)

export type EvidenceTier =
  | "strong_clinical"       // Multiple reproducible human RCTs with clinical outcomes
  | "preliminary_clinical"  // Small-cohort RCTs or pilot human trials with positive indicators
  | "preclinical_only"      // In vitro / animal models only; unproven in human trials
  | "toxicological_risk"    // Documented safety/toxicity hazards (e.g. unstandardized Bhasmas)
  | "inconclusive"          // Conflicting or methodologically weak clinical data
  | "traditional_context";  // Historical observational use without modern trial validation

export interface SourceMetadata {
  id: string;
  title: string;
  authorsOrOrganization: string;
  publicationDate?: string;
  sourceType: SourceType;
  url: string;
  identifier?: string;       // PubMed PMID, PMCID, DOI, or Classical verse index
  keyFindings: string;
  limitations: string;
}

export interface TraditionalAyurvedicContext {
  classicalConcepts: string[];           // e.g. ["Haridra", "Lekhaniya", "Vata-Kapha Hara"]
  primaryTreatise: string;              // e.g. "Charaka Samhita, Sutra Sthana 4"
  traditionalIndications: string;       // Classical usage description
  traditionalPreparationMethod?: string;// Traditional processing (Shodhana, Kwatha, Churna)
}

export interface ModernScientificEvidence {
  biomedicalSummary: string;
  evidenceTier: EvidenceTier;
  targetPathways: string[];             // e.g. ["NF-κB inhibition", "COX-2 suppression"]
  bioavailabilityConsiderations?: string;
  contraindicationsAndSafety: string[];
}

export interface EvidenceRecord {
  id: string;
  topic: string;                        // e.g. "Turmeric (Curcumin) with Piperine for Joint Inflammation"
  canonicalClaim: string;               // e.g. "Curcumin with piperine alleviates knee osteoarthritis symptoms"
  entityAliases: string[];              // e.g. ["turmeric", "curcumin", "haldi", "haridra", "piperine", "black pepper"]
  targetOutcomes: string[];             // e.g. ["joint pain", "osteoarthritis", "inflammation", "knee pain"]
  rejectionTriggers?: string[];         // Unsupported extrapolations (e.g. ["cures rheumatoid arthritis in 3 days", "replaces knee replacement"])
  traditionalContext: TraditionalAyurvedicContext;
  scientificEvidence: ModernScientificEvidence;
  sources: SourceMetadata[];
}

export type RetrievalStatusCode =
  | "SUPPORTED_MATCH"           // Directly supported with high relevance
  | "INSUFFICIENT_CURATED_EVIDENCE" // No adequate peer-reviewed record in archive
  | "TOPIC_MENTIONED_CLAIM_UNSUPPORTED" // Topic exists (e.g., Ashwagandha), but the asserted claim (e.g., curing diabetes) has no evidence
  | "AMBIGUOUS_QUERY"           // Overly broad / ambiguous input requiring clarification
  | "INVALID_INPUT";            // Empty, too short, or nonsensical input

export interface RetrievalResult {
  statusCode: RetrievalStatusCode;
  query: string;
  confidenceScore: number;      // 0.0 to 1.0 calibrated relevance score
  relevanceRationale: string;
  matchedRecord?: EvidenceRecord;
  verifiedSources: SourceMetadata[];
  safetyWarnings: string[];
}

export interface GemmaBoundedContext {
  canQueryModel: boolean;
  systemInstruction: string;
  userPrompt: string;
  verifiedCitations: SourceMetadata[];
  retrievalStatus: RetrievalStatusCode;
  fallbackDossier?: {
    topic: string;
    traditionalSummary: string;
    biomedicalSummary: string;
    safetyWarnings: string[];
    evidenceTier: EvidenceTier;
  };
}
