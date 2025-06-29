import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, CheckCircle, AlertCircle, AlertTriangle, Info, Trophy, Trash2, Check } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { formatDistanceToNow } from '../../utils/dateUtils';

const NotificationCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll, removeNotification } = useNotifications();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={16} className="text-green-400" />;
      case 'error':
        return <AlertCircle size={16} className="text-red-400" />;
      case 'warning':
        return <AlertTriangle size={16} className="text-yellow-400" />;
      case 'achievement':
        return <Trophy size={16} className="text-primary-400" />;
      default:
        return <Info size={16} className="text-blue-400" />;
    }
  };

  const handleNotificationClick = (id: string) => {
    markAsRead(id);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-dark-200 transition-colors duration-200"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Notification Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute right-0 top-12 w-80 bg-dark-300 border border-primary-900/30 rounded-lg shadow-neon z-50 max-h-96 overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 border-b border-primary-900/30">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Notifications</h3>
                  <div className="flex items-center gap-2">
                    {notifications.length > 0 && (
                      <>
                        <button
                          onClick={markAllAsRead}
                          className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1"
                          title="Mark all as read"
                        >
                          <Check size={12} />
                          Mark all read
                        </button>
                        <button
                          onClick={clearAll}
                          className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                          title="Clear all"
                        >
                          <Trash2 size={12} />
                          Clear all
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-1 hover:bg-dark-200 rounded"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Notifications List */}
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-gray-400">
                    <Bell size={32} className="mx-auto mb-2 opacity-30" />
                    <p className="text-sm">No notifications yet</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {notifications.map(notification => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`p-3 hover:bg-dark-200/50 cursor-pointer border-l-2 ${
                          notification.read 
                            ? 'border-transparent opacity-60' 
                            : 'border-primary-500'
                        }`}
                        onClick={() => handleNotificationClick(notification.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            {getIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-sm text-white truncate">
                                {notification.title}
                              </h4>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeNotification(notification.id);
                                }}
                                className="p-1 hover:bg-dark-100 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X size={12} className="text-gray-400" />
                              </button>
                            </div>
                            <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                            <p className="text-gray-500 text-xs mt-1">
                              {formatDistanceToNow(new Date(notification.timestamp))} ago
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationCenter;