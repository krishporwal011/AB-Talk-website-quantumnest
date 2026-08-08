'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 380, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only activate custom cursor on desktop pointer devices
    const checkDesktop = () => {
      const isDesktopDevice = window.innerWidth >= 1024 && window.matchMedia('(pointer: fine)').matches;
      setIsDesktop(isDesktopDevice);
      if (isDesktopDevice) {
        document.body.classList.add('has-custom-cursor');
      } else {
        document.body.classList.remove('has-custom-cursor');
      }
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('btn-tactile')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', checkDesktop);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.body.classList.remove('has-custom-cursor');
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isDesktop || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden select-none">
      {/* Outer ambient glowing aura ring */}
      <motion.div
        className={`absolute rounded-full border transition-all duration-200 ${
          isHovered 
            ? 'w-12 h-12 -ml-6 -mt-6 border-primary-cyan/60 bg-primary-cyan/10 backdrop-blur-[2px] shadow-glow-cyan' 
            : 'w-7 h-7 -ml-3.5 -mt-3.5 border-primary-purple/40 bg-primary-purple/5 shadow-glow-purple'
        }`}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />
      {/* Center sharp pointer dot */}
      <motion.div
        className={`absolute w-1.5 h-1.5 -ml-0.75 -mt-0.75 rounded-full ${
          isHovered ? 'bg-primary-cyan shadow-glow-cyan' : 'bg-primary-violet'
        }`}
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
    </div>
  );
}
