import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  BookOpen,
  Volume2,
  Search,
} from 'lucide-react';
import {
  CLAIM_CLASSIFICATIONS,
  ORAL_CITATION_BUILDERS,
  ClaimClassificationItem,
} from '../data/gameContent';
import { sound } from '../utils/sound';

interface Level5EvidenceProps {
  onCompleteLevel: (pointsEarned: number, badgeId: string) => void;
  onNextLevel: () => void;
  isCompleted: boolean;
}

export const Level5Evidence: React.FC<Level5EvidenceProps> = ({
  onCompleteLevel,
  onNextLevel,
  isCompleted,
}) => {
  const [activeTab, setActiveTab] = useState<'classification' | 'challengeA' | 'challengeB'>('classification');

  // Classification state
  const [classificationAnswers, setClassificationAnswers] = useState<Record<string, string>>({});

  // Challenge A state (Spot the unsupported claim & choose responsible action)
  const [challengeAChoice, setChallengeAChoice] = useState<string | null>(null);

  // Challenge B state (Oral citation repair)
  const [citationChoices, setCitationChoices] = useState<Record<string, string>>({});

  const solvedClassifications = CLAIM_CLASSIFICATIONS.filter(
    (c) => classificationAnswers[c.id] === c.correctCategory
  ).length;

  const isChallengeASolved = challengeAChoice === 'inspect_original';

  const solvedCitations = ORAL_CITATION_BUILDERS.filter(
    (builder) => citationChoices[builder.id] === 'opt1'
  ).length;

  const allCompleted =
    solvedClassifications === CLAIM_CLASSIFICATIONS.length &&
    isChallengeASolved &&
    solvedCitations === ORAL_CITATION_BUILDERS.length;

  const handleClassify = (id: string, category: string) => {
    sound.playClick();
    const item = CLAIM_CLASSIFICATIONS.find((c) => c.id === id);
    const newAnswers = { ...classificationAnswers, [id]: category };
    setClassificationAnswers(newAnswers);

    if (item && item.correctCategory === category) {
      sound.playSuccess();
    } else {
      sound.playError();
    }

    checkAllDone(newAnswers, challengeAChoice, citationChoices);
  };

  const handleChallengeAChoice = (choiceId: string) => {
    sound.playClick();
    setChallengeAChoice(choiceId);
    if (choiceId === 'inspect_original') {
      sound.playSuccess();
    } else {
      sound.playError();
    }

    checkAllDone(classificationAnswers, choiceId, citationChoices);
  };

  const handleCitationChoice = (builderId: string, optionId: string) => {
    sound.playClick();
    const newChoices = { ...citationChoices, [builderId]: optionId };
    setCitationChoices(newChoices);

    if (optionId === 'opt1') {
      sound.playSuccess();
    } else {
      sound.playError();
    }

    checkAllDone(classificationAnswers, challengeAChoice, newChoices);
  };

  const checkAllDone = (
    cAnswers: Record<string, string>,
    chAChoice: string | null,
    citChoices: Record<string, string>
  ) => {
    const classDone = CLAIM_CLASSIFICATIONS.every((c) => cAnswers[c.id] === c.correctCategory);
    const chADone = chAChoice === 'inspect_original';
    const citDone = ORAL_CITATION_BUILDERS.every((b) => citChoices[b.id] === 'opt1');

    if (classDone && chADone && citDone && !isCompleted) {
      sound.playBadgeFanfare();
      onCompleteLevel(60, 'badge-5');
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Header Banner */}
      <div className="bg-teal-50 border-2 border-slate-900 rounded-2xl p-6 mb-8 shadow-[4px_4px_0px_#0f172a]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-block text-xs font-black uppercase tracking-wider text-white bg-teal-700 px-2.5 py-0.5 rounded border border-slate-900 mb-1">
              Level 5 · Evidence Detective
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900">
              Research Credibility & Spoken Oral Citations
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 mt-1 max-w-2xl font-medium">
              Anyone can state an opinion, but an awesome presenter backs their claims with credible science.
              Learn how to spot unsupported hype and introduce oral citations effortlessly when speaking!
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a]">
            <button
              onClick={() => setActiveTab('classification')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                activeTab === 'classification'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              1. Claim Types ({solvedClassifications}/{CLAIM_CLASSIFICATIONS.length})
            </button>
            <button
              onClick={() => setActiveTab('challengeA')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                activeTab === 'challengeA'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              2. Inspect Claims {isChallengeASolved && '✓'}
            </button>
            <button
              onClick={() => setActiveTab('challengeB')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                activeTab === 'challengeB'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              3. Spoken Citations ({solvedCitations}/{ORAL_CITATION_BUILDERS.length})
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: Claim Classification */}
      {activeTab === 'classification' && (
        <div className="bg-white rounded-2xl border-2 border-slate-900 p-6 shadow-[4px_4px_0px_#0f172a] mb-8 animate-in fade-in duration-150">
          <div className="max-w-3xl mb-6">
            <h3 className="text-lg font-black text-slate-900 mb-1">
              Part 1: Distinguish Evidence from Hype
            </h3>
            <p className="text-xs text-slate-600">
              Classify each statement into its correct evidentiary category.
            </p>
          </div>

          <div className="space-y-4 mb-6">
            {CLAIM_CLASSIFICATIONS.map((c, idx) => {
              const selected = classificationAnswers[c.id];
              const isCorrect = selected === c.correctCategory;

              return (
                <div
                  key={c.id}
                  className={`p-4 rounded-xl border transition-all ${
                    selected
                      ? isCorrect
                        ? 'bg-emerald-50/70 border-emerald-300'
                        : 'bg-rose-50/70 border-rose-300'
                      : 'bg-slate-50/60 border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-slate-500">Case #{idx + 1}</span>
                    {selected && (
                      <span className="text-xs font-bold">
                        {isCorrect ? (
                          <span className="text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Correct Classification
                          </span>
                        ) : (
                          <span className="text-rose-700">Incorrect — Look closely at the wording</span>
                        )}
                      </span>
                    )}
                  </div>

                  <p className="text-sm font-semibold text-slate-900 mb-3">{c.statement}</p>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {[
                      { id: 'opinion', label: 'Personal Opinion' },
                      { id: 'unsupported', label: 'Unsupported Claim' },
                      { id: 'peer_reviewed', label: 'Peer-Reviewed Study' },
                      { id: 'official_report', label: 'Official Health Report' },
                      { id: 'influencer', label: 'Influencer Content' },
                    ].map((cat) => {
                      const isCatSelected = selected === cat.id;

                      return (
                        <button
                          key={cat.id}
                          onClick={() => handleClassify(c.id, cat.id)}
                          className={`p-2 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                            isCatSelected
                              ? isCorrect
                                ? 'bg-emerald-600 text-white border-emerald-600 font-bold'
                                : 'bg-rose-600 text-white border-rose-600'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {cat.label}
                        </button>
                      );
                    })}
                  </div>

                  {selected && (
                    <div className="mt-3 text-xs text-slate-700 bg-white/80 p-2.5 rounded-lg border border-slate-200 flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{c.explanation}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <span className="text-xs text-slate-500">
              Solve all 5 classifications to proceed to Challenge A!
            </span>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('challengeA');
              }}
              disabled={solvedClassifications < CLAIM_CLASSIFICATIONS.length}
              className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                solvedClassifications === CLAIM_CLASSIFICATIONS.length
                  ? 'bg-teal-700 text-white hover:bg-teal-800'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Continue to Challenge A</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Challenge A */}
      {activeTab === 'challengeA' && (
        <div className="bg-white rounded-2xl border-2 border-slate-900 p-6 shadow-[4px_4px_0px_#0f172a] mb-8 animate-in fade-in duration-150">
          <div className="max-w-3xl mb-6">
            <h3 className="text-lg font-black text-slate-900 mb-1">
              Part 2: Challenge A — Spot & Inspect the Unsupported Claim
            </h3>
            <p className="text-xs text-slate-600">
              You encounter this viral headline online while preparing your presentation:
            </p>
          </div>

          {/* Claim Card */}
          <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-5 mb-6 text-slate-900">
            <div className="text-[10px] uppercase font-mono font-bold text-amber-800 mb-1">
              VIRAL CLAIM ON SOCIAL MEDIA
            </div>
            <div className="text-base sm:text-lg font-display font-extrabold text-amber-950 mb-2">
              “Energy drinks improve academic performance in 100% of high school students!”
            </div>
            <p className="text-xs text-slate-700">
              Which response is the most academically responsible action before including this in your presentation?
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {[
              {
                id: 'repeat_claim',
                text: 'Repeat the claim in your speech because it sounds believable and matches what students want to hear.',
                isCorrect: false,
                feedback: 'Confirmation bias! Saying something because it sounds pleasing is the antithesis of academic inquiry.',
              },
              {
                id: 'use_influencer',
                text: 'Use a fitness influencer on Instagram as your only authority since they have 500,000 followers.',
                isCorrect: false,
                feedback: 'Follower count does not equal scientific authority. Commercial endorsements are not peer-reviewed evidence.',
              },
              {
                id: 'inspect_original',
                text: 'Find relevant research, inspect the original peer-reviewed source, examine the study design and sample size, and check what the evidence actually supports.',
                isCorrect: true,
                feedback: 'Spot on! Real researchers go straight to the primary literature to check the methodology, sample size, and actual measured results.',
              },
              {
                id: 'ask_ai_blind',
                text: 'Ask AI whether the claim is true and blindly copy-paste its 1-paragraph summary without verifying.',
                isCorrect: false,
                feedback: 'Generative AI can hallucinate support for popular misconceptions. Primary source inspection is always required.',
              },
            ].map((opt) => {
              const isSelected = challengeAChoice === opt.id;

              return (
                <button
                  key={opt.id}
                  onClick={() => handleChallengeAChoice(opt.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? opt.isCorrect
                        ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-300 text-slate-900'
                        : 'bg-rose-50 border-rose-400 text-slate-900'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 ${
                        isSelected
                          ? opt.isCorrect
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-rose-500 text-white border-rose-500'
                          : 'border-slate-300 text-slate-400'
                      }`}
                    >
                      {isSelected ? '✓' : '•'}
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-medium leading-relaxed">{opt.text}</div>
                      {isSelected && (
                        <div
                          className={`mt-2 text-xs font-semibold ${
                            opt.isCorrect ? 'text-emerald-800' : 'text-rose-800'
                          }`}
                        >
                          {opt.feedback}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <span className="text-xs text-slate-500">
              Solve Challenge A to unlock Challenge B (Oral Citations)!
            </span>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('challengeB');
              }}
              disabled={!isChallengeASolved}
              className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isChallengeASolved
                  ? 'bg-teal-700 text-white hover:bg-teal-800'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Continue to Challenge B</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Challenge B — Oral Citation Builder */}
      {activeTab === 'challengeB' && (
        <div className="bg-white rounded-2xl border-2 border-slate-900 p-6 shadow-[4px_4px_0px_#0f172a] mb-8 animate-in fade-in duration-150">
          <div className="max-w-3xl mb-6">
            <h3 className="text-lg font-black text-slate-900 mb-1">
              Part 3: Challenge B — Repair the Oral Citation in Spoken English
            </h3>
            <p className="text-xs text-slate-600">
              In an oral presentation, you cannot point silently at a reference list. You must introduce
              credible sources naturally with your voice! Select the natural, authoritative oral citation phrasing:
            </p>
          </div>

          <div className="space-y-6 mb-6">
            {ORAL_CITATION_BUILDERS.map((builder, bidx) => {
              const selectedOptionId = citationChoices[builder.id];

              return (
                <div key={builder.id} className="p-5 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div className="text-xs font-bold text-teal-800 uppercase tracking-wide mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>Verified Source Material #{bidx + 1}</span>
                  </div>

                  {/* Source metadata card */}
                  <div className="bg-white p-3.5 rounded-lg border border-slate-200 mb-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
                      <div>
                        <strong className="text-slate-900">Author / Team:</strong> {builder.sourceContext.author}
                      </div>
                      <div>
                        <strong className="text-slate-900">Year & Org:</strong> {builder.sourceContext.year} ·{' '}
                        {builder.sourceContext.organization}
                      </div>
                    </div>
                    <div className="mt-2 text-slate-700 pt-2 border-t border-slate-100">
                      <strong className="text-slate-900">Empirical Finding:</strong> {builder.sourceContext.finding}
                    </div>
                  </div>

                  <div className="text-xs font-semibold text-slate-800 mb-2">
                    Choose the most natural and accurate spoken oral citation:
                  </div>

                  <div className="space-y-2">
                    {builder.options.map((opt) => {
                      const isChosen = selectedOptionId === opt.id;

                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleCitationChoice(builder.id, opt.id)}
                          className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                            isChosen
                              ? opt.isBest
                                ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-300 text-slate-900'
                                : 'bg-rose-50 border-rose-400 text-slate-900'
                              : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <Volume2
                              className={`w-4 h-4 shrink-0 mt-0.5 ${
                                isChosen && opt.isBest ? 'text-emerald-600' : 'text-slate-400'
                              }`}
                            />
                            <div className="text-xs sm:text-sm italic leading-relaxed">{opt.phrase}</div>
                          </div>
                          {isChosen && (
                            <div
                              className={`mt-2 text-xs font-semibold pl-7 ${
                                opt.isBest ? 'text-emerald-800' : 'text-rose-800'
                              }`}
                            >
                              {opt.feedback}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reference List Tips */}
          <div className="bg-slate-900 text-white rounded-xl p-4 mb-6 text-xs">
            <div className="font-bold text-amber-300 mb-1 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" /> Remember the Final Reference Slide:
            </div>
            <p className="text-slate-300 leading-relaxed">
              Spoken oral citations give credit while speaking ("According to Swanson, 2024..."), but you must
              always include complete, formal bibliographic entries (APA 7th or MLA) on your final presentation slide
              so your teacher can verify your sources!
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <span className="text-xs text-slate-500">
              Complete all sections to unlock the <strong className="text-slate-800">Evidence Detective</strong> badge!
            </span>
            {allCompleted && (
              <button
                onClick={() => {
                  sound.playClick();
                  onNextLevel();
                }}
                className="px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Proceed to Level 6 (THINK: Brain Goes First)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
