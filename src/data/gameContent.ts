import { Badge } from '../types/game';

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'badge-1',
    levelId: 1,
    title: 'Presentation Detective',
    subtitle: 'Disaster Diagnostician',
    description: 'Diagnosed all critical communication catastrophes in Disaster Dave’s presentation.',
    icon: 'Search',
    unlocked: false,
  },
  {
    id: 'badge-2',
    levelId: 2,
    title: 'Structure Architect',
    subtitle: 'Blueprint Master',
    description: 'Organised a flawless logical sequence from Hook to Reference List, rejecting silly distractors.',
    icon: 'Layers',
    unlocked: false,
  },
  {
    id: 'badge-3',
    levelId: 3,
    title: 'Slide Saver',
    subtitle: 'Visual Alchemist',
    description: 'Rescued overloaded, tiny-font slides into clean, audience-friendly visual aids.',
    icon: 'Monitor',
    unlocked: false,
  },
  {
    id: 'badge-4',
    levelId: 4,
    title: 'Confident Communicator',
    subtitle: 'Delivery Strategist',
    description: 'Mastered natural pacing, calm recovery from slips, inclusive body language, and cue card usage.',
    icon: 'Mic',
    unlocked: false,
  },
  {
    id: 'badge-5',
    levelId: 5,
    title: 'Evidence Detective',
    subtitle: 'Citation Specialist',
    description: 'Separated hype from verified science and introduced oral citations naturally in speech.',
    icon: 'ShieldCheck',
    unlocked: false,
  },
  {
    id: 'badge-6',
    levelId: 6,
    title: 'Independent Thinker',
    subtitle: 'Brain Goes First',
    description: 'Formulated a research question and initial argument before inviting AI into the chat.',
    icon: 'Brain',
    unlocked: false,
  },
  {
    id: 'badge-7',
    levelId: 7,
    title: 'Human-AI Collaborator',
    subtitle: 'Critical Scaffold Partner',
    description: 'Used AI as a thinking partner, audited hallucinated claims, and kept human ownership.',
    icon: 'Cpu',
    unlocked: false,
  },
  {
    id: 'badge-8',
    levelId: 8,
    title: 'Reflective Thinker',
    subtitle: 'Metacognition Expert',
    description: 'Compared pre- and post-AI thinking and crafted an honest, transparent AI disclosure statement.',
    icon: 'Compass',
    unlocked: false,
  },
  {
    id: 'badge-9',
    levelId: 9,
    title: 'Oral Presentation Champion',
    subtitle: 'From Awkward to Awesome',
    description: 'Defeated the Final Boss by fully transforming a flawed presentation into a top-grade speech!',
    icon: 'Trophy',
    unlocked: false,
  },
];

export const HEALTH_TOPICS = [
  {
    id: 'sleep',
    title: 'Sleep and Concentration in High School',
    description: 'How circadian rhythms, blue light, and 8-hour sleep targets impact memory and academic focus.',
    sampleRQ: 'How does chronic sleep deprivation affect cognitive performance and mood in upper-secondary students?',
    knownKeywords: ['circadian rhythm', 'REM sleep', 'screen time', 'memory consolidation', 'melatonin'],
  },
  {
    id: 'energy_drinks',
    title: 'Energy Drinks and Teenage Physical Health',
    description: 'High caffeine doses, sugar spikes, cardiac effects, and marketing aimed at gamers and athletes.',
    sampleRQ: 'To what extent does frequent consumption of high-caffeine energy drinks influence adolescent cardiovascular health and anxiety levels?',
    knownKeywords: ['caffeine crash', 'heart rate', 'sugar content', 'marketing regulation', 'sleep disturbance'],
  },
  {
    id: 'social_media',
    title: 'Social Media Algorithms and Mental Well-being',
    description: 'Dopamine feedback loops, comparison culture, doomscrolling, and healthy digital boundaries.',
    sampleRQ: 'What is the relationship between algorithmically curated short-form video feeds and adolescent attention spans and body image?',
    knownKeywords: ['algorithm', 'dopamine', 'upward social comparison', 'FOMO', 'screen time balance'],
  },
  {
    id: 'fitness',
    title: 'Fitness Trends: Science vs. Social Media Hype',
    description: 'Comparing extreme workout/diet fads promoted by influencers with established exercise physiology.',
    sampleRQ: 'How can teenagers critically differentiate between evidence-based fitness training and misleading viral workout trends on TikTok?',
    knownKeywords: ['hypertrophy', 'influencer marketing', 'supplement claims', 'progressive overload', 'recovery'],
  },
  {
    id: 'stress',
    title: 'School Stress and Evidence-Based Coping Strategies',
    description: 'Exam anxiety, time management, active relaxation techniques, and building long-term psychological resilience.',
    sampleRQ: 'Which evidence-based psychological and lifestyle interventions are most effective for mitigating exam stress in upper-secondary students?',
    knownKeywords: ['cortisol', 'mindfulness', 'Pomodoro technique', 'cognitive reframing', 'support networks'],
  },
  {
    id: 'nutrition',
    title: 'Nutrition, Brain Fuel, and Daily Habits',
    description: 'The gut-brain axis, breakfast habits, ultra-processed foods, and sustained mental energy throughout the school day.',
    sampleRQ: 'How does daily dietary quality, particularly breakfast composition, correlate with sustained attention and energy during afternoon classes?',
    knownKeywords: ['glycemic index', 'ultra-processed food', 'gut-brain axis', 'complex carbs', 'hydration'],
  },
];

// Level 1: Presentation Disaster Scenarios
export interface DisasterHotspot {
  id: string;
  targetName: string;
  iconName: string;
  visualTag: string;
  quote: string;
  question: string;
  options: {
    id: string;
    text: string;
    isBest: boolean;
    feedback: string;
    tip: string;
  }[];
}

