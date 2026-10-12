/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { QuestMap } from './components/QuestMap';
import { BadgeModal } from './components/BadgeModal';
import { Level1Disaster } from './components/Level1Disaster';
import { Level2Structure } from './components/Level2Structure';
import { Level3Visuals } from './components/Level3Visuals';
import { Level4Speaking } from './components/Level4Speaking';
import { Level5Evidence } from './components/Level5Evidence';
import { Level6Think } from './components/Level6Think';
import { Level7Collaborate } from './components/Level7Collaborate';
import { Level8Reflect } from './components/Level8Reflect';
import { FinalBoss } from './components/FinalBoss';
import { ChecklistDossier } from './components/ChecklistDossier';
import { INITIAL_BADGES, HEALTH_TOPICS } from './data/gameContent';
import { LevelId, GameState, StudentThinkData, ReflectionData } from './types/game';
import { sound } from './utils/sound';

const STORAGE_KEY = 'oral_presentation_quest_state_v1';

const defaultThinkData: StudentThinkData = {
  topicId: 'sleep',
  topicTitle: HEALTH_TOPICS[0].title,
  whatIKnow:
    'Teenagers often stay up late looking at screens and feel exhausted during morning classes. Good sleep helps memory and focus.',
  researchQuestion:
    'How does blue light exposure from screens within 60 minutes of bedtime influence adolescent sleep quality and next-day classroom focus?',
  investigationQuestions: [
    'What biological mechanism connects screen light to melatonin suppression?',
    'Are there measurable differences in test scores between students with 8 hours of sleep vs 6 hours?',
  ],
  initialArgument:
    'Late-night screen use delays melatonin onset by roughly 30 to 60 minutes, which leads to sleep debt and reduced memory retention in school.',
  evidenceNeeded:
    'Peer-reviewed sleep laboratory trials, official adolescent health guidelines (WHO/FHI), and statistics on screen habits.',
  prediction:
    'I predict studies will show that cognitive performance drops significantly after 3 consecutive nights of less than 7 hours of sleep.',
  saved: false,
};

const defaultReflectionData: ReflectionData = {
  initialThoughts: '',
  aiHelp: '',
  rejectedOrModified: '',
  verifiedSource: '',
  changedQuestion: '',
  understandingVsEase: '',
  ownReasoning: '',
  acknowledgementPlan: '',
  saved: false,
};

