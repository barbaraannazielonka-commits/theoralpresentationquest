export type LevelId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 'checklist';

export interface Badge {
  id: string;
  levelId: LevelId;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface StudentThinkData {
  topicId: string;
  topicTitle: string;
  whatIKnow: string;
  researchQuestion: string;
  investigationQuestions: [string, string];
  initialArgument: string;
  evidenceNeeded: string;
  prediction: string;
  saved: boolean;
}

export interface ReflectionData {
  initialThoughts: string;
  aiHelp: string;
  rejectedOrModified: string;
  verifiedSource: string;
  changedQuestion: string;
  understandingVsEase: string;
  ownReasoning: string;
  acknowledgementPlan: string;
  saved: boolean;
}

export interface FinalBossStepChoice {
  stepId: string;
  selectedOptionId: string;
  isCorrect: boolean;
}

export interface GameState {
  currentLevel: LevelId;
  completedLevels: LevelId[];
  score: number;
  badges: Badge[];
  studentThink: StudentThinkData;
  reflection: ReflectionData;
  aiStatementDraft: string;
  aiStatementEdited: string;
  soundEnabled: boolean;
  checklistChecks: Record<string, boolean>;
  finalBossChoices: Record<string, string>;
  finalBossScore: number;
}
