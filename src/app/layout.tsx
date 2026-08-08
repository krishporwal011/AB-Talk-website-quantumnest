import type { Metadata } from "next";
import "./globals.css";
import { ChallengeProvider } from "@/context/ChallengeContext";
import BackgroundEffect from "@/components/shared/BackgroundEffect";
import Navbar from "@/components/shared/Navbar";
import BottomNav from "@/components/shared/BottomNav";
import CommandPalette from "@/components/shared/CommandPalette";
import CustomCursor from "@/components/motion/CustomCursor";
import ScrollProgress from "@/components/motion/ScrollProgress";

export const metadata: Metadata = {
  title: "ABTalks 60-Day Challenge — Build Consistency. Get Noticed.",
  description: "A futuristic coding challenge platform. Push daily commits, publish daily learnings, build a verified portfolio, and trigger recruitment opportunities.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full">
      <body className="min-h-[100dvh] flex flex-col bg-bg-darker text-slate-100 font-sans selection:bg-primary-indigo/40 selection:text-white pb-28 md:pb-8 overflow-x-hidden">
        <ChallengeProvider>
          {/* Desktop Magnetic Custom Cursor */}
          <CustomCursor />

          {/* Minimal Floating Scroll Depth Indicator */}
          <ScrollProgress />

          {/* Atmospheric Lighting & Particle Background */}
          <BackgroundEffect />
          
          {/* Command Palette Launcher (Cmd+K) */}
          <CommandPalette />

          {/* Main Navigation Header */}
          <Navbar />
          
          <main className="flex-1 w-full max-w-5xl mx-auto px-4 md:px-6 relative z-10 box-border min-w-0">
            {children}
          </main>
          
          {/* Mobile Bottom Navigation */}
          <BottomNav />
        </ChallengeProvider>
      </body>
    </html>
  );
}
