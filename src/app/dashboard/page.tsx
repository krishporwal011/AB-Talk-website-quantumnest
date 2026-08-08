'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useChallenge } from '@/context/ChallengeContext';
import { motion } from 'framer-motion';
import { 
  Flame, 
  Trophy, 
  Zap, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Lock, 
  ArrowRight, 
  Code, 
  GitCommit, 
  Share2, 
  Sparkles, 
  Award,
  ChevronRight,
  TrendingUp,
  BarChart2
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { 
    streak, 
    xp, 
    momentum, 
    completedDays, 
    achievements,
    isOffline,
    isLoading
  } = useChallenge();

  const [selectedDayNode, setSelectedDayNode] = useState<number | null>(12);

  // Generate 60 nodes for grid tracker
  const nodes = Array.from({ length: 60 }, (_, i) => {
    const dayNum = i + 1;
    const isDone = completedDays.includes(dayNum);
    const isActive = dayNum === 12;
    const isLocked = dayNum > 12;
    return { dayNum, isDone, isActive, isLocked };
  });

  const weeklyHours = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 3.2 },
    { day: 'Wed', hours: 1.8 },
    { day: 'Thu', hours: 4.0 },
    { day: 'Fri', hours: 3.5 },
    { day: 'Sat', hours: 5.2 },
    { day: 'Sun', hours: 2.8 },
  ];

  const maxHours = Math.max(...weeklyHours.map(w => w.hours));

  const leaderboards = [
    { rank: 1, name: 'Alex Rivera', xp: 4850, streak: 58, initials: 'AR', color: 'from-accent-gold to-accent-fire', isUser: false },
    { rank: 2, name: 'Sophia Zhang', xp: 4620, streak: 54, initials: 'SZ', color: 'from-primary-purple to-primary-indigo', isUser: false },
    { rank: 3, name: 'Krishna Murthy', xp: 2450, streak: streak, initials: 'KM', color: 'from-primary-cyan to-primary-teal', isUser: true },
    { rank: 4, name: 'David Kim', xp: 2310, streak: 18, initials: 'DK', color: 'from-slate-700 to-slate-900', isUser: false },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, damping: 20, stiffness: 160 }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 py-6 max-w-5xl mx-auto select-none"
    >

      {/* Offline Alert Indicator */}
      {isOffline && (
        <motion.div variants={itemVariants} className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center justify-between">
          <span>⚠️ Network Offline Mode — Local state active</span>
          <span className="text-[10px] uppercase font-mono tracking-wider">Sync Cached</span>
        </motion.div>
      )}

      {/* 1. Header Greeting & Quick Stats */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold font-mono text-primary-cyan uppercase tracking-widest">STUDIO CONSOLE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-slate-100">
            Welcome back, <span className="gradient-text-electric text-glow-purple">Krishna</span>
          </h1>
          <p className="text-xs text-slate-400">Keep coding late at night. You are 20% through the 60-Day Challenge.</p>
        </div>

        {/* Global XP & Streak Stats Pill */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl glass-panel border border-white/10 shadow-glass">
            <Flame className="w-4 h-4 fill-accent-fire text-accent-fire animate-pulse" />
            <div>
              <p className="text-[9px] text-slate-500 font-bold uppercase">Streak</p>
              <p className="text-xs font-bold text-slate-100">{streak} Days</p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl glass-panel border border-white/10 shadow-glass">
            <Zap className="w-4 h-4 fill-primary-violet text-primary-violet" />
            <div>
              <p className="text-[9px] text-slate-500 font-bold uppercase">Total XP</p>
              <p className="text-xs font-bold text-slate-100">{xp} XP</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. Today's Mission Priority Banner */}
      <motion.div 
        variants={itemVariants}
        className="p-6 rounded-3xl glass-panel border border-primary-cyan/30 relative overflow-hidden bg-gradient-to-r from-bg-dark via-slate-950 to-bg-dark shadow-glass-glow"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-cyan/10 border border-primary-cyan/30 text-primary-cyan text-[10px] font-bold uppercase tracking-widest">
              <span>TODAY&apos;S MISSION — DAY 12</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-100">
              Build a High-Performance Motion System
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Create reusable motion primitives, GPU-accelerated scroll reveals, and responsive mobile layouts using Framer Motion.
            </p>
          </div>

          <button
            onClick={() => router.push('/day/12')}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-primary-purple via-primary-indigo to-primary-cyan font-bold text-xs uppercase tracking-wider text-white shadow-glow-cyan btn-tactile flex items-center gap-2 whitespace-nowrap"
          >
            <span>Enter Challenge #12</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* 3. Grid Row: 60-Day Progress Node Map & Momentum Index */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* 60-Day Visual Tracker Console */}
        <div className="lg:col-span-2 relative p-6 rounded-3xl bg-[#0B0C0E] border border-white/10 space-y-4 shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h3 className="text-sm font-bold text-slate-200">60-Day Habit Matrix</h3>
              <p className="text-[11px] text-slate-400 font-medium">Click any day node to enter challenge or view verified proof.</p>
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
              {completedDays.length} / 60 DONE ({Math.round((completedDays.length / 60) * 100)}%)
            </span>
          </div>

          {/* Clean Sleek Nodes Grid */}
          <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 gap-2 pt-1">
            {nodes.map((node) => {
              const isMilestone = [15, 30, 45, 60].includes(node.dayNum);

              return (
                <motion.button
                  key={node.dayNum}
                  whileHover={{ scale: 1.12, zIndex: 10 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => {
                    setSelectedDayNode(node.dayNum);
                    if (node.dayNum === 12) router.push('/day/12');
                  }}
                  className={`relative aspect-square rounded-xl text-xs font-mono font-bold flex items-center justify-center transition-all cursor-pointer border ${
                    node.isActive
                      ? 'bg-white text-slate-950 border-white ring-4 ring-white/20 font-black shadow-lg scale-105 z-10'
                      : node.isDone
                        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 hover:border-emerald-400/60'
                        : isMilestone
                          ? 'bg-slate-900/80 text-slate-300 border-slate-700/80 hover:border-slate-500'
                          : 'bg-slate-950/60 text-slate-600 border-slate-900 hover:border-slate-800 hover:text-slate-400'
                  }`}
                >
                  {node.isActive ? (
                    <span>{node.dayNum}</span>
                  ) : node.isDone ? (
                    <span className="text-[11px]">✓</span>
                  ) : (
                    <span className="text-[10px]">{node.dayNum}</span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Momentum Index Speedometer Card */}
        <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-6 flex flex-col justify-between bg-bg-dark/80">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-primary-cyan uppercase tracking-widest">MOMENTUM ENGINE</span>
            <h3 className="text-sm font-bold text-slate-200">Consistency Health</h3>
          </div>

          <div className="text-center space-y-2">
            <span className="text-5xl font-heading font-black text-primary-cyan text-glow-cyan">
              {momentum}%
            </span>
            <p className="text-[10px] font-bold text-primary-teal uppercase tracking-widest">
              OPTIMAL PERFORMANCE ⚡
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold text-slate-400">
              <span>Current Pace</span>
              <span className="text-primary-cyan">Top 5% Cohort</span>
            </div>
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-white/5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${momentum}%` }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="h-full bg-gradient-to-r from-primary-purple via-primary-cyan to-accent-emerald rounded-full" 
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* 4. Grid Row: Weekly Hours Chart & Leaderboard */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Custom SVG Weekly Hours Bar Chart */}
        <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4 bg-bg-dark/80">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-slate-200">Weekly Coding Hours</h3>
              <p className="text-[11px] text-slate-400">20.6 hrs logged this week</p>
            </div>
            <BarChart2 className="w-4 h-4 text-primary-cyan" />
          </div>

          <div className="h-40 flex items-end justify-between gap-3 pt-6">
            {weeklyHours.map((w, idx) => {
              const heightPercent = (w.hours / maxHours) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[9px] font-mono text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    {w.hours}h
                  </span>
                  <div className="w-full bg-slate-900 rounded-t-lg overflow-hidden h-28 flex items-end">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${heightPercent}%` }}
                      transition={{ duration: 0.8, delay: idx * 0.08 }}
                      className="w-full bg-gradient-to-t from-primary-purple to-primary-cyan rounded-t-lg"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">{w.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Global Leaderboards */}
        <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4 bg-bg-dark/80">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-slate-200">Cohort 4 Leaderboard</h3>
              <p className="text-[11px] text-slate-400">Top builders by XP & verified proof</p>
            </div>
            <Trophy className="w-4 h-4 text-accent-gold" />
          </div>

          <div className="space-y-2.5">
            {leaderboards.map((user) => (
              <motion.div 
                key={user.rank}
                whileHover={{ x: 4 }}
                className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${
                  user.isUser 
                    ? 'bg-primary-cyan/10 border-primary-cyan/40 shadow-glow-cyan' 
                    : 'bg-slate-950/60 border-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-5 text-center text-xs font-mono font-bold ${
                    user.rank === 1 ? 'text-accent-gold' : user.rank === 2 ? 'text-slate-300' : 'text-slate-500'
                  }`}>
                    #{user.rank}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${user.color} flex items-center justify-center text-[10px] font-heading font-black text-white border border-white/20 shadow-glow-purple shrink-0`}>
                    {user.initials}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <span>{user.name}</span>
                      {user.isUser && <span className="text-[9px] px-1.5 py-0.2 rounded bg-primary-cyan/20 text-primary-cyan font-mono">YOU</span>}
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono">🔥 {user.streak}d streak</p>
                  </div>
                </div>
                <span className="text-xs font-bold font-mono text-primary-violet">{user.xp} XP</span>
              </motion.div>
            ))}
          </div>
        </div>

      </motion.div>

    </motion.div>
  );
}
