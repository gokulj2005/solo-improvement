import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info, Trophy } from 'lucide-react';
import { Notification } from '../../types/notifications';

interface NotificationToastProps {
  notification: Notification;
  onClose: (id: string) => void;
}

const NotificationToast: React.FC<NotificationToastProps> = ({ notification, onClose }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle size={20} className="text-green-400" />;
      case 'error':
        return <AlertCircle size={20} className="text-red-400" />;
      case 'warning':
        return <AlertTriangle size={20} className="text-yellow-400" />;
      case 'achievement':
        return <Trophy size={20} className="text-primary-400" />;
      default:
        return <Info size={20} className="text-blue-400" />;
    }
  };

  const getBackgroundColor = () => {
    switch (notification.type) {
      case 'success':
        return 'from-green-600/20 to-green-500/10 border-green-500/30';
      case 'error':
        return 'from-red-600/20 to-red-500/10 border-red-500/30';
      case 'warning':
        return 'from-yellow-600/20 to-yellow-500/10 border-yellow-500/30';
      case 'achievement':
        return 'from-primary-600/20 to-primary-500/10 border-primary-500/30';
      default:
        return 'from-blue-600/20 to-blue-500/10 border-blue-500/30';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.8 }}
      className={`bg-gradient-to-r ${getBackgroundColor()} backdrop-blur-md border rounded-lg p-4 shadow-lg max-w-sm w-full`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-white text-sm">{notification.title}</h4>
          <p className="text-gray-300 text-xs mt-1">{notification.message}</p>
          
          {notification.action && (
            <button
              onClick={notification.action.onClick}
              className="mt-2 text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded transition-colors"
            >
              {notification.action.label}
            </button>
          )}
        </div>
        
        <button
          onClick={() => onClose(notification.id)}
          className="flex-shrink-0 p-1 hover:bg-white/20 rounded transition-colors"
        >
          <X size={14} className="text-gray-400" />
        </button>
      </div>
    </motion.div>
  );
};

export default NotificationToast;