export const DISASTER_HOTSPOTS: DisasterHotspot[] = [
  {
    id: 'slide_wall',
    targetName: 'The 200-Word Slide Wall',
    iconName: 'FileText',
    visualTag: 'Slide text in 8pt font with entire paragraphs',
    quote: '"As you can see on my slide, paragraph 1 states that according to broad historical analyses spanning numerous centuries..." (Presenter reads every word with their back to the audience)',
    question: 'The presenter puts 200 words on the slide and reads each word aloud. Why is this a disaster?',
    options: [
      {
        id: 'opt1',
        text: 'It is excellent because the audience receives the exact information twice so they remember more.',
        isBest: false,
        feedback: 'Cognitive overload! The human brain cannot read complex text and listen to someone reading it simultaneously without processing friction.',
        tip: 'Keep slides minimal: maximum 3–5 bullet points or key phrases, letting your voice do the explaining.',
      },
      {
        id: 'opt2',
        text: 'Ineffective: reading slides word-for-word splits the audience’s attention and makes the speaker redundant.',
        isBest: true,
        feedback: 'Spot on! The audience can read faster than you can speak. If you read your slides, the audience tunes out or gets frustrated.',
        tip: 'Your slide is a visual backdrop, not a teleprompter or a wall-mounted essay.',
      },
      {
        id: 'opt3',
        text: 'It is fine as long as the font color is bright yellow or neon green.',
        isBest: false,
        feedback: 'Neon text on slides actually hurts eyes and worsens legibility!',
        tip: 'Stick to clean, high-contrast dark text on light backgrounds or vice-versa.',
      },
    ],
  },
  {
    id: 'speaking_pace',
    targetName: 'Supersonic Mumbling Pace',
    iconName: 'VolumeX',
    visualTag: 'Presenter speaking at 260 words/min without taking a breath',
    quote: '"...and-then-the-caffeine-goes-into-the-blood-and-stuff-and-yeah-like-super-fast-anyway-next-slide..."',
    question: 'The presenter rushes at lightning speed without pausing or making eye contact. How does this hurt communication?',
    options: [
      {
        id: 'opt1',
        text: 'Fast speaking proves high intelligence and allows you to finish the presentation earlier.',
        isBest: false,
        feedback: 'Finishing fast does not equal good communication. If the audience cannot digest your ideas, your presentation has failed.',
        tip: 'Intentional pauses give the audience time to understand key concepts and give you time to breathe.',
      },
      {
        id: 'opt2',
        text: 'Unclear delivery: without natural pauses and emphasis, listeners cannot identify what is important.',
        isBest: true,
        feedback: 'Spot on! Pauses are punctuation marks for speech. A 2-second pause before a key point builds anticipation and clarity.',
        tip: 'Aim for a steady conversational pace of roughly 120–140 words per minute, using cue cards with marked breath breaks.',
      },
      {
        id: 'opt3',
        text: 'It is harmless because listeners can just ask you to repeat the whole presentation at the end.',
        isBest: false,
        feedback: 'Audiences rarely ask for a full replay. They simply disconnect mentally.',
        tip: 'Maintain steady volume, look around the room, and enunciate key terms clearly.',
      },
    ],
  },
  {
    id: 'unsupported_claims',
    targetName: 'The "Trust Me Bro" Claim',
    iconName: 'HelpCircle',
    visualTag: '"100% of scientists agree chocolate replaces sleep!"',
    quote: '"Basically, everyone knows energy drinks give you superpowers and studies say they cure laziness."',
    question: 'The presenter makes bold factual claims without stating any source or methodology. Why does this ruin credibility?',
    options: [
      {
        id: 'opt1',
        text: 'Saying "studies say" is sufficient because everyone knows studies exist.',
        isBest: false,
        feedback: '"Studies say" is the oldest shortcut in school presentations! Which study? Who conducted it? Was it published in 2024 or 1952?',
        tip: 'Always provide specific attribution: "In a 2024 study published by the Norwegian Institute of Public Health..."',
      },
      {
        id: 'opt2',
        text: 'Vague claims without attribution destroy academic credibility and leave listeners sceptical.',
        isBest: true,
        feedback: 'Exactly right! Academic presentations require evidence-backed claims so the audience can verify the truth.',
        tip: 'Distinguish between personal feelings ("In my experience...") and empirical facts ("According to researchers at Oxford...").',
      },
      {
        id: 'opt3',
        text: 'It is good because citing sources takes up too much speaking time.',
        isBest: false,
        feedback: 'Oral citations take only 4 to 6 seconds and dramatically boost your grade and trustworthiness.',
        tip: 'A quick oral citation sounds effortless: "According to Dr. Swanson (2024)..."',
      },
    ],
  },
  {
    id: 'no_structure',
    targetName: 'The Missing Introduction & Hook',
    iconName: 'Compass',
    visualTag: 'Starts with "Uhhh yeah, so whatever, my topic is stuff."',
    quote: '"Hi, so yeah, this is my presentation. Let’s look at slide 1 right away without any context."',
    question: 'The presenter jumps straight into random data without hooking the audience or stating a research question. What is the impact?',
    options: [
      {
        id: 'opt1',
        text: 'Audiences prefer being surprised about what the presentation is actually about.',
        isBest: false,
        feedback: 'Surprise is good for mystery novels, not for academic presentations! The audience needs a roadmap to follow your thoughts.',
        tip: 'Always hook the listener with an intriguing question or statistic, state your research question, and outline your journey.',
      },
      {
        id: 'opt2',
        text: 'Without an introduction and clear purpose, the audience does not know why the topic matters or where it is going.',
        isBest: true,
        feedback: 'Bingo! A good introduction sets the stage: Why should we care? What question will this talk answer?',
        tip: 'Use the 3-step intro: Hook the curiosity → State your research question → Outline main points.',
      },
      {
        id: 'opt3',
        text: 'Introductions are only necessary if your presentation is over 45 minutes long.',
        isBest: false,
        feedback: 'Even a 3-minute presentation needs a clear 20-second opening hook and research question.',
        tip: 'Spend 10–15% of your total speaking time on your introduction.',
      },
    ],
  },
  {
    id: 'ai_hallucination',
    targetName: 'Unchecked AI Hallucination',
    iconName: 'AlertTriangle',
    visualTag: 'Citing "Professor Barnaby from the Mars Institute of Energy Drinks"',
    quote: '"I asked AI for a quote, and it said Dr. Fluffington in 2029 proved caffeine makes you immortal. I did not check it though."',
    question: 'The presenter copy-pasted information from an AI chat without verifying whether the source exists. What went wrong?',
    options: [
      {
        id: 'opt1',
        text: 'Nothing went wrong because AI is an omniscient computer that never makes mistakes.',
        isBest: false,
        feedback: 'Generative AI models predict language patterns—they can fabricate convincing citations, fake authors, and false statistics ("hallucinations")!',
        tip: 'Never cite an AI-invented source without opening the actual paper or website yourself.',
      },
      {
        id: 'opt2',
        text: 'The student outsourced their critical thinking and presented fabricated information as fact.',
        isBest: true,
        feedback: 'Crucial distinction! AI is a brainstorming scaffold, not a substitute for fact-checking. You are responsible for every word you speak.',
        tip: 'Rule of thumb: If you cannot find the actual paper via Google Scholar or a library database, do not cite it.',
      },
      {
        id: 'opt3',
        text: 'They should have asked the AI to write an apology slide just in case.',
        isBest: false,
        feedback: 'Humorous, but prevention is much better: check primary sources before stepping up to speak!',
        tip: 'Use AI to brainstorm search terms, then verify the findings on reputable scientific websites.',
      },
    ],
  },
  {
    id: 'qa_freeze',
    targetName: 'The Q&A Panic Defense',
    iconName: 'ShieldAlert',
    visualTag: 'Freezes when asked "What sample size was used in that study?"',
    quote: '"Teacher: Can you clarify what that chart measures? Presenter: ...Uhhhh... I don’t know, I just found it on Pinterest."',
    question: 'When asked a follow-up question, the presenter freezes and admits they have no idea what their slide means. What is the remedy?',
    options: [
      {
        id: 'opt1',
        text: 'Pretend the fire alarm went off and quickly leave the classroom.',
        isBest: false,
        feedback: 'A dramatic escape, but it will not help your oral assessment score!',
        tip: 'It is completely acceptable to say: "That is an interesting question. I didn’t examine that specific variable, but my research suggests..."',
      },
      {
        id: 'opt2',
        text: 'Only include visuals and facts that you personally understand and can explain in your own words.',
        isBest: true,
        feedback: 'Perfect! If you cannot explain a chart in simple terms to your classmate, do not put it in your presentation.',
        tip: 'Deep understanding beats superficial complexity. Present what you have genuinely mastered.',
      },
      {
        id: 'opt3',
        text: 'Argue aggressively with the teacher so they feel too shy to ask anything else.',
        isBest: false,
        feedback: 'Definitely not! Presentations are a polite conversation with your audience.',
        tip: 'Honest humility and intellectual curiosity impress teachers far more than fake confidence.',
      },
    ],
  },
];

