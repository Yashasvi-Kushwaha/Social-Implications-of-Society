# Ayur_Veda_Setu (आयुर्वेद सेतु)

> **The Bridge of Knowledge:** Connecting Traditional Ayurvedic Wisdom with Modern Biomedical Science and Countering Misleading Wellness Claims.

[![Next.js](https://img.shields.io/badge/Next.js-16.4-173D32?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3-173D32?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-173D32?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-173D32?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Google GenAI SDK](https://img.shields.io/badge/@google/genai-Gemma_4-B96345?logo=google&logoColor=white)](https://ai.google.dev/gemma)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen)](file:///c:/Users/yasha/OneDrive/Documents/Desktop/Ayur_Veda_Setu)

---

## Table of Contents
1. [Project Identity](#1-project-identity)
2. [Problem Statement and Motivation](#2-problem-statement-and-motivation)
3. [Proposed Solution](#3-proposed-solution)
4. [Objectives and Expected Impact](#4-objectives-and-expected-impact)
5. [Target Users and Main User Journey](#5-target-users-and-main-user-journey)
6. [Distinctive Features & Implementation Status](#6-distinctive-features--implementation-status)
7. [Technical Stack and Rationale](#7-technical-stack-and-rationale)
8. [System Architecture](#8-system-architecture)
9. [Claim Investigator: Detailed Execution Workflow](#9-claim-investigator-detailed-execution-workflow)
10. [Evidence Methodology](#10-evidence-methodology)
11. [Responsible AI, Safety and Privacy](#11-responsible-ai-safety-and-privacy)
12. [Implementation Roadmap and Execution Plan](#12-implementation-roadmap-and-execution-plan)
13. [Evaluation and Testing Strategy](#13-evaluation-and-testing-strategy)
14. [Repository Structure](#14-repository-structure)
15. [Installation and Execution](#15-installation-and-execution)
16. [Limitations and Future Scope](#16-limitations-and-future-scope)
17. [Project Status, Contribution and Disclaimer](#17-project-status-contribution-and-disclaimer)

---

## 1. Project Identity

- **Project Name:** Ayur_Veda_Setu (आयुर्वेद सेतु)
- **Concept:** Bridging Traditional Ayurvedic Knowledge and Modern Scientific Evidence through Rigorous Source Grounding.
- **Tagline:** *Ancient Ayurvedic Wisdom. Rigorous Biomedical Scrutiny.*

### Executive Summary
**Ayur_Veda_Setu** is an open-access educational web platform created to bridge the epistemological gap between classical Ayurvedic health frameworks and contemporary biomedical science. In today's digital landscape, wellness trends frequently cycle through viral social media posts that either make predatory "miracle cure" promises or dismiss centuries of traditional botanical pharmacognosy with sweeping skepticism. 

Ayur_Veda_Setu rejects both extremes. It approaches traditional claims with neither uncritical acceptance nor dogmatic dismissal: **scientific conclusions depend strictly upon the quality, reproducibility, and context of available evidence**. Powered by a curated, peer-reviewed knowledge archive and structured server-side explanations using Gemma 4 via the `@google/genai` SDK, Ayur_Veda_Setu provides a transparent, verifiable, and medically responsible environment for evaluating wellness claims.

### What Makes This Approach Distinctive
Unlike generic AI health chatbots that generate fluent but hallucinated citations, Ayur_Veda_Setu enforces **strict retrieval-based evidence grounding**:
1. The AI model is strictly prohibited from inventing studies, authors, or publication URLs.
2. If an investigated claim is not present in our peer-reviewed knowledge archive, the system returns an honest **"Insufficient Curated Evidence"** response rather than speculating.
3. Traditional holistic paradigms (*Doshas*, *Agni*, *Rasayana*) are explicitly presented as cultural and historical heuristics, not clinical or genetic diagnoses.

---

## 2. Problem Statement and Motivation

The modern health consumer faces systemic obstacles when navigating wellness information online:

- **Decontextualized Wellness Claims:** Social media platforms incentivize dramatic, simplified wellness assertions (e.g., "boiled spices cure chronic inflammation in 48 hours") that strip traditional remedies of their classical indications, contraindications, and dosage prerequisites.
- **Conflation of Preliminary Lab Data with Clinical Evidence:** In vitro assays (petri-dish tests) and small rodent models are frequently cited by influencers as "proven clinical cures" for complex human pathologies without human pharmacokinetic or randomized trial validation.
- **Unregulated Product Safety & Contamination:** Traditional herbo-metallic preparations (*Bhasmas*) require master-level *Shodhana* (purification) and *Marana* (calcination). Commercial, unstandardized preparations pose documented heavy metal risks (lead, arsenic, mercury) that uninformed consumers cannot evaluate.
- **Fragmented and Inaccessible Primary Sources:** Lay users seeking to verify a claim are forced to choose between dense PubMed academic databases or commercial marketing blogs selling supplements. There is no clear, traceable middle path.

**Who experiences these problems?**
Students, health-conscious citizens, patients exploring complementary care, and individuals encountering urgent wellness claims online. Existing search engines prioritize SEO-optimized commercial blogs over biomedical rigor, while ungrounded AI search assistants hallucinate citations. A transparent, evidence-first platform is needed to foster genuine health literacy.

---

## 3. Proposed Solution

Ayur_Veda_Setu unites six connected, educational modules designed to guide users from initial curiosity to source-verified understanding:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             AYUR_VEDA_SETU                                  │
│                 Ancient Archive · Biomedical Evidence                       │
└─────────────────────────────────────────────────────────────────────────────┘
       │                      │                      │                 │
       ▼                      ▼                      ▼                 ▼
 ┌────────────┐        ┌─────────────┐        ┌─────────────┐   ┌─────────────┐
 │ 1. Editorial│       │2. Explore   │        │ 3. Claim    │   │4. Constitu- │
 │    Homepage │◄─────►│   Science   │◄──────►│ Investigator│◄─►│ tion (Prak- │
 │             │       │   & Tradition│       │  (Gemma 4)  │   │  riti)      │
 └────────────┘        └─────────────┘        └─────────────┘   └─────────────┘
       │                                                               │
       ▼                                                               ▼
 ┌───────────────────────────────────┐               ┌─────────────────────────┐
 │ 5. Learning Library               │               │ 6. Find an Expert       │
 │    Misinformation Literacy        │◄─────────────►│    Apex Statutory Bodies│
 └───────────────────────────────────┘               └─────────────────────────┘
```

1. **Editorial Homepage:** Sets the epistemic tone, contrasts classical holism with reductionist trial science, and highlights live case analyses.
2. **Ayurveda Meets Modern Science (`/explore`):** Browsable comparative dossier mapping classical concepts (*Agni*, *Curcumin*, *Ashwagandha*, *Bhasmas*) against modern clinical evidence and pharmacokinetics.
3. **Claim Investigator (`/investigate`):** A server-side validation workflow evaluating user-submitted claims against curated peer-reviewed records, with Gemma 4 synthesizing structured context.
4. **Traditional Constitution Explorer (`/constitution`):** A 12-question interactive Dosha Discovery Quiz presenting an educational tripartite spectrum (Vata / Pitta / Kapha) with progress tracking, tie-breaking logic for dual/tri-doshic results, and explicit non-diagnostic disclaimers. Accessible directly from the homepage hero via the **Take Dosha Quiz** button.
5. **Learning Library (`/learn`):** Guides on how to evaluate clinical trials, identify heavy metal risks, and detect predatory marketing tactics.
6. **Find an Expert (`/experts`):** Directory of premier statutory teaching hospitals (AIIA, ITRA, NIA) and an interactive verification guide for the National Commission for Indian System of Medicine (NCISM) registry.

---

## 4. Objectives and Expected Impact

### Educational & Technical Objectives
- **Promote Epistemic Clarity:** Distinguish traditional cultural heuristics from empirical biomedical findings.
- **Deliver Source-Traceable Synthesis:** Ensure every claim evaluation displays genuine PubMed PMIDs, trial registries, or classical citations.
- **Demonstrate Responsible AI Integration:** Showcase how Gemma 4 can be strictly bound to in-context curated evidence to prevent hallucination.
- **Provide Actionable Safety Warnings:** Highlight known herb-drug interactions, contraindications, and heavy metal testing standards.

### Expected Social Impact (Intended Outcomes)
- Improved user capacity to spot ungrounded viral health claims.
- Enhanced understanding of the limitations and strengths of traditional remedies.
- Direct engagement with verified statutory practitioners rather than unaccredited online gurus.
- *Note: These are intended educational goals of the system design, not claims of proven epidemiological change.*

---

## 5. Target Users and Main User Journey

### Primary Audiences
1. **Curious Learners & Students:** Seeking historical context and biomedical correlations without commercial supplement bias.
2. **Social Media Consumers:** Encountering viral health advice (e.g., on WhatsApp or Instagram) who want an objective verification check.
3. **Complementary Health Seekers:** Exploring Ayurvedic lifestyle recommendations who need safety, contraindication, and dosage guidelines.
4. **Healthcare Seekers:** Looking for legitimate, government-accredited Ayurvedic hospitals and licensed practitioners.

### End-to-End User Journey

```
[ Encounter Viral Claim on Social Media ]
                   │
                   ▼
[ Enter Claim into Claim Investigator (/investigate) ]
                   │
                   ▼
[ Server Validates Input & Queries Curated Knowledge Base ]
         ┌─────────┴─────────┐
         ▼                   ▼
   [ Match Found ]    [ No Match Found ]
         │                   │
         │                   ▼
         │          [ "Insufficient Curated Evidence" Status ]
         │          [ (Explains limits & avoids AI speculation) ]
         ▼
[ Gemma 4 Synthesizes Grounded Structure: Classical vs Biomedical ]
                   │
                   ▼
[ User Examines Verdict, Safety Alerts, & Clickable PubMed PMIDs ]
                   │
                   ▼
[ Deepens Knowledge in Learning Library or Finds Verified Experts ]
```

---

## 6. Distinctive Features & Implementation Status

| Feature Module | Purpose | User Interaction | System Return | Evidence / Safety Boundary | Current Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Editorial Homepage** | Epistemic foundation & project narrative | Browsing, inspecting live case #AYU-084, navigating sections | Asymmetric editorial layouts, dual-perspective comparisons, primary CTAs | Non-diagnostic statutory disclaimer banner | **Implemented (Milestone 1)** |
| **Navigation & Design System** | Accessible, responsive site architecture | Responsive navbar, mobile drawer, high-contrast theme | Persistent navigation, active route indicators | Strict accessibility & reduced-motion support | **Implemented (Milestone 1)** |
| **Claim Investigator** | Evidence-grounded claim evaluation | Text input of health claim or selecting sample vetted claims | Structured verdict: Classical view, Trial evidence, Safety alert, Citations | Model bounded strictly to retrieved records; explicit "Insufficient Evidence" state | **Implemented (Milestone 4)** |
| **Curated Knowledge Retrieval** | Fast lexical & semantic relevance search over vetted records | Triggered server-side by claim submission | Relevant curated records with PMIDs and classical texts | No live web search without verification; zero synthetic citations | **Implemented (Milestone 2)** |
| **Ayurveda Meets Science** | Deep-dive comparative encyclopedia | Filter by botanical, mineral, or metabolic topic | Side-by-side classical treatise vs clinical trial dossiers | Explicitly distinguishes in vitro assays from human RCTs | **Implemented (Milestone 6)** |
| **Constitution Explorer & Dosha Quiz** | Educational Prakriti self-reflection | Interactive tabs + 12-question Dosha Discovery Quiz with progress bar & back navigation | Tripartite scored result (Vata/Pitta/Kapha/Dual/Tri-doshic), classical qualities (Gunas), governed functions | Explicit non-diagnostic disclaimer; no diet/treatment prescription; tie-breaker logic for dual/tri results | **Implemented (Milestone 5 + 8)** |
| **Homepage Quiz CTA** | Immediately accessible quiz entry from landing page | "Take Dosha Quiz" terracotta button in hero + Tridosha section CTA cards | Directs user to `/constitution#dosha-quiz-section` with smooth anchor scroll | Same non-diagnostic disclaimer; purely educational heuristic framing | **Implemented (Milestone 8)** |
| **Learning Library** | Misinformation literacy & trial reading | Search articles by category (Bhasmas, Trial Reading, Detox Myth) | Detailed educational articles with primary references | Clear separation between fact and preliminary hypothesis | **Implemented (Milestone 6)** |
| **Find an Expert** | Official statutory accreditation guide | Browse Apex institutes, search NCISM guide | Verified hospital profiles, official registry search checklist | Only verified statutory links; zero fabricated doctor profiles | **Implemented (Milestone 6)** |

---

## 7. Technical Stack and Rationale

The technical stack is intentionally focused, production-grade, and free of unnecessary dependencies:

### Core Framework & Runtimes
- **Next.js 16.4.3 (App Router & Turbopack):** Selected for server-side API rendering, automatic bundle optimization, and static prerendering of educational content.
- **React 19.3.0 & TypeScript 5:** Delivers component-driven state management and end-to-end type safety for evidence schemas, questions, and claim records.
- **Tailwind CSS 4:** Modern CSS engine enabling custom color tokens and responsive layouts without runtime overhead.

### AI & Language Model Integration
- **`@google/genai` (^2.31.0):** Official Google Gen AI SDK used server-side to communicate with **Gemma 4** (`gemma-4-26b-a4b-it`) on Google AI Studio / Gemini API.
- **Curated JSON Knowledge Base:** Structured, version-controlled repository of peer-reviewed literature and classical texts, eliminating complex vector database dependencies initially.

### Dependencies in `package.json`
```json
{
  "name": "ayurveda-setu",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@google/genai": "^2.31.0",
    "next": "16.4.3",
    "react": "19.3.0",
    "react-dom": "19.3.0"
  },
  "devDependencies": {
    "@tailwindcss/turbopack": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.4.3",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

---

## 8. System Architecture

### Intended Architecture Diagram

```mermaid
graph TD
    User([User in Browser]) -->|Submits Wellness Claim| UI[Client Component: ClaimForm]
    
    subgraph Client Application
        UI -->|Displays Loading Skeleton| UIState[Loading / Error State Handler]
        UIState -->|Renders Result| ResultView[ClaimResultCard & Source Badges]
    end

    UI -->|POST /api/investigate { claim }| APIRoute[Next.js Server API Route: src/app/api/investigate]

    subgraph Server Boundary
        APIRoute --> InputVal[Input Validation & Sanitization: lib/validation]
        InputVal -->|Valid Query| Retriever[Curated Knowledge Retrieval: lib/knowledge]
        InputVal -->|Invalid / Over Length| ErrorReturn[400 Bad Request]
        
        Retriever --> KnowledgeDB[(Curated Peer-Reviewed JSON Dataset)]
        
        KnowledgeDB -->|Calculate Relevance Score| MatchDecision{Sufficient Curated Matches?}
        
        MatchDecision -->|No: Below Threshold| InsufficientReturn[Status: Insufficient Curated Evidence]
        
        MatchDecision -->|Yes: Direct Context Found| PromptBuilder[Grounding Prompt Builder: lib/ai]
        
        PromptBuilder --> GenAISDK["@google/genai SDK (gemma-4-26b-a4b-it)"]
        
        GenAISDK -->|Success| StructuredParser[JSON Response Parser & Citations Binder]
        GenAISDK -->|Quota Limit / Model 404| FallbackDossier[Curated Archive Direct Dossier + Status Notice]
    end

    StructuredParser --> ResultView
    FallbackDossier --> ResultView
    InsufficientReturn --> ResultView
    ErrorReturn --> UIState
```

### Key Architectural Safeguards
1. **Source Grounding as Ground Truth:** The model is not permitted to generate external citations. Citations rendered to the user are bound directly from `src/data/` records verified by human review.
2. **Server-Side Secret Isolation:** `GEMINI_API_KEY` is accessed exclusively within `src/app/api/` and never leaked into client bundles.
3. **Resilient Fail-Soft Strategy:** If the Gemma 4 API call encounters network timeouts or quota exhaustion, the application seamlessly presents the verified curated dossier alongside a transparent system status notice.

---

## 9. Claim Investigator: Detailed Execution Workflow

The Claim Investigator request lifecycle follows a 10-step protocol to prevent hallucination and maintain scientific rigor:

```
Step 1:  User inputs claim string (e.g., "Ashwagandha reduces morning cortisol").
Step 2:  Server-side validation limits input length (10-300 chars) and sanitizes special characters.
Step 3:  Retrieval layer performs weighted lexical and semantic keyword matching across curated records.
Step 4:  Candidate records are evaluated for topical alignment (botanical name, mechanism, outcome).
Step 5:  Relevance threshold is calculated. If score is below cutoff, retrieval stops.
Step 6:  [Branch A: Insufficient Evidence] System immediately returns an "Insufficient Curated Evidence"
         payload explaining that no peer-reviewed records in our archive address this exact claim.
Step 7:  [Branch B: Sufficient Evidence] Server constructs a strictly bounded prompt passing only 
         the retrieved records as context to Gemma 4.
Step 8:  Gemma 4 synthesizes a structured JSON response categorizing:
         - Classical Ayurvedic perspective (Rasa, Virya, Vipaka, classical indication).
         - Modern biomedical trial findings (mechanism, clinical outcomes, RCT data).
         - Evidence certainty & limitations (sample sizes, in vitro vs in vivo).
         - Critical safety alerts (contraindications, drug interactions, toxicological limits).
Step 9:  Server binds verified PubMed URLs and classical citations from the database to the response.
Step 10: Client component displays the structured verdict with accessible badges, expandable source cards,
         and official clinical references.
```

---

## 10. Evidence Methodology

To maintain trust with judges, researchers, and users, Ayur_Veda_Setu adheres to strict evidence curation standards:

### 1. Source Traceability
Every curated entry in the repository must include:
- **Title and Primary Authors / Statutory Body.**
- **Publication Identifier:** PubMed PMID, PMCID, DOI, or clinical trial number (CTRI / ClinicalTrials.gov).
- **Classical Text Concordance:** Chapter and verse in standard Sanskrit treatises (e.g., *Charaka Samhita, Chikitsa Sthana*).
- **Direct Official URL:** Direct link to NCBI, Cochrane, or official institutional publication.

### 2. Evidence Hierarchy
Evidence is categorized and badged into distinct tiers:
- **Strong Clinical Evidence (Green):** Multiple randomized, double-blind, placebo-controlled human trials (RCTs) or systematic meta-analyses demonstrating statistically significant efficacy.
- **Moderate / Preliminary Evidence (Cyan):** Initial human clinical trials with small cohorts or standardized extract trials showing positive trends requiring replication.
- **Traditional Historical Context Only (Muted Sage):** Documented extensively in ancient literature with historical observational use, but lacking modern human clinical trials.
- **High Toxicological Risk / Debunked (Terracotta / Red):** Preparations with documented heavy metal poisoning risks (unstandardized Bhasmas), acute cytotoxic risks, or demonstrably refuted physiological claims.

### 3. Epistemic Humility: Absence of Evidence vs. Evidence of Absence
The platform explicitly clarifies for users that:
- *Absence of modern clinical trials does not automatically prove a botanical remedy is ineffective.* Many plants remain unstudied due to patentability economics.
- *Conversely, centuries of traditional use do not prove safety or clinical efficacy for serious systemic diseases.*

---

## 11. Responsible AI, Safety and Privacy

### 1. Gemma 4 as a Synthesis Tool, Not a Medical Authority
- Gemma 4 is deployed as an evidence-structuring assistant, not an autonomous medical practitioner.
- The system prompt enforces zero external citation generation. All references are verified database entities.

### 2. Non-Diagnostic Commitment
- The platform never uses user input to infer medical diagnoses, disease risks, or pathology.
- The Constitution Explorer (Prakriti) explicitly states that classical dosha heuristics do not reflect genetic markers, blood chemistry, or Western clinical diagnoses.

### 3. Toxicological Vigilance
- High-risk traditional preparations (such as non-standardized herbo-metallic Bhasmas) automatically trigger prominent toxicological safety warnings regarding heavy metals (lead, mercury, arsenic).

### 4. Privacy & Secret Management
- Zero user data is stored, tracked, or sold. Claim inputs are processed in-memory for the duration of the request.
- `GEMINI_API_KEY` is maintained exclusively in `.env.local` (ignored by Git) and executed only on the server runtime.
- Input validation prevents prompt injection and denial-of-service payload attacks.

---

## 12. Implementation Roadmap and Execution Plan

```
[M1] ──► [M2] ──► [M3] ──► [M4] ──► [M5] ──► [M6] ──► [M7] ──► [M8]
Design   Knowledge  Routes   Gemma4  Constit  Library  Polish  Dosha Quiz
& Home    Base      & UI     AI      Explorer  Expert   Verify  + Home CTA
 DONE      DONE      DONE     DONE    DONE      DONE     DONE     DONE
```

### Milestone 1 — Design System and Editorial Homepage
- **Status: Completed**
- **Deliverables:** Design tokens in `globals.css`, `Cinzel` & `Plus Jakarta Sans` typography, zero-dependency SVG icon set, responsive `Navbar`, statutory `Footer`, and complete editorial `page.tsx`.
- **Completion Criteria:** Responsive on all viewports, accessible contrast, zero lint warnings, and clean production build with Turbopack.

### Milestone 2 — Curated Knowledge Base & Evidence Retrieval
- **Status: Completed**
- **Deliverables:** Strongly-typed evidence interfaces (`types.ts`), curated peer-reviewed and classical dataset (`dataset.ts`), direct relevance retrieval engine (`retriever.ts`), and lightweight test harness (`scripts/test-retrieval.ts`).
- **Completion Criteria:** 8/8 automated test cases pass; genuine PubMed PMIDs and classical references; explicit `Insufficient Curated Evidence` safeguard for unindexed or non-matching claims.

### Milestone 3 — Shared Components and Route Framework
- **Status: Completed**
- **Deliverables:** Reusable components, icons, and structured App Router framework for `/explore`, `/investigate`, `/constitution`, `/learn`, and `/experts`.
- **Completion Criteria:** All navigation links route to functional page containers with zero 404 errors.

### Milestone 4 — Claim Investigator & Gemma 4 Integration
- **Status: Completed**
- **Deliverables:** Server-side API `src/app/api/investigate/route.ts` using `@google/genai` (`gemma-4-26b-a4b-it`); grounding prompt builder; ClaimForm with real-time loading, success, and error states; fail-soft curated fallback.
- **Completion Criteria:** Bounded claims synthesize properly without leaking keys or hallucinating sources; live model testing verified.

### Milestone 5 — Constitution Explorer (Prakriti Philosophy)
- **Status: Completed**
- **Deliverables:** Interactive tabs exploring Vata, Pitta, and Kapha psychophysiology; classical qualities (Gunas), governed functions, balance/imbalance signs, and lifestyle concepts.
- **Completion Criteria:** Explicit non-diagnostic disclaimer; content distinguishes traditional philosophy from Western biomedical diagnosis.

### Milestone 6 — Learning Library & Verified Expert Directory
- **Status: Completed**
- **Deliverables:** Searchable health literacy library with full reader view (`/learn`); statutory Apex government hospitals directory with NCISM 4-step practitioner verification checklist (`/experts`); comparative science encyclopedia (`/explore`).
- **Completion Criteria:** Search and category filters work seamlessly; zero fabricated doctor profiles or simulated reviews.

### Milestone 7 — Comprehensive Verification, Accessibility & Delivery
- **Status: Completed**
- **Deliverables:** Milestone 7 test suite (`npm run test:audit`), secret shielding verification, clean production build (10/10 routes), and submission documentation.
- **Completion Criteria:** Flawless production build, 16/16 audit checks pass, and judge-ready presentation.

### Milestone 8 — Dosha Discovery Quiz & Homepage Quiz CTAs
- **Status: Completed**
- **Deliverables:**
  - `src/components/constitution/DoshaQuiz.tsx`: 12-question interactive quiz with progress bar, back navigation, tie-breaking logic for dual/tri-doshic outcomes, non-diagnostic disclaimers, and restart option.
  - Embedded in `src/app/constitution/page.tsx` at `#dosha-quiz-section` anchor.
  - Homepage (`src/app/page.tsx`) updated with two prominent quiz entry points:
    1. **Hero section:** Terracotta `Take Dosha Quiz` button (alongside the main CTAs).
    2. **Tridosha section:** Full-width `Discover Your Archetype Balance — Take the Quiz` button inside the archetype preview card, plus a primary CTA row with `Take Dosha Discovery Quiz (12 Questions)`.
  - `scripts/test-quiz.ts`: 11/11 automated test cases for quiz scoring and tie-breaking logic (`npm run test:quiz`).
- **Completion Criteria:** Quiz accessible from the homepage with a single click, all 11 quiz tests pass, zero lint errors.

---

## 13. Evaluation and Testing Strategy

### Representative Test Matrix

| Test ID | Test Scenario | Input / Action | Expected System Behavior | Verification Status |
| :--- | :--- | :--- | :--- | :--- |
| **TEST-01** | Production Build & Typecheck | `npm run build` | Zero TypeScript or CSS errors; static prerendering passes for 10 routes | **Verified Passed** |
| **TEST-02** | ESLint Code Quality | `npm run lint` | Clean pass with zero errors and zero warnings across all `.ts`/`.tsx` | **Verified Passed** |
| **TEST-03** | Secret Shielding | `git status --ignored` | `.env.local`, `.next/`, and `node_modules/` remain strictly excluded from Git | **Verified Passed** |
| **TEST-04** | Supported Curated Claim | Submit: *"Curcumin and piperine for joint pain"* | Returns structured analysis with PMID: 9619120 and clinical evidence tier | **Verified Passed (`npm run test:retrieval`)** |
| **TEST-05** | Unsupported Novel Claim | Submit: *"Boiled papaya seeds cure dengue in 2 hours"* | Returns explicit "Insufficient Curated Evidence" status; zero synthetic citations | **Verified Passed (`npm run test:retrieval`)** |
| **TEST-06** | Invalid / Short Input | Submit: Empty or <3 characters | Input validation rejects with descriptive `INVALID_INPUT` error | **Verified Passed (`npm run test:retrieval`)** |
| **TEST-07** | Topic Mentioned, Claim Unsupported | Submit: *"Can Ashwagandha cure diabetes?"* | Returns `TOPIC_MENTIONED_CLAIM_UNSUPPORTED`; refuses to generalize stress evidence | **Verified Passed (`npm run test:retrieval`)** |
| **TEST-08** | Offline / Quota Fallback | Simulated missing key / 429 quota exhaustion | Renders verified curated dossier directly with fail-soft status notice | **Verified Passed (`npm run test:audit`)** |
| **TEST-09** | Live Gemma 4 Model Call | `npm run test:api` | Verified live API call to `gemma-4-26b-a4b-it` producing grounded synthesis | **Verified Passed (`npm run test:api`)** |
| **TEST-10** | Official Statutory Portals | Browse `/experts` directory | Direct links to NCISM, Ministry of Ayush, AIIA, NIA, and CCRAS | **Verified Passed** |
| **TEST-11** | Full Security & Safety Audit | `npm run test:audit` | 16/16 assertions pass: citation validity, rejection triggers, boundary locks | **Verified Passed (`npm run test:audit`)** |
| **TEST-12** | Dosha Quiz Scoring Logic | `npm run test:quiz` | 11/11 quiz tests pass: single-dominant, dual-doshic tie-breaking, tri-doshic spread | **Verified Passed (`npm run test:quiz`)** |
| **TEST-13** | Homepage Quiz CTA Presence | Navigate to `/` | Hero button `Take Dosha Quiz` and Tridosha section CTA visible; click routes to `/constitution#dosha-quiz-section` | **Verified Passed** |

---

## 14. Repository Structure

Current workspace layout reflecting actual implementation in `src/`:

```
Ayur_Veda_Setu/
├── .env.local                          # Local secrets (GEMINI_API_KEY) - [Git Ignored]
├── .gitignore                          # Protected secret patterns & Next.js build caches
├── README.md                           # Comprehensive Judge-Ready Project Blueprint
├── eslint.config.mjs                   # ESLint configuration
├── next.config.ts                      # Next.js configuration (Turbopack, Cache Components)
├── package.json                        # Dependencies (@google/genai, React 19, Next.js 16)
├── package-lock.json                   # Deterministic package tree lockfile
├── tsconfig.json                       # TypeScript compiler options & path aliases (@/*)
├── public/                             # Static SVG assets & brand icons
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   └── vercel.svg
├── src/
│   ├── app/
│   │   ├── favicon.ico                 # Platform favicon
│   │   ├── globals.css                 # Custom design tokens, typography, & badge utilities
│   │   ├── layout.tsx                  # Root layout: Cinzel & Plus Jakarta Sans, Navbar, Footer
│   │   ├── page.tsx                    # Editorial Homepage: Hero (quiz CTA), Case #AYU-084, Tridosha (quiz CTA)
│   │   ├── explore/                    # [Implemented Milestone 6]: Ayurveda Meets Science
│   │   │   └── page.tsx                # Curated comparative monograph browser
│   │   ├── investigate/                # [Implemented Milestone 4]: Claim Investigator UI
│   │   │   └── page.tsx                # Interactive claim evaluation & Gemma 4 UI
│   │   ├── constitution/               # [Implemented Milestones 5+8]: Tridosha Educational Dossier
│   │   │   └── page.tsx                # Vata/Pitta/Kapha explorer + embedded Dosha Discovery Quiz
│   │   ├── learn/                      # [Implemented Milestone 6]: Misinformation Library
│   │   │   └── page.tsx                # Searchable health literacy articles & reader
│   │   ├── experts/                    # [Implemented Milestone 6]: Statutory Institutes Directory
│   │   │   └── page.tsx                # Apex government hospitals & NCISM verification guide
│   │   └── api/
│   │       └── investigate/            # [Implemented Milestone 4]: Server-side Gemma 4 API Route
│   │           └── route.ts            # Bounded retrieval, Gemma 4 call & error handling
│   ├── components/
│   │   ├── constitution/               # [Implemented Milestone 8]: Dosha Quiz Component
│   │   │   └── DoshaQuiz.tsx           # 12-question quiz, progress bar, scoring, dual/tri-doshic results
│   │   ├── layout/
│   │   │   ├── Navbar.tsx              # Responsive navigation with active route highlights
│   │   │   └── Footer.tsx              # Statutory medical disclaimers & official links
│   │   └── ui/
│   │       └── icons.tsx               # Zero-dependency accessible inline SVG icons
│   └── lib/
│       ├── knowledge/                  # [Implemented Milestones 2 & 3]: Dataset & retrieval
│       │   ├── types.ts                # TypeScript interfaces for sources, evidence, & retrieval
│       │   ├── dataset.ts              # Curated peer-reviewed records with verified PMIDs
│       │   ├── retriever.ts            # Epistemic retrieval engine & overclaim rejection guards
│       │   ├── contextBuilder.ts       # Bounded context prompt generator for Gemma 4
│       │   └── index.ts                # Public module export
│       └── ai/                         # [Implemented Milestone 4]: Server-side AI client
│           ├── client.ts               # Server-only GoogleGenAI client (gemma-4-26b-a4b-it)
│           └── index.ts                # Public AI exports
└── scripts/
    ├── test-retrieval.ts               # [Implemented Milestone 2]: Epistemic retrieval test harness
    ├── test-live-api.ts                # [Implemented Milestone 4]: Live Gemma 4 end-to-end test
    ├── test-quiz.ts                    # [Implemented Milestone 8]: Dosha Quiz scoring & tie-breaking tests
    └── verify-milestone7.ts            # [Implemented Milestone 7]: Full security & audit test suite
```

---

## 15. Installation and Execution

### Prerequisites
- **Node.js:** v18.18.0 or newer (v20+ recommended).
- **npm:** v9.0.0 or newer.
- **Google AI Studio API Key:** (Optional for local UI exploration, required for live Gemma 4 API synthesis).

### Step-by-Step Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Yashasvi-Kushwaha/Social-Implications-of-Society.git
   cd Social-Implications-of-Society
   ```
   *(If working inside the local `Ayur_Veda_Setu` directory, navigate directly into it).*

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Secrets (Optional for offline demo):**
   Create a `.env.local` file in the root directory alongside `package.json`:
   ```bash
   # .env.local (Never commit this file to version control)
   GEMINI_API_KEY=your_google_ai_studio_api_key_here
   ```

4. **Run the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your web browser.

5. **Execute production verification checks:**
   ```bash
   # Run ESLint code quality checks
   npm run lint

   # Run production build with Turbopack
   npm run build

   # Execute the evidence retrieval test suite
   npm run test:retrieval

   # Execute the Dosha Discovery Quiz scoring test suite (11/11 tests)
   npm run test:quiz

   # Execute the live Gemma 4 API integration test
   npm run test:api

   # Execute the full Milestone 7 security and safety audit
   npm run test:audit
   ```

---

## 16. Limitations and Future Scope

### Honest Technical & Epistemic Limitations
- **Curated Dataset Breadth:** The initial knowledge base focuses on high-frequency wellness claims (e.g., Turmeric, Ashwagandha, Triphala, Bhasmas). It does not encompass the entire classical Ayurvedic formulary.
- **Language Models as Synthesizers:** LLMs, including Gemma 4, are sensitive to phrasing. Strict RAG constraints prevent hallucinated citations, but nuanced multi-herb synergistic interactions (*Samyoga*) remain difficult for AI to fully evaluate.
- **Dynamic Biomedical Research:** Scientific consensus evolves. A study published today may be qualified or refuted by a larger randomized trial tomorrow.
- **Non-Diagnostic Constraint:** The constitution questionnaire is an educational reflection tool; it cannot measure metabolic blood markers or replace pulse diagnosis (*Nadi Pariksha*) by a qualified clinician.

### Planned Future Scope
- **Multilingual Support:** Localization into Hindi, Sanskrit, and regional Indian languages to democratize health literacy.
- **Broadened Statutory Directory:** Expansion to include NABH-accredited regional hospitals across all Indian states.
- **Community Evidence Peer Review:** A structured portal allowing licensed BAMS/MD researchers and pharmacologists to propose new curated entries with DOI verification.
- **Independent ML Verification Classifier:** Exploring a specialized fine-tuned classifier evaluated on held-out test benchmarks for automated wellness claim classification.

---

## 17. Project Status, Contribution and Disclaimer

### Current Project Status
- **Current Milestone:** **Milestones 1–8 Complete** (All core modules, design system, curated retrieval, Gemma 4 bounded AI integration, Constitution Explorer with 12-question interactive Dosha Discovery Quiz, homepage quiz CTAs, Learning Library, Expert Directory, and comprehensive security audit fully implemented and verified).
- **Project Readiness:** **Judge-Ready & Submission-Verified** (10/10 Next.js routes prerendered, 0 build errors, 0 lint warnings, 16/16 audit assertions + 11/11 quiz assertions passing).

### Contribution Guidelines
Contributions that enhance scientific accuracy, cite genuine peer-reviewed literature, or improve accessibility are welcome. All proposed evidence records must supply verifiable PubMed PMIDs, official trial registration numbers, or verifiable classical Sanskrit citations. Synthetic or ungrounded contributions will be rejected.

### Statutory Educational and Medical Disclaimer
> **IMPORTANT NOTICE:**  
> Ayur_Veda_Setu is an educational research and health literacy platform. The contents, doshic assessments, and AI-assisted syntheses are provided exclusively for academic, informational, and critical-thinking purposes. **Nothing on this platform constitutes medical advice, clinical diagnosis, or a therapeutic prescription.**  
> Traditional concepts (*Vata, Pitta, Kapha, Agni*) represent historical philosophical heuristics, not clinically validated genetic or biological markers. Herbo-metallic preparations (*Bhasmas*) present severe heavy metal toxicity risks if prepared without certified pharmacopeial batch standardization. Always consult qualified healthcare professionals registered with the **National Commission for Indian System of Medicine (NCISM)** or state statutory medical councils for health concerns.
