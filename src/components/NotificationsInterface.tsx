import React, { useState } from 'react';
import { Bell, Check, X, CheckCheck, Eye, MessageSquare, FileText, Clock } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'quote' | 'message' | 'deadline' | 'approval' | 'general';
  actionData?: {
    rfqId?: string;
    supplierId?: string;
    conversationId?: string;
  };
}

interface NotificationsInterfaceProps {
  sidebarCollapsed: boolean;
}

const NotificationsInterface: React.FC<NotificationsInterfaceProps> = ({ sidebarCollapsed }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Quotation Received',
      message: 'TechCorp Industries has submitted a quotation for Office Equipment RFQ.',
      timestamp: '2024-01-15T14:30:00Z',
      isRead: false,
      type: 'quote',
      actionData: { rfqId: 'RFQ-2024-001', supplierId: 'techcorp' }
    },
    {
      id: '2',
      title: 'Supplier Message',
      message: 'Global Supply Co. sent you a message regarding the IT Services contract.',
      timestamp: '2024-01-15T13:45:00Z',
      isRead: false,
      type: 'message',
      actionData: { conversationId: 'conv-123', supplierId: 'global-supply' }
    },
    {
      id: '3',
      title: 'RFQ Deadline Approaching',
      message: 'Marketing Campaign RFQ will expire in 2 days. Please review submissions.',
      timestamp: '2024-01-15T12:20:00Z',
      isRead: true,
      type: 'deadline',
      actionData: { rfqId: 'RFQ-2024-003' }
    },
    {
      id: '4',
      title: 'Quotation Approved',
      message: 'Your RFQ for Manufacturing Materials has been approved by the director.',
      timestamp: '2024-01-15T11:15:00Z',
      isRead: false,
      type: 'approval',
      actionData: { rfqId: 'RFQ-2024-004' }
    },
    {
      id: '5',
      title: 'New Team Member Added',
      message: 'Emma Martinez has been added to the Procurement team as a Buyer.',
      timestamp: '2024-01-15T10:30:00Z',
      isRead: true,
      type: 'general'
    }
  ]);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, isRead: true })));
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const handleNotificationAction = (notification: Notification) => {
    // Handle different notification actions
    switch (notification.type) {
      case 'quote':
        console.log('Navigate to quotation:', notification.actionData?.rfqId);
        // Navigate to quotation details
        break;
      case 'message':
        console.log('Open conversation:', notification.actionData?.conversationId);
        // Navigate to messages
        break;
      case 'deadline':
        console.log('View RFQ:', notification.actionData?.rfqId);
        // Navigate to RFQ details
        break;
      case 'approval':
        console.log('View approved RFQ:', notification.actionData?.rfqId);
        // Navigate to approved quotations
        break;
      default:
        break;
    }
    
    // Mark as read when clicked
    if (!notification.isRead) {
      handleMarkAsRead(notification.id);
    }
  };

  const getActionButton = (notification: Notification) => {
    switch (notification.type) {
      case 'quote':
        return (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNotificationAction(notification);
            }}
            className="flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Eye size={14} className="mr-1" />
            View Quote
          </button>
        );
      case 'message':
        return (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNotificationAction(notification);
            }}
            className="flex items-center px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
          >
            <MessageSquare size={14} className="mr-1" />
            Reply
          </button>
        );
      case 'deadline':
        return (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNotificationAction(notification);
            }}
            className="flex items-center px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
          >
            <Clock size={14} className="mr-1" />
            Review RFQ
          </button>
        );
      case 'approval':
        return (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNotificationAction(notification);
            }}
            className="flex items-center px-3 py-1 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
          >
            <FileText size={14} className="mr-1" />
            View Details
          </button>
        );
      default:
        return null;
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <main className={`
      transition-all duration-300 ease-in-out
      ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}
      pt-20 lg:pt-28 px-4 lg:px-8 pb-8 min-h-screen bg-gray-25
    `}>
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bell className="text-blue-600" size={28} />
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">Notifications</h1>
            {unreadCount > 0 && (
              <span className="bg-gradient-to-r from-primary-600 to-purple-600 text-white text-sm px-3 py-1 rounded-full font-medium shadow-soft">
                {unreadCount} unread
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="flex items-center px-4 py-2.5 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 font-medium shadow-soft hover:shadow-medium"
            >
              <CheckCheck size={16} className="mr-2" />
              Mark All Read
            </button>
          )}
        </div>
        <p className="text-gray-600 font-medium mt-2">Stay updated with important alerts and messages</p>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white rounded-2xl border p-4 shadow-soft transition-all duration-200 hover:shadow-medium cursor-pointer ${
              !notification.isRead ? 'border-l-4 border-l-primary-500' : 'border-gray-200'
            }`}
            onClick={() => handleNotificationAction(notification)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className={`font-semibold mb-1 ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                  {notification.title}
                </h3>
                <p className={`text-sm mb-3 ${!notification.isRead ? 'text-gray-700' : 'text-gray-600'}`}>
                  {notification.message}
                </p>
                
                {/* Action Button and Timestamp Row */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {formatTime(notification.timestamp)}
                  </span>
                  <div className="flex items-center space-x-2">
                    {getActionButton(notification)}
                  </div>
                </div>
              </div>
              
              {/* Mark Read and Delete Actions */}
              <div className="flex items-center space-x-2 ml-4">
                {!notification.isRead && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkAsRead(notification.id);
                    }}
                    className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
                    title="Mark as read"
                  >
                    <Check size={16} />
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteNotification(notification.id);
                  }}
                  className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                  title="Delete"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {notifications.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
            <Bell size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-600">You're all caught up!</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default NotificationsInterface;