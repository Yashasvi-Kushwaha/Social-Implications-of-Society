import { NextRequest, NextResponse } from "next/server";
import {
  retrieveCuratedEvidence,
  buildGemmaBoundedContext,
  SourceMetadata,
  TraditionalAyurvedicContext,
  ModernScientificEvidence,
  RetrievalStatusCode,
} from "@/lib/knowledge";
import { generateGemmaAnalysis, GEMMA_MODEL_ID } from "@/lib/ai/client";

export interface InvestigationApiResponse {
  claim: string;
  statusCode: RetrievalStatusCode;
  confidenceScore: number;
  relevanceRationale: string;
  modelUsed: string;
  analysisText?: string;
  isFallback: boolean;
  apiNotice?: string;
  verifiedSources: SourceMetadata[];
  safetyWarnings: string[];
  traditionalContext?: TraditionalAyurvedicContext;
  scientificEvidence?: ModernScientificEvidence;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body.claim !== "string") {
      return NextResponse.json(
        {
          error: "Invalid request payload. Expected JSON object with a 'claim' string field.",
        },
        { status: 400 }
      );
    }

    const claim = body.claim.trim();

    // 1. Execute strict retrieval & grounding evaluation
    const retrievalResult = retrieveCuratedEvidence(claim);

    // 2. If the claim is unsupported, unindexed, ambiguous, or invalid:
    // Return early with explicit epistemic boundary—DO NOT call LLM.
    if (retrievalResult.statusCode !== "SUPPORTED_MATCH" || !retrievalResult.matchedRecord) {
      const response: InvestigationApiResponse = {
        claim,
        statusCode: retrievalResult.statusCode,
        confidenceScore: retrievalResult.confidenceScore,
        relevanceRationale: retrievalResult.relevanceRationale,
        modelUsed: "None (Query Blocked by Epistemic Grounding Filter)",
        isFallback: false,
        verifiedSources: [], // Strict: zero citations for unsupported or novel claims
        safetyWarnings: retrievalResult.safetyWarnings,
      };
      return NextResponse.json(response);
    }

    // 3. Construct strictly bounded prompt context for Gemma 4
    const boundedContext = buildGemmaBoundedContext(retrievalResult);

    // 4. Generate structured analysis using Gemma 4 (gemma-4-26b-a4b-it)
    const gemmaResult = await generateGemmaAnalysis(boundedContext);

    const matchedRecord = retrievalResult.matchedRecord;

    const response: InvestigationApiResponse = {
      claim,
      statusCode: retrievalResult.statusCode,
      confidenceScore: retrievalResult.confidenceScore,
      relevanceRationale: retrievalResult.relevanceRationale,
      modelUsed: gemmaResult.modelUsed || GEMMA_MODEL_ID,
      analysisText: gemmaResult.synthesizedText,
      isFallback: gemmaResult.isFallback,
      apiNotice: gemmaResult.error,
      verifiedSources: boundedContext.verifiedCitations,
      safetyWarnings: retrievalResult.safetyWarnings,
      traditionalContext: matchedRecord.traditionalContext,
      scientificEvidence: matchedRecord.scientificEvidence,
    };

    return NextResponse.json(response);
  } catch (error: unknown) {
    const err = error as Error;
    console.error("[API /api/investigate Error]:", err);
    return NextResponse.json(
      {
        error: "Internal server error occurred while processing wellness claim.",
        details: err?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
