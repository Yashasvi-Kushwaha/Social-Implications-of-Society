"use client";

import React, { useState } from "react";
import {
  SearchIcon,
  ShieldAlertIcon,
  SparklesIcon,
} from "@/components/ui/icons";
import { InvestigationApiResponse } from "@/app/api/investigate/route";

const SAMPLE_QUERIES = [
  {
    label: "Turmeric + Piperine",
    query: "Does curcumin with piperine reduce knee osteoarthritis inflammation?",
    type: "supported",
  },
  {
    label: "Ashwagandha Cortisol",
    query: "Ashwagandha root extract reduces morning serum cortisol and stress",
    type: "supported",
  },
  {
    label: "Bhasma Heavy Metal Risk",
    query: "Do unregulated commercial Bhasmas carry a risk of lead poisoning?",
    type: "supported",
  },
  {
    label: "Unindexed: Papaya Dengue",
    query: "Boiled papaya seed extract cures dengue fever in 24 hours",
    type: "unindexed",
  },
  {
    label: "Misplaced: Ashwagandha Diabetes",
    query: "Can Ashwagandha cure type 1 diabetes completely?",
    type: "unsupported",
  },
];

export default function InvestigatePage() {
  const [claimInput, setClaimInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<InvestigationApiResponse | null>(null);

  const handleSubmit = async (queryToSubmit?: string) => {
    const claim = (queryToSubmit || claimInput).trim();
    if (!claim) {
      setError("Please enter a health claim statement to investigate.");
      return;
    }

    if (claim.length < 3) {
      setError("Claim query must be at least 3 characters long.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/investigate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ claim }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.error || `Server responded with status ${response.status}`
        );
      }

      const data: InvestigationApiResponse = await response.json();
      setResult(data);
    } catch (err: unknown) {
      const errorObj = err as Error;
      console.error("Investigation error:", errorObj);
      setError(
        errorObj?.message || "Failed to communicate with the Claim Investigator service."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSample = (query: string) => {
    setClaimInput(query);
    handleSubmit(query);
  };

  return (
    <div className="min-h-screen bg-[#F6F2E9] py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Breadcrumb & Title */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#173D32]/10 text-[#173D32] text-xs font-semibold uppercase tracking-wider">
            <SparklesIcon className="w-3.5 h-3.5 text-[#B96345]" />
            <span>Claim Investigator &middot; Gemma 4 Bounded AI</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#173D32] font-semibold tracking-tight">
            Verify a Wellness Claim
          </h1>

          <p className="text-sm sm:text-base text-[#596157] leading-relaxed">
            Submit a viral health assertion or traditional remedy claim. Our system cross-references peer-reviewed biomedical trials and canonical Sanskrit literature, with Gemma 4 providing source-grounded synthesis. Citations are strictly locked to verified records.
          </p>
        </div>

        {/* Claim Input Card */}
        <div className="rounded-2xl bg-[#FCFAF6] border border-[#E5D9C6] p-6 sm:p-8 shadow-sm space-y-5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <label
                htmlFor="claim-input"
                className="block text-xs font-semibold uppercase tracking-wider text-[#173D32]"
              >
                Enter Health Claim Statement
              </label>
              <div className="relative">
                <textarea
                  id="claim-input"
                  rows={3}
                  value={claimInput}
                  onChange={(e) => setClaimInput(e.target.value)}
                  placeholder="e.g. Does curcumin with piperine reduce joint inflammation in knee osteoarthritis?"
                  className="w-full px-4 py-3 rounded-xl bg-[#F6F2E9] border border-[#E5D9C6] text-[#242923] placeholder-[#8E9E86] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#173D32] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Quick Demo Preset Pills */}
            <div className="space-y-2 pt-1">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#596157]">
                Quick Test Benchmarks:
              </div>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_QUERIES.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectSample(s.query)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-[#E5D9C6]/50 hover:bg-[#E5D9C6] text-[#173D32] border border-[#E5D9C6] font-medium transition-colors"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-[#E5D9C6]">
              <span className="text-[11px] text-[#596157]">
                Strict retrieval guard: Unindexed claims return Insufficient Evidence.
              </span>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#B96345] hover:bg-[#9A4F35] text-white font-semibold text-sm tracking-wide transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Synthesizing Evidence...</span>
                  </>
                ) : (
                  <>
                    <SearchIcon className="w-4 h-4" />
                    <span>Investigate Claim</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className="rounded-xl bg-[#FEE2E2] border border-[#FECACA] p-4 text-[#991B1B] text-sm flex items-start gap-3">
            <ShieldAlertIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong>Evaluation Notice:</strong>
              <p className="text-xs">{error}</p>
            </div>
          </div>
        )}

        {/* Loading Skeleton */}
        {loading && (
          <div className="rounded-2xl bg-[#FCFAF6] border border-[#E5D9C6] p-8 space-y-6 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="h-4 bg-[#E5D9C6] rounded w-1/4" />
              <div className="h-4 bg-[#E5D9C6] rounded w-1/6" />
            </div>
            <div className="h-6 bg-[#E5D9C6] rounded w-3/4" />
            <div className="space-y-3 pt-4">
              <div className="h-3 bg-[#E5D9C6] rounded w-full" />
              <div className="h-3 bg-[#E5D9C6] rounded w-5/6" />
              <div className="h-3 bg-[#E5D9C6] rounded w-4/6" />
            </div>
            <div className="pt-4 border-t border-[#E5D9C6] flex justify-between">
              <div className="h-3 bg-[#E5D9C6] rounded w-1/3" />
              <div className="h-3 bg-[#E5D9C6] rounded w-1/4" />
            </div>
          </div>
        )}

        {/* Structured Results Display */}
        {result && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Status & Verdict Header Card */}
            <div className="rounded-2xl bg-[#FCFAF6] border border-[#E5D9C6] p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5D9C6] pb-5">
                <div className="space-y-1">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#596157]">
                    INVESTIGATION OUTCOME
                  </div>
                  <h2 className="font-serif text-2xl font-semibold text-[#173D32]">
                    {result.claim}
                  </h2>
                </div>

                {/* Status Badges */}
                <div className="flex items-center gap-2">
                  {result.statusCode === "SUPPORTED_MATCH" && (
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E8F5E9] text-[#1E4620] border border-[#C8E6C9]">
                      Curated Match Found
                    </span>
                  )}
                  {result.statusCode === "INSUFFICIENT_CURATED_EVIDENCE" && (
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FFF3E0] text-[#B45309] border border-[#FFE0B2]">
                      Insufficient Curated Evidence
                    </span>
                  )}
                  {result.statusCode === "TOPIC_MENTIONED_CLAIM_UNSUPPORTED" && (
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA]">
                      Topic Known &bull; Assertion Unsupported
                    </span>
                  )}
                  {result.statusCode === "AMBIGUOUS_QUERY" && (
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#EBF3F5] text-[#164E63] border border-[#CFE2E8]">
                      Ambiguous Query
                    </span>
                  )}
                </div>
              </div>

              {/* Relevance Rationale */}
              <div className="p-4 rounded-xl bg-[#F6F2E9] border border-[#E5D9C6] text-xs sm:text-sm text-[#242923] leading-relaxed">
                <strong>Epistemic Assessment:</strong> {result.relevanceRationale}
              </div>

              {/* Provenance Banner */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#596157] pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#173D32]" />
                  <span>Synthesized via: <strong>{result.modelUsed}</strong></span>
                </div>
                <div>
                  Grounding Confidence: <strong>{(result.confidenceScore * 100).toFixed(0)}%</strong>
                </div>
              </div>

              {result.apiNotice && (
                <div className="text-[11px] px-3 py-1.5 rounded-lg bg-[#FAF0EC] text-[#9A4F35] border border-[#E5D9C6]">
                  {result.apiNotice}
                </div>
              )}
            </div>

            {/* Gemma 4 Synthesized Analysis (When Supported) */}
            {result.analysisText && (
              <div className="rounded-2xl bg-[#FCFAF6] border border-[#E5D9C6] p-6 sm:p-8 space-y-5">
                <div className="border-b border-[#E5D9C6] pb-3 flex items-center justify-between">
                  <h3 className="font-serif text-xl font-semibold text-[#173D32] flex items-center gap-2">
                    <SparklesIcon className="w-5 h-5 text-[#B96345]" />
                    <span>Gemma 4 Structured Analysis</span>
                  </h3>
                  <span className="text-[11px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#A8B7A0]/20 text-[#173D32] font-semibold">
                    Strict In-Context Grounding
                  </span>
                </div>

                <div className="prose prose-sm max-w-none text-xs sm:text-sm text-[#242923] leading-relaxed whitespace-pre-line space-y-4 font-sans">
                  {result.analysisText}
                </div>
              </div>
            )}

            {/* Dual Comparative Details (Traditional vs Scientific) */}
            {result.traditionalContext && result.scientificEvidence && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Traditional Pane */}
                <div className="rounded-2xl bg-[#FCFAF6] border border-[#E5D9C6] p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#173D32]">
                      Classical Sanskrit Literature
                    </span>
                    <span className="text-xs italic font-serif text-[#596157]">
                      {result.traditionalContext.primaryTreatise}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex flex-wrap gap-1.5">
                      {result.traditionalContext.classicalConcepts.map((c, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-[#A8B7A0]/20 text-[#173D32] text-[11px] font-medium"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                    <p className="text-[#242923] leading-relaxed pt-2">
                      {result.traditionalContext.traditionalIndications}
                    </p>
                  </div>
                </div>

                {/* Biomedical Pane */}
                <div className="rounded-2xl bg-[#FCFAF6] border border-[#CFE2E8] p-6 space-y-4 bg-gradient-to-br from-[#FCFAF6] to-[#EBF3F5]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#164E63]">
                      Biomedical Trial Evidence
                    </span>
                    <span className="text-xs font-mono text-[#164E63] font-semibold">
                      {result.scientificEvidence.evidenceTier.toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <p className="text-[#242923] leading-relaxed">
                      {result.scientificEvidence.biomedicalSummary}
                    </p>
                    <div className="pt-2 text-[11px] text-[#596157]">
                      <strong>Target Pathways:</strong>{" "}
                      {result.scientificEvidence.targetPathways.join(", ")}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Critical Safety & Contraindications Alerts */}
            {result.safetyWarnings && result.safetyWarnings.length > 0 && (
              <div className="rounded-2xl bg-[#FAF0EC] border border-[#B96345]/30 p-6 space-y-3">
                <div className="flex items-center gap-2 text-[#B96345] font-semibold text-sm">
                  <ShieldAlertIcon className="w-5 h-5 flex-shrink-0" />
                  <span>Critical Safety Considerations &amp; Contraindications</span>
                </div>
                <ul className="space-y-1.5 text-xs text-[#9A4F35] list-disc list-inside">
                  {result.safetyWarnings.map((warning, i) => (
                    <li key={i}>{warning}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Verified Primary Sources Section */}
            {result.verifiedSources && result.verifiedSources.length > 0 && (
              <div className="rounded-2xl bg-[#FCFAF6] border border-[#E5D9C6] p-6 sm:p-8 space-y-5">
                <div className="border-b border-[#E5D9C6] pb-3 flex items-center justify-between">
                  <h3 className="font-serif text-lg font-semibold text-[#173D32]">
                    Verified Primary Literature Citations
                  </h3>
                  <span className="text-xs text-[#596157]">
                    {result.verifiedSources.length} Curated Source(s)
                  </span>
                </div>

                <div className="space-y-4">
                  {result.verifiedSources.map((source) => (
                    <div
                      key={source.id}
                      className="p-4 rounded-xl bg-[#F6F2E9] border border-[#E5D9C6] space-y-2"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4 className="text-xs sm:text-sm font-semibold text-[#173D32]">
                          {source.title}
                        </h4>
                        {source.identifier && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#173D32] text-white">
                            {source.identifier}
                          </span>
                        )}
                      </div>

                      <div className="text-[11px] text-[#596157]">
                        {source.authorsOrOrganization} &middot;{" "}
                        {source.publicationDate || "Archival"} &middot;{" "}
                        <span className="uppercase">{source.sourceType}</span>
                      </div>

                      <p className="text-xs text-[#242923] leading-relaxed">
                        <strong>Key Findings:</strong> {source.keyFindings}
                      </p>

                      <div className="text-[11px] text-[#B96345]">
                        <strong>Limitations:</strong> {source.limitations}
                      </div>

                      <div className="pt-2">
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#173D32] hover:text-[#B96345] transition-colors"
                        >
                          <span>View on NCBI / Primary Database</span>
                          <span className="text-[10px]">↗</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Non-Diagnostic Reminder */}
        <div className="p-4 rounded-xl bg-[#E5D9C6]/30 border border-[#E5D9C6] text-xs text-[#596157] text-center">
          AyurVeda_Setu is an educational platform. Automated literature synthesis is for research and health literacy only; it does not constitute clinical diagnosis or personalized medical advice.
        </div>
      </div>
    </div>
  );
}
