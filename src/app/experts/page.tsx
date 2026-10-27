"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  UserCircleIcon,
  SearchIcon,
  FilterIcon,
  ShieldAlertIcon,
  CheckCircleIcon,
  BuildingLibraryIcon,
  ArrowRightIcon,
  SparklesIcon,
} from "@/components/ui/icons";

// ─── Types ────────────────────────────────────────────────────────────────────

type DirectoryCategory =
  | "all"
  | "apex-institution"
  | "research-center"
  | "statutory-portal"
  | "sample-profile";

interface DirectoryEntry {
  id: string;
  name: string;
  subtitle: string;
  type: "verified-institution" | "statutory-portal" | "sample-practitioner";
  category: DirectoryCategory;
  categoryLabel: string;
  city: string;
  state: string;
  affiliation: string;
  accreditation: string;
  specialties: string[];
  description: string;
  officialUrl?: string;
  registrationDetails?: string;
  isSample?: boolean;
}

// ─── Filter Categories ────────────────────────────────────────────────────────

const CATEGORIES: { key: DirectoryCategory; label: string }[] = [
  { key: "all", label: "All Directories" },
  { key: "apex-institution", label: "Apex Government Hospitals" },
  { key: "research-center", label: "Research Centers (CCRAS)" },
  { key: "statutory-portal", label: "Statutory Verification Portals" },
  { key: "sample-profile", label: "Sample Profiles (Demonstration)" },
];

// ─── Verifiable Directory Data ────────────────────────────────────────────────
// Real, traceable Apex Institutions and Statutory Portals in India.
// Sample practitioner profiles are transparently marked as synthetic development fixtures.

const DIRECTORY_ENTRIES: DirectoryEntry[] = [
  {
    id: "aiia-delhi",
    name: "All India Institute of Ayurveda (AIIA)",
    subtitle: "Apex Institute under Ministry of Ayush, Govt. of India",
    type: "verified-institution",
    category: "apex-institution",
    categoryLabel: "Apex Government Hospital",
    city: "New Delhi",
    state: "Delhi",
    affiliation: "Ministry of Ayush, Government of India",
    accreditation: "NABH Accredited Hospital & NABL Accredited Diagnostic Laboratories",
    specialties: [
      "Kayachikitsa (Internal Medicine)",
      "Panchakarma (Detoxification)",
      "Shalya Tantra (Surgical Techniques & Ksharasutra)",
      "Prasuti & Stri Roga (Gynecology)",
      "Integrative Cancer Research Unit",
    ],
    description:
      "AIIA is conceived as an apex institute of Ayurveda analogous to AIIMS for modern medicine. It operates a 200-bed tertiary care referral Ayurvedic hospital, conducting clinical validation, translational drug research, and NABH-compliant protocols.",
    officialUrl: "https://aiia.gov.in",
    registrationDetails: "Autonomous Organization, Ministry of Ayush, Govt. of India",
  },
  {
    id: "nia-jaipur",
    name: "National Institute of Ayurveda (NIA)",
    subtitle: "Deemed to be University under De-novo Category",
    type: "verified-institution",
    category: "apex-institution",
    categoryLabel: "Apex Government Hospital",
    city: "Jaipur",
    state: "Rajasthan",
    affiliation: "Ministry of Ayush, Government of India",
    accreditation: "NAAC 'A' Grade Accredited, NABH Accredited Hospital",
    specialties: [
      "Dravyaguna (Herbal Pharmacology)",
      "Rasa Shastra (Iatrochemistry & Bhasma Standardization)",
      "Kaumarbhritya (Pediatrics)",
      "Shalakya Tantra (Ophthalmology & ENT)",
      "Swasthavritta (Preventive & Public Health)",
    ],
    description:
      "One of India's oldest and most renowned national institutes for clinical education, advanced healthcare delivery, and scientific standardization of classical Ayurvedic pharmacopeia. Houses a 300+ bed hospital with specialized OPDs.",
    officialUrl: "https://nia.nic.in",
    registrationDetails: "National Institute, Ministry of Ayush, Govt. of India",
  },
  {
    id: "itra-jamnagar",
    name: "Institute of Teaching and Research in Ayurveda (ITRA)",
    subtitle: "Institute of National Importance (INI) established by Act of Parliament",
    type: "verified-institution",
    category: "apex-institution",
    categoryLabel: "Apex Government Hospital",
    city: "Jamnagar",
    state: "Gujarat",
    affiliation: "Institute of National Importance (Ministry of Ayush)",
    accreditation: "WHO Collaborating Centre for Traditional Medicine",
    specialties: [
      "Basic Principles & Epistemology (Siddhanta)",
      "Rasa Shastra & Bhasma Quality Control",
      "Kayachikitsa (Metabolic & Autoimmune Disorders)",
      "Clinical Trials on NCDs",
    ],
    description:
      "Established under the ITRA Act 2020 by the Indian Parliament, ITRA Jamnagar is the only Ayurvedic institution accorded the status of 'Institute of National Importance'. It leads WHO collaborative clinical investigations and herbal safety monitoring.",
    officialUrl: "https://itra.edu.in",
    registrationDetails: "Created by Act of Parliament No. 16 of 2020",
  },
  {
    id: "ccras-headquarters",
    name: "Central Council for Research in Ayurvedic Sciences (CCRAS)",
    subtitle: "Apex Body for Formulation, Co-ordination & Development of Research",
    type: "verified-institution",
    category: "research-center",
    categoryLabel: "Research Center",
    city: "New Delhi",
    state: "Delhi",
    affiliation: "Ministry of Ayush, Government of India",
    accreditation: "Autonomous Scientific Research Council",
    specialties: [
      "Drug Standardization & Pharmacovigilance",
      "Preclinical Safety & In-vivo Toxicity Profiling",
      "Multicentric Randomized Controlled Trials",
      "Ethno-medicinal Field Surveys",
    ],
    description:
      "CCRAS coordinates 30 peripheral institutes across India executing drug standardization, preclinical toxicological profiling, safety verification of Bhasmas, and clinical validation of classical formulations according to GCP guidelines.",
    officialUrl: "https://ccras.nic.in",
    registrationDetails: "Societies Registration Act XXI of 1860; Ayush Apex Research Body",
  },
  {
    id: "ncism-registry-portal",
    name: "National Commission for Indian System of Medicine (NCISM)",
    subtitle: "Official Statutory Regulatory Body for Ayurveda Practitioners",
    type: "statutory-portal",
    category: "statutory-portal",
    categoryLabel: "Statutory Portal",
    city: "New Delhi",
    state: "National (All India)",
    affiliation: "Statutory Body under the NCISM Act 2020",
    accreditation: "Apex Medical Regulatory Authority",
    specialties: [
      "Central Register of Registered Medical Practitioners (Ayurveda)",
      "Accreditation of BAMS / MD Medical Colleges",
      "Professional Ethics & Code of Conduct Enforcement",
      "Verification of Practitioner License Numbers",
    ],
    description:
      "The official statutory regulatory authority established by the Parliament of India. To verify if any practitioner is legally registered as a legitimate BAMS, MD, or MS (Ayurveda) physician in India, consult the NCISM National Register directly.",
    officialUrl: "https://ncismindia.org",
    registrationDetails: "Statutory Regulatory Commission, Govt. of India",
  },
  {
    id: "sample-physician-1",
    name: "Dr. A. K. Sharma (Sample Record)",
    subtitle: "Illustrative Profile for System Demonstration",
    type: "sample-practitioner",
    category: "sample-profile",
    categoryLabel: "Sample Profile",
    city: "Bengaluru",
    state: "Karnataka",
    affiliation: "Affiliated Clinical Facility (Demonstration Sample)",
    accreditation: "Sample Registration: KA-AYU-00000-DEMO",
    specialties: [
      "Kayachikitsa (Adult Internal Medicine)",
      "Dietetics (Ahara Vihara Consultation)",
      "Digestive Health (Agni Assessment)",
    ],
    description:
      "[DEMONSTRATION SAMPLE ONLY] This profile illustrates how individual verified practitioner profiles will be formatted once integration with state council registries is active. In strict adherence to our anti-fabrication guidelines, this is NOT a real person or active booking service.",
    isSample: true,
  },
  {
    id: "sample-physician-2",
    name: "Dr. P. V. Menon (Sample Record)",
    subtitle: "Illustrative Profile for System Demonstration",
    type: "sample-practitioner",
    category: "sample-profile",
    categoryLabel: "Sample Profile",
    city: "Kochi",
    state: "Kerala",
    affiliation: "Integrative Wellness Clinic (Demonstration Sample)",
    accreditation: "Sample Registration: KL-AYU-00000-DEMO",
    specialties: [
      "Panchakarma (Detoxification Therapies)",
      "Musculoskeletal Joint Health (Sandhi Vata)",
      "Traditional Abhyanga Management",
    ],
    description:
      "[DEMONSTRATION SAMPLE ONLY] This profile illustrates how clinic affiliations and specialty credentials will be displayed upon verification. AyurVeda_Setu does not sell doctor appointments or fabricate medical reviews.",
    isSample: true,
  },
];

