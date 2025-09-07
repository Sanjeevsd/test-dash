import React, { useState } from 'react';
import { Search, Plus, ShoppingBag, Bell, MessageSquare, User, Settings, FileText, CheckSquare, Users, FolderOpen, ChevronDown } from 'lucide-react';
import NotificationBell from './NotificationBell';

interface TopNavigationProps {
  onNotificationClick: () => void;
  unreadNotificationCount: number;
  onProfileClick: () => void;
}

const TopNavigation: React.FC<TopNavigationProps> = ({ 
  onNotificationClick, 
  unreadNotificationCount,
  onProfileClick
}) => {
  const [isCreateDropdownOpen, setIsCreateDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const createOptions = [
    { 
      icon: FileText, 
      label: 'Create RFQ', 
      description: 'Request for quotation',
      action: () => console.log('Create RFQ'),
      color: 'text-blue-600'
    },
    { 
      icon: CheckSquare, 
      label: 'Create Task', 
      description: 'New procurement task',
      action: () => console.log('Create Task'),
      color: 'text-green-600'
    },
    { 
      icon: Users, 
      label: 'Add Supplier', 
      description: 'Add new supplier',
      action: () => console.log('Add Supplier'),
      color: 'text-purple-600'
    },
    { 
      icon: FolderOpen, 
      label: 'Create Project', 
      description: 'New procurement project',
      action: () => console.log('Create Project'),
      color: 'text-orange-600'
    }
  ];

  const profileOptions = [
    { 
      icon: User, 
      label: 'My Profile', 
      action: onProfileClick
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      action: () => console.log('Settings')
    }
  ];

  const handleCreateOption = (option: typeof createOptions[0]) => {
    option.action();
    setIsCreateDropdownOpen(false);
  };

  const handleProfileOption = (option: typeof profileOptions[0]) => {
    option.action();
    setIsProfileDropdownOpen(false);
  };

  return (
    <>
      {/* Mobile Top Navigation */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-30 px-3 sm:px-4 py-3 sm:py-4 h-16 shadow-soft">
        <div className="flex items-center justify-between">
          {/* Left side - Logo Only */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center shadow-soft">
              <span className="text-white font-bold text-sm">P</span>
            </div>
          </div>

          {/* Center - Search */}
          <div className="flex-1 mx-3 sm:mx-4">
            <div className="relative">
              <Search size={14} className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-7 sm:pl-9 pr-3 sm:pr-4 py-1.5 sm:py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:bg-white focus:border-primary-300 focus:ring-2 focus:ring-primary-100 transition-all duration-200 text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Create Button */}
            <button 
              onClick={() => setIsCreateDropdownOpen(!isCreateDropdownOpen)}
              className="flex items-center px-2 sm:px-3 py-1.5 sm:py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all duration-200 text-xs sm:text-sm font-medium shadow-soft"
            >
              <Plus size={14} className="mr-1" />
              <span>Create</span>
            </button>

            {/* Notifications */}
            <button
              onClick={onNotificationClick}
              className="relative p-1.5 sm:p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200"
            >
              <Bell size={16} />
              {unreadNotificationCount > 0 && (
                <span className="absolute -top-0.5 sm:-top-1 -right-0.5 sm:-right-1 bg-red-500 text-white text-xs rounded-full min-w-[14px] sm:min-w-[16px] h-[14px] sm:h-[16px] flex items-center justify-center font-medium shadow-soft">
                  {unreadNotificationCount > 99 ? '99+' : unreadNotificationCount}
                </span>
              )}
            </button>

            {/* Messages */}
            <button className="p-1.5 sm:p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200">
              <MessageSquare size={16} />
            </button>
            
            {/* Profile */}
            <button 
              onClick={onProfileClick}
              className="p-1.5 sm:p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200"
            >
              <User size={16} />
            </button>
          </div>
        </div>

        {/* Create Dropdown Menu - Mobile */}
        {isCreateDropdownOpen && (
          <div className="lg:hidden absolute top-full left-4 right-4 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
            {createOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleCreateOption(option)}
                className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-100 last:border-b-0"
              >
                <option.icon size={16} className={option.color} />
                <div>
                  <span className="font-medium text-gray-900 text-sm">{option.label}</span>
                  <p className="text-xs text-gray-600">{option.description}</p>
                </div>
              </button>
            ))}
          </div>
        )}

      </div>

      {/* Desktop Top Navigation */}
      <div className="hidden lg:block fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-30 px-6 py-4 h-20 shadow-soft">
        <div className="flex items-center justify-between">
          {/* Left side - Logo */}
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center shadow-soft">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-gray-900 font-bold text-xl tracking-tight">Purchasync</span>
            </div>
          </div>

          {/* Center - Universal Search */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative w-80">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:bg-white focus:border-primary-300 focus:ring-2 focus:ring-primary-100 transition-all duration-200 text-sm shadow-soft"
              />
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-3">
            {/* Create Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCreateDropdownOpen(!isCreateDropdownOpen)}
                className="flex items-center space-x-2 px-4 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all duration-200 font-medium text-sm shadow-soft hover:shadow-medium"
              >
                <Plus size={16} />
                <span>Create</span>
                <ChevronDown size={16} className={`transform transition-transform ${isCreateDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Create Dropdown Menu */}
              {isCreateDropdownOpen && (
                <div className="hidden lg:block absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-large border border-gray-100 overflow-hidden z-50">
                  {createOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleCreateOption(option)}
                      className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-50 last:border-b-0"
                    >
                      <option.icon size={16} className={option.color} />
                      <div>
                        <span className="font-medium text-gray-900 text-sm">{option.label}</span>
                        <p className="text-xs text-gray-600">{option.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Marketplace */}
            <button className="px-4 py-2.5 bg-gray-100 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 text-sm font-medium shadow-soft" title="Marketplace">
              Marketplace
            </button>

            {/* Notifications */}
            <button
              onClick={onNotificationClick}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200"
              title="Notifications"
            >
              <Bell size={18} />
              {unreadNotificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[16px] h-[16px] flex items-center justify-center font-medium shadow-soft">
                  {unreadNotificationCount > 99 ? '99+' : unreadNotificationCount}
                </span>
              )}
            </button>

            {/* Messages */}
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200" title="Messages">
              <MessageSquare size={18} />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200"
              >
                <div className="w-7 h-7 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center shadow-soft">
                  <span className="text-white font-medium text-xs">JB</span>
                </div>
                <ChevronDown size={16} className={`transform transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className="hidden lg:block absolute top-full right-0 mt-2 w-44 bg-white rounded-2xl shadow-large border border-gray-100 overflow-hidden z-50">
                  <div className="p-3 border-b border-gray-100">
                    <div className="font-medium text-gray-900 text-sm">John Buyer</div>
                    <div className="text-xs text-gray-600">Procurement Manager</div>
                  </div>
                  {profileOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleProfileOption(option)}
                      className="w-full flex items-center space-x-3 px-3 py-2.5 hover:bg-gray-50 transition-colors text-left"
                    >
                      <option.icon size={16} className="text-gray-600" />
                      <span className="font-medium text-gray-900 text-sm">{option.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Click outside handlers */}
      {(isCreateDropdownOpen || isProfileDropdownOpen) && (
        <div 
          className="fixed inset-0 z-40 lg:z-40" 
          onClick={() => {
            setIsCreateDropdownOpen(false);
            setIsProfileDropdownOpen(false);
          }}
        />
      )}
    </>
  );
};

export default TopNavigation;