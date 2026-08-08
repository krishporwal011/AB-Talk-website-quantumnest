'use client';

import React, { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useChallenge, Checklist } from '@/context/ChallengeContext';
import { useForm } from 'react-hook-form';
import { 
  ArrowLeft, 
  Clock, 
  Zap, 
  HelpCircle, 
  Youtube, 
  FileText, 
  Github, 
  Image as ImageIcon,
  CheckSquare, 
  Square,
  UploadCloud,
  FileCode,
  Sparkles,
  Award,
  RefreshCw,
  ArrowRight,
  ShieldAlert,
  Flame
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from '@/components/motion/MagneticButton';

interface PageProps {
  params: Promise<{ id: string }>;
}

interface FormInputs {
  githubUrl: string;
  commitUrl: string;
  linkedinUrl: string;
  liveUrl: string;
  notes: string;
}

export default function ChallengePage({ params }: PageProps) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const id = unwrappedParams.id || '12';

  const { 
    checklist, 
    toggleChecklistItem, 
    submission, 
    submitChallenge, 
    resetChallengeSubmission, 
    streak,
    isOffline
  } = useChallenge();

  const [isScanningCode, setIsScanningCode] = useState(false);
  const [scanStep, setScanStep] = useState<string>('');
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const checklistItems: { id: keyof Checklist; text: string }[] = [
    { id: 'understand', text: 'Understand challenge requirements and target specifications' },
    { id: 'clone', text: 'Clone repository and setup local environment' },
    { id: 'code', text: 'Implement custom motion hooks & GPU-accelerated scroll transforms' },
    { id: 'commit', text: 'Commit code changes with descriptive git message' },
    { id: 'push', text: 'Push commit to remote GitHub repository' },
    { id: 'linkedin', text: 'Draft & publish LinkedIn progress update with hashtag #ABTalks' },
    { id: 'submit', text: 'Submit proof links to claim +150 XP and extend streak' },
  ];

  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    defaultValues: {
      githubUrl: submission?.repoUrl || '',
      commitUrl: submission?.commitUrl || '',
      linkedinUrl: submission?.linkedinUrl || '',
      liveUrl: 'https://my-app.vercel.app',
      notes: submission?.notes || ''
    }
  });

  const onFormSubmit = (data: FormInputs) => {
    setIsScanningCode(true);
    setScanStep('Connecting AST Scanner...');

    setTimeout(() => {
      setScanStep('Verifying Git Commit Hash & Diff...');
    }, 600);

    setTimeout(() => {
      setScanStep('Auditing Code Quality...');
    }, 1200);

    setTimeout(() => {
      setIsScanningCode(false);
      submitChallenge(
        data.githubUrl,
        data.commitUrl,
        data.linkedinUrl,
        data.notes || 'Day 12 performance optimization complete'
      );
    }, 1800);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-8 py-6 max-w-4xl mx-auto select-none">
      
      {/* Cinematic Submission Celebration Overlay */}
      <AnimatePresence>
        {submission?.isSubmitted && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-black/95 backdrop-blur-2xl select-none text-center space-y-8"
          >
            {/* Particle Emitter */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 45 }).map((_, i) => {
                const colors = ['#6C63FF', '#7C3AED', '#14B8A6', '#06B6D4', '#fbbf24', '#f97316'];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                const randomLeft = Math.random() * 100;
                const randomDelay = Math.random() * 3.5;
                return (
                  <div 
                    key={i} 
                    className="absolute w-2 h-2 rounded-full opacity-70 animate-confetti-fall"
                    style={{
                      left: `${randomLeft}%`,
                      top: `-20px`,
                      backgroundColor: randomColor,
                      animationDelay: `${randomDelay}s`,
                    }}
                  />
                );
              })}
            </div>

            {/* Glowing Dot Expanding */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.5, 1] }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-purple via-primary-cyan to-primary-teal flex items-center justify-center text-3xl shadow-glow-cyan"
            >
              🔥
            </motion.div>

            {/* Sequential Phrase Focus */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-2"
            >
              <span className="text-xs font-bold font-mono text-primary-cyan tracking-widest uppercase">MISSION SUCCESS</span>
              <h2 className="text-4xl sm:text-6xl font-heading font-black text-slate-100 tracking-tight">
                DAY {id} COMPLETE
              </h2>
            </motion.div>

            {/* Stats Badge Highlights */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex items-center gap-6 p-4 rounded-2xl glass-panel border border-white/10 shadow-glass-glow bg-bg-dark/80"
            >
              <div className="space-y-0.5">
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Reward</p>
                <p className="text-xl font-heading font-extrabold text-primary-violet flex items-center gap-1">
                  <Zap className="w-4 h-4 fill-primary-violet text-glow-purple" />
                  <span>+150 XP</span>
                </p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="space-y-0.5">
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Active Streak</p>
                <p className="text-xl font-heading font-extrabold text-accent-fire flex items-center gap-1">
                  <Flame className="w-4 h-4 fill-accent-fire text-glow-fire" />
                  <span>🔥 {streak} Days</span>
                </p>
              </div>
            </motion.div>

            {/* "Keep Going" Subtext & Continue CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="space-y-4 pt-2"
            >
              <p className="text-xs text-slate-400 font-bold tracking-wide italic">&ldquo;Keep going. You are building proof of work.&rdquo;</p>
              
              <div className="flex flex-col gap-3 items-center">
                <MagneticButton onClick={() => { router.push('/dashboard'); }}>
                  <div className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-primary-purple via-primary-indigo to-primary-cyan text-xs font-extrabold uppercase tracking-widest text-white shadow-glow-cyan group">
                    <span>CONTINUE TO DAY 13 →</span>
                  </div>
                </MagneticButton>

                <button
                  onClick={resetChallengeSubmission}
                  className="text-[10px] text-slate-500 hover:text-slate-300 underline font-semibold py-1"
                >
                  Reset & resubmit task
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Navigation */}
      <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-4">
        <button 
          onClick={() => router.push('/dashboard')}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors btn-tactile"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
          <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 flex items-center gap-1">
            <Clock className="w-3 h-3 text-primary-cyan" /> 45 mins
          </span>
          <span className="px-2.5 py-1 rounded-full bg-primary-violet/10 border border-primary-violet/30 text-primary-violet flex items-center gap-1">
            <Zap className="w-3 h-3 fill-primary-violet" /> +150 XP
          </span>
        </div>
      </div>

      {/* Challenge Title Banner */}
      <div className="p-4 sm:p-6 rounded-3xl glass-panel border border-white/10 space-y-4 bg-bg-dark/95 shadow-glass-glow">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-[10px] font-mono font-bold text-primary-cyan bg-primary-cyan/10 border border-primary-cyan/20 px-3 py-1 rounded-full uppercase tracking-wider shadow-glow-cyan w-fit">
            DAY {id} / 60 — MOTION SYSTEM
          </span>
          <span className="text-xs text-accent-emerald font-bold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> High Priority Task
          </span>
        </div>

        <h1 className="text-xl sm:text-3xl font-heading font-extrabold text-slate-100">
          Build a High-Performance Motion System
        </h1>

        <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
          Create reusable motion primitives, GPU-accelerated scroll reveals, and responsive mobile layouts using Framer Motion.
        </p>

        {/* Resources list */}
        <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3">
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-bold text-slate-300 hover:text-white btn-tactile">
            <Youtube className="w-3.5 h-3.5 text-red-500" /> Watch Video Tutorial
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-bold text-slate-300 hover:text-white btn-tactile">
            <FileText className="w-3.5 h-3.5 text-primary-cyan" /> Starter Code
          </a>
        </div>
      </div>

      {/* Sub-Task Checklist */}
      <div className="p-4 sm:p-6 rounded-3xl glass-panel border border-white/10 space-y-4 bg-bg-dark/95">
        <h3 className="text-sm font-bold text-slate-200">Task Completion Checklist</h3>

        <div className="space-y-2">
          {checklistItems.map((item) => {
            const isCompleted = checklist[item.id];
            return (
              <motion.button
                key={item.id}
                type="button"
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleChecklistItem(item.id)}
                className={`w-full p-3 sm:p-3.5 rounded-2xl border text-left flex items-start gap-2.5 sm:gap-3 transition-all ${
                  isCompleted
                    ? 'bg-slate-900/60 border-slate-800 text-slate-400 line-through'
                    : 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-primary-purple/40'
                }`}
              >
                {isCompleted ? (
                  <CheckSquare className="w-4 h-4 text-primary-cyan shrink-0 mt-0.5 animate-bounce" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                )}
                <span className="text-xs font-medium leading-relaxed">{item.text}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Proof of Work Submission Form */}
      <form onSubmit={handleSubmit(onFormSubmit)} className="p-4 sm:p-6 rounded-3xl glass-panel border border-white/10 space-y-5 sm:space-y-6 bg-bg-dark/95 shadow-glass-glow">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-slate-200">Submit Proof of Work</h3>
          <p className="text-xs text-slate-400">Provide public URLs so your submission can be audited by AI and indexed for recruiters.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5 text-primary-purple" /> GitHub Repository URL *
            </label>
            <input 
              {...register('githubUrl', { 
                required: 'GitHub Repository URL is required',
                validate: (val) => val.includes('github.com') || 'Must be a valid GitHub URL (e.g. https://github.com/user/repo)'
              })}
              type="url"
              placeholder="https://github.com/username/repo"
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-slate-200 focus:outline-none"
            />
            {errors.githubUrl && <span className="text-[10px] text-accent-rose font-bold block pt-0.5">{errors.githubUrl.message}</span>}
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5">
              <FileCode className="w-3.5 h-3.5 text-primary-cyan" /> Commit Hash / Diff URL *
            </label>
            <input 
              {...register('commitUrl', { 
                required: 'Commit Diff URL is required',
                validate: (val) => val.includes('github.com') || 'Must be a valid GitHub commit URL'
              })}
              type="url"
              placeholder="https://github.com/username/repo/commit/7da5b23"
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-slate-200 focus:outline-none"
            />
            {errors.commitUrl && <span className="text-[10px] text-accent-rose font-bold block pt-0.5">{errors.commitUrl.message}</span>}
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary-teal" /> LinkedIn Proof Post URL *
            </label>
            <input 
              {...register('linkedinUrl', { 
                required: 'LinkedIn Post URL is required',
                validate: (val) => val.includes('linkedin.com') || 'Must be a valid LinkedIn post URL'
              })}
              type="url"
              placeholder="https://linkedin.com/posts/activity-12345"
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-slate-200 focus:outline-none"
            />
            {errors.linkedinUrl && <span className="text-[10px] text-accent-rose font-bold block pt-0.5">{errors.linkedinUrl.message}</span>}
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-accent-gold" /> Live Deployment URL (Optional)
            </label>
            <input 
              {...register('liveUrl')}
              type="url"
              placeholder="https://my-app.vercel.app"
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-slate-200 focus:outline-none"
            />
          </div>
        </div>

        {/* Drag and Drop Screenshot Uploader */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-primary-cyan" /> Project Screenshot (Optional)
          </label>
          <div 
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                setUploadedFile(e.dataTransfer.files[0]);
              }
            }}
            className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer relative ${
              dragOver ? 'border-primary-cyan bg-primary-cyan/10' : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
            }`}
          >
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileUpload} 
              className="absolute inset-0 opacity-0 cursor-pointer" 
            />
            <UploadCloud className="w-6 h-6 text-slate-400 mx-auto mb-2 animate-pulse" />
            {uploadedFile ? (
              <span className="text-xs font-bold text-primary-teal">File Attached: {uploadedFile.name}</span>
            ) : (
              <span className="text-xs text-slate-400 font-medium">Drag & drop your screenshot here, or click to browse</span>
            )}
          </div>
        </div>

        {/* Submission Button */}
        <button
          type="submit"
          disabled={isScanningCode}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-primary-purple via-primary-indigo to-primary-cyan text-xs font-extrabold uppercase tracking-widest text-white shadow-glow-cyan btn-tactile disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isScanningCode ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-white" />
              <span>{scanStep}</span>
            </>
          ) : (
            <>
              <span>Submit Day #12 Proof & Claim XP</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

    </div>
  );
}
