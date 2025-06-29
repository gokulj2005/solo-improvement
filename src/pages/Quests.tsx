import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import QuestCard from '../components/ui/QuestCard';
import { 
  Clock, 
  Calendar, 
  Award,
  CheckCircle,
  Filter
} from 'lucide-react';

const Quests: React.FC = () => {
  const { quests } = useAppContext();
  const [filter, setFilter] = useState<string>('all');
  
  const filteredQuests = filter === 'all' 
    ? quests 
    : filter === 'completed' 
      ? quests.filter(q => q.completed) 
      : filter === 'daily'
        ? quests.filter(q => q.type === 'daily')
        : filter === 'weekly'
          ? quests.filter(q => q.type === 'weekly')
          : quests.filter(q => !q.completed);

  const getQuestsByType = (type: string) => {
    return quests.filter(q => q.type === type);
  };

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
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-heading font-bold">Quests</h1>
        
        <div className="flex flex-wrap gap-2">
          <button 
            className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-ghost'} text-sm flex items-center gap-1`}
            onClick={() => setFilter('all')}
          >
            <Filter size={14} />
            All
          </button>
          <button 
            className={`btn ${filter === 'active' ? 'btn-primary' : 'btn-ghost'} text-sm flex items-center gap-1`}
            onClick={() => setFilter('active')}
          >
            <Clock size={14} />
            Active
          </button>
          <button 
            className={`btn ${filter === 'completed' ? 'btn-primary' : 'btn-ghost'} text-sm flex items-center gap-1`}
            onClick={() => setFilter('completed')}
          >
            <CheckCircle size={14} />
            Completed
          </button>
          <button 
            className={`btn ${filter === 'daily' ? 'btn-primary' : 'btn-ghost'} text-sm flex items-center gap-1`}
            onClick={() => setFilter('daily')}
          >
            <Clock size={14} />
            Daily
          </button>
          <button 
            className={`btn ${filter === 'weekly' ? 'btn-primary' : 'btn-ghost'} text-sm flex items-center gap-1`}
            onClick={() => setFilter('weekly')}
          >
            <Calendar size={14} />
            Weekly
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <motion.div 
          className="card bg-gradient-to-br from-primary-900/30 to-primary-800/10"
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-sm">Daily Quests</p>
              <p className="text-2xl font-bold">
                {getQuestsByType('daily').filter(q => q.completed).length}/{getQuestsByType('daily').length}
              </p>
            </div>
            <div className="p-3 bg-primary-900/50 rounded-full">
              <Clock size={20} className="text-primary-400" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="card bg-gradient-to-br from-secondary-900/30 to-secondary-800/10"
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-sm">Weekly Quests</p>
              <p className="text-2xl font-bold">
                {getQuestsByType('weekly').filter(q => q.completed).length}/{getQuestsByType('weekly').length}
              </p>
            </div>
            <div className="p-3 bg-secondary-900/50 rounded-full">
              <Calendar size={20} className="text-secondary-400" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="card bg-gradient-to-br from-accent-900/30 to-accent-800/10"
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-sm">Total Completed</p>
              <p className="text-2xl font-bold">
                {quests.filter(q => q.completed).length}/{quests.length}
              </p>
            </div>
            <div className="p-3 bg-accent-900/50 rounded-full">
              <Award size={20} className="text-accent-400" />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredQuests.map(quest => (
          <QuestCard key={quest.id} quest={quest} />
        ))}
        
        {filteredQuests.length === 0 && (
          <motion.div 
            className="text-center py-10 text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Award size={40} className="mx-auto mb-3 opacity-30" />
            <p>No quests found matching the current filter.</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Quests;