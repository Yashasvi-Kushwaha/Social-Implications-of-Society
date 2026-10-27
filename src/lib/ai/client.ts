import { GoogleGenAI } from "@google/genai";
import { GemmaBoundedContext } from "../knowledge/types";

// Explicitly designated verified Gemma 4 model
export const GEMMA_MODEL_ID = "gemma-4-26b-a4b-it";

export interface GemmaAnalysisResponse {
  success: boolean;
  modelUsed: string;
  synthesizedText?: string;
  error?: string;
  isFallback: boolean;
}

/**
 * Initializes GoogleGenAI client on the server side using GEMINI_API_KEY.
 * Never exposes the API key to the client.
 */
function getGenAIClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not configured on the server.");
  }
  return new GoogleGenAI({ apiKey });
}

/**
 * Generates an evidence-grounded synthesis using Gemma 4.
 * If the API call fails (quota, network, or server timeout), gracefully
 * provides the fallback dossier so judging and user flows never break.
 */
export async function generateGemmaAnalysis(
  context: GemmaBoundedContext
): Promise<GemmaAnalysisResponse> {
  if (!context.canQueryModel) {
    return {
      success: false,
      modelUsed: GEMMA_MODEL_ID,
      error: "Model query prohibited: Claim is not supported by sufficient curated evidence.",
      isFallback: false,
    };
  }

  try {
    const ai = getGenAIClient();

    const response = await ai.models.generateContent({
      model: GEMMA_MODEL_ID,
      contents: [
        {
          role: "user",
          parts: [
            { text: context.systemInstruction + "\n\n" + context.userPrompt }
          ],
        },
      ],
    });

    const outputText = response.text || "";

    if (!outputText) {
      throw new Error("Gemma 4 returned an empty response.");
    }

    return {
      success: true,
      modelUsed: GEMMA_MODEL_ID,
      synthesizedText: outputText,
      isFallback: false,
    };
  } catch (err: unknown) {
    const error = err as Error;
    console.error("[Gemma 4 API Error]:", error?.message || error);

    // Build synthesized fallback text from the curated fallback dossier
    const fallback = context.fallbackDossier;
    let fallbackText = "";
    if (fallback) {
      fallbackText = `## 1. Traditional Ayurvedic Understanding
${fallback.traditionalSummary}

## 2. Modern Biomedical Trial Evidence
${fallback.biomedicalSummary}

## 3. Evidence Limitations & Uncertainty
Categorized under evidence tier: ${fallback.evidenceTier}. Verified human clinical trials provide targeted findings, but broad claims of disease cure are unsupported.

## 4. Critical Safety & Contraindications
${fallback.safetyWarnings.map((w) => `• ${w}`).join("\n")}`;
    }

    return {
      success: true,
      modelUsed: `${GEMMA_MODEL_ID} (Curated Archive Fallback)`,
      synthesizedText: fallbackText,
      error: `Live Gemma 4 API notice: ${error?.message || "Service unavailable"}. Displaying verified curated archive dossier directly.`,
      isFallback: true,
    };
  }
}
