import { useEffect } from 'react';
import { useNotifications } from '../context/NotificationContext';
import { useAppContext } from '../context/AppContext';

export const useNotificationEffects = () => {
  const { addNotification } = useNotifications();
  const { character, quests, skills, shadows } = useAppContext();

  // Level up notifications
  useEffect(() => {
    if (character && character.level > 1) {
      const levelUpNotification = localStorage.getItem(`levelUp_${character.level}`);
      if (!levelUpNotification) {
        addNotification({
          type: 'achievement',
          title: 'Level Up!',
          message: `Congratulations! You've reached level ${character.level}!`,
          icon: 'Trophy',
          duration: 8000,
        });
        localStorage.setItem(`levelUp_${character.level}`, 'shown');
      }
    }
  }, [character?.level, addNotification]);

  // Quest completion notifications
  useEffect(() => {
    const completedQuests = quests.filter(q => q.completed);
    completedQuests.forEach(quest => {
      const notificationKey = `quest_${quest.id}_completed`;
      const hasShownNotification = localStorage.getItem(notificationKey);
      
      if (!hasShownNotification && quest.completedAt) {
        const completedTime = new Date(quest.completedAt);
        const now = new Date();
        const timeDiff = now.getTime() - completedTime.getTime();
        
        // Only show notification if quest was completed recently (within last 5 minutes)
        if (timeDiff < 5 * 60 * 1000) {
          addNotification({
            type: 'success',
            title: 'Quest Completed!',
            message: `You've completed "${quest.title}" and earned ${quest.experience} XP!`,
            duration: 6000,
          });
          localStorage.setItem(notificationKey, 'shown');
        }
      }
    });
  }, [quests, addNotification]);

  // Skill unlock notifications
  useEffect(() => {
    const unlockedSkills = skills.filter(s => s.unlocked);
    unlockedSkills.forEach(skill => {
      const notificationKey = `skill_${skill.id}_unlocked`;
      const hasShownNotification = localStorage.getItem(notificationKey);
      
      if (!hasShownNotification && skill.unlockedAt) {
        const unlockedTime = new Date(skill.unlockedAt);
        const now = new Date();
        const timeDiff = now.getTime() - unlockedTime.getTime();
        
        // Only show notification if skill was unlocked recently
        if (timeDiff < 5 * 60 * 1000) {
          addNotification({
            type: 'achievement',
            title: 'Skill Unlocked!',
            message: `You've unlocked "${skill.name}" skill!`,
            duration: 6000,
          });
          localStorage.setItem(notificationKey, 'shown');
        }
      }
    });
  }, [skills, addNotification]);

  // Shadow extraction notifications
  useEffect(() => {
    shadows.forEach(shadow => {
      const notificationKey = `shadow_${shadow.id}_extracted`;
      const hasShownNotification = localStorage.getItem(notificationKey);
      
      if (!hasShownNotification && shadow.extractedAt) {
        const extractedTime = new Date(shadow.extractedAt);
        const now = new Date();
        const timeDiff = now.getTime() - extractedTime.getTime();
        
        // Only show notification if shadow was extracted recently
        if (timeDiff < 5 * 60 * 1000) {
          addNotification({
            type: 'achievement',
            title: 'Shadow Extracted!',
            message: `You've extracted "${shadow.name}" and gained +${shadow.bonus.value} ${shadow.bonus.stat}!`,
            duration: 6000,
          });
          localStorage.setItem(notificationKey, 'shown');
        }
      }
    });
  }, [shadows, addNotification]);

  // Attribute points available notification
  useEffect(() => {
    if (character && character.attributePoints > 0) {
      const notificationKey = `attributePoints_${character.attributePoints}_available`;
      const hasShownNotification = localStorage.getItem(notificationKey);
      
      if (!hasShownNotification) {
        addNotification({
          type: 'info',
          title: 'Attribute Points Available!',
          message: `You have ${character.attributePoints} attribute points to spend. Visit your profile to allocate them.`,
          duration: 0, // Persistent until dismissed
          action: {
            label: 'Go to Profile',
            onClick: () => {
              window.location.href = '/profile';
            }
          }
        });
        localStorage.setItem(notificationKey, 'shown');
      }
    }
  }, [character?.attributePoints, addNotification]);

  // Skill points available notification
  useEffect(() => {
    if (character && character.skillPoints > 0) {
      const notificationKey = `skillPoints_${character.skillPoints}_available`;
      const hasShownNotification = localStorage.getItem(notificationKey);
      
      if (!hasShownNotification) {
        addNotification({
          type: 'info',
          title: 'Skill Points Available!',
          message: `You have ${character.skillPoints} skill points to spend. Visit the Skills page to unlock new abilities.`,
          duration: 0, // Persistent until dismissed
          action: {
            label: 'View Skills',
            onClick: () => {
              window.location.href = '/skills';
            }
          }
        });
        localStorage.setItem(notificationKey, 'shown');
      }
    }
  }, [character?.skillPoints, addNotification]);
};