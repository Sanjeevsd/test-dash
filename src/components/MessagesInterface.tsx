import React, { useState } from 'react';
import { MessageSquare, Search, Filter, Send, Paperclip, MoreVertical, User, Clock, Check, CheckCheck } from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  attachments?: string[];
}

interface Conversation {
  id: string;
  participants: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
  }[];
  lastMessage: Message;
  unreadCount: number;
  isGroup: boolean;
  title?: string;
}

interface MessagesInterfaceProps {
  sidebarCollapsed: boolean;
}

const MessagesInterface: React.FC<MessagesInterfaceProps> = ({ sidebarCollapsed }) => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const conversations: Conversation[] = [
    {
      id: '1',
      participants: [
        { id: '2', name: 'Sarah Johnson', role: 'Buyer' },
        { id: '1', name: 'John Buyer', role: 'Procurement Manager' }
      ],
      lastMessage: {
        id: '1',
        senderId: '2',
        senderName: 'Sarah Johnson',
        senderRole: 'Buyer',
        content: 'The supplier quotation for office equipment looks good. Should we proceed with approval?',
        timestamp: '2024-01-15T14:30:00Z',
        isRead: false
      },
      unreadCount: 2,
      isGroup: false
    },
    {
      id: '2',
      participants: [
        { id: '3', name: 'Mike Davis', role: 'Approver' },
        { id: '1', name: 'John Buyer', role: 'Procurement Manager' }
      ],
      lastMessage: {
        id: '2',
        senderId: '1',
        senderName: 'John Buyer',
        senderRole: 'Procurement Manager',
        content: 'I\'ve sent the RFQ for your approval. Please review when you have time.',
        timestamp: '2024-01-15T13:45:00Z',
        isRead: true
      },
      unreadCount: 0,
      isGroup: false
    },
    {
      id: '3',
      participants: [
        { id: '1', name: 'John Buyer', role: 'Procurement Manager' },
        { id: '2', name: 'Sarah Johnson', role: 'Buyer' },
        { id: '4', name: 'Lisa Wilson', role: 'Sub-Buyer' }
      ],
      title: 'Procurement Team',
      lastMessage: {
        id: '3',
        senderId: '4',
        senderName: 'Lisa Wilson',
        senderRole: 'Sub-Buyer',
        content: 'Thanks for the update on the new supplier onboarding process!',
        timestamp: '2024-01-15T12:20:00Z',
        isRead: true
      },
      unreadCount: 0,
      isGroup: true
    }
  ];

  const messages: { [key: string]: Message[] } = {
    '1': [
      {
        id: '1',
        senderId: '2',
        senderName: 'Sarah Johnson',
        senderRole: 'Buyer',
        content: 'Hi John, I received a quotation from TechCorp Industries for the office equipment RFQ.',
        timestamp: '2024-01-15T14:00:00Z',
        isRead: true
      },
      {
        id: '2',
        senderId: '1',
        senderName: 'John Buyer',
        senderRole: 'Procurement Manager',
        content: 'Great! What\'s the quoted amount and how does it compare to our budget?',
        timestamp: '2024-01-15T14:15:00Z',
        isRead: true
      },
      {
        id: '3',
        senderId: '2',
        senderName: 'Sarah Johnson',
        senderRole: 'Buyer',
        content: 'The supplier quotation for office equipment looks good. Should we proceed with approval?',
        timestamp: '2024-01-15T14:30:00Z',
        isRead: false
      }
    ],
    '2': [
      {
        id: '1',
        senderId: '1',
        senderName: 'John Buyer',
        senderRole: 'Procurement Manager',
        content: 'Hi Mike, I\'ve sent you an RFQ approval request for the IT services contract.',
        timestamp: '2024-01-15T13:30:00Z',
        isRead: true
      },
      {
        id: '2',
        senderId: '1',
        senderName: 'John Buyer',
        senderRole: 'Procurement Manager',
        content: 'I\'ve sent the RFQ for your approval. Please review when you have time.',
        timestamp: '2024-01-15T13:45:00Z',
        isRead: true
      }
    ]
  };

  const selectedConversationData = conversations.find(c => c.id === selectedConversation);
  const conversationMessages = selectedConversation ? messages[selectedConversation] || [] : [];

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      // Simulate sending message
      setNewMessage('');
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString();
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const filteredConversations = conversations.filter(conv =>
    conv.participants.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (conv.title && conv.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <main className={`
      transition-all duration-300 ease-in-out
      ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}
      pt-20 lg:pt-28 px-4 lg:px-8 pb-8 min-h-screen bg-gray-25
    `}>
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <div className="flex items-center space-x-3 mb-3">
          <MessageSquare className="text-blue-600" size={28} />
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">Messages</h1>
        </div>
        <p className="text-gray-600 font-medium">Communicate with your team and suppliers</p>
      </div>

      {/* Messages Container */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden h-[calc(100vh-200px)]">
        <div className="flex h-full">
          {/* Conversations List */}
          <div className="w-full lg:w-1/3 border-r border-gray-200 flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-soft"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedConversation === conversation.id ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {/* Avatar */}
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">
                        {conversation.isGroup 
                          ? conversation.title?.[0] || 'G'
                          : getInitials(conversation.participants.find(p => p.id !== '1')?.name || 'U')
                        }
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {conversation.isGroup 
                            ? conversation.title
                            : conversation.participants.find(p => p.id !== '1')?.name
                          }
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">
                            {formatTime(conversation.lastMessage.timestamp)}
                          </span>
                          {conversation.unreadCount > 0 && (
                            <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {conversation.lastMessage.content}
                      </p>
                      {!conversation.isGroup && (
                        <p className="text-xs text-gray-500 mt-1">
                          {conversation.participants.find(p => p.id !== '1')?.role}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="hidden lg:flex lg:w-2/3 flex-col">
            {selectedConversationData ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {selectedConversationData.isGroup 
                            ? selectedConversationData.title?.[0] || 'G'
                            : getInitials(selectedConversationData.participants.find(p => p.id !== '1')?.name || 'U')
                          }
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {selectedConversationData.isGroup 
                            ? selectedConversationData.title
                            : selectedConversationData.participants.find(p => p.id !== '1')?.name
                          }
                        </h3>
                        <p className="text-sm text-gray-600">
                          {selectedConversationData.isGroup 
                            ? `${selectedConversationData.participants.length} members`
                            : selectedConversationData.participants.find(p => p.id !== '1')?.role
                          }
                        </p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                      <MoreVertical size={20} className="text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {conversationMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === '1' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md ${
                        message.senderId === '1' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-900'
                      } rounded-lg px-4 py-2`}>
                        {message.senderId !== '1' && (
                          <p className="text-xs font-medium mb-1 opacity-75">
                            {message.senderName}
                          </p>
                        )}
                        <p className="text-sm">{message.content}</p>
                        <div className="flex items-center justify-end mt-1 space-x-1">
                          <span className="text-xs opacity-75">
                            {formatTime(message.timestamp)}
                          </span>
                          {message.senderId === '1' && (
                            <CheckCheck size={14} className="opacity-75" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <Paperclip size={20} className="text-gray-600" />
                    </button>
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                  <p className="text-gray-600">Choose a conversation from the list to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Chat View */}
      {selectedConversation && (
        <div className="lg:hidden fixed inset-0 bg-white z-50 flex flex-col">
          {/* Mobile Chat Header */}
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center space-x-3">
            <button
              onClick={() => setSelectedConversation(null)}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              ←
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {selectedConversationData?.isGroup 
                  ? selectedConversationData.title?.[0] || 'G'
                  : getInitials(selectedConversationData?.participants.find(p => p.id !== '1')?.name || 'U')
                }
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">
                {selectedConversationData?.isGroup 
                  ? selectedConversationData.title
                  : selectedConversationData?.participants.find(p => p.id !== '1')?.name
                }
              </h3>
              <p className="text-sm text-gray-600">
                {selectedConversationData?.isGroup 
                  ? `${selectedConversationData.participants.length} members`
                  : selectedConversationData?.participants.find(p => p.id !== '1')?.role
                }
              </p>
            </div>
          </div>

          {/* Mobile Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {conversationMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.senderId === '1' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs ${
                  message.senderId === '1' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                } rounded-lg px-4 py-2`}>
                  {message.senderId !== '1' && (
                    <p className="text-xs font-medium mb-1 opacity-75">
                      {message.senderName}
                    </p>
                  )}
                  <p className="text-sm">{message.content}</p>
                  <div className="flex items-center justify-end mt-1 space-x-1">
                    <span className="text-xs opacity-75">
                      {formatTime(message.timestamp)}
                    </span>
                    {message.senderId === '1' && (
                      <CheckCheck size={14} className="opacity-75" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Message Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Paperclip size={20} className="text-gray-600" />
              </button>
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default MessagesInterface;