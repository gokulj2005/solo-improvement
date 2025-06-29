import { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';

export const useDailyQuestReset = () => {
  const { quests } = useAppContext();
  const [showResetNotification, setShowResetNotification] = useState(false);
  const [lastCheckDate, setLastCheckDate] = useState<string | null>(null);

  useEffect(() => {
    const checkForQuestReset = () => {
      const today = new Date().toISOString().split('T')[0];
      const storedDate = localStorage.getItem('lastQuestCheckDate');
      
      // If this is a new day and we have daily quests that are not completed
      if (storedDate && storedDate !== today) {
        const dailyQuests = quests.filter(q => q.type === 'daily');
        const hasUncompletedDailyQuests = dailyQuests.some(q => !q.completed);
        
        // Show notification if there are uncompleted daily quests (meaning they were reset)
        if (hasUncompletedDailyQuests && dailyQuests.length > 0) {
          setShowResetNotification(true);
        }
      }
      
      localStorage.setItem('lastQuestCheckDate', today);
      setLastCheckDate(today);
    };

    // Check immediately and then every minute
    checkForQuestReset();
    const interval = setInterval(checkForQuestReset, 60000);

    return () => clearInterval(interval);
  }, [quests]);

  const hideResetNotification = () => {
    setShowResetNotification(false);
  };

  return {
    showResetNotification,
    hideResetNotification,
    lastCheckDate
  };
};