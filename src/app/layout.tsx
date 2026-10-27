import type { Metadata } from "next";
import { Cinzel, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { QuizPortal } from "@/components/constitution/QuizPortal";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AyurVeda_Setu (आयुर्वेद सेतु) | Bridging Ancient Ayurveda & Biomedical Science",
  description:
    "An open-access educational platform connecting classical Ayurvedic health frameworks with peer-reviewed biomedical research, debunking viral wellness misinformation through source-grounded scientific inquiry.",
  keywords: [
    "Ayurveda",
    "Evidence-based Ayurveda",
    "AyurVeda Setu",
    "Biomedical Research",
    "Wellness Claim Investigator",
    "Gemma 4 AI",
    "Prakriti Questionnaire",
    "Ministry of Ayush",
    "NCISM Registry",
    "Charaka Samhita",
    "PubMed Ayurveda",
  ],
  authors: [{ name: "AyurVeda_Setu Research Collective" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F6F2E9] text-[#242923] selection:bg-[#B96345]/20 selection:text-[#173D32]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <QuizPortal />
      </body>
    </html>
  );
}
