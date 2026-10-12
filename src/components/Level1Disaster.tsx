import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Lightbulb,
  Sparkles,
} from 'lucide-react';
import { DISASTER_HOTSPOTS } from '../data/gameContent';
import { sound } from '../utils/sound';
import disasterDaveImg from '../assets/images/disaster_dave_avatar_1791786617792.jpg';

interface Level1DisasterProps {
  onCompleteLevel: (pointsEarned: number, badgeId: string) => void;
  onNextLevel: () => void;
  isCompleted: boolean;
}

export const Level1Disaster: React.FC<Level1DisasterProps> = ({
  onCompleteLevel,
  onNextLevel,
  isCompleted,
}) => {
  const [selectedHotspotId, setSelectedHotspotId] = useState<string>(DISASTER_HOTSPOTS[0].id);
  const [diagnoses, setDiagnoses] = useState<Record<string, { choiceId: string; isCorrect: boolean }>>({});

  const currentHotspot = DISASTER_HOTSPOTS.find((h) => h.id === selectedHotspotId) || DISASTER_HOTSPOTS[0];
  const currentDiagnosis = diagnoses[currentHotspot.id];
  const diagnosedCount = Object.keys(diagnoses).filter((k) => diagnoses[k].isCorrect).length;

  const handleSelectOption = (optionId: string) => {
    const option = currentHotspot.options.find((o) => o.id === optionId);
    if (!option) return;

    sound.playClick();
    const isCorrect = option.isBest;

    const newDiagnoses = {
      ...diagnoses,
      [currentHotspot.id]: { choiceId: optionId, isCorrect },
    };
    setDiagnoses(newDiagnoses);

    if (isCorrect) {
      sound.playSuccess();
    } else {
      sound.playError();
    }

    // Check if all 6 are now solved
    const allSolved = DISASTER_HOTSPOTS.every((h) => newDiagnoses[h.id]?.isCorrect);
    if (allSolved && !isCompleted) {
      sound.playBadgeFanfare();
      onCompleteLevel(60, 'badge-1');
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Level Header Banner with Comic Styling */}
      <div className="bg-rose-50 border-2 border-slate-900 rounded-2xl p-6 mb-8 shadow-[4px_4px_0px_#0f172a]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-block text-xs font-black uppercase tracking-wider text-white bg-rose-600 px-2.5 py-0.5 rounded border border-slate-900 mb-1">
              Level 1 · The Presentation Disaster
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900">
              Diagnose Disaster Dave’s Meltdown!
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 mt-1 max-w-2xl font-medium">
              Meet Dave! He is a well-meaning student whose oral presentation has spiralled into a complete communication catastrophe.
              Click through all 6 disaster points, diagnose the mistakes, and earn the <strong>Presentation Detective</strong> badge!
            </p>
          </div>

          <div className="shrink-0 bg-white border-2 border-slate-900 rounded-xl px-4 py-2.5 shadow-[2px_2px_0px_#0f172a] text-right">
            <div className="text-[11px] text-slate-600 font-bold uppercase">Diagnoses Solved</div>
            <div className="text-2xl font-black font-mono text-rose-600">
              {diagnosedCount} / {DISASTER_HOTSPOTS.length}
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
        {/* Left: Illustrated Interactive Stage */}
        <div className="lg:col-span-5 bg-slate-900 rounded-2xl border-2 border-slate-950 p-5 text-white shadow-[4px_4px_0px_#0f172a] relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
            <span className="font-mono text-slate-400 font-bold">CLASSROOM 204 — LIVE AUDIENCE</span>
            <span className="text-rose-400 font-black animate-pulse flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> CRITICAL DISASTER
            </span>
          </div>

          {/* Fictional Presenter Character Graphic: Disaster Dave Image */}
          <div className="mt-4 bg-slate-800 rounded-xl p-3.5 border-2 border-slate-700 relative">
            <div className="flex items-center gap-3">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-amber-400 shrink-0 shadow-md bg-amber-100">
                <img
                  src={disasterDaveImg}
                  alt="Disaster Dave sweating nervously at the podium"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-black text-sm text-amber-300">Disaster Dave (17)</span>
                  <span className="text-[10px] bg-rose-900/80 text-rose-200 px-1.5 py-0.5 rounded border border-rose-700 font-mono font-bold">
                    PANICKING
                  </span>
                </div>
                <div className="text-[11px] text-slate-300 mt-1 italic leading-snug line-clamp-3 bg-slate-900/90 p-2 rounded border border-slate-700">
                  {currentHotspot.quote}
                </div>
              </div>
            </div>
          </div>

          {/* Virtual Slide Screen Simulation */}
          <div className="mt-4 bg-amber-50 rounded-xl p-4 text-slate-900 border-2 border-slate-950 shadow-inner relative">
            <div className="text-[10px] uppercase font-mono text-slate-500 mb-1 flex items-center justify-between font-bold">
              <span>PROJECTOR CANVAS</span>
              <span className="text-rose-600 bg-rose-100 px-1 rounded">SLIDE 1 OF 94</span>
            </div>
            <div className="text-xs font-black uppercase text-amber-950 border-b border-amber-300 pb-1">
              EVERYTHING ABOUT CAFFEINE, SCIENCE, AND WORLD HISTORY
            </div>
            <div className="text-[10px] text-slate-800 mt-2 space-y-1 font-mono leading-tight">
              <p>
                Paragraph 1: Caffeine is a substance discovered in 1819 by Friedlieb Ferdinand Runge who was instructed by Goethe to analyse coffee beans and then everyone drank it...
              </p>
              <p className="text-slate-500 italic">
                (200 more words in 8pt yellow text continue with zero spacing or visual hierarchy)
              </p>
            </div>
            <div className="mt-2 text-[10px] text-rose-800 bg-rose-100/90 p-1.5 rounded border border-rose-300 font-bold">
              Unverified Claim: "100% of scientists say chocolate replaces sleep!"
            </div>
          </div>

          {/* Hotspot Selector Buttons */}
          <div className="mt-5">
            <div className="text-xs font-black text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span>Select Clue to Diagnose:</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {DISASTER_HOTSPOTS.map((h, idx) => {
                const isSelected = h.id === selectedHotspotId;
                const isSolved = diagnoses[h.id]?.isCorrect;

                return (
                  <button
                    key={h.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedHotspotId(h.id);
                    }}
                    className={`p-2.5 rounded-lg text-left text-xs transition-all cursor-pointer flex items-center justify-between border-2 ${
                      isSelected
                        ? 'bg-rose-500 text-white border-white font-black shadow-md -translate-y-0.5'
                        : isSolved
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="font-mono text-[10px] opacity-75">{idx + 1}.</span>
                      <span className="truncate">{h.targetName}</span>
                    </div>
                    {isSolved && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Diagnostic Workspace & Decision Card */}
        <div className="lg:col-span-7 bg-white rounded-2xl border-2 border-slate-900 p-6 shadow-[4px_4px_0px_#0f172a]">
          <div className="flex items-center justify-between pb-4 border-b-2 border-slate-200 mb-5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-white bg-rose-600 px-2.5 py-1 rounded-md border border-slate-900">
                Case #{DISASTER_HOTSPOTS.findIndex((h) => h.id === currentHotspot.id) + 1}
              </span>
              <h3 className="text-lg font-black text-slate-900">{currentHotspot.targetName}</h3>
            </div>
            {currentDiagnosis?.isCorrect && (
              <span className="text-xs font-black text-emerald-800 flex items-center gap-1 bg-emerald-100 border border-emerald-400 px-2.5 py-1 rounded-md">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Solved
              </span>
            )}
          </div>

          <p className="text-sm font-bold text-slate-900 mb-4">
            {currentHotspot.question}
          </p>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {currentHotspot.options.map((option) => {
              const isChosen = currentDiagnosis?.choiceId === option.id;

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option.id)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all cursor-pointer relative ${
                    isChosen
                      ? option.isBest
                        ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-400 text-slate-950 font-medium shadow-[2px_2px_0px_#059669]'
                        : 'bg-rose-50 border-rose-500 text-slate-950'
                      : 'bg-white border-slate-300 hover:border-slate-900 hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 text-xs font-black mt-0.5 ${
                        isChosen
                          ? option.isBest
                            ? 'bg-emerald-600 border-slate-900 text-white'
                            : 'bg-rose-600 border-slate-900 text-white'
                          : 'border-slate-400 text-slate-600 bg-slate-100'
                      }`}
                    >
                      {option.id === 'opt1' ? 'A' : option.id === 'opt2' ? 'B' : 'C'}
                    </div>
                    <div className="text-xs sm:text-sm leading-relaxed">{option.text}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Immediate Pedagogical Feedback Box */}
          {currentDiagnosis && (
            <div
              className={`p-4 rounded-xl border-2 mb-6 animate-in fade-in duration-200 ${
                currentDiagnosis.isCorrect
                  ? 'bg-emerald-50 border-emerald-600 text-emerald-950'
                  : 'bg-amber-50 border-amber-600 text-amber-950'
              }`}
            >
              <div className="flex items-start gap-3">
                {currentDiagnosis.isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="text-xs font-black uppercase tracking-wide mb-1">
                    {currentDiagnosis.isCorrect ? 'Accurate Diagnosis!' : 'Think Again:'}
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed mb-3">
                    {
                      currentHotspot.options.find((o) => o.id === currentDiagnosis.choiceId)
                        ?.feedback
                    }
                  </p>
                  <div className="bg-white p-3 rounded-lg border border-slate-300 flex items-start gap-2 text-xs text-slate-800">
                    <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-950">Practical Improvement: </strong>
                      {
                        currentHotspot.options.find((o) => o.id === currentDiagnosis.choiceId)
                          ?.tip
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation to next hotspot or level completion */}
          <div className="flex items-center justify-between pt-4 border-t-2 border-slate-200">
            <span className="text-xs text-slate-600 font-medium">
              Solve all 6 issues to unlock the <strong className="text-slate-900">Presentation Detective</strong> badge!
            </span>

            {diagnosedCount < DISASTER_HOTSPOTS.length ? (
              <button
                onClick={() => {
                  const currentIndex = DISASTER_HOTSPOTS.findIndex((h) => h.id === selectedHotspotId);
                  const nextIndex = (currentIndex + 1) % DISASTER_HOTSPOTS.length;
                  sound.playClick();
                  setSelectedHotspotId(DISASTER_HOTSPOTS[nextIndex].id);
                }}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-slate-900 shadow-[2px_2px_0px_#0f172a]"
              >
                <span>Next Clue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => {
                  sound.playClick();
                  onNextLevel();
                }}
                className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 text-xs sm:text-sm font-black flex items-center gap-2 shadow-[3px_3px_0px_#0f172a] border-2 border-slate-900 cursor-pointer"
              >
                <span>Proceed to Level 2</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