// Level 2: Presentation Components Sorting & Concept Distinction
export interface StructureItem {
  id: string;
  label: string;
  description: string;
  isDistractor: boolean;
  correctRank: number; // 1 to 8 for valid ones, -1 for distractors
  pedagogicalNote: string;
}

export const STRUCTURE_ITEMS: StructureItem[] = [
  {
    id: 'hook',
    label: '1. Engaging Opening Hook',
    description: 'A thought-provoking question, surprising statistic, or relatable anecdote to grab attention.',
    isDistractor: false,
    correctRank: 1,
    pedagogicalNote: 'First 30 seconds: Wake up the room before diving into theory.',
  },
  {
    id: 'intro_purpose',
    label: '2. Introduction & Purpose',
    description: 'Explain what the topic is, why it is personally or societally relevant, and what the speech will explore.',
    isDistractor: false,
    correctRank: 2,
    pedagogicalNote: 'Sets the context and motivates why this presentation is worth listening to.',
  },
  {
    id: 'research_question',
    label: '3. Clear Research Question & Central Argument',
    description: 'State the specific question your presentation investigates and preview your initial hypothesis or thesis.',
    isDistractor: false,
    correctRank: 3,
    pedagogicalNote: 'Gives the presentation a clear scientific and intellectual compass.',
  },
  {
    id: 'main_points',
    label: '4. Main Points & Explanations',
    description: '2–3 structured subtopics broken into clear concepts with real-world examples.',
    isDistractor: false,
    correctRank: 4,
    pedagogicalNote: 'The core body of your talk. Keep points focused rather than covering everything superficially.',
  },
  {
    id: 'evidence_citations',
    label: '5. Reliable Evidence & Oral Citations',
    description: 'Substantiate claims with peer-reviewed studies, official reports, and spoken attributions.',
    isDistractor: false,
    correctRank: 5,
    pedagogicalNote: 'Transforms a collection of personal opinions into a credible academic speech.',
  },
  {
    id: 'transitions',
    label: '6. Signposting & Transitions Between Ideas',
    description: 'Spoken guideposts like "Having examined the biological effects, let’s now turn to the psychological impact..."',
    isDistractor: false,
    correctRank: 6,
    pedagogicalNote: 'Prevents mental whiplash for the audience when shifting from one theme to the next.',
  },
  {
    id: 'conclusion',
    label: '7. Conclusion Answering the Research Question',
    description: 'Synthesise your findings, directly answer your research question, and offer a final takeaway.',
    isDistractor: false,
    correctRank: 7,
    pedagogicalNote: 'Never introduce brand-new arguments here. Tie the threads together and leave a lasting impression.',
  },
  {
    id: 'reference_list',
    label: '8. Complete Reference Slide',
    description: 'Display academic sources formatted according to teacher guidelines (e.g., APA/MLA) for verification.',
    isDistractor: false,
    correctRank: 8,
    pedagogicalNote: 'Gives full transparency, acknowledges original authors, and allows your teacher to verify.',
  },
  {
    id: 'distractor_1',
    label: 'Distractor: Start with "That’s all from me, thank you"',
    description: 'Saying goodbye before you even say hello.',
    isDistractor: true,
    correctRank: -1,
    pedagogicalNote: 'A classic comedy mistake! Leave closing remarks for the very end.',
  },
  {
    id: 'distractor_2',
    label: 'Distractor: Add 17 Unrelated Hamster Facts',
    description: 'Dumping random trivia that has zero connection to your research question.',
    isDistractor: true,
    correctRank: -1,
    pedagogicalNote: 'Stay strictly relevant to your research question. Kill your darlings!',
  },
  {
    id: 'distractor_3',
    label: 'Distractor: Introduce the Topic After the Conclusion',
    description: 'Explaining what the talk was about after everyone has already packed their bags.',
    isDistractor: true,
    correctRank: -1,
    pedagogicalNote: 'Topic introduction must happen in the opening, never in overtime.',
  },
];

export interface ConceptDistinctionQuestion {
  id: string;
  statement: string;
  type: 'topic' | 'research_question' | 'argument';
  explanation: string;
}

