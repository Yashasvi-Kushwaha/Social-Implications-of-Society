"use client";

import React, { useState } from "react";
import {
  SparklesIcon,
  ShieldAlertIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  BookOpenIcon,
} from "@/components/ui/icons";

// ─── Types ────────────────────────────────────────────────────────────────────

export type DoshaType = "vata" | "pitta" | "kapha";

export interface QuizOption {
  id: string;
  text: string;
  detail: string;
  dosha: DoshaType;
}

export interface QuizQuestion {
  id: number;
  category: string;
  prompt: string;
  hint: string;
  options: QuizOption[];
}

export interface QuizScores {
  vata: number;
  pitta: number;
  kapha: number;
  vataPct: number;
  pittaPct: number;
  kaphaPct: number;
  primaryDosha: DoshaType | "dual" | "tri";
  secondaryDosha?: DoshaType;
  classificationTitle: string;
  classificationDescription: string;
}

// ─── Quiz Questions Dataset (12 Canonical Categories) ─────────────────────────

export const DOSHA_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: "Physical Build & Joints",
    prompt: "How would you traditionally describe your physical frame and joint structure?",
    hint: "Think about your natural bone structure throughout your adult life.",
    options: [
      {
        id: "1a",
        text: "Slender, light frame with prominent joints",
        detail: "Tending toward difficulty gaining weight; joints may occasionally crack or feel dry.",
        dosha: "vata",
      },
      {
        id: "1b",
        text: "Medium, well-proportioned athletic build",
        detail: "Moderate muscle development; gains or loses weight with moderate effort.",
        dosha: "pitta",
      },
      {
        id: "1c",
        text: "Broad, sturdy, and well-cushioned frame",
        detail: "Naturally solid bone density; gains weight easily and holds mass steadily.",
        dosha: "kapha",
      },
    ],
  },
  {
    id: 2,
    category: "Skin & Temperature Sensitivity",
    prompt: "What are your skin tendencies and comfort with ambient temperatures?",
    hint: "Consider how your skin responds to seasons and changing weather.",
    options: [
      {
        id: "2a",
        text: "Cool and tends toward dryness; sensitive to wind and cold",
        detail: "Skin easily chaps in dry weather; hands and feet are frequently cool to touch.",
        dosha: "vata",
      },
      {
        id: "2b",
        text: "Warm to touch, prone to flushing, freckling, or sensitivity",
        detail: "Easily overheats; strongly dislikes humid heat and intense summer sun.",
        dosha: "pitta",
      },
      {
        id: "2c",
        text: "Smooth, thick, moist, and well-lubricated skin",
        detail: "Tolerates most climates comfortably, but dislikes persistent damp cold.",
        dosha: "kapha",
      },
    ],
  },
  {
    id: 3,
    category: "Digestive Pattern & Appetite (Agni)",
    prompt: "How does your digestive system and appetite typically behave?",
    hint: "Classical Ayurveda considers digestive regularity (Agni) a central constitutional indicator.",
    options: [
      {
        id: "3a",
        text: "Variable and unpredictable (Vishama Agni)",
        detail: "Sometimes intensely hungry, other times easily forgetting meals; prone to gas or bloating.",
        dosha: "vata",
      },
      {
        id: "3b",
        text: "Strong, sharp, and demanding (Tikshna Agni)",
        detail: "Becomes irritable or fatigued if meals are skipped; digests meals quickly.",
        dosha: "pitta",
      },
      {
        id: "3c",
        text: "Slow, steady, and resilient (Manda Agni)",
        detail: "Can skip a meal comfortably; digestion is methodical and prone to feeling heavy.",
        dosha: "kapha",
      },
    ],
  },
  {
    id: 4,
    category: "Energy & Daily Stamina",
    prompt: "What is your characteristic daily energy pattern and physical pace?",
    hint: "Focus on your baseline rhythm rather than temporary burnout or exhaustion.",
    options: [
      {
        id: "4a",
        text: "Quick bursts of intense energy followed by sudden depletion",
        detail: "Fast-moving, enthusiastic pace; benefits from frequent rest and pacing.",
        dosha: "vata",
      },
      {
        id: "4b",
        text: "Focused, purposeful, and driven stamina",
        detail: "Consistent drive toward milestones; pushes through fatigue to complete tasks.",
        dosha: "pitta",
      },
      {
        id: "4c",
        text: "Slow to warm up, but enduring, long-lasting stamina",
        detail: "Methodical momentum; capable of prolonged sustained effort once engaged.",
        dosha: "kapha",
      },
    ],
  },
  {
    id: 5,
    category: "Sleep Quality & Rest",
    prompt: "How would you describe your natural sleep characteristics?",
    hint: "Recall your sleep during balanced periods without active insomnia medications.",
    options: [
      {
        id: "5a",
        text: "Light, irregular, or easily awakened by ambient sounds",
        detail: "May awaken during early dawn hours; often dreams vividly with movement.",
        dosha: "vata",
      },
      {
        id: "5b",
        text: "Sound, moderate duration (6–7 hours), easily awakening if too warm",
        detail: "Falls asleep with reasonable ease; dreams are often vivid, problem-solving, or colorful.",
        dosha: "pitta",
      },
      {
        id: "5c",
        text: "Deep, heavy, restorative (8+ hours), slow to fully shake off morning grogginess",
        detail: "Can sleep through noise; cherishes restful sleep and dislikes abrupt wake-ups.",
        dosha: "kapha",
      },
    ],
  },
  {
    id: 6,
    category: "Learning & Information Processing",
    prompt: "How do your mind and memory traditionally absorb new ideas?",
    hint: "Consider your cognitive learning style when studying or learning a new skill.",
    options: [
      {
        id: "6a",
        text: "Grasps concepts very rapidly, but can forget specifics over time",
        detail: "High creative ideation; thrives on brainstorming and multi-disciplinary novelty.",
        dosha: "vata",
      },
      {
        id: "6b",
        text: "Sharp, analytical, discerning, and critical comprehension",
        detail: "Systematically organizes information; quickly detects inconsistencies or errors.",
        dosha: "pitta",
      },
      {
        id: "6c",
        text: "Methodical, deliberate learner with enduring long-term retention",
        detail: "Takes time to absorb depth, but retains foundational concepts permanently (Sthira Smriti).",
        dosha: "kapha",
      },
    ],
  },
  {
    id: 7,
    category: "Response to Everyday Stress",
    prompt: "When confronted with unexpected pressure or high-stress demands, what is your initial tendency?",
    hint: "Focus on your spontaneous emotional or physical reflex under strain.",
    options: [
      {
        id: "7a",
        text: "Anxiety, worry, racing thoughts, or feeling overwhelmed",
        detail: "Mind races through scenarios; may feel scattered, restless, or indecisive.",
        dosha: "vata",
      },
      {
        id: "7b",
        text: "Irritation, impatience, frustration, or taking control",
        detail: "Becomes intensely focused on fixing the issue immediately; may be critical of delay.",
        dosha: "pitta",
      },
      {
        id: "7c",
        text: "Internal withdrawal, quiet patience, or resistance to change",
        detail: "Seeks to maintain peace and stability; may delay action or desire comfort.",
        dosha: "kapha",
      },
    ],
  },
  {
    id: 8,
    category: "Communication & Speech Style",
    prompt: "How do others typically experience your speaking rhythm and conversational habits?",
    hint: "Consider your spontaneous pace when conversing with friends.",
    options: [
      {
        id: "8a",
        text: "Lively, rapid, animated, sometimes jumping between thoughts",
        detail: "Expressive gestures and expressive cadence; highly engaging when inspired.",
        dosha: "vata",
      },
      {
        id: "8b",
        text: "Direct, articulate, persuasive, concise, and structured",
        detail: "Gets straight to the point; naturally leads debates and explains logic clearly.",
        dosha: "pitta",
      },
      {
        id: "8c",
        text: "Calm, melodious, measured, comfortable with thoughtful pauses",
        detail: "Speaks after reflection; attentive listener who avoids unnecessary conflict.",
        dosha: "kapha",
      },
    ],
  },
  {
    id: 9,
    category: "Routine & Predictability",
    prompt: "How do you feel about structured daily routines and repetitive schedules?",
    hint: "Classical Ayurveda places high importance on routine (Dinacharya).",
    options: [
      {
        id: "9a",
        text: "Prefers spontaneous flexibility; feels restricted by rigid daily schedules",
        detail: "Thrives with variety; habits, meal hours, and sleep times fluctuate naturally.",
        dosha: "vata",
      },
      {
        id: "9b",
        text: "Values goal-oriented planning, productivity routines, and organized calendars",
        detail: "Maintains structured checklists; values efficiency and punctual execution.",
        dosha: "pitta",
      },
      {
        id: "9c",
        text: "Deeply values familiar rhythms, stable routines, and comfortable predictability",
        detail: "Settles comfortably into steady habits; dislikes sudden or chaotic disruptions.",
        dosha: "kapha",
      },
    ],
  },
  {
    id: 10,
    category: "Hydration & Thirst Patterns",
    prompt: "What is your typical natural relationship with thirst and beverages?",
    hint: "Observe your natural inclination without artificial hydration apps or reminders.",
    options: [
      {
        id: "10a",
        text: "Irregular thirst; easily forgets to drink water; prefers warm drinks",
        detail: "May go hours without drinking, then crave comforting teas or warm broths.",
        dosha: "vata",
      },
      {
        id: "10b",
        text: "Frequent, strong thirst; prefers cool or room-temperature beverages",
        detail: "Naturally drinks copious fluids to quench internal heat; dislikes hot spicy beverages.",
        dosha: "pitta",
      },
      {
        id: "10c",
        text: "Mild, steady thirst; comfortably satisfied with moderate fluid volume",
        detail: "Rarely experiences acute thirst; enjoys warm, stimulating infusions.",
        dosha: "kapha",
      },
    ],
  },
  {
    id: 11,
    category: "Emotional Baseline & Temperament",
    prompt: "When in balance, what is your prevailing emotional mood and interpersonal style?",
    hint: "Think of your natural temperament when life is running smoothly.",
    options: [
      {
        id: "11a",
        text: "Enthusiastic, adaptable, curious, imaginative, and friendly",
        detail: "Brings playful spontaneity and visionary ideas into collaborative spaces.",
        dosha: "vata",
      },
      {
        id: "11b",
        text: "Confident, passionate, warm, generous, and intellectually bold",
        detail: "Motivates peers, seeks excellence, and champions justice or meaningful goals.",
        dosha: "pitta",
      },
      {
        id: "11c",
        text: "Compassionate, patient, loyal, grounding, and emotionally supportive",
        detail: "Provides steady reassurance; dependable anchor for family and community.",
        dosha: "kapha",
      },
    ],
  },
  {
    id: 12,
    category: "Movement & Exercise Preference",
    prompt: "What style of physical exercise or recreational movement feels most nourishing to your body?",
    hint: "Consider what restores your vitality rather than what drains you.",
    options: [
      {
        id: "12a",
        text: "Gentle, fluid movement like walking, restorative yoga, or dancing",
        detail: "Excessive high-intensity or repetitive heavy lifting can quickly leave you feeling depleted.",
        dosha: "vata",
      },
      {
        id: "12b",
        text: "Moderately intense, goal-oriented activities like cycling, hiking, or swimming",
        detail: "Enjoys a healthy sweat and challenge, but must pace to prevent overheating or burnout.",
        dosha: "pitta",
      },
      {
        id: "12c",
        text: "Invigorating, endurance-building exercise like brisk walking, rowing, or resistance training",
        detail: "Benefits greatly from stimulating exertion that clears lethargy and builds warmth.",
        dosha: "kapha",
      },
    ],
  },
];

