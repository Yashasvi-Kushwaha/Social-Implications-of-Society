/**
 * Automated Verification Suite for Ayurvedic Dosha Discovery Quiz
 */

import {
  DOSHA_QUESTIONS,
  computeQuizScores,
  DoshaType,
} from "../src/components/constitution/DoshaQuiz";

function runQuizValidation() {
  console.log("=====================================================================");
  console.log("       Ayur_Veda_Setu: Dosha Discovery Quiz Validation Suite         ");
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

  // 1. QUESTION SCHEMA VALIDATION
  console.log("--- 1. QUESTIONNAIRE SCHEMA & CANONICAL COVERAGE ---");
  assert(DOSHA_QUESTIONS.length === 12, "Questionnaire contains exactly 12 multiple-choice questions", `Count: ${DOSHA_QUESTIONS.length}`);

  let allQuestionsValid = true;
  for (const q of DOSHA_QUESTIONS) {
    if (!q.category || !q.prompt || q.options.length !== 3) {
      allQuestionsValid = false;
      break;
    }
    const doshasPresent = new Set(q.options.map((o) => o.dosha));
    if (doshasPresent.size !== 3 || !doshasPresent.has("vata") || !doshasPresent.has("pitta") || !doshasPresent.has("kapha")) {
      allQuestionsValid = false;
      break;
    }
  }
  assert(allQuestionsValid, "Every question covers Vata, Pitta, and Kapha options with non-empty detail text");

  // 2. SCORING SCENARIOS
  console.log("\n--- 2. SCORING & TIE-BREAKER LOGIC ---");

  // A. Pure Vata (12/12)
  const answersVata: Record<number, DoshaType> = {};
  for (let i = 1; i <= 12; i++) answersVata[i] = "vata";
  const resVata = computeQuizScores(answersVata);
  assert(resVata.primaryDosha === "vata", "100% Vata answers yields Vata-Prominent", `Got: ${resVata.primaryDosha}`);
  assert(resVata.vataPct === 100 && resVata.pittaPct === 0 && resVata.kaphaPct === 0, "Percentages sum to 100% (100/0/0)");

  // B. Pure Pitta (12/12)
  const answersPitta: Record<number, DoshaType> = {};
  for (let i = 1; i <= 12; i++) answersPitta[i] = "pitta";
  const resPitta = computeQuizScores(answersPitta);
  assert(resPitta.primaryDosha === "pitta", "100% Pitta answers yields Pitta-Prominent", `Got: ${resPitta.primaryDosha}`);

  // C. Pure Kapha (12/12)
  const answersKapha: Record<number, DoshaType> = {};
  for (let i = 1; i <= 12; i++) answersKapha[i] = "kapha";
  const resKapha = computeQuizScores(answersKapha);
  assert(resKapha.primaryDosha === "kapha", "100% Kapha answers yields Kapha-Prominent", `Got: ${resKapha.primaryDosha}`);

  // D. Tri-Doshic Equal Balance (4 Vata, 4 Pitta, 4 Kapha)
  const answersTri: Record<number, DoshaType> = {
    1: "vata", 2: "vata", 3: "vata", 4: "vata",
    5: "pitta", 6: "pitta", 7: "pitta", 8: "pitta",
    9: "kapha", 10: "kapha", 11: "kapha", 12: "kapha",
  };
  const resTri = computeQuizScores(answersTri);
  assert(resTri.primaryDosha === "tri", "Equal 4-4-4 answers yields Tri-Doshic Sama Prakriti pattern", `Got: ${resTri.primaryDosha}`);
  assert(resTri.classificationTitle.includes("Sama Prakriti"), "Tri-doshic classification title includes Sama Prakriti");

  // E. Dual-Dosha Tie (6 Vata, 6 Pitta, 0 Kapha)
  const answersDual: Record<number, DoshaType> = {
    1: "vata", 2: "vata", 3: "vata", 4: "vata", 5: "vata", 6: "vata",
    7: "pitta", 8: "pitta", 9: "pitta", 10: "pitta", 11: "pitta", 12: "pitta",
  };
  const resDual = computeQuizScores(answersDual);
  assert(resDual.primaryDosha === "dual", "Equal 6-6 top dosha answers yields Dual Tendency", `Got: ${resDual.primaryDosha}`);
  assert(resDual.classificationTitle.includes("Dual Tendency"), "Dual-dosha title indicates Dvidoshaja / Dual Tendency");

  // F. Asymmetric Dual-Dosha (5 Pitta, 4 Kapha, 3 Vata)
  const answersAsymDual: Record<number, DoshaType> = {
    1: "pitta", 2: "pitta", 3: "pitta", 4: "pitta", 5: "pitta",
    6: "kapha", 7: "kapha", 8: "kapha", 9: "kapha",
    10: "vata", 11: "vata", 12: "vata",
  };
  const resAsymDual = computeQuizScores(answersAsymDual);
  assert(resAsymDual.primaryDosha === "dual", "Close 5-4-3 answers correctly detects Dual Predominance rather than forcing single dosha", `Got: ${resAsymDual.primaryDosha}`);

  // Summary
  console.log("\n=====================================================================");
  console.log(`Quiz Validation Complete: ${passedTests}/${totalTests} Tests Passed Cleanly`);
  console.log("=====================================================================");
}

runQuizValidation();
