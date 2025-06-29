import { Character, Quest, Skill, Shadow, Dungeon } from '../types';
import { Dumbbell, BookOpen, Clock, Users, Heart, Zap, Brain, Trophy, Target, FlaskConical, Shield, Swords, Flame, CloudLightning as Lightning, Radar, Eye } from 'lucide-react';

export const getInitialCharacter = (hunterName: string, gender: 'male' | 'female' | 'other'): Character => {
  const getAvatarByGender = () => {
    switch (gender) {
      case 'female':
        return 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
      case 'male':
        return 'https://images.pexels.com/photos/1722198/pexels-photo-1722198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
      case 'other':
        return 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
      default:
        return 'https://images.pexels.com/photos/1722198/pexels-photo-1722198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
    }
  };

  return {
    id: 'player-1',
    name: hunterName,
    level: 1,
    experience: 0,
    stats: {
      strength: 10,
      intelligence: 10,
      discipline: 10,
      charisma: 10,
      vitality: 10,
      agility: 10
    },
    title: 'Novice',
    rank: 'E',
    attributePoints: 0,
    skillPoints: 1,
    avatar: getAvatarByGender()
  };
};

export const initialCharacter: Character = {
  id: 'player-1',
  name: 'Hunter',
  level: 1,
  experience: 0,
  stats: {
    strength: 10,
    intelligence: 10,
    discipline: 10,
    charisma: 10,
    vitality: 10,
    agility: 10
  },
  title: 'Novice',
  rank: 'E',
  attributePoints: 0,
  skillPoints: 1,
  avatar: 'https://images.pexels.com/photos/1722198/pexels-photo-1722198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
};

export const initialQuests: Quest[] = [
  {
    id: 'quest-1',
    title: 'Morning Workout',
    description: 'Complete a 30-minute workout in the morning',
    experience: 20,
    completed: false,
    type: 'daily',
    difficulty: 'medium',
    attributeBonus: {
      stat: 'strength',
      value: 1
    },
    icon: 'Dumbbell'
  },
  {
    id: 'quest-2',
    title: 'Read a Book',
    description: 'Read at least 30 pages of a non-fiction book',
    experience: 15,
    completed: false,
    type: 'daily',
    difficulty: 'easy',
    attributeBonus: {
      stat: 'intelligence',
      value: 1
    },
    icon: 'BookOpen'
  },
  {
    id: 'quest-3',
    title: 'Meditation Session',
    description: 'Complete a 10-minute meditation session',
    experience: 10,
    completed: false,
    type: 'daily',
    difficulty: 'easy',
    attributeBonus: {
      stat: 'discipline',
      value: 1
    },
    icon: 'Brain'
  },
  {
    id: 'quest-4',
    title: 'Social Connection',
    description: 'Have a meaningful conversation with someone',
    experience: 15,
    completed: false,
    type: 'daily',
    difficulty: 'medium',
    attributeBonus: {
      stat: 'charisma',
      value: 1
    },
    icon: 'Users'
  },
  {
    id: 'quest-5',
    title: 'Drink Water',
    description: 'Drink at least 2 liters of water today',
    experience: 10,
    completed: false,
    type: 'daily',
    difficulty: 'easy',
    attributeBonus: {
      stat: 'vitality',
      value: 1
    },
    icon: 'Heart'
  },
  {
    id: 'quest-6',
    title: 'No Procrastination',
    description: 'Complete your most important task first thing in the morning',
    experience: 25,
    completed: false,
    type: 'daily',
    difficulty: 'hard',
    attributeBonus: {
      stat: 'discipline',
      value: 2
    },
    icon: 'Clock'
  },
  {
    id: 'quest-7',
    title: 'Learn a New Skill',
    description: 'Spend 1 hour learning something new',
    experience: 30,
    completed: false,
    type: 'weekly',
    difficulty: 'medium',
    attributeBonus: {
      stat: 'intelligence',
      value: 2
    },
    icon: 'Trophy'
  },
  {
    id: 'quest-8',
    title: 'Complete a Challenge',
    description: 'Push yourself outside your comfort zone',
    experience: 50,
    completed: false,
    type: 'weekly',
    difficulty: 'hard',
    attributeBonus: {
      stat: 'agility',
      value: 2
    },
    icon: 'Target'
  }
];