// ─── Main Page Component ─────────────────────────────────────────────────────

export default function ExpertsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<DirectoryCategory>("all");
  const [activeTab, setActiveTab] = useState<"directory" | "guide">("directory");

  const filteredEntries = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return DIRECTORY_ENTRIES.filter((entry) => {
      const matchesCategory =
        selectedCategory === "all" || entry.category === selectedCategory;
      const matchesQuery =
        !q ||
        entry.name.toLowerCase().includes(q) ||
        entry.city.toLowerCase().includes(q) ||
        entry.state.toLowerCase().includes(q) ||
        entry.specialties.some((s) => s.toLowerCase().includes(q)) ||
        entry.affiliation.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#F6F2E9]">
      {/* ── Page Header ─────────────────────────────────────────────────────── */}
      <div className="border-b border-[#E5D9C6] bg-[#FCFAF6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#173D32]/10 text-[#173D32] text-xs font-semibold uppercase tracking-wider">
            <BuildingLibraryIcon className="w-3.5 h-3.5 text-[#B96345]" />
            <span>Statutory Directory &middot; Accreditation Verification</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#173D32] font-semibold tracking-tight">
            Verified Expert Directory
          </h1>
          <p className="text-sm sm:text-base text-[#596157] leading-relaxed max-w-3xl">
            Finding qualified, legally registered Ayurvedic healthcare providers and apex
            government teaching hospitals. We provide verified statutory links and institutional
            directories — <strong>never fabricated doctor listings, fake reviews, or commercial kickbacks</strong>.
          </p>

          {/* Navigation tabs between Directory and Verification Guide */}
          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={() => setActiveTab("directory")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "directory"
                  ? "bg-[#173D32] text-[#F6F2E9] shadow-sm"
                  : "bg-[#F6F2E9] text-[#596157] border border-[#E5D9C6] hover:text-[#173D32]"
              }`}
            >
              Browse Apex Institutions &amp; Portals
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("guide")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "guide"
                  ? "bg-[#173D32] text-[#F6F2E9] shadow-sm"
                  : "bg-[#F6F2E9] text-[#596157] border border-[#E5D9C6] hover:text-[#173D32]"
              }`}
            >
              How to Verify Any Practitioner (Guide)
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 space-y-10">

        {/* ── Epistemic Verification Notice ─────────────────────────────────── */}
        <div
          className="rounded-2xl border p-5 flex items-start gap-4"
          style={{
            backgroundColor: "#FFF8F2",
            borderColor: "#E8C4AD",
          }}
          role="note"
          aria-label="Direct Verification Policy"
        >
          <ShieldAlertIcon className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#B96345]" />
          <div className="space-y-1 text-xs">
            <p className="font-semibold uppercase tracking-wider text-[#7A3920]">
              Anti-Fabrication &amp; Verification Notice
            </p>
            <p className="text-[#9A4F35] leading-relaxed">
              In accordance with medical ethics and evidence integrity standards, AyurVeda_Setu
              does <strong>not</strong> generate synthetic physician names, simulated star ratings,
              or unverified booking referrals. Below are official, government-chartered Apex
              Institutes under the Ministry of Ayush, verified research councils (CCRAS), and
              statutory national registry portals (NCISM). Two clearly marked demonstration records
              illustrate our schema for future credential API integration.
            </p>
          </div>
        </div>

        {activeTab === "guide" ? (
          /* ── Tab B: Verification Guide ────────────────────────────────────── */
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="rounded-2xl bg-[#FCFAF6] border border-[#E5D9C6] p-6 sm:p-8 space-y-6">
              <h2 className="font-serif text-2xl text-[#173D32] font-semibold">
                Four-Step Verification Checklist for Patients
              </h2>
              <p className="text-sm text-[#596157] leading-relaxed">
                Before consulting an Ayurvedic physician or purchasing specialized treatments,
                use this checklist to confirm they are legally licensed to practice medicine in India.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-xl bg-[#F6F2E9] border border-[#E5D9C6] p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#173D32]">
                    <span className="w-6 h-6 rounded-full bg-[#173D32] text-white flex items-center justify-center text-xs">1</span>
                    Confirm Recognized Medical Degree
                  </div>
                  <p className="text-xs text-[#596157] leading-relaxed">
                    Legitimate Ayurvedic doctors must hold at minimum a 5.5-year <strong>BAMS</strong> (Bachelor of
                    Ayurvedic Medicine and Surgery) or postgraduate <strong>MD/MS (Ayurveda)</strong> from a university
                    recognized by the NCISM. Be wary of unauthorized diplomas (e.g., &ldquo;RMP&rdquo;, certificate courses).
                  </p>
                </div>

                <div className="rounded-xl bg-[#F6F2E9] border border-[#E5D9C6] p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#173D32]">
                    <span className="w-6 h-6 rounded-full bg-[#173D32] text-white flex items-center justify-center text-xs">2</span>
                    Request Council Registration Number
                  </div>
                  <p className="text-xs text-[#596157] leading-relaxed">
                    Every licensed practitioner possesses a unique registration number issued by their State Ayurvedic
                    Board or the National Commission for Indian System of Medicine (NCISM). This number must be clearly
                    printed on their prescription letterhead and clinic signage.
                  </p>
                </div>

                <div className="rounded-xl bg-[#F6F2E9] border border-[#E5D9C6] p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#173D32]">
                    <span className="w-6 h-6 rounded-full bg-[#173D32] text-white flex items-center justify-center text-xs">3</span>
                    Cross-Check on the NCISM Central Register
                  </div>
                  <p className="text-xs text-[#596157] leading-relaxed">
                    Visit the official <a href="https://ncismindia.org" target="_blank" rel="noopener noreferrer" className="font-semibold underline text-[#173D32]">NCISM Portal</a> and
                    use the national registry search to look up the practitioner&apos;s name and state of registration to verify active license status.
                  </p>
                </div>

                <div className="rounded-xl bg-[#F6F2E9] border border-[#E5D9C6] p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#173D32]">
                    <span className="w-6 h-6 rounded-full bg-[#173D32] text-white flex items-center justify-center text-xs">4</span>
                    Check Clinical Facility Accreditation (NABH)
                  </div>
                  <p className="text-xs text-[#596157] leading-relaxed">
                    For inpatient therapy (especially Panchakarma procedures requiring clinical monitoring), look for
                    <strong> NABH (National Accreditation Board for Hospitals &amp; Healthcare Providers)</strong> Ayush accreditation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ── Tab A: Interactive Directory ─────────────────────────────────── */
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Search and Filters */}
            <div className="space-y-4">
              <div className="relative max-w-xl">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#596157]" />
                <input
                  id="expert-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by institution name, city, state, or specialty…"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#FCFAF6] border border-[#E5D9C6] text-sm text-[#242923] placeholder-[#8E9E86] focus:outline-none focus:ring-2 focus:ring-[#173D32] focus:border-transparent transition-all"
                  aria-label="Search directory"
                />
              </div>

              {/* Category Filter Buttons */}
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#596157] pt-1">
                <FilterIcon className="w-3.5 h-3.5" />
                Filter by Category
              </div>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Directory categories">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      selectedCategory === cat.key
                        ? "bg-[#173D32] text-[#F6F2E9] border-[#173D32] shadow-sm"
                        : "bg-[#FCFAF6] border-[#E5D9C6] text-[#596157] hover:border-[#C8BBA8]"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Results count */}
            <div className="text-xs text-[#596157]" aria-live="polite">
              Showing {filteredEntries.length} of {DIRECTORY_ENTRIES.length} entries
            </div>

            {/* Directory Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredEntries.map((entry) => (
                <div
                  key={entry.id}
                  className={`rounded-2xl border p-6 flex flex-col justify-between space-y-5 transition-all ${
                    entry.isSample
                      ? "bg-[#FCFAF6]/60 border-dashed border-[#C8BBA8]"
                      : "bg-[#FCFAF6] border-[#E5D9C6] hover:shadow-md hover:border-[#C8BBA8]"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                          entry.type === "verified-institution"
                            ? "bg-[#EAF5F0] text-[#1A5C44] border-[#A8D5C2]"
                            : entry.type === "statutory-portal"
                            ? "bg-[#EBF3F9] text-[#1E4A6B] border-[#C1D8E8]"
                            : "bg-[#FFF3E0] text-[#B45309] border-[#FCD34D]"
                        }`}
                      >
                        {entry.isSample ? "Sample Development Profile" : entry.categoryLabel}
                      </span>

                      <span className="text-[11px] text-[#596157] font-medium">
                        {entry.city}, {entry.state}
                      </span>
                    </div>

                    <div>
                      <h2 className="font-serif text-lg font-semibold text-[#173D32] leading-snug">
                        {entry.name}
                      </h2>
                      <p className="text-xs text-[#596157] mt-0.5">{entry.subtitle}</p>
                    </div>

                    <p className="text-xs text-[#242923] leading-relaxed">{entry.description}</p>

                    {/* Accreditations */}
                    <div className="rounded-lg bg-[#F6F2E9] p-3 text-[11px] space-y-1">
                      <div className="font-semibold text-[#173D32] flex items-center gap-1.5">
                        <CheckCircleIcon className="w-3.5 h-3.5 text-[#2D7A5F]" />
                        <span>Accreditation / Authority:</span>
                      </div>
                      <div className="text-[#596157] pl-5">{entry.accreditation}</div>
                    </div>

                    {/* Specialties */}
                    <div className="space-y-1.5">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-[#596157]">
                        Specialty Areas
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {entry.specialties.map((s, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-[#E5D9C6]/50 text-[#173D32] text-[10px] font-medium"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions / Links */}
                  <div className="pt-3 border-t border-[#E5D9C6] flex items-center justify-between">
                    <span className="text-[11px] text-[#596157]">
                      {entry.isSample ? "Status: Non-clinical sample" : "Status: Verified Statutory Entity"}
                    </span>
                    {entry.officialUrl ? (
                      <a
                        href={entry.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#173D32] hover:text-[#B96345] underline underline-offset-2 transition-colors"
                      >
                        <span>Official Website</span>
                        <ArrowRightIcon className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-xs text-[#8E9E86] italic">Sample Data Only</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {filteredEntries.length === 0 && (
              <div className="rounded-2xl bg-[#FCFAF6] border border-[#E5D9C6] p-12 text-center space-y-3">
                <UserCircleIcon className="w-10 h-10 text-[#E5D9C6] mx-auto" />
                <p className="font-serif text-lg text-[#173D32]">No matching entries found</p>
                <p className="text-sm text-[#596157]">Try searching for &quot;Delhi&quot;, &quot;Panchakarma&quot;, or &quot;AIIA&quot;</p>
              </div>
            )}
          </div>
        )}

        {/* ── Cross-link CTA ─────────────────────────────────────────────────── */}
        <div className="rounded-2xl bg-[#173D32] text-[#F6F2E9] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <SparklesIcon className="w-4 h-4 text-[#A8B7A0]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#A8B7A0]">
                Knowledge &amp; Verification
              </span>
            </div>
            <h2 className="font-serif text-xl font-semibold">Investigate Health Claims Before Treatment</h2>
            <p className="text-sm text-[#A8B7A0] leading-relaxed max-w-xl">
              Cross-examine any herbal prescription, heavy-metal formulation, or wellness claim
              against our peer-reviewed PubMed and classical Sanskrit database.
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

        {/* ── Statutory Disclaimer ──────────────────────────────────────────── */}
        <div className="p-4 rounded-xl bg-[#E5D9C6]/30 border border-[#E5D9C6] text-xs text-[#596157] text-center leading-relaxed">
          AyurVeda_Setu is an educational research and health literacy platform. It does not provide medical services,
          endorse individual practitioners, or replace direct clinical consultation. Always verify practitioner credentials
          directly via the National Commission for Indian System of Medicine (NCISM) or state licensing authorities.
        </div>
      </div>
    </div>
  );
}
