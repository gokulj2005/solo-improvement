import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, BookOpen, Clock, Users, Heart, Zap, Brain, DivideIcon as LucideIcon } from 'lucide-react';
import { StatType } from '../../types';

interface StatCardProps {
  stat: StatType;
  value: number;
  onIncrease?: () => void;
  canIncrease?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ stat, value, onIncrease, canIncrease = false }) => {
  const statInfo = {
    strength: {
      label: 'Strength',
      icon: Dumbbell,
      color: 'from-red-500 to-orange-500'
    },
    intelligence: {
      label: 'Intelligence',
      icon: Brain,
      color: 'from-blue-500 to-cyan-500'
    },
    discipline: {
      label: 'Discipline',
      icon: Clock,
      color: 'from-purple-500 to-indigo-500'
    },
    charisma: {
      label: 'Charisma',
      icon: Users,
      color: 'from-pink-500 to-rose-500'
    },
    vitality: {
      label: 'Vitality',
      icon: Heart,
      color: 'from-green-500 to-emerald-500'
    },
    agility: {
      label: 'Agility',
      icon: Zap,
      color: 'from-yellow-500 to-amber-500'
    }
  };

  const { label, icon: Icon, color } = statInfo[stat];

  return (
    <motion.div
      className="stat-card relative"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10 rounded-lg`} />
      
      <div className="flex flex-col items-center">
        <Icon className={`mb-2 text-transparent bg-clip-text bg-gradient-to-r ${color}`} size={24} />
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
      </div>

      {canIncrease && (
        <motion.button
          className="absolute right-2 top-2 bg-primary-600 rounded-full w-6 h-6 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onIncrease}
        >
          <span className="text-xs font-bold">+</span>
        </motion.button>
      )}
    </motion.div>
  );
};

export default StatCard;