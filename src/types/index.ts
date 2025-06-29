export type StatType = 'strength' | 'intelligence' | 'discipline' | 'charisma' | 'vitality' | 'agility';

export interface Stats {
  strength: number;
  intelligence: number;
  discipline: number;
  charisma: number;
  vitality: number;
  agility: number;
}

export interface GameState {
  quests: Quest[];
  skills: Skill[];
  shadows: Shadow[];
  dungeons: Dungeon[];
  achievements?: Achievement[];
  customization?: UserCustomization;
  lastSaved: string;
}

export interface Character {
  id: string;
  name: string;
  level: number;
  experience: number;
  stats: Stats;
  title: string;
  rank: string;
  attributePoints: number;
  skillPoints: number;
  avatar: string;
  gameState?: GameState;
}

export interface UserProfile {
  id: string;
  email: string;
  hunterName: string;
  age: number;
  phoneNumber: string;
  gender: 'male' | 'female' | 'other';
  character: Character;
}

export interface AttributeBonus {
  stat: StatType;
  value: number;
}

export type QuestType = 'daily' | 'weekly' | 'achievement' | 'main';

export interface Quest {
  id: string;
  title: string;
  description: string;
  experience: number;
  completed: boolean;
  type: QuestType;
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  attributeBonus?: AttributeBonus;
  icon: string;
  completedAt?: string;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  level: number;
  maxLevel: number;
  icon: string;
  prerequisite: string | null;
  bonus: {
    stat: StatType;
    value: number;
  };
  position: {
    x: number;
    y: number;
  };
  unlockedAt?: string;
}

export interface Shadow {
  id: string;
  questId: string;
  name: string;
  description: string;
  bonus: {
    stat: StatType;
    value: number;
  };
  level: number;
  extractedAt?: string;
}

export interface Dungeon {
  id: string;
  name: string;
  description: string;
  difficulty: 'E' | 'D' | 'C' | 'B' | 'A' | 'S';
  experience: number;
  completed: boolean;
  locked: boolean;
  completedAt?: string;
  requirements?: {
    level?: number;
    stats?: Partial<Stats>;
  };
  rewards: {
    experience: number;
    items?: string[];
  };
}

// Re-export achievement types
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