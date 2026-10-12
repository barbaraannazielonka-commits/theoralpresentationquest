import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Sparkles,
  Flame,
  Check,
  Eye,
  RefreshCw,
} from 'lucide-react';
import { FINAL_BOSS_PROBLEMS } from '../data/gameContent';
import { sound } from '../utils/sound';
import finalBossImg from '../assets/images/final_boss_showdown_1791786651230.jpg';

interface FinalBossProps {
  finalBossChoices: Record<string, string>;
  onUpdateChoice: (problemId: string, solutionId: string) => void;
  onCompleteBoss: (pointsEarned: number, badgeId: string) => void;
  onGoToChecklist: () => void;
  isCompleted: boolean;
}

export const FinalBoss: React.FC<FinalBossProps> = ({
  finalBossChoices,
  onUpdateChoice,
  onCompleteBoss,
  onGoToChecklist,
  isCompleted,
}) => {
  const [activeProblemId, setActiveProblemId] = useState<string>(FINAL_BOSS_PROBLEMS[0].id);
  const [showSideBySide, setShowSideBySide] = useState<boolean>(isCompleted);

  const currentProblem =
    FINAL_BOSS_PROBLEMS.find((p) => p.id === activeProblemId) || FINAL_BOSS_PROBLEMS[0];

  const currentChoiceId = finalBossChoices[currentProblem.id];
  const currentSolution = currentProblem.solutions.find((s) => s.id === currentChoiceId);

  const solvedCount = FINAL_BOSS_PROBLEMS.filter((p) => {
    const chosen = finalBossChoices[p.id];
    return p.solutions.find((s) => s.id === chosen)?.isBest === true;
  }).length;

  const isBossDefeated = solvedCount === FINAL_BOSS_PROBLEMS.length;

  const handleSelectSolution = (problemId: string, solutionId: string) => {
    sound.playClick();
    onUpdateChoice(problemId, solutionId);

    const problem = FINAL_BOSS_PROBLEMS.find((p) => p.id === problemId);
    const solution = problem?.solutions.find((s) => s.id === solutionId);

    if (solution?.isBest) {
      sound.playSuccess();
    } else {
      sound.playError();
    }

    const updatedSolved = FINAL_BOSS_PROBLEMS.filter((p) => {
      const chosen = p.id === problemId ? solutionId : finalBossChoices[p.id];
      return p.solutions.find((s) => s.id === chosen)?.isBest === true;
    }).length;

    if (updatedSolved === FINAL_BOSS_PROBLEMS.length && !isCompleted) {
      sound.playBadgeFanfare();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
      onCompleteBoss(100, 'badge-9');
      setShowSideBySide(true);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Final Boss Visual Climax Banner */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-slate-900 shadow-[6px_6px_0px_#0f172a] mb-8 bg-slate-950 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 p-6 sm:p-8 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-md border border-slate-900 mb-3 shadow-[2px_2px_0px_#0f172a]">
              <Flame className="w-4 h-4 text-orange-600" />
              <span>THE ULTIMATE CLIMAX · LEVEL 9 BOSS BATTLE</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-display font-black tracking-tight text-white drop-shadow-sm leading-tight">
              Final Boss: The Oral Presentation Showdown!
            </h2>

            <p className="text-xs sm:text-sm text-slate-200 mt-2 max-w-xl leading-relaxed">
              Disaster Dave has handed you his entire flawed speech script on <em>"Energy Drinks in High School"</em>.
              Rescue all 8 presentation elements to defeat the chaotic mistake storm and transform this talk into an A-grade masterclass!
            </p>

            <div className="mt-5 flex items-center gap-3">
              <div className="bg-slate-900/90 border border-slate-700 px-4 py-2 rounded-xl">
                <span className="text-[10px] text-slate-400 font-bold block">MISSION PROGRESS</span>
                <span className="text-xl font-black font-mono text-amber-300">
                  {solvedCount} / {FINAL_BOSS_PROBLEMS.length} RESCUED
                </span>
              </div>
              {isBossDefeated && (
                <div className="bg-emerald-950 border border-emerald-500 text-emerald-300 px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-400" /> BOSS DEFEATED!
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 relative h-64 lg:h-full min-h-[260px] border-t-2 lg:border-t-0 lg:border-l-2 border-slate-900 overflow-hidden">
            <img
              src={finalBossImg}
              alt="Heroic student transforming chaos into confident presentation speech"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      {/* Mode Toggle: Step-by-Step Rescue vs Side-by-Side Review */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSideBySide(false)}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] ${
              !showSideBySide
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-800 hover:bg-slate-50'
            }`}
          >
            Mission Control (8 Rescues)
          </button>
          <button
            onClick={() => setShowSideBySide(true)}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] ${
              showSideBySide
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-800 hover:bg-slate-50'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Before & After Comparison</span>
          </button>
        </div>

        {isBossDefeated && (
          <span className="text-xs font-black text-emerald-800 bg-emerald-100 border-2 border-emerald-500 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-[2px_2px_0px_#059669]">
            <Trophy className="w-4 h-4 text-amber-500" /> Oral Presentation Champion
          </span>
        )}
      </div>

      {!showSideBySide ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          {/* Left: 8 Problem Tabs */}
          <div className="lg:col-span-4 bg-white rounded-2xl border-2 border-slate-900 p-4 shadow-[4px_4px_0px_#0f172a] space-y-2">
            <div className="text-xs font-black text-slate-700 uppercase tracking-wider px-2 py-1">
              8 Presentation Catastrophes:
            </div>

            {FINAL_BOSS_PROBLEMS.map((prob, idx) => {
              const isSelected = prob.id === activeProblemId;
              const chosen = finalBossChoices[prob.id];
              const isSolved = prob.solutions.find((s) => s.id === chosen)?.isBest === true;

              return (
                <button
                  key={prob.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveProblemId(prob.id);
                  }}
                  className={`w-full text-left p-3 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 border-slate-900 font-black shadow-[2px_2px_0px_#0f172a] -translate-y-0.5'
                      : isSolved
                      ? 'bg-emerald-50 text-slate-900 border-emerald-500'
                      : 'bg-slate-50 text-slate-800 border-slate-300 hover:border-slate-900'
                  }`}
                >
                  <div className="truncate">
                    <div className="text-[10px] font-mono opacity-80 uppercase tracking-wider">
                      Rescue {idx + 1}
                    </div>
                    <div className="text-xs font-bold truncate">{prob.problemTitle}</div>
                  </div>
                  {isSolved && <CheckCircle2 className={`w-4 h-4 shrink-0 ${isSelected ? 'text-slate-950' : 'text-emerald-600'}`} />}
                </button>
              );
            })}
          </div>

          {/* Right: Active Problem Rescue Workspace */}
          <div className="lg:col-span-8 bg-white rounded-2xl border-2 border-slate-900 p-6 shadow-[4px_4px_0px_#0f172a]">
            <div className="flex items-center justify-between pb-3 border-b-2 border-slate-200 mb-4">
              <div>
                <span className="text-xs font-black text-amber-700 uppercase tracking-wide">
                  {currentProblem.category}
                </span>
                <h3 className="text-lg font-black text-slate-900">{currentProblem.problemTitle}</h3>
              </div>
              {currentSolution?.isBest && (
                <span className="text-xs font-black text-emerald-800 bg-emerald-100 border border-emerald-400 px-2.5 py-1 rounded-md flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Rescued!
                </span>
              )}
            </div>

            {/* The Flawed Original Snippet */}
            <div className="bg-rose-50 border-2 border-rose-300 p-4 rounded-xl mb-4">
              <div className="text-[10px] font-mono uppercase font-black text-rose-700 mb-1 flex items-center justify-between">
                <span>BEFORE (DISASTER DAVE'S ORIGINAL)</span>
                <span>● FLAW DETECTED</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 italic font-mono mb-2">
                {currentProblem.flawedSnippet}
              </p>
              <div className="text-xs text-rose-800 font-bold">
                <strong>Why it harms audience understanding:</strong> {currentProblem.flawAnalysis}
              </div>
            </div>

            {/* Choose the Rescue Solution */}
            <div className="mb-4">
              <span className="text-xs font-black text-slate-700 uppercase tracking-wider block mb-2">
                Choose the Awesome Improvement:
              </span>

              <div className="space-y-3">
                {currentProblem.solutions.map((sol) => {
                  const isChosen = currentChoiceId === sol.id;

                  return (
                    <button
                      key={sol.id}
                      onClick={() => handleSelectSolution(currentProblem.id, sol.id)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all cursor-pointer ${
                        isChosen
                          ? sol.isBest
                            ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-300 text-slate-950 font-medium shadow-[2px_2px_0px_#059669]'
                            : 'bg-rose-50 border-rose-500 text-slate-950'
                          : 'bg-white border-slate-300 hover:border-slate-900 text-slate-800'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black shrink-0 mt-0.5 border-2 ${
                            isChosen
                              ? sol.isBest
                                ? 'bg-emerald-600 border-slate-900 text-white'
                                : 'bg-rose-600 border-slate-900 text-white'
                              : 'border-slate-400 text-slate-500 bg-slate-100'
                          }`}
                        >
                          {isChosen ? (sol.isBest ? '✓' : '✗') : '•'}
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm leading-relaxed">{sol.text}</div>
                          {isChosen && (
                            <div
                              className={`mt-2 text-xs font-bold ${
                                sol.isBest ? 'text-emerald-800' : 'text-rose-800'
                              }`}
                            >
                              {sol.explanation}
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation footer */}
            <div className="flex items-center justify-between pt-4 border-t-2 border-slate-200">
              <span className="text-xs text-slate-600 font-medium">
                Rescue {solvedCount} of {FINAL_BOSS_PROBLEMS.length} completed
              </span>

              {isBossDefeated ? (
                <button
                  onClick={() => {
                    sound.playClick();
                    setShowSideBySide(true);
                  }}
                  className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 text-xs sm:text-sm font-black flex items-center gap-1.5 cursor-pointer shadow-[3px_3px_0px_#0f172a] border-2 border-slate-900"
                >
                  <Eye className="w-4 h-4" />
                  <span>Inspect Before & After Showcase</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    const currentIndex = FINAL_BOSS_PROBLEMS.findIndex((p) => p.id === activeProblemId);
                    const nextIndex = (currentIndex + 1) % FINAL_BOSS_PROBLEMS.length;
                    sound.playClick();
                    setActiveProblemId(FINAL_BOSS_PROBLEMS[nextIndex].id);
                  }}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 text-xs font-bold flex items-center gap-1 cursor-pointer border border-slate-900 shadow-[2px_2px_0px_#0f172a]"
                >
                  <span>Next Rescue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Full Side-by-Side Before & After Showcase */
        <div className="bg-white rounded-2xl border-2 border-slate-900 p-6 shadow-[4px_4px_0px_#0f172a] mb-8 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-4 border-b-2 border-slate-200 mb-6">
            <div>
              <h3 className="text-lg font-black text-slate-900">
                The Complete Transformation: Awkward to Awesome!
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Here is the full side-by-side comparison of the presentation before and after your expert rescues:
              </p>
            </div>
            <button
              onClick={() => setShowSideBySide(false)}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold cursor-pointer border border-slate-300"
            >
              Back to Mission Control
            </button>
          </div>

          <div className="space-y-6">
            {FINAL_BOSS_PROBLEMS.map((prob, idx) => {
              const bestSol = prob.solutions.find((s) => s.isBest);

              return (
                <div key={prob.id} className="p-4 rounded-xl border-2 border-slate-900 bg-slate-50 shadow-[2px_2px_0px_#0f172a]">
                  <div className="text-xs font-black text-slate-800 uppercase tracking-wide mb-3 flex items-center justify-between">
                    <span>
                      {idx + 1}. {prob.category}: {prob.problemTitle}
                    </span>
                    <span className="text-emerald-700 flex items-center gap-1 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Rescued
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {/* Before */}
                    <div className="bg-rose-50 p-3.5 rounded-lg border-2 border-rose-300">
                      <div className="text-[10px] font-mono font-black text-rose-700 uppercase mb-1">
                        ORIGINAL (AWKWARD)
                      </div>
                      <p className="italic text-slate-700 font-mono mb-2">{prob.flawedSnippet}</p>
                      <div className="text-rose-800 text-[11px] font-bold">{prob.flawAnalysis}</div>
                    </div>

                    {/* After */}
                    <div className="bg-emerald-50 p-3.5 rounded-lg border-2 border-emerald-400">
                      <div className="text-[10px] font-mono font-black text-emerald-700 uppercase mb-1">
                        RESCUED (AWESOME)
                      </div>
                      <p className="font-bold text-slate-950 mb-2 leading-relaxed">{bestSol?.text}</p>
                      <div className="text-emerald-900 text-[11px] font-medium">{bestSol?.explanation}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-6 mt-6 border-t-2 border-slate-200">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span className="text-xs sm:text-sm font-black text-slate-900">
                Awarded Badge: Oral Presentation Champion!
              </span>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onGoToChecklist();
              }}
              className="px-6 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 text-xs sm:text-sm font-black flex items-center gap-2 cursor-pointer shadow-[3px_3px_0px_#0f172a] border-2 border-slate-900"
            >
              <span>View Your Graded Oral Presentation Checklist</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
