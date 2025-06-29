import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { useCustomization } from '../context/CustomizationContext';
import { useAchievements } from '../context/AchievementContext';
import StatCard from '../components/ui/StatCard';
import AchievementBadge from '../components/ui/AchievementBadge';
import { 
  User, 
  Award, 
  Star,
  Shield,
  Trophy,
  Crown
} from 'lucide-react';

const Profile: React.FC = () => {
  const { character } = useAppContext();
  const { customization } = useCustomization();
  const { getUnlockedAchievements } = useAchievements();
  
  if (!character) return null;
  
  // Calculate total stats
  const totalStats = Object.values(character.stats).reduce((sum, stat) => sum + stat, 0);
  
  // Get rank color
  const getRankColor = () => {
    switch (character.rank) {
      case 'S': return 'text-purple-500';
      case 'A': return 'text-red-500';
      case 'B': return 'text-orange-500';
      case 'C': return 'text-yellow-500';
      case 'D': return 'text-blue-500';
      case 'E': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getAvatarFrameStyle = () => {
    if (customization.avatarFrame === 'none') return {};
    
    const frames: { [key: string]: any } = {
      bronze: { border: '4px solid #cd7f32' },
      silver: { border: '4px solid #c0c0c0' },
      golden: { border: '4px solid #ffd700' },
      platinum: { border: '4px solid #e5e4e2' },
      legendary: { border: '4px solid transparent', background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)', padding: '4px' },
      shadow: { border: '4px solid transparent', background: 'linear-gradient(45deg, #2d1b69, #11998e)', padding: '4px' },
      conqueror: { border: '4px solid transparent', background: 'linear-gradient(45deg, #ff9a9e, #fecfef)', padding: '4px' },
      perfect: { border: '4px solid transparent', background: 'linear-gradient(45deg, #a8edea, #fed6e3)', padding: '4px' }
    };
    
    return frames[customization.avatarFrame] || {};
  };

  const unlockedAchievements = getUnlockedAchievements();

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-heading font-bold">Hunter Profile</h1>
        <p className="text-gray-400 text-sm mt-1">
          View your hunter's progress and achievements
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <motion.div 
            className="card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <div style={getAvatarFrameStyle()}>
                  <img 
                    src={character.avatar} 
                    alt="Character avatar" 
                    className="w-32 h-32 rounded-full object-cover shadow-neon"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-primary-500 text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center">
                  {character.level}
                </div>
              </div>
              
              <h2 
                className="text-xl font-bold mb-2"
                style={{ color: customization.nameColor }}
              >
                {character.name}
              </h2>
              
              <div className="text-gray-400 mb-2">{customization.title}</div>
              <div className={`text-lg font-bold ${getRankColor()} mb-4 flex items-center gap-1`}>
                <Shield size={16} />
                Rank {character.rank}
              </div>
              
              <div className="w-full mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Level Progress</span>
                  <span>{character.experience}/{character.level * 100} XP</span>
                </div>
                <div className="progress-container">
                  <motion.div 
                    className="progress-bar"
                    initial={{ width: 0 }}
                    animate={{ width: `${(character.experience / (character.level * 100)) * 100}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Achievements Display */}
          <motion.div 
            className="card mt-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
              <Trophy size={18} />
              Recent Achievements
            </h3>
            {unlockedAchievements.length > 0 ? (
              <div className="grid grid-cols-4 gap-2">
                {unlockedAchievements.slice(0, 8).map(achievement => (
                  <AchievementBadge 
                    key={achievement.id} 
                    achievement={achievement} 
                    size="md"
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm">No achievements unlocked yet</p>
            )}
            {unlockedAchievements.length > 8 && (
              <div className="text-center mt-3">
                <span className="text-xs text-gray-400">
                  +{unlockedAchievements.length - 8} more achievements
                </span>
              </div>
            )}
          </motion.div>
        </div>
        
        <div className="md:col-span-2">
          <motion.div 
            className="card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <User size={18} />
              Hunter Stats
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <StatCard stat="strength" value={character.stats.strength} />
              <StatCard stat="intelligence" value={character.stats.intelligence} />
              <StatCard stat="discipline" value={character.stats.discipline} />
              <StatCard stat="charisma" value={character.stats.charisma} />
              <StatCard stat="vitality" value={character.stats.vitality} />
              <StatCard stat="agility" value={character.stats.agility} />
            </div>
            
            <div className="mt-6 p-4 bg-dark-200 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Total Power</span>
                <span className="text-xl font-bold">{totalStats}</span>
              </div>
              <div className="progress-container h-2">
                <motion.div 
                  className="progress-bar"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.5 }}
                  style={{ background: 'linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899)' }}
                />
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="card mt-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Award size={18} />
              Ranks & Titles
            </h3>
            
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-dark-200 flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-400">Current Title</div>
                  <div className="font-medium">{customization.title}</div>
                </div>
                <div className="text-xs px-2 py-1 rounded-full bg-primary-900/50">
                  Level {character.level}
                </div>
              </div>
              
              <div className="p-3 rounded-lg bg-dark-200 flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-400">Current Rank</div>
                  <div className={`font-medium ${getRankColor()}`}>Rank {character.rank}</div>
                </div>
                <Shield size={20} className={getRankColor()} />
              </div>
              
              <div className="p-3 rounded-lg bg-dark-200 flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-400">Achievements</div>
                  <div className="font-medium">{unlockedAchievements.length} Unlocked</div>
                </div>
                <Crown size={20} className="text-yellow-400" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;