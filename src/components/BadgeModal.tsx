import React from 'react';
import {
  X,
  Award,
  Search,
  Layers,
  Monitor,
  Mic,
  ShieldCheck,
  Brain,
  Cpu,
  Compass,
  Trophy,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { Badge } from '../types/game';

interface BadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  badges: Badge[];
  score: number;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Search,
  Layers,
  Monitor,
  Mic,
  ShieldCheck,
  Brain,
  Cpu,
  Compass,
  Trophy,
};

export const BadgeModal: React.FC<BadgeModalProps> = ({ isOpen, onClose, badges, score }) => {
  if (!isOpen) return null;

  const unlockedCount = badges.filter((b) => b.unlocked).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border-3 border-slate-900 shadow-[8px_8px_0px_#0f172a] max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="p-5 border-b-2 border-slate-900 flex items-center justify-between bg-amber-50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-400 text-slate-950 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a]">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-display font-black text-slate-900">
                Academy Achievement Badges
              </h2>
              <div className="text-xs text-slate-600 flex items-center gap-2 mt-0.5 font-bold">
                <span>{unlockedCount} of 9 Unlocked</span>
                <span>·</span>
                <span className="font-mono text-amber-800 bg-amber-200 px-1.5 py-0.5 rounded border border-slate-900">{score} Total Points</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Badges Grid */}
        <div className="p-5 overflow-y-auto space-y-3">
          {badges.map((badge) => {
            const Icon = iconMap[badge.icon] || Award;
            return (
              <div
                key={badge.id}
                className={`p-3.5 rounded-xl border flex items-start gap-3.5 transition-all ${
                  badge.unlocked
                    ? 'bg-amber-50/50 border-amber-300'
                    : 'bg-slate-50/60 border-slate-200 opacity-60'
                }`}
              >
                <div
                  className={`p-2.5 rounded-xl shrink-0 ${
                    badge.unlocked
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  {badge.unlocked ? <Icon className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      {badge.title}
                      {badge.unlocked && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" />
                      )}
                    </h3>
                    <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
                      {badge.subtitle}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Keep completing challenges across all levels to unlock your full badge cabinet!
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 text-xs font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
