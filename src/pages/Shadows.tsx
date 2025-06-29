import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import ShadowCard from '../components/ui/ShadowCard';
import { Ghost, Info } from 'lucide-react';

const Shadows: React.FC = () => {
  const { shadows } = useAppContext();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <div>
      <motion.div 
        className="flex justify-between items-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-heading font-bold">Shadows</h1>
        <div className="flex items-center gap-2 bg-dark-300 rounded-lg px-4 py-2">
          <Ghost size={18} className="text-secondary-400" />
          <span className="text-sm font-medium">Shadows Extracted: </span>
          <span className="text-sm font-bold text-secondary-400">{shadows.length}</span>
        </div>
      </motion.div>

      <div className="card p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-full bg-secondary-900/50">
            <Info size={24} className="text-secondary-400" />
          </div>
          <div>
            <h3 className="font-medium text-lg mb-1">Shadow Extraction</h3>
            <p className="text-gray-400 text-sm mb-2">
              When you complete quests, you can extract shadows from them. Each shadow provides passive bonuses to your stats, 
              helping you become stronger.
            </p>
            <p className="text-gray-400 text-sm">
              Visit the Quests page, complete quests, and click "Extract Shadow" on completed quests to grow your army of shadows.
            </p>
          </div>
        </div>
      </div>

      {shadows.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {shadows.map(shadow => (
            <ShadowCard key={shadow.id} shadow={shadow} />
          ))}
        </motion.div>
      ) : (
        <motion.div 
          className="text-center py-16 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Ghost size={60} className="mx-auto mb-4 opacity-30" />
          <h3 className="text-xl font-medium mb-2">No Shadows Yet</h3>
          <p className="max-w-md mx-auto">
            Complete quests and extract shadows from them to build your shadow army. 
            Each shadow provides passive bonuses to your stats.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Shadows;