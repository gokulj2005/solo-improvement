export type NotificationType = 'success' | 'error' | 'warning' | 'info' | 'achievement';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  icon?: string;
  duration?: number; // in milliseconds, 0 for persistent
  action?: {
    label: string;
    onClick: () => void;
  };
  timestamp: string;
  read: boolean;
}

export interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  removeNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
  unreadCount: number;
}