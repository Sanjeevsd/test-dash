import React, { useState } from 'react';
import { X, Bell, Check, CheckCheck, FileText, MessageSquare, Clock, Shield, AlertCircle, Eye, Reply, Calendar } from 'lucide-react';

interface Notification {
  id: string;
  type: 'rfq' | 'quote' | 'approval' | 'message' | 'system';
  title: string;
  subtext: string;
  timestamp: string;
  isRead: boolean;
  ctaText: string;
  ctaAction: () => void;
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  unreadCount: number;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  unreadCount: initialUnreadCount
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'quote',
      title: 'New Quote Received',
      subtext: 'TechCorp Industries • RFQ #12345',
      timestamp: '5 mins ago',
      isRead: false,
      ctaText: 'View Quote',
      ctaAction: () => console.log('Navigate to quote')
    },
    {
      id: '2',
      type: 'message',
      title: 'Supplier Message',
      subtext: 'Global Supply Co. sent you a message',
      timestamp: '15 mins ago',
      isRead: false,
      ctaText: 'Reply',
      ctaAction: () => console.log('Navigate to messages')
    },
    {
      id: '3',
      type: 'rfq',
      title: 'RFQ Deadline Approaching',
      subtext: 'Marketing Campaign RFQ expires in 2 days',
      timestamp: '1 hour ago',
      isRead: true,
      ctaText: 'Review RFQ',
      ctaAction: () => console.log('Navigate to RFQ')
    },
    {
      id: '4',
      type: 'approval',
      title: 'Quote Approved',
      subtext: 'Manufacturing Materials approved by Director',
      timestamp: '2 hours ago',
      isRead: false,
      ctaText: 'View Details',
      ctaAction: () => console.log('Navigate to approved quote')
    },
    {
      id: '5',
      type: 'system',
      title: 'New Team Member Added',
      subtext: 'Emma Martinez joined as Buyer',
      timestamp: '3 hours ago',
      isRead: true,
      ctaText: 'View Team',
      ctaAction: () => console.log('Navigate to team')
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: string) => {
    const iconProps = { size: 20, className: "text-white" };
    
    switch (type) {
      case 'rfq':
        return <FileText {...iconProps} />;
      case 'quote':
        return <Eye {...iconProps} />;
      case 'approval':
        return <Shield {...iconProps} />;
      case 'message':
        return <MessageSquare {...iconProps} />;
      case 'system':
        return <AlertCircle {...iconProps} />;
      default:
        return <Bell {...iconProps} />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'rfq':
        return 'bg-blue-500';
      case 'quote':
        return 'bg-green-500';
      case 'approval':
        return 'bg-purple-500';
      case 'message':
        return 'bg-orange-500';
      case 'system':
        return 'bg-gray-500';
      default:
        return 'bg-blue-500';
    }
  };

  const handleMarkAsRead = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setNotifications(prev => prev.map(notification => 
      notification.id === id ? { ...notification, isRead: !notification.isRead } : notification
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, isRead: true })));
  };

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read when clicked
    if (!notification.isRead) {
      setNotifications(prev => prev.map(n => 
        n.id === notification.id ? { ...n, isRead: true } : n
      ));
    }
    // Execute the CTA action
    notification.ctaAction();
  };

  const handleCTAClick = (notification: Notification, event: React.MouseEvent) => {
    event.stopPropagation();
    notification.ctaAction();
    // Mark as read when CTA is clicked
    if (!notification.isRead) {
      setNotifications(prev => prev.map(n => 
        n.id === notification.id ? { ...n, isRead: true } : n
      ));
    }
  };

  const SkeletonCard = () => (
    <div className="p-4 border-b border-gray-100 animate-pulse">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="w-16 h-6 bg-gray-200 rounded"></div>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Overlay */}
      <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />
      
      {/* Desktop Overlay */}
      <div className="hidden lg:block fixed inset-0 z-40" onClick={onClose} />

      {/* Notification Panel */}
      <div className={`
        fixed top-0 right-0 h-full bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        w-full lg:w-96
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
              >
                <CheckCheck size={16} />
                <span className="hidden sm:inline">Mark All Read</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            // Loading State
            <div>
              {[...Array(5)].map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : notifications.length > 0 ? (
            // Notifications
            <div>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`
                    p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors
                    ${!notification.isRead ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''}
                  `}
                >
                  <div className="flex items-start space-x-3">
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getNotificationColor(notification.type)}`}>
                      {getNotificationIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-sm mb-1 ${!notification.isRead ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                        {notification.title}
                      </h3>
                      <p className="text-xs text-gray-600 mb-2">
                        {notification.subtext}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {notification.timestamp}
                        </span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={(e) => handleCTAClick(notification, e)}
                            className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition-colors font-medium"
                          >
                            {notification.ctaText}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Read/Unread Toggle */}
                    <button
                      onClick={(e) => handleMarkAsRead(notification.id, e)}
                      className="p-1 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0"
                      title={notification.isRead ? 'Mark as unread' : 'Mark as read'}
                    >
                      {notification.isRead ? (
                        <div className="w-2 h-2 border border-gray-400 rounded-full"></div>
                      ) : (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Empty State
            <div className="flex flex-col items-center justify-center h-64 p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Bell size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Notifications Yet</h3>
              <p className="text-sm text-gray-600 max-w-xs">
                You'll receive updates about RFQs, Quotes, Approvals, and more here.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationCenter;