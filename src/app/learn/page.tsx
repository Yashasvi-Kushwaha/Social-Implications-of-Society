"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  BookOpenIcon,
  SearchIcon,
  FilterIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  SparklesIcon,
} from "@/components/ui/icons";

// ─── Types ────────────────────────────────────────────────────────────────────

type Category =
  | "all"
  | "evidence-methodology"
  | "herbal-science"
  | "misinformation"
  | "safety"
  | "traditional-concepts";

interface Article {
  id: string;
  title: string;
  subtitle: string;
  category: Category;
  categoryLabel: string;
  readingTime: string;
  evidenceTag: "traditional-concept" | "scientific-evidence" | "safety-advisory" | "critical-literacy";
  evidenceTagLabel: string;
  summary: string;
  body: Section[];
  references: Reference[];
}

interface Section {
  heading: string;
  content: string;
}

interface Reference {
  label: string;
  url: string;
}

// ─── Category Configuration ───────────────────────────────────────────────────

const CATEGORIES: { key: Category; label: string; color: string; bg: string }[] = [
  { key: "all", label: "All Articles", color: "#173D32", bg: "#E5D9C6" },
  { key: "evidence-methodology", label: "Evidence Methodology", color: "#164E63", bg: "#EBF3F5" },
  { key: "herbal-science", label: "Herbal Science", color: "#2D7A5F", bg: "#EAF5F0" },
  { key: "misinformation", label: "Misinformation Literacy", color: "#B96345", bg: "#FAF0EC" },
  { key: "safety", label: "Safety & Contraindications", color: "#7A3920", bg: "#FEF0E8" },
  { key: "traditional-concepts", label: "Traditional Concepts", color: "#4A7FA5", bg: "#EBF3F9" },
];

const EVIDENCE_TAG_STYLES: Record<Article["evidenceTag"], { bg: string; text: string; label: string }> = {
  "traditional-concept": { bg: "#EBF3F9", text: "#1E4A6B", label: "Traditional Concept" },
  "scientific-evidence": { bg: "#EAF5F0", text: "#1A5C44", label: "Scientific Evidence" },
  "safety-advisory": { bg: "#FEE2E2", text: "#991B1B", label: "Safety Advisory" },
  "critical-literacy": { bg: "#FFF3E0", text: "#B45309", label: "Critical Literacy" },
};

// ─── Article Dataset ──────────────────────────────────────────────────────────

const ARTICLES: Article[] = [
  {
    id: "reading-pubmed-abstracts",
    title: "How to Read a PubMed Abstract",
    subtitle: "A practical guide to interpreting biomedical research for non-specialists",
    category: "evidence-methodology",
    categoryLabel: "Evidence Methodology",
    readingTime: "7 min",
    evidenceTag: "scientific-evidence",
    evidenceTagLabel: "Scientific Evidence",
    summary:
      "Most viral wellness claims cite research — but reading only headlines misses crucial context. This guide explains how to critically assess PubMed abstracts, understand study design hierarchies, and identify the difference between association and causation.",
    references: [
      { label: "PubMed / NCBI Literature Database", url: "https://pubmed.ncbi.nlm.nih.gov" },
      { label: "Cochrane Handbook for Systematic Reviews", url: "https://training.cochrane.org/handbook" },
      { label: "CONSORT Statement for RCT Reporting", url: "https://www.consort-statement.org" },
    ],
    body: [
      {
        heading: "Why Abstract Literacy Matters",
        content:
          "Biomedical research is published in peer-reviewed journals and indexed on databases like PubMed (NCBI). Millions of studies are freely accessible — but reading an abstract without methodology context can be as misleading as not reading it at all. Viral health content routinely misrepresents preliminary findings as definitive cures.",
      },
      {
        heading: "The Evidence Hierarchy",
        content:
          "Not all research is equal. From strongest to weakest: Systematic Reviews & Meta-Analyses (pooling multiple RCTs) → Randomised Controlled Trials (RCTs, the gold standard for causation) → Cohort Studies (observational, prospective) → Case-Control Studies (retrospective) → Case Reports & Expert Opinion (lowest). An in vitro study on turmeric cells in a petri dish says nothing about its effect in a living human at oral doses.",
      },
      {
        heading: "Key Abstract Fields to Scrutinise",
        content:
          "Study Design: Was it randomised? Was it double-blinded? How large was the sample? Population: Was it conducted in humans? What was the age, health status, and geographic context? Outcome Measures: Were outcomes patient-relevant (e.g. pain reduction, mortality) or surrogate endpoints (e.g. biomarker levels)? Duration: Was the follow-up period long enough to detect meaningful effects? Funding: Who funded the study? Industry-funded trials have documented conflicts of interest.",
      },
      {
        heading: "Common Misrepresentations to Spot",
        content:
          "Relative vs. Absolute Risk: A drug that reduces a 1% risk to 0.5% can be described as '50% more effective' — but the absolute risk reduction is only 0.5%. Correlation vs. Causation: Observational studies identify associations, not causes. Dose & Bioavailability: A study using intravenous curcumin at 1,000mg cannot be extrapolated to oral turmeric tea. P-value Misuse: P<0.05 does not mean 'the treatment works' — it only indicates statistical significance, not clinical significance or effect size.",
      },
      {
        heading: "A Practical Reading Protocol",
        content:
          "Step 1: Read the study design and sample size first (before reading conclusions). Step 2: Identify who funded the research. Step 3: Locate the primary outcome — not secondary outcomes that were data-mined. Step 4: Check whether the conclusion matches what the data actually showed. Step 5: Search for systematic reviews or Cochrane reviews of the same intervention before forming an opinion.",
      },
    ],
  },
  {
    id: "curcumin-bioavailability",
    title: "Curcumin Bioavailability: Why Turmeric Tea Is Not the Same as Clinical Curcumin",
    subtitle: "Understanding the gap between traditional use and pharmaceutical-grade supplementation",
    category: "herbal-science",
    categoryLabel: "Herbal Science",
    readingTime: "6 min",
    evidenceTag: "scientific-evidence",
    evidenceTagLabel: "Scientific Evidence",
    summary:
      "Curcumin is one of the most studied phytochemicals in Ayurvedic research. But its notoriously poor oral bioavailability means the concentration in dietary turmeric bears little resemblance to what clinical trials actually test. Here is what the evidence says — and what it does not.",
    references: [
      { label: "PMID 9619120 — Piperine enhances curcumin bioavailability by 2000%", url: "https://pubmed.ncbi.nlm.nih.gov/9619120/" },
      { label: "PMID 28734960 — Curcumin in osteoarthritis systematic review", url: "https://pubmed.ncbi.nlm.nih.gov/28734960/" },
      { label: "PMID 17569207 — Curcumin poor oral bioavailability review", url: "https://pubmed.ncbi.nlm.nih.gov/17569207/" },
    ],
    body: [
      {
        heading: "Curcumin in Classical Ayurveda",
        content:
          "Haridra (turmeric, Curcuma longa) is one of the most extensively referenced herbs in Ayurvedic classical texts. The Charaka Samhita and Sushruta Samhita describe it as possessing Katu (pungent) and Tikta (bitter) rasa, Ushna virya (hot potency), and Kapha-Vata pacifying properties. It was traditionally prescribed as a component of formulations, not as an isolated phytochemical at standardised doses.",
      },
      {
        heading: "The Bioavailability Problem",
        content:
          "Curcumin constitutes roughly 2–5% of raw turmeric powder by weight. More critically, it is poorly absorbed from the gastrointestinal tract — first-pass hepatic metabolism rapidly eliminates it. Studies estimate that the systemic bioavailability of free curcumin from oral turmeric is less than 1% in most formulations. This creates a fundamental disconnect: clinical trials typically use standardised curcumin extracts at 500–1,000mg daily, often with bioavailability enhancers, while dietary turmeric consumption provides a small fraction of this dose.",
      },
      {
        heading: "The Piperine Solution and Its Limits",
        content:
          "A widely cited 1998 study (PMID: 9619120) demonstrated that co-administration of piperine (from black pepper) at 20mg with 2,000mg curcumin increased serum curcumin concentrations by 2,000% in humans. This is the scientific basis for the popular 'golden milk with black pepper' formulation. However, piperine also inhibits certain drug-metabolising enzymes (CYP3A4, P-glycoprotein), which may increase serum concentrations of other medications unpredictably — a clinically relevant contraindication for patients on immunosuppressants or anticoagulants.",
      },
      {
        heading: "What Clinical Trials Actually Show",
        content:
          "Published randomised controlled trials on standardised curcumin formulations have shown modest statistically significant effects on knee osteoarthritis pain scores compared to placebo. A 2017 systematic review (PMID: 28734960) found positive signals but noted small sample sizes and methodological heterogeneity. Most studies are short-term (8–12 weeks) and industry-funded. Anti-cancer claims based on in vitro curcumin studies are frequently misrepresented — petri dish concentrations are biologically irrelevant to oral supplementation in humans.",
      },
      {
        heading: "The Honest Summary",
        content:
          "Curcumin shows genuine preliminary biomedical promise, particularly in anti-inflammatory mechanisms. However, claims of curcumin 'curing' cancer, diabetes, or neurological conditions are not supported by current human clinical trial evidence. Dietary turmeric as a traditional culinary and preventive practice has a different risk-benefit calculus than pharmaceutical-grade supplementation. Patients on anticoagulants, chemotherapy, or immunosuppressants should consult their physician before high-dose curcumin supplementation.",
      },
    ],
  },
  {
    id: "bhasma-toxicity-risk",
    title: "Herbo-Metallic Bhasmas: Classical Tradition and Modern Toxicological Risk",
    subtitle: "Why unregulated heavy metal formulations pose a genuine public health hazard",
    category: "safety",
    categoryLabel: "Safety & Contraindications",
    readingTime: "8 min",
    evidenceTag: "safety-advisory",
    evidenceTagLabel: "Safety Advisory",
    summary:
      "Bhasmas — calcined herbo-metallic preparations — have a legitimate place in classical Ayurvedic pharmacology, but unregulated commercial production has created a documented heavy-metal toxicity crisis. This article separates classical tradition from commercial exploitation.",
    references: [
      { label: "JAMA 2008; 300(8) — Heavy metals in Ayurvedic medicines", url: "https://pubmed.ncbi.nlm.nih.gov/18714059/" },
      { label: "Ministry of Ayush — Good Manufacturing Practice (GMP) Guidelines", url: "https://ayush.gov.in" },
      { label: "PMID 20490742 — Lead poisoning from Ayurvedic preparation case series", url: "https://pubmed.ncbi.nlm.nih.gov/20490742/" },
    ],
    body: [
      {
        heading: "Classical Rasa Shastra: The Legitimate Foundation",
        content:
          "Rasa Shastra is the Ayurvedic pharmacological tradition dealing with the processing of metals, minerals, and gemstones for therapeutic use. Classical texts — including the Rasa Ratna Samucchaya (13th century) — describe extraordinarily precise purification protocols (Shodhana) and incineration processes (Marana) requiring hundreds of processing cycles over months or years under expert supervision. Classical Bhasmas are described as therapeutically potent in minute doses (typically 30–125mg) precisely because the purification process is designed to render them safe at nano-particle scale.",
      },
      {
        heading: "The Modern Commercial Problem",
        content:
          "A landmark 2008 study published in JAMA (300:8) tested 193 Ayurvedic herbal products purchased online and found that 20.7% contained lead, mercury, or arsenic at concentrations exceeding safe thresholds. A subsequent analysis of products manufactured and sold in South Asia found similarly elevated proportions. The core problem is economic shortcut: authentic classical Shodhana-Marana processing is expensive and time-consuming. Commercial manufacturers often abbreviate or skip purification steps entirely.",
      },
      {
        heading: "Specific Heavy Metal Risks",
        content:
          "Lead (Naga Bhasma, Lauha Bhasma adulterants): Lead has no safe blood concentration in humans. Chronic low-level exposure causes irreversible neurological damage, hypertension, and nephrotoxicity. Children are disproportionately vulnerable. Mercury (Parada, Hingula): Inorganic mercury compounds cause renal failure. Organic mercury (methylmercury) is a potent neurotoxin. Classical texts mandated Parada Shodhana — a 28-stage purification — before any medicinal use. Arsenic (Hartala/Orpiment): Chronic arsenic ingestion from undetected Bhasma adulteration is associated with keratosis, peripheral neuropathy, and elevated cancer risk.",
      },
      {
        heading: "Regulatory Framework in India",
        content:
          "The Drugs and Cosmetics Act (1940) and its subsequent Ayurvedic rules nominally mandate GMP compliance for licensed Ayurvedic manufacturers. The Ministry of Ayush has published GMP guidelines for classical Bhasma preparation. However, regulatory enforcement is inconsistent, and the online marketplace — particularly internationally — operates with minimal oversight. The Pharmacopoeia of India (Ayurvedic) sets heavy metal limits, but batch testing compliance varies widely.",
      },
      {
        heading: "How to Protect Yourself",
        content:
          "Never purchase Bhasmas or Rasa preparations from unlicensed, unverified, or international online sources. Verify GMP certification and batch testing certificates. Consult only registered BAMS or MD (Ayurveda) practitioners verified through the NCISM central registry before any Rasa Shastra prescription. Bring any Bhasma formulation you are taking to your allopathic physician for review if you take concurrent pharmaceutical medications. If you experience unexplained fatigue, abdominal pain, or neurological symptoms while taking metallic formulations, seek immediate medical evaluation.",
      },
    ],
  },
  {
    id: "ashwagandha-evidence-review",
    title: "Ashwagandha (Withania somnifera): What the Clinical Evidence Actually Shows",
    subtitle: "Parsing adaptogen hype from peer-reviewed trial data",
    category: "herbal-science",
    categoryLabel: "Herbal Science",
    readingTime: "7 min",
    evidenceTag: "scientific-evidence",
    evidenceTagLabel: "Scientific Evidence",
    summary:
      "Ashwagandha is among the most commercially prominent Ayurvedic herbs globally, marketed for everything from stress relief to testosterone enhancement to immunity. Here is a sober review of what randomised clinical trials actually demonstrate — and what remains unproven.",
    references: [
      { label: "PMID 31517876 — Ashwagandha and cortisol RCT", url: "https://pubmed.ncbi.nlm.nih.gov/31517876/" },
      { label: "PMID 32021735 — Ashwagandha safety and efficacy review", url: "https://pubmed.ncbi.nlm.nih.gov/32021735/" },
      { label: "PMID 33041781 — Ashwagandha and thyroid interactions", url: "https://pubmed.ncbi.nlm.nih.gov/33041781/" },
    ],
    body: [
      {
        heading: "Classical Ayurvedic Context",
        content:
          "Ashwagandha (Withania somnifera) is classified in classical Ayurvedic texts as a premier Rasayana — a class of rejuvenating preparations aimed at preserving vitality and promoting longevity. The Charaka Samhita (Chikitsa Sthana, Ch. 1.2) lists it as a Balya (strength-promoting) herb effective for Shosha (debility) and Vata disorders. Traditional administration was as a root powder in warm milk, often combined with Ashwagandha ghrita formulations.",
      },
      {
        heading: "Stress and Cortisol: The Strongest Evidence",
        content:
          "The most replicated finding from clinical trials involves perceived stress and serum cortisol. A 2019 double-blind RCT (PMID: 31517876, n=58) demonstrated statistically significant reductions in morning serum cortisol, self-reported stress (PSS scale), and anxiety scores in adults taking 240mg standardised Ashwagandha extract daily for 60 days, compared to placebo. This finding has been partially replicated in subsequent trials, though sample sizes remain small and industry co-funding is common in this research area.",
      },
      {
        heading: "Sleep Quality: Emerging Evidence",
        content:
          "A 2020 randomised trial (n=150) found statistically significant improvements in sleep quality measures (PSQI scale) in insomnia subjects taking KSM-66 Ashwagandha root extract (300mg, twice daily) versus placebo over 8 weeks. Effect sizes were moderate. Sleep improvement may be mechanistically linked to triethylene glycol, a constituent identified in W. somnifera leaves with demonstrated sedative properties in animal models.",
      },
      {
        heading: "Testosterone and Athletic Performance: Overblown Claims",
        content:
          "Several industry-funded trials report statistically significant increases in serum testosterone in healthy males taking Ashwagandha, but absolute effect sizes are modest (typically 10–15% within-group change) and clinical significance is debated. Athletic performance trials show inconsistent results. Many circulating marketing claims extrapolate far beyond what the published data demonstrates.",
      },
      {
        heading: "Documented Contraindications and Safety Concerns",
        content:
          "Thyroid Function: Multiple case reports and a 2020 analysis link Ashwagandha supplementation with elevated T3 and T4 thyroid hormone levels (PMID: 33041781). Patients with hyperthyroidism, Graves disease, or on thyroid medications must consult their physician before use. Pregnancy: Ashwagandha is contraindicated in pregnancy — classical texts and modern pharmacological reviews both note its uterine-stimulant (oxytocic) properties. Autoimmune Disease: As a potential immunomodulator, use with autoimmune conditions (lupus, rheumatoid arthritis) or immunosuppressant therapy requires medical supervision. Rare hepatotoxicity cases have been reported with high-dose supplementation.",
      },
    ],
  },
  {
    id: "spotting-wellness-misinformation",
    title: "Seven Red Flags for Wellness Misinformation",
    subtitle: "A practical literacy guide for evaluating health claims on social media",
    category: "misinformation",
    categoryLabel: "Misinformation Literacy",
    readingTime: "5 min",
    evidenceTag: "critical-literacy",
    evidenceTagLabel: "Critical Literacy",
    summary:
      "Wellness misinformation thrives on social media because it exploits cognitive biases, uses scientific-sounding language, and targets genuine public frustration with healthcare costs. Learning to spot common patterns can protect you from harmful or expensive pseudoscience.",
    references: [
      { label: "WHO: Infodemic Management Framework", url: "https://www.who.int/teams/risk-communication/infodemic-management" },
      { label: "Cochrane: Evaluating evidence in health claims", url: "https://www.cochranelibrary.com" },
      { label: "NCBI: Predatory publishing in health science", url: "https://pubmed.ncbi.nlm.nih.gov" },
    ],
    body: [
      {
        heading: "Red Flag 1: The Miraculous Universal Cure",
        content:
          "No single substance cures cancer, diabetes, obesity, and heart disease simultaneously. Biological systems are extraordinarily complex, and interventions that meaningfully address one pathway rarely generalise across radically different disease mechanisms. When a vendor claims their product treats dozens of unrelated conditions, the claim is implausible by definition.",
      },
      {
        heading: "Red Flag 2: Testimonials Instead of Data",
        content:
          "Personal anecdotes are scientifically unreliable because: the condition may have resolved spontaneously; the placebo effect is real and measurable; confirmation bias leads people to remember improvement and forget lack of effect; testimonials are easily fabricated. Clinical trials exist precisely to control for these confounders. One testimonial does not outweigh a well-designed negative RCT.",
      },
      {
        heading: "Red Flag 3: Secret Suppression by 'Big Pharma'",
        content:
          "Conspiracy narratives suggesting that effective treatments are being suppressed by pharmaceutical companies are epistemically unfalsifiable — they reject all contrary evidence as part of the conspiracy. In reality, academics, governments, regulators, and competing pharmaceutical companies all have strong incentives to expose fraudulent suppression. The international generic drugs industry alone would profit enormously from off-patent effective treatments.",
      },
      {
        heading: "Red Flag 4: Misused Scientific Terms",
        content:
          "Terms like 'detox', 'alkalising', 'quantum healing', 'cellular cleansing', and 'natural frequency' are deployed to sound scientific without corresponding scientific meaning. The liver and kidneys are the body's actual detoxification systems. Blood pH is tightly regulated — foods cannot meaningfully alkalise the blood. When a product's mechanism is described in vague scientific-sounding language without specific molecular or physiological citation, that is a warning sign.",
      },
      {
        heading: "Red Flag 5: The Predatory Journal Citation",
        content:
          "Not all journals are equal. Predatory journals charge authors to publish without peer review. A study in a legitimate journal (Nature, JAMA, BMJ, Lancet, PLOS ONE) is not equivalent to a paper in 'International Journal of Unreviewed Herbal Wonders'. Check the journal against Directory of Open Access Journals (DOAJ) or COPE membership. Impact factor is imperfect but directionally useful.",
      },
      {
        heading: "Red Flag 6: Urgency and Artificial Scarcity",
        content:
          "Legitimate healthcare products are not sold with countdown timers, 'limited batch' urgency claims, or 'special doctor pricing for the next 24 hours'. These are sales pressure tactics designed to prevent rational evaluation. Evidence-based medicine does not operate on flash sales.",
      },
      {
        heading: "Red Flag 7: Conflating Traditional Use with Clinical Efficacy",
        content:
          "Centuries of traditional use suggests a safety profile that warrants scientific investigation — it does not constitute clinical evidence of efficacy for specific medical conditions. Many traditional practices have been validated by modern research; many others have not. Historical use and clinical efficacy are separate questions that require separate evidence.",
      },
    ],
  },
  {
    id: "tridosha-modern-science",
    title: "Tridosha Theory: Where Traditional Philosophy Meets — and Diverges From — Genomics",
    subtitle: "An honest appraisal of current Prakriti research and its epistemic limits",
    category: "traditional-concepts",
    categoryLabel: "Traditional Concepts",
    readingTime: "8 min",
    evidenceTag: "traditional-concept",
    evidenceTagLabel: "Traditional Concept",
    summary:
      "Exploratory genomic and metabolomic research has attempted to correlate Ayurvedic Prakriti classifications with molecular biomarkers. What has been found is genuinely interesting — but the gap between preliminary association and validated clinical utility remains large.",
    references: [
      { label: "PMID 25997003 — CSIR-IGIB Prakriti genomics study", url: "https://pubmed.ncbi.nlm.nih.gov/25997003/" },
      { label: "PMID 25988403 — Prakriti and metabolomics", url: "https://pubmed.ncbi.nlm.nih.gov/25988403/" },
      { label: "Charaka Samhita, Vimanasthana Ch. 8 — Prakriti classical definition", url: "https://pubmed.ncbi.nlm.nih.gov" },
    ],
    body: [
      {
        heading: "Classical Prakriti: What the Texts Actually Say",
        content:
          "Classical Ayurvedic texts (Charaka Samhita, Vimanasthana Ch. 8) define Prakriti as the constitutional type established at conception based on the relative predominance of the three Doshas — Vata, Pitta, Kapha. The texts describe seven constitutional types: three pure types, three dual-dosha combinations, and one rare tri-doshic balanced type (Sama Prakriti). Prakriti is described as unchanging throughout life, distinguishing it from Vikriti — the current state of doshic imbalance that is the primary target of Ayurvedic clinical intervention.",
      },
      {
        heading: "The CSIR-IGIB Genomics Study",
        content:
          "A 2015 study from CSIR-Institute of Genomics and Integrative Biology (PMID: 25997003) genotyped 262 healthy males across Vata, Pitta, and Kapha Prakriti types as assessed by trained Ayurvedic physicians. Statistically significant differences in single nucleotide polymorphism (SNP) distributions and gene expression patterns were identified between Prakriti groups — particularly in pathways related to immune function, metabolic regulation, and pigmentation. The study represented genuine scientific validation that Prakriti classification is not arbitrary.",
      },
      {
        heading: "The Limits of These Findings",
        content:
          "The CSIR study and its follow-ups have important constraints: all subjects were healthy males from one geographic region; Prakriti assessments involved inter-rater variability; the study was cross-sectional, not longitudinal; effect sizes were modest; replication in diverse populations is limited. Most critically, the existence of genomic correlates does not validate Prakriti as a clinical diagnostic category equivalent to established medical phenotyping — it suggests it is a biologically grounded concept worthy of further rigorous investigation.",
      },
      {
        heading: "Metabolomics: Convergent But Preliminary",
        content:
          "A 2015 metabolomics study (PMID: 25988403) found distinct plasma metabolite profiles correlated with Prakriti types, particularly in lipid metabolism and amino acid pathways. Kapha subjects showed metabolite patterns consistent with higher adipogenesis; Pitta subjects showed patterns associated with higher metabolic activity. These are intriguing correlations — but metabolomics in this context remains an exploratory research domain.",
      },
      {
        heading: "What This Means in Practice",
        content:
          "Prakriti theory is a sophisticated ancient framework for thinking about constitutional variability — something modern personalised medicine is now independently rediscovering through genomics and microbiome research. But the epistemic gap between 'correlated with genomic variation in one cohort' and 'clinically validated as a diagnostic tool' remains significant. Consumers should be cautious of vendors or online quizzes claiming to accurately determine their Prakriti and prescribe supplements accordingly — the clinical validation for this pipeline does not yet exist at the required rigour.",
      },
    ],
  },
  {
    id: "agni-digestive-fire-concept",
    title: "Agni: The Ayurvedic Concept of Digestive Intelligence",
    subtitle: "Classical digestive theory and its partial convergence with modern gastroenterology",
    category: "traditional-concepts",
    categoryLabel: "Traditional Concepts",
    readingTime: "6 min",
    evidenceTag: "traditional-concept",
    evidenceTagLabel: "Traditional Concept",
    summary:
      "Agni — often translated as 'digestive fire' — is one of the most sophisticated and therapeutically central concepts in classical Ayurveda. Its relationship to modern understanding of the gut microbiome, enzymatic digestion, and enteric nervous system reveals genuine areas of conceptual convergence.",
    references: [
      { label: "Charaka Samhita, Chikitsa Sthana Ch. 15 — Grahani Chikitsa", url: "https://pubmed.ncbi.nlm.nih.gov" },
      { label: "PMID 29757959 — Gut microbiome and systemic disease", url: "https://pubmed.ncbi.nlm.nih.gov/29757959/" },
      { label: "Ashtanga Hridayam, Sutrasthana Ch. 8 — Agni classification", url: "https://pubmed.ncbi.nlm.nih.gov" },
    ],
    body: [
      {
        heading: "Classical Definition and Varieties",
        content:
          "The Charaka Samhita (Chikitsa Sthana Ch. 15) states: 'Agni eva balam arogyam' — digestive capacity is the very foundation of health and vitality. Classical texts describe 13 varieties of Agni: Jatharagni (primary digestive fire), five Bhutagnis (element-specific), and seven Dhatvagnis (tissue-specific). Jatharagni is the master regulator — its functional state governs both physical digestion and the formation of successively refined tissue layers (Saptadhatu).",
      },
      {
        heading: "The Four States of Digestive Agni",
        content:
          "Classical Ayurveda describes four functional states: Sama Agni (balanced, optimal digestion) — a baseline of easy digestion across food types. Vishama Agni (variable, erratic) — irregular appetite, alternating constipation and loose stools, gas and bloating, classically linked to Vata imbalance. Tikshna Agni (sharp, excessive) — strong, rapid, sometimes hypersecretory digestion; classically linked to Pitta imbalance; modern correlation includes hyperchloridia and GERD patterns. Manda Agni (slow, sluggish) — poor metabolism, heaviness after eating; classically linked to Kapha predominance; correlates loosely with conditions of metabolic insufficiency.",
      },
      {
        heading: "Convergence With Modern Gastroenterology",
        content:
          "The classical Agni framework demonstrates several areas of conceptual resonance with modern understanding: The primacy of gut health as systemic health foundation parallels the emerging field of the gut-brain axis and gut microbiome-systemic disease research. The description of Ama (undigested toxic metabolite produced by impaired Agni) conceptually resembles modern understanding of intestinal permeability ('leaky gut'), inflammatory metabolite production, and dysbiosis consequences — though the correspondence is heuristic, not mechanistic. Individual digestive variability — now understood through genetic polymorphisms in digestive enzymes (lactase, amylase), microbiome composition, and autonomic nervous system tone — echoes the classical Agni typology.",
      },
      {
        heading: "Important Epistemic Caution",
        content:
          "The convergence is conceptual and inspiring — it does not mean classical Agni theory is a biomedical equivalent of modern gastroenterology. The mechanistic understanding, diagnostic precision, and pharmacological intervention available in evidence-based gastroenterology are categorically more specific than classical Agni theory. For symptomatic digestive disorders, evidence-based medical evaluation remains the appropriate first step. Classical dietary and lifestyle practices around Agni optimisation — mindful eating, regular meal times, appropriate food combining, seasonal adjustments — have plausible rationales and low risk profiles when applied as general wellness principles.",
      },
    ],
  },
];

// ─── Article Card Component ───────────────────────────────────────────────────

function ArticleCard({
  article,
  onSelect,
}: {
  article: Article;
  onSelect: (a: Article) => void;
}) {
  const tagStyle = EVIDENCE_TAG_STYLES[article.evidenceTag];
  const cat = CATEGORIES.find((c) => c.key === article.category)!;

  return (
    <article
      className="rounded-2xl bg-[#FCFAF6] border border-[#E5D9C6] p-6 space-y-4 hover:shadow-md hover:border-[#C8BBA8] transition-all cursor-pointer group focus-within:ring-2 focus-within:ring-[#173D32] focus-within:ring-offset-2"
      onClick={() => onSelect(article)}
    >
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <span
          className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border"
          style={{ backgroundColor: cat.bg, color: cat.color, borderColor: cat.color + "40" }}
        >
          {article.categoryLabel}
        </span>
        <span
          className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold"
          style={{ backgroundColor: tagStyle.bg, color: tagStyle.text }}
        >
          {tagStyle.label}
        </span>
      </div>

      <div>
        <h2 className="font-serif text-base sm:text-lg font-semibold text-[#173D32] leading-snug group-hover:text-[#235244] transition-colors">
          {article.title}
        </h2>
        <p className="text-xs text-[#596157] mt-1">{article.subtitle}</p>
      </div>

      <p className="text-xs text-[#242923] leading-relaxed line-clamp-3">{article.summary}</p>

      <div className="flex items-center justify-between pt-1 border-t border-[#E5D9C6]">
        <span className="text-[11px] text-[#596157]">
          {article.readingTime} read · {article.references.length} sources
        </span>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onSelect(article); }}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#173D32] hover:text-[#B96345] transition-colors focus:outline-none focus-visible:underline"
          aria-label={`Read article: ${article.title}`}
        >
          <span>Read Article</span>
          <ArrowRightIcon className="w-3.5 h-3.5" />
        </button>
      </div>
    </article>
  );
}

// ─── Article Reader Component ─────────────────────────────────────────────────

function ArticleReader({
  article,
  onBack,
}: {
  article: Article;
  onBack: () => void;
}) {
  const tagStyle = EVIDENCE_TAG_STYLES[article.evidenceTag];
  const cat = CATEGORIES.find((c) => c.key === article.category)!;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Back button */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-medium text-[#596157] hover:text-[#173D32] transition-colors focus:outline-none focus-visible:underline"
        aria-label="Back to article list"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        Back to Library
      </button>

      {/* Article Header */}
      <div className="rounded-2xl bg-[#FCFAF6] border border-[#E5D9C6] p-6 sm:p-8 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border"
            style={{ backgroundColor: cat.bg, color: cat.color, borderColor: cat.color + "40" }}
          >
            {article.categoryLabel}
          </span>
          <span
            className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold"
            style={{ backgroundColor: tagStyle.bg, color: tagStyle.text }}
          >
            {tagStyle.label}
          </span>
          <span className="text-[11px] text-[#596157] ml-auto">{article.readingTime} read</span>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#173D32] leading-snug">
          {article.title}
        </h1>
        <p className="text-sm text-[#596157]">{article.subtitle}</p>
        <p className="text-sm text-[#242923] leading-relaxed border-l-2 border-[#E5D9C6] pl-4 italic">
          {article.summary}
        </p>
      </div>

      {/* Article Body */}
      <div className="rounded-2xl bg-[#FCFAF6] border border-[#E5D9C6] p-6 sm:p-8 space-y-7">
        {article.body.map((section, i) => (
          <div key={i} className="space-y-2">
            <h2 className="font-serif text-lg font-semibold text-[#173D32]">{section.heading}</h2>
            <p className="text-sm text-[#242923] leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>

      {/* References */}
      <div className="rounded-2xl bg-[#F6F2E9] border border-[#E5D9C6] p-6 space-y-3">
        <h2 className="font-serif text-base font-semibold text-[#173D32] flex items-center gap-2">
          <CheckCircleIcon className="w-4 h-4 text-[#2D7A5F]" />
          Primary Sources & References
        </h2>
        <ul className="space-y-2">
          {article.references.map((ref, i) => (
            <li key={i} className="flex items-start gap-2 text-xs">
              <span className="text-[#596157] mt-0.5 flex-shrink-0">[{i + 1}]</span>
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#173D32] hover:text-[#B96345] underline underline-offset-2 transition-colors leading-relaxed"
              >
                {ref.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Non-diagnostic reminder */}
      <div className="p-4 rounded-xl bg-[#E5D9C6]/30 border border-[#E5D9C6] text-xs text-[#596157] text-center">
        This article is for educational purposes only and does not constitute medical advice, clinical diagnosis, or treatment prescription.
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function LearnPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const filteredArticles = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return ARTICLES.filter((a) => {
      const matchesCategory = activeCategory === "all" || a.category === activeCategory;
      const matchesSearch =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.subtitle.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.categoryLabel.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-[#F6F2E9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <ArticleReader article={selectedArticle} onBack={() => setSelectedArticle(null)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F2E9]">
      {/* Page Header */}
      <div className="border-b border-[#E5D9C6] bg-[#FCFAF6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#173D32]/10 text-[#173D32] text-xs font-semibold uppercase tracking-wider">
            <BookOpenIcon className="w-3.5 h-3.5 text-[#B96345]" />
            <span>Health Literacy · Evidence-Based Education</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#173D32] font-semibold tracking-tight">
            Learning Library
          </h1>
          <p className="text-sm sm:text-base text-[#596157] leading-relaxed max-w-2xl">
            Accurate, well-sourced educational articles on Ayurvedic science, biomedical research
            methodology, wellness misinformation patterns, and safety literacy. Traditional beliefs
            are clearly distinguished from established scientific evidence.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 space-y-8">

        {/* Search Bar */}
        <div className="relative max-w-xl">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#596157]" />
          <input
            id="library-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by topic, herb, or keyword…"
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#FCFAF6] border border-[#E5D9C6] text-sm text-[#242923] placeholder-[#8E9E86] focus:outline-none focus:ring-2 focus:ring-[#173D32] focus:border-transparent transition-all"
            aria-label="Search learning library articles"
          />
        </div>

        {/* Category Filters */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#596157]">
            <FilterIcon className="w-3.5 h-3.5" />
            Filter by category
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Article category filters">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#173D32] ${
                  activeCategory === cat.key
                    ? "shadow-sm"
                    : "bg-[#FCFAF6] border-[#E5D9C6] text-[#596157] hover:border-[#C8BBA8]"
                }`}
                style={
                  activeCategory === cat.key
                    ? { backgroundColor: cat.bg, color: cat.color, borderColor: cat.color + "60" }
                    : {}
                }
                aria-pressed={activeCategory === cat.key}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="text-xs text-[#596157]" aria-live="polite">
          {filteredArticles.length === 0
            ? "No articles match your search."
            : `Showing ${filteredArticles.length} of ${ARTICLES.length} articles`}
        </div>

        {/* Article Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} onSelect={setSelectedArticle} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-[#FCFAF6] border border-[#E5D9C6] p-12 text-center space-y-3">
            <BookOpenIcon className="w-10 h-10 text-[#E5D9C6] mx-auto" />
            <p className="font-serif text-lg text-[#173D32]">No articles found</p>
            <p className="text-sm text-[#596157]">Try a different keyword or select &quot;All Articles&quot;</p>
          </div>
        )}

        {/* Cross-link CTA */}
        <div className="rounded-2xl bg-[#173D32] text-[#F6F2E9] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <SparklesIcon className="w-4 h-4 text-[#A8B7A0]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#A8B7A0]">Claim Investigator</span>
            </div>
            <h2 className="font-serif text-xl font-semibold">Have a specific claim to verify?</h2>
            <p className="text-sm text-[#A8B7A0] leading-relaxed max-w-xl">
              Submit any Ayurvedic or wellness health claim for source-grounded analysis via Gemma 4 bounded AI.
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

        {/* Disclaimer */}
        <div className="p-4 rounded-xl bg-[#E5D9C6]/30 border border-[#E5D9C6] text-xs text-[#596157] text-center">
          All articles are for educational and health literacy purposes only. They do not constitute medical advice,
          personalised dietary prescription, or clinical diagnosis. Consult a qualified healthcare professional for
          any health concerns.
        </div>
      </div>
    </div>
  );
}
