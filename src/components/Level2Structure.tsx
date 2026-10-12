import React, { useState } from 'react';
import {
  Layers,
  ArrowUp,
  ArrowDown,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  ArrowRight,
  BookOpen,
  HelpCircle,
  RotateCcw,
} from 'lucide-react';
import { STRUCTURE_ITEMS, CONCEPT_DISTINCTIONS, StructureItem } from '../data/gameContent';
import { sound } from '../utils/sound';

interface Level2StructureProps {
  onCompleteLevel: (pointsEarned: number, badgeId: string) => void;
  onNextLevel: () => void;
  isCompleted: boolean;
}

export const Level2Structure: React.FC<Level2StructureProps> = ({
  onCompleteLevel,
  onNextLevel,
  isCompleted,
}) => {
  // Concept distinction state
  const [conceptAnswers, setConceptAnswers] = useState<Record<string, 'topic' | 'research_question' | 'argument'>>({});
  const [activeTab, setActiveTab] = useState<'concepts' | 'ordering'>('concepts');

  // Ordering list state (initially shuffled including distractors)
  const [orderedItems, setOrderedItems] = useState<StructureItem[]>(() => {
    // Deliberately scrambled order
    return [
      STRUCTURE_ITEMS[4], // Evidence
      STRUCTURE_ITEMS[8], // Distractor: Start with That's all from me
      STRUCTURE_ITEMS[0], // Hook
      STRUCTURE_ITEMS[9], // Distractor: 17 hamsters
      STRUCTURE_ITEMS[2], // Research Question
      STRUCTURE_ITEMS[1], // Intro
      STRUCTURE_ITEMS[6], // Conclusion
      STRUCTURE_ITEMS[3], // Main points
      STRUCTURE_ITEMS[10], // Distractor: Introduce topic after conclusion
      STRUCTURE_ITEMS[5], // Transitions
      STRUCTURE_ITEMS[7], // References
    ];
  });

  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [isOrderValid, setIsOrderValid] = useState<boolean>(isCompleted);
  const [showModel, setShowModel] = useState<boolean>(isCompleted);

  // Concept verification
  const conceptSolvedCount = CONCEPT_DISTINCTIONS.filter(
    (c) => conceptAnswers[c.id] === c.type
  ).length;
  const allConceptsSolved = conceptSolvedCount === CONCEPT_DISTINCTIONS.length;

  const handleConceptSelect = (questionId: string, answer: 'topic' | 'research_question' | 'argument') => {
    sound.playClick();
    const newAnswers = { ...conceptAnswers, [questionId]: answer };
    setConceptAnswers(newAnswers);

    const question = CONCEPT_DISTINCTIONS.find((q) => q.id === questionId);
    if (question && question.type === answer) {
      sound.playSuccess();
    } else {
      sound.playError();
    }
  };

  // Reordering helpers
  const moveItem = (index: number, direction: 'up' | 'down') => {
    sound.playClick();
    const newItems = [...orderedItems];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;

    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;
    setOrderedItems(newItems);
  };

  const removeItem = (id: string) => {
    sound.playClick();
    setOrderedItems(orderedItems.filter((item) => item.id !== id));
  };

  const handleValidateOrder = () => {
    sound.playClick();
    // 1. Check if any distractors remain
    const remainingDistractors = orderedItems.filter((item) => item.isDistractor);
    if (remainingDistractors.length > 0) {
      sound.playError();
      setValidationMessage(
        `Oops! You still have funny distractors in your lineup: "${remainingDistractors[0].label}". Remove all distractors first!`
      );
      return;
    }

    // 2. Check if all 8 non-distractor items are present
    const validItems = orderedItems.filter((item) => !item.isDistractor);
    if (validItems.length < 8) {
      sound.playError();
      setValidationMessage('You are missing some essential presentation components. Reset and try again!');
      return;
    }

    // 3. Check correct sequence (rank 1 through 8)
    let isSequenceCorrect = true;
    for (let i = 0; i < validItems.length; i++) {
      if (validItems[i].correctRank !== i + 1) {
        isSequenceCorrect = false;
        break;
      }
    }

    if (!isSequenceCorrect) {
      sound.playError();
      setValidationMessage(
        'Almost there! Check the order: Hook comes first, followed by Introduction & Purpose, Research Question, Main Points, Evidence, Transitions, Conclusion, and Reference List.'
      );
      return;
    }

    // Success!
    sound.playSuccess();
    sound.playBadgeFanfare();
    setIsOrderValid(true);
    setShowModel(true);
    setValidationMessage('Perfection! You have built a rock-solid, logical presentation architecture.');
    onCompleteLevel(60, 'badge-2');
  };

  const handleResetOrder = () => {
    sound.playClick();
    setOrderedItems([
      STRUCTURE_ITEMS[4],
      STRUCTURE_ITEMS[8],
      STRUCTURE_ITEMS[0],
      STRUCTURE_ITEMS[9],
      STRUCTURE_ITEMS[2],
      STRUCTURE_ITEMS[1],
      STRUCTURE_ITEMS[6],
      STRUCTURE_ITEMS[3],
      STRUCTURE_ITEMS[10],
      STRUCTURE_ITEMS[5],
      STRUCTURE_ITEMS[7],
    ]);
    setValidationMessage(null);
    setIsOrderValid(false);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Header Banner */}
      <div className="bg-blue-50 border-2 border-slate-900 rounded-2xl p-6 mb-8 shadow-[4px_4px_0px_#0f172a]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-block text-xs font-black uppercase tracking-wider text-white bg-blue-600 px-2.5 py-0.5 rounded border border-slate-900 mb-1">
              Level 2 · Structure Architect
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900">
              Build a Presentation That Makes Sense
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 mt-1 max-w-2xl font-medium">
              A speech without structure is just a pile of words! Master the vital distinction between
              a Topic, a Research Question, and an Argument, then organise a presentation from Hook to References.
            </p>
          </div>

          {/* Step Switcher Tabs */}
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a]">
            <button
              onClick={() => setActiveTab('concepts')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                activeTab === 'concepts'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              1. Concept Distinction ({conceptSolvedCount}/3)
            </button>
            <button
              onClick={() => setActiveTab('ordering')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                activeTab === 'ordering'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              2. Blueprint Sequence
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'concepts' && (
        <div className="bg-white rounded-2xl border-2 border-slate-900 p-6 shadow-[4px_4px_0px_#0f172a] mb-8 animate-in fade-in duration-150">
          <div className="max-w-3xl mb-6">
            <h3 className="text-lg font-black text-slate-900 mb-1">
              Part A: Topic vs. Research Question vs. Central Argument
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Many students confuse these three fundamental building blocks. Classify each of the three examples
              below before structuring the main timeline!
            </p>
          </div>

          <div className="space-y-4 mb-6">
            {CONCEPT_DISTINCTIONS.map((q, idx) => {
              const selected = conceptAnswers[q.id];
              const isCorrect = selected === q.type;

              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-xl border transition-all ${
                    selected
                      ? isCorrect
                        ? 'bg-emerald-50/70 border-emerald-300'
                        : 'bg-rose-50/70 border-rose-300'
                      : 'bg-slate-50/60 border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="text-xs font-mono font-bold text-slate-500">
                      Statement #{idx + 1}
                    </span>
                    {selected && (
                      <span className="text-xs font-bold flex items-center gap-1">
                        {isCorrect ? (
                          <span className="text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Correct!
                          </span>
                        ) : (
                          <span className="text-rose-700 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" /> Re-examine
                          </span>
                        )}
                      </span>
                    )}
                  </div>

                  <p className="text-sm font-semibold text-slate-900 mb-3">{q.statement}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      onClick={() => handleConceptSelect(q.id, 'topic')}
                      className={`p-2 rounded-lg text-xs font-semibold border text-center transition-all cursor-pointer ${
                        selected === 'topic'
                          ? q.type === 'topic'
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-rose-600 text-white border-rose-600'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      A Topic (Broad theme)
                    </button>
                    <button
                      onClick={() => handleConceptSelect(q.id, 'research_question')}
                      className={`p-2 rounded-lg text-xs font-semibold border text-center transition-all cursor-pointer ${
                        selected === 'research_question'
                          ? q.type === 'research_question'
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-rose-600 text-white border-rose-600'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      A Research Question (Inquiry)
                    </button>
                    <button
                      onClick={() => handleConceptSelect(q.id, 'argument')}
                      className={`p-2 rounded-lg text-xs font-semibold border text-center transition-all cursor-pointer ${
                        selected === 'argument'
                          ? q.type === 'argument'
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-rose-600 text-white border-rose-600'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      A Central Argument (Thesis claim)
                    </button>
                  </div>

                  {selected && (
                    <div className="mt-3 text-xs text-slate-700 bg-white/80 p-2.5 rounded-lg border border-slate-200 flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <span>{q.explanation}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <span className="text-xs text-slate-500">
              Solve all 3 distinctions to move to the Blueprint Sequence!
            </span>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('ordering');
              }}
              disabled={!allConceptsSolved}
              className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                allConceptsSolved
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Continue to Blueprint Sequence</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {activeTab === 'ordering' && (
        <div className="bg-white rounded-2xl border-2 border-slate-900 p-6 shadow-[4px_4px_0px_#0f172a] mb-8 animate-in fade-in duration-150">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b-2 border-slate-200">
            <div>
              <h3 className="text-lg font-black text-slate-900">
                Part B: The Presentation Sequence Architecture
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Remove ridiculous distractors (use the red trash button), and use the Up / Down arrows
                to arrange the 8 components into an airtight pedagogical sequence.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetOrder}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </button>
              <button
                onClick={handleValidateOrder}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold cursor-pointer shadow-xs"
              >
                Validate Architecture
              </button>
            </div>
          </div>

          {validationMessage && (
            <div
              className={`p-3.5 rounded-xl border mb-5 text-xs sm:text-sm flex items-start gap-2.5 ${
                isOrderValid
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-medium'
                  : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}
            >
              {isOrderValid ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              )}
              <span>{validationMessage}</span>
            </div>
          )}

          {/* Ordering items stack */}
          <div className="space-y-2.5 mb-6">
            {orderedItems.map((item, index) => {
              return (
                <div
                  key={item.id}
                  className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                    item.isDistractor
                      ? 'bg-rose-50/80 border-rose-300'
                      : isOrderValid
                      ? 'bg-emerald-50/60 border-emerald-300'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-6 h-6 rounded-md bg-slate-200 text-slate-800 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">{item.description}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => moveItem(index, 'up')}
                      disabled={index === 0}
                      aria-label="Move item up"
                      className="p-1.5 rounded-md hover:bg-slate-200 text-slate-600 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveItem(index, 'down')}
                      disabled={index === orderedItems.length - 1}
                      aria-label="Move item down"
                      className="p-1.5 rounded-md hover:bg-slate-200 text-slate-600 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    {item.isDistractor && (
                      <button
                        onClick={() => removeItem(item.id)}
                        title="Remove silly distractor"
                        className="p-1.5 rounded-md bg-rose-100 hover:bg-rose-200 text-rose-700 cursor-pointer ml-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Model Architecture Guide Box */}
          {showModel && (
            <div className="bg-slate-900 text-white rounded-xl p-5 mb-6">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                <BookOpen className="w-4 h-4" />
                <span>The Gold Standard Presentation Blueprint</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Keep this model outline bookmarked for all your high school and university oral exams!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                  <strong className="text-amber-300 block mb-1">1. Hook & Intro (15% time)</strong>
                  Engage listener, define scope, state research question & thesis roadmap.
                </div>
                <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                  <strong className="text-amber-300 block mb-1">2. Core Evidence (70% time)</strong>
                  2–3 main points backed by peer-reviewed studies and natural oral citations.
                </div>
                <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                  <strong className="text-amber-300 block mb-1">3. Transitions</strong>
                  Verbal bridges that maintain cognitive coherence between sections.
                </div>
                <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                  <strong className="text-amber-300 block mb-1">4. Conclusion & Sources (15% time)</strong>
                  Directly answer the research question, synthesis, and full reference slide.
                </div>
              </div>
            </div>
          )}

          {isOrderValid && (
            <div className="flex items-center justify-end pt-4 border-t border-slate-200">
              <button
                onClick={() => {
                  sound.playClick();
                  onNextLevel();
                }}
                className="px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <span>Proceed to Level 3 (The Visual Villain)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