export const CONCEPT_DISTINCTIONS: ConceptDistinctionQuestion[] = [
  {
    id: 'c1',
    statement: '"Social media and adolescent sleep quality"',
    type: 'topic',
    explanation: 'A Topic is a broad subject area or theme. It does not take a stand or ask a question.',
  },
  {
    id: 'c2',
    statement: '"How does nighttime smartphone usage influence deep sleep duration among 16–18 year olds?"',
    type: 'research_question',
    explanation: 'A Research Question is an open, focused, debatable question that guides your investigation.',
  },
  {
    id: 'c3',
    statement: '"Restricting blue light exposure 60 minutes before bed significantly improves student morning focus by preserving melatonin synthesis."',
    type: 'argument',
    explanation: 'A Central Argument (thesis) is a claim or position supported by evidence that answers the research question.',
  },
];

// Level 3: Visual Villain comparisons
export interface SlideComparison {
  id: string;
  category: string;
  badSlide: {
    title: string;
    bodyLines: string[];
    visualType: string;
    flawDescription: string;
  };
  goodSlide: {
    title: string;
    bodyLines: string[];
    visualType: string;
    strengthDescription: string;
  };
  humorousTakeaway: string;
}

export const SLIDE_COMPARISONS: SlideComparison[] = [
  {
    id: 'text_density',
    category: 'Text Density: Essays vs. Talking Points',
    badSlide: {
      title: 'History and Pharmacological Effects of Caffeine in Modern Society',
      bodyLines: [
        'Caffeine is a central nervous system stimulant of the methylxanthine class. It is the world’s most widely consumed psychoactive drug. Unlike many other psychoactive substances, it is legal and unregulated in nearly all parts of the world. There are several known mechanisms of action to explain the effects of stimulation. The most prominent is that it reversibly blocks the action of adenosine on its receptors and consequently prevents the onset of drowsiness induced by adenosine.',
      ],
      visualType: 'Wall of 75 words in 10pt grey text',
      flawDescription: 'The audience will spend 2 minutes reading this instead of listening to you.',
    },
    goodSlide: {
      title: 'How Caffeine Blocks Drowsiness',
      bodyLines: [
        '• Mimics adenosine (the sleepiness molecule)',
        '• Binds to brain receptors without activating them',
        '• Temporarily delays fatigue signals',
      ],
      visualType: 'Clean icon diagram showing receptor lock-and-key',
      strengthDescription: '3 clear bullet points that support the speaker’s oral explanation.',
    },
    humorousTakeaway: 'Your audience came to hear you speak, not to read your entire essay projected onto a wall.',
  },
  {
    id: 'typography',
    category: 'Typography & Contrast',
    badSlide: {
      title: 'SURVEY RESULTS ABOUT SCREEN TIME',
      bodyLines: [
        'Yellow text on white background: 65% of students look at screens before sleeping according to our small class poll conducted last Tuesday afternoon during math class...',
      ],
      visualType: 'Tiny 9pt comic font, low contrast yellow on white background',
      flawDescription: 'Illegible from the 2nd row of the classroom, causing eye strain.',
    },
    goodSlide: {
      title: 'Night Screen Habits (Class Survey)',
      bodyLines: [
        '• 65% use phone within 30 min of bed',
        '• Main activity: short-form video & messaging',
        '• Reported outcome: later sleep onset',
      ],
      visualType: 'Bold 28pt high-contrast dark navy on crisp background with readable chart',
      strengthDescription: 'Instantly readable from the back row in 3 seconds.',
    },
    humorousTakeaway: 'If the student in the back row has to squint like a hawk, your font is too small!',
  },
  {
    id: 'imagery',
    category: 'Visual Relevance: Clip Art vs. Purposeful Graphic',
    badSlide: {
      title: 'Brain Health and Memory',
      bodyLines: ['Memory consolidation happens at night.'],
      visualType: '5 random spinning smiley gifs, dancing tacos, and irrelevant memes',
      flawDescription: 'Visual clutter that distracts and undermines academic seriousness.',
    },
    goodSlide: {
      title: 'Memory Consolidation in Deep Sleep',
      bodyLines: [
        '• Hippocampus transfers memories to cortex',
        '• Synaptic pruning clears mental clutter',
      ],
      visualType: 'Simplified, elegant diagram of brain memory transfer',
      strengthDescription: 'The graphic actively clarifies how the biological process works.',
    },
    humorousTakeaway: 'A dancing meme might get a cheap chuckle, but a clear diagram gets you top marks.',
  },
  {
    id: 'charts',
    category: 'Data Visualisation: Chaos vs. Clarity',
    badSlide: {
      title: 'Global Energy Drink Market Breakdown by 42 Subcategories',
      bodyLines: ['Look at this 3D exploded pie chart with 32 neon slices and overlapping labels.'],
      visualType: 'Chaotic 3D pie chart where slices are impossible to compare',
      flawDescription: 'Humans cannot accurately compare 3D angles; total visual chaos.',
    },
    goodSlide: {
      title: 'Caffeine Content Comparison (per 250ml)',
      bodyLines: [
        '• Energy drink: 80–160 mg',
        '• Filter coffee: 95 mg',
        '• Cola: 24 mg',
      ],
      visualType: 'Clean horizontal bar chart with bold values and clean labels',
      strengthDescription: 'The comparison is crystal clear in a single glance.',
    },
    humorousTakeaway: 'Friends don’t let friends use 3D exploded pie charts.',
  },
];

// Level 4: The Speaking Showdown
export interface SpeakingScenario {
  id: string;
  situationTitle: string;
  characterState: string;
  scenarioText: string;
  options: {
    id: string;
    text: string;
    isBest: boolean;
    feedback: string;
  }[];
}

