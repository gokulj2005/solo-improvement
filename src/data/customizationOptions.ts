export const themeOptions = [
  { id: 'dark', name: 'Dark', preview: '#0f172a' },
  { id: 'light', name: 'Light', preview: '#ffffff' },
  { id: 'auto', name: 'Auto', preview: 'linear-gradient(45deg, #0f172a, #ffffff)' }
];

export const accentColors = [
  { id: 'blue', name: 'Ocean Blue', color: '#3b82f6' },
  { id: 'purple', name: 'Royal Purple', color: '#8b5cf6' },
  { id: 'green', name: 'Forest Green', color: '#10b981' },
  { id: 'red', name: 'Crimson Red', color: '#ef4444' },
  { id: 'orange', name: 'Sunset Orange', color: '#f97316' },
  { id: 'pink', name: 'Rose Pink', color: '#ec4899' },
  { id: 'cyan', name: 'Cyber Cyan', color: '#06b6d4' },
  { id: 'yellow', name: 'Golden Yellow', color: '#eab308' }
];

export const avatarFrames = [
  { id: 'none', name: 'None', preview: null, unlocked: true },
  { id: 'bronze', name: 'Bronze Frame', preview: '#cd7f32', unlocked: true },
  { id: 'silver', name: 'Silver Frame', preview: '#c0c0c0', unlocked: false, requirement: 'Reach Level 25' },
  { id: 'golden', name: 'Golden Frame', preview: '#ffd700', unlocked: false, requirement: 'Complete 7-day streak' },
  { id: 'platinum', name: 'Platinum Frame', preview: '#e5e4e2', unlocked: false, requirement: 'Reach Level 50' },
  { id: 'legendary', name: 'Legendary Frame', preview: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)', unlocked: false, requirement: 'Unlock all skills' },
  { id: 'shadow', name: 'Shadow Frame', preview: 'linear-gradient(45deg, #2d1b69, #11998e)', unlocked: false, requirement: 'Extract 50 shadows' },
  { id: 'conqueror', name: 'Conqueror Frame', preview: 'linear-gradient(45deg, #ff9a9e, #fecfef)', unlocked: false, requirement: 'Complete all dungeons' },
  { id: 'perfect', name: 'Perfect Frame', preview: 'linear-gradient(45deg, #a8edea, #fed6e3)', unlocked: false, requirement: '30-day perfect streak' }
];

export const titleOptions = [
  { id: 'novice', name: 'Novice', unlocked: true },
  { id: 'rising-hunter', name: 'Rising Hunter', unlocked: false, requirement: 'Reach Level 10' },
  { id: 'quest-master', name: 'Quest Master', unlocked: false, requirement: 'Complete 50 quests' },
  { id: 'daily-warrior', name: 'Daily Warrior', unlocked: false, requirement: '7-day streak' },
  { id: 'seasoned-veteran', name: 'Seasoned Veteran', unlocked: false, requirement: 'Reach Level 25' },
  { id: 'elite-hunter', name: 'Elite Hunter', unlocked: false, requirement: 'Reach Level 50' },
  { id: 'skill-master', name: 'Skill Master', unlocked: false, requirement: 'Unlock all skills' },
  { id: 'shadow-hunter', name: 'Shadow Hunter', unlocked: false, requirement: 'Extract 10 shadows' },
  { id: 'shadow-monarch', name: 'Shadow Monarch', unlocked: false, requirement: 'Extract 50 shadows' },
  { id: 'dungeon-conqueror', name: 'Dungeon Conqueror', unlocked: false, requirement: 'Complete all dungeons' },
  { id: 'the-perfectionist', name: 'The Perfectionist', unlocked: false, requirement: '30-day perfect streak' }
];

export const nameColors = [
  { id: 'white', name: 'White', color: '#ffffff' },
  { id: 'gold', name: 'Gold', color: '#ffd700', requirement: 'Reach Level 10' },
  { id: 'purple', name: 'Purple', color: '#8b5cf6', requirement: 'Complete 25 quests' },
  { id: 'red', name: 'Red', color: '#ef4444', requirement: 'Complete a dungeon' },
  { id: 'rainbow', name: 'Rainbow', color: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)', requirement: 'Unlock all achievements' }
];

export const profileBackgrounds = [
  { id: 'default', name: 'Default', preview: 'https://images.pexels.com/photos/4709285/pexels-photo-4709285.jpeg', unlocked: true },
  { id: 'forest', name: 'Mystic Forest', preview: 'https://images.pexels.com/photos/1671325/pexels-photo-1671325.jpeg', unlocked: false, requirement: 'Extract 5 shadows' },
  { id: 'mountain', name: 'Mountain Peak', preview: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg', unlocked: false, requirement: 'Reach Level 20' },
  { id: 'ocean', name: 'Ocean Depths', preview: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg', unlocked: false, requirement: 'Complete 30 quests' },
  { id: 'space', name: 'Cosmic Void', preview: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg', unlocked: false, requirement: 'Reach Level 40' },
  { id: 'aurora', name: 'Aurora Borealis', preview: 'https://images.pexels.com/photos/1933239/pexels-photo-1933239.jpeg', unlocked: false, requirement: 'Complete all dungeons' }
];