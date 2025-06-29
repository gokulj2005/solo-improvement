import { Achievement } from '../types/achievements';

export const initialAchievements: Achievement[] = [
  // Quest Achievements
  {
    id: 'first-quest',
    title: 'First Steps',
    description: 'Complete your first quest',
    category: 'quests',
    rarity: 'common',
    icon: 'Target',
    requirements: {
      type: 'quests_completed',
      value: 1,
    },
    rewards: {
      experience: 50,
      badge: 'first-quest'
    },
    unlocked: false,
    progress: 0
  },
  {
    id: 'quest-master',
    title: 'Quest Master',
    description: 'Complete 50 quests',
    category: 'quests',
    rarity: 'epic',
    icon: 'Crown',
    requirements: {
      type: 'quests_completed',
      value: 50,
    },
    rewards: {
      experience: 500,
      title: 'Quest Master',
      badge: 'quest-master'
    },
    unlocked: false,
    progress: 0
  },
  {
    id: 'daily-warrior',
    title: 'Daily Warrior',
    description: 'Complete all daily quests for 7 consecutive days',
    category: 'consistency',
    rarity: 'rare',
    icon: 'Calendar',
    requirements: {
      type: 'daily_streak',
      value: 7,
    },
    rewards: {
      experience: 300,
      title: 'Daily Warrior',
      avatarFrame: 'golden'
    },
    unlocked: false,
    progress: 0
  },
  
  // Level Achievements
  {
    id: 'level-10',
    title: 'Rising Hunter',
    description: 'Reach level 10',
    category: 'level',
    rarity: 'common',
    icon: 'TrendingUp',
    requirements: {
      type: 'level',
      value: 10,
    },
    rewards: {
      experience: 200,
      title: 'Rising Hunter'
    },
    unlocked: false,
    progress: 0
  },
  {
    id: 'level-25',
    title: 'Seasoned Veteran',
    description: 'Reach level 25',
    category: 'level',
    rarity: 'rare',
    icon: 'Shield',
    requirements: {
      type: 'level',
      value: 25,
    },
    rewards: {
      experience: 500,
      title: 'Seasoned Veteran',
      avatarFrame: 'silver'
    },
    unlocked: false,
    progress: 0
  },
  {
    id: 'level-50',
    title: 'Elite Hunter',
    description: 'Reach level 50',
    category: 'level',
    rarity: 'epic',
    icon: 'Star',
    requirements: {
      type: 'level',
      value: 50,
    },
    rewards: {
      experience: 1000,
      title: 'Elite Hunter',
      avatarFrame: 'platinum'
    },
    unlocked: false,
    progress: 0
  },
  
  // Skill Achievements
  {
    id: 'skill-collector',
    title: 'Skill Collector',
    description: 'Unlock 5 different skills',
    category: 'skills',
    rarity: 'common',
    icon: 'Lightbulb',
    requirements: {
      type: 'skills_unlocked',
      value: 5,
    },
    rewards: {
      experience: 250,
      badge: 'skill-collector'
    },
    unlocked: false,
    progress: 0
  },
  {
    id: 'skill-master',
    title: 'Skill Master',
    description: 'Unlock all available skills',
    category: 'skills',
    rarity: 'legendary',
    icon: 'Brain',
    requirements: {
      type: 'all_skills_unlocked',
      value: 1,
    },
    rewards: {
      experience: 1500,
      title: 'Skill Master',
      avatarFrame: 'legendary',
      badge: 'skill-master'
    },
    unlocked: false,
    progress: 0
  },
  
  // Shadow Achievements
  {
    id: 'shadow-hunter',
    title: 'Shadow Hunter',
    description: 'Extract 10 shadows',
    category: 'shadows',
    rarity: 'rare',
    icon: 'Ghost',
    requirements: {
      type: 'shadows_extracted',
      value: 10,
    },
    rewards: {
      experience: 400,
      title: 'Shadow Hunter',
      badge: 'shadow-hunter'
    },
    unlocked: false,
    progress: 0
  },
  {
    id: 'shadow-monarch',
    title: 'Shadow Monarch',
    description: 'Extract 50 shadows',
    category: 'shadows',
    rarity: 'legendary',
    icon: 'Crown',
    requirements: {
      type: 'shadows_extracted',
      value: 50,
    },
    rewards: {
      experience: 2000,
      title: 'Shadow Monarch',
      avatarFrame: 'shadow',
      badge: 'shadow-monarch'
    },
    unlocked: false,
    progress: 0,
    hidden: true
  },
  
  // Dungeon Achievements
  {
    id: 'dungeon-explorer',
    title: 'Dungeon Explorer',
    description: 'Complete your first dungeon',
    category: 'dungeons',
    rarity: 'common',
    icon: 'Swords',
    requirements: {
      type: 'dungeons_completed',
      value: 1,
    },
    rewards: {
      experience: 300,
      badge: 'dungeon-explorer'
    },
    unlocked: false,
    progress: 0
  },
  {
    id: 'dungeon-conqueror',
    title: 'Dungeon Conqueror',
    description: 'Complete all available dungeons',
    category: 'dungeons',
    rarity: 'epic',
    icon: 'Trophy',
    requirements: {
      type: 'all_dungeons_completed',
      value: 1,
    },
    rewards: {
      experience: 1000,
      title: 'Dungeon Conqueror',
      avatarFrame: 'conqueror'
    },
    unlocked: false,
    progress: 0
  },
  
  // Special/Hidden Achievements
  {
    id: 'perfectionist',
    title: 'Perfectionist',
    description: 'Complete all daily quests for 30 consecutive days',
    category: 'consistency',
    rarity: 'legendary',
    icon: 'Award',
    requirements: {
      type: 'daily_streak',
      value: 30,
    },
    rewards: {
      experience: 2500,
      title: 'The Perfectionist',
      avatarFrame: 'perfect',
      badge: 'perfectionist'
    },
    unlocked: false,
    progress: 0,
    hidden: true
  },
  {
    id: 'early-bird',
    title: 'Early Bird',
    description: 'Complete a quest before 6 AM',
    category: 'quests',
    rarity: 'rare',
    icon: 'Sunrise',
    requirements: {
      type: 'early_quest',
      value: 1,
    },
    rewards: {
      experience: 200,
      badge: 'early-bird'
    },
    unlocked: false,
    progress: 0,
    hidden: true
  }
];