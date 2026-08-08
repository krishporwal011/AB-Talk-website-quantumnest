'use client';

import React, { useEffect, useRef } from 'react';

export default function BackgroundEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.05;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.05;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const codeSymbols = ['{}', '</>', '=>', 'async', 'import', 'const', 'React', 'XP', '🔥', 'Next.js', 'state', 'props'];
    const particles = Array.from({ length: 48 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      symbol: codeSymbols[Math.floor(Math.random() * codeSymbols.length)],
      speedY: 0.25 + Math.random() * 0.4,
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: 0.38 + Math.random() * 0.12, // 40-45% Opacity Range
      size: 12 + Math.floor(Math.random() * 6),
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;

        if (p.y < -30) {
          p.y = canvas.height + 30;
          p.x = Math.random() * canvas.width;
        }

        ctx.font = `bold ${p.size}px monospace`;
        ctx.fillStyle = `rgba(167, 139, 250, ${p.opacity})`;
        ctx.fillText(p.symbol, p.x + mouseX, p.y + mouseY);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Base Dark Background */}
      <div className="absolute inset-0 bg-[#050505]" />
      
      {/* Floating Canvas Particle Layer — Set to 40-45% Opacity */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-45" />

      {/* Atmospheric Glowing Color Blobs (40-45% Opacity) */}
      <div 
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-45 pointer-events-none animate-blob-1"
        style={{
          background: 'radial-gradient(circle, rgba(108, 99, 255, 0.55) 0%, transparent 70%)',
          filter: 'blur(55px)',
        }}
      />
      <div 
        className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full opacity-40 pointer-events-none animate-blob-2"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.48) 0%, transparent 70%)',
          filter: 'blur(65px)',
        }}
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-35 pointer-events-none animate-blob-3"
        style={{
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.42) 0%, transparent 70%)',
          filter: 'blur(75px)',
        }}
      />
    </div>
  );
}
