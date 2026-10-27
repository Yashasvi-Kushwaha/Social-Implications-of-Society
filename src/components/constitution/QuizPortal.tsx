"use client";

import React, { useState } from "react";
import { DoshaQuizModal, DoshaQuizFloatingButton } from "./DoshaQuizModal";

export function QuizPortal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DoshaQuizFloatingButton onClick={() => setOpen(true)} />
      <DoshaQuizModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