export const SPEAKING_SCENARIOS: SpeakingScenario[] = [
  {
    id: 'brain_freeze',
    situationTitle: '1. The Mid-Sentence Brain Freeze',
    characterState: 'You are speaking smoothly, and suddenly your mind goes completely blank on slide 3.',
    scenarioText: 'You forget the specific word "cardiovascular" and pause mid-sentence. What is the most confident move?',
    options: [
      {
        id: 'opt1',
        text: 'Panic, apologise profusely for two minutes, and tell the class you are terrible at English.',
        isBest: false,
        feedback: 'Apologising excessively draws attention to a tiny slip that the audience would otherwise not notice.',
      },
      {
        id: 'opt2',
        text: 'Take a calm breath, glance down at your palm card, rephrase with simple words ("heart and blood vessels"), and keep going.',
        isBest: true,
        feedback: 'Outstanding! Audiences appreciate calm recovery. A 2-second pause sounds thoughtful, not broken. Communicative resilience is an assessed skill!',
      },
      {
        id: 'opt3',
        text: 'Faint dramatically so you don’t have to finish the presentation.',
        isBest: false,
        feedback: 'Funny, but you’ll just have to present during lunch break instead!',
      },
    ],
  },
  {
    id: 'adrenaline_pace',
    situationTitle: '2. The Adrenaline Rush (Speeding Train)',
    characterState: 'Your heart is racing, and you notice your words coming out at double speed.',
    scenarioText: 'You realise you have covered 4 slides in only 90 seconds. How should you regulate your pace?',
    options: [
      {
        id: 'opt1',
        text: 'Plant both feet firmly, take a deliberate 2-second breath at the slide transition, sip water, and intentionally stretch key vowels.',
        isBest: true,
        feedback: 'Brilliant! Physical grounding (feet on floor, slow breath) resets your autonomic nervous system and restores a steady conversational rhythm.',
      },
      {
        id: 'opt2',
        text: 'Keep accelerating to break the world record for the fastest Norwegian high-school presentation.',
        isBest: false,
        feedback: 'Your teacher needs to evaluate your clarity, pronunciation, and argumentation—not your auctioneering skills!',
      },
      {
        id: 'opt3',
        text: 'Stop speaking completely and gesture silently at the slides for the remaining 5 minutes.',
        isBest: false,
        feedback: 'This is an oral presentation, so speaking remains non-negotiable!',
      },
    ],
  },
  {
    id: 'notes_vs_script',
    situationTitle: '3. Notes vs. Script Trap',
    characterState: 'You want to feel safe, but you don’t want to read like a robot.',
    scenarioText: 'How should you prepare your physical speaking notes?',
    options: [
      {
        id: 'opt1',
        text: 'Print out your full 1,500-word essay on 3 A4 sheets and read it line by line with your head down.',
        isBest: false,
        feedback: 'Reading a written essay kills vocal variety and eye contact. Written English and spoken English have completely different rhythms.',
      },
      {
        id: 'opt2',
        text: 'Use small index cards with bulleted keywords, statistics, and oral citation cues (e.g., "[Pause] -> Swanson (2024) -> 32% decline").',
        isBest: true,
        feedback: 'Spot on! Palm cards provide a safety net while forcing your eyes up toward the audience, fostering natural spoken syntax.',
      },
      {
        id: 'opt3',
        text: 'Have zero notes whatsoever and just freestyle everything without prior practice.',
        isBest: false,
        feedback: 'Freestyling often leads to rambling, missed evidence, and running out of time.',
      },
    ],
  },
  {
    id: 'eye_contact',
    situationTitle: '4. Audience Connection & Gaze',
    characterState: 'Looking directly into your classmates’ eyes makes you feel self-conscious.',
    scenarioText: 'How can you establish audience connection without feeling overwhelmed?',
    options: [
      {
        id: 'opt1',
        text: 'Stare exclusively at your teacher’s pen for the entire 10 minutes.',
        isBest: false,
        feedback: 'That creates awkward tension for your teacher and ignores the rest of your audience!',
      },
      {
        id: 'opt2',
        text: 'Scan the room gently: look at the back wall, friendly classmates on the left, middle, and right, or just above people’s foreheads.',
        isBest: true,
        feedback: 'Inclusive and effective! Looking just above heads or scanning zones across the room creates the appearance of confident connection without intense 1-on-1 pressure.',
      },
      {
        id: 'opt3',
        text: 'Turn your back completely and talk directly to the projection screen.',
        isBest: false,
        feedback: 'Talking to the wall muffles your voice and disconnects you from the room.',
      },
    ],
  },
  {
    id: 'tough_question',
    situationTitle: '5. The Unanticipated Audience Question',
    characterState: 'A classmate or teacher asks a detailed question you didn’t research.',
    scenarioText: '"Does caffeine affect cortisol differently in male vs female adolescents?" You did not study that. What do you say?',
    options: [
      {
        id: 'opt1',
        text: 'Make up a fake percentage with a confident grin: "Yes, 83% higher in females according to science!"',
        isBest: false,
        feedback: 'Fabricating facts is the fastest way to lose academic integrity if challenged.',
      },
      {
        id: 'opt2',
        text: '"That’s an insightful question. My research focused primarily on overall adolescent sleep patterns, so I haven’t examined gender differences in cortisol yet, but it would be a fascinating follow-up investigation."',
        isBest: true,
        feedback: 'Masterclass in academic professionalism! Acknowledging the scope of your research with intellectual honesty impresses teachers far more than bluffing.',
      },
      {
        id: 'opt3',
        text: 'Tell the asker their question is invalid and refuse to speak.',
        isBest: false,
        feedback: 'Aggressive and unhelpful. Embrace questions as collaborative inquiry!',
      },
    ],
  },
];

// Level 5: The Evidence Detective
export interface ClaimClassificationItem {
  id: string;
  statement: string;
  correctCategory: 'opinion' | 'unsupported' | 'peer_reviewed' | 'official_report' | 'influencer';
  explanation: string;
}

export const CLAIM_CLASSIFICATIONS: ClaimClassificationItem[] = [
  {
    id: 'cl1',
    statement: '"In my view, schools should ban morning tests because teenagers feel tired."',
    correctCategory: 'opinion',
    explanation: 'Personal perspective starting with "In my view". It reflects a feeling or belief, not empirical evidence.',
  },
  {
    id: 'cl2',
    statement: '"Studies universally prove that energy drinks boost test scores by 50% without any crashes."',
    correctCategory: 'unsupported',
    explanation: 'A dramatic sweeping claim with vague "studies prove" and zero attribution or context.',
  },
  {
    id: 'cl3',
    statement: '"A randomised controlled trial by Swanson et al. (2024) in the Journal of Adolescent Health observed a 28-minute delay in sleep onset following late caffeine intake."',
    correctCategory: 'peer_reviewed',
    explanation: 'Gold-standard academic evidence: named author, year, peer-reviewed journal, methodology, and concrete measured finding.',
  },
  {
    id: 'cl4',
    statement: '"The World Health Organization (WHO, 2024) recommends at least 8 to 10 hours of sleep per night for adolescents aged 14–17."',
    correctCategory: 'official_report',
    explanation: 'Established public health consensus from an internationally accredited health body.',
  },
  {
    id: 'cl5',
    statement: '"FitnessBro99 on TikTok swears this new detox powder cured his brain fog in 48 hours."',
    correctCategory: 'influencer',
    explanation: 'Commercial influencer endorsement. Anecdotal, unregulated, and financially incentivised.',
  },
];

