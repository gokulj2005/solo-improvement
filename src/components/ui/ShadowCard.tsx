import React from 'react';
import { motion } from 'framer-motion';
import { Ghost, ArrowUp } from 'lucide-react';
import { Shadow } from '../../types';

interface ShadowCardProps {
  shadow: Shadow;
}

const ShadowCard: React.FC<ShadowCardProps> = ({ shadow }) => {
  return (
    <motion.div
      className="card relative overflow-hidden"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-secondary-900/20 to-secondary-700/10 opacity-50" />
      
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-secondary-900/50">
          <Ghost size={24} className="text-secondary-400" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-medium text-white">{shadow.name}</h3>
          <p className="text-sm text-gray-400">{shadow.description}</p>
        </div>
        
        <div className="flex flex-col items-end">
          <div className="flex items-center text-xs bg-secondary-900/50 px-2 py-1 rounded-full">
            <span className="capitalize text-secondary-300">{shadow.bonus.stat}</span>
            <ArrowUp size={12} className="text-secondary-400 ml-1" />
            <span className="font-bold text-white ml-1">+{shadow.bonus.value}</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">Level {shadow.level}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default ShadowCard;