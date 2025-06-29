import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import QuestResetNotification from '../ui/QuestResetNotification';
import { motion } from 'framer-motion';
import { useDailyQuestReset } from '../../hooks/useDailyQuestReset';

const Layout: React.FC = () => {
  const { showResetNotification, hideResetNotification } = useDailyQuestReset();

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <motion.main 
          className="flex-1 overflow-auto p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.main>
      </div>
      
      <QuestResetNotification 
        show={showResetNotification}
        onClose={hideResetNotification}
      />
    </div>
  );
};

export default Layout;