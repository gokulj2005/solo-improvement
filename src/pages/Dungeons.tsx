import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import DungeonCard from '../components/ui/DungeonCard';
import { Swords, Award, Info } from 'lucide-react';

const Dungeons: React.FC = () => {
  const { dungeons } = useAppContext();
  
  const completedDungeons = dungeons.filter(d => d.completed).length;

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
    <div>
      <motion.div 
        className="flex justify-between items-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-heading font-bold">Dungeons</h1>
        <div className="flex items-center gap-2 bg-dark-300 rounded-lg px-4 py-2">
          <Award size={18} className="text-primary-400" />
          <span className="text-sm font-medium">Completed: </span>
          <span className="text-sm font-bold text-primary-400">{completedDungeons}/{dungeons.length}</span>
        </div>
      </motion.div>

      <div className="card p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-full bg-primary-900/50">
            <Swords size={24} className="text-primary-400" />
          </div>
          <div>
            <h3 className="font-medium text-lg mb-1">Dungeon Challenges</h3>
            <p className="text-gray-400 text-sm mb-2">
              Dungeons are long-term challenges that test your dedication and discipline. Each dungeon has requirements
              to enter and rewards for completion.
            </p>
            <p className="text-gray-400 text-sm">
              Completing dungeons unlocks new, more challenging dungeons with better rewards. Rise through the ranks
              from E to S class hunter by conquering increasingly difficult challenges.
            </p>
          </div>
        </div>
      </div>

      <motion.div 
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {dungeons.map(dungeon => (
          <DungeonCard key={dungeon.id} dungeon={dungeon} />
        ))}
      </motion.div>
    </div>
  );
};

export default Dungeons;