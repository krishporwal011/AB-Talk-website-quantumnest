'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Flame, 
  GitCommit, 
  Linkedin, 
  Code, 
  Sparkles, 
  Trophy, 
  ChevronDown, 
  Github, 
  Layers,
  Award,
  Users,
  Terminal,
  ShieldCheck,
  Globe,
  Send,
  CheckCircle2
} from 'lucide-react';
import MagneticButton from '@/components/motion/MagneticButton';
import { StickyStory, ParallaxCard } from '@/components/motion/StickyStory';

interface CounterProps {
  value: string;
  suffix?: string;
  duration?: number;
}

function Counter({ value, suffix = '', duration = 2 }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value.replace(/[^0-9]/g, ''));
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.min(Math.floor(totalMiliseconds / end), 50);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / 35);
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

export default function LandingPage() {
  const router = useRouter();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeDeckIndex, setActiveDeckIndex] = useState(0);
  const [deckViewMode, setDeckViewMode] = useState<'stack' | 'grid'>('stack');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Hero sequential phrase scroll control
  const { scrollY } = useScroll();
  const heroIndex = useTransform(scrollY, [0, 150, 300, 450], [0, 1, 2, 3]);
  const heroOpacity = useTransform(scrollY, [0, 500, 650], [1, 1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.95]);

  const [activeHeroPhrase, setActiveHeroPhrase] = useState(0);

  useEffect(() => {
    return heroIndex.on('change', (latest) => {
      setActiveHeroPhrase(Math.min(3, Math.floor(latest)));
    });
  }, [heroIndex]);

  const heroPhrases = [
    { main: "THE 60-DAY", sub: "CODING CHALLENGE", glow: "text-slate-100" },
    { main: "BUILD", sub: "EVERY SINGLE DAY.", glow: "gradient-text-electric text-glow-purple" },
    { main: "SHOW", sub: "YOUR REAL WORK.", glow: "gradient-text-fire text-glow-fire" },
    { main: "BECOME", sub: "UNSTOPPABLE.", glow: "gradient-text-emerald" },
  ];

  const stats = [
    { value: '20000', suffix: '+', label: 'Students Enrolled', icon: Users, color: '#06B6D4' },
    { value: '5000000', suffix: '+', label: 'Lines of Code', icon: Terminal, color: '#8B5CF6' },
    { value: '1000000', suffix: '+', label: 'GitHub Commits', icon: GitCommit, color: '#10b981' },
    { value: '100000', suffix: '+', label: 'LinkedIn Posts', icon: Linkedin, color: '#2563EB' },
  ];

  const features = [
    { icon: Flame, title: 'Daily Streak Engine', desc: 'Gamified tracker rewards consistency and resets if you miss a push deadline.', color: '#f97316' },
    { icon: Trophy, title: 'Global Leaderboard', desc: 'Compete with 20,000+ coders. Top 5% secure direct recruiter interviews.', color: '#fbbf24' },
    { icon: Sparkles, title: 'AI Code Auditor', desc: 'Instant code reviews analyze structure, design patterns, and efficiency.', color: '#06B6D4' },
    { icon: Layers, title: '6 Portfolio Projects', desc: 'Go beyond basic templates; build products worthy of senior tech roles.', color: '#6C63FF' },
    { icon: Users, title: 'Active Community', desc: 'Collaborate, review, and network with high-intent builders worldwide.', color: '#14B8A6' },
    { icon: Award, title: 'Recruiter Showcase', desc: 'Your progress gets compiled into a live candidate profile read by tech firms.', color: '#8B5CF6' },
  ];

  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

  const testimonials = [
    {
      initials: 'SC',
      name: 'Sarah Chen',
      role: 'Frontend Engineer at Stripe',
      company: 'STRIPE',
      color: '#6C63FF',
      streak: '60 Days',
      xp: '2,450 XP',
      story: 'I committed code and posted updates for 60 days straight. Two hiring managers saw my LinkedIn posts and reached out directly. I landed an offer at Stripe without sending a resume!'
    },
    {
      initials: 'KM',
      name: 'Krishna Murthy',
      role: 'Fullstack Dev at Linear',
      company: 'LINEAR',
      color: '#06B6D4',
      streak: '54 Days',
      xp: '2,100 XP',
      story: 'The curriculum forces you to code production-grade apps. The XP system and streak multipliers are incredibly addictive. It felt more like playing an RPG than studying.'
    },
    {
      initials: 'ER',
      name: 'Elena Rostova',
      role: 'AI Engineer at Vercel',
      company: 'VERCEL',
      color: '#10b981',
      streak: '60 Days',
      xp: '2,800 XP',
      story: 'Building in public for 60 days gave me proof of work that no degree could match. Recruiters reached out before I even graduated!'
    },
    {
      initials: 'MV',
      name: 'Marcus Vance',
      role: 'Mobile Architect at Nike',
      company: 'NIKE',
      color: '#f97316',
      streak: '48 Days',
      xp: '1,950 XP',
      story: 'The daily consistency requirement broke my bad habits. Now I ship production code every single day with confidence.'
    },
  ];

  const faqs = [
    {
      id: '01',
      tag: 'ACCESS',
      category: 'PRICING & FREE TRACK',
      color: '#06B6D4',
      q: 'Is the challenge completely free?',
      a: 'Yes! The 60-Day Challenge is 100% free. Our mission is to bridge the gap between classroom theory and real-world software architecture.'
    },
    {
      id: '02',
      tag: 'STREAK',
      category: 'DEADLINES & FREEZES',
      color: '#f97316',
      q: 'Can I miss a day?',
      a: 'You are allowed up to 3 "Streak Freezes" by exchanging earned XP. If you miss more, your streak resets, simulating production deadlines!'
    },
    {
      id: '03',
      tag: 'HIRING',
      category: 'RECRUITER DIRECTORY',
      color: '#10b981',
      q: 'How do recruiters discover my profile?',
      a: 'ABTalks maintains a candidate directory. Once you reach Day 30 and unlock the "Consistency Badge", your portfolio is indexed and made visible to partner recruiters.'
    },
    {
      id: '04',
      tag: 'STACK',
      category: 'TRACKS & CURRICULUM',
      color: '#6C63FF',
      q: 'What tech stack will I use?',
      a: 'We have dedicated tracks for React/Next.js, Flutter Mobile, Node.js Backend, and Python AI engineering. You can choose the one that fits your goals.'
    }
  ];

  return (
    <div className="space-y-32 py-8 select-none">
      
      {/* 1. Cinematic Opening Hero Sequence */}
      <section className="relative min-h-[80dvh] md:min-h-[90vh] flex flex-col items-center justify-center text-center pt-4 md:pt-8 max-w-4xl mx-auto overflow-hidden">
        {/* Volumetric Spotlight */}
        <div className="volumetric-spotlight" />

        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 space-y-6 md:space-y-8 flex flex-col items-center w-full px-2"
        >
          {/* Live Beacon Indicator */}
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full glass-panel text-xs font-bold text-primary-cyan border border-primary-cyan/30 shadow-glow-cyan"
          >
            <span className="beacon-dot" />
            <span className="uppercase tracking-widest text-[8px] sm:text-[9px]">COHORT 4 ACTIVE — LATE NIGHT STUDIO</span>
          </motion.div>

          {/* Sequential Focus Text Reveal */}
          <div className="min-h-[140px] sm:h-52 flex items-center justify-center px-2 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeHeroPhrase}
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-2 w-full"
              >
                <h2 className="text-xs sm:text-base font-bold text-slate-400 uppercase tracking-widest">
                  {heroPhrases[activeHeroPhrase].main}
                </h2>
                <h1 className={`text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold tracking-tight leading-tight sm:leading-none ${heroPhrases[activeHeroPhrase].glow}`}>
                  {heroPhrases[activeHeroPhrase].sub}
                </h1>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Subtext */}
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto leading-relaxed px-2">
            A futuristic learning platform. Push daily commits, build real-world software, unlock recruiter visibility, and build proof of work.
          </p>

          {/* Magnetic CTA Buttons */}
          <div className="flex flex-col xs:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 w-full xs:w-auto px-4">
            <MagneticButton className="w-full xs:w-auto" onClick={() => router.push('/dashboard')}>
              <div className="w-full xs:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-primary-purple via-primary-indigo to-primary-violet font-bold text-xs tracking-wider uppercase text-white shadow-glow-purple group min-h-[44px]">
                <span>Start Your Journey</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </MagneticButton>
            
            <MagneticButton 
              className="w-full xs:w-auto"
              onClick={() => {
                document.getElementById('story-1')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <div className="w-full xs:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-full glass-panel glass-panel-hover text-slate-300 hover:text-white font-bold text-xs tracking-wider uppercase min-h-[44px]">
                <span>Explore The Story ↓</span>
              </div>
            </MagneticButton>
          </div>
        </motion.div>
      </section>

      {/* 2. CINEMATIC STICKY STORY 1: 60 DAYS -> 60 BUILDS -> 60 PROOFS -> ONE PORTFOLIO */}
      <section id="story-1">
        <StickyStory heightInVh={280}>
          {(progress) => {
            const step = Math.min(3, Math.floor(progress.get() * 4));
            const phrases = ["60 DAYS.", "60 BUILDS.", "60 PROOFS.", "ONE PORTFOLIO."];
            const colors = [
              "gradient-text-hero",
              "gradient-text-electric text-glow-purple",
              "gradient-text-fire text-glow-fire",
              "gradient-text-emerald"
            ];

            return (
              <div className="flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6 px-3">
                <span className="text-[10px] font-bold text-primary-cyan uppercase tracking-widest">CHAPTER 01</span>
                
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={step}
                    initial={{ opacity: 0, scale: 0.9, filter: 'blur(12px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 1.1, filter: 'blur(12px)' }}
                    transition={{ duration: 0.4 }}
                    className={`text-4xl sm:text-8xl font-heading font-black tracking-tight ${colors[step]}`}
                  >
                    {phrases[step]}
                  </motion.h2>
                </AnimatePresence>

                <p className="text-xs sm:text-sm text-slate-400 max-w-md px-2">
                  {step === 0 && "Consistency starts with a commitment to show up every single day."}
                  {step === 1 && "No fake tutorial projects. Build 60 real software components."}
                  {step === 2 && "Verifiable GitHub commits and public LinkedIn posts prove your craft."}
                  {step === 3 && "By Day 60, your portfolio stands head and shoulders above standard applicants."}
                </p>
              </div>
            );
          }}
        </StickyStory>
      </section>

      {/* 3. CINEMATIC STICKY STORY 2: START WITH ONE DAY */}
      <section id="story-2">
        <StickyStory heightInVh={260}>
          {(progress) => {
            const step = Math.min(3, Math.floor(progress.get() * 4));
            const phrases = ["START WITH ONE DAY.", "ONE", "ONE DAY", "DAY 01"];

            return (
              <div className="flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8 px-4">
                <span className="text-[10px] font-bold text-primary-purple uppercase tracking-widest">CHAPTER 02</span>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <h2 className="text-3xl sm:text-6xl font-heading font-extrabold text-slate-100 tracking-tight">
                      {phrases[step]}
                    </h2>
                    {step === 3 && (
                      <p className="text-xs sm:text-sm text-primary-cyan font-bold tracking-wide">
                        Every great developer has a first commit.
                      </p>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Glowing Single Contribution Node */}
                <motion.div 
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-purple to-primary-cyan flex items-center justify-center text-white font-extrabold text-xs shadow-glow-cyan"
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✓
                </motion.div>
              </div>
            );
          }}
        </StickyStory>
      </section>

      {/* 4. CINEMATIC STICKY STORY 3: THEN BUILD A HABIT (60 Illuminated Nodes) */}
      <section id="story-3">
        <StickyStory heightInVh={320}>
          {(progress) => {
            const illuminatedCount = Math.max(1, Math.min(60, Math.floor(progress.get() * 65)));

            return (
              <div className="flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8 px-3 max-w-3xl">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-primary-cyan uppercase tracking-widest">CHAPTER 03</span>
                  <h2 className="text-2xl sm:text-5xl font-heading font-extrabold text-slate-100">
                    THEN BUILD A HABIT.
                  </h2>
                  <p className="text-xs text-slate-400">Watch your 60-day visual chain illuminate as you move forward.</p>
                </div>

                {/* 60-Day Habit Matrix — Linear / GitHub Grade Sleek Frame */}
                <div className="relative p-4 sm:p-8 rounded-3xl bg-[#0B0C0E] border border-white/10 shadow-2xl overflow-hidden w-full max-w-4xl space-y-4 sm:space-y-6">
                  
                  {/* Header Bar */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-white/10 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-200">HABIT TRACKER</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs text-slate-400 font-medium">Cohort #04</span>
                    </div>

                    {/* Progress Bar & Percentage */}
                    <div className="flex items-center gap-2.5 w-full sm:w-auto">
                      <span className="font-mono text-[11px] sm:text-xs text-slate-400 font-medium">{illuminatedCount} / 60 DAYS</span>
                      <div className="flex-1 sm:w-40 bg-slate-900 h-1.5 rounded-full overflow-hidden border border-white/5">
                        <motion.div 
                          className="h-full bg-emerald-400 rounded-full"
                          style={{ width: `${(illuminatedCount / 60) * 100}%` }}
                        />
                      </div>
                      <span className="font-mono text-xs font-bold text-emerald-400">{Math.round((illuminatedCount / 60) * 100)}%</span>
                    </div>
                  </div>

                  {/* Clean Sleek Node Matrix */}
                  <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 gap-1.5 sm:gap-2 pt-1">
                    {Array.from({ length: 60 }).map((_, idx) => {
                      const dayNum = idx + 1;
                      const isLit = dayNum <= illuminatedCount;
                      const isCurrent = dayNum === illuminatedCount;
                      const isMilestone = [15, 30, 45, 60].includes(dayNum);

                      return (
                        <motion.div
                          key={dayNum}
                          whileHover={{ scale: 1.12, zIndex: 10 }}
                          whileTap={{ scale: 0.95 }}
                          className={`relative aspect-square rounded-xl transition-all duration-200 flex items-center justify-center text-xs font-mono font-bold cursor-pointer border ${
                            isCurrent
                              ? 'bg-white text-slate-950 border-white ring-2 sm:ring-4 ring-white/20 font-black shadow-lg scale-105 z-10'
                              : isLit
                                ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 hover:border-emerald-400/60'
                                : isMilestone
                                  ? 'bg-slate-900/80 text-slate-300 border-slate-700/80 hover:border-slate-500'
                                  : 'bg-slate-950/60 text-slate-600 border-slate-900 hover:border-slate-800 hover:text-slate-400'
                          }`}
                        >
                          {isCurrent ? (
                            <span>{dayNum}</span>
                          ) : isLit ? (
                            <span className="text-[11px]">✓</span>
                          ) : (
                            <span className="text-[10px]">{dayNum}</span>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Minimal Legend Line */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-3 sm:pt-4 border-t border-white/10 text-[10px] sm:text-[11px] font-mono text-slate-400">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-[8px]">✓</span> Verified Code</span>
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-white text-black font-extrabold flex items-center justify-center text-[8px]">●</span> Target</span>
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-slate-900 border border-slate-800 text-slate-600 flex items-center justify-center text-[8px]">○</span> Upcoming</span>
                    </div>

                    <span className="text-slate-500 text-[9px] sm:text-[11px]">60-DAY PORTFOLIO ENGINE</span>
                  </div>

                </div>

                <p className="text-[11px] sm:text-xs font-mono font-medium text-slate-400">
                  {illuminatedCount} / 60 Days Complete — Keep Shipping Production Code
                </p>
              </div>
            );
          }}
        </StickyStory>
      </section>

      {/* 5. CINEMATIC PARALLAX STORY 4: YOUR CODE DESERVES TO BE SEEN */}
      <section className="space-y-16 max-w-4xl mx-auto px-4">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-bold text-primary-violet uppercase tracking-widest">CHAPTER 04</span>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-100">
            YOUR CODE DESERVES TO BE SEEN.
          </h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">Parallax cards representation of daily proof of work pushed to public channels.</p>
        </div>

        {/* Parallax Floating Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          <ParallaxCard speed={35} rotateDeg={2}>
            <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4 shadow-glass-glow bg-gradient-to-br from-bg-dark to-slate-950">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold text-primary-teal uppercase tracking-widest flex items-center gap-1.5">
                  <GitCommit className="w-3.5 h-3.5" /> GitHub Commit Card
                </span>
                <span className="text-[9px] text-slate-500 font-mono">sha: 7da5b23</span>
              </div>
              <p className="text-xs font-bold text-slate-200">feat: implement custom motion hooks & sticky stories</p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-slate-400">
                +145 insertions(+), -12 deletions(-)
              </div>
            </div>
          </ParallaxCard>

          <ParallaxCard speed={-35} rotateDeg={-2}>
            <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4 shadow-glass-glow bg-gradient-to-br from-bg-dark to-slate-950">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold text-primary-blue uppercase tracking-widest flex items-center gap-1.5">
                  <Linkedin className="w-3.5 h-3.5" /> LinkedIn Post
                </span>
                <span className="text-[9px] text-slate-500 font-mono">#ABTalks</span>
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">
                &ldquo;Day 12 of #ABTalks 60-Day Challenge complete! Built custom motion hooks and sticky storytelling controls.&rdquo;
              </p>
              <div className="flex items-center gap-2 text-[10px] font-bold text-primary-cyan">
                <span>👍 42 Likes</span>
                <span>•</span>
                <span>💬 14 Comments</span>
              </div>
            </div>
          </ParallaxCard>
        </div>
      </section>

      {/* 6. CINEMATIC STICKY STORY 5: DON'T BREAK THE CHAIN */}
      <section>
        <StickyStory heightInVh={260}>
          {(progress) => {
            const step = Math.min(3, Math.floor(progress.get() * 4));
            const words = ["DON'T", "BREAK", "THE", "CHAIN."];

            return (
              <div className="flex flex-col items-center justify-center text-center space-y-8 px-4">
                <span className="text-[10px] font-bold text-accent-fire uppercase tracking-widest">CHAPTER 05</span>

                <AnimatePresence mode="wait">
                  <motion.h2
                    key={step}
                    initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
                    className="text-6xl sm:text-9xl font-heading font-black text-accent-fire text-glow-fire"
                  >
                    {words[step]}
                  </motion.h2>
                </AnimatePresence>

                {step === 3 && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs sm:text-sm text-slate-300 font-bold max-w-sm"
                  >
                    Once your chain lights up, missing a day becomes impossible.
                  </motion.p>
                )}
              </div>
            );
          }}
        </StickyStory>
      </section>

      {/* 7. STORY 6: MOMENTUM ENGINE — Futuristic Telemetry Speedometer Console */}
      <section className="max-w-4xl mx-auto px-4 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-bold font-mono text-primary-cyan uppercase tracking-widest">+ CHAPTER 06 // SYSTEM TELEMETRY +</span>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-100">THE MOMENTUM ENGINE</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">An intelligent index calculating consistency, completion quality, and code velocity in real-time.</p>
        </div>

        {/* Futuristic Telemetry Console Frame */}
        <div className="relative p-6 sm:p-10 rounded-3xl glass-panel border border-primary-cyan/40 shadow-glass-glow bg-gradient-to-br from-bg-dark via-slate-950 to-bg-dark text-center overflow-hidden">
          {/* Corner Crosshairs */}
          <div className="absolute top-3 left-4 text-[9px] font-mono text-primary-cyan/50 pointer-events-none">[ TELEMETRY // LIVE SCAN ]</div>
          <div className="absolute top-3 right-4 text-[9px] font-mono text-primary-cyan/50 pointer-events-none">[ VELOCITY x1.85 MULTIPLIER ]</div>

          {/* Central Telemetry Speedometer Gauge */}
          <div className="relative flex flex-col items-center justify-center py-4">
            
            {/* SVG Circular Speedometer Gauge */}
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                {/* Background Outer Ring */}
                <circle 
                  cx="80" 
                  cy="80" 
                  r="68" 
                  className="stroke-slate-900" 
                  strokeWidth="8" 
                  fill="none" 
                />
                {/* Glowing Outer Radial Path */}
                <motion.circle 
                  cx="80" 
                  cy="80" 
                  r="68" 
                  className="stroke-primary-cyan" 
                  strokeWidth="8" 
                  strokeDasharray="427"
                  initial={{ strokeDashoffset: 427 }}
                  whileInView={{ strokeDashoffset: 427 - (427 * 0.87) }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                  strokeLinecap="round" 
                  fill="none" 
                  style={{ filter: 'drop-shadow(0 0 8px #06B6D4)' }}
                />
                {/* Inner Decorative Dashed Circle */}
                <circle 
                  cx="80" 
                  cy="80" 
                  r="56" 
                  className="stroke-primary-purple/30" 
                  strokeWidth="1.5" 
                  strokeDasharray="4 4" 
                  fill="none" 
                />
              </svg>

              {/* Inner Core Stat Display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-1">
                <span className="text-4xl sm:text-5xl font-heading font-black text-primary-cyan text-glow-cyan">
                  87%
                </span>
                <span className="text-[9px] font-mono font-extrabold text-primary-teal uppercase tracking-widest flex items-center gap-1">
                  <span className="beacon-dot" /> MOMENTUM RISING
                </span>
              </div>
            </div>

            {/* Performance Status Badge */}
            <div className="pt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-cyan/10 border border-primary-cyan/30 text-primary-cyan text-xs font-bold tracking-wide shadow-glow-cyan">
              <span>⚡ TOP 5% BUILDER COHORT INDEX</span>
            </div>
          </div>

          {/* 4 Sensor Telemetry Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 mt-6 border-t border-white/10 text-left">
            {[
              { label: 'Consistency', value: '94%', sub: '🔥 18-Day Streak Active', color: '#10b981' },
              { label: 'GitHub Activity', value: '89%', sub: '⚡ 4.2 Commits / Day', color: '#06B6D4' },
              { label: 'Learning Velocity', value: '85%', sub: '🚀 +350 XP / Week', color: '#8B5CF6' },
              { label: 'Proof of Work', value: '92%', sub: '🏆 12 Component Diffs', color: '#6C63FF' },
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -4, scale: 1.02 }}
                className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 space-y-2 relative overflow-hidden btn-tactile"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">{item.label}</span>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                </div>

                <p className="text-xl font-heading font-extrabold text-slate-100">{item.value}</p>
                <p className="text-[9px] text-slate-500 font-semibold">{item.sub}</p>

                {/* Animated Progress Bar */}
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: item.value }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.1 }}
                    className="h-full rounded-full" 
                    style={{ backgroundColor: item.color }} 
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer Diagnostic Ticker Line */}
          <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/5 text-[9px] font-mono font-bold text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
              <span>DIAGNOSTIC STATUS: 4/4 SENSORS LOCKED</span>
            </span>
            <span className="text-primary-cyan uppercase tracking-wider">AUTO-UPDATES IN REAL-TIME ⚡</span>
          </div>

        </div>
      </section>

      {/* 8. Trust Stats Section */}
      <section className="mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 text-center shadow-glass-glow bg-bg-dark/30">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="space-y-2 group">
                <div 
                  className="w-9 h-9 rounded-xl mx-auto flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-100">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. Features Section — Futuristic 3D Stacked Card Deck */}
      <section className="max-w-4xl mx-auto px-4 space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left border-b border-white/10 pb-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-primary-cyan uppercase tracking-widest">INTERACTIVE DECK</span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-100">Engineered for Addictive Learning</h2>
            <p className="text-xs text-slate-400">Combining design conventions from Duolingo and GitHub into a 3D card stack.</p>
          </div>

          {/* View Mode & Deck Navigation Controls */}
          <div className="flex items-center gap-3">
            <div className="p-1 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-1 text-[10px] font-bold">
              <button
                onClick={() => setDeckViewMode('stack')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  deckViewMode === 'stack' ? 'bg-primary-purple text-white shadow-glow-purple' : 'text-slate-400 hover:text-white'
                }`}
              >
                3D Stack
              </button>
              <button
                onClick={() => setDeckViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  deckViewMode === 'grid' ? 'bg-primary-purple text-white shadow-glow-purple' : 'text-slate-400 hover:text-white'
                }`}
              >
                Grid View
              </button>
            </div>
          </div>
        </div>

        {/* Render 3D Stacked Deck or Grid View */}
        {deckViewMode === 'stack' ? (
          <div className="relative min-h-[360px] sm:min-h-[340px] flex flex-col items-center justify-center py-4 sm:py-6">
            
            {/* Stacked Cards Container */}
            <div className="relative w-full max-w-lg h-[270px] sm:h-[240px] flex items-center justify-center">
              {features.map((f, i) => {
                const Icon = f.icon;
                
                // Calculate position relative to active top card index
                const offset = (i - activeDeckIndex + features.length) % features.length;
                const isTop = offset === 0;
                const isSecond = offset === 1;
                const isThird = offset === 2;

                // Don't render cards further down the stack in 3D mode
                if (offset > 2) return null;

                return (
                  <motion.div
                    key={i}
                    onClick={() => {
                      if (!isTop) {
                        setActiveDeckIndex(i);
                      }
                    }}
                    initial={false}
                    animate={{
                      scale: isTop ? 1 : isSecond ? 0.94 : 0.88,
                      y: isTop ? 0 : isSecond ? 18 : 36,
                      opacity: isTop ? 1 : isSecond ? 0.82 : 0.5,
                      rotate: isTop ? 0 : isSecond ? 2 : 4,
                      zIndex: 30 - offset,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 240,
                      damping: 24,
                    }}
                    className={`absolute inset-0 p-4 sm:p-8 rounded-3xl border flex flex-col justify-between cursor-pointer backdrop-blur-2xl transition-shadow ${
                      isTop
                        ? 'bg-gradient-to-br from-bg-dark via-slate-950 to-bg-dark border-primary-cyan/50 shadow-glass-glow shadow-glow-cyan'
                        : isSecond
                          ? 'bg-bg-dark/95 border-white/10 shadow-lg'
                          : 'bg-bg-dark/80 border-white/5 opacity-60'
                    }`}
                  >
                    {/* Top Card Badge & Number */}
                    <div className="flex items-center justify-between">
                      <div 
                        className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10"
                        style={{ backgroundColor: `${f.color}20`, color: f.color }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full">
                          CARD 0{i + 1} / 06
                        </span>
                        {isTop && (
                          <span className="w-2 h-2 rounded-full bg-primary-cyan animate-pulse shadow-glow-cyan" />
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-2 pt-4">
                      <h3 className="text-lg sm:text-xl font-heading font-extrabold text-slate-100 flex items-center gap-2">
                        <span>{f.title}</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {f.desc}
                      </p>
                    </div>

                    {/* Bottom Action Bar */}
                    {isTop && (
                      <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[10px] font-bold text-primary-cyan">
                        <span>TAP NEXT OR SWIPE STACK</span>
                        <span className="flex items-center gap-1">Card Focus ⚡</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Slide Navigation Controls */}
            <div className="flex items-center justify-between w-full max-w-lg pt-8 px-2">
              <button
                onClick={() => {
                  setActiveDeckIndex((prev) => (prev - 1 + features.length) % features.length);
                }}
                className="px-4 py-2 rounded-full glass-panel border border-white/10 text-slate-300 hover:text-white font-bold text-xs btn-tactile flex items-center gap-1.5"
              >
                <span>← Previous</span>
              </button>

              {/* Progress Dots */}
              <div className="flex items-center gap-2">
                {features.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveDeckIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      activeDeckIndex === idx
                        ? 'w-6 bg-primary-cyan shadow-glow-cyan'
                        : 'w-2 bg-slate-800 hover:bg-slate-700'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => {
                  setActiveDeckIndex((prev) => (prev + 1) % features.length);
                }}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-primary-purple via-primary-indigo to-primary-cyan font-extrabold text-xs uppercase tracking-wider text-white shadow-glow-cyan btn-tactile flex items-center gap-1.5"
              >
                <span>Next Card →</span>
              </button>
            </div>

          </div>
        ) : (
          /* Grid View Mode */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div 
                  key={i}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="p-5 rounded-2xl glass-card-interactive border border-white/10 space-y-3 flex flex-col text-left btn-tactile"
                >
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${f.color}18`, color: f.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-200">{f.title}</h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* 10. Testimonials Section — Futuristic 3D Spotlight Console */}
      <section className="max-w-4xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-bold text-accent-gold uppercase tracking-widest">VERIFIED SUCCESS STORIES</span>
          <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-slate-100">Proven Career Accelerators</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">Hear from students who built consistent habits and unlocked brand new career paths.</p>
        </div>

        {/* Central 3D Spotlight Card */}
        <div className="relative min-h-[260px]">
          <AnimatePresence mode="wait">
            {testimonials.map((t, idx) => {
              if (idx !== activeTestimonialIndex) return null;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.94, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.04, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="p-6 sm:p-8 rounded-3xl glass-panel border border-primary-purple/40 space-y-6 bg-gradient-to-br from-bg-dark via-slate-950 to-bg-dark shadow-glass-glow shadow-glow-purple relative overflow-hidden"
                >
                  {/* System Header Tag */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs">⭐⭐⭐⭐⭐</span>
                      <span className="text-[10px] font-mono font-bold text-accent-gold uppercase tracking-wider">5.0 VERIFIED PROOF</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-mono font-bold text-primary-cyan">
                        🔥 {t.streak}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-primary-purple/20 border border-primary-purple/40 text-[10px] font-mono font-bold text-primary-purple">
                        {t.xp}
                      </span>
                    </div>
                  </div>

                  {/* Main Quote Story */}
                  <p className="text-sm sm:text-base text-slate-200 italic font-serif leading-relaxed">
                    &ldquo;{t.story}&rdquo;
                  </p>

                  {/* Candidate Info Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary-purple via-primary-indigo to-primary-cyan border-2 border-primary-cyan flex items-center justify-center text-xs font-heading font-black text-white shadow-glow-cyan">
                        {t.initials}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                          <span>{t.name}</span>
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-primary-cyan/20 text-primary-cyan font-extrabold uppercase">
                            {t.company}
                          </span>
                        </h4>
                        <p className="text-[11px] text-slate-400 font-medium">{t.role}</p>
                      </div>
                    </div>

                    <div className="hidden xs:flex items-center gap-1.5 text-[10px] font-bold text-accent-emerald bg-accent-emerald/10 border border-accent-emerald/30 px-3 py-1 rounded-full">
                      <span>HIRED DIRECTLY</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Candidate Avatar Micro-Reel */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 pt-2">
          {testimonials.map((t, idx) => {
            const isActive = idx === activeTestimonialIndex;

            return (
              <button
                key={idx}
                onClick={() => setActiveTestimonialIndex(idx)}
                className={`p-1.5 rounded-2xl border transition-all flex items-center gap-2.5 btn-tactile ${
                  isActive
                    ? 'bg-primary-purple/20 border-primary-cyan shadow-glow-cyan scale-105'
                    : 'bg-slate-950/80 border-slate-800 opacity-60 hover:opacity-100'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-purple to-primary-indigo flex items-center justify-center text-[10px] font-heading font-black text-white">
                  {t.initials}
                </div>
                <span className="hidden sm:inline-block text-xs font-bold text-slate-300 pr-1">
                  {t.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 11. FAQ Section — Futuristic 2x2 Holographic Module Matrix */}
      <section className="max-w-4xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-bold font-mono text-primary-cyan uppercase tracking-widest">+ SYSTEM KNOWLEDGE BASE +</span>
          <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-slate-100">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">Everything you need to know to succeed in the 60-Day Challenge.</p>
        </div>

        {/* 2x2 High-Tech Holographic Module Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;

            return (
              <motion.div
                key={idx}
                layout
                onClick={() => setActiveFaq(isOpen ? null : idx)}
                whileHover={{ y: -4, scale: 1.01 }}
                className={`relative p-5 sm:p-6 rounded-3xl border cursor-pointer backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between btn-tactile ${
                  isOpen
                    ? 'bg-gradient-to-br from-bg-dark via-slate-950 to-bg-dark border-primary-cyan/60 shadow-glass-glow shadow-glow-cyan'
                    : 'bg-bg-dark/80 border-white/10 hover:border-primary-purple/40 hover:bg-slate-950/90'
                }`}
              >
                {/* Corner Crosshairs */}
                <div className="absolute top-2 left-3 text-[9px] font-mono text-primary-cyan/40 pointer-events-none">+ KB.{faq.id}</div>
                <div className="absolute top-2 right-3 text-[9px] font-mono text-primary-purple/40 pointer-events-none">MOD.{faq.tag} +</div>

                {/* Module Header Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span 
                      className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold border"
                      style={{ backgroundColor: `${faq.color}15`, color: faq.color, borderColor: `${faq.color}40` }}
                    >
                      {faq.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-mono font-bold text-slate-500">#{faq.id}</span>
                    <ChevronDown 
                      className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary-cyan' : ''}`}
                    />
                  </div>
                </div>

                {/* Question Title */}
                <div className="pt-3 space-y-2">
                  <h3 className="text-sm sm:text-base font-heading font-extrabold text-slate-100 leading-snug">
                    {faq.q}
                  </h3>

                  {/* Answer Text Expansion */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden pt-2"
                      >
                        <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-white/10 font-medium">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer Status Line */}
                <div className="flex items-center justify-between pt-4 mt-2 border-t border-white/5 text-[9px] font-mono font-bold text-slate-500">
                  <span>{isOpen ? 'TAP TO COLLAPSE' : 'TAP TO READ ANSWER'}</span>
                  {isOpen && <span className="text-primary-cyan">STATUS: EXPANDED ⚡</span>}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 12. Final Magnetic Hero CTA */}
      <section className="text-center space-y-6 pt-12">
        <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-100">READY TO BUILD?</h2>
        <MagneticButton onClick={() => router.push('/dashboard')}>
          <div className="inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full bg-gradient-to-r from-primary-purple via-primary-indigo to-primary-cyan font-extrabold text-xs tracking-widest uppercase text-white shadow-glow-cyan group">
            <span>Start Day 01 Now</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </MagneticButton>
      </section>

      {/* 13. Trending High-Tech Futuristic Footer Console */}
      <footer className="pt-16 pb-8 border-t border-white/10 bg-bg-dark/95 backdrop-blur-3xl text-left space-y-12 relative overflow-hidden">
        {/* Ambient Footer Spotlight */}
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-primary-purple/10 blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
          
          {/* Brand & Cohort Manifesto Column (Col 1-4) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2 font-heading font-extrabold text-lg">
              <span className="beacon-dot" />
              <span className="gradient-text-electric text-glow-purple font-extrabold text-xl">ABTALKS</span>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The premier 60-Day software build accelerator. Made for developers who code late at night and build production-grade proof of work.
            </p>

            {/* System Live Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950 border border-slate-800 text-[10px] font-mono font-bold text-accent-emerald shadow-glow-cyan">
              <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
              <span>SYSTEM ONLINE // v2.4 (0.012s)</span>
            </div>
          </div>

          {/* Curriculum Tracks (Col 5-6) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold text-primary-cyan uppercase tracking-wider">Curriculum</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li><button onClick={() => router.push('/day/12')} className="hover:text-slate-100 transition-colors btn-tactile">Next.js 15 Track</button></li>
              <li><button onClick={() => router.push('/day/12')} className="hover:text-slate-100 transition-colors btn-tactile">Flutter Mobile</button></li>
              <li><button onClick={() => router.push('/day/12')} className="hover:text-slate-100 transition-colors btn-tactile">Node.js Backend</button></li>
              <li><button onClick={() => router.push('/day/12')} className="hover:text-slate-100 transition-colors btn-tactile">Python AI Agents</button></li>
              <li><button onClick={() => router.push('/day/12')} className="hover:text-slate-100 transition-colors btn-tactile">Motion Systems</button></li>
            </ul>
          </div>

          {/* Platform Features (Col 7-8) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold text-primary-purple uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li><button onClick={() => router.push('/dashboard')} className="hover:text-slate-100 transition-colors btn-tactile">60-Day Matrix</button></li>
              <li><button onClick={() => router.push('/dashboard')} className="hover:text-slate-100 transition-colors btn-tactile">Streak Engine</button></li>
              <li><button onClick={() => router.push('/dashboard')} className="hover:text-slate-100 transition-colors btn-tactile">Cohort Leaderboard</button></li>
              <li><button onClick={() => router.push('/dashboard')} className="hover:text-slate-100 transition-colors btn-tactile">Recruiter Directory</button></li>
              <li><button onClick={() => router.push('/day/12')} className="hover:text-slate-100 transition-colors btn-tactile">AST Code Review</button></li>
            </ul>
          </div>

          {/* Developer Newsletter Signup (Col 9-12) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono font-bold text-accent-gold uppercase tracking-wider">Join Cohort #05 Digest</h4>
            <p className="text-xs text-slate-400">Get weekly code audits, portfolio teardowns, and recruiter invites.</p>
            
            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Subscribed! Check your inbox for Cohort #05 invites.</span>
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newsletterEmail.trim()) {
                    setSubscribed(true);
                  }
                }}
                className="flex items-center gap-2 pt-1"
              >
                <input 
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="developer@company.com"
                  className="w-full px-3.5 py-2 rounded-xl glass-input text-xs text-slate-200 focus:outline-none"
                />
                <button 
                  type="submit"
                  aria-label="Subscribe to Cohort #05 Digest"
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-primary-purple to-primary-cyan text-white text-xs font-bold shrink-0 shadow-glow-cyan btn-tactile flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="max-w-5xl mx-auto px-4 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono font-semibold relative z-10">
          
          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5 btn-tactile">
              <Github className="w-3.5 h-3.5 text-slate-400" />
              <span>GitHub</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5 btn-tactile">
              <Linkedin className="w-3.5 h-3.5 text-slate-400" />
              <span>LinkedIn</span>
            </a>
            <a href="https://www.abtalks.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5 btn-tactile">
              <Code className="w-3.5 h-3.5 text-slate-400" />
              <span>ABTalks</span>
            </a>
          </div>

          <p className="text-center sm:text-right text-slate-400">
            © {new Date().getFullYear()} ABTALKS INC. ALL RIGHTS RESERVED. CRAFTED FOR BUILDERS WORLDWIDE.
          </p>
          
        </div>
      </footer>

    </div>
  );
}
