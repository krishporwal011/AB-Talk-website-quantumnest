'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface StickyStoryProps {
  children: (progress: MotionValue<number>) => React.ReactNode;
  heightInVh?: number;
  className?: string;
}

export function StickyStory({
  children,
  heightInVh = 300,
  className = ''
}: StickyStoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <div 
      ref={containerRef} 
      style={{ height: `${heightInVh}vh` }} 
      className={`relative w-full ${className}`}
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {children(scrollYProgress)}
      </div>
    </div>
  );
}

interface ParallaxCardProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // e.g. -50 to 50
  rotateDeg?: number;
}

export function ParallaxCard({
  children,
  className = '',
  speed = 40,
  rotateDeg = 2
}: ParallaxCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [-speed, speed]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-rotateDeg, rotateDeg]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y, rotate }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
