'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useChallenge } from '@/context/ChallengeContext';
import { 
  Search, 
  Home, 
  LayoutDashboard, 
  Calendar, 
  Wifi, 
  WifiOff, 
  Loader2, 
  UserMinus, 
  ShieldAlert, 
  Sparkles, 
  RotateCcw, 
  CornerDownLeft,
  Command,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const {
    isOffline,
    isLoading,
    isEmptyProfile,
    hasNoStreak,
    hasMissedDay,
    toggleSimulationFlag,
    resetChallengeSubmission,
    addXp,
    unlockAchievement
  } = useChallenge();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const items = [
    // Navigation
    { id: 'nav-home', label: 'Go to Landing Page', category: 'Navigation', icon: Home, action: () => { router.push('/'); setIsOpen(false); } },
    { id: 'nav-dash', label: 'Go to Dashboard', category: 'Navigation', icon: LayoutDashboard, action: () => { router.push('/dashboard'); setIsOpen(false); } },
    { id: 'nav-day12', label: 'Go to Day 12 Challenge', category: 'Navigation', icon: Calendar, action: () => { router.push('/day/12'); setIsOpen(false); } },
    
    // Simulation / Edge cases
    { 
      id: 'sim-offline', 
      label: `Simulate: ${isOffline ? 'Online Mode' : 'Offline Mode'}`, 
      category: 'Simulate Edge Cases', 
      icon: isOffline ? Wifi : WifiOff, 
      action: () => toggleSimulationFlag('isOffline') 
    },
    { 
      id: 'sim-loading', 
      label: `Simulate: ${isLoading ? 'Loaded State' : 'Loading Skeletons'}`, 
      category: 'Simulate Edge Cases', 
      icon: Loader2, 
      action: () => toggleSimulationFlag('isLoading') 
    },
    { 
      id: 'sim-empty', 
      label: `Simulate: ${isEmptyProfile ? 'Krishna Profile (Full)' : 'Empty / New Profile'}`, 
      category: 'Simulate Edge Cases', 
      icon: UserMinus, 
      action: () => toggleSimulationFlag('isEmptyProfile') 
    },
    { 
      id: 'sim-nostreak', 
      label: `Simulate: ${hasNoStreak ? 'Restore 18-Day Streak' : 'No Streak (New user)'}`, 
      category: 'Simulate Edge Cases', 
      icon: ShieldAlert, 
      action: () => toggleSimulationFlag('hasNoStreak') 
    },
    { 
      id: 'sim-missed', 
      label: `Simulate: ${hasMissedDay ? 'Restore Completed State' : 'Missed Day / Broken Streak'}`, 
      category: 'Simulate Edge Cases', 
      icon: ShieldAlert, 
      action: () => toggleSimulationFlag('hasMissedDay') 
    },
    
    // Actions
    { id: 'act-reset', label: 'Reset Day 12 Progress', category: 'Actions', icon: RotateCcw, action: () => { resetChallengeSubmission(); setIsOpen(false); } },
    { id: 'act-xp', label: 'Earn +500 XP Boost', category: 'Actions', icon: Zap, action: () => { addXp(500); } },
    { id: 'act-badge', label: 'Unlock Night Owl Achievement', category: 'Actions', icon: Sparkles, action: () => { unlockAchievement('night-owl'); } },
  ];

  const filtered = items.filter(item => 
    item.label.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[activeIndex]) {
        filtered[activeIndex].action();
      }
    }
  };

  useEffect(() => {
    setActiveIndex(0);
  }, [search]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md select-none"
          >
            <motion.div 
              initial={{ scale: 0.94, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 15 }}
              transition={{ type: 'spring', stiffness: 450, damping: 30 }}
              ref={containerRef}
              className="w-full max-w-lg overflow-hidden rounded-3xl glass-panel border border-white/10 shadow-glass-glow flex flex-col max-h-[80vh] bg-bg-dark/95 backdrop-blur-2xl"
            >
              {/* Header input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-slate-950/40">
                <Command className="w-5 h-5 text-primary-purple animate-pulse" />
                <input 
                  type="text"
                  placeholder="Search tracks, jump pages, or toggle edge cases..."
                  className="flex-1 bg-transparent text-xs sm:text-sm outline-none text-slate-100 placeholder-slate-500 font-medium"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-[10px] text-slate-400 hover:text-slate-200 bg-slate-900 px-2 py-1 rounded-md border border-slate-800 font-mono"
                >
                  ESC
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {filtered.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-500">
                    No matching commands for &quot;{search}&quot;
                  </div>
                ) : (
                  (() => {
                    let currentCategory = '';
                    return filtered.map((item, idx) => {
                      const showCategory = item.category !== currentCategory;
                      if (showCategory) currentCategory = item.category;
                      
                      const Icon = item.icon;
                      const isActive = idx === activeIndex;

                      return (
                        <div key={item.id}>
                          {showCategory && (
                            <div className="px-3 py-1.5 text-[9px] font-bold text-primary-cyan tracking-widest uppercase opacity-80">
                              {item.category}
                            </div>
                          )}
                          <button
                            onClick={item.action}
                            onMouseEnter={() => setActiveIndex(idx)}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all duration-150 btn-tactile ${
                              isActive 
                                ? 'bg-gradient-to-r from-primary-indigo/30 to-primary-purple/20 text-white border border-primary-purple/40 shadow-glow-purple' 
                                : 'text-slate-300 hover:text-slate-100 hover:bg-white/5 border border-transparent'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-1.5 rounded-lg ${isActive ? 'bg-primary-purple/40 text-white' : 'bg-slate-900/60 text-slate-400'}`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <span className="text-xs font-semibold">{item.label}</span>
                            </div>
                            
                            {isActive && (
                              <span className="flex items-center gap-1 text-[10px] text-primary-cyan font-mono opacity-90">
                                <span>Select</span>
                                <CornerDownLeft className="w-3 h-3" />
                              </span>
                            )}
                          </button>
                        </div>
                      );
                    });
                  })()
                )}
              </div>

              {/* Footer info bar */}
              <div className="px-4 py-2.5 bg-slate-950/60 border-t border-white/10 text-[10px] text-slate-400 flex items-center justify-between font-mono">
                <div className="flex items-center gap-4">
                  <span><kbd className="bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">↑↓</kbd> Navigate</span>
                  <span><kbd className="bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">↵</kbd> Confirm</span>
                </div>
                <span className="text-primary-purple font-bold">ABTalks 60D</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
