import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Award, 
  Calendar, 
  CheckCircle, 
  Clock, 
  ArrowUpRight,
  FireExtinguisher,
  Flame,
  Lightbulb,
  RefreshCw
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import StatCard from '../components/ui/StatCard';
import QuestCard from '../components/ui/QuestCard';

const Dashboard: React.FC = () => {
  const { character, quests, skills, shadows, updateCharacter, resetDailyQuests } = useAppContext();
  
  if (!character) return null;
  
  // Calculate stats
  const completedQuests = quests.filter(q => q.completed).length;
  const totalQuests = quests.length;
  const unlockedSkills = skills.filter(s => s.unlocked).length;
  const shadowsCount = shadows.length;
  
  // Filter daily quests
  const dailyQuests = quests.filter(q => q.type === 'daily');
  const completedDailyQuests = dailyQuests.filter(q => q.completed).length;
  
  // Calculate progress percentage
  const questsPercentage = Math.round((completedQuests / totalQuests) * 100);
  const dailyQuestsPercentage = Math.round((completedDailyQuests / dailyQuests.length) * 100);
  
  // Handle attribute point spending
  const handleIncreaseStat = (stat: keyof typeof character.stats) => {
    if (character.attributePoints > 0) {
      updateCharacter({
        stats: {
          ...character.stats,
          [stat]: character.stats[stat] + 1
        },
        attributePoints: character.attributePoints - 1
      });
    }
  };

  // Calculate time until next reset
  const getTimeUntilReset = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
    tomorrow.setUTCHours(0, 0, 0, 0);
    
    const diff = tomorrow.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div>
      <div className="flex items-center justify-between mb-6">
        <motion.h1 
          className="text-3xl font-heading font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Hunter's Journey
        </motion.h1>
        <motion.div 
          className="text-sm text-gray-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Calendar className="inline mr-2" size={16} />
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </motion.div>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="card bg-gradient-to-br from-primary-900/30 to-primary-800/10"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-sm">Current Level</p>
              <p className="text-2xl font-bold">{character.level}</p>
            </div>
            <div className="p-3 bg-primary-900/50 rounded-full">
              <TrendingUp size={20} className="text-primary-400" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span>Progress</span>
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
        </motion.div>

        <motion.div 
          className="card bg-gradient-to-br from-secondary-900/30 to-secondary-800/10"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-sm">Daily Progress</p>
              <p className="text-2xl font-bold">{completedDailyQuests}/{dailyQuests.length}</p>
            </div>
            <div className="p-3 bg-secondary-900/50 rounded-full">
              <Clock size={20} className="text-secondary-400" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span>Completion</span>
              <span>{dailyQuestsPercentage}%</span>
            </div>
            <div className="progress-container">
              <motion.div 
                className="progress-bar"
                initial={{ width: 0 }}
                animate={{ width: `${dailyQuestsPercentage}%` }}
                style={{ background: 'linear-gradient(90deg, rgb(124, 58, 237), rgb(167, 139, 250))' }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="card bg-gradient-to-br from-accent-900/30 to-accent-800/10"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-sm">Skills Unlocked</p>
              <p className="text-2xl font-bold">{unlockedSkills}/{skills.length}</p>
            </div>
            <div className="p-3 bg-accent-900/50 rounded-full">
              <Lightbulb size={20} className="text-accent-400" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span>Skill Points</span>
              <span>{character.skillPoints} available</span>
            </div>
            <div className="progress-container">
              <motion.div 
                className="progress-bar"
                initial={{ width: 0 }}
                animate={{ width: `${(unlockedSkills / skills.length) * 100}%` }}
                style={{ background: 'linear-gradient(90deg, rgb(225, 29, 72), rgb(251, 113, 133))' }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="card bg-gradient-to-br from-gray-800/30 to-gray-700/10"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-sm">Shadows Extracted</p>
              <p className="text-2xl font-bold">{shadowsCount}</p>
            </div>
            <div className="p-3 bg-gray-800/50 rounded-full">
              <Flame size={20} className="text-orange-400" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span>Attribute Points</span>
              <span>{character.attributePoints} available</span>
            </div>
            <div className="progress-container">
              <motion.div 
                className="progress-bar"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                style={{ background: 'linear-gradient(90deg, rgb(75, 85, 99), rgb(156, 163, 175))' }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Daily Quests</h2>
            <div className="flex items-center gap-2">
              <div className="text-xs text-gray-400 flex items-center gap-1">
                <RefreshCw size={12} />
                Resets in {getTimeUntilReset()}
              </div>
              <button 
                onClick={resetDailyQuests}
                className="btn btn-ghost text-xs flex items-center gap-1"
                title="Manual reset (for testing)"
              >
                <RefreshCw size={14} />
                Reset Now
              </button>
            </div>
          </div>

          <motion.div 
            className="space-y-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {dailyQuests.map(quest => (
              <QuestCard key={quest.id} quest={quest} />
            ))}
          </motion.div>
        </div>

        <div>
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Character Stats</h2>
            {character.attributePoints > 0 && (
              <div className="text-xs text-primary-400 flex items-center gap-1">
                <Award size={14} />
                {character.attributePoints} points to spend
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <StatCard 
              stat="strength" 
              value={character.stats.strength} 
              onIncrease={() => handleIncreaseStat('strength')}
              canIncrease={character.attributePoints > 0}
            />
            <StatCard 
              stat="intelligence" 
              value={character.stats.intelligence} 
              onIncrease={() => handleIncreaseStat('intelligence')}
              canIncrease={character.attributePoints > 0}
            />
            <StatCard 
              stat="discipline" 
              value={character.stats.discipline} 
              onIncrease={() => handleIncreaseStat('discipline')}
              canIncrease={character.attributePoints > 0}
            />
            <StatCard 
              stat="charisma" 
              value={character.stats.charisma} 
              onIncrease={() => handleIncreaseStat('charisma')}
              canIncrease={character.attributePoints > 0}
            />
            <StatCard 
              stat="vitality" 
              value={character.stats.vitality} 
              onIncrease={() => handleIncreaseStat('vitality')}
              canIncrease={character.attributePoints > 0}
            />
            <StatCard 
              stat="agility" 
              value={character.stats.agility} 
              onIncrease={() => handleIncreaseStat('agility')}
              canIncrease={character.attributePoints > 0}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;