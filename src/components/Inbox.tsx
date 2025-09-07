import React, { useState } from 'react';
import { Mail, MessageSquare, Search, Filter, Calendar, Eye, Reply, Forward, Archive, MoreHorizontal, Phone, AtSign } from 'lucide-react';

interface Message {
  id: string;
  type: 'email' | 'whatsapp';
  from: string;
  subject: string;
  preview: string;
  timestamp: string;
  isRead: boolean;
  isForwarded: boolean;
  priority: 'High' | 'Medium' | 'Low';
  attachments?: number;
}

interface InboxProps {
  sidebarCollapsed: boolean;
}

const Inbox: React.FC<InboxProps> = ({ sidebarCollapsed }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const messages: Message[] = [
    {
      id: '1',
      type: 'email',
      from: 'sarah.johnson@techcorp.com',
      subject: 'Urgent: Office Equipment RFQ Response Needed',
      preview: 'Hi John, we received the quotation from TechCorp Industries for the office equipment. The pricing looks competitive...',
      timestamp: '2024-01-15T14:30:00Z',
      isRead: false,
      isForwarded: true,
      priority: 'High',
      attachments: 2
    },
    {
      id: '2',
      type: 'whatsapp',
      from: 'Mike Davis',
      subject: 'Supplier meeting tomorrow',
      preview: 'Hey, just confirming our meeting with Global Supply Co. tomorrow at 2 PM. Should we prepare anything specific?',
      timestamp: '2024-01-15T13:45:00Z',
      isRead: false,
      isForwarded: false,
      priority: 'Medium'
    },
    {
      id: '3',
      type: 'email',
      from: 'procurement@globalsupply.com',
      subject: 'Re: IT Services Contract Proposal',
      preview: 'Thank you for your inquiry. We have reviewed your requirements and are pleased to submit our proposal...',
      timestamp: '2024-01-15T12:20:00Z',
      isRead: true,
      isForwarded: true,
      priority: 'Medium',
      attachments: 1
    },
    {
      id: '4',
      type: 'whatsapp',
      from: 'Lisa Wilson',
      subject: 'Quick question about supplier docs',
      preview: 'Hi! Can you check if TechCorp has submitted their insurance certificate? I can\'t find it in the system.',
      timestamp: '2024-01-15T11:15:00Z',
      isRead: true,
      isForwarded: false,
      priority: 'Low'
    },
    {
      id: '5',
      type: 'email',
      from: 'director@company.com',
      subject: 'Q2 Budget Approval for Manufacturing Materials',
      preview: 'The board has approved the Q2 budget allocation for manufacturing materials. Please proceed with the procurement...',
      timestamp: '2024-01-15T10:30:00Z',
      isRead: false,
      isForwarded: true,
      priority: 'High'
    },
    {
      id: '6',
      type: 'whatsapp',
      from: 'Emma Martinez',
      subject: 'Supplier onboarding update',
      preview: 'Just finished the onboarding call with Innovation Partners. They\'re ready to start receiving RFQs.',
      timestamp: '2024-01-15T09:45:00Z',
      isRead: true,
      isForwarded: false,
      priority: 'Low'
    },
    {
      id: '7',
      type: 'email',
      from: 'quotes@innovationpartners.com',
      subject: 'Marketing Campaign Quotation - Final Version',
      preview: 'Please find attached our final quotation for the Q1 marketing campaign. We have incorporated all your feedback...',
      timestamp: '2024-01-14T16:20:00Z',
      isRead: true,
      isForwarded: true,
      priority: 'Medium',
      attachments: 3
    },
    {
      id: '8',
      type: 'whatsapp',
      from: 'David Brown',
      subject: 'Logistics meeting notes',
      preview: 'Sharing the notes from today\'s logistics meeting. Key points: new shipping rates, delivery schedules...',
      timestamp: '2024-01-14T15:10:00Z',
      isRead: true,
      isForwarded: false,
      priority: 'Low'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getMessageIcon = (type: string) => {
    return type === 'email' ? Mail : MessageSquare;
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.preview.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'unread' && !message.isRead) ||
                         (selectedFilter === 'forwarded' && message.isForwarded) ||
                         (selectedFilter === 'email' && message.type === 'email') ||
                         (selectedFilter === 'whatsapp' && message.type === 'whatsapp');
    return matchesSearch && matchesFilter;
  });

  return (
    <main className={`
      transition-all duration-300 ease-in-out
      ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}
      pt-16 lg:pt-20 px-4 lg:px-6 pb-6 min-h-screen bg-gray-25
    `}>
      {/* Header */}
      <div className="mb-4 flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 mb-1">Inbox</h1>
          <p className="text-xs text-gray-500">Forwarded emails and WhatsApp messages</p>
        </div>
        
        <div className="flex items-center space-x-2 mt-3 lg:mt-0">
          <span className="text-xs text-gray-500">
            {messages.filter(m => !m.isRead).length} unread
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-3 mb-4">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-3 lg:space-y-0 lg:space-x-3">
          <div className="flex-1 relative">
            <Search size={14} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-500 focus:border-transparent text-xs"
            />
          </div>
          
          <div className="flex space-x-2">
            {['all', 'unread', 'forwarded', 'email', 'whatsapp'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedFilter === filter
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-1">
        {filteredMessages.map((message) => {
          const MessageIcon = getMessageIcon(message.type);
          return (
            <div key={message.id} className={`bg-white rounded-lg border border-gray-200 p-3 hover:shadow-sm transition-all duration-200 ${
              !message.isRead ? 'border-l-2 border-l-primary-500' : ''
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`p-1.5 rounded-lg ${
                    message.type === 'email' ? 'bg-blue-100' : 'bg-green-100'
                  }`}>
                    <MessageIcon size={12} className={
                      message.type === 'email' ? 'text-blue-600' : 'text-green-600'
                    } />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className={`text-xs truncate ${!message.isRead ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                        {message.subject}
                      </h3>
                      {message.isForwarded && (
                        <span className="text-xs bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-full font-medium">
                          Forwarded
                        </span>
                      )}
                      <span className={`px-1.5 py-0.5 text-xs font-medium rounded-full ${getPriorityColor(message.priority)}`}>
                        {message.priority}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs text-gray-600 font-medium">{message.from}</span>
                      {message.attachments && (
                        <span className="text-xs text-gray-500">
                          📎 {message.attachments}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-xs text-gray-600 truncate">{message.preview}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-3">
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {formatTime(message.timestamp)}
                  </span>
                  <div className="flex items-center space-x-1">
                    <button className="p-1 text-blue-600 hover:text-blue-700 rounded">
                      <Eye size={12} />
                    </button>
                    <button className="p-1 text-green-600 hover:text-green-700 rounded">
                      <Reply size={12} />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                      <MoreHorizontal size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredMessages.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <Mail size={32} className="mx-auto text-gray-300 mb-3" />
          <h3 className="text-sm font-medium text-gray-900 mb-1">No messages found</h3>
          <p className="text-xs text-gray-600">
            {searchQuery ? 'Try adjusting your search' : 'No forwarded messages in your inbox'}
          </p>
        </div>
      )}
    </main>
  );
};

export default Inbox;