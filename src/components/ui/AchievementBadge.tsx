import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Crown, Award } from 'lucide-react';

interface AchievementBadgeProps {
  achievement: {
    id: string;
    title: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    icon: string;
  };
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({ 
  achievement, 
  size = 'md', 
  showTooltip = true 
}) => {
  const [showTooltipState, setShowTooltipState] = React.useState(false);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'w-6 h-6';
      case 'lg': return 'w-12 h-12';
      default: return 'w-8 h-8';
    }
  };

  const getRarityColor = () => {
    switch (achievement.rarity) {
      case 'common': return 'text-gray-400 bg-gray-400/20';
      case 'rare': return 'text-blue-400 bg-blue-400/20';
      case 'epic': return 'text-purple-400 bg-purple-400/20';
      case 'legendary': return 'text-yellow-400 bg-yellow-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getIcon = () => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      Trophy, Star, Crown, Award
    };
    const IconComponent = iconMap[achievement.icon] || Trophy;
    return <IconComponent size={size === 'sm' ? 12 : size === 'lg' ? 20 : 16} />;
  };

  return (
    <div className="relative">
      <motion.div
        className={`${getSizeClasses()} ${getRarityColor()} rounded-full flex items-center justify-center cursor-pointer`}
        whileHover={{ scale: 1.1 }}
        onMouseEnter={() => setShowTooltipState(true)}
        onMouseLeave={() => setShowTooltipState(false)}
      >
        {getIcon()}
      </motion.div>

      {showTooltip && showTooltipState && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10"
        >
          <div className="bg-dark-200 border border-primary-900/30 rounded-md p-2 whitespace-nowrap">
            <div className="text-sm font-medium">{achievement.title}</div>
            <div className={`text-xs capitalize ${
              achievement.rarity === 'legendary' ? 'text-yellow-400' :
              achievement.rarity === 'epic' ? 'text-purple-400' :
              achievement.rarity === 'rare' ? 'text-blue-400' : 'text-gray-400'
            }`}>
              {achievement.rarity}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AchievementBadge;