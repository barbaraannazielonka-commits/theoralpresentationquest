import React, { useState } from 'react';
import {
  Cpu,
  Bot,
  User,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Send,
  HelpCircle,
  FileQuestion,
  ShieldCheck,
} from 'lucide-react';
import { AI_JUDGEMENT_CARDS, AiJudgementCard } from '../data/gameContent';
import { StudentThinkData } from '../types/game';
import { sound } from '../utils/sound';

interface Level7CollaborateProps {
  studentThink: StudentThinkData;
  onCompleteLevel: (pointsEarned: number, badgeId: string) => void;
  onNextLevel: () => void;
  isCompleted: boolean;
}

export const Level7Collaborate: React.FC<Level7CollaborateProps> = ({
  studentThink,
  onCompleteLevel,
  onNextLevel,
  isCompleted,
}) => {
  const [activeTab, setActiveTab] = useState<'assistant' | 'judgement' | 'citation_challenge'>('assistant');

  // Simulated Chat messages
  const [chatMessages, setChatMessages] = useState<
    Array<{ id: string; sender: 'user' | 'ai'; text: string; category?: string }>
  >([
    {
      id: 'init-1',
      sender: 'ai',
      text: `Hello! I am your Simulated Presentation Thinking Partner for your topic: "${studentThink.topicTitle}".
My role is NOT to write your presentation for you, but to challenge your ideas, suggest counter-perspectives, and help you find scientific angles. Which thinking prompt would you like to explore?`,
    },
  ]);

  const [customInput, setCustomInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Judgement challenge answers
  const [judgementDecisions, setJudgementDecisions] = useState<Record<string, string>>({});

  // Verified oral citation challenge
  const [citationSelection, setCitationSelection] = useState<string | null>(null);

  const promptOptions = [
    {
      key: 'challenge_arg',
      label: 'Challenge my initial argument',
      response: `Let's scrutinise your initial argument: "${studentThink.initialArgument}".
What if an audience member argues that individual differences in metabolism or evening light sensitivity vary widely? Could a complete ban on evening screen time be unrealistic for students who study via digital textbooks? What nuance can you add to prevent making a black-and-white generalization?`,
    },
    {
      key: 'deeper_questions',
      label: 'Ask me questions to think more deeply',
      response: `Here are three probing questions to deepen your presentation:
1. Is it the *blue light* wavelength itself causing delays, or the *dopamine stimulation* from engaging social media content?
2. How do circadian rhythms naturally shift in 16–18 year olds compared to younger children or adults?
3. What is the difference between *sleep quantity* (hours in bed) and *sleep quality* (deep slow-wave sleep)?`,
    },
    {
      key: 'overlooked_perspectives',
      label: 'What perspectives might I be overlooking?',
      response: `Consider these two alternative angles:
• The Social / Academic Pressure Perspective: Many teenagers use evening hours because extracurriculars and homework leave no daytime free time.
• Technology Adaptations: Night Shift modes, blue light filter glasses, and grayscale screen settings. Do they actually help according to clinical data?`,
    },
    {
      key: 'search_terms',
      label: 'Suggest search terms for finding reliable sources',
      response: `To find peer-reviewed articles without commercial hype, try searching Google Scholar or PubMed with these terms:
• "${studentThink.topicId} AND adolescent sleep onset latency"
• "circadian phase delay AND screen exposure adolescents"
• "melatonin suppression blue light randomized controlled trial"
• "Norwegian Institute of Public Health youth screen habits report"`,
    },
    {
      key: 'refine_rq',
      label: 'Make my research question more focused',
      response: `Your current question: "${studentThink.researchQuestion}".
To make it razor-sharp:
• Specify the timeline: "within 60 minutes before bedtime"
• Specify the outcome metric: "sleep onset latency and self-reported morning alertness"
• Keep the focus on your target age group (16–18 upper-secondary students).`,
    },
    {
      key: 'practice_citation',
      label: 'Help me practise introducing a source orally',
      response: `Here is a natural, conversational speaking frame you can adapt:
"According to a 2024 investigation by the Norwegian Institute of Public Health, adolescent screen use during the final hour before sleep was correlated with an average 35-minute delay in sleep onset. This demonstrates that..."
Notice how the sentence introduces the author and year smoothly before stating the finding!`,
    },
  ];

  const handleSendPrompt = (promptText: string, responseText: string) => {
    sound.playClick();
    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user' as const,
      text: promptText,
    };
    setChatMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai' as const,
        text: responseText,
      };
      setChatMessages((prev) => [...prev, aiMsg]);
      sound.playSuccess();
    }, 600);
  };

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    const query = customInput.trim();
    setCustomInput('');
    sound.playClick();

    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user' as const,
      text: query,
    };
    setChatMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const response = `Regarding "${query}": A great presenter checks how this links back to your central research question ("${studentThink.researchQuestion}"). Ask yourself: What empirical data supports this, and how would you explain it in 20 seconds to a classmate without reading from your slide?`;
      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai' as const,
        text: response,
      };
      setChatMessages((prev) => [...prev, aiMsg]);
      sound.playSuccess();
    }, 600);
  };

  // Judgement handling
  const handleJudgementDecision = (cardId: string, actionId: string) => {
    sound.playClick();
    const card = AI_JUDGEMENT_CARDS.find((c) => c.id === cardId);
    const action = card?.actionOptions.find((a) => a.id === actionId);

    const newDecisions = { ...judgementDecisions, [cardId]: actionId };
    setJudgementDecisions(newDecisions);

    if (action?.isCorrect) {
      sound.playSuccess();
    } else {
      sound.playError();
    }

    checkOverallCompletion(newDecisions, citationSelection);
  };

  // Oral citation challenge selection
  const handleCitationSelect = (choice: string) => {
    sound.playClick();
    setCitationSelection(choice);
    if (choice === 'correct') {
      sound.playSuccess();
    } else {
      sound.playError();
    }
    checkOverallCompletion(judgementDecisions, choice);
  };

  const checkOverallCompletion = (judgements: Record<string, string>, citChoice: string | null) => {
    const allJudgementsCorrect = AI_JUDGEMENT_CARDS.every((c) => {
      const chosen = judgements[c.id];
      const opt = c.actionOptions.find((a) => a.id === chosen);
      return opt?.isCorrect === true;
    });

    const citationDone = citChoice === 'correct';

    if (allJudgementsCorrect && citationDone && !isCompleted) {
      sound.playBadgeFanfare();
      onCompleteLevel(60, 'badge-7');
    }
  };

  const solvedJudgementsCount = AI_JUDGEMENT_CARDS.filter((c) => {
    const chosen = judgementDecisions[c.id];
    return c.actionOptions.find((a) => a.id === chosen)?.isCorrect === true;
  }).length;

  const isCitationSolved = citationSelection === 'correct';

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Level Header Banner */}
      <div className="bg-sky-50 border-2 border-slate-900 rounded-2xl p-6 mb-8 shadow-[4px_4px_0px_#0f172a]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white bg-sky-600 px-2.5 py-0.5 rounded border border-slate-900 mb-1">
              <Cpu className="w-4 h-4" />
              <span>Step 2 of 3: AI Collaboration Sandbox</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900">
              COLLABORATE WITH AI: A Scaffold, Not a Substitute
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 mt-1 max-w-2xl font-medium">
              AI should challenge, question, and develop your thinking—not do the work for you.
              Explore our simulated Socratic thinking partner, audit deceptive AI outputs, and practice spoken citations!
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a]">
            <button
              onClick={() => setActiveTab('assistant')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                activeTab === 'assistant'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              1. Simulated Thinking Partner
            </button>
            <button
              onClick={() => setActiveTab('judgement')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                activeTab === 'judgement'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              2. AI Judgement Audit ({solvedJudgementsCount}/{AI_JUDGEMENT_CARDS.length})
            </button>
            <button
              onClick={() => setActiveTab('citation_challenge')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                activeTab === 'citation_challenge'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              3. Citation Challenge {isCitationSolved && '✓'}
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: Simulated AI Assistant */}
      {activeTab === 'assistant' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8 animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-sky-600" />
              <span className="text-sm font-bold text-slate-900">
                Simulated AI Thinking Partner
              </span>
              <span className="text-[10px] font-mono bg-sky-100 text-sky-800 px-2 py-0.5 rounded font-semibold">
                LOCAL SIMULATION — NO EXTERNAL API REQUIRED
              </span>
            </div>
            <span className="text-xs text-slate-500">
              Topic: <strong>{studentThink.topicTitle}</strong>
            </span>
          </div>

          {/* Socratic Prompt Chips */}
          <div className="mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Select an Inquiry Prompt to Spar with AI:
            </span>
            <div className="flex flex-wrap gap-2">
              {promptOptions.map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => handleSendPrompt(opt.label, opt.response)}
                  className="px-3 py-1.5 rounded-lg text-xs bg-slate-100 hover:bg-sky-100 hover:text-sky-900 text-slate-700 transition-colors border border-slate-200 cursor-pointer font-medium"
                >
                  "{opt.label}"
                </button>
              ))}
            </div>
          </div>

          {/* Chat Stream Window */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 max-h-96 overflow-y-auto space-y-3.5 mb-4">
            {chatMessages.map((msg) => {
              const isAi = msg.sender === 'ai';

              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${isAi ? '' : 'flex-row-reverse'}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                      isAi ? 'bg-sky-600 text-white' : 'bg-slate-800 text-white'
                    }`}
                  >
                    {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  <div
                    className={`p-3.5 rounded-xl text-xs sm:text-sm leading-relaxed max-w-[85%] ${
                      isAi
                        ? 'bg-white text-slate-900 border border-slate-200 shadow-xs'
                        : 'bg-sky-600 text-white shadow-xs'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-400 italic">
                <Bot className="w-4 h-4 animate-bounce" />
                <span>AI Partner is formulating Socratic feedback...</span>
              </div>
            )}
          </div>

          {/* Custom Input */}
          <form onSubmit={handleCustomSend} className="flex gap-2">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Ask the simulated partner a question about your presentation structure..."
              className="flex-1 text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-sky-600 text-white rounded-xl hover:bg-sky-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Ask</span>
            </button>
          </form>

          <div className="flex items-center justify-between pt-4 mt-6 border-t border-slate-200">
            <span className="text-xs text-slate-500">
              Explore at least 1 prompt, then test your critical detection skills in the AI Judgement Audit!
            </span>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('judgement');
              }}
              className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <span>Go to AI Judgement Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: AI Judgement Cards */}
      {activeTab === 'judgement' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8 animate-in fade-in duration-150">
          <div className="max-w-3xl mb-6">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Part 2: The Critical AI Judgement Challenge
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Never trust an AI output blindly! Below are four typical AI responses students encounter.
              Analyze each card and decide whether to embrace it, verify the statistics, reject ghostwritten text, or audit fake citations.
            </p>
          </div>

          <div className="space-y-6 mb-6">
            {AI_JUDGEMENT_CARDS.map((card, cidx) => {
              const selectedOptionId = judgementDecisions[card.id];
              const selectedOption = card.actionOptions.find((a) => a.id === selectedOptionId);

              return (
                <div key={card.id} className="p-5 rounded-xl border border-slate-200 bg-slate-50/60">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Audit Card #{cidx + 1}: {card.cardTitle}
                    </span>
                    {selectedOption?.isCorrect && (
                      <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Audited Correctly
                      </span>
                    )}
                  </div>

                  {/* AI Response Quote Box */}
                  <div className="bg-white p-3.5 rounded-lg border border-slate-200 mb-3 text-xs sm:text-sm font-mono text-slate-800 leading-relaxed italic">
                    "{card.aiResponseText}"
                  </div>

                  <div className="text-xs font-semibold text-slate-800 mb-2">
                    How should you responsibly treat this AI output?
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {card.actionOptions.map((opt) => {
                      const isChosen = selectedOptionId === opt.id;

                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleJudgementDecision(card.id, opt.id)}
                          className={`p-3 rounded-lg text-left text-xs transition-all border cursor-pointer ${
                            isChosen
                              ? opt.isCorrect
                                ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-300 text-slate-900 font-semibold'
                                : 'bg-rose-50 border-rose-400 text-slate-900'
                              : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            <span className="font-bold">{isChosen ? (opt.isCorrect ? '✓' : '✗') : '•'}</span>
                            <span>{opt.label}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {selectedOption && (
                    <div
                      className={`mt-3 text-xs p-2.5 rounded-lg border leading-relaxed ${
                        selectedOption.isCorrect
                          ? 'bg-emerald-50 text-emerald-950 border-emerald-300'
                          : 'bg-rose-50 text-rose-950 border-rose-300'
                      }`}
                    >
                      <strong className="block mb-0.5">Critical Evaluation:</strong>
                      {selectedOption.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <span className="text-xs text-slate-500">
              Audit all 4 cards to unlock the Oral Citation Challenge!
            </span>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('citation_challenge');
              }}
              disabled={solvedJudgementsCount < AI_JUDGEMENT_CARDS.length}
              className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                solvedJudgementsCount === AI_JUDGEMENT_CARDS.length
                  ? 'bg-sky-600 text-white hover:bg-sky-700'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Continue to Citation Challenge</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Verified Oral Citation Challenge */}
      {activeTab === 'citation_challenge' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8 animate-in fade-in duration-150">
          <div className="max-w-3xl mb-6">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Part 3: Verified Source Oral Citation Integration
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              When you cite a source orally in your speech, you must connect the citation to the verified
              scientific findings rather than exaggerating or misrepresenting what the study discovered.
            </p>
          </div>

          {/* Verified Source Excerpt Box */}
          <div className="bg-slate-900 text-white rounded-xl p-5 mb-6 text-xs leading-relaxed">
            <div className="text-[10px] font-mono uppercase text-amber-400 font-bold mb-1">
              VERIFIED SCIENTIFIC EXCERPT (PEER-REVIEWED)
            </div>
            <div className="text-sm font-bold text-slate-100 mb-2">
              Swanson et al. (2024), <em>Journal of Sleep Medicine & Adolescent Health</em>
            </div>
            <p className="text-slate-300 italic mb-2">
              "In a cross-sectional investigation of 1,200 secondary school students, daily consumption of high-caffeine beverages after 18:00 was significantly correlated with a 42-minute delay in sleep onset latency (p &lt; 0.01) and self-reported daytime sleepiness. The authors noted that caffeine does not replace lost sleep hours."
            </p>
            <div className="text-[11px] text-amber-300">
              Verified Source: Norwegian Institute of Public Health / Public Domain Excerpt
            </div>
          </div>

          <div className="text-xs font-semibold text-slate-800 mb-3">
            Which spoken sentence accurately incorporates this finding as a natural oral citation?
          </div>

          <div className="space-y-3 mb-6">
            {[
              {
                id: 'correct',
                text: '“According to a 2024 study by Swanson and colleagues in the Journal of Sleep Medicine, drinking caffeinated beverages after six in the evening was linked to a 42-minute delay in falling asleep, showing that caffeine disrupts sleep timing rather than replacing rest.”',
                isBest: true,
                feedback: 'Exceptional! Cites the author, year, publication, and accurate quantified finding without sensationalising.',
              },
              {
                id: 'distorted',
                text: '“Swanson (2024) proved that anyone who drinks caffeine will permanently lose all ability to fall asleep forever.”',
                isBest: false,
                feedback: 'Gross distortion! Science studies correlations and measured delays, not eternal doom.',
              },
              {
                id: 'vague',
                text: '“AI told me that some study in 2024 said caffeine is bad.”',
                isBest: false,
                feedback: 'Vague and attributes the scientific work to an AI prompt rather than the real researchers.',
              },
            ].map((opt) => {
              const isChosen = citationSelection === opt.id;

              return (
                <button
                  key={opt.id}
                  onClick={() => handleCitationSelect(opt.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    isChosen
                      ? opt.isBest
                        ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-300 text-slate-900'
                        : 'bg-rose-50 border-rose-400 text-slate-900'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="font-bold text-xs mt-0.5">
                      {isChosen ? (opt.isBest ? '✓' : '✗') : '•'}
                    </span>
                    <div>
                      <div className="text-xs sm:text-sm italic leading-relaxed">{opt.text}</div>
                      {isChosen && (
                        <div
                          className={`mt-2 text-xs font-semibold ${
                            opt.isBest ? 'text-emerald-800' : 'text-rose-800'
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
              Badge: <strong className="text-slate-800">Human-AI Collaborator</strong>
            </span>
            {isCitationSolved && (
              <button
                onClick={() => {
                  sound.playClick();
                  onNextLevel();
                }}
                className="px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Proceed to Level 8 (REFLECT: What Did You Learn?)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
