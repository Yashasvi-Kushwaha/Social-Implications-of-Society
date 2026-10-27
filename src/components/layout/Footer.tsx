import React from "react";
import Link from "next/link";
import { ShieldAlertIcon } from "@/components/ui/icons";

export function Footer() {
  return (
    <footer className="bg-[#173D32] text-[#F6F2E9] border-t border-[#235244] mt-24">
      {/* Statutory Educational & Medical Disclaimer Banner */}
      <div className="bg-[#0F2A22] border-b border-[#235244]/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="p-3 bg-[#B96345]/20 text-[#B96345] rounded-xl flex-shrink-0 border border-[#B96345]/40">
            <ShieldAlertIcon className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#E5D9C6]">
              Statutory Educational & Non-Diagnostic Medical Disclaimer
            </h4>
            <p className="text-xs text-[#A8B7A0] leading-relaxed max-w-5xl">
              <strong>AyurVeda_Setu (आयुर्वेद सेतु)</strong> is an open-access educational inquiry platform developed to bridge historical Ayurvedic treatises with contemporary biomedical trial evidence. The contents, doshic assessments, and automated literature syntheses are strictly for health literacy and do not constitute medical diagnosis, personalized dietary prescription, or curative treatment. Traditional concepts (*Vata, Pitta, Kapha, Agni*) represent ancient philosophical heuristics, not clinically validated genetic markers. Herbo-metallic preparations (*Bhasmas*) carry documented toxicity risks when unstandardized. Never delay seeking professional medical attention.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand & Purpose */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#F6F2E9] text-[#173D32] flex items-center justify-center font-serif text-base font-bold">
                अ
              </div>
              <span className="font-serif text-xl tracking-tight font-semibold text-[#F6F2E9]">
                AyurVeda_Setu
              </span>
            </div>
            <p className="text-xs text-[#A8B7A0] leading-relaxed">
              An ancient knowledge archive interpreted through a contemporary scientific lens. Countering viral wellness disinformation through source-grounded evidence.
            </p>
            <div className="pt-2 text-[11px] text-[#A8B7A0]/80">
              Zero synthetic studies &middot; Zero hallucinated citations &middot; Strict RAG Grounding
            </div>
          </div>

          {/* Platform Exploration */}
          <div className="space-y-3">
            <h5 className="font-serif text-sm tracking-wide text-[#E5D9C6] uppercase">
              Platform Modules
            </h5>
            <ul className="space-y-2 text-xs text-[#A8B7A0]">
              <li>
                <Link href="/explore" className="hover:text-[#F6F2E9] transition-colors">
                  Ayurveda Meets Modern Science
                </Link>
              </li>
              <li>
                <Link href="/investigate" className="hover:text-[#F6F2E9] transition-colors">
                  Claim Investigator (Gemma 4 Grounded)
                </Link>
              </li>
              <li>
                <Link href="/constitution" className="hover:text-[#F6F2E9] transition-colors">
                  Prakriti Constitution Explorer
                </Link>
              </li>
              <li>
                <Link href="/learn" className="hover:text-[#F6F2E9] transition-colors">
                  Learning Library & Misinformation Literacy
                </Link>
              </li>
              <li>
                <Link href="/experts" className="hover:text-[#F6F2E9] transition-colors">
                  Statutory Apex Institutes Directory
                </Link>
              </li>
            </ul>
          </div>

          {/* Statutory Verification Portals */}
          <div className="space-y-3">
            <h5 className="font-serif text-sm tracking-wide text-[#E5D9C6] uppercase">
              Official Indian Authorities
            </h5>
            <ul className="space-y-2 text-xs text-[#A8B7A0]">
              <li>
                <a
                  href="https://ncismindia.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F6F2E9] transition-colors flex items-center gap-1.5"
                >
                  <span>NCISM Practitioner Registry</span>
                  <span className="text-[10px] text-[#A8B7A0]/60">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://ayush.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F6F2E9] transition-colors flex items-center gap-1.5"
                >
                  <span>Ministry of Ayush, Govt. of India</span>
                  <span className="text-[10px] text-[#A8B7A0]/60">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://ccras.nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F6F2E9] transition-colors flex items-center gap-1.5"
                >
                  <span>CCRAS Research Council</span>
                  <span className="text-[10px] text-[#A8B7A0]/60">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://aiia.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F6F2E9] transition-colors flex items-center gap-1.5"
                >
                  <span>All India Institute of Ayurveda (AIIA)</span>
                  <span className="text-[10px] text-[#A8B7A0]/60">↗</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Scientific Evidence Standards */}
          <div className="space-y-3">
            <h5 className="font-serif text-sm tracking-wide text-[#E5D9C6] uppercase">
              Biomedical Databases
            </h5>
            <ul className="space-y-2 text-xs text-[#A8B7A0]">
              <li>
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F6F2E9] transition-colors flex items-center gap-1.5"
                >
                  <span>PubMed / NCBI Literature</span>
                  <span className="text-[10px] text-[#A8B7A0]/60">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.cochranelibrary.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F6F2E9] transition-colors flex items-center gap-1.5"
                >
                  <span>Cochrane Systematic Reviews</span>
                  <span className="text-[10px] text-[#A8B7A0]/60">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://ctri.nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F6F2E9] transition-colors flex items-center gap-1.5"
                >
                  <span>Clinical Trials Registry - India (CTRI)</span>
                  <span className="text-[10px] text-[#A8B7A0]/60">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Integrity Standard */}
        <div className="mt-14 pt-8 border-t border-[#235244] flex flex-col sm:flex-row items-center justify-between text-xs text-[#A8B7A0] gap-4">
          <p>
            &copy; 2026 AyurVeda_Setu. Built for academic, scientific, and educational health literacy.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#0F2A22] border border-[#235244] text-[#E5D9C6]">
              Evidence-Grounded Knowledge Architecture
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
