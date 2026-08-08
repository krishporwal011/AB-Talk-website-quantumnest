'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 400, damping: 30 });
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setScrollPercent(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  // Calculate current challenge day based on scroll depth (1 to 60)
  const currentScrollDay = Math.max(1, Math.min(60, Math.ceil((scrollPercent / 100) * 60)));

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3 select-none pointer-events-none">
      {/* Minimal Day tracker badge */}
      <motion.div 
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: scrollPercent > 2 ? 1 : 0, x: scrollPercent > 2 ? 0 : 10 }}
        className="px-2 py-1 rounded-full glass-panel text-[9px] font-mono font-bold text-primary-cyan border border-primary-cyan/30 shadow-glow-cyan"
      >
        DAY {currentScrollDay < 10 ? `0${currentScrollDay}` : currentScrollDay} / 60
      </motion.div>

      {/* Thin Vertical Progress Track */}
      <div className="relative w-0.5 h-36 bg-slate-900/80 rounded-full overflow-hidden border border-white/5">
        <motion.div 
          className="absolute top-0 left-0 right-0 bg-gradient-to-b from-primary-purple via-primary-indigo to-primary-cyan shadow-glow-cyan origin-top"
          style={{ scaleY }}
        />
      </div>
    </div>
  );
}
