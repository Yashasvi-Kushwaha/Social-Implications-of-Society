"use client";

import React, { useEffect, useCallback } from "react";
import { SparklesIcon, CloseIcon } from "@/components/ui/icons";
import { DoshaQuiz } from "./DoshaQuiz";

// --- Modal ---

interface DoshaQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DoshaQuizModal({ isOpen, onClose }: DoshaQuizModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKey);
    }
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, handleKey]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Dosha Discovery Quiz"
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6"
    >
      <div
        className="absolute inset-0 bg-[#0E2118]/70 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />

      <div
        className="relative z-10 w-full max-w-2xl max-h-[90vh] rounded-2xl bg-[#FCFAF6] shadow-2xl border border-[#E5D9C6] flex flex-col"
        style={{ animation: "quizModalIn 0.28s cubic-bezier(0.22,1,0.36,1) both" }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5D9C6] bg-[#F6F2E9] rounded-t-2xl shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#B96345] flex items-center justify-center">
              <SparklesIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#B96345]">
                Educational Discovery
              </p>
              <h2 className="font-serif text-base font-semibold text-[#173D32] leading-tight">
                Discover Your Possible Dosha Pattern
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close quiz"
            className="p-2 rounded-xl text-[#596157] hover:text-[#173D32] hover:bg-[#E5D9C6]/60 transition-colors focus:outline-none"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          <DoshaQuiz />
        </div>

        <div className="px-6 py-3 border-t border-[#E5D9C6] bg-[#F6F2E9] rounded-b-2xl shrink-0">
          <p className="text-[10px] text-[#596157] text-center">
            For educational reference only. Not a clinical diagnosis or medical assessment.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes quizModalIn {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
      `}</style>
    </div>
  );
}

// --- Floating Button ---

interface DoshaQuizFloatingButtonProps {
  onClick: () => void;
}

export function DoshaQuizFloatingButton({ onClick }: DoshaQuizFloatingButtonProps) {
  return (
    <button
      id="dosha-quiz-floating-btn"
      type="button"
      onClick={onClick}
      aria-label="Open Dosha Discovery Quiz"
      className="fixed bottom-6 right-6 z-[998] flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-[#B96345] text-white shadow-lg hover:shadow-xl hover:bg-[#9A4F35] transition-all duration-200 focus:outline-none group"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-[#B96345]/30"
        style={{ animation: "quizPulse 2.2s cubic-bezier(0.4,0,0.6,1) infinite" }}
      />
      <SparklesIcon className="w-4 h-4 text-white shrink-0 relative z-10" />
      <span className="text-sm font-semibold tracking-wide relative z-10 whitespace-nowrap">
        Take Dosha Quiz
      </span>
      <style>{`
        @keyframes quizPulse {
          0%, 100% { transform: scale(1);   opacity: 0.55; }
          50%       { transform: scale(1.22); opacity: 0; }
        }
      `}</style>
    </button>
  );
}
