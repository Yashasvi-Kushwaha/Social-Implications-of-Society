/**
 * Milestone 7 Comprehensive Security, API, and Integrity Verification Suite
 */

import { retrieveCuratedEvidence, buildGemmaBoundedContext } from "../src/lib/knowledge";
import { generateGemmaAnalysis } from "../src/lib/ai/client";
import { CURATED_EVIDENCE_DATASET } from "../src/lib/knowledge/dataset";

async function runMilestone7Audit() {
  console.log("=====================================================================");
  console.log("       Ayur_Veda_Setu: Milestone 7 Final Security & API Audit        ");
  console.log("=====================================================================\n");

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition: boolean, testName: string, details?: string) {
    totalTests++;
    if (condition) {
      console.log(`[PASS] Test ${totalTests}: ${testName}`);
      passedTests++;
    } else {
      console.error(`[FAIL] Test ${totalTests}: ${testName} - ${details || "Failed"}`);
      process.exitCode = 1;
    }
  }

  // 1. DATASET INTEGRITY & ANTI-FABRICATION VERIFICATION
  console.log("--- 1. DATASET & CITATION INTEGRITY AUDIT ---");
  assert(CURATED_EVIDENCE_DATASET.length >= 3, "Curated dataset contains sufficient high-quality records", `Found: ${CURATED_EVIDENCE_DATASET.length}`);

  let allSourcesValid = true;
  for (const record of CURATED_EVIDENCE_DATASET) {
    if (!record.sources || record.sources.length === 0) {
      allSourcesValid = false;
      break;
    }
    for (const source of record.sources) {
      if (!source.url || !source.title || !source.keyFindings) {
        allSourcesValid = false;
        break;
      }
    }
  }
  assert(allSourcesValid, "All sources in curated dataset have valid URLs, titles, and key findings");

  // 2. EPISTEMIC RETRIEVAL EVALUATION & BOUNDARIES
  console.log("\n--- 2. EPISTEMIC RETRIEVAL & BOUNDARY EVALUATION ---");

  // A. Supported Claim
  const res1 = retrieveCuratedEvidence("Can turmeric with black pepper help with joint inflammation?");
  assert(res1.statusCode === "SUPPORTED_MATCH", "Supported claim correctly returns SUPPORTED_MATCH", `Got: ${res1.statusCode}`);
  assert(res1.verifiedSources.length > 0, "Supported claim provides verified sources", `Count: ${res1.verifiedSources.length}`);

  // B. Topic Mentioned but Claim Unsupported (Rejection Trigger)
  const res2 = retrieveCuratedEvidence("Turmeric cures osteoarthritis in 48 hours and replaces knee replacement surgery");
  assert(
    res2.statusCode === "TOPIC_MENTIONED_CLAIM_UNSUPPORTED",
    "Wild overclaim on known topic triggers TOPIC_MENTIONED_CLAIM_UNSUPPORTED",
    `Got: ${res2.statusCode}`
  );
  assert(res2.verifiedSources.length === 0, "Unsupported claim returns zero verified citations (Strict Anti-Fabrication)");

  // C. Unindexed Novel Claim
  const res3 = retrieveCuratedEvidence("Drinking boiled mango seed oil eliminates cardiovascular disease permanently");
  assert(
    res3.statusCode === "INSUFFICIENT_CURATED_EVIDENCE",
    "Unindexed novel claim triggers INSUFFICIENT_CURATED_EVIDENCE",
    `Got: ${res3.statusCode}`
  );
  assert(res3.verifiedSources.length === 0, "Novel claim strictly prohibited from citations");

  // D. Ambiguous Query
  const res4 = retrieveCuratedEvidence("herb");
  assert(
    res4.statusCode === "AMBIGUOUS_QUERY",
    "Single-word vague query triggers AMBIGUOUS_QUERY",
    `Got: ${res4.statusCode}`
  );

  // 3. BOUNDED CONTEXT FOR GEMMA 4
  console.log("\n--- 3. LLM BOUNDARY ENFORCEMENT ---");
  const ctxSupported = buildGemmaBoundedContext(res1);
  assert(ctxSupported.canQueryModel === true, "Supported match permits Gemma 4 query");

  const ctxUnsupported = buildGemmaBoundedContext(res2);
  assert(ctxUnsupported.canQueryModel === false, "Unsupported match prohibits LLM query");

  const ctxNovel = buildGemmaBoundedContext(res3);
  assert(ctxNovel.canQueryModel === false, "Novel match prohibits LLM query");

  // 4. GRACEFUL API KEY HANDLING & FALLBACK DOSSIER
  console.log("\n--- 4. MISSING API KEY & FALLBACK RESILIENCE ---");
  const originalKey = process.env.GEMINI_API_KEY;
  delete process.env.GEMINI_API_KEY; // Simulate server with missing/misconfigured key

  try {
    const fallbackRes = await generateGemmaAnalysis(ctxSupported);
    assert(fallbackRes.success === true, "System provides fallback dossier when API key is missing");
    assert(fallbackRes.isFallback === true, "Response explicitly flags isFallback: true");
    assert(fallbackRes.synthesizedText?.includes("Traditional Ayurvedic Understanding") === true, "Fallback synthesis includes classical understanding");
    assert(fallbackRes.synthesizedText?.includes("Modern Biomedical Trial Evidence") === true, "Fallback synthesis includes biomedical evidence");
  } finally {
    if (originalKey) {
      process.env.GEMINI_API_KEY = originalKey; // Restore key
    }
  }

  // Summary
  console.log("\n=====================================================================");
  console.log(`Audit Complete: ${passedTests}/${totalTests} Tests Passed Cleanly`);
  console.log("=====================================================================");
}

runMilestone7Audit().catch((err) => {
  console.error("Audit encountered unexpected error:", err);
  process.exit(1);
});
