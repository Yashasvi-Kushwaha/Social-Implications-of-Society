/**
 * Focused Validation Test Harness for Ayur_Veda_Setu Evidence Retrieval & Gemma 4 Preparation
 * Validates the required epistemic retrieval & grounding scenarios:
 * 1. Directly supported claim (Curcumin + Piperine for osteoarthritis)
 * 2. Unrelated claim (Papaya seeds for dengue)
 * 3. Ambiguous / overly broad claim ("ayurveda herbs wellness")
 * 4. Topic-mentioned but unsupported claim (Ashwagandha cures type 1 diabetes)
 * 5. Empty and invalid inputs ("" and excessive length)
 * 6. Gemma 4 Bounded Context verification (ensuring strict grounding and model blocking on unverified claims)
 */

import { retrieveCuratedEvidence } from "../src/lib/knowledge/retriever";
import { buildGemmaBoundedContext } from "../src/lib/knowledge/contextBuilder";

interface TestCase {
  name: string;
  query: string;
  expectedStatus: string;
  expectedHasSources: boolean;
  minConfidence: number;
  expectedCanQueryGemma: boolean;
}

const TEST_CASES: TestCase[] = [
  {
    name: "1. Directly Supported Claim (Curcumin + Piperine)",
    query: "Does curcumin with piperine reduce knee osteoarthritis inflammation?",
    expectedStatus: "SUPPORTED_MATCH",
    expectedHasSources: true,
    minConfidence: 0.8,
    expectedCanQueryGemma: true,
  },
  {
    name: "2. Directly Supported Claim (Ashwagandha & Cortisol)",
    query: "Ashwagandha root extract reduces morning serum cortisol and stress",
    expectedStatus: "SUPPORTED_MATCH",
    expectedHasSources: true,
    minConfidence: 0.8,
    expectedCanQueryGemma: true,
  },
  {
    name: "3. Unrelated Claim (Not in Curated Archive)",
    query: "Boiled papaya seed extract cures dengue fever in 24 hours",
    expectedStatus: "INSUFFICIENT_CURATED_EVIDENCE",
    expectedHasSources: false,
    minConfidence: 0.0,
    expectedCanQueryGemma: false, // Model MUST NOT be queried for uncurated claims
  },
  {
    name: "4. Ambiguous / Overly Broad Query",
    query: "ayurveda herbs wellness",
    expectedStatus: "AMBIGUOUS_QUERY",
    expectedHasSources: false,
    minConfidence: 0.0,
    expectedCanQueryGemma: false,
  },
  {
    name: "5. Topic Mentioned, but Claim Unsupported (No False Generalization)",
    query: "Can Ashwagandha cure type 1 diabetes completely?",
    expectedStatus: "TOPIC_MENTIONED_CLAIM_UNSUPPORTED",
    expectedHasSources: false, // Must NOT cite stress trials as proof for diabetes
    minConfidence: 0.2,
    expectedCanQueryGemma: false, // Model blocked from hallucinating
  },
  {
    name: "6. Empty Input",
    query: "   ",
    expectedStatus: "INVALID_INPUT",
    expectedHasSources: false,
    minConfidence: 0.0,
    expectedCanQueryGemma: false,
  },
  {
    name: "7. Overly Short Input (<3 chars)",
    query: "hi",
    expectedStatus: "INVALID_INPUT",
    expectedHasSources: false,
    minConfidence: 0.0,
    expectedCanQueryGemma: false,
  },
  {
    name: "8. Toxicological Preparation Match (Bhasma Heavy Metal Risk)",
    query: "Do unregulated Bhasmas carry a risk of lead poisoning?",
    expectedStatus: "SUPPORTED_MATCH",
    expectedHasSources: true,
    minConfidence: 0.8,
    expectedCanQueryGemma: true,
  },
];

console.log("===================================================================");
console.log("   Ayur_Veda_Setu: Evidence Retrieval & Gemma 4 Test Suite         ");
console.log("===================================================================\n");

let passed = 0;
let failed = 0;

for (const tc of TEST_CASES) {
  const result = retrieveCuratedEvidence(tc.query);
  const gemmaContext = buildGemmaBoundedContext(result);

  const statusMatch = result.statusCode === tc.expectedStatus;
  const sourcesMatch = (result.verifiedSources.length > 0) === tc.expectedHasSources;
  const confidenceMatch = result.confidenceScore >= tc.minConfidence;
  const gemmaMatch = gemmaContext.canQueryModel === tc.expectedCanQueryGemma;

  const isSuccess = statusMatch && sourcesMatch && confidenceMatch && gemmaMatch;

  if (isSuccess) {
    passed++;
    console.log(`[PASS] ${tc.name}`);
    console.log(`       Query: "${tc.query}"`);
    console.log(`       Status: ${result.statusCode} (Confidence: ${result.confidenceScore.toFixed(2)})`);
    console.log(`       Sources Returned: ${result.verifiedSources.length} verified item(s)`);
    console.log(`       Can Query Gemma 4: ${gemmaContext.canQueryModel}`);
    if (gemmaContext.canQueryModel) {
      console.log(`       Verified Citations Bound to Gemma: ${gemmaContext.verifiedCitations.length}`);
      console.log(`       Fallback Dossier Ready: ${!!gemmaContext.fallbackDossier}`);
    }
  } else {
    failed++;
    console.error(`[FAIL] ${tc.name}`);
    console.error(`       Query: "${tc.query}"`);
    console.error(`       Status Match: ${statusMatch} (${result.statusCode} vs ${tc.expectedStatus})`);
    console.error(`       Sources Match: ${sourcesMatch} (${result.verifiedSources.length > 0} vs ${tc.expectedHasSources})`);
    console.error(`       Gemma Match: ${gemmaMatch} (${gemmaContext.canQueryModel} vs ${tc.expectedCanQueryGemma})`);
  }
  console.log("-------------------------------------------------------------------");
}

console.log(`\nTest Summary: ${passed} passed, ${failed} failed out of ${TEST_CASES.length} test cases.`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log("All epistemic retrieval and Gemma 4 preparation checks passed successfully!\n");
}