export interface OralCitationBuilderItem {
  id: string;
  sourceContext: {
    author: string;
    year: string;
    organization: string;
    finding: string;
  };
  options: {
    id: string;
    phrase: string;
    isBest: boolean;
    feedback: string;
  }[];
}

export const ORAL_CITATION_BUILDERS: OralCitationBuilderItem[] = [
  {
    id: 'cit1',
    sourceContext: {
      author: 'Swanson and colleagues',
      year: '2024',
      organization: 'Norwegian Institute of Public Health (FHI)',
      finding: 'Regular energy drink consumption in youth was associated with increased insomnia and shorter sleep duration.',
    },
    options: [
      {
        id: 'opt1',
        phrase: '"According to a 2024 study led by Swanson and published by the Norwegian Institute of Public Health, adolescents consuming energy drinks daily reported higher rates of insomnia and reduced sleep duration."',
        isBest: true,
        feedback: 'Flawless oral citation! Identifies the author, publication year, reputable organisation, and the precise empirical finding.',
      },
      {
        id: 'opt2',
        phrase: '"Norway said energy drinks destroy your soul in 2024."',
        isBest: false,
        feedback: 'Inaccurate, dramatic, and attributes a study to an entire country rather than the research team.',
      },
      {
        id: 'opt3',
        phrase: '"A study says that caffeine is bad for sleeping."',
        isBest: false,
        feedback: 'Vague "a study says" gives zero credibility to the audience.',
      },
    ],
  },
  {
    id: 'cit2',
    sourceContext: {
      author: 'World Health Organization (WHO)',
      year: '2024',
      organization: 'United Nations Health Agency',
      finding: 'Adolescent screen use within 1 hour before bedtime delays melatonin release by an average of 45 minutes.',
    },
    options: [
      {
        id: 'opt1',
        phrase: '"In a 2024 briefing, the World Health Organization highlighted that screen use within an hour of bedtime delays melatonin release by approximately 45 minutes."',
        isBest: true,
        feedback: 'Natural, authoritative, and precise! Flows seamlessly in spoken English.',
      },
      {
        id: 'opt2',
        phrase: '"The internet told me screens stop melatonin."',
        isBest: false,
        feedback: 'Too informal and does not identify the credible scientific organisation.',
      },
      {
        id: 'opt3',
        phrase: '"WHO 2024 brackets parenthesis page 14 paragraph 2 line 3..."',
        isBest: false,
        feedback: 'Do not read APA punctuation aloud! Oral citations should sound like natural sentences, not bibliographies.',
      },
    ],
  },
];