export const initialSkills: Skill[] = [
  {
    id: 'skill-1',
    name: 'Morning Routine',
    description: 'Start your day with purpose and energy',
    unlocked: false,
    level: 0,
    maxLevel: 5,
    icon: 'Sunrise',
    prerequisite: null,
    bonus: {
      stat: 'discipline',
      value: 2
    },
    position: { x: 50, y: 50 }
  },
  {
    id: 'skill-2',
    name: 'Deep Focus',
    description: 'Ability to concentrate deeply on tasks',
    unlocked: false,
    level: 0,
    maxLevel: 3,
    icon: 'Target',
    prerequisite: 'skill-1',
    bonus: {
      stat: 'intelligence',
      value: 3
    },
    position: { x: 120, y: 30 }
  },
  {
    id: 'skill-3',
    name: 'Iron Body',
    description: 'Strengthen your physical form',
    unlocked: false,
    level: 0,
    maxLevel: 5,
    icon: 'Shield',
    prerequisite: null,
    bonus: {
      stat: 'strength',
      value: 2
    },
    position: { x: 50, y: 120 }
  },
  {
    id: 'skill-4',
    name: 'Social Mastery',
    description: 'Connect with others effortlessly',
    unlocked: false,
    level: 0,
    maxLevel: 3,
    icon: 'Users',
    prerequisite: null,
    bonus: {
      stat: 'charisma',
      value: 3
    },
    position: { x: 120, y: 150 }
  },
  {
    id: 'skill-5',
    name: 'Monarch\'s Authority',
    description: 'Command respect and attention',
    unlocked: false,
    level: 0,
    maxLevel: 3,
    icon: 'Crown',
    prerequisite: 'skill-4',
    bonus: {
      stat: 'charisma',
      value: 5
    },
    position: { x: 190, y: 150 }
  },
  {
    id: 'skill-6',
    name: 'Arise',
    description: 'Harness your inner potential',
    unlocked: false,
    level: 0,
    maxLevel: 1,
    icon: 'Flame',
    prerequisite: null,
    bonus: {
      stat: 'discipline',
      value: 10
    },
    position: { x: 120, y: 90 }
  }
];

export const initialShadows: Shadow[] = [];

export const initialDungeons: Dungeon[] = [
  {
    id: 'dungeon-1',
    name: 'Habit Formation',
    description: 'Build a new positive habit for 7 consecutive days',
    difficulty: 'E',
    experience: 100,
    completed: false,
    locked: false,
    requirements: {
      level: 1
    },
    rewards: {
      experience: 100
    }
  },
  {
    id: 'dungeon-2',
    name: 'Digital Detox',
    description: 'Limit screen time to essential use only for 3 days',
    difficulty: 'D',
    experience: 200,
    completed: false,
    locked: true,
    requirements: {
      level: 3
    },
    rewards: {
      experience: 200
    }
  },
  {
    id: 'dungeon-3',
    name: 'Fitness Challenge',
    description: 'Complete a challenging workout routine for 5 days',
    difficulty: 'C',
    experience: 300,
    completed: false,
    locked: true,
    requirements: {
      level: 5,
      stats: {
        strength: 15
      }
    },
    rewards: {
      experience: 300
    }
  },
  {
    id: 'dungeon-4',
    name: 'Knowledge Acquisition',
    description: 'Learn a new skill and demonstrate proficiency',
    difficulty: 'B',
    experience: 400,
    completed: false,
    locked: true,
    requirements: {
      level: 8,
      stats: {
        intelligence: 20
      }
    },
    rewards: {
      experience: 400
    }
  },
  {
    id: 'dungeon-5',
    name: 'Social Challenge',
    description: 'Step outside your comfort zone in a social situation',
    difficulty: 'A',
    experience: 500,
    completed: false,
    locked: true,
    requirements: {
      level: 12,
      stats: {
        charisma: 25
      }
    },
    rewards: {
      experience: 500
    }
  },
  {
    id: 'dungeon-6',
    name: 'Monarch\'s Trial',
    description: 'Complete a significant personal goal',
    difficulty: 'S',
    experience: 1000,
    completed: false,
    locked: true,
    requirements: {
      level: 20
    },
    rewards: {
      experience: 1000
    }
  }
];