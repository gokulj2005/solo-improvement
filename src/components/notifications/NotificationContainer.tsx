import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useNotifications } from '../../context/NotificationContext';
import NotificationToast from './NotificationToast';

const NotificationContainer: React.FC = () => {
  const { notifications, removeNotification } = useNotifications();

  // Only show the first 5 notifications to avoid overwhelming the UI
  const visibleNotifications = notifications.slice(0, 5);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {visibleNotifications.map(notification => (
          <NotificationToast
            key={notification.id}
            notification={notification}
            onClose={removeNotification}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationContainer;