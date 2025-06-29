import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Award, Clock, Dumbbell, BookOpen, Brain, Users, Heart, Zap } from 'lucide-react';
import { Quest } from '../../types';
import { useAppContext } from '../../context/AppContext';

interface QuestCardProps {
  quest: Quest;
}

const QuestCard: React.FC<QuestCardProps> = ({ quest }) => {
  const { completeQuest, extractShadow } = useAppContext();

  const handleComplete = () => {
    if (!quest.completed) {
      completeQuest(quest.id);
    }
  };

  const handleExtractShadow = (e: React.MouseEvent) => {
    e.stopPropagation();
    extractShadow(quest.id);
  };

  const getQuestIcon = () => {
    switch (quest.icon) {
      case 'Dumbbell': return <Dumbbell size={20} />;
      case 'BookOpen': return <BookOpen size={20} />;
      case 'Brain': return <Brain size={20} />;
      case 'Users': return <Users size={20} />;
      case 'Heart': return <Heart size={20} />;
      case 'Clock': return <Clock size={20} />;
      case 'Trophy': return <Award size={20} />;
      case 'Target': return <Clock size={20} />;
      default: return <Circle size={20} />;
    }
  };

  const getDifficultyColor = () => {
    switch (quest.difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-orange-500';
      case 'extreme': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <motion.div
      className={`quest-card ${quest.completed ? 'border-green-500/30' : ''}`}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-dark-200">
            {getQuestIcon()}
          </div>
          <div>
            <h3 className="font-medium">{quest.title}</h3>
            <p className="text-sm text-gray-400">{quest.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary-900/50">
            +{quest.experience} XP
          </span>
          <span className={`w-3 h-3 rounded-full ${getDifficultyColor()}`} title={`Difficulty: ${quest.difficulty}`}></span>
          <button 
            onClick={handleComplete}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {quest.completed ? <CheckCircle className="text-green-500\" size={22} /> : <Circle size={22} />}
          </button>
        </div>
      </div>

      {quest.completed && (
        <motion.div 
          className="mt-3 flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <button
            onClick={handleExtractShadow}
            className="text-xs bg-secondary-600 hover:bg-secondary-500 text-white px-3 py-1 rounded-md flex items-center gap-1 transition-colors"
          >
            <Award size={14} />
            Extract Shadow
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default QuestCard;