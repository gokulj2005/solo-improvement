import React, { createContext, useContext, useState, useEffect } from 'react';
import { Achievement } from '../types/achievements';
import { initialAchievements } from '../data/achievements';
import { useAppContext } from './AppContext';
import { useNotifications } from './NotificationContext';

interface AchievementContextType {
  achievements: Achievement[];
  updateAchievementProgress: () => void;
  unlockAchievement: (achievementId: string) => void;
  getUnlockedAchievements: () => Achievement[];
  getLockedAchievements: () => Achievement[];
  getAchievementsByCategory: (category: string) => Achievement[];
  getTotalProgress: () => number;
}

const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

export const AchievementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const { character, quests, skills, shadows, dungeons } = useAppContext();
  const { addNotification } = useNotifications();

  // Update achievement progress based on current game state
  const updateAchievementProgress = () => {
    if (!character) return;

    const completedQuests = quests.filter(q => q.completed).length;
    const unlockedSkills = skills.filter(s => s.unlocked).length;
    const extractedShadows = shadows.length;
    const completedDungeons = dungeons.filter(d => d.completed).length;
    const allSkillsUnlocked = skills.length > 0 && skills.every(s => s.unlocked);
    const allDungeonsCompleted = dungeons.length > 0 && dungeons.every(d => d.completed);

    setAchievements(prev => prev.map(achievement => {
      let current = 0;
      let progress = 0;

      switch (achievement.requirements.type) {
        case 'quests_completed':
          current = completedQuests;
          break;
        case 'level':
          current = character.level;
          break;
        case 'skills_unlocked':
          current = unlockedSkills;
          break;
        case 'shadows_extracted':
          current = extractedShadows;
          break;
        case 'dungeons_completed':
          current = completedDungeons;
          break;
        case 'all_skills_unlocked':
          current = allSkillsUnlocked ? 1 : 0;
          break;
        case 'all_dungeons_completed':
          current = allDungeonsCompleted ? 1 : 0;
          break;
        case 'daily_streak':
          // This would need to be tracked separately
          current = 0; // Placeholder
          break;
        case 'early_quest':
          // This would need special tracking
          current = 0; // Placeholder
          break;
      }

      progress = Math.min(100, (current / achievement.requirements.value) * 100);

      // Check if achievement should be unlocked
      if (!achievement.unlocked && current >= achievement.requirements.value) {
        unlockAchievement(achievement.id);
      }

      return {
        ...achievement,
        requirements: {
          ...achievement.requirements,
          current
        },
        progress
      };
    }));
  };

  const unlockAchievement = (achievementId: string) => {
    setAchievements(prev => prev.map(achievement => {
      if (achievement.id === achievementId && !achievement.unlocked) {
        // Show notification
        addNotification({
          type: 'achievement',
          title: 'Achievement Unlocked!',
          message: `${achievement.title} - ${achievement.description}`,
          duration: 8000,
        });

        return {
          ...achievement,
          unlocked: true,
          unlockedAt: new Date().toISOString()
        };
      }
      return achievement;
    }));
  };

  const getUnlockedAchievements = () => achievements.filter(a => a.unlocked);
  const getLockedAchievements = () => achievements.filter(a => !a.unlocked && !a.hidden);
  const getAchievementsByCategory = (category: string) => achievements.filter(a => a.category === category);
  const getTotalProgress = () => {
    const totalAchievements = achievements.filter(a => !a.hidden).length;
    const unlockedAchievements = achievements.filter(a => a.unlocked && !a.hidden).length;
    return Math.round((unlockedAchievements / totalAchievements) * 100);
  };

  // Update progress when game state changes
  useEffect(() => {
    updateAchievementProgress();
  }, [character, quests, skills, shadows, dungeons]);

  return (
    <AchievementContext.Provider value={{
      achievements,
      updateAchievementProgress,
      unlockAchievement,
      getUnlockedAchievements,
      getLockedAchievements,
      getAchievementsByCategory,
      getTotalProgress
    }}>
      {children}
    </AchievementContext.Provider>
  );
};

export const useAchievements = () => {
  const context = useContext(AchievementContext);
  if (context === undefined) {
    throw new Error('useAchievements must be used within an AchievementProvider');
  }
  return context;
};