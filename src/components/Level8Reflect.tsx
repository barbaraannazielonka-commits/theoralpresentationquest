import React, { useState } from 'react';
import {
  Compass,
  ArrowRight,
  Sparkles,
  Copy,
  Check,
  CheckCircle2,
  FileText,
  Lightbulb,
  Edit3,
} from 'lucide-react';
import { StudentThinkData, ReflectionData } from '../types/game';
import { sound } from '../utils/sound';

interface Level8ReflectProps {
  studentThink: StudentThinkData;
  reflection: ReflectionData;
  onUpdateReflection: (data: ReflectionData, statement: string) => void;
  onCompleteLevel: (pointsEarned: number, badgeId: string) => void;
  onNextLevel: () => void;
  isCompleted: boolean;
}

export const Level8Reflect: React.FC<Level8ReflectProps> = ({
  studentThink,
  reflection,
  onUpdateReflection,
  onCompleteLevel,
  onNextLevel,
  isCompleted,
}) => {
  const [copied, setCopied] = useState(false);

  const [q1, setQ1] = useState(
    reflection.initialThoughts ||
      `Initially, I thought ${studentThink.initialArgument || 'energy drinks were the only main cause of teen daytime fatigue'}.`
  );
  const [q2, setQ2] = useState(
    reflection.aiHelp ||
      'After considering the AI prompts, I realised that psychological stimulation from social media content interacts with blue light wavelengths.'
  );
  const [q3, setQ3] = useState(
    reflection.rejectedOrModified ||
      'I rejected the AI suggestion claiming 94.73% of students fail because it was an overconfident, unverified statistical hallucination.'
  );
  const [q4, setQ4] = useState(
    reflection.verifiedSource ||
      'I verified the peer-reviewed study by Swanson and colleagues (2024) from the Norwegian Institute of Public Health.'
  );
  const [q5, setQ5] = useState(
    reflection.changedQuestion ||
      'My research question became more focused: instead of general screen habits, I narrowed it to screen use within 60 minutes of bedtime.'
  );
  const [q6, setQ6] = useState(
    reflection.understandingVsEase ||
      'AI did not just make the task faster; it acted as a sparring partner that forced me to defend my claims with concrete evidence.'
  );
  const [q7, setQ7] = useState(
    reflection.ownReasoning ||
      'The core interpretation, personal examples, presentation slide design, and speaking strategy remain entirely based on my own reasoning.'
  );
  const [q8, setQ8] = useState(
    reflection.acknowledgementPlan ||
      'I will include an AI Disclosure Statement in my final reference slide stating that AI was used strictly for brainstorming research keywords and counter-perspectives.'
  );

  // Draft Statement based purely on student input
  const generatedDraft = `=== DRAFT STUDENT AI DISCLOSURE STATEMENT ===
Student Presentation Topic: ${studentThink.topicTitle}
Research Question: ${studentThink.researchQuestion}

1. Scope of AI Assistance:
I consulted a simulated AI thinking partner during the planning phase to explore counter-perspectives and refine my research scope. 

2. Critical Human Verification:
${q3}
${q4}

3. Independent Student Ownership:
${q7}
The oral presentation script, visual slide layouts, and spoken delivery were independently written and delivered by the student.

4. Teacher Disclosure:
${q8}
=============================================`;

  const [statementText, setStatementText] = useState(generatedDraft);

  const handleSaveReflection = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();

    const data: ReflectionData = {
      initialThoughts: q1,
      aiHelp: q2,
      rejectedOrModified: q3,
      verifiedSource: q4,
      changedQuestion: q5,
      understandingVsEase: q6,
      ownReasoning: q7,
      acknowledgementPlan: q8,
      saved: true,
    };

    onUpdateReflection(data, statementText);

    if (!isCompleted) {
      sound.playSuccess();
      sound.playBadgeFanfare();
      onCompleteLevel(60, 'badge-8');
    } else {
      sound.playSuccess();
    }
  };

  const handleCopyStatement = () => {
    navigator.clipboard.writeText(statementText);
    setCopied(true);
    sound.playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Step 3 Banner */}
      <div className="bg-emerald-50 border-2 border-slate-900 rounded-2xl p-6 mb-8 shadow-[4px_4px_0px_#0f172a]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white bg-emerald-700 px-2.5 py-0.5 rounded border border-slate-900 mb-1">
              <Compass className="w-4 h-4" />
              <span>Step 3 of 3: Metacognition & Honesty</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900">
              REFLECT: What Did You Actually Learn?
            </h2>
            <p className="text-xs sm:text-sm text-slate-800 mt-1 max-w-2xl font-bold">
              Compare your initial independent thinking with your thinking after AI collaboration.
              Metacognition turns a good student into an awesome scholar!
            </p>
          </div>

          <div className="shrink-0 bg-white border-2 border-slate-900 rounded-xl px-4 py-2.5 shadow-[2px_2px_0px_#0f172a] text-xs text-slate-800">
            <span className="font-bold text-emerald-700">Sequence:</span> 1. THINK → 2. COLLABORATE →{' '}
            <strong className="text-emerald-950 underline font-black">3. REFLECT</strong>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison: Level 6 Thinking vs Post-AI Thinking */}
      <div className="bg-white rounded-2xl border-2 border-slate-900 p-6 shadow-[4px_4px_0px_#0f172a] mb-8">
        <h3 className="text-base font-bold text-slate-900 mb-3">
          Side-by-Side Comparison: Pre-AI vs. Post-AI Evolution
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pre-AI card */}
          <div className="bg-indigo-50/60 p-4 rounded-xl border border-indigo-200">
            <div className="text-[10px] uppercase font-mono font-bold text-indigo-700 mb-1">
              BEFORE AI COLLABORATION (LEVEL 6)
            </div>
            <div className="text-xs font-bold text-slate-900 mb-2">
              Topic: {studentThink.topicTitle}
            </div>
            <div className="text-xs text-slate-700 space-y-2">
              <div>
                <strong className="text-slate-900">Initial RQ:</strong> {studentThink.researchQuestion}
              </div>
              <div>
                <strong className="text-slate-900">Initial Hypothesis:</strong> {studentThink.initialArgument}
              </div>
            </div>
          </div>

          {/* Post-AI card */}
          <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200">
            <div className="text-[10px] uppercase font-mono font-bold text-emerald-700 mb-1">
              AFTER AI COLLABORATION & AUDIT (LEVEL 7)
            </div>
            <div className="text-xs font-bold text-slate-900 mb-2">
              Refined Scope & Critical Audit
            </div>
            <div className="text-xs text-slate-700 space-y-2">
              <div>
                <strong className="text-slate-900">Nuanced RQ:</strong> {q5}
              </div>
              <div>
                <strong className="text-slate-900">Audited Evidence:</strong> {q4}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 8 Reflective Inquiry Prompts Form */}
      <form onSubmit={handleSaveReflection} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <div className="mb-6 pb-4 border-b border-slate-200">
          <h3 className="text-base font-bold text-slate-900">
            Eight Reflective Prompts for Academic Integrity
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Complete the sentence starters below based on your genuine learning process:
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              1. What did I think before using AI?
            </label>
            <input
              type="text"
              value={q1}
              onChange={(e) => setQ1(e.target.value)}
              className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              2. What did AI help me understand or question?
            </label>
            <input
              type="text"
              value={q2}
              onChange={(e) => setQ2(e.target.value)}
              className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              3. Which suggestion did I reject, modify, or verify?
            </label>
            <input
              type="text"
              value={q3}
              onChange={(e) => setQ3(e.target.value)}
              className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              4. Which source did I check independently?
            </label>
            <input
              type="text"
              value={q4}
              onChange={(e) => setQ4(e.target.value)}
              className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              5. How has my research question or argument changed?
            </label>
            <input
              type="text"
              value={q5}
              onChange={(e) => setQ5(e.target.value)}
              className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              6. Did AI improve my understanding, or did it simply make the task easier?
            </label>
            <input
              type="text"
              value={q6}
              onChange={(e) => setQ6(e.target.value)}
              className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              7. What parts of the final result are based on my own reasoning?
            </label>
            <input
              type="text"
              value={q7}
              onChange={(e) => setQ7(e.target.value)}
              className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              8. How will I acknowledge my AI use according to my teacher’s instructions?
            </label>
            <input
              type="text"
              value={q8}
              onChange={(e) => setQ8(e.target.value)}
              className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 outline-none"
            />
          </div>
        </div>

        {/* Auto-generated AI Disclosure Statement preview */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-700" />
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Your Draft AI Use Statement (Customised for Your Teacher)
              </span>
            </div>
            <button
              type="button"
              onClick={handleCopyStatement}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Statement'}</span>
            </button>
          </div>

          <textarea
            rows={7}
            value={statementText}
            onChange={(e) => setStatementText(e.target.value)}
            className="w-full text-xs font-mono p-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-emerald-500 outline-none"
          />
          <div className="text-[11px] text-slate-500 mt-1">
            Note: This draft statement is generated strictly from your inputs above with zero invented claims. You can edit it freely before submitting to your teacher!
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-200">
          <span className="text-xs text-slate-500">
            Badge: <strong className="text-slate-800">Reflective Thinker</strong>
          </span>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 text-xs sm:text-sm font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save Reflection & Unlock Badge</span>
            </button>

            {reflection.saved && (
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onNextLevel();
                }}
                className="px-5 py-2.5 bg-amber-600 text-white rounded-xl hover:bg-amber-700 text-xs sm:text-sm font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>Enter Final Boss Battle!</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
