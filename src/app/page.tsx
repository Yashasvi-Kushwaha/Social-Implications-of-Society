import React from "react";
import Link from "next/link";
import {
  SearchIcon,
  ShieldAlertIcon,
  BookOpenIcon,
  ScaleIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  SparklesIcon,
  BuildingLibraryIcon,
} from "@/components/ui/icons";

export default function HomePage() {
  const sampleClaims = [
    {
      title: "Turmeric (Curcumin) with Piperine for Knee Osteoarthritis",
      status: "Moderate Clinical Evidence",
      badgeClass: "badge-evidence-moderate",
      ayurvedaView:
        "Classically termed Haridra (Katu/Tikta rasa), used for reducing Kapha-Vata imbalances, systemic inflammation, and joint rigidity (Sandhivata).",
      biomedicalView:
        "Curcumin inhibits NF-κB and COX-2 signaling pathways. Co-administration with piperine increases bioavailability by up to 2,000% (PMID: 9619120).",
      verdict: "Biochemically grounded when bioavailability is enhanced; adjunct support, not an absolute cure.",
    },
    {
      title: "Unregulated Herbo-Metallic Bhasmas as 'Rapid Detox' for Diabetes",
      status: "High Toxicological Risk",
      badgeClass: "badge-evidence-debunked",
      ayurvedaView:
        "Classical Rasa Shastra strictly mandates hundreds of hours of Shodhana (purification) and Marana (incineration) under master vaidyas.",
      biomedicalView:
        "Independent laboratory assays repeatedly identify dangerous concentrations of lead, mercury, and arsenic in non-standardized commercial batches (JAMA 2008; 300(8)).",
      verdict: "Severe heavy-metal nephrotoxicity risk. Prohibited without certified GLP/pharmacopeial batch testing.",
    },
    {
      title: "Ashwagandha (Withania somnifera) Extract for Chronic Psychological Stress",
      status: "Preliminary Clinical Evidence",
      badgeClass: "badge-evidence-strong",
      ayurvedaView:
        "Revered as a premier Rasayana (rejuvenator) and Balya herb in the Charaka Samhita (Chikitsa Sthana 1.2) for combatting debility (Shosha).",
      biomedicalView:
        "Randomized, double-blind trials demonstrate statistically significant reductions in morning serum cortisol and perceived stress scores (PMID: 31517876).",
      verdict: "Evidence supports adaptogenic stress modulation; contra-indicated with thyroid disorders or immunosuppressants.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 border-b border-[#E5D9C6]">
        {/* Subtle decorative archival lines */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#173D32_1px,transparent_1px)] [background-size:24px_24px]"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Editorial Headline & Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#A8B7A0]/25 text-[#173D32] text-xs font-semibold uppercase tracking-wider border border-[#A8B7A0]/40">
                <ScaleIcon className="w-4 h-4 text-[#B96345]" />
                <span>Epistemological Bridge &amp; Evidence Watch</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#173D32] font-semibold leading-[1.12] tracking-tight">
                Ancient Ayurvedic Wisdom. <br />
                <span className="italic font-normal text-[#B96345]">
                  Rigorous Biomedical Scrutiny.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#596157] max-w-2xl leading-relaxed font-sans">
                AyurVeda_Setu bridges classical Sanskrit treatises (*Charaka*, *Sushruta*) with contemporary peer-reviewed clinical trials. We empower citizens and researchers to separate genuine botanical pharmacology from viral, predatory health misinformation.
              </p>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-4">
                <Link
                  href="/investigate"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#173D32] text-[#F6F2E9] hover:bg-[#235244] font-medium text-sm tracking-wide shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#173D32]"
                >
                  <SearchIcon className="w-4 h-4 text-[#A8B7A0]" />
                  <span>Investigate a Wellness Claim</span>
                  <ArrowRightIcon className="w-4 h-4 ml-0.5" />
                </Link>

                <Link
                  href="/constitution#dosha-quiz-section"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#B96345] text-white hover:bg-[#9A4F35] font-medium text-sm tracking-wide shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B96345]"
                >
                  <SparklesIcon className="w-4 h-4 text-white" />
                  <span>Take Dosha Quiz</span>
                </Link>

                <Link
                  href="/explore"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#E5D9C6]/60 text-[#173D32] hover:bg-[#E5D9C6] font-medium text-sm transition-all border border-[#E5D9C6] focus:outline-none focus:ring-2 focus:ring-[#173D32]"
                >
                  <BookOpenIcon className="w-4 h-4 text-[#596157]" />
                  <span>Explore Science &amp; Tradition</span>
                </Link>
              </div>

              {/* Verification Principles Tagline */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-[#596157]">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-[#173D32]" />
                  <span>Curated PubMed PMIDs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-[#173D32]" />
                  <span>Gemma 4 Grounded AI</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-[#173D32]" />
                  <span>Zero Hallucinated Citations</span>
                </div>
              </div>
            </div>

            {/* Right Column: Art-Directed Editorial Archive Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-[#FCFAF6] border border-[#E5D9C6] p-6 sm:p-8 shadow-sm">
                <div className="absolute top-0 right-0 -mt-3.5 -mr-3.5 px-3 py-1 rounded-full bg-[#B96345] text-white text-[11px] font-semibold uppercase tracking-wider shadow">
                  Evidence In Practice
                </div>

                <div className="border-b border-[#E5D9C6] pb-4 mb-5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#B96345]">
                    CASE INVESTIGATION #AYU-084
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[#173D32] mt-1">
                    Ashwagandha &amp; Serum Cortisol
                  </h3>
                </div>

                <div className="space-y-4 text-xs">
                  {/* Ayurvedic Record */}
                  <div className="p-3.5 rounded-xl bg-[#F6F2E9] border border-[#E5D9C6]">
                    <div className="font-semibold text-[#173D32] flex items-center justify-between">
                      <span className="uppercase tracking-wider text-[10px] text-[#596157]">
                        Classical Treatise
                      </span>
                      <span className="text-[11px] italic font-serif">Charaka Samhita</span>
                    </div>
                    <p className="mt-1.5 text-[#242923] leading-relaxed">
                      Categorized as *Balya* (strength-imparting) and *Medhya Rasayana* for mitigating Vata aggravation caused by exhaustion (*Kshaya*).
                    </p>
                  </div>

                  {/* Modern Biomedical Trial */}
                  <div className="p-3.5 rounded-xl bg-[#EBF3F5] border border-[#CFE2E8]">
                    <div className="font-semibold text-[#164E63] flex items-center justify-between">
                      <span className="uppercase tracking-wider text-[10px]">
                        Clinical Trial (RCT)
                      </span>
                      <span className="font-mono text-[11px]">PMID: 31517876</span>
                    </div>
                    <p className="mt-1.5 text-[#164E63] leading-relaxed">
                      Double-blind, placebo-controlled 60-day study (240mg withanolide glycosides): 27.9% reduction in serum cortisol vs 7.9% in placebo.
                    </p>
                  </div>

                  {/* Safety & Limitations */}
                  <div className="p-3 rounded-xl bg-[#FAF0EC] border border-[#E5D9C6] text-[#B96345]">
                    <div className="font-semibold text-[11px] flex items-center gap-1.5">
                      <ShieldAlertIcon className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>Contraindications &amp; Hepatic Monitoring</span>
                    </div>
                    <p className="mt-1 text-[11px] text-[#9A4F35] leading-relaxed">
                      Potential interaction with thyroid medications. Rare cases of drug-induced liver injury reported with concentrated ethanolic extracts.
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#E5D9C6] flex items-center justify-between text-[11px]">
                  <span className="text-[#596157]">Evaluated via Curated Dataset</span>
                  <Link
                    href="/investigate"
                    className="font-semibold text-[#173D32] hover:text-[#B96345] transition-colors flex items-center gap-1"
                  >
                    <span>Full Analysis</span>
                    <ArrowRightIcon className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Section 1: The Epistemological Divide */}
      <section className="py-20 bg-[#F6F2E9] border-b border-[#E5D9C6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#B96345]">
              Epistemological Framework
            </h2>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#173D32] font-semibold">
              Two Different Ways of Knowing
            </h3>
            <p className="text-sm sm:text-base text-[#596157] leading-relaxed">
              Ayurveda and modern biomedicine emerge from fundamentally different epistemic philosophies. Genuine integration requires honoring both frameworks without false equivalence or uncritical mysticism.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* The Classical Holistic Paradigm */}
            <div className="rounded-2xl bg-[#FCFAF6] border border-[#E5D9C6] p-8 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#A8B7A0]/20 text-[#173D32] text-xs font-medium">
                <span>Traditional Ayurvedic Epistemology</span>
              </div>
              <h4 className="font-serif text-2xl text-[#173D32] font-semibold">
                Qualitative, Systemic &amp; Dynamic Balance
              </h4>
              <p className="text-xs sm:text-sm text-[#596157] leading-relaxed">
                Classical texts observe patterns of health through *Prakriti* (baseline constitution), *Agni* (digestive transformation), and *Doshas* (functional bio-regulators). Illness is framed as functional disharmony and accumulation of metabolic endotoxins (*Ama*), resolved through lifestyle, diet (*Ahara*), and polyherbal formulations.
              </p>
              <ul className="space-y-2.5 text-xs text-[#242923] pt-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#B96345] font-bold mt-0.5">&bull;</span>
                  <span><strong>Method:</strong> Classical clinical empiricism, observational typology, and long-term traditional documentation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B96345] font-bold mt-0.5">&bull;</span>
                  <span><strong>Strength:</strong> Holistic personalization, chronobiology (*Dinacharya*), and preventive habit engineering.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B96345] font-bold mt-0.5">&bull;</span>
                  <span><strong>Limitation:</strong> Lacks standardized double-blind controls, pharmacokinetic assays, and emergency surgical precision.</span>
                </li>
              </ul>
            </div>

            {/* The Modern Biomedical Paradigm */}
            <div className="rounded-2xl bg-[#FCFAF6] border border-[#E5D9C6] p-8 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#CFE2E8]/40 text-[#164E63] text-xs font-medium">
                <span>Modern Biomedical Science</span>
              </div>
              <h4 className="font-serif text-2xl text-[#173D32] font-semibold">
                Molecular Targets, Trials &amp; Toxicology
              </h4>
              <p className="text-xs sm:text-sm text-[#596157] leading-relaxed">
                Biomedical research relies on reductionist biochemical pathways: receptor affinities, biomarker quantification, and randomized placebo-controlled trials (RCTs). It demands reproducible chemical assays, strict toxicological limits, and systematic meta-analyses to prove therapeutic efficacy beyond placebo effects.
              </p>
              <ul className="space-y-2.5 text-xs text-[#242923] pt-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#173D32] font-bold mt-0.5">&bull;</span>
                  <span><strong>Method:</strong> High-Performance Liquid Chromatography (HPLC), double-blind RCTs, and statistical meta-analyses.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#173D32] font-bold mt-0.5">&bull;</span>
                  <span><strong>Strength:</strong> Objective safety verification, precise dosage calibration, and acute life-saving interventions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#173D32] font-bold mt-0.5">&bull;</span>
                  <span><strong>Limitation:</strong> Struggles with complex multi-herb synergy (*Samyoga*) and holistic psychosomatic individuality.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Section 2: Interactive Claim Investigator Showcase */}
      <section className="py-20 bg-[#FCFAF6] border-b border-[#E5D9C6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-3">
              <div className="text-xs font-semibold uppercase tracking-widest text-[#B96345]">
                Misinformation Countermeasure
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#173D32] font-semibold">
                Verified Claim Dossiers
              </h3>
              <p className="text-sm text-[#596157] max-w-xl">
                Viral social media claims analyzed through our curated evidence base and synthesized with Gemma 4. Zero fabricated citations.
              </p>
            </div>
            <Link
              href="/investigate"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#173D32] hover:text-[#B96345] transition-colors"
            >
              <span>Submit a Custom Claim</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {sampleClaims.map((claim, index) => (
              <div
                key={index}
                className="rounded-2xl bg-[#F6F2E9] border border-[#E5D9C6] p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${claim.badgeClass}`}>
                      {claim.status}
                    </span>
                    <span className="text-[11px] font-mono text-[#596157]">#0{index + 1}</span>
                  </div>

                  <h4 className="font-serif text-lg font-semibold text-[#173D32] leading-snug">
                    {claim.title}
                  </h4>

                  <div className="space-y-3 text-xs pt-1">
                    <div>
                      <span className="font-semibold text-[#173D32] text-[11px] uppercase tracking-wider block">
                        Classical Ayurvedic View
                      </span>
                      <p className="text-[#596157] mt-0.5 leading-relaxed">{claim.ayurvedaView}</p>
                    </div>

                    <div>
                      <span className="font-semibold text-[#164E63] text-[11px] uppercase tracking-wider block">
                        Biomedical Trial Evidence
                      </span>
                      <p className="text-[#596157] mt-0.5 leading-relaxed">{claim.biomedicalView}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E5D9C6]">
                  <div className="text-[11px] text-[#B96345] font-medium leading-relaxed">
                    <strong>Verdict:</strong> {claim.verdict}
                  </div>
                  <Link
                    href="/investigate"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#173D32] hover:text-[#B96345] transition-colors"
                  >
                    <span>Inspect Evidence Breakdown</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Narrative Section 3: Constitution Explorer (Prakriti) Teaser */}
      <section className="py-20 bg-[#F6F2E9] border-b border-[#E5D9C6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#173D32]/10 text-[#173D32] text-xs font-semibold uppercase tracking-wider">
                <SparklesIcon className="w-3.5 h-3.5 text-[#B96345]" />
                <span>Self-Reflection Instrument</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-[#173D32] font-semibold leading-tight">
                Understand Your Traditional Constitution Without Medical Pretense
              </h3>

              <p className="text-sm sm:text-base text-[#596157] leading-relaxed">
                Many modern commercial apps mischaracterize traditional *Prakriti* as a clinical diagnostic test or genetic destiny. In AyurVeda_Setu, our interactive 12-question quiz explores classical functional tendencies (*Vata*, *Pitta*, *Kapha*) strictly as an educational heuristic.
              </p>

              <div className="p-4 rounded-xl bg-[#FAF0EC] border border-[#E5D9C6] text-xs text-[#9A4F35] space-y-1">
                <span className="font-bold flex items-center gap-1.5 text-[#B96345]">
                  <ShieldAlertIcon className="w-4 h-4 flex-shrink-0" />
                  Strict Non-Diagnostic Commitment
                </span>
                <p>
                  This questionnaire does not diagnose pathology, prescribe medicinal doses, or substitute for a clinical consultation. It illustrates how ancient observers categorized physiological tendencies.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/constitution#dosha-quiz-section"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#B96345] text-white hover:bg-[#9A4F35] font-medium text-sm transition-all shadow-sm"
                >
                  <SparklesIcon className="w-4 h-4 text-white" />
                  <span>Take Dosha Discovery Quiz (12 Questions)</span>
                  <ArrowRightIcon className="w-4 h-4 text-white/80" />
                </Link>
                <Link
                  href="/constitution#dossier-explorer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#E5D9C6]/60 text-[#173D32] hover:bg-[#E5D9C6] font-medium text-sm transition-all border border-[#E5D9C6]"
                >
                  <span>Explore Archetypes</span>
                </Link>
              </div>
            </div>

            {/* Tripartite Breakdown Preview Card */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl bg-[#FCFAF6] border border-[#E5D9C6] p-6 sm:p-8 space-y-6">
                <div className="border-b border-[#E5D9C6] pb-4">
                  <div className="text-xs uppercase tracking-wider text-[#596157] font-semibold">
                    Tripartite Classical Archetypes
                  </div>
                  <h4 className="font-serif text-xl font-semibold text-[#173D32] mt-1">
                    Functional Physiological Heuristics
                  </h4>
                </div>

                <div className="space-y-4">
                  {/* Vata */}
                  <div className="p-4 rounded-xl bg-[#F6F2E9] border border-[#E5D9C6]">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#173D32]">
                      <span className="font-serif text-sm">Vata (वातः) &mdash; Movement &amp; Neuromuscular</span>
                      <span className="text-[11px] text-[#596157]">Air + Ether</span>
                    </div>
                    <p className="text-xs text-[#596157] mt-1 leading-relaxed">
                      Governs respiration, impulse transmission, peristalsis, and circulatory kinetics. Qualities: dry (*Ruksha*), light (*Laghu*), mobile (*Chala*).
                    </p>
                  </div>

                  {/* Pitta */}
                  <div className="p-4 rounded-xl bg-[#F6F2E9] border border-[#E5D9C6]">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#B96345]">
                      <span className="font-serif text-sm">Pitta (पित्तम्) &mdash; Thermogenesis &amp; Digestion</span>
                      <span className="text-[11px] text-[#596157]">Fire + Water</span>
                    </div>
                    <p className="text-xs text-[#596157] mt-1 leading-relaxed">
                      Governs enzymatic conversion (*Agni*), bile secretion, cellular metabolism, and body temperature. Qualities: hot (*Ushna*), sharp (*Tikshna*).
                    </p>
                  </div>

                  {/* Kapha */}
                  <div className="p-4 rounded-xl bg-[#F6F2E9] border border-[#E5D9C6]">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#173D32]">
                      <span className="font-serif text-sm">Kapha (कफः) &mdash; Structural Integrity &amp; Anabolism</span>
                      <span className="text-[11px] text-[#596157]">Earth + Water</span>
                    </div>
                    <p className="text-xs text-[#596157] mt-1 leading-relaxed">
                      Governs mucosal protection, synovial lubrication, tissue synthesis, and immune stability (*Ojas*). Qualities: heavy (*Guru*), cold (*Sheeta*).
                    </p>
                  </div>

                  {/* Discover Balance CTA */}
                  <div className="pt-2">
                    <Link
                      href="/constitution#dosha-quiz-section"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#173D32] text-white hover:bg-[#235244] text-xs font-semibold tracking-wide transition-all shadow-sm"
                    >
                      <SparklesIcon className="w-4 h-4 text-[#A8B7A0]" />
                      <span>Discover Your Archetype Balance &mdash; Take the Quiz</span>
                      <ArrowRightIcon className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Section 4: Verified Institutions & Regulatory Safety */}
      <section className="py-20 bg-[#FCFAF6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#B96345]">
              Regulatory &amp; Institutional Oversight
            </h2>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#173D32] font-semibold">
              Connect Only With Statutory Apex Bodies
            </h3>
            <p className="text-sm sm:text-base text-[#596157] leading-relaxed">
              In an online market saturated with unverified practitioners and commercialized health gurus, official institutional credentials are your first line of defense.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl bg-[#F6F2E9] border border-[#E5D9C6] p-6 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#173D32] text-[#F6F2E9] flex items-center justify-center">
                <BuildingLibraryIcon className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-semibold text-[#173D32]">
                Statutory Teaching Hospitals
              </h4>
              <p className="text-xs text-[#596157] leading-relaxed">
                Connect directly with premier autonomous institutions like the All India Institute of Ayurveda (AIIA, New Delhi) and ITRA Jamnagar that conduct institutional ethics-cleared clinical trials.
              </p>
              <Link
                href="/experts"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#173D32] hover:text-[#B96345] pt-2"
              >
                <span>View Premier Institutes</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl bg-[#F6F2E9] border border-[#E5D9C6] p-6 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#B96345] text-white flex items-center justify-center">
                <ShieldAlertIcon className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-semibold text-[#173D32]">
                NCISM Doctor Verification
              </h4>
              <p className="text-xs text-[#596157] leading-relaxed">
                Learn how to cross-reference an Ayurvedic doctor&apos;s BAMS or MD degree against the official National Commission for Indian System of Medicine central register before scheduling consultations.
              </p>
              <Link
                href="/experts"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#173D32] hover:text-[#B96345] pt-2"
              >
                <span>Registry Verification Guide</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl bg-[#F6F2E9] border border-[#E5D9C6] p-6 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#164E63] text-white flex items-center justify-center">
                <BookOpenIcon className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-semibold text-[#173D32]">
                Critical Literacy Library
              </h4>
              <p className="text-xs text-[#596157] leading-relaxed">
                Master how to read PubMed abstracts, recognize dangerous heavy metal Bhasmas, detect predatory marketing claims, and distinguish clinical evidence from anecdotal testimonials.
              </p>
              <Link
                href="/learn"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#173D32] hover:text-[#B96345] pt-2"
              >
                <span>Explore Learning Library</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="bg-[#173D32] text-[#F6F2E9] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h3 className="font-serif text-3xl sm:text-4xl font-semibold leading-tight">
            Have You Encountered a Questionable Health Claim?
          </h3>
          <p className="text-sm sm:text-base text-[#A8B7A0] leading-relaxed max-w-2xl mx-auto">
            Before adopting unverified botanical regimens or miracle detoxes seen on Instagram or WhatsApp, cross-reference them against our curated scientific archive.
          </p>
          <div className="pt-2">
            <Link
              href="/investigate"
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl bg-[#B96345] text-white hover:bg-[#9A4F35] font-semibold text-sm tracking-wide shadow-md transition-all"
            >
              <SearchIcon className="w-4 h-4" />
              <span>Submit Claim for Source-Grounded Investigation</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
