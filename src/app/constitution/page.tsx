"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  SparklesIcon,
  ShieldAlertIcon,
  BookOpenIcon,
  ArrowRightIcon,
  SearchIcon,
} from "@/components/ui/icons";

// ─── Type Definitions ────────────────────────────────────────────────────────

type DoshaKey = "vata" | "pitta" | "kapha";

interface DoshaCharacteristic {
  category: string;
  description: string;
}

interface DoshaData {
  key: DoshaKey;
  name: string;
  sanskrit: string;
  tagline: string;
  elements: string[];
  elementSymbols: string[];
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  accentText: string;
  badgeBg: string;
  symbol: string;
  primaryQualities: string[];
  governedFunctions: string[];
  characteristics: DoshaCharacteristic[];
  balancedSigns: string[];
  imbalanceSigns: string[];
  lifestyleNotes: string[];
  classicalSource: string;
  modernNote: string;
}

// ─── Dosha Dataset (Canonical Ayurvedic Content) ────────────────────────────

const DOSHA_DATA: Record<DoshaKey, DoshaData> = {
  vata: {
    key: "vata",
    name: "Vata",
    sanskrit: "वात",
    tagline: "The Principle of Motion & Neurological Regulation",
    elements: ["Air (Vayu)", "Ether (Akasha)"],
    elementSymbols: ["🌬", "✨"],
    accentColor: "#4A7FA5",
    accentBg: "#EBF3F9",
    accentBorder: "#C1D8E8",
    accentText: "#1E4A6B",
    badgeBg: "#D6EAF5",
    symbol: "वा",
    primaryQualities: [
      "Light (Laghu)",
      "Dry (Ruksha)",
      "Cold (Sheeta)",
      "Subtle (Sukshma)",
      "Mobile (Chala)",
      "Rough (Khara)",
      "Clear (Vishada)",
    ],
    governedFunctions: [
      "Nervous system impulse conduction",
      "Respiratory rhythm and breathing",
      "Cardiovascular circulation",
      "Musculoskeletal movement",
      "Sensory perception",
      "Mental cognition and speech",
      "Elimination of waste (Mala)",
    ],
    characteristics: [
      {
        category: "Cognitive Style",
        description:
          "Classical texts describe Vata-prominent constitutions as quick to grasp new information and equally quick to forget. Creativity, enthusiasm, and rapid ideation are hallmarks, alongside a tendency toward mental restlessness (Chanchala Manas).",
      },
      {
        category: "Physical Frame",
        description:
          "Tends toward a lean, light body frame with prominent joints and tendons. Variable appetite and digestion (Vishama Agni). Dry skin, hair, and nails are commonly observed. Sleep is typically light and interrupted.",
      },
      {
        category: "Emotional Tendencies",
        description:
          "Enthusiasm, adaptability, and spontaneity are characteristic. Under physiological stress, Vata imbalance classically manifests as anxiety, fearfulness (Bhaya), and mental overwhelm — described as Vata Vriddhi in Ashtanga Hridayam.",
      },
      {
        category: "Seasonal Relationship",
        description:
          "Vata naturally accumulates (Sanchaya) during late summer and aggravates (Prakopa) during the cold, dry, windy months of winter. Classical protocols recommend warming, unctuous, grounding regimens (Snehana) during this season.",
      },
    ],
    balancedSigns: [
      "Sharp, creative thinking",
      "Enthusiasm and adaptability",
      "Regular, active energy",
      "Healthy movement and agility",
      "Clear, expressive communication",
    ],
    imbalanceSigns: [
      "Anxiety, worry, or racing thoughts",
      "Dry skin, joints, or constipation",
      "Interrupted or insufficient sleep",
      "Joint stiffness or crackling sounds",
      "Scattered focus or indecisiveness",
    ],
    lifestyleNotes: [
      "Classical Ayurvedic texts recommend grounding, warming, and nourishing regimens for Vata pacification",
      "Consistent daily routines (Dinacharya) are emphasized — irregular schedules aggravate Vata",
      "Sesame oil self-massage (Abhyanga) is a classical Vata-pacifying practice from the Charaka Samhita",
      "Adequate rest and sleep form a cornerstone of Vata balance protocols in classical literature",
    ],
    classicalSource:
      "Charaka Samhita, Sutrasthana Ch. 12; Ashtanga Hridayam, Sutrasthana Ch. 1",
    modernNote:
      "There is currently limited peer-reviewed clinical evidence establishing direct correlations between Vata Prakriti typing and specific biomedical disease risk markers. Genomic and metabolomic studies of Prakriti are an area of ongoing exploratory research (e.g., CSIR-IGIB studies).",
  },

  pitta: {
    key: "pitta",
    name: "Pitta",
    sanskrit: "पित्त",
    tagline: "The Principle of Metabolic Transformation & Discernment",
    elements: ["Fire (Tejas)", "Water (Jala)"],
    elementSymbols: ["🔥", "💧"],
    accentColor: "#B96345",
    accentBg: "#FAF0EC",
    accentBorder: "#E8C4AD",
    accentText: "#7A3920",
    badgeBg: "#F5DDD0",
    symbol: "पि",
    primaryQualities: [
      "Hot (Ushna)",
      "Sharp (Tikshna)",
      "Light (Laghu)",
      "Slightly Oily (Snigdha)",
      "Liquid (Drava)",
      "Spreading (Sara)",
      "Pungent Odour (Visram)",
    ],
    governedFunctions: [
      "Digestive enzymatic activity (Pachaka Agni)",
      "Liver and bile secretion metabolism",
      "Hormonal regulation and endocrine function",
      "Visual perception and processing",
      "Thermoregulation and body heat",
      "Intellectual discernment and understanding",
      "Skin lustre and coloration (Ranjaka)",
    ],
    characteristics: [
      {
        category: "Cognitive Style",
        description:
          "Classical texts describe Pitta-prominent constitutions as possessing sharp intellect, penetrating analytical ability, and strong determination. The Charaka Samhita attributes Medhavi (intelligent, sharp) qualities to balanced Pitta, with a natural inclination toward leadership and critical reasoning.",
      },
      {
        category: "Physical Frame",
        description:
          "Medium, well-proportioned frame with good muscular development. Characteristically warm skin, often with a reddish or coppery complexion. Sharp, penetrating eyes. Strong appetite and efficient digestion (Sama or Tikshna Agni) — irregular meals are poorly tolerated.",
      },
      {
        category: "Emotional Tendencies",
        description:
          "Confidence, passion, and focus are characteristic of balanced Pitta. Classical texts describe Pitta imbalance (Pitta Vriddhi) as manifesting in irritability, criticism, perfectionism, and intensity — corresponding to excess heat (Ushna) in the psychological sphere.",
      },
      {
        category: "Seasonal Relationship",
        description:
          "Pitta accumulates during the hot, humid late summer monsoon season and aggravates in early autumn. Classical protocols recommend cooling, sweet, bitter regimens (Tikta-Kashaya Rasa) and moderation of heat exposure during Pitta season.",
      },
    ],
    balancedSigns: [
      "Sharp, clear analytical thinking",
      "Consistent, strong digestion",
      "Purposeful ambition and leadership",
      "Healthy, lustrous skin and complexion",
      "Warm, confident interpersonal presence",
    ],
    imbalanceSigns: [
      "Irritability, anger, or intolerance",
      "Acid reflux, heartburn, or inflammation",
      "Skin rashes, acne, or heat sensitivity",
      "Excessive competitiveness or criticism",
      "Burning sensations or excessive thirst",
    ],
    lifestyleNotes: [
      "Classical texts recommend cooling, sweet, bitter, and astringent tastes (Tikta, Kashaya, Madhura Rasa) for Pitta pacification",
      "Moderate, non-competitive physical activity during cooler periods of the day is classically advised",
      "Exposure to natural beauty, water, and moonlight are mentioned in classical wellness regimens for Pitta balance",
      "Pranayama practices that emphasize slow, cooling breath (Sheetali, Sheetkari) are traditionally associated with Pitta regulation",
    ],
    classicalSource:
      "Charaka Samhita, Sutrasthana Ch. 12; Sushruta Samhita, Sutrasthana Ch. 15",
    modernNote:
      "Some exploratory genomic studies have identified gene expression correlations with self-reported Prakriti classifications. However, these are preliminary research-stage findings; Pitta as a clinically validated biomedical entity is not yet established in peer-reviewed medicine.",
  },

  kapha: {
    key: "kapha",
    name: "Kapha",
    sanskrit: "कफ",
    tagline: "The Principle of Structural Cohesion & Anabolic Stability",
    elements: ["Earth (Prithvi)", "Water (Jala)"],
    elementSymbols: ["🌍", "💧"],
    accentColor: "#2D7A5F",
    accentBg: "#EAF5F0",
    accentBorder: "#A8D5C2",
    accentText: "#1A5C44",
    badgeBg: "#C8E8DC",
    symbol: "क",
    primaryQualities: [
      "Heavy (Guru)",
      "Cold (Sheeta)",
      "Soft (Mridu)",
      "Oily (Snigdha)",
      "Slow (Manda)",
      "Stable (Sthira)",
      "Smooth (Slakshna)",
      "Cloudy (Picchila)",
    ],
    governedFunctions: [
      "Structural tissue integrity (Dhatu building)",
      "Mucosal membrane and synovial lubrication",
      "Immune system vitality (Ojas)",
      "Anabolic tissue synthesis and repair",
      "Long-term memory consolidation",
      "Endocrine fluid regulation",
      "Emotional stability and groundedness",
    ],
    characteristics: [
      {
        category: "Cognitive Style",
        description:
          "Classical texts describe Kapha-prominent constitutions as slow, methodical learners who retain information with exceptional depth and loyalty. Once knowledge is acquired, retention is long-lasting (Sthira Smriti). Deliberate, patient decision-making is characteristic.",
      },
      {
        category: "Physical Frame",
        description:
          "Typically a robust, heavier frame with well-developed musculature and good endurance. Large, soft, expressive eyes and thick, lustrous hair. Slow but steady digestive fire (Manda Agni). Natural tendency toward weight gain; excellent physical endurance and stamina.",
      },
      {
        category: "Emotional Tendencies",
        description:
          "Compassion, patience, loyalty, and emotional steadiness are hallmarks of balanced Kapha. Kapha imbalance (Kapha Vriddhi) classically manifests as attachment, excessive sentimentality, reluctance to change, and lethargy — described as Tamas increasing through Kapha excess.",
      },
      {
        category: "Seasonal Relationship",
        description:
          "Kapha accumulates through winter and aggravates in spring, when the melting quality of seasonal warmth liquefies accumulated Kapha. Classical texts strongly advise invigorating, light, pungent, bitter regimens (Katu-Tikta Rasa) and vigorous exercise in spring.",
      },
    ],
    balancedSigns: [
      "Exceptional endurance and stamina",
      "Deep, uninterrupted, restorative sleep",
      "Compassionate, patient temperament",
      "Strong, loyal, and reliable relationships",
      "Steady, reliable immune resistance",
    ],
    imbalanceSigns: [
      "Sluggishness, lethargy, or excessive sleep",
      "Weight gain or fluid retention",
      "Nasal congestion, mucus excess, or heaviness",
      "Attachment, possessiveness, or resistance to change",
      "Slow digestion or loss of appetite",
    ],
    lifestyleNotes: [
      "Classical Ayurvedic texts recommend light, warm, stimulating, pungent, and bitter food tastes for Kapha pacification",
      "Regular, vigorous physical activity is strongly emphasized in classical literature as essential for Kapha balance",
      "Dry massage (Udvartana) with herbal powders is a classical Kapha-pacifying practice described in Ashtanga Hridayam",
      "Stimulating morning routines, reduced daytime sleep, and avoidance of cold, heavy foods are classical Kapha recommendations",
    ],
    classicalSource:
      "Charaka Samhita, Sutrasthana Ch. 12; Ashtanga Hridayam, Sutrasthana Ch. 1",
    modernNote:
      "Metabolic and anthropometric studies on Kapha Prakriti have shown some preliminary associations with BMI and lipid profiles in small cohort studies. These remain exploratory; Kapha is not a clinically validated metabolic subtype in contemporary biomedicine.",
  },
};

