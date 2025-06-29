import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, X, Clock } from 'lucide-react';

interface QuestResetNotificationProps {
  show: boolean;
  onClose: () => void;
}

const QuestResetNotification: React.FC<QuestResetNotificationProps> = ({ show, onClose }) => {
  const [timeUntilReset, setTimeUntilReset] = useState('');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
      tomorrow.setUTCHours(0, 0, 0, 0);
      
      const diff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeUntilReset(`${hours}h ${minutes}m`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          className="fixed top-4 right-4 z-50 bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-4 rounded-lg shadow-neon max-w-sm"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-full">
                <RefreshCw size={20} />
              </div>
              <div>
                <h4 className="font-medium">Daily Quests Available!</h4>
                <p className="text-sm opacity-90">Your daily quests have been reset.</p>
                <div className="flex items-center gap-1 text-xs opacity-75 mt-1">
                  <Clock size={12} />
                  <span>Next reset in {timeUntilReset}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuestResetNotification;