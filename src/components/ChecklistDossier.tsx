import React, { useState } from 'react';
import {
  CheckCircle2,
  Download,
  Copy,
  Check,
  Award,
  BookOpen,
  Sparkles,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { PRESENTATION_CHECKLIST } from '../data/gameContent';
import { StudentThinkData, ReflectionData, Badge } from '../types/game';
import { sound } from '../utils/sound';

interface ChecklistDossierProps {
  checks: Record<string, boolean>;
  onToggleCheck: (id: string) => void;
  studentThink: StudentThinkData;
  reflection: ReflectionData;
  aiStatement: string;
  badges: Badge[];
  score: number;
  onResetAll: () => void;
}

export const ChecklistDossier: React.FC<ChecklistDossierProps> = ({
  checks,
  onToggleCheck,
  studentThink,
  reflection,
  aiStatement,
  badges,
  score,
  onResetAll,
}) => {
  const [copied, setCopied] = useState(false);

  // Flatten items to compute total
  const allChecklistItems = PRESENTATION_CHECKLIST.flatMap((cat) => cat.items);
  const totalItemsCount = allChecklistItems.length;
  const checkedCount = allChecklistItems.filter((i) => checks[i.id]).length;
  const readinessPercent = Math.round((checkedCount / totalItemsCount) * 100);

  const unlockedBadges = badges.filter((b) => b.unlocked);

  const generateFullDossierText = () => {
    return `========================================================================
THE ORAL PRESENTATION QUEST: STUDENT ASSIGNMENT DOSSIER
From Awkward to Awesome! — Nannestad High School
Teacher / Coordinator: Barbara Anna Zielonka
========================================================================

STUDENT TOPIC & RESEARCH QUESTION
Topic: ${studentThink.topicTitle}
Research Question: ${studentThink.researchQuestion}
Initial Hypothesis: ${studentThink.initialArgument}

QUESTIONS INVESTIGATED
1) ${studentThink.investigationQuestions[0]}
2) ${studentThink.investigationQuestions[1]}

EVIDENCE & METHODOLOGY
Evidence Type: ${studentThink.evidenceNeeded}
Prediction: ${studentThink.prediction}

AI COLLABORATION REFLECTION & DISCLOSURE
${aiStatement || 'AI Statement completed during quest.'}

ACHIEVEMENT RECORD
Total Score: ${score} Points
Badges Earned: ${unlockedBadges.length} / ${badges.length}
${unlockedBadges.map((b) => `• [UNLOCKED] ${b.title} — ${b.description}`).join('\n')}

ORAL PRESENTATION READINESS AUDIT (${checkedCount}/${totalItemsCount} Verified)
${PRESENTATION_CHECKLIST.map((cat) => {
  const catItems = cat.items
    .map((item) => `[${checks[item.id] ? 'X' : ' '}] ${item.label}: ${item.details}`)
    .join('\n');
  return `\n${cat.title.toUpperCase()}:\n${catItems}`;
}).join('\n')}

========================================================================
Nannestad High School- Barbara Anna Zielonka
========================================================================`;
  };

  const handleCopyDossier = () => {
    sound.playClick();
    const dossierText = generateFullDossierText();
    navigator.clipboard.writeText(dossierText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadDossier = () => {
    sound.playClick();
    const dossierText = generateFullDossierText();
    const blob = new Blob([dossierText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Oral_Presentation_Dossier_${studentThink.topicId || 'Quest'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Header Banner */}
      <div className="bg-slate-950 text-white rounded-2xl p-6 sm:p-8 mb-8 border-2 border-slate-900 shadow-[6px_6px_0px_#0f172a]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-block text-xs font-black uppercase tracking-wider text-slate-950 bg-amber-400 px-2.5 py-0.5 rounded border border-slate-900 mb-1">
              Final Stage · Practical Preparation
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white">
              Oral Presentation Readiness Checklist
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Use this personalised checklist to audit your readiness for your graded oral presentation.
              Tick each requirement as you prepare your slides, cue cards, and oral citations!
            </p>
          </div>

          <div className="shrink-0 bg-slate-800 border border-slate-700 rounded-xl px-5 py-3 text-right">
            <div className="text-xs text-slate-400 font-medium">Readiness Score</div>
            <div className="text-2xl font-black font-mono text-emerald-400">
              {readinessPercent}%
            </div>
            <div className="text-[10px] text-slate-400">
              {checkedCount} / {totalItemsCount} verified
            </div>
          </div>
        </div>

        {/* Readiness Bar */}
        <div className="mt-6 w-full bg-slate-800 rounded-full h-2.5 overflow-hidden border border-slate-700">
          <div
            className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full transition-all duration-300"
            style={{ width: `${readinessPercent}%` }}
          />
        </div>
      </div>

      {/* Export & Actions Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyDossier}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Dossier Copied!' : 'Copy Complete Dossier'}</span>
          </button>
          <button
            onClick={handleDownloadDossier}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .txt Dossier</span>
          </button>
        </div>

        <button
          onClick={() => {
            if (confirm('Do you want to reset all progress and restart the quest?')) {
              onResetAll();
            }
          }}
          className="text-xs text-rose-600 hover:text-rose-800 font-semibold cursor-pointer flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Quest Progress</span>
        </button>
      </div>

      {/* Checklist Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {PRESENTATION_CHECKLIST.map((cat) => (
          <div key={cat.title} className="bg-white rounded-2xl border-2 border-slate-900 p-5 shadow-[4px_4px_0px_#0f172a]">
            <h3 className="text-sm font-black text-slate-900 pb-3 border-b-2 border-slate-200 mb-3 flex items-center justify-between">
              <span>{cat.title}</span>
              <span className="text-[10px] font-mono font-normal text-slate-400">
                {cat.items.filter((i) => checks[i.id]).length} / {cat.items.length}
              </span>
            </h3>

            <div className="space-y-3">
              {cat.items.map((item) => {
                const isChecked = !!checks[item.id];

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      sound.playClick();
                      onToggleCheck(item.id);
                    }}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isChecked
                        ? 'bg-emerald-50/60 border-emerald-300 text-slate-900'
                        : 'bg-slate-50/60 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                        isChecked
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold">{item.label}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">{item.details}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Personal Achievement & Thinking Snapshot */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h3 className="text-base font-bold text-slate-900 mb-3">
          Your Personal Quest Dossier Snapshot
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-indigo-50/60 p-4 rounded-xl border border-indigo-200">
            <div className="text-[10px] font-mono font-bold uppercase text-indigo-700 mb-1">
              THINK WORKSPACE
            </div>
            <div className="font-bold text-slate-900 mb-1">{studentThink.topicTitle}</div>
            <div className="text-slate-600 line-clamp-3 italic">"{studentThink.researchQuestion}"</div>
          </div>

          <div className="bg-sky-50/60 p-4 rounded-xl border border-sky-200">
            <div className="text-[10px] font-mono font-bold uppercase text-sky-700 mb-1">
              AI COLLABORATION
            </div>
            <div className="font-bold text-slate-900 mb-1">Critical Human-AI Audit</div>
            <div className="text-slate-600 line-clamp-3">
              Audited 4 AI responses, rejected hallucinated stats, and practiced spoken citations.
            </div>
          </div>

          <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200">
            <div className="text-[10px] font-mono font-bold uppercase text-amber-700 mb-1">
              ACHIEVEMENT SCORE
            </div>
            <div className="font-bold text-slate-900 mb-1">{score} Points Earned</div>
            <div className="text-slate-600">
              {unlockedBadges.length} of {badges.length} badges unlocked.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
