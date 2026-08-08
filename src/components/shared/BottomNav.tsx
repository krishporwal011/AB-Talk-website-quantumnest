'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Home, LayoutDashboard, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Challenge', path: '/day/12', icon: Calendar },
  ];

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-sm block md:hidden select-none">
      <div className="flex items-center justify-around px-3 py-2 rounded-full glass-panel shadow-glass-glow bg-bg-dark/85 backdrop-blur-2xl">
        {navItems.map((item) => {
          const isActive = item.path === '/' 
            ? pathname === '/' 
            : item.path === '/dashboard' 
              ? pathname === '/dashboard' 
              : pathname.startsWith('/day/');

          const Icon = item.icon;

          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className="relative flex flex-col items-center justify-center py-1.5 px-4 text-slate-400 hover:text-slate-200 transition-colors focus:outline-none btn-tactile"
            >
              {isActive && (
                <motion.div
                  layoutId="activeBottomTabPill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-purple/30 to-primary-cyan/30 border border-primary-purple/40 -z-10 shadow-glow-cyan"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}
              
              <Icon className={`w-5 h-5 transition-all duration-300 ${isActive ? 'text-primary-cyan text-glow-cyan scale-110' : 'text-slate-400'}`} />
              <span className={`text-[9px] font-bold mt-1 tracking-wider uppercase ${isActive ? 'text-primary-cyan font-extrabold' : 'text-slate-500'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
