export type AchievementCategory = 'quests' | 'skills' | 'level' | 'shadows' | 'dungeons' | 'social' | 'consistency';
export type AchievementRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
  rarity: AchievementRarity;
  icon: string;
  requirements: {
    type: string;
    value: number;
    current?: number;
  };
  rewards: {
    experience: number;
    title?: string;
    avatar?: string;
    badge?: string;
  };
  unlocked: boolean;
  unlockedAt?: string;
  progress: number; // 0-100
  hidden?: boolean; // Secret achievements
}

export interface UserCustomization {
  theme: 'dark' | 'light' | 'auto';
  accentColor: string;
  avatarFrame: string;
  title: string;
  badges: string[];
  nameColor: string;
  profileBackground: string;
  questNotifications: boolean;
  levelUpEffects: boolean;
  soundEffects: boolean;
  autoSave: boolean;
  language: string;
}