import React from 'react';
import { 
  Home, 
  FileText, 
  Package, 
  Users, 
  CheckSquare, 
  MessageSquare, 
  Bell, 
  Settings, 
  Building, 
  User,
  ChevronLeft,
  ChevronRight,
  Mail,
  UserCheck,
  Shield,
  Inbox,
  Calendar,
  TrendingUp,
  Award,
  FolderOpen
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeView, 
  onViewChange, 
  collapsed, 
  onToggleCollapse 
}) => {
  const navigationItems = [
    {
      section: 'Main',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: Home, description: 'Overview and metrics' },
      ]
    },
    {
      section: 'RFQ Management',
      items: [
        { id: 'rfq-list', label: 'RFQ List', icon: FileText, description: 'Manage RFQs' },
        { id: 'rfq-templates', label: 'RFQ Templates', icon: FolderOpen, description: 'Template library' },
        { id: 'quotations', label: 'Quotations', icon: TrendingUp, description: 'Manage quotes' },
        { id: 'approvals', label: 'Approvals', icon: Shield, description: 'Approval workflow' },
      ]
    },
    {
      section: 'Suppliers',
      items: [
        { id: 'suppliers', label: 'Suppliers', icon: Building, description: 'Supplier database' },
        { id: 'samples', label: 'Samples', icon: Package, description: 'Product samples' },
      ]
    },
    {
      section: 'Tasks & Team',
      items: [
        { id: 'my-jobs', label: 'My Tasks', icon: CheckSquare, description: 'Personal tasks' },
        { id: 'invited-tasks', label: 'Invited Tasks', icon: UserCheck, description: 'Task invitations' },
        { id: 'team', label: 'Team', icon: Users, description: 'Team management' },
      ]
    },
    {
      section: 'Communication',
      items: [
        { id: 'inbox', label: 'Inbox', icon: Inbox, description: 'Email & WhatsApp' },
        { id: 'messages', label: 'Messages', icon: MessageSquare, description: 'Team chat' },
        { id: 'notifications', label: 'Notifications', icon: Bell, description: 'System alerts' },
      ]
    },
    {
      section: 'Settings',
      items: [
        { id: 'my-business', label: 'My Company', icon: Building, description: 'Company details' },
        { id: 'profile', label: 'Profile', icon: User, description: 'Personal info' },
        { id: 'preferences', label: 'Preferences', icon: Settings, description: 'App settings' },
      ]
    }
  ];

  const handleItemClick = (itemId: string) => {
    onViewChange(itemId);
  };

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      <div className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
        !collapsed ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`} onClick={onToggleCollapse} />

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white z-50 
        transition-all duration-300 ease-in-out shadow-2xl
        ${collapsed ? 'w-16' : 'w-64'}
        ${collapsed ? 'lg:w-16' : 'lg:w-60'}
        ${!collapsed ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-white font-bold text-lg tracking-tight">Purchasync</span>
            </div>
          )}
          
          <button
            onClick={onToggleCollapse}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          <nav className="space-y-6">
            {navigationItems.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                {!collapsed && (
                  <div className="px-4 mb-3">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {section.section}
                    </h3>
                  </div>
                )}
                
                <div className="space-y-1 px-2">
                  {section.items.map((item) => {
                    const IconComponent = item.icon;
                    const isActive = activeView === item.id;
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleItemClick(item.id)}
                        className={`
                          w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200
                          ${isActive 
                            ? 'bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-lg transform scale-105' 
                            : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                          }
                          ${collapsed ? 'justify-center' : 'justify-start'}
                        `}
                        title={collapsed ? item.label : undefined}
                      >
                        <IconComponent 
                          size={20} 
                          className={`flex-shrink-0 ${isActive ? 'text-white' : ''}`} 
                        />
                        {!collapsed && (
                          <div className="flex-1 text-left">
                            <span className="font-medium text-sm">{item.label}</span>
                            {!isActive && (
                              <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
                            )}
                          </div>
                        )}
                        {!collapsed && isActive && (
                          <div className="w-2 h-2 bg-white rounded-full opacity-80"></div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-700 p-4">
          {!collapsed ? (
            <div className="text-center">
              <div className="text-xs text-gray-400 mb-1">Purchasync v2.1.0</div>
              <div className="text-xs text-gray-500">© 2024 All rights reserved</div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Toggle Button */}
      <button
        onClick={onToggleCollapse}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-lg shadow-lg"
      >
        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>
    </>
  );
};

export default Sidebar;