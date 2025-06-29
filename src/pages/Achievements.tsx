import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Star, Crown, Target, Calendar, Lightbulb, Ghost, Swords, Lock, CheckCircle } from 'lucide-react';
import { useAchievements } from '../context/AchievementContext';
import { Achievement } from '../types/achievements';

const Achievements: React.FC = () => {
  const { achievements, getUnlockedAchievements, getLockedAchievements, getAchievementsByCategory, getTotalProgress } = useAchievements();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showLocked, setShowLocked] = useState(true);

  const categories = [
    { id: 'all', name: 'All', icon: Trophy },
    { id: 'quests', name: 'Quests', icon: Target },
    { id: 'level', name: 'Level', icon: Star },
    { id: 'skills', name: 'Skills', icon: Lightbulb },
    { id: 'shadows', name: 'Shadows', icon: Ghost },
    { id: 'dungeons', name: 'Dungeons', icon: Swords },
    { id: 'consistency', name: 'Consistency', icon: Calendar }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-400 border-gray-400';
      case 'rare': return 'text-blue-400 border-blue-400';
      case 'epic': return 'text-purple-400 border-purple-400';
      case 'legendary': return 'text-yellow-400 border-yellow-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType<any> } = {
      Target, Calendar, Crown, TrendingUp: Star, Shield: Award, Star, Lightbulb, Brain: Lightbulb,
      Ghost, Swords, Trophy, Award, Sunrise: Star
    };
    const IconComponent = icons[iconName] || Trophy;
    return <IconComponent size={24} />;
  };

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements.filter(a => !a.hidden || a.unlocked)
    : getAchievementsByCategory(selectedCategory).filter(a => !a.hidden || a.unlocked);

  const displayedAchievements = showLocked 
    ? filteredAchievements 
    : filteredAchievements.filter(a => a.unlocked);

  const unlockedCount = getUnlockedAchievements().length;
  const totalCount = achievements.filter(a => !a.hidden).length;

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div 
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-3xl font-heading font-bold">Achievements</h1>
          <p className="text-gray-400 text-sm mt-1">
            Track your progress and unlock rewards
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-400">{unlockedCount}/{totalCount}</div>
            <div className="text-xs text-gray-400">Unlocked</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary-400">{getTotalProgress()}%</div>
            <div className="text-xs text-gray-400">Complete</div>
          </div>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <div className="card p-4 mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span>Overall Progress</span>
          <span>{getTotalProgress()}%</span>
        </div>
        <div className="progress-container h-3">
          <motion.div 
            className="progress-bar"
            initial={{ width: 0 }}
            animate={{ width: `${getTotalProgress()}%` }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(category => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`btn flex items-center gap-2 ${
                selectedCategory === category.id ? 'btn-primary' : 'btn-ghost'
              }`}
            >
              <Icon size={16} />
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Show/Hide Locked Toggle */}
      <div className="flex items-center gap-2 mb-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showLocked}
            onChange={(e) => setShowLocked(e.target.checked)}
            className="rounded"
          />
          <span className="text-sm text-gray-400">Show locked achievements</span>
        </label>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedAchievements.map(achievement => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </div>

      {displayedAchievements.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Trophy size={48} className="mx-auto mb-4 opacity-30" />
          <p>No achievements found for the selected filters.</p>
        </div>
      )}
    </div>
  );
};

interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-400/30 bg-gray-400/5';
      case 'rare': return 'border-blue-400/30 bg-blue-400/5';
      case 'epic': return 'border-purple-400/30 bg-purple-400/5';
      case 'legendary': return 'border-yellow-400/30 bg-yellow-400/5';
      default: return 'border-gray-400/30 bg-gray-400/5';
    }
  };

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType<any> } = {
      Target, Calendar, Crown, TrendingUp: Star, Shield: Award, Star, Lightbulb, Brain: Lightbulb,
      Ghost, Swords, Trophy, Award, Sunrise: Star
    };
    const IconComponent = icons[iconName] || Trophy;
    return <IconComponent size={20} />;
  };

  return (
    <motion.div
      className={`card relative overflow-hidden ${getRarityColor(achievement.rarity)} ${
        achievement.unlocked ? '' : 'opacity-60'
      }`}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Rarity indicator */}
      <div className={`absolute top-0 right-0 w-0 h-0 border-l-[20px] border-b-[20px] border-l-transparent ${
        achievement.rarity === 'legendary' ? 'border-b-yellow-400' :
        achievement.rarity === 'epic' ? 'border-b-purple-400' :
        achievement.rarity === 'rare' ? 'border-b-blue-400' : 'border-b-gray-400'
      }`} />

      <div className="flex items-start gap-3">
        <div className={`p-3 rounded-full ${
          achievement.unlocked ? 'bg-primary-900/50' : 'bg-dark-200'
        }`}>
          {achievement.unlocked ? getIcon(achievement.icon) : <Lock size={20} />}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium">{achievement.title}</h3>
            {achievement.unlocked && (
              <CheckCircle size={16} className="text-green-400" />
            )}
          </div>
          <p className="text-sm text-gray-400 mb-2">{achievement.description}</p>
          
          {/* Progress bar for locked achievements */}
          {!achievement.unlocked && achievement.progress > 0 && (
            <div className="mb-2">
              <div className="flex justify-between text-xs mb-1">
                <span>Progress</span>
                <span>{achievement.requirements.current || 0}/{achievement.requirements.value}</span>
              </div>
              <div className="progress-container h-1">
                <div 
                  className="progress-bar h-full"
                  style={{ width: `${achievement.progress}%` }}
                />
              </div>
            </div>
          )}
          
          {/* Rewards */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-400">Rewards:</span>
            <span className="bg-primary-900/50 px-2 py-1 rounded">
              +{achievement.rewards.experience} XP
            </span>
            {achievement.rewards.title && (
              <span className="bg-secondary-900/50 px-2 py-1 rounded">
                Title: {achievement.rewards.title}
              </span>
            )}
            {achievement.rewards.badge && (
              <span className="bg-accent-900/50 px-2 py-1 rounded">
                Badge
              </span>
            )}
          </div>
          
          {achievement.unlocked && achievement.unlockedAt && (
            <div className="text-xs text-gray-500 mt-2">
              Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Achievements;