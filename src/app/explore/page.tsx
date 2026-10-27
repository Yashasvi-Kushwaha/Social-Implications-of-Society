"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { CURATED_EVIDENCE_DATASET } from "@/lib/knowledge/dataset";
import { EvidenceRecord, EvidenceTier } from "@/lib/knowledge/types";
import {
  ScaleIcon,
  SearchIcon,
  FilterIcon,
  CheckCircleIcon,
  ShieldAlertIcon,
  SparklesIcon,
  ArrowRightIcon,
} from "@/components/ui/icons";

const TIER_LABELS: Record<EvidenceTier, { label: string; bg: string; text: string; border: string }> = {
  strong_clinical: {
    label: "Strong Clinical Evidence",
    bg: "#EAF5F0",
    text: "#1A5C44",
    border: "#A8D5C2",
  },
  preliminary_clinical: {
    label: "Preliminary Human Clinical",
    bg: "#EBF3F9",
    text: "#1E4A6B",
    border: "#C1D8E8",
  },
  preclinical_only: {
    label: "In Vitro / Animal Only",
    bg: "#FFF3E0",
    text: "#B45309",
    border: "#FCD34D",
  },
  toxicological_risk: {
    label: "Toxicological Advisory",
    bg: "#FEE2E2",
    text: "#991B1B",
    border: "#FCA5A5",
  },
  inconclusive: {
    label: "Inconclusive Evidence",
    bg: "#F3F4F6",
    text: "#4B5563",
    border: "#D1D5DB",
  },
  traditional_context: {
    label: "Traditional Context Only",
    bg: "#FAF0EC",
    text: "#7A3920",
    border: "#E8C4AD",
  },
};

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTier, setSelectedTier] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredRecords = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return CURATED_EVIDENCE_DATASET.filter((record) => {
      const matchesTier =
        selectedTier === "all" || record.scientificEvidence.evidenceTier === selectedTier;
      const matchesQuery =
        !q ||
        record.topic.toLowerCase().includes(q) ||
        record.canonicalClaim.toLowerCase().includes(q) ||
        record.entityAliases.some((alias) => alias.toLowerCase().includes(q)) ||
        record.targetOutcomes.some((outcome) => outcome.toLowerCase().includes(q));
      return matchesTier && matchesQuery;
    });
  }, [searchQuery, selectedTier]);

  return (
    <div className="min-h-screen bg-[#F6F2E9]">
      {/* ── Page Header ─────────────────────────────────────────────────────── */}
      <div className="border-b border-[#E5D9C6] bg-[#FCFAF6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#173D32]/10 text-[#173D32] text-xs font-semibold uppercase tracking-wider">
            <ScaleIcon className="w-3.5 h-3.5 text-[#B96345]" />
            <span>Curated Archive &middot; Traceable Monographs</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#173D32] font-semibold tracking-tight">
            Explore Ayurveda Meets Science
          </h1>
          <p className="text-sm sm:text-base text-[#596157] leading-relaxed max-w-3xl">
            A side-by-side comparative encyclopedia matching classical Sanskrit treatises (Charaka,
            Sushruta, Ashtanga Hridayam) with peer-reviewed PubMed clinical trials, bioavailability
            analyses, and toxicological advisories.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 space-y-8">
        {/* ── Search & Filters ──────────────────────────────────────────────── */}
        <div className="space-y-4">
          <div className="relative max-w-xl">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#596157]" />
            <input
              id="explore-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by botanical name (Ashwagandha, Haridra), compound, or condition…"
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#FCFAF6] border border-[#E5D9C6] text-sm text-[#242923] placeholder-[#8E9E86] focus:outline-none focus:ring-2 focus:ring-[#173D32] focus:border-transparent transition-all"
              aria-label="Search curated monographs"
            />
          </div>

          {/* Tier Filters */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#596157]">
              <FilterIcon className="w-3.5 h-3.5" />
              Filter by Evidence Tier
            </div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Evidence tiers">
              <button
                type="button"
                onClick={() => setSelectedTier("all")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  selectedTier === "all"
                    ? "bg-[#173D32] text-[#F6F2E9] border-[#173D32] shadow-sm"
                    : "bg-[#FCFAF6] border-[#E5D9C6] text-[#596157] hover:border-[#C8BBA8]"
                }`}
              >
                All Tiers ({CURATED_EVIDENCE_DATASET.length})
              </button>
              {(Object.keys(TIER_LABELS) as EvidenceTier[]).map((tierKey) => {
                const count = CURATED_EVIDENCE_DATASET.filter(
                  (r) => r.scientificEvidence.evidenceTier === tierKey
                ).length;
                if (count === 0) return null;
                const style = TIER_LABELS[tierKey];
                return (
                  <button
                    key={tierKey}
                    type="button"
                    onClick={() => setSelectedTier(tierKey)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      selectedTier === tierKey
                        ? "shadow-sm border-current"
                        : "bg-[#FCFAF6] border-[#E5D9C6] text-[#596157] hover:border-[#C8BBA8]"
                    }`}
                    style={
                      selectedTier === tierKey
                        ? { backgroundColor: style.bg, color: style.text }
                        : {}
                    }
                  >
                    {style.label} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="text-xs text-[#596157]" aria-live="polite">
          Showing {filteredRecords.length} of {CURATED_EVIDENCE_DATASET.length} verified monographs
        </div>

        {/* ── Monograph Cards ───────────────────────────────────────────────── */}
        <div className="space-y-6">
          {filteredRecords.map((record: EvidenceRecord) => {
            const tierStyle = TIER_LABELS[record.scientificEvidence.evidenceTier];
            const isExpanded = expandedId === record.id;

            return (
              <div
                key={record.id}
                className="rounded-2xl bg-[#FCFAF6] border border-[#E5D9C6] p-6 sm:p-8 space-y-6 transition-all hover:border-[#C8BBA8]"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1.5 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border"
                        style={{
                          backgroundColor: tierStyle.bg,
                          color: tierStyle.text,
                          borderColor: tierStyle.border,
                        }}
                      >
                        {tierStyle.label}
                      </span>
                      <span className="text-[11px] text-[#596157]">
                        {record.sources.length} Verified Citations
                      </span>
                    </div>
                    <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#173D32]">
                      {record.topic}
                    </h2>
                    <p className="text-sm text-[#596157] italic">
                      &ldquo;{record.canonicalClaim}&rdquo;
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : record.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#173D32] text-white hover:bg-[#235244] transition-colors self-start shrink-0"
                    aria-expanded={isExpanded}
                  >
                    <span>{isExpanded ? "Collapse Dossier" : "View Full Dossier"}</span>
                    <ArrowRightIcon
                      className={`w-3.5 h-3.5 transition-transform ${
                        isExpanded ? "-rotate-90" : "rotate-90"
                      }`}
                    />
                  </button>
                </div>

                {/* Side-by-side Dual Framework */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
                  {/* Classical Ayurvedic Context */}
                  <div className="rounded-xl bg-[#FAF0EC] border border-[#E8C4AD] p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7A3920]">
                      <span className="w-2 h-2 rounded-full bg-[#B96345]" />
                      Classical Ayurvedic Context
                    </div>
                    <div className="text-xs font-medium text-[#173D32]">
                      {record.traditionalContext.primaryTreatise}
                    </div>
                    <p className="text-xs text-[#242923] leading-relaxed">
                      {record.traditionalContext.traditionalIndications}
                    </p>
                    {record.traditionalContext.traditionalPreparationMethod && (
                      <div className="text-[11px] text-[#7A3920] border-t border-[#E8C4AD]/60 pt-2">
                        <strong>Preparation:</strong>{" "}
                        {record.traditionalContext.traditionalPreparationMethod}
                      </div>
                    )}
                  </div>

                  {/* Modern Scientific Evidence */}
                  <div className="rounded-xl bg-[#EAF5F0] border border-[#A8D5C2] p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1A5C44]">
                      <span className="w-2 h-2 rounded-full bg-[#2D7A5F]" />
                      Biomedical Trial Evidence
                    </div>
                    <p className="text-xs text-[#242923] leading-relaxed">
                      {record.scientificEvidence.biomedicalSummary}
                    </p>
                    {record.scientificEvidence.bioavailabilityConsiderations && (
                      <div className="text-[11px] text-[#1A5C44] border-t border-[#A8D5C2]/60 pt-2">
                        <strong>Bioavailability:</strong>{" "}
                        {record.scientificEvidence.bioavailabilityConsiderations}
                      </div>
                    )}
                  </div>
                </div>

                {/* Expanded Dossier Section */}
                {isExpanded && (
                  <div className="space-y-6 pt-4 border-t border-[#E5D9C6] animate-in fade-in duration-200">
                    {/* Safety and Rejection Triggers */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="rounded-xl bg-[#FFF8F2] border border-[#E8C4AD] p-5 space-y-2.5">
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7A3920]">
                          <ShieldAlertIcon className="w-4 h-4 text-[#B96345]" />
                          Contraindications &amp; Drug Interactions
                        </div>
                        <ul className="space-y-1.5 text-xs text-[#9A4F35]">
                          {record.scientificEvidence.contraindicationsAndSafety.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span>&bull;</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {record.rejectionTriggers && record.rejectionTriggers.length > 0 && (
                        <div className="rounded-xl bg-[#FEE2E2]/60 border border-[#FCA5A5] p-5 space-y-2.5">
                          <div className="text-xs font-semibold uppercase tracking-wider text-[#991B1B]">
                            Unsupported Overclaims (Debunked)
                          </div>
                          <ul className="space-y-1.5 text-xs text-[#991B1B]">
                            {record.rejectionTriggers.map((trigger, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span>&times;</span>
                                <span>{trigger}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Primary Citations */}
                    <div className="space-y-3">
                      <h3 className="font-serif text-base font-semibold text-[#173D32] flex items-center gap-2">
                        <CheckCircleIcon className="w-4 h-4 text-[#2D7A5F]" />
                        Traceable Primary Sources ({record.sources.length})
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {record.sources.map((source) => (
                          <div
                            key={source.id}
                            className="rounded-xl bg-[#F6F2E9] border border-[#E5D9C6] p-4 text-xs space-y-2"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className="font-semibold text-[#173D32]">{source.title}</span>
                              {source.identifier && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#173D32]/10 text-[#173D32] font-mono shrink-0">
                                  {source.identifier}
                                </span>
                              )}
                            </div>
                            <p className="text-[#596157] text-[11px]">
                              {source.authorsOrOrganization} &middot; {source.publicationDate}
                            </p>
                            <p className="text-[#242923] text-[11px] leading-relaxed">
                              <strong>Key Finding:</strong> {source.keyFindings}
                            </p>
                            <div className="pt-1">
                              <a
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#173D32] hover:text-[#B96345] underline font-semibold text-[11px]"
                              >
                                View PubMed / Canonical Source &rarr;
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Cross-link CTA ─────────────────────────────────────────────────── */}
        <div className="rounded-2xl bg-[#173D32] text-[#F6F2E9] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <SparklesIcon className="w-4 h-4 text-[#A8B7A0]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#A8B7A0]">
                Interactive Claim Verification
              </span>
            </div>
            <h2 className="font-serif text-xl font-semibold">Test Any Health Claim with Gemma 4</h2>
            <p className="text-sm text-[#A8B7A0] leading-relaxed max-w-xl">
              Our Claim Investigator matches user-submitted wellness claims against this verified
              evidence database and generates hallucination-free evaluations.
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
      </div>
    </div>
  );
}
