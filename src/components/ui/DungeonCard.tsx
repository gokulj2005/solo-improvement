import React from 'react';
import { motion } from 'framer-motion';
import { Swords, Lock, CheckCircle } from 'lucide-react';
import { Dungeon } from '../../types';
import { useAppContext } from '../../context/AppContext';

interface DungeonCardProps {
  dungeon: Dungeon;
}

const DungeonCard: React.FC<DungeonCardProps> = ({ dungeon }) => {
  const { completeDungeon, character } = useAppContext();

  const handleComplete = () => {
    if (!dungeon.locked && !dungeon.completed) {
      completeDungeon(dungeon.id);
    }
  };

  const canEnter = !dungeon.locked && !dungeon.completed && 
    (!dungeon.requirements?.level || character.level >= dungeon.requirements.level) &&
    (!dungeon.requirements?.stats || Object.entries(dungeon.requirements.stats).every(
      ([stat, value]) => character.stats[stat as keyof typeof character.stats] >= value!
    ));

  const getDifficultyColor = () => {
    switch (dungeon.difficulty) {
      case 'E': return 'bg-green-500';
      case 'D': return 'bg-blue-500';
      case 'C': return 'bg-yellow-500';
      case 'B': return 'bg-orange-500';
      case 'A': return 'bg-red-500';
      case 'S': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <motion.div
      className={`card ${dungeon.completed ? 'border-success/30' : dungeon.locked ? 'border-gray-700/30 opacity-50' : ''}`}
      whileHover={{ scale: dungeon.locked ? 1 : 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${dungeon.locked ? 'bg-dark-200' : 'bg-dark-100'}`}>
            {dungeon.locked ? <Lock size={20} /> : <Swords size={20} />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${getDifficultyColor()}`}></span>
              <h3 className="font-medium">{dungeon.name}</h3>
            </div>
            <p className="text-sm text-gray-400">{dungeon.description}</p>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary-900/50">
            +{dungeon.experience} XP
          </span>
          
          {dungeon.completed ? (
            <span className="text-xs text-success flex items-center gap-1">
              <CheckCircle size={14} />
              Completed
            </span>
          ) : dungeon.locked ? (
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Lock size={14} />
              Locked
            </span>
          ) : (
            <button
              onClick={handleComplete}
              disabled={!canEnter}
              className={`text-xs px-3 py-1 rounded-md ${
                canEnter
                  ? 'bg-primary-600 hover:bg-primary-500 text-white'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              Enter
            </button>
          )}
        </div>
      </div>

      {dungeon.locked && dungeon.requirements && (
        <div className="mt-3 text-xs text-gray-400 border-t border-gray-700 pt-2">
          <p className="font-medium text-white/60">Requirements:</p>
          <ul className="mt-1 space-y-1">
            {dungeon.requirements.level && (
              <li className={character.level >= dungeon.requirements.level ? 'text-success' : ''}>
                Level {dungeon.requirements.level}+
              </li>
            )}
            {dungeon.requirements.stats && Object.entries(dungeon.requirements.stats).map(([stat, value]) => (
              <li 
                key={stat}
                className={character.stats[stat as keyof typeof character.stats] >= value! ? 'text-success' : ''}
              >
                {stat.charAt(0).toUpperCase() + stat.slice(1)} {value}+
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

export default DungeonCard;