import React, { useState } from 'react';
import {
  Mic,
  CheckCircle2,
  Lightbulb,
  ArrowRight,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { SPEAKING_SCENARIOS } from '../data/gameContent';
import { sound } from '../utils/sound';
import speakingHeroImg from '../assets/images/speaking_confident_hero_1791786641716.jpg';

interface Level4SpeakingProps {
  onCompleteLevel: (pointsEarned: number, badgeId: string) => void;
  onNextLevel: () => void;
  isCompleted: boolean;
}

export const Level4Speaking: React.FC<Level4SpeakingProps> = ({
  onCompleteLevel,
  onNextLevel,
  isCompleted,
}) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(SPEAKING_SCENARIOS[0].id);
  const [answers, setAnswers] = useState<Record<string, { optionId: string; isCorrect: boolean }>>({});

  const currentScenario =
    SPEAKING_SCENARIOS.find((s) => s.id === selectedScenarioId) || SPEAKING_SCENARIOS[0];
  const currentAnswer = answers[currentScenario.id];
  const solvedCount = Object.keys(answers).filter((k) => answers[k].isCorrect).length;

  const handleSelectOption = (optionId: string) => {
    sound.playClick();
    const option = currentScenario.options.find((o) => o.id === optionId);
    if (!option) return;

    const isCorrect = option.isBest;
    const newAnswers = {
      ...answers,
      [currentScenario.id]: { optionId, isCorrect },
    };
    setAnswers(newAnswers);

    if (isCorrect) {
      sound.playSuccess();
    } else {
      sound.playError();
    }

    const allSolved = SPEAKING_SCENARIOS.every((s) => newAnswers[s.id]?.isCorrect);
    if (allSolved && !isCompleted) {
      sound.playBadgeFanfare();
      onCompleteLevel(60, 'badge-4');
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Header Banner */}
      <div className="bg-amber-50 border-2 border-slate-900 rounded-2xl p-6 mb-8 shadow-[4px_4px_0px_#0f172a]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-block text-xs font-black uppercase tracking-wider text-white bg-amber-600 px-2.5 py-0.5 rounded border border-slate-900 mb-1">
              Level 4 · Confident Communicator
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900">
              The Speaking Showdown: Real Delivery, Real Resilience
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 mt-1 max-w-2xl font-medium">
              You do not need to be a robotic orator to be an effective presenter!
              Communication is about clarity, connection, and knowing how to recover calmly when slips happen.
            </p>
          </div>

          <div className="shrink-0 bg-white border-2 border-slate-900 rounded-xl px-4 py-2.5 shadow-[2px_2px_0px_#0f172a] text-right">
            <div className="text-[11px] text-slate-600 font-bold uppercase">Scenarios Mastered</div>
            <div className="text-2xl font-black font-mono text-amber-700">
              {solvedCount} / {SPEAKING_SCENARIOS.length}
            </div>
          </div>
        </div>
      </div>

      {/* Confident Speaker Visual Spotlight Card */}
      <div className="bg-white border-2 border-slate-900 rounded-2xl overflow-hidden shadow-[4px_4px_0px_#0f172a] mb-8 grid grid-cols-1 md:grid-cols-12 items-center">
        <div className="md:col-span-8 p-6">
          <div className="text-xs font-black text-amber-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>ROLE MODEL: NATURAL, EMPOWERED SPEAKING</span>
          </div>
          <h3 className="text-lg sm:text-xl font-display font-black text-slate-900 mb-2">
            The Goal is Communication, Not Perfection!
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            Notice how our model speaker holds concise palm cards rather than an essay sheet, smiles warmly at the audience, pauses naturally between ideas, and speaks with genuine passion. Even if she slips on a word, she pauses for two seconds, rephrases, and keeps going!
          </p>
          <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-3 text-xs text-amber-950 font-medium">
            💡 <strong>Inclusive communication:</strong> Eye contact, hand gestures, and body movement look different for every person. Effective delivery means making your ideas clear, not forcing everyone into an identical mould.
          </div>
        </div>

        <div className="md:col-span-4 h-64 md:h-full min-h-[220px] border-t-2 md:border-t-0 md:border-l-2 border-slate-900 overflow-hidden relative bg-amber-100">
          <img
            src={speakingHeroImg}
            alt="Confident teenage speaker on stage with cue cards and microphone"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
        {/* Left: Scenario Selector */}
        <div className="lg:col-span-4 bg-white rounded-2xl border-2 border-slate-900 p-4 shadow-[4px_4px_0px_#0f172a] space-y-2">
          <div className="text-xs font-black text-slate-700 uppercase tracking-wider px-2 py-1">
            Speaking Scenarios:
          </div>
          {SPEAKING_SCENARIOS.map((sc) => {
            const isSelected = sc.id === selectedScenarioId;
            const isSolved = answers[sc.id]?.isCorrect;

            return (
              <button
                key={sc.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedScenarioId(sc.id);
                }}
                className={`w-full text-left p-3 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-amber-500 text-white border-slate-900 shadow-[2px_2px_0px_#0f172a] font-black -translate-y-0.5'
                    : isSolved
                    ? 'bg-emerald-50 text-slate-900 border-emerald-500'
                    : 'bg-slate-50 text-slate-800 border-slate-300 hover:border-slate-900'
                }`}
              >
                <div className="truncate">
                  <div className="text-xs font-bold">{sc.situationTitle}</div>
                </div>
                {isSolved && <CheckCircle2 className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-emerald-600'}`} />}
              </button>
            );
          })}
        </div>

        {/* Right: Active Scenario & Choices */}
        <div className="lg:col-span-8 bg-white rounded-2xl border-2 border-slate-900 p-6 shadow-[4px_4px_0px_#0f172a]">
          <div className="flex items-center justify-between pb-3 border-b-2 border-slate-200 mb-4">
            <h3 className="text-lg font-black text-slate-900">{currentScenario.situationTitle}</h3>
            {currentAnswer?.isCorrect && (
              <span className="text-xs font-black text-emerald-800 bg-emerald-100 border border-emerald-400 px-2.5 py-1 rounded-md flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Resolved
              </span>
            )}
          </div>

          <div className="bg-amber-50 border-2 border-amber-300 p-4 rounded-xl mb-5">
            <div className="text-xs font-black uppercase tracking-wider text-amber-900 mb-1">
              Classroom Dilemma:
            </div>
            <div className="text-xs sm:text-sm text-slate-900 font-bold mb-2">
              {currentScenario.characterState}
            </div>
            <div className="text-xs sm:text-sm text-slate-700 italic bg-white p-2.5 rounded-lg border border-amber-200">
              "{currentScenario.scenarioText}"
            </div>
          </div>

          <div className="space-y-3 mb-6">
            {currentScenario.options.map((opt, oidx) => {
              const isSelected = currentAnswer?.optionId === opt.id;

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    isSelected
                      ? opt.isBest
                        ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-300 text-slate-950 font-medium shadow-[2px_2px_0px_#059669]'
                        : 'bg-rose-50 border-rose-500 text-slate-950'
                      : 'bg-white border-slate-300 hover:border-slate-900 hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black shrink-0 mt-0.5 border-2 ${
                        isSelected
                          ? opt.isBest
                            ? 'bg-emerald-600 border-slate-900 text-white'
                            : 'bg-rose-600 border-slate-900 text-white'
                          : 'border-slate-400 text-slate-600 bg-slate-100'
                      }`}
                    >
                      {oidx === 0 ? 'A' : oidx === 1 ? 'B' : 'C'}
                    </span>
                    <span className="text-xs sm:text-sm leading-relaxed">{opt.text}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {currentAnswer && (
            <div
              className={`p-4 rounded-xl border-2 mb-6 animate-in fade-in duration-200 ${
                currentAnswer.isCorrect
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                  : 'bg-amber-50 border-amber-400 text-amber-950'
              }`}
            >
              <div className="flex items-start gap-3">
                {currentAnswer.isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="text-xs font-black uppercase tracking-wider mb-1">
                    {currentAnswer.isCorrect ? 'Communication Mastery!' : 'Consider This:'}
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed">
                    {
                      currentScenario.options.find((o) => o.id === currentAnswer.optionId)
                        ?.feedback
                    }
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t-2 border-slate-200">
            <span className="text-xs text-slate-600 font-medium">
              Master all {SPEAKING_SCENARIOS.length} scenarios to claim the{' '}
              <strong className="text-slate-900">Confident Communicator</strong> badge!
            </span>

            {solvedCount === SPEAKING_SCENARIOS.length ? (
              <button
                onClick={() => {
                  sound.playClick();
                  onNextLevel();
                }}
                className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 text-xs sm:text-sm font-black flex items-center gap-2 cursor-pointer shadow-[3px_3px_0px_#0f172a] border-2 border-slate-900"
              >
                <span>Proceed to Level 5</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  const currentIndex = SPEAKING_SCENARIOS.findIndex((s) => s.id === selectedScenarioId);
                  const nextIndex = (currentIndex + 1) % SPEAKING_SCENARIOS.length;
                  sound.playClick();
                  setSelectedScenarioId(SPEAKING_SCENARIOS[nextIndex].id);
                }}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-slate-900 shadow-[2px_2px_0px_#0f172a]"
              >
                <span>Next Scenario</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