export default function App() {
  const [gameState, setGameState] = useState<GameState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }

    return {
      currentLevel: 1,
      completedLevels: [],
      score: 0,
      badges: INITIAL_BADGES,
      studentThink: defaultThinkData,
      reflection: defaultReflectionData,
      aiStatementDraft: '',
      aiStatementEdited: '',
      soundEnabled: true,
      checklistChecks: {},
      finalBossChoices: {},
      finalBossScore: 0,
    };
  });

  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);

  // Sync sound engine
  useEffect(() => {
    sound.enabled = gameState.soundEnabled;
  }, [gameState.soundEnabled]);

  // Persist state locally
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    } catch {
      // storage quota fallback
    }
  }, [gameState]);

  const handleToggleSound = () => {
    setGameState((prev) => ({
      ...prev,
      soundEnabled: !prev.soundEnabled,
    }));
  };

  const handleNavigate = (level: LevelId) => {
    sound.playClick();
    setGameState((prev) => ({
      ...prev,
      currentLevel: level,
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteLevel = (levelId: LevelId, pointsEarned: number, badgeId: string) => {
    setGameState((prev) => {
      const nextCompleted = prev.completedLevels.includes(levelId)
        ? prev.completedLevels
        : [...prev.completedLevels, levelId];

      const nextBadges = prev.badges.map((b) =>
        b.id === badgeId ? { ...b, unlocked: true, unlockedAt: new Date().toISOString() } : b
      );

      const nextScore = prev.completedLevels.includes(levelId)
        ? prev.score
        : prev.score + pointsEarned;

      return {
        ...prev,
        completedLevels: nextCompleted,
        badges: nextBadges,
        score: nextScore,
      };
    });
  };

  const handleNextLevel = () => {
    const current = gameState.currentLevel;
    if (typeof current === 'number') {
      const next = (current < 9 ? current + 1 : 'checklist') as LevelId;
      handleNavigate(next);
    } else {
      handleNavigate(1);
    }
  };

  const handleResetAll = () => {
    localStorage.removeItem(STORAGE_KEY);
    setGameState({
      currentLevel: 1,
      completedLevels: [],
      score: 0,
      badges: INITIAL_BADGES,
      studentThink: defaultThinkData,
      reflection: defaultReflectionData,
      aiStatementDraft: '',
      aiStatementEdited: '',
      soundEnabled: true,
      checklistChecks: {},
      finalBossChoices: {},
      finalBossScore: 0,
    });
    sound.playClick();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 selection:bg-amber-200 selection:text-amber-950 font-sans">
      {/* Top Bar Header adhering strictly to 3-zone contract */}
      <Header
        currentLevel={gameState.currentLevel}
        completedLevels={gameState.completedLevels}
        score={gameState.score}
        badges={gameState.badges}
        soundEnabled={gameState.soundEnabled}
        onToggleSound={handleToggleSound}
        onNavigate={handleNavigate}
        onOpenBadges={() => setIsBadgeModalOpen(true)}
      />

      {/* Quest Map & Stage Progression Banner */}
      <QuestMap
        currentLevel={gameState.currentLevel}
        completedLevels={gameState.completedLevels}
        badges={gameState.badges}
        onSelectLevel={handleNavigate}
      />

      {/* Main Interactive Stage Routing */}
      <main className="flex-1 pb-16">
        {gameState.currentLevel === 1 && (
          <Level1Disaster
            isCompleted={gameState.completedLevels.includes(1)}
            onCompleteLevel={(pts, badgeId) => handleCompleteLevel(1, pts, badgeId)}
            onNextLevel={handleNextLevel}
          />
        )}

        {gameState.currentLevel === 2 && (
          <Level2Structure
            isCompleted={gameState.completedLevels.includes(2)}
            onCompleteLevel={(pts, badgeId) => handleCompleteLevel(2, pts, badgeId)}
            onNextLevel={handleNextLevel}
          />
        )}

        {gameState.currentLevel === 3 && (
          <Level3Visuals
            isCompleted={gameState.completedLevels.includes(3)}
            onCompleteLevel={(pts, badgeId) => handleCompleteLevel(3, pts, badgeId)}
            onNextLevel={handleNextLevel}
          />
        )}

        {gameState.currentLevel === 4 && (
          <Level4Speaking
            isCompleted={gameState.completedLevels.includes(4)}
            onCompleteLevel={(pts, badgeId) => handleCompleteLevel(4, pts, badgeId)}
            onNextLevel={handleNextLevel}
          />
        )}

        {gameState.currentLevel === 5 && (
          <Level5Evidence
            isCompleted={gameState.completedLevels.includes(5)}
            onCompleteLevel={(pts, badgeId) => handleCompleteLevel(5, pts, badgeId)}
            onNextLevel={handleNextLevel}
          />
        )}

        {gameState.currentLevel === 6 && (
          <Level6Think
            studentThink={gameState.studentThink}
            onUpdateThink={(data) => setGameState((prev) => ({ ...prev, studentThink: data }))}
            isCompleted={gameState.completedLevels.includes(6)}
            onCompleteLevel={(pts, badgeId) => handleCompleteLevel(6, pts, badgeId)}
            onNextLevel={handleNextLevel}
          />
        )}

        {gameState.currentLevel === 7 && (
          <Level7Collaborate
            studentThink={gameState.studentThink}
            isCompleted={gameState.completedLevels.includes(7)}
            onCompleteLevel={(pts, badgeId) => handleCompleteLevel(7, pts, badgeId)}
            onNextLevel={handleNextLevel}
          />
        )}

        {gameState.currentLevel === 8 && (
          <Level8Reflect
            studentThink={gameState.studentThink}
            reflection={gameState.reflection}
            onUpdateReflection={(data, stmt) =>
              setGameState((prev) => ({
                ...prev,
                reflection: data,
                aiStatementDraft: stmt,
                aiStatementEdited: stmt,
              }))
            }
            isCompleted={gameState.completedLevels.includes(8)}
            onCompleteLevel={(pts, badgeId) => handleCompleteLevel(8, pts, badgeId)}
            onNextLevel={handleNextLevel}
          />
        )}

        {gameState.currentLevel === 9 && (
          <FinalBoss
            finalBossChoices={gameState.finalBossChoices}
            onUpdateChoice={(probId, solId) =>
              setGameState((prev) => ({
                ...prev,
                finalBossChoices: { ...prev.finalBossChoices, [probId]: solId },
              }))
            }
            isCompleted={gameState.completedLevels.includes(9)}
            onCompleteBoss={(pts, badgeId) => handleCompleteLevel(9, pts, badgeId)}
            onGoToChecklist={() => handleNavigate('checklist')}
          />
        )}

        {gameState.currentLevel === 'checklist' && (
          <ChecklistDossier
            checks={gameState.checklistChecks}
            onToggleCheck={(id) =>
              setGameState((prev) => ({
                ...prev,
                checklistChecks: { ...prev.checklistChecks, [id]: !prev.checklistChecks[id] },
              }))
            }
            studentThink={gameState.studentThink}
            reflection={gameState.reflection}
            aiStatement={gameState.aiStatementEdited || gameState.aiStatementDraft}
            badges={gameState.badges}
            score={gameState.score}
            onResetAll={handleResetAll}
          />
        )}
      </main>

      {/* Achievement Badges Modal */}
      <BadgeModal
        isOpen={isBadgeModalOpen}
        onClose={() => setIsBadgeModalOpen(false)}
        badges={gameState.badges}
        score={gameState.score}
      />

      {/* Mandatory Footer with exact attribution */}
      <footer className="bg-slate-900 text-white border-t border-slate-800 py-8 px-4 sm:px-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <div className="font-display font-bold text-base text-white tracking-tight">
              The Oral Presentation Quest: From Awkward to Awesome!
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Core Principle: THINK independently · COLLABORATE critically · REFLECT honestly · Present with confidence.
            </p>
          </div>

          <div className="text-right">
            <div className="text-sm font-bold text-amber-400 tracking-wide">
              Nannestad High School- Barbara Anna Zielonka
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
