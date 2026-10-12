import React from 'react';
import { Volume2, VolumeX, Award } from 'lucide-react';
import { LevelId, Badge } from '../types/game';

interface HeaderProps {
  currentLevel: LevelId;
  completedLevels: LevelId[];
  score: number;
  badges: Badge[];
  soundEnabled: boolean;
  onToggleSound: () => void;
  onNavigate: (level: LevelId) => void;
  onOpenBadges: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLevel,
  score,
  badges,
  soundEnabled,
  onToggleSound,
  onNavigate,
  onOpenBadges,
}) => {
  const unlockedCount = badges.filter((b) => b.unlocked).length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-8">
        {/* Zone 1: Single text wordmark */}
        <button
          onClick={() => onNavigate(1)}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="font-display font-black text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors whitespace-nowrap shrink-0">
            Presentation Quest
          </span>
        </button>

        {/* Zone 2: 4–5 clean single-line navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onNavigate(1)}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 cursor-pointer ${
              currentLevel === 1 || currentLevel === 2 || currentLevel === 3 || currentLevel === 4 || currentLevel === 5
                ? 'text-amber-600 font-semibold'
                : ''
            }`}
          >
            Core Levels
          </button>
          <button
            onClick={() => onNavigate(6)}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 cursor-pointer ${
              currentLevel === 6 ? 'text-amber-600 font-semibold' : ''
            }`}
          >
            Think First
          </button>
          <button
            onClick={() => onNavigate(7)}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 cursor-pointer ${
              currentLevel === 7 ? 'text-amber-600 font-semibold' : ''
            }`}
          >
            AI Collaborate
          </button>
          <button
            onClick={() => onNavigate(8)}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 cursor-pointer ${
              currentLevel === 8 ? 'text-amber-600 font-semibold' : ''
            }`}
          >
            Reflect
          </button>
          <button
            onClick={() => onNavigate(9)}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 cursor-pointer ${
              currentLevel === 9 ? 'text-amber-600 font-semibold' : ''
            }`}
          >
            Final Boss
          </button>
          <button
            onClick={() => onNavigate('checklist')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 cursor-pointer ${
              currentLevel === 'checklist' ? 'text-amber-600 font-semibold' : ''
            }`}
          >
            Checklist
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Mute audio' : 'Enable audio'}
            className="p-2 text-slate-500 hover:text-slate-900 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
            title={soundEnabled ? 'Sound On' : 'Sound Muted'}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
          </button>

          <button
            onClick={onOpenBadges}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all font-medium text-xs sm:text-sm whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>Badges: {unlockedCount}/9</span>
            <span className="hidden sm:inline text-slate-400">·</span>
            <span className="hidden sm:inline text-amber-300 font-mono">{score} pts</span>
          </button>
        </div>
      </div>
    </header>
  );
};