// ─── Score Computation Logic ──────────────────────────────────────────────────

export function computeQuizScores(answers: Record<number, DoshaType>): QuizScores {
  let vata = 0;
  let pitta = 0;
  let kapha = 0;

  Object.values(answers).forEach((dosha) => {
    if (dosha === "vata") vata++;
    else if (dosha === "pitta") pitta++;
    else if (dosha === "kapha") kapha++;
  });

  const total = Math.max(vata + pitta + kapha, 1);
  const vataPct = Math.round((vata / total) * 100);
  const pittaPct = Math.round((pitta / total) * 100);
  const kaphaPct = 100 - (vataPct + pittaPct); // Ensure exact 100% sum

  const sortedItems: { dosha: DoshaType; score: number; pct: number }[] = [
    { dosha: "vata", score: vata, pct: vataPct },
    { dosha: "pitta", score: pitta, pct: pittaPct },
    { dosha: "kapha", score: kapha, pct: kaphaPct },
  ];
  sortedItems.sort((a, b) => b.score - a.score);

  const first = sortedItems[0];
  const second = sortedItems[1];
  const third = sortedItems[2];

  // Tri-doshic (Sama Prakriti): all three scores are virtually identical (spread <= 1)
  const isTriDoshic = first.score - third.score <= 1;

  if (isTriDoshic) {
    return {
      vata,
      pitta,
      kapha,
      vataPct,
      pittaPct,
      kaphaPct,
      primaryDosha: "tri",
      classificationTitle: "Tri-Doshic Balance Tendency (Sama Prakriti Pattern)",
      classificationDescription:
        "Your responses reflect an evenly distributed interplay of Vata, Pitta, and Kapha tendencies. In classical Ayurvedic treatises, Sama Prakriti is described as a rare, harmonious baseline where movement, metabolism, and structure maintain mutual equilibrium. Seasonal and dietary awareness focuses on maintaining this balanced triad.",
    };
  }

  // Dual-doshic (Dvidoshaja): top two doshas within 1-2 points of each other and clearly leading the third
  const isDualDoshic = first.score - second.score <= 1 || (first.score - second.score <= 2 && second.score >= 4);

  if (isDualDoshic) {
    const d1 = first.dosha.charAt(0).toUpperCase() + first.dosha.slice(1);
    const d2 = second.dosha.charAt(0).toUpperCase() + second.dosha.slice(1);
    return {
      vata,
      pitta,
      kapha,
      vataPct,
      pittaPct,
      kaphaPct,
      primaryDosha: "dual",
      secondaryDosha: second.dosha,
      classificationTitle: `${d1}-${d2} Dual Tendency (Dvidoshaja Pattern)`,
      classificationDescription: `Your responses highlight a blended constitutional pattern where ${d1} and ${d2} are co-predominant. Classical Ayurveda notes that pure single-dosha profiles are less common than dual-dosha combinations. Your natural tendencies likely express ${d1} traits in certain daily areas and ${d2} traits in others.`,
    };
  }

  // Single Dosha Predominant
  const dName = first.dosha.charAt(0).toUpperCase() + first.dosha.slice(1);
  const descriptions: Record<DoshaType, string> = {
    vata: "Your responses reflect a notable alignment with classical Vata characteristics—the biological principle of movement, air, and ether. You may exhibit quick adaptability, creative ideation, and rapid energy shifts. Traditional Dinacharya recommends warming, grounding routines and regular meal rhythms.",
    pitta: "Your responses reflect an alignment with classical Pitta characteristics—the biological principle of transformation, digestion, and heat. You may experience strong metabolic drive, sharp analytical clarity, and purposeful leadership. Traditional Dinacharya emphasizes cooling foods, moderation, and relaxation.",
    kapha: "Your responses reflect an alignment with classical Kapha characteristics—the biological principle of cohesion, stability, and structure. You may possess strong physical endurance, patient steadiness, and restorative sleep. Traditional Dinacharya emphasizes invigorating activity, lightness, and morning movement.",
  };

  return {
    vata,
    pitta,
    kapha,
    vataPct,
    pittaPct,
    kaphaPct,
    primaryDosha: first.dosha,
    classificationTitle: `${dName}-Prominent Tendency (${dName} Prakriti Pattern)`,
    classificationDescription: descriptions[first.dosha],
  };
}