const DOSHA_KEYS: DoshaKey[] = ["vata", "pitta", "kapha"];

// ─── Sub-component: Dosha Tab Button ────────────────────────────────────────

function DoshaTabButton({
  dosha,
  isActive,
  onClick,
}: {
  dosha: DoshaData;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      id={`tab-${dosha.key}`}
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${dosha.key}`}
      onClick={onClick}
      className={`flex-1 sm:flex-none flex flex-col sm:flex-row items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl border-2 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#173D32] ${
        isActive
          ? "border-current shadow-md"
          : "border-[#E5D9C6] bg-[#FCFAF6] hover:border-[#C8BBA8] hover:shadow-sm"
      }`}
      style={
        isActive
          ? {
              backgroundColor: dosha.accentBg,
              borderColor: dosha.accentColor,
              color: dosha.accentText,
            }
          : { color: "#596157" }
      }
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center font-serif text-base font-bold flex-shrink-0 transition-colors"
        style={
          isActive
            ? {
                backgroundColor: dosha.accentColor,
                color: "#F6F2E9",
              }
            : {
                backgroundColor: "#E5D9C6",
                color: "#173D32",
              }
        }
      >
        {dosha.symbol}
      </div>
      <div>
        <div className="font-serif text-base font-semibold leading-tight">
          {dosha.name}{" "}
          <span className="font-sans text-xs font-normal">({dosha.sanskrit})</span>
        </div>
        <div className="text-[11px] leading-snug mt-0.5 hidden sm:block">
          {dosha.elements.join(" · ")}
        </div>
      </div>
    </button>
  );
}

// ─── Sub-component: Quality Pill ─────────────────────────────────────────────

function QualityPill({
  label,
  accentBg,
  accentText,
}: {
  label: string;
  accentBg: string;
  accentText: string;
}) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-semibold"
      style={{ backgroundColor: accentBg, color: accentText }}
    >
      {label}
    </span>
  );
}

// ─── Sub-component: List Row ─────────────────────────────────────────────────

function ListRow({
  items,
  variant,
}: {
  items: string[];
  variant: "balance" | "imbalance";
}) {
  const dotColor = variant === "balance" ? "#2D7A5F" : "#B96345";
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-xs text-[#242923]">
          <span
            className="w-4 h-4 rounded-full flex items-center justify-center text-white flex-shrink-0 mt-0.5 text-[9px] font-bold"
            style={{ backgroundColor: variant === "balance" ? dotColor : dotColor }}
            aria-hidden="true"
          >
            {variant === "balance" ? "✓" : "!"}
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

// ─── Main Page Component ─────────────────────────────────────────────────────

export default function ConstitutionPage() {
  const [activeDosha, setActiveDosha] = useState<DoshaKey>("vata");
  const dosha = DOSHA_DATA[activeDosha];

  return (
    <div className="min-h-screen bg-[#F6F2E9]">
      {/* ── Page Header ─────────────────────────────────────────────────────── */}
      <div className="border-b border-[#E5D9C6] bg-[#FCFAF6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#173D32]/10 text-[#173D32] text-xs font-semibold uppercase tracking-wider">
              <BookOpenIcon className="w-3.5 h-3.5 text-[#B96345]" />
              <span>Classical Knowledge · Sanskrit Literature</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#173D32] font-semibold tracking-tight leading-tight">
              Constitution Explorer
              <span className="block text-lg sm:text-xl font-normal text-[#596157] font-sans mt-1">
                Prakriti (प्रकृति) — The Tridosha Framework
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#596157] leading-relaxed">
              Ayurvedic classical medicine describes individual constitution through{" "}
              <em>Prakriti</em> — the innate psychophysiological pattern established at
              conception, governed by the interplay of three biological forces called{" "}
              <strong>Doshas</strong>. Explore their classical descriptions, governing functions,
              and traditional lifestyle frameworks drawn from primary Sanskrit treatises.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 space-y-10">

        {/* ── Epistemic Disclaimer ──────────────────────────────────────────── */}
        <div
          className="rounded-2xl border p-5 flex items-start gap-4"
          style={{
            backgroundColor: "#FFF8F2",
            borderColor: "#E8C4AD",
          }}
          role="note"
          aria-label="Educational disclaimer"
        >
          <ShieldAlertIcon className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#B96345]" />
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#7A3920]">
              Educational Content — Not a Medical Assessment
            </p>
            <p className="text-xs text-[#9A4F35] leading-relaxed">
              The Tridosha framework is a{" "}
              <strong>traditional Ayurvedic philosophical system</strong> drawn from
              2,000-year-old classical Sanskrit texts. It is not a scientifically validated
              personality classification, clinical diagnostic category, or evidence-based
              medical test. Prakriti descriptions are educational heuristics from traditional
              medicine — they do not diagnose conditions, predict disease, or prescribe
              treatment. Consult a qualified healthcare professional for any health concerns.
            </p>
          </div>
        </div>

        {/* ── What is Prakriti? ─────────────────────────────────────────────── */}
        <div className="rounded-2xl bg-[#FCFAF6] border border-[#E5D9C6] p-6 sm:p-8">
          <h2 className="font-serif text-xl sm:text-2xl text-[#173D32] font-semibold mb-4">
            What is Prakriti?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#596157] leading-relaxed">
            <div className="space-y-3">
              <p>
                The Sanskrit term <em>Prakriti</em> (प्रकृति) means &ldquo;nature&rdquo; or
                &ldquo;original state.&rdquo; In classical Ayurveda, it denotes the unique
                constitutional blueprint of an individual — their innate psychophysiological
                pattern — determined by the relative predominance of the three Doshas
                at the moment of conception.
              </p>
              <p>
                Classical texts describe seven primary constitutional types (Sapta Prakriti):
                three pure single-dosha types, three dual-dosha types, and one balanced
                tri-doshic type (Sama Prakriti) — considered the rarest and most ideal by
                the tradition.
              </p>
            </div>
            <div className="space-y-3">
              <p>
                According to Charaka Samhita (Vimanasthana, Ch. 8), Prakriti influences
                physical frame, digestive capacity, sleep patterns, cognitive tendencies,
                emotional responses, and susceptibility to certain health disturbances — but
                remains constant throughout an individual&apos;s lifetime, unlike the
                fluctuating <em>Vikriti</em> (current state of imbalance).
              </p>
              <p>
                Modern genomics researchers have conducted exploratory studies attempting to
                correlate Prakriti with gene expression patterns, though these remain
                preliminary and do not validate Prakriti as a clinical biomedical category.
              </p>
            </div>
          </div>
        </div>

        {/* ── Dosha Selector Tabs ───────────────────────────────────────────── */}
        <div>
          <h2 className="font-serif text-xl sm:text-2xl text-[#173D32] font-semibold mb-5">
            Explore the Three Doshas
          </h2>

          {/* Tab Bar */}
          <div
            role="tablist"
            aria-label="Select a Dosha to explore"
            className="flex flex-col sm:flex-row gap-3 mb-8"
          >
            {DOSHA_KEYS.map((key) => (
              <DoshaTabButton
                key={key}
                dosha={DOSHA_DATA[key]}
                isActive={activeDosha === key}
                onClick={() => setActiveDosha(key)}
              />
            ))}
          </div>

          {/* Tab Panel */}
          <div
            id={`panel-${dosha.key}`}
            role="tabpanel"
            aria-labelledby={`tab-${dosha.key}`}
            className="space-y-6 animate-in fade-in duration-200"
          >
            {/* Hero Dosha Header Card */}
            <div
              className="rounded-2xl border p-6 sm:p-8 space-y-5"
              style={{
                backgroundColor: dosha.accentBg,
                borderColor: dosha.accentBorder,
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center font-serif text-2xl font-bold shadow-sm"
                      style={{
                        backgroundColor: dosha.accentColor,
                        color: "#F6F2E9",
                      }}
                    >
                      {dosha.symbol}
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl sm:text-3xl font-semibold"
                        style={{ color: dosha.accentText }}>
                        {dosha.name} ({dosha.sanskrit})
                      </h2>
                      <p className="text-sm font-medium" style={{ color: dosha.accentColor }}>
                        {dosha.tagline}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 shrink-0">
                  {dosha.elements.map((el, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border"
                      style={{
                        backgroundColor: dosha.badgeBg,
                        borderColor: dosha.accentBorder,
                        color: dosha.accentText,
                      }}
                    >
                      <span>{dosha.elementSymbols[i]}</span>
                      {el}
                    </span>
                  ))}
                </div>
              </div>

              {/* Primary Qualities */}
              <div className="space-y-2">
                <p
                  className="text-[11px] font-semibold uppercase tracking-wider"
                  style={{ color: dosha.accentColor }}
                >
                  Classical Gunas (Qualities) — Ashtanga Hridayam Sutrasthana
                </p>
                <div className="flex flex-wrap gap-2">
                  {dosha.primaryQualities.map((q, i) => (
                    <QualityPill
                      key={i}
                      label={q}
                      accentBg={dosha.badgeBg}
                      accentText={dosha.accentText}
                    />
                  ))}
                </div>
              </div>

              {/* Canonical Source */}
              <p className="text-[11px] italic" style={{ color: dosha.accentColor }}>
                Primary classical reference: {dosha.classicalSource}
              </p>
            </div>

            {/* Two-column Grid: Functions + Characteristics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Governed Physiological Functions */}
              <div className="rounded-2xl bg-[#FCFAF6] border border-[#E5D9C6] p-6 space-y-4">
                <h3 className="font-serif text-lg text-[#173D32] font-semibold">
                  Governed Physiological Functions
                </h3>
                <p className="text-[11px] text-[#596157]">
                  As described in classical Ayurvedic treatises (Dosha Karma):
                </p>
                <ul className="space-y-2">
                  {dosha.governedFunctions.map((fn, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                        style={{ backgroundColor: dosha.accentColor }}
                        aria-hidden="true"
                      />
                      <span className="text-xs text-[#242923]">{fn}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Balance & Imbalance Signs */}
              <div className="space-y-4">
                <div className="rounded-2xl bg-[#EAF5F0] border border-[#A8D5C2] p-5 space-y-3">
                  <h3 className="font-serif text-base text-[#1A5C44] font-semibold flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#2D7A5F] text-white flex items-center justify-center text-[9px] font-bold">✓</span>
                    Signs of Balance (Sama {dosha.name})
                  </h3>
                  <ListRow
                    items={dosha.balancedSigns}
                    variant="balance"
                  />
                </div>
                <div className="rounded-2xl bg-[#FAF0EC] border border-[#E8C4AD] p-5 space-y-3">
                  <h3 className="font-serif text-base text-[#7A3920] font-semibold flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#B96345] text-white flex items-center justify-center text-[9px] font-bold">!</span>
                    Classical Imbalance Indicators ({dosha.name} Vriddhi)
                  </h3>
                  <ListRow
                    items={dosha.imbalanceSigns}
                    variant="imbalance"
                  />
                </div>
              </div>
            </div>

            {/* Classical Characteristics — Accordion-style cards */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg text-[#173D32] font-semibold">
                Classical Constitutional Characteristics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dosha.characteristics.map((char, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-[#FCFAF6] border border-[#E5D9C6] p-5 space-y-2"
                  >
                    <h4
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: dosha.accentColor }}
                    >
                      {char.category}
                    </h4>
                    <p className="text-xs text-[#242923] leading-relaxed">
                      {char.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Traditional Lifestyle Notes */}
            <div className="rounded-2xl bg-[#FCFAF6] border border-[#E5D9C6] p-6 sm:p-8 space-y-4">
              <h3 className="font-serif text-lg text-[#173D32] font-semibold">
                Classical Lifestyle Framework (Dinacharya Recommendations)
              </h3>
              <p className="text-[11px] text-[#596157]">
                Drawn from the Charaka Samhita and Ashtanga Hridayam — these are
                traditional Ayurvedic lifestyle recommendations, not evidence-based
                clinical prescriptions:
              </p>
              <ul className="space-y-3">
                {dosha.lifestyleNotes.map((note, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[#F6F2E9] text-[10px] font-bold mt-0.5"
                      style={{ backgroundColor: dosha.accentColor }}
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <span className="text-xs text-[#242923] leading-relaxed">{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modern Research Note */}
            <div className="rounded-xl bg-[#EBF3F9] border border-[#C1D8E8] p-5 flex items-start gap-3">
              <SparklesIcon className="w-4 h-4 text-[#4A7FA5] flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#1E4A6B]">
                  Modern Research Context
                </p>
                <p className="text-xs text-[#2A5F7A] leading-relaxed">{dosha.modernNote}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── All Three Doshas Comparison Grid ─────────────────────────────── */}
        <div className="rounded-2xl bg-[#FCFAF6] border border-[#E5D9C6] p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="font-serif text-xl sm:text-2xl text-[#173D32] font-semibold">
              Tridosha at a Glance
            </h2>
            <p className="text-xs text-[#596157]">
              A comparative summary of the three classical Doshas as described in the
              Brihat-Trayi (Major Triad of Ayurvedic classical texts).
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse" aria-label="Tridosha comparison table">
              <thead>
                <tr className="border-b border-[#E5D9C6]">
                  <th className="text-left py-3 px-4 text-[#173D32] font-semibold text-xs uppercase tracking-wider w-36">
                    Attribute
                  </th>
                  {DOSHA_KEYS.map((key) => {
                    const d = DOSHA_DATA[key];
                    return (
                      <th
                        key={key}
                        className="text-left py-3 px-4 font-serif text-sm font-semibold"
                        style={{ color: d.accentText }}
                      >
                        {d.name} ({d.sanskrit})
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5D9C6]">
                {[
                  {
                    label: "Primary Elements",
                    values: DOSHA_KEYS.map((k) => DOSHA_DATA[k].elements.join(", ")),
                  },
                  {
                    label: "Key Quality (Guna)",
                    values: ["Mobile, Dry, Light", "Hot, Sharp, Spreading", "Heavy, Cold, Stable"],
                  },
                  {
                    label: "Governs",
                    values: [
                      "Movement & Nervous System",
                      "Metabolism & Transformation",
                      "Structure & Immunity",
                    ],
                  },
                  {
                    label: "Seat (Mula Sthana)",
                    values: ["Colon (Pakvashaya)", "Small Intestine (Grahani)", "Stomach (Amashaya)"],
                  },
                  {
                    label: "Aggravation Season",
                    values: ["Winter (Hemanta/Shishira)", "Autumn (Sharad)", "Spring (Vasanta)"],
                  },
                ].map((row, ri) => (
                  <tr key={ri} className={ri % 2 === 0 ? "bg-[#F6F2E9]/40" : ""}>
                    <td className="py-3 px-4 font-semibold text-[#596157] uppercase tracking-wider text-[10px]">
                      {row.label}
                    </td>
                    {row.values.map((val, vi) => (
                      <td key={vi} className="py-3 px-4 text-[#242923] leading-relaxed">
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Prakriti Assessment Notice ────────────────────────────────────── */}
        <div className="rounded-2xl border border-[#E5D9C6] bg-[#FCFAF6] p-6 sm:p-8 space-y-5">
          <h2 className="font-serif text-xl text-[#173D32] font-semibold">
            How is Prakriti Determined in Classical Practice?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                step: "1",
                title: "Darshana (Visual Examination)",
                desc: "A qualified Ayurvedic physician observes the patient's body frame, complexion, eye characteristics, hair texture, nail quality, and overall physical presentation.",
              },
              {
                step: "2",
                title: "Prashna (Structured Inquiry)",
                desc: "A systematic interview covering digestive patterns, sleep quality, emotional responses, cognitive style, and historical health tendencies across multiple years.",
              },
              {
                step: "3",
                title: "Sparshana (Pulse Diagnosis — Nadi Pariksha)",
                desc: "Trained practitioners assess the quality, rhythm, and character of the radial pulse — traditionally the primary diagnostic method requiring years of supervised clinical training.",
              },
            ].map((item) => (
              <div key={item.step} className="rounded-xl bg-[#F6F2E9] border border-[#E5D9C6] p-5 space-y-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: "#173D32" }}
                >
                  {item.step}
                </div>
                <h3 className="font-serif text-sm font-semibold text-[#173D32]">{item.title}</h3>
                <p className="text-xs text-[#596157] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-[#FFF8F2] border border-[#E8C4AD] p-4 flex items-start gap-3">
            <ShieldAlertIcon className="w-4 h-4 text-[#B96345] flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[#9A4F35] leading-relaxed">
              <strong>Important:</strong> Online quizzes and self-assessment tools cannot
              replicate the full clinical Prakriti assessment described in classical texts.
              This platform does not provide automated Prakriti typing. For traditional
              Ayurvedic constitutional assessment, consult a registered BAMS or MD (Ayurveda)
              practitioner verified through the{" "}
              <a
                href="https://ncismindia.org"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline hover:text-[#7A3920] transition-colors"
              >
                NCISM Central Registry
              </a>
              .
            </p>
          </div>
        </div>

        {/* ── Cross-link to Claim Investigator ─────────────────────────────── */}
        <div className="rounded-2xl bg-[#173D32] text-[#F6F2E9] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold leading-tight">
              Encountered a Viral Ayurveda Claim?
            </h2>
            <p className="text-sm text-[#A8B7A0] leading-relaxed max-w-xl">
              Cross-reference health assertions against our curated peer-reviewed biomedical
              archive. Gemma 4 synthesises source-grounded analysis — strictly no hallucinated
              citations.
            </p>
          </div>
          <Link
            href="/investigate"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#B96345] text-white hover:bg-[#9A4F35] font-semibold text-sm tracking-wide shadow-md transition-all flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#B96345]"
          >
            <SearchIcon className="w-4 h-4" />
            <span>Investigate a Claim</span>
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>

        {/* ── Non-diagnostic Footer Note ────────────────────────────────────── */}
        <div className="p-4 rounded-xl bg-[#E5D9C6]/30 border border-[#E5D9C6] text-xs text-[#596157] text-center">
          The Tridosha framework and all Prakriti descriptions on this page are drawn
          exclusively from classical Sanskrit primary sources. They represent traditional
          Ayurvedic knowledge and do not constitute evidence-based medical advice,
          clinical diagnosis, or treatment prescription.
        </div>
      </div>
    </div>
  );
}
