import React, { useState } from 'react';
import {
  Monitor,
  CheckCircle2,
  Lightbulb,
  ArrowRight,
  Sparkles,
  Check,
  AlertTriangle,
} from 'lucide-react';
import { SLIDE_COMPARISONS } from '../data/gameContent';
import { sound } from '../utils/sound';
import slideVillainImg from '../assets/images/slide_villain_clutter_1791786631472.jpg';

interface Level3VisualsProps {
  onCompleteLevel: (pointsEarned: number, badgeId: string) => void;
  onNextLevel: () => void;
  isCompleted: boolean;
}

export const Level3Visuals: React.FC<Level3VisualsProps> = ({
  onCompleteLevel,
  onNextLevel,
  isCompleted,
}) => {
  const [activeMode, setActiveMode] = useState<'comparisons' | 'repair_studio'>('comparisons');
  const [comparisonAnswers, setComparisonAnswers] = useState<Record<string, 'bad' | 'good'>>({});

  const [repairState, setRepairState] = useState({
    condenseText: false,
    enlargeFont: false,
    removeDistractions: false,
    cleanChart: false,
  });

  const comparisonsSolvedCount = Object.keys(comparisonAnswers).filter(
    (k) => comparisonAnswers[k] === 'good'
  ).length;
  const allComparisonsSolved = comparisonsSolvedCount === SLIDE_COMPARISONS.length;

  const allRepairsApplied =
    repairState.condenseText &&
    repairState.enlargeFont &&
    repairState.removeDistractions &&
    repairState.cleanChart;

  const handleComparisonChoice = (comparisonId: string, choice: 'bad' | 'good') => {
    sound.playClick();
    setComparisonAnswers({
      ...comparisonAnswers,
      [comparisonId]: choice,
    });

    if (choice === 'good') {
      sound.playSuccess();
    } else {
      sound.playError();
    }
  };

  const handleToggleRepair = (key: keyof typeof repairState) => {
    sound.playClick();
    const nextState = { ...repairState, [key]: !repairState[key] };
    setRepairState(nextState);

    const willBeComplete =
      nextState.condenseText &&
      nextState.enlargeFont &&
      nextState.removeDistractions &&
      nextState.cleanChart;

    if (willBeComplete && !isCompleted) {
      sound.playSuccess();
      sound.playBadgeFanfare();
      onCompleteLevel(60, 'badge-3');
    } else {
      sound.playClick();
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Header Banner */}
      <div className="bg-violet-50 border-2 border-slate-900 rounded-2xl p-6 mb-8 shadow-[4px_4px_0px_#0f172a]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-block text-xs font-black uppercase tracking-wider text-white bg-violet-600 px-2.5 py-0.5 rounded border border-slate-900 mb-1">
              Level 3 · Slide Saver
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900">
              The Visual Villain: Rescue Bad Slides
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 mt-1 max-w-2xl font-medium">
              Slides should support the speaker, not replace the speaker! Compare awful slides with
              audience-friendly versions, then use the Live Repair Studio to transform a catastrophic slide.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a]">
            <button
              onClick={() => setActiveMode('comparisons')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                activeMode === 'comparisons'
                  ? 'bg-violet-600 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              1. Slide Showdown ({comparisonsSolvedCount}/{SLIDE_COMPARISONS.length})
            </button>
            <button
              onClick={() => setActiveMode('repair_studio')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                activeMode === 'repair_studio'
                  ? 'bg-violet-600 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              2. Live Repair Studio
            </button>
          </div>
        </div>
      </div>

      {/* Comic Story Feature Banner */}
      <div className="bg-white border-2 border-slate-900 rounded-2xl overflow-hidden shadow-[4px_4px_0px_#0f172a] mb-8 grid grid-cols-1 md:grid-cols-12 items-center">
        <div className="md:col-span-6 p-6">
          <div className="text-xs font-black text-rose-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" />
            <span>EXHIBIT A: THE AUDIENCE CONFUSION CRISIS</span>
          </div>
          <h3 className="text-lg sm:text-xl font-display font-black text-slate-900 mb-2">
            "What am I looking at?! Is that a chart?!"
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            When presenters project an unreadable wall of text or chaotic 3D exploded pie charts, the entire classroom disconnects mentally.
            The audience gets tired, eyes hurt, and your key message is completely lost.
          </p>
          <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-3 text-xs text-amber-950 font-medium">
            <strong>The Golden Rule:</strong> Your audience came to hear you speak, not to read an essay projected onto a wall!
          </div>
        </div>

        <div className="md:col-span-6 h-60 md:h-full min-h-[220px] border-t-2 md:border-t-0 md:border-l-2 border-slate-900 overflow-hidden relative">
          <img
            src={slideVillainImg}
            alt="Audience confused by terrible unreadable presentation slide"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {activeMode === 'comparisons' && (
        <div className="space-y-8 mb-8 animate-in fade-in duration-150">
          {SLIDE_COMPARISONS.map((comp, idx) => {
            const answer = comparisonAnswers[comp.id];

            return (
              <div key={comp.id} className="bg-white rounded-2xl border-2 border-slate-900 p-6 shadow-[4px_4px_0px_#0f172a]">
                <div className="flex items-center justify-between pb-3 border-b-2 border-slate-200 mb-4">
                  <span className="text-xs font-black text-violet-800 uppercase tracking-wide">
                    Case {idx + 1}: {comp.category}
                  </span>
                  {answer === 'good' && (
                    <span className="text-xs font-black text-emerald-800 flex items-center gap-1 bg-emerald-100 border border-emerald-400 px-2.5 py-0.5 rounded">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Solved
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  {/* Option A (Bad Slide) */}
                  <div
                    onClick={() => handleComparisonChoice(comp.id, 'bad')}
                    className={`rounded-xl border-2 p-4 cursor-pointer transition-all flex flex-col justify-between ${
                      answer === 'bad'
                        ? 'border-rose-600 bg-rose-50 ring-2 ring-rose-400 shadow-[2px_2px_0px_#e11d48]'
                        : 'border-slate-300 bg-slate-50 hover:border-slate-900'
                    }`}
                  >
                    <div>
                      <div className="text-[10px] font-mono font-bold text-slate-500 uppercase mb-2">
                        VERSION A
                      </div>
                      <div className="bg-amber-100 p-3 rounded-lg border border-amber-300 mb-3">
                        <div className="text-xs font-bold text-slate-800 mb-1">{comp.badSlide.title}</div>
                        <div className="text-[11px] text-slate-600 space-y-1 font-mono">
                          {comp.badSlide.bodyLines.map((line, lidx) => (
                            <p key={lidx}>{line}</p>
                          ))}
                        </div>
                        <div className="mt-2 text-[10px] text-rose-800 font-bold bg-rose-200/80 p-1 rounded">
                          Visual: {comp.badSlide.visualType}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-slate-600 italic">{comp.badSlide.flawDescription}</div>
                  </div>

                  {/* Option B (Good Slide) */}
                  <div
                    onClick={() => handleComparisonChoice(comp.id, 'good')}
                    className={`rounded-xl border-2 p-4 cursor-pointer transition-all flex flex-col justify-between ${
                      answer === 'good'
                        ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-400 shadow-[2px_2px_0px_#059669]'
                        : 'border-slate-300 bg-white hover:border-slate-900'
                    }`}
                  >
                    <div>
                      <div className="text-[10px] font-mono font-bold text-slate-500 uppercase mb-2">
                        VERSION B (RECOMMENDED)
                      </div>
                      <div className="bg-slate-900 text-white p-3 rounded-lg border border-slate-700 mb-3">
                        <div className="text-xs font-bold text-amber-300 mb-1">{comp.goodSlide.title}</div>
                        <div className="text-[11px] text-slate-200 space-y-1">
                          {comp.goodSlide.bodyLines.map((line, lidx) => (
                            <p key={lidx}>{line}</p>
                          ))}
                        </div>
                        <div className="mt-2 text-[10px] text-emerald-300 font-bold bg-emerald-950 p-1 rounded border border-emerald-800">
                          Visual: {comp.goodSlide.visualType}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-emerald-800 font-bold">
                      {comp.goodSlide.strengthDescription}
                    </div>
                  </div>
                </div>

                {answer && (
                  <div
                    className={`p-3 rounded-xl border-2 text-xs leading-relaxed flex items-start gap-2 ${
                      answer === 'good'
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                        : 'bg-rose-50 border-rose-400 text-rose-950'
                    }`}
                  >
                    <Lightbulb className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
                    <div>
                      <strong className="block mb-0.5">Golden Rule:</strong>
                      {comp.humorousTakeaway}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <div className="flex items-center justify-between pt-4 bg-white p-5 rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0px_#0f172a]">
            <span className="text-xs text-slate-600 font-medium">
              Solve all 4 slide showdowns to unlock the Live Repair Studio!
            </span>
            <button
              onClick={() => {
                sound.playClick();
                setActiveMode('repair_studio');
              }}
              disabled={!allComparisonsSolved}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 transition-all cursor-pointer border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] ${
                allComparisonsSolved
                  ? 'bg-violet-600 text-white hover:bg-violet-700'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed border-slate-300'
              }`}
            >
              <span>Go to Live Repair Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {activeMode === 'repair_studio' && (
        <div className="bg-white rounded-2xl border-2 border-slate-900 p-6 shadow-[4px_4px_0px_#0f172a] mb-8 animate-in fade-in duration-150">
          <div className="max-w-3xl mb-6">
            <h3 className="text-lg font-black text-slate-900 mb-1">
              Live Slide Repair Studio: Awkward to Awesome!
            </h3>
            <p className="text-xs text-slate-600">
              Activate the 4 design improvements below. Watch this cluttered, unreadable disaster slide
              transform in real time into an award-winning presentation aid!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-6">
            {/* Live Visual Canvas */}
            <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-6 border-2 border-slate-900 shadow-lg min-h-[340px] flex flex-col justify-between transition-all">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pb-2 border-b border-slate-800">
                <span>PROJECTOR CANVAS (16:9 PREVIEW)</span>
                <span className={allRepairsApplied ? 'text-emerald-400 font-bold' : 'text-rose-400'}>
                  {allRepairsApplied ? '● AWESOME STATE' : '● AWKWARD STATE'}
                </span>
              </div>

              {/* Dynamic Slide Content */}
              <div
                className={`my-4 p-5 rounded-xl border-2 transition-all ${
                  repairState.enlargeFont
                    ? 'bg-slate-900 text-white border-slate-700'
                    : 'bg-amber-100 text-slate-800 border-amber-300'
                }`}
              >
                <div
                  className={`font-black transition-all ${
                    repairState.enlargeFont
                      ? 'text-lg sm:text-xl text-amber-400 mb-3'
                      : 'text-xs text-amber-950 mb-1'
                  }`}
                >
                  {repairState.condenseText
                    ? 'Caffeine & Sleep Quality in Adolescents'
                    : 'Everything We Learned About How Coffee and Energy Drinks Hurt Your Health and School Performance in Norway'}
                </div>

                {repairState.condenseText ? (
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <span>Blocks adenosine receptors, delaying drowsiness</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <span>Consuming past 18:00 reduces deep REM sleep</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <span>Recommended cutoff: at least 6 hours before bedtime</span>
                    </li>
                  </ul>
                ) : (
                  <p className="text-[10px] text-slate-700 font-mono leading-tight">
                    Paragraph: Caffeine has a biological half-life of 5 to 7 hours in healthy humans, which means if you ingest 160 milligrams at 5:00 PM, approximately 80 milligrams remain active in your cerebral circulation at 11:00 PM, competing with natural adenosine signaling pathways and consequently preventing the brain from initiating slow-wave deep sleep cycles that are vital for neuroplasticity and academic memory consolidation...
                  </p>
                )}

                {/* Visual Chart Area */}
                <div className="mt-4 pt-3 border-t border-slate-700/60">
                  {repairState.cleanChart ? (
                    <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                      <div className="text-[11px] font-bold text-amber-300 mb-2">
                        Caffeine Half-Life Remaining at Bedtime (11:00 PM)
                      </div>
                      <div className="space-y-1.5 text-[11px]">
                        <div className="flex items-center justify-between text-slate-300">
                          <span>Energy Drink at 17:00 (160mg)</span>
                          <span className="font-mono text-amber-400 font-bold">80 mg active</span>
                        </div>
                        <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden border border-slate-600">
                          <div className="bg-amber-400 h-full w-1/2" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-[10px] text-rose-800 bg-rose-100 p-2 rounded font-mono border border-rose-300 font-bold">
                      [Distracting 3D pie chart with 18 neon slices & dancing taco meme]
                    </div>
                  )}
                </div>
              </div>

              {/* Presenter Cue Note */}
              <div className="text-[11px] text-slate-400 bg-slate-900 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between">
                <span>Speaker Palm Card Note:</span>
                <span className="text-amber-400 italic font-bold">"Remember 2-second pause before slide transition"</span>
              </div>
            </div>

            {/* Repair Controls Deck */}
            <div className="lg:col-span-5 space-y-3">
              <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
                Click Toggles to Apply Visual Cures:
              </div>

              <button
                onClick={() => handleToggleRepair('condenseText')}
                className={`w-full p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${
                  repairState.condenseText
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold shadow-[2px_2px_0px_#059669]'
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="text-xs sm:text-sm font-bold">1. Condense Text to 3 Talking Points</div>
                  <div className="text-[11px] text-slate-500 font-normal">
                    Replace 120-word essay with concise bullet keywords
                  </div>
                </div>
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border-2 ${
                    repairState.condenseText
                      ? 'bg-emerald-600 border-slate-900 text-white'
                      : 'border-slate-300 bg-slate-100'
                  }`}
                >
                  {repairState.condenseText && <Check className="w-4 h-4" />}
                </div>
              </button>

              <button
                onClick={() => handleToggleRepair('enlargeFont')}
                className={`w-full p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${
                  repairState.enlargeFont
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold shadow-[2px_2px_0px_#059669]'
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="text-xs sm:text-sm font-bold">2. Enlarge Headline & High Contrast</div>
                  <div className="text-[11px] text-slate-500 font-normal">
                    Legible from back row with dark elegant backdrop
                  </div>
                </div>
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border-2 ${
                    repairState.enlargeFont
                      ? 'bg-emerald-600 border-slate-900 text-white'
                      : 'border-slate-300 bg-slate-100'
                  }`}
                >
                  {repairState.enlargeFont && <Check className="w-4 h-4" />}
                </div>
              </button>

              <button
                onClick={() => handleToggleRepair('removeDistractions')}
                className={`w-full p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${
                  repairState.removeDistractions
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold shadow-[2px_2px_0px_#059669]'
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="text-xs sm:text-sm font-bold">3. Eliminate Clipart & Memes</div>
                  <div className="text-[11px] text-slate-500 font-normal">
                    Remove irrelevant distracting gifs and maintain academic focus
                  </div>
                </div>
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border-2 ${
                    repairState.removeDistractions
                      ? 'bg-emerald-600 border-slate-900 text-white'
                      : 'border-slate-300 bg-slate-100'
                  }`}
                >
                  {repairState.removeDistractions && <Check className="w-4 h-4" />}
                </div>
              </button>

              <button
                onClick={() => handleToggleRepair('cleanChart')}
                className={`w-full p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${
                  repairState.cleanChart
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold shadow-[2px_2px_0px_#059669]'
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="text-xs sm:text-sm font-bold">4. Clean Data Visualisation</div>
                  <div className="text-[11px] text-slate-500 font-normal">
                    Replace 3D pie disaster with clean bar chart
                  </div>
                </div>
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border-2 ${
                    repairState.cleanChart
                      ? 'bg-emerald-600 border-slate-900 text-white'
                      : 'border-slate-300 bg-slate-100'
                  }`}
                >
                  {repairState.cleanChart && <Check className="w-4 h-4" />}
                </div>
              </button>
            </div>
          </div>

          {allRepairsApplied && (
            <div className="p-4 rounded-xl bg-emerald-50 border-2 border-emerald-600 flex items-center justify-between shadow-[2px_2px_0px_#059669]">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-sm font-black text-emerald-950">
                  Slide Saver Badge Unlocked! Your slide is now a crystal-clear communication powerhouse.
                </span>
              </div>
              <button
                onClick={() => {
                  sound.playClick();
                  onNextLevel();
                }}
                className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 text-xs sm:text-sm font-black flex items-center gap-2 cursor-pointer shadow-[2px_2px_0px_#0f172a] border-2 border-slate-900"
              >
                <span>Proceed to Level 4</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
