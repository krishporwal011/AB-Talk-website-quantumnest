'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  icon: string;
  glowColor: string;
  unlockedAt?: string;
}

export interface DayProgress {
  day: number;
  status: 'completed' | 'current' | 'missed' | 'locked';
  xpReward: number;
}

export interface Checklist {
  understand: boolean;
  clone: boolean;
  code: boolean;
  commit: boolean;
  push: boolean;
  linkedin: boolean;
  submit: boolean;
}

interface ChallengeContextType {
  xp: number;
  streak: number;
  momentum: number;
  completedDays: number[];
  currentDay: number;
  achievements: Achievement[];
  checklist: Checklist;
  submission: {
    repoUrl: string;
    commitUrl: string;
    linkedinUrl: string;
    notes: string;
    isSubmitted: boolean;
    submittedAt?: string;
  } | null;
  
  // Edge Case Toggles (Simulation Controls)
  isOffline: boolean;
  isLoading: boolean;
  isEmptyProfile: boolean;
  hasNoStreak: boolean;
  hasMissedDay: boolean;
  
  // Action Handlers
  toggleChecklistItem: (key: keyof Checklist) => void;
  submitChallenge: (repoUrl: string, commitUrl: string, linkedinUrl: string, notes: string) => void;
  resetChallengeSubmission: () => void;
  toggleSimulationFlag: (flag: 'isOffline' | 'isLoading' | 'isEmptyProfile' | 'hasNoStreak' | 'hasMissedDay') => void;
  addXp: (amount: number) => void;
  unlockAchievement: (id: string) => void;
}

const defaultAchievements: Achievement[] = [
  { id: 'early-bird', title: 'Early Bird', description: 'Submit a challenge before 9:00 AM', unlocked: true, icon: '🌅', glowColor: 'rgba(6, 182, 212, 0.4)' },
  { id: 'consistency', title: 'Consistency', description: 'Maintain a 10-day coding streak', unlocked: true, icon: '🔥', glowColor: 'rgba(249, 115, 22, 0.4)' },
  { id: '100-commits', title: '100 Commits', description: 'Reach 100 commits during the challenge', unlocked: false, icon: '💻', glowColor: 'rgba(124, 58, 237, 0.4)' },
  { id: 'open-source', title: 'Open Source', description: 'Contribute code to a public starter repository', unlocked: true, icon: '🌐', glowColor: 'rgba(20, 184, 166, 0.4)' },
  { id: 'night-owl', title: 'Night Owl', description: 'Push a commit between 12:00 AM and 4:00 AM', unlocked: false, icon: '🦉', glowColor: 'rgba(139, 92, 246, 0.4)' },
];

const ChallengeContext = createContext<ChallengeContextType | undefined>(undefined);

