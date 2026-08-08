'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useChallenge } from '@/context/ChallengeContext';
import { 
  Flame, 
  Zap, 
  Bell, 
  Settings, 
  User, 
  LogOut, 
  WifiOff,
  CheckCheck,
  Menu,
  X,
  Compass,
  Layers,
  Code,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { 
    xp, 
    streak, 
    isEmptyProfile, 
    hasNoStreak, 
    isOffline
  } = useChallenge();
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');

  const activeStreak = hasNoStreak ? 0 : streak;
  const activeXp = isEmptyProfile ? 0 : xp;

  const [notificationsList, setNotificationsList] = useState([
    { id: 1, text: "🔥 Milestone Achieved: You unlocked an 18-day streak!", time: "2 hours ago", read: false, icon: "🔥" },
    { id: 2, text: "⭐ Submission Approved: Day 11 code review score: 98/100", time: "1 day ago", read: false, icon: "⭐" },
    { id: 3, text: "🏆 Rank Upgrade: You entered the Top 7% globally!", time: "2 days ago", read: true, icon: "🏆" },
  ]);

  const unreadCount = notificationsList.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotificationsList(prev => prev.map(n => ({ ...n, read: true })));
  };

  const filteredNotifications = activeTab === 'all' 
    ? notificationsList 
    : notificationsList.filter(n => !n.read);

  return (
    <header className="sticky top-0 z-40 w-full px-4 py-3 md:py-4 select-none">
      <div className="mx-auto max-w-5xl flex items-center justify-between px-3 sm:px-4 py-2.5 rounded-full glass-panel shadow-glass-glow">
        
        {/* Logo / Brand */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Brand Logo */}
          <button 
            onClick={() => router.push('/')}
            className="flex items-center gap-2 font-heading font-extrabold text-base tracking-wide focus:outline-none group btn-tactile"
          >
            <div className="flex items-center gap-1.5">
              <span className="beacon-dot" />
              <span className="gradient-text-electric text-glow-purple font-extrabold text-base sm:text-lg">ABTALKS</span>
            </div>
            <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-indigo/20 text-[9px] font-bold text-primary-cyan uppercase tracking-wider border border-primary-purple/30">
              <Sparkles className="w-2.5 h-2.5 text-primary-cyan" />
              <span>60D COHORT</span>
            </span>
          </button>

          {/* Desktop Command Palette Search Trigger Button */}
          <button
            onClick={() => {
              const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true });
              window.dispatchEvent(event);
            }}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-primary-cyan/50 text-slate-200 hover:text-white shadow-glow-cyan text-xs font-mono btn-tactile hover:bg-slate-800 transition-all cursor-pointer"
            title="Open Command Search Palette (⌘K)"
          >
            <Search className="w-3.5 h-3.5 text-primary-cyan animate-pulse" />
            <span className="text-[11px] font-extrabold text-slate-100">Search</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-950 border border-primary-cyan/40 text-[9px] font-mono text-primary-cyan font-black shadow-sm">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Navigation Menu Links (Desktop Only) */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-950/40 p-1 rounded-full border border-white/5">
          {[
            { label: 'Home', path: '/' },
            { label: 'Dashboard', path: '/dashboard' },
            { label: 'Challenge (Day 12)', path: '/day/12' },
          ].map((link) => {
            const isActive = link.path === '/' 
              ? pathname === '/' 
              : link.path === '/dashboard' 
                ? pathname === '/dashboard' 
                : pathname.startsWith('/day/');

            return (
              <button 
                key={link.path}
                onClick={() => router.push(link.path)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 btn-tactile ${
                  isActive 
                    ? 'text-white font-bold' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="navHeaderPill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-purple/30 to-primary-indigo/30 border border-primary-purple/40 -z-10 shadow-glow-purple"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Stats & Interactive Widgets */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Mobile Search Icon Button (Triggers Cmd+K Palette on Mobile) */}
          <button
            onClick={() => {
              const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true });
              window.dispatchEvent(event);
            }}
            aria-label="Search"
            className="flex md:hidden items-center justify-center w-8 h-8 rounded-full glass-panel glass-panel-hover text-primary-cyan btn-tactile"
            title="Search"
          >
            <Search className="w-4 h-4 text-primary-cyan" />
          </button>

          {/* Offline Warning Pill (Desktop/Tablet) */}
          {isOffline && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-full bg-accent-rose/20 text-[10px] font-bold text-accent-rose border border-accent-rose/40 animate-pulse shadow-glow-fire"
            >
              <WifiOff className="w-3 h-3" />
              <span className="uppercase tracking-wider">Offline</span>
            </motion.div>
          )}

          {/* Streak Indicator Widget (Desktop) */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`hidden md:flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full cursor-pointer transition-all duration-300 border btn-tactile ${
              activeStreak > 0 
                ? 'bg-accent-fire/15 text-accent-fire border-accent-fire/35 shadow-glow-fire' 
                : 'bg-slate-900/70 text-slate-500 border-slate-800'
            }`}
            onClick={() => router.push('/dashboard')}
            title={`Active Streak: ${activeStreak} days`}
            aria-label={`Active Streak: ${activeStreak} days`}
          >
            <Flame className={`w-3.5 h-3.5 ${activeStreak > 0 ? 'fill-accent-fire text-glow-fire animate-pulse' : ''}`} />
            <span className="text-[11px] sm:text-xs font-bold font-heading">{activeStreak}d</span>
          </motion.div>

          {/* XP Badge Widget (Desktop) */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-primary-indigo/20 text-primary-violet border border-primary-indigo/40 shadow-glow-purple cursor-pointer btn-tactile"
            onClick={() => router.push('/dashboard')}
            title={`Total XP: ${activeXp}`}
            aria-label={`Total XP: ${activeXp}`}
          >
            <Zap className="w-3.5 h-3.5 fill-primary-violet text-glow-purple" />
            <span className="text-[11px] sm:text-xs font-bold font-heading">{activeXp} XP</span>
          </motion.div>

          {/* Notifications Panel Trigger */}
          <div className="relative">
            <button 
              onClick={() => { setShowNotifications(!showNotifications); setShowProfileMenu(false); }}
              aria-label="Open Notifications"
              className="relative flex items-center justify-center w-8 h-8 rounded-full glass-panel glass-panel-hover text-slate-300 hover:text-white btn-tactile"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-primary-cyan border-2 border-slate-950 animate-pulse" />
              )}
            </button>

            {/* Notifications Glass Drawer */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div 
                  initial={{ opacity: 0, y: 12, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  className="absolute right-0 mt-3 w-80 max-w-[calc(100vw-2rem)] rounded-2xl glass-panel border border-white/10 p-3.5 shadow-glass-glow flex flex-col gap-3 bg-bg-dark/95 backdrop-blur-2xl z-50"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-100">Notifications</span>
                      {unreadCount > 0 && (
                        <span className="px-1.5 py-0.2 rounded-full bg-primary-cyan/20 text-primary-cyan text-[9px] font-bold">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button 
                        onClick={markAllRead}
                        className="text-[10px] text-primary-cyan hover:underline flex items-center gap-1 font-semibold"
                      >
                        <CheckCheck className="w-3 h-3" /> Mark all read
                      </button>
                    )}
                  </div>

                  {/* Filter tabs */}
                  <div className="flex bg-slate-950/60 p-0.5 rounded-lg text-[10px] font-semibold border border-white/5">
                    <button
                      onClick={() => setActiveTab('all')}
                      className={`flex-1 py-1 rounded-md transition-colors ${activeTab === 'all' ? 'bg-primary-indigo/30 text-white font-bold' : 'text-slate-400 hover:text-slate-200'}`}
                    >
                      All ({notificationsList.length})
                    </button>
                    <button
                      onClick={() => setActiveTab('unread')}
                      className={`flex-1 py-1 rounded-md transition-colors ${activeTab === 'unread' ? 'bg-primary-indigo/30 text-white font-bold' : 'text-slate-400 hover:text-slate-200'}`}
                    >
                      Unread ({unreadCount})
                    </button>
                  </div>

                  {/* Notifications list */}
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {filteredNotifications.length === 0 ? (
                      <p className="text-center py-6 text-xs text-slate-500">No unread notifications</p>
                    ) : (
                      filteredNotifications.map(n => (
                        <div 
                          key={n.id} 
                          className={`p-2.5 rounded-xl text-left transition-all border flex gap-2.5 items-start ${
                            n.read 
                              ? 'bg-transparent border-transparent opacity-75' 
                              : 'bg-primary-indigo/10 border-primary-purple/25 shadow-sm'
                          }`}
                        >
                          <span className="text-base flex-shrink-0">{n.icon}</span>
                          <div className="flex-1 space-y-0.5">
                            <p className="text-xs text-slate-200 leading-snug">{n.text}</p>
                            <span className="text-[9px] text-slate-500 block">{n.time}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Menu Trigger */}
          <div className="relative">
            <button 
              onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifications(false); }}
              className="flex items-center justify-center w-8 h-8 rounded-full border border-primary-purple/40 bg-gradient-to-br from-primary-purple via-primary-indigo to-primary-cyan text-white font-heading font-black text-xs shadow-glow-purple btn-tactile"
            >
              {isEmptyProfile ? "DS" : "KM"}
            </button>

            {/* Profile Glass Dropdown */}
            <AnimatePresence>
              {showProfileMenu && (
                <motion.div 
                  initial={{ opacity: 0, y: 12, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  className="absolute right-0 mt-3 w-60 rounded-2xl glass-panel border border-white/10 p-3.5 shadow-glass-glow flex flex-col gap-2 bg-bg-dark/95 backdrop-blur-2xl"
                >
                  <div className="px-2 py-2 border-b border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-extrabold text-slate-100">{isEmptyProfile ? "New Student" : "Krishna 👋"}</p>
                      <p className="text-[10px] text-primary-cyan font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-primary-teal" />
                        <span>{isEmptyProfile ? "Level 1 Coder" : "Level 12 Master"}</span>
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-accent-gold/15 text-accent-gold text-[9px] font-bold border border-accent-gold/20">
                      TOP 7%
                    </span>
                  </div>

                  <button 
                    onClick={() => { router.push('/dashboard'); setShowProfileMenu(false); }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-all btn-tactile"
                  >
                    <div className="flex items-center gap-2.5">
                      <User className="w-3.5 h-3.5 text-primary-purple" />
                      <span>My Dashboard</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  </button>

                  <button 
                    onClick={() => { router.push('/day/12'); setShowProfileMenu(false); }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-all btn-tactile"
                  >
                    <div className="flex items-center gap-2.5">
                      <Settings className="w-3.5 h-3.5 text-primary-purple" />
                      <span>Challenge & Tracks</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  </button>

                  <button 
                    onClick={() => { router.push('/'); setShowProfileMenu(false); }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs text-accent-rose hover:bg-accent-rose/10 transition-all btn-tactile"
                  >
                    <div className="flex items-center gap-2.5">
                      <LogOut className="w-3.5 h-3.5 text-accent-rose" />
                      <span>Sign Out</span>
                    </div>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* 3D Sliding Glass Sidebar Drawer */}
      <AnimatePresence>
        {showSidebar && (
          <>
            {/* Backdrop Fade & Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSidebar(false)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
            />

            {/* 3D Glass Drawer Panel */}
            <motion.div
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-80 max-w-[85vw] bg-bg-dark/95 border-r border-white/10 shadow-glass-glow backdrop-blur-3xl p-6 flex flex-col justify-between overflow-y-auto"
            >
              <div className="space-y-6">
                {/* Header with Close Trigger */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="beacon-dot" />
                    <span className="gradient-text-electric text-glow-purple font-extrabold text-lg">ABTALKS</span>
                  </div>
                  <button
                    onClick={() => setShowSidebar(false)}
                    className="p-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white btn-tactile"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* User Stats Card */}
                <div className="p-4 rounded-2xl glass-panel border border-primary-cyan/30 space-y-2 bg-gradient-to-br from-bg-dark to-slate-950 shadow-glow-cyan">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                    <span>{isEmptyProfile ? "New Student" : "Krishna Murthy"}</span>
                    <span className="px-2 py-0.5 rounded-full bg-accent-gold/20 text-accent-gold text-[9px] font-mono font-bold">TOP 7%</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono font-bold text-slate-400 pt-1">
                    <span className="flex items-center gap-1 text-accent-fire"><Flame className="w-3.5 h-3.5 fill-accent-fire" /> {activeStreak}d Streak</span>
                    <span className="flex items-center gap-1 text-primary-violet"><Zap className="w-3.5 h-3.5 fill-primary-violet" /> {activeXp} XP</span>
                  </div>
                </div>

                {/* Main Navigation Links */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-primary-cyan uppercase tracking-wider">NAVIGATION CONSOLE</span>
                  <div className="space-y-1">
                    {[
                      { label: 'Home Page', path: '/', icon: Compass },
                      { label: 'Studio Dashboard', path: '/dashboard', icon: User },
                      { label: 'Day 12 Challenge', path: '/day/12', icon: Code },
                    ].map((nav) => {
                      const Icon = nav.icon;
                      const isActive = pathname === nav.path;

                      return (
                        <button
                          key={nav.path}
                          onClick={() => {
                            router.push(nav.path);
                            setShowSidebar(false);
                          }}
                          className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-xs font-bold transition-all btn-tactile ${
                            isActive
                              ? 'bg-gradient-to-r from-primary-purple/30 to-primary-indigo/30 border border-primary-cyan/40 text-white shadow-glow-purple'
                              : 'bg-slate-950/60 border border-slate-900 text-slate-400 hover:text-white hover:border-slate-800'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="w-4 h-4 text-primary-cyan" />
                            <span>{nav.label}</span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tracks list */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-primary-purple uppercase tracking-wider">TRACKS & SPECIALIZATIONS</span>
                  <div className="space-y-1.5 text-xs text-slate-400 font-medium">
                    <div className="p-2.5 rounded-xl bg-slate-950/40 border border-slate-900 flex items-center justify-between">
                      <span>Next.js 15 Fullstack</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-bold">ACTIVE</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950/40 border border-slate-900 flex items-center justify-between opacity-60">
                      <span>Flutter Mobile Track</span>
                      <span className="text-[9px] font-mono text-slate-500">LOCKED</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Launcher */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <button
                  onClick={() => {
                    router.push('/day/12');
                    setShowSidebar(false);
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-purple via-primary-indigo to-primary-cyan text-xs font-extrabold uppercase tracking-wider text-white shadow-glow-cyan btn-tactile text-center block"
                >
                  Enter Day 12 Challenge →
                </button>
                <p className="text-[9px] text-center font-mono text-slate-500">ABTALKS 60D COHORT SYSTEM</p>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