// ─── Main Quiz Component ──────────────────────────────────────────────────────

interface DoshaQuizProps {
  onSelectDoshaDossier?: (dosha: DoshaType) => void;
}

export function DoshaQuiz({ onSelectDoshaDossier }: DoshaQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, DoshaType>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [resultScores, setResultScores] = useState<QuizScores | null>(null);

  const totalQuestions = DOSHA_QUESTIONS.length;
  const currentQ = DOSHA_QUESTIONS[currentQuestionIndex];
  const selectedAnswer = answers[currentQ.id];
  const progressPct = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  const handleSelectOption = (dosha: DoshaType) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: dosha,
    }));
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Final question answered: compute scores and view results
      const scores = computeQuizScores(answers);
      setResultScores(scores);
      setIsCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setIsCompleted(false);
    setResultScores(null);
  };

  return (
    <div className="rounded-2xl bg-[#FCFAF6] border border-[#E5D9C6] p-6 sm:p-8 space-y-6 shadow-sm">
      {/* ── Header ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5D9C6] pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B96345]" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B96345]">
              Interactive Educational Discovery
            </span>
          </div>
          <h2 className="font-serif text-2xl text-[#173D32] font-semibold">
            Discover Your Possible Dosha Pattern
          </h2>
          <p className="text-xs text-[#596157]">
            12 self-reflection questions exploring classical physical, metabolic, and behavioral tendencies.
          </p>
        </div>

        {!isCompleted && (
          <div className="text-right shrink-0">
            <span className="text-xs font-semibold text-[#173D32]">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <span className="block text-[11px] text-[#596157]">
              {Math.round(((Object.keys(answers).length) / totalQuestions) * 100)}% Answered
            </span>
          </div>
        )}
      </div>

      {/* ── Epistemic Notice Banner ─────────────────────────────────────────── */}
      <div className="rounded-xl bg-[#FFF8F2] border border-[#E8C4AD] p-4 flex items-start gap-3">
        <ShieldAlertIcon className="w-4 h-4 text-[#B96345] flex-shrink-0 mt-0.5" />
        <p className="text-xs text-[#9A4F35] leading-relaxed">
          <strong>Educational Heuristic Only:</strong> This self-assessment is an illustrative learning tool.
          It does <em>not</em> constitute a medical test, clinical diagnosis, or biomedical phenotyping. Authentic
          Ayurvedic Prakriti assessment requires direct examination (Darshana, Prashna, Nadi Pariksha) by a
          registered BAMS/MD physician.
        </p>
      </div>

      {/* ── Active Quiz Flow ─────────────────────────────────────────────────── */}
      {!isCompleted ? (
        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="w-full bg-[#E5D9C6] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#173D32] h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPct}%` }}
                role="progressbar"
                aria-valuenow={progressPct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Quiz progress"
              />
            </div>
            <div className="flex justify-between text-[10px] text-[#596157]">
              <span>Category: {currentQ.category}</span>
              <span>Step {currentQuestionIndex + 1} of {totalQuestions}</span>
            </div>
          </div>

          {/* Current Question Card */}
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#596157]">
                Question {currentQuestionIndex + 1}
              </span>
              <h3 className="font-serif text-lg sm:text-xl text-[#173D32] font-semibold leading-snug">
                {currentQ.prompt}
              </h3>
              <p className="text-xs text-[#596157] italic">{currentQ.hint}</p>
            </div>

            {/* Options List */}
            <div className="space-y-3 pt-2" role="radiogroup" aria-label={currentQ.prompt}>
              {currentQ.options.map((opt) => {
                const isSelected = selectedAnswer === opt.dosha;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => handleSelectOption(opt.dosha)}
                    className={`w-full text-left p-4 sm:p-5 rounded-xl border-2 transition-all flex items-start gap-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#173D32] ${
                      isSelected
                        ? "bg-[#EAF5F0] border-[#2D7A5F] shadow-sm"
                        : "bg-[#FCFAF6] border-[#E5D9C6] hover:border-[#C8BBA8] hover:bg-[#F6F2E9]/60"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isSelected
                          ? "border-[#2D7A5F] bg-[#2D7A5F] text-white"
                          : "border-[#A8B7A0] bg-transparent"
                      }`}
                      aria-hidden="true"
                    >
                      {isSelected && <span className="text-[10px] font-bold">✓</span>}
                    </div>

                    <div className="space-y-1">
                      <div
                        className={`text-sm font-semibold leading-snug ${
                          isSelected ? "text-[#1A5C44]" : "text-[#242923]"
                        }`}
                      >
                        {opt.text}
                      </div>
                      <p className="text-xs text-[#596157] leading-relaxed">
                        {opt.detail}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-[#E5D9C6]">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                currentQuestionIndex === 0
                  ? "opacity-40 cursor-not-allowed bg-transparent border-[#E5D9C6] text-[#596157]"
                  : "bg-[#FCFAF6] border-[#E5D9C6] text-[#173D32] hover:bg-[#E5D9C6]/50"
              }`}
            >
              &larr; Previous Question
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!selectedAnswer}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm ${
                !selectedAnswer
                  ? "opacity-50 cursor-not-allowed bg-[#173D32] text-white"
                  : "bg-[#173D32] text-white hover:bg-[#235244]"
              }`}
            >
              <span>
                {currentQuestionIndex === totalQuestions - 1
                  ? "View Possible Dosha Pattern"
                  : "Next Question"}
              </span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* ── Results Screen ─────────────────────────────────────────────────── */
        resultScores && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Outcome Overview Card */}
            <div className="rounded-2xl bg-[#EAF5F0] border border-[#A8D5C2] p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1A5C44]">
                <CheckCircleIcon className="w-4 h-4 text-[#2D7A5F]" />
                Self-Assessment Summary
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#173D32]">
                {resultScores.classificationTitle}
              </h3>

              <p className="text-sm text-[#242923] leading-relaxed">
                {resultScores.classificationDescription}
              </p>
            </div>

            {/* Tripartite Spectrum Proportion Bar */}
            <div className="space-y-4 bg-[#FCFAF6] p-6 rounded-2xl border border-[#E5D9C6]">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-base font-semibold text-[#173D32]">
                  Tripartite Tendency Distribution
                </h4>
                <span className="text-[11px] text-[#596157]">
                  Normalized across 12 responses
                </span>
              </div>

              {/* Stacked Proportional Bar */}
              <div className="w-full h-5 rounded-full overflow-hidden flex bg-[#E5D9C6]">
                <div
                  className="bg-[#4A7FA5] h-full transition-all duration-500"
                  style={{ width: `${resultScores.vataPct}%` }}
                  title={`Vata: ${resultScores.vataPct}%`}
                />
                <div
                  className="bg-[#B96345] h-full transition-all duration-500"
                  style={{ width: `${resultScores.pittaPct}%` }}
                  title={`Pitta: ${resultScores.pittaPct}%`}
                />
                <div
                  className="bg-[#2D7A5F] h-full transition-all duration-500"
                  style={{ width: `${resultScores.kaphaPct}%` }}
                  title={`Kapha: ${resultScores.kaphaPct}%`}
                />
              </div>

              {/* Spectrum Breakdown Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="rounded-xl bg-[#EBF3F9] border border-[#C1D8E8] p-4 text-center space-y-1">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#1E4A6B]">
                    Vata (Movement)
                  </div>
                  <div className="font-serif text-2xl font-bold text-[#1E4A6B]">
                    {resultScores.vataPct}%
                  </div>
                  <div className="text-[11px] text-[#2A5F7A]">
                    {resultScores.vata} of 12 selections
                  </div>
                </div>

                <div className="rounded-xl bg-[#FAF0EC] border border-[#E8C4AD] p-4 text-center space-y-1">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#7A3920]">
                    Pitta (Transformation)
                  </div>
                  <div className="font-serif text-2xl font-bold text-[#7A3920]">
                    {resultScores.pittaPct}%
                  </div>
                  <div className="text-[11px] text-[#9A4F35]">
                    {resultScores.pitta} of 12 selections
                  </div>
                </div>

                <div className="rounded-xl bg-[#EAF5F0] border border-[#A8D5C2] p-4 text-center space-y-1">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#1A5C44]">
                    Kapha (Cohesion)
                  </div>
                  <div className="font-serif text-2xl font-bold text-[#1A5C44]">
                    {resultScores.kaphaPct}%
                  </div>
                  <div className="text-[11px] text-[#1E5C44]">
                    {resultScores.kapha} of 12 selections
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Links to Classical Reference Dossiers */}
            <div className="rounded-2xl bg-[#FCFAF6] border border-[#E5D9C6] p-6 space-y-4">
              <h4 className="font-serif text-base font-semibold text-[#173D32] flex items-center gap-2">
                <BookOpenIcon className="w-4 h-4 text-[#B96345]" />
                Explore Classical Treatise Dossiers for Your Pattern
              </h4>
              <p className="text-xs text-[#596157] leading-relaxed">
                Click any of the canonical dosha profiles below to inspect primary Sanskrit textual
                references from the Charaka and Sushruta Samhitas, governing functions (Dosha Karma),
                and modern genomic research limits:
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                {(["vata", "pitta", "kapha"] as DoshaType[]).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => {
                      if (onSelectDoshaDossier) {
                        onSelectDoshaDossier(d);
                      }
                      // Smooth scroll to the dossier tabs section
                      const dossierSection = document.getElementById("dossier-explorer");
                      if (dossierSection) {
                        dossierSection.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#173D32] text-white hover:bg-[#235244] transition-colors"
                  >
                    <span>Inspect {d.charAt(0).toUpperCase() + d.slice(1)} Dossier</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#E5D9C6]">
              <button
                type="button"
                onClick={handleRestart}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#FCFAF6] border border-[#E5D9C6] text-[#596157] hover:text-[#173D32] hover:bg-[#E5D9C6]/50 transition-colors"
              >
                &#x21bb; Retake Quiz
              </button>

              <div className="flex gap-3">
                <a
                  href="/learn"
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold border border-[#E5D9C6] text-[#173D32] hover:bg-[#E5D9C6]/50 transition-colors"
                >
                  Read Misinformation Library
                </a>
                <a
                  href="/investigate"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#B96345] text-white hover:bg-[#9A4F35] transition-colors"
                >
                  <SparklesIcon className="w-3.5 h-3.5" />
                  <span>Investigate a Claim</span>
                </a>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