export const ChallengeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Main States
  const [xp, setXp] = useState(2450);
  const [streak, setStreak] = useState(18);
  const [momentum, setMomentum] = useState(88); // Momentum rising index (Consistency, Completion, Quality, etc.)
  const [completedDays, setCompletedDays] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  const [currentDay] = useState(12);
  const [achievements, setAchievements] = useState<Achievement[]>(defaultAchievements);
  const [checklist, setChecklist] = useState<Checklist>({
    understand: false,
    clone: false,
    code: false,
    commit: false,
    push: false,
    linkedin: false,
    submit: false,
  });
  
  const [submission, setSubmission] = useState<ChallengeContextType['submission']>(null);

  // Simulation controls
  const [isOffline, setIsOffline] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmptyProfile, setIsEmptyProfile] = useState(false);
  const [hasNoStreak, setHasNoStreak] = useState(false);
  const [hasMissedDay, setHasMissedDay] = useState(false);

  // Load from local storage if available (mock browser safety check)
  useEffect(() => {
    const savedXp = localStorage.getItem('abtalks_xp');
    const savedStreak = localStorage.getItem('abtalks_streak');
    const savedCompleted = localStorage.getItem('abtalks_completed');
    const savedSubmission = localStorage.getItem('abtalks_submission');
    
    if (savedXp) setXp(parseInt(savedXp));
    if (savedStreak) setStreak(parseInt(savedStreak));
    if (savedCompleted) setCompletedDays(JSON.parse(savedCompleted));
    if (savedSubmission) setSubmission(JSON.parse(savedSubmission));
  }, []);

  const toggleChecklistItem = (key: keyof Checklist) => {
    setChecklist(prev => {
      const next = { ...prev, [key]: !prev[key] };
      // Auto-unlock submit checklist step if all other items are true
      if (key !== 'submit') {
        const othersDone = Object.keys(next)
          .filter(k => k !== 'submit')
          .every(k => next[k as keyof Checklist] === true);
        if (othersDone) next.submit = true;
      }
      return next;
    });
  };

  const submitChallenge = (repoUrl: string, commitUrl: string, linkedinUrl: string, notes: string) => {
    const newSubmission = {
      repoUrl,
      commitUrl,
      linkedinUrl,
      notes,
      isSubmitted: true,
      submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setSubmission(newSubmission);
    localStorage.setItem('abtalks_submission', JSON.stringify(newSubmission));
    
    // Reward XP on success
    const challengeReward = 150;
    setXp(prev => {
      const newXp = prev + challengeReward;
      localStorage.setItem('abtalks_xp', newXp.toString());
      return newXp;
    });

    // Increment streak
    setStreak(prev => {
      const newStreak = prev + 1;
      localStorage.setItem('abtalks_streak', newStreak.toString());
      return newStreak;
    });

    // Mark current day as completed
    setCompletedDays(prev => {
      if (!prev.includes(currentDay)) {
        const next = [...prev, currentDay];
        localStorage.setItem('abtalks_completed', JSON.stringify(next));
        return next;
      }
      return prev;
    });

    // Trigger random badge unlock for fun
    setTimeout(() => {
      unlockAchievement('100-commits');
    }, 1500);
  };

  const resetChallengeSubmission = () => {
    setSubmission(null);
    localStorage.removeItem('abtalks_submission');
    setChecklist({
      understand: false,
      clone: false,
      code: false,
      commit: false,
      push: false,
      linkedin: false,
      submit: false,
    });
  };

  const toggleSimulationFlag = (flag: 'isOffline' | 'isLoading' | 'isEmptyProfile' | 'hasNoStreak' | 'hasMissedDay') => {
    switch (flag) {
      case 'isOffline':
        setIsOffline(prev => !prev);
        break;
      case 'isLoading':
        setIsLoading(prev => !prev);
        break;
      case 'isEmptyProfile':
        setIsEmptyProfile(prev => !prev);
        break;
      case 'hasNoStreak':
        setHasNoStreak(prev => !prev);
        break;
      case 'hasMissedDay':
        setHasMissedDay(prev => !prev);
        break;
    }
  };

  const addXp = (amount: number) => {
    setXp(prev => {
      const newXp = prev + amount;
      localStorage.setItem('abtalks_xp', newXp.toString());
      return newXp;
    });
  };

  const unlockAchievement = (id: string) => {
    setAchievements(prev =>
      prev.map(a => (a.id === id ? { ...a, unlocked: true, unlockedAt: new Date().toLocaleDateString() } : a))
    );
  };

  return (
    <ChallengeContext.Provider
      value={{
        xp,
        streak,
        momentum,
        completedDays,
        currentDay,
        achievements,
        checklist,
        submission,
        isOffline,
        isLoading,
        isEmptyProfile,
        hasNoStreak,
        hasMissedDay,
        toggleChecklistItem,
        submitChallenge,
        resetChallengeSubmission,
        toggleSimulationFlag,
        addXp,
        unlockAchievement,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
};

export const useChallenge = () => {
  const context = useContext(ChallengeContext);
  if (!context) {
    throw new Error('useChallenge must be used within a ChallengeProvider');
  }
  return context;
};
