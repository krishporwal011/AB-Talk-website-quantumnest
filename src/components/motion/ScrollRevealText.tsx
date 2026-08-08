'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollRevealTextProps {
  children: React.ReactNode;
  className?: string;
  startRange?: number;
  endRange?: number;
}

export function ScrollRevealText({
  children,
  className = '',
  startRange = 0.1,
  endRange = 0.4
}: ScrollRevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, startRange, endRange, 0.9],
    [0, 1, 1, 0]
  );
  
  const y = useTransform(
    scrollYProgress,
    [0, startRange, endRange, 0.9],
    [40, 0, 0, -30]
  );

  const blur = useTransform(
    scrollYProgress,
    [0, startRange, endRange, 0.9],
    ['blur(10px)', 'blur(0px)', 'blur(0px)', 'blur(10px)']
  );

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, filter: blur }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function SplitText({ text, className = '', delay = 0 }: SplitTextProps) {
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay * i },
    }),
  };

  const childVariants = {
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring' as const,
        damping: 18,
        stiffness: 140,
      },
    },
    hidden: {
      opacity: 0,
      y: 25,
      filter: 'blur(8px)',
      transition: {
        type: 'spring' as const,
        damping: 18,
        stiffness: 140,
      },
    },
  };

  return (
    <motion.div
      className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {words.map((word, idx) => (
        <motion.span key={idx} variants={childVariants} className="inline-block">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
