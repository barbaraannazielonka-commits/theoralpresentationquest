import React from 'react';
import {
  AlertTriangle,
  Layers,
  Monitor,
  Mic,
  ShieldCheck,
  Brain,
  Cpu,
  Compass,
  Trophy,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { LevelId, Badge } from '../types/game';
import questAcademyHeroImg from '../assets/images/quest_academy_hero_1791786604212.jpg';

interface QuestMapProps {
  currentLevel: LevelId;
  completedLevels: LevelId[];
  badges: Badge[];
  onSelectLevel: (level: LevelId) => void;
}

export const QuestMap: React.FC<QuestMapProps> = ({
  currentLevel,
  completedLevels,
  badges,
  onSelectLevel,
}) => {
  const levelsConfig = [
    {
      id: 1 as LevelId,
      title: 'Level 1: The Presentation Disaster',
      tagline: 'Diagnose communication catastrophes',
      badgeTitle: 'Presentation Detective',
      icon: AlertTriangle,
      color: 'border-rose-400 bg-rose-50 text-rose-700',
      activeColor: 'ring-3 ring-rose-500 bg-rose-100 shadow-md',
    },
    {
      id: 2 as LevelId,
      title: 'Level 2: Build a Presentation That Makes Sense',
      tagline: 'Organise sequence from Hook to References',
      badgeTitle: 'Structure Architect',
      icon: Layers,
      color: 'border-blue-400 bg-blue-50 text-blue-700',
      activeColor: 'ring-3 ring-blue-500 bg-blue-100 shadow-md',
    },
    {
      id: 3 as LevelId,
      title: 'Level 3: The Visual Villain',
      tagline: 'Rescue overloaded slides into visual aids',
      badgeTitle: 'Slide Saver',
      icon: Monitor,
      color: 'border-violet-400 bg-violet-50 text-violet-700',
      activeColor: 'ring-3 ring-violet-500 bg-violet-100 shadow-md',
    },
    {
      id: 4 as LevelId,
      title: 'Level 4: The Speaking Showdown',
      tagline: 'Pacing, pauses, palm cards & inclusive delivery',
      badgeTitle: 'Confident Communicator',
      icon: Mic,
      color: 'border-amber-400 bg-amber-50 text-amber-700',
      activeColor: 'ring-3 ring-amber-500 bg-amber-100 shadow-md',
    },
    {
      id: 5 as LevelId,
      title: 'Level 5: The Evidence Detective',
      tagline: 'Distinguish facts from hype & oral citations',
      badgeTitle: 'Evidence Detective',
      icon: ShieldCheck,
      color: 'border-teal-400 bg-teal-50 text-teal-700',
      activeColor: 'ring-3 ring-teal-500 bg-teal-100 shadow-md',
    },
    {
      id: 6 as LevelId,
      title: 'Level 6: THINK — Your Brain Goes First',
      tagline: 'Mandatory thinking workspace before AI',
      badgeTitle: 'Independent Thinker',
      icon: Brain,
      color: 'border-indigo-400 bg-indigo-50 text-indigo-700',
      activeColor: 'ring-3 ring-indigo-500 bg-indigo-100 shadow-md',
    },
    {
      id: 7 as LevelId,
      title: 'Level 7: COLLABORATE WITH AI',
      tagline: 'Scaffold, not substitute: Audit AI claims',
      badgeTitle: 'Human-AI Collaborator',
      icon: Cpu,
      color: 'border-sky-400 bg-sky-50 text-sky-700',
      activeColor: 'ring-3 ring-sky-500 bg-sky-100 shadow-md',
    },
    {
      id: 8 as LevelId,
      title: 'Level 8: REFLECT — Metacognition & Disclosure',
      tagline: 'Compare pre- vs post-AI & build AI Statement',
      badgeTitle: 'Reflective Thinker',
      icon: Compass,
      color: 'border-emerald-400 bg-emerald-50 text-emerald-700',
      activeColor: 'ring-3 ring-emerald-500 bg-emerald-100 shadow-md',
    },
    {
      id: 9 as LevelId,
      title: 'Final Boss: Rescue the Oral Presentation',
      tagline: 'Transform a flawed speech into a masterpiece',
      badgeTitle: 'Oral Presentation Champion',
      icon: Trophy,
      color: 'border-amber-500 bg-amber-50 text-amber-800',
      activeColor: 'ring-3 ring-amber-600 bg-amber-100 shadow-md',
    },
  ];

  const totalCompleted = completedLevels.length;
  const progressPercent = Math.min(100, Math.round((totalCompleted / 9) * 100));

  return (
    <div className="bg-amber-50/40 border-b-2 border-slate-900 py-6 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Visual Hero Banner with Generated Comic Art */}
        <div className="relative rounded-2xl overflow-hidden border-2 border-slate-900 shadow-[4px_4px_0px_#0f172a] mb-8 bg-slate-900 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 p-6 sm:p-8 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-md border border-slate-900 mb-3 shadow-[2px_2px_0px_#0f172a]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Presentation Academy · Level Up Your Voice!</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-display font-black tracking-tight leading-tight text-white drop-shadow-sm">
                The Oral Presentation Quest
                <span className="block text-amber-300 text-xl sm:text-2xl font-bold mt-1">
                  From Awkward to Awesome!
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-200 mt-2 max-w-xl leading-relaxed">
                <strong className="text-amber-300">Tagline:</strong> Think first. Research wisely. Present confidently. Reflect honestly.
              </p>

              {/* Core Learning Sequence Comic Callout */}
              <div className="mt-5 bg-slate-950/90 border border-slate-700 rounded-xl p-3 max-w-lg backdrop-blur-xs">
                <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider mb-1">
                  Core Learning Philosophy
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-black">
                  <span className="text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-700">1. THINK</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-sky-300 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-700">2. COLLABORATE WITH AI</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700">3. REFLECT</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Your human brain leads the inquiry; AI acts as a questioning scaffold.
                </div>
              </div>
            </div>

            {/* Right Graphic Comic Art Frame */}
            <div className="lg:col-span-5 relative h-64 lg:h-full min-h-[240px] border-t-2 lg:border-t-0 lg:border-l-2 border-slate-900 overflow-hidden">
              <img
                src={questAcademyHeroImg}
                alt="Presentation Academy students presenting on stage with confidence"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:hidden" />
              <div className="absolute bottom-2 right-2 bg-slate-950/80 border border-slate-700 text-[10px] text-slate-300 px-2 py-0.5 rounded font-mono">
                ACADEMY STAGE
              </div>
            </div>
          </div>
        </div>

        {/* Quest Progress Bar */}
        <div className="mb-6 bg-white p-4 rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_#0f172a]">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2">
            <span className="flex items-center gap-1.5">
              <span>Overall Quest Progression ({totalCompleted}/9 Completed)</span>
            </span>
            <span className="font-mono text-slate-950 font-black bg-amber-200 px-2 py-0.5 rounded border border-slate-900">
              {progressPercent}% COMPLETE
            </span>
          </div>
          <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden border-2 border-slate-900">
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-indigo-500 to-emerald-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Responsive Horizontal Stage Cards with Comic-Book flair */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3">
          {levelsConfig.map((lvl) => {
            const isCompleted = completedLevels.includes(lvl.id);
            const isCurrent = currentLevel === lvl.id;
            const badge = badges.find((b) => b.levelId === lvl.id);
            const Icon = lvl.icon;

            return (
              <button
                key={lvl.id}
                onClick={() => onSelectLevel(lvl.id)}
                className={`text-left p-3 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between h-32 relative ${
                  isCurrent
                    ? `${lvl.activeColor} border-slate-950 shadow-[4px_4px_0px_#0f172a] -translate-y-0.5`
                    : isCompleted
                    ? 'bg-emerald-50 border-emerald-600 shadow-[2px_2px_0px_#059669] hover:-translate-y-0.5'
                    : 'bg-white border-slate-900 shadow-[2px_2px_0px_#0f172a] hover:bg-slate-50 hover:-translate-y-0.5'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className={`p-1.5 rounded-lg border border-slate-900 ${lvl.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {isCompleted ? (
                    <span title="Completed" className="text-emerald-700 bg-emerald-100 p-0.5 rounded-full border border-emerald-500">
                      <CheckCircle2 className="w-4 h-4" />
                    </span>
                  ) : isCurrent ? (
                    <span className="text-[9px] font-mono font-black text-slate-950 bg-amber-300 px-1.5 py-0.5 rounded border border-slate-900">
                      ACTIVE
                    </span>
                  ) : null}
                </div>

                <div>
                  <div className="text-xs font-black text-slate-900 line-clamp-1 leading-tight">
                    {lvl.id === 9 ? 'Final Boss' : `Level ${lvl.id}`}
                  </div>
                  <div className="text-[10px] font-semibold text-slate-600 line-clamp-2 leading-snug mt-0.5">
                    {lvl.badgeTitle}
                  </div>
                </div>

                {badge?.unlocked && (
                  <div className="absolute -top-1.5 -right-1.5 bg-amber-400 text-slate-950 p-1 rounded-full border border-slate-900 shadow-xs">
                    <Sparkles className="w-3 h-3" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
