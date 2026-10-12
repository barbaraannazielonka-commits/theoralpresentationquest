import React, { useState } from 'react';
import {
  Brain,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Copy,
  Check,
  Lightbulb,
  BookOpen,
} from 'lucide-react';
import { HEALTH_TOPICS } from '../data/gameContent';
import { StudentThinkData } from '../types/game';
import { sound } from '../utils/sound';

interface Level6ThinkProps {
  studentThink: StudentThinkData;
  onUpdateThink: (data: StudentThinkData) => void;
  onCompleteLevel: (pointsEarned: number, badgeId: string) => void;
  onNextLevel: () => void;
  isCompleted: boolean;
}

export const Level6Think: React.FC<Level6ThinkProps> = ({
  studentThink,
  onUpdateThink,
  onCompleteLevel,
  onNextLevel,
  isCompleted,
}) => {
  const [copied, setCopied] = useState(false);
  const [topicId, setTopicId] = useState(studentThink.topicId || 'sleep');
  const [whatIKnow, setWhatIKnow] = useState(
    studentThink.whatIKnow ||
      'Teenagers often stay up late looking at screens and feel exhausted during morning classes. Good sleep helps memory and focus.'
  );
  const [researchQuestion, setResearchQuestion] = useState(
    studentThink.researchQuestion ||
      'How does blue light exposure from screens within 60 minutes of bedtime influence adolescent sleep quality and next-day classroom focus?'
  );
  const [q1, setQ1] = useState(
    studentThink.investigationQuestions[0] ||
      'What biological mechanism connects screen light to melatonin suppression?'
  );
  const [q2, setQ2] = useState(
    studentThink.investigationQuestions[1] ||
      'Are there measurable differences in test scores between students with 8 hours of sleep vs 6 hours?'
  );
  const [initialArgument, setInitialArgument] = useState(
    studentThink.initialArgument ||
      'Late-night screen use delays melatonin onset by roughly 30 to 60 minutes, which leads to sleep debt and reduced memory retention in school.'
  );
  const [evidenceNeeded, setEvidenceNeeded] = useState(
    studentThink.evidenceNeeded ||
      'Peer-reviewed sleep laboratory trials, official adolescent health guidelines (WHO/FHI), and statistics on screen habits.'
  );
  const [prediction, setPrediction] = useState(
    studentThink.prediction ||
      'I predict studies will show that cognitive performance drops significantly after 3 consecutive nights of less than 7 hours of sleep.'
  );

  const selectedTopicObj = HEALTH_TOPICS.find((t) => t.id === topicId) || HEALTH_TOPICS[0];

  const handleSelectTopic = (id: string) => {
    sound.playClick();
    setTopicId(id);
    const chosen = HEALTH_TOPICS.find((t) => t.id === id);
    if (chosen) {
      setResearchQuestion(chosen.sampleRQ);
    }
  };

  const handleSaveAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();

    const updatedData: StudentThinkData = {
      topicId,
      topicTitle: selectedTopicObj.title,
      whatIKnow,
      researchQuestion,
      investigationQuestions: [q1, q2],
      initialArgument,
      evidenceNeeded,
      prediction,
      saved: true,
    };

    onUpdateThink(updatedData);

    if (!isCompleted) {
      sound.playSuccess();
      sound.playBadgeFanfare();
      onCompleteLevel(60, 'badge-6');
    } else {
      sound.playSuccess();
    }
  };

  const handleCopyNotes = () => {
    const textToCopy = `=== PRESENTATION QUEST: THINK WORKSPACE ===
Topic: ${selectedTopicObj.title}
Research Question: ${researchQuestion}
What I already know: ${whatIKnow}
Questions to investigate:
1) ${q1}
2) ${q2}
Initial Argument / Hypothesis: ${initialArgument}
Evidence Needed: ${evidenceNeeded}
My Prediction: ${prediction}
===========================================`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    sound.playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  const isFormValid =
    whatIKnow.trim().length > 10 &&
    researchQuestion.trim().length > 15 &&
    q1.trim().length > 5 &&
    q2.trim().length > 5 &&
    initialArgument.trim().length > 10;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Mandatory Sequence Banner */}
      <div className="bg-indigo-50 border-2 border-slate-900 rounded-2xl p-6 mb-8 shadow-[4px_4px_0px_#0f172a]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white bg-indigo-600 px-2.5 py-0.5 rounded border border-slate-900 mb-1">
              <Brain className="w-4 h-4" />
              <span>Step 1 of 3: Mandatory Inquiry Sequence</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900">
              THINK: Your Brain Goes First!
            </h2>
            <p className="text-xs sm:text-sm text-slate-800 mt-1 max-w-2xl font-bold">
              “Your brain has entered the chat! Give it a chance to think before inviting AI.”
            </p>
          </div>

          <div className="shrink-0 bg-white border-2 border-slate-900 rounded-xl px-4 py-2.5 shadow-[2px_2px_0px_#0f172a] text-xs text-slate-800">
            <span className="font-black text-indigo-700">Sequence:</span>{' '}
            <strong className="text-indigo-950 underline font-black">1. THINK</strong> → 2. COLLABORATE → 3. REFLECT
          </div>
        </div>
      </div>

      {/* Topic Picker */}
      <div className="bg-white rounded-2xl border-2 border-slate-900 p-6 shadow-[4px_4px_0px_#0f172a] mb-8">
        <div className="mb-4">
          <h3 className="text-base font-black text-slate-900">
            1. Select Your Presentation Topic (Health & Life Skills)
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Choose an interdisciplinary topic suitable for upper-secondary school (B1–B2 EFL):
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {HEALTH_TOPICS.map((topic) => {
            const isSelected = topic.id === topicId;

            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => handleSelectTopic(topic.id)}
                className={`p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-indigo-50 border-slate-900 ring-2 ring-indigo-400 shadow-[3px_3px_0px_#0f172a] -translate-y-0.5'
                    : 'bg-white border-slate-300 hover:border-slate-900 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="text-xs sm:text-sm font-black text-slate-900 mb-1">{topic.title}</div>
                  <div className="text-[11px] text-slate-600 leading-snug">{topic.description}</div>
                </div>
                {isSelected && (
                  <div className="mt-2 text-[10px] font-black text-indigo-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Selected Topic
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Independent Thinking Workspace Form */}
      <form onSubmit={handleSaveAndSubmit} className="bg-white rounded-2xl border-2 border-slate-900 p-6 shadow-[4px_4px_0px_#0f172a] mb-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              2. Independent Thinking Workspace
            </h3>
            <p className="text-xs text-slate-500">
              Formulate your initial hypotheses and inquiry plan before asking AI for assistance.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCopyNotes}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy My Thinking'}</span>
          </button>
        </div>

        <div className="space-y-6">
          {/* Field 1: What I already know */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-1.5">
              A. What do you already know about this topic? (Prior Knowledge)
            </label>
            <textarea
              rows={3}
              value={whatIKnow}
              onChange={(e) => setWhatIKnow(e.target.value)}
              placeholder="Record your current understanding, observations, or daily experiences..."
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
            />
            <span className="text-[11px] text-slate-400">
              You are never evaluated negatively for incomplete knowledge! Curiosity and honesty come first.
            </span>
          </div>

          {/* Field 2: Research Question */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                B. Formulate Your Focused Research Question
              </label>
              <button
                type="button"
                onClick={() => setResearchQuestion(selectedTopicObj.sampleRQ)}
                className="text-[11px] text-indigo-600 hover:underline cursor-pointer font-medium"
              >
                Use Recommended Sample RQ
              </button>
            </div>
            <input
              type="text"
              value={researchQuestion}
              onChange={(e) => setResearchQuestion(e.target.value)}
              placeholder="e.g. How does X influence Y among teenagers?"
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none font-medium"
            />
          </div>

          {/* Field 3: Two Investigation Questions */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-1.5">
              C. Two Specific Questions You Need to Investigate
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <span className="text-[11px] text-slate-500 font-medium block mb-1">Investigation Question 1:</span>
                <input
                  type="text"
                  value={q1}
                  onChange={(e) => setQ1(e.target.value)}
                  placeholder="e.g., What are the biological mechanisms?"
                  className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <span className="text-[11px] text-slate-500 font-medium block mb-1">Investigation Question 2:</span>
                <input
                  type="text"
                  value={q2}
                  onChange={(e) => setQ2(e.target.value)}
                  placeholder="e.g., What empirical data exists on sleep duration?"
                  className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Field 4: Initial Argument / Hypothesis */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-1.5">
              D. Suggest an Initial Argument or Possible Explanation (Hypothesis)
            </label>
            <textarea
              rows={2}
              value={initialArgument}
              onChange={(e) => setInitialArgument(e.target.value)}
              placeholder="What initial claim or thesis do you think is supported by real evidence?"
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Field 5 & 6: Evidence & Prediction */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-1.5">
                E. Evidence Needed to Answer RQ
              </label>
              <textarea
                rows={2}
                value={evidenceNeeded}
                onChange={(e) => setEvidenceNeeded(e.target.value)}
                placeholder="What types of sources (e.g. clinical trials, surveys, WHO stats) do you need?"
                className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-1.5">
                F. What Do You Predict You Might Discover?
              </label>
              <textarea
                rows={2}
                value={prediction}
                onChange={(e) => setPrediction(e.target.value)}
                placeholder="What surprised you in preliminary thoughts?"
                className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Submission actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 mt-6 border-t border-slate-200">
          <div className="text-xs text-slate-500">
            {isFormValid ? (
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Ready to submit independent thinking workspace
              </span>
            ) : (
              <span>Please fill in the fields above to unlock the AI collaboration stage.</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-sm transition-all ${
                isFormValid
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Submit Initial Thinking & Unlock AI</span>
              <Sparkles className="w-4 h-4" />
            </button>

            {studentThink.saved && (
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onNextLevel();
                }}
                className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 text-xs sm:text-sm font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>Proceed to Level 7 (Collaborate with AI)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