// Level 7: AI Judgement Cards
export interface AiJudgementCard {
  id: string;
  cardTitle: string;
  aiResponseText: string;
  riskType: 'helpful_scaffold' | 'overconfident_statistic' | 'lazy_essay' | 'hallucinated_source';
  bestAction: 'accept' | 'verify_stat' | 'reject_essay' | 'audit_source';
  actionOptions: {
    id: string;
    label: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export const AI_JUDGEMENT_CARDS: AiJudgementCard[] = [
  {
    id: 'card1',
    cardTitle: 'AI Output A: The Socratic Thinking Partner',
    aiResponseText:
      '"Your argument that phone bans in bedrooms improve sleep is interesting. However, consider: what about students who use their phones as alarms or calming audiobooks? How might socioeconomic factors influence separate bedroom technology? What specific evidence could you look for regarding blue light vs. emotional stimulation?"',
    riskType: 'helpful_scaffold',
    bestAction: 'accept',
    actionOptions: [
      {
        id: 'a1',
        label: 'Embrace & Use: It challenges assumptions and prompts deeper inquiry without doing the work for you.',
        isCorrect: true,
        explanation: 'Excellent! This is the ideal use of AI: prompting critical thinking, counter-perspectives, and self-reflection.',
      },
      {
        id: 'a2',
        label: 'Reject: AI should give direct answers instead of asking questions.',
        isCorrect: false,
        explanation: 'Remember, AI is best as a thinking scaffold, not a cheat code.',
      },
    ],
  },
  {
    id: 'card2',
    cardTitle: 'AI Output B: The Suspiciously Specific Stat',
    aiResponseText:
      '"Exactly 94.73% of all Norwegian high schoolers who drink energy drinks fail their math exams, and 99.1% develop chronic cardiac arrhythmia within 6 months."',
    riskType: 'overconfident_statistic',
    bestAction: 'verify_stat',
    actionOptions: [
      {
        id: 'b1',
        label: 'Believe immediately because decimals (94.73%) prove it is scientific and exact.',
        isCorrect: false,
        explanation: 'AI often invents hyper-specific decimal numbers to sound persuasive! This is classic hallucination.',
      },
      {
        id: 'b2',
        label: 'Flag & Verify: Extreme percentages require primary source verification in official health registries.',
        isCorrect: true,
        explanation: 'Spot on! Never accept statistical claims without checking the real primary dataset.',
      },
    ],
  },
  {
    id: 'card3',
    cardTitle: 'AI Output C: The "Do It All For Me" Essay Dump',
    aiResponseText:
      '"Here is your complete 10-minute presentation script. Just read this verbatim: Good morning ladies and gentlemen, today I will expound upon the multifaceted ramifications of caffeine consumption..."',
    riskType: 'lazy_essay',
    bestAction: 'reject_essay',
    actionOptions: [
      {
        id: 'c1',
        label: 'Reject or heavily rework: Copying a full AI script leaves you helpless in Q&A and violates academic integrity.',
        isCorrect: true,
        explanation: 'Crucial! If you don’t do the intellectual legwork, you cannot explain or defend the ideas when your teacher asks questions.',
      },
      {
        id: 'c2',
        label: 'Accept: It saves time and uses fancy words like "expound".',
        isCorrect: false,
        explanation: 'Fancy words that don’t reflect your voice sound unnatural and demonstrate lack of understanding.',
      },
    ],
  },
  {
    id: 'card4',
    cardTitle: 'AI Output D: The Phantom Academic Citation',
    aiResponseText:
      '"You can cite: Dr. Bartholomew Fluffington (2025), Journal of Extreme Energy Nutrition, Vol. 42, Oxford University Press: Energy Drinks Extend Life by 15 Years."',
    riskType: 'hallucinated_source',
    bestAction: 'audit_source',
    actionOptions: [
      {
        id: 'd1',
        label: 'Audit & Search: Check Google Scholar or library databases immediately before citing. If it does not exist, discard it.',
        isCorrect: true,
        explanation: 'Critical! AI frequently generates fake journal names, fabricated authors, and future publication years that sound real.',
      },
      {
        id: 'd2',
        label: 'Put it straight on the reference slide because it has an author and journal name.',
        isCorrect: false,
        explanation: 'Putting a fabricated citation on your slide will result in severe academic penalties.',
      },
    ],
  },
];

// Final Boss: Rescue the Presentation
export interface FinalBossProblem {
  id: string;
  category: string;
  problemTitle: string;
  flawedSnippet: string;
  flawAnalysis: string;
  solutions: {
    id: string;
    text: string;
    isBest: boolean;
    explanation: string;
  }[];
}

export const FINAL_BOSS_PROBLEMS: FinalBossProblem[] = [
  {
    id: 'fb_opening',
    category: '1. Opening & Hook',
    problemTitle: 'Rescue the Awkward Opening',
    flawedSnippet: '"Uhh, hey guys. Can you hear me? Yeah, whatever. My teacher told me to talk about energy drinks, so here is some stuff."',
    flawAnalysis: 'Mumbles, shows lack of enthusiasm, and lacks an engaging hook or clear thesis.',
    solutions: [
      {
        id: 's1',
        text: '"Imagine drinking two cups of espresso, three spoonfuls of sugar, and running to your math test. In Norway, energy drink sales among teenagers increased dramatically this year. Today, we investigate: How do these drinks actually affect our focus and sleep?"',
        isBest: true,
        explanation: 'Vivid imagery, relatable Norwegian context, and a crystal-clear research question!',
      },
      {
        id: 's2',
        text: '"ENERGY DRINKS ARE EVIL AND EVERYONE WHO DRINKS THEM WILL REGRET IT FOREVER."',
        isBest: false,
        explanation: 'Too aggressive and opinionated. Academic openings should invite objective inquiry.',
      },
      {
        id: 's3',
        text: '"Let’s skip the introduction and look at 40 statistics on slide 2."',
        isBest: false,
        explanation: 'Skipping the hook leaves the audience disengaged.',
      },
    ],
  },
  {
    id: 'fb_structure',
    category: '2. Logical Progression',
    problemTitle: 'Fix the Scrambled Agenda',
    flawedSnippet: 'Slide order: Conclusion first → 1 random slide on caffeine → Reference list → What is an energy drink?',
    flawAnalysis: 'Completely disjointed flow where answers are provided before questions are asked.',
    solutions: [
      {
        id: 's1',
        text: 'Structure logically: 1) Hook & Research Question → 2) What is in an energy drink? → 3) Biological & cognitive effects → 4) Health guidelines & evidence → 5) Synthesis answering the RQ → 6) References.',
        isBest: true,
        explanation: 'Guides the audience step-by-step from foundational definitions to complex evidence and final answers.',
      },
      {
        id: 's2',
        text: 'Put 10 slides in alphabetical order by the first word of each slide.',
        isBest: false,
        explanation: 'Alphabetical slides make zero narrative sense!',
      },
    ],
  },
  {
    id: 'fb_evidence',
    category: '3. Evidence & Fact Checking',
    problemTitle: 'Replace the Fake AI Fact',
    flawedSnippet: '"A famous guy on TikTok and an AI chat both said that Red Bull completely repairs brain cells."',
    flawAnalysis: 'Relying on influencer hearsay and unverified AI output with zero peer-reviewed backing.',
    solutions: [
      {
        id: 's1',
        text: 'Replace with verified scientific consensus: "According to the Norwegian Institute of Public Health (FHI, 2024), high caffeine intake in adolescents does not enhance long-term memory; instead, it frequently triggers sleep fragmentation and rebound fatigue."',
        isBest: true,
        explanation: 'Authoritative, balanced, and accurately reflects real medical science.',
      },
      {
        id: 's2',
        text: '"Nobody knows the truth, so let’s just take a class vote on whether caffeine repairs brains."',
        isBest: false,
        explanation: 'Science is determined by empirical research, not popularity polls.',
      },
    ],
  },
  {
    id: 'fb_citation',
    category: '4. Natural Oral Citation',
    problemTitle: 'Deliver an Oral Citation in Speech',
    flawedSnippet: '"Studies say caffeine has side effects. End of sentence."',
    flawAnalysis: 'Vague "studies say" without author, date, or specific findings.',
    solutions: [
      {
        id: 's1',
        text: '"As reported by Swanson and colleagues in their 2024 study on youth consumption, drinking high-caffeine beverages past 18:00 was associated with an average 40-minute delay in sleep onset."',
        isBest: true,
        explanation: 'Seamless spoken citation providing author, year, and specific quantified finding.',
      },
      {
        id: 's2',
        text: '"APA style seventh edition open parenthesis Swanson comma twenty-twenty-four close parenthesis."',
        isBest: false,
        explanation: 'Never read written citation punctuation aloud in a speech.',
      },
    ],
  },
  {
    id: 'fb_slide',
    category: '5. Visual Slide Design',
    problemTitle: 'Rescue the Slide from Visual Chaos',
    flawedSnippet: 'Slide with 150 words in lime-green Comic Sans, flashing gif of a monster can, and an unreadable 3D pie chart.',
    flawAnalysis: 'Cognitive overload, terrible contrast, and visual distraction.',
    solutions: [
      {
        id: 's1',
        text: 'Clean redesign: Large title "Caffeine vs. Sleep Onset", 3 crisp bullet points (max 8 words each), a clean 2-bar comparison chart, and high-contrast dark text on a light background.',
        isBest: true,
        explanation: 'Supports the speaker’s words rather than competing with them.',
      },
      {
        id: 's2',
        text: 'Keep the 150 words but change the font to Times New Roman 8pt.',
        isBest: false,
        explanation: 'Smaller fonts make the problem worse, not better!',
      },
    ],
  },
  {
    id: 'fb_delivery',
    category: '6. Speaking & Delivery Strategy',
    problemTitle: 'Overcome Nervous Mumbling',
    flawedSnippet: 'Presenter stares at the carpet, speaks in a monotone whisper at 250 wpm, and nervously clicks a pen 40 times.',
    flawAnalysis: 'Distracting nervous tics, lack of audience contact, and rushing.',
    solutions: [
      {
        id: 's1',
        text: 'Put down the clicker pen, hold 3 small keyword palm cards, plant feet hip-width apart, pause for 2 seconds at transitions, and speak with steady conversational energy.',
        isBest: true,
        explanation: 'Physical stability fosters vocal control and commands the room naturally.',
      },
      {
        id: 's2',
        text: 'Wear sunglasses so you can keep your eyes closed throughout the speech.',
        isBest: false,
        explanation: 'Humorous, but disconnecting from the audience does not build speaking confidence!',
      },
    ],
  },
  {
    id: 'fb_ai_use',
    category: '7. Responsible AI Disclosure',
    problemTitle: 'Integrate Ethical AI Practice',
    flawedSnippet: '"Presenter: Either I pretend AI does not exist, or I let AI generate everything and pray the teacher doesn’t notice."',
    flawAnalysis: 'Binary trap: either dishonest concealment or lazy dependency.',
    solutions: [
      {
        id: 's1',
        text: 'Think first independently, use AI as a sparring partner to suggest counter-arguments and find research keywords, verify every claim with primary sources, and provide an honest AI Disclosure Statement to your teacher.',
        isBest: true,
        explanation: 'The ultimate academic sweet spot: human agency supported by critical technology use.',
      },
      {
        id: 's2',
        text: 'Tell the teacher that AI is banned by ancient law and never talk about technology again.',
        isBest: false,
        explanation: 'AI is part of the modern world; schools teach critical collaboration, not avoidance.',
      },
    ],
  },
  {
    id: 'fb_conclusion',
    category: '8. Strong Conclusion',
    problemTitle: 'Craft a Memorable Ending',
    flawedSnippet: '"So yeah... that’s it. Can I sit down now?"',
    flawAnalysis: 'Anti-climactic fade-out that leaves the research question unanswered.',
    solutions: [
      {
        id: 's1',
        text: '"To conclude: while energy drinks provide a temporary spike in alertness, the physiological cost—sleep disruption and rebound fatigue—outweighs short-term gains. Rather than turning to caffeine cans before exams, sleep remains the most powerful cognitive enhancer we have. Thank you, and I look forward to your questions."',
        isBest: true,
        explanation: 'Directly answers the research question, delivers a punchy memorable synthesis, and welcomes audience questions!',
      },
      {
        id: 's2',
        text: '"In conclusion, buy more energy drinks because they taste like bubblegum."',
        isBest: false,
        explanation: 'Contradicts the scientific evidence presented.',
      },
    ],
  },
];

// Final Presentation Checklist items
export interface ChecklistCategory {
  title: string;
  items: {
    id: string;
    label: string;
    details: string;
  }[];
}

export const PRESENTATION_CHECKLIST: ChecklistCategory[] = [
  {
    title: 'Content & Structure',
    items: [
      {
        id: 'chk_rq',
        label: 'Clear Research Question & Purpose',
        details: 'My presentation investigates a specific, focused question rather than just talking broadly about a topic.',
      },
      {
        id: 'chk_intro',
        label: 'Engaging Opening Hook',
        details: 'My first 30 seconds hook the audience with a question, statistic, or short story and explain why this matters.',
      },
      {
        id: 'chk_structure',
        label: 'Logical Progression & Transitions',
        details: 'My main points follow a clear roadmap with spoken signposts connecting one idea to the next.',
      },
      {
        id: 'chk_conclusion',
        label: 'Conclusion Answering the Research Question',
        details: 'My conclusion synthesises my main findings and directly answers my research question without adding new facts.',
      },
    ],
  },
  {
    title: 'Research & Oral Citations',
    items: [
      {
        id: 'chk_evidence',
        label: 'Reliable, Verified Evidence',
        details: 'My claims are backed by credible research, official health reports, or peer-reviewed studies.',
      },
      {
        id: 'chk_oral_cit',
        label: 'Natural Spoken Oral Citations',
        details: 'I introduce key sources naturally in speech (e.g., "According to Swanson (2024)...") rather than just listing them silently.',
      },
      {
        id: 'chk_ref_list',
        label: 'Accurate Final Reference Slide',
        details: 'My presentation ends with a complete reference list formatted according to my teacher’s requirements (APA/MLA).',
      },
      {
        id: 'chk_verify_claims',
        label: 'Verified Claims vs. Social Media Hype',
        details: 'I have checked facts against primary sources instead of relying on influencers or blind AI answers.',
      },
    ],
  },
  {
    title: 'Delivery & Visuals',
    items: [
      {
        id: 'chk_slides_support',
        label: 'Slides Support (Not Replace) Speaking',
        details: 'My slides have minimal text, readable fonts, and purposeful visuals that complement what I say.',
      },
      {
        id: 'chk_notes',
        label: 'Palm Cards Instead of Full Script',
        details: 'I use bulleted cue cards for keywords and reminders instead of reading a written essay word-for-word.',
      },
      {
        id: 'chk_pacing',
        label: 'Practised Timing, Pauses & Pronunciation',
        details: 'I have timed my speech, practised difficult vocabulary aloud, and built in 2-second breathing pauses.',
      },
      {
        id: 'chk_connection',
        label: 'Audience Connection & Inclusive Presence',
        details: 'I scan the room comfortably, project clear volume, and recover calmly if I slip on a word.',
      },
    ],
  },
  {
    title: 'Responsible AI Collaboration',
    items: [
      {
        id: 'chk_think_first',
        label: 'THINK First: Brain Before AI',
        details: 'I formulated my own thoughts, questions, and initial hypothesis before opening an AI tool.',
      },
      {
        id: 'chk_ai_scaffold',
        label: 'AI as a Scaffold, Not a Ghostwriter',
        details: 'I used AI to challenge my assumptions, find keywords, or refine phrasing, but retained full ownership.',
      },
      {
        id: 'chk_ai_audit',
        label: 'Audited Every AI Claim & Citation',
        details: 'I checked that every cited paper, author, and statistic actually exists in the real world.',
      },
      {
        id: 'chk_ai_statement',
        label: 'Honest AI Disclosure Statement',
        details: 'I am ready to submit an honest, transparent statement describing how AI supported my preparation.',
      },
    ],
  },
];
