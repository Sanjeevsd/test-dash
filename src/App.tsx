import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopNavigation from './components/TopNavigation';
import NotificationCenter from './components/NotificationCenter';

// Import all page components
import Dashboard from './components/Dashboard';
import RFQList from './components/RFQList';
import RFQTemplates from './components/RFQTemplates';
import QuotationManagement from './components/QuotationManagement';
import RFQApprovals from './components/RFQApprovals';
import SupplierManagement from './components/SupplierManagement';
import TeamManagement from './components/TeamManagement';
import MyJobs from './components/MyJobs';
import InvitedTasks from './components/InvitedTasks';
import SamplesManagement from './components/SamplesManagement';
import Inbox from './components/Inbox';
import MessagesInterface from './components/MessagesInterface';
import NotificationsInterface from './components/NotificationsInterface';
import MyBusiness from './components/MyBusiness';
import ProfileManagement from './components/ProfileManagement';
import PreferencesPage from './components/PreferencesPage';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);
  const unreadNotificationCount = 5;

  const handleViewChange = (view: string) => {
    setActiveView(view);
  };

  const handleNotificationClick = () => {
    setIsNotificationCenterOpen(true);
  };

  const handleProfileClick = () => {
    setActiveView('profile');
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard sidebarCollapsed={sidebarCollapsed} />;
      case 'rfq-list':
        return <RFQList sidebarCollapsed={sidebarCollapsed} />;
      case 'rfq-templates':
        return <RFQTemplates sidebarCollapsed={sidebarCollapsed} />;
      case 'quotations':
        return <QuotationManagement sidebarCollapsed={sidebarCollapsed} />;
      case 'approvals':
        return <RFQApprovals sidebarCollapsed={sidebarCollapsed} />;
      case 'suppliers':
        return <SupplierManagement sidebarCollapsed={sidebarCollapsed} />;
      case 'team':
        return <TeamManagement sidebarCollapsed={sidebarCollapsed} />;
      case 'my-jobs':
        return <MyJobs sidebarCollapsed={sidebarCollapsed} />;
      case 'invited-tasks':
        return <InvitedTasks sidebarCollapsed={sidebarCollapsed} />;
      case 'samples':
        return <SamplesManagement sidebarCollapsed={sidebarCollapsed} />;
      case 'inbox':
        return <Inbox sidebarCollapsed={sidebarCollapsed} />;
      case 'messages':
        return <MessagesInterface sidebarCollapsed={sidebarCollapsed} />;
      case 'notifications':
        return <NotificationsInterface sidebarCollapsed={sidebarCollapsed} />;
      case 'my-business':
        return <MyBusiness sidebarCollapsed={sidebarCollapsed} activeView={activeView} />;
      case 'profile':
        return <ProfileManagement sidebarCollapsed={sidebarCollapsed} />;
      case 'preferences':
        return <PreferencesPage sidebarCollapsed={sidebarCollapsed} />;
      default:
        return <Dashboard sidebarCollapsed={sidebarCollapsed} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-25">
      {/* Top Navigation */}
      <TopNavigation 
        onNotificationClick={handleNotificationClick}
        unreadNotificationCount={unreadNotificationCount}
        onProfileClick={handleProfileClick}
      />

      {/* Sidebar */}
      <Sidebar 
        activeView={activeView}
        onViewChange={handleViewChange}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      {renderActiveView()}

      {/* Notification Center */}
      <NotificationCenter
        isOpen={isNotificationCenterOpen}
        onClose={() => setIsNotificationCenterOpen(false)}
        unreadCount={unreadNotificationCount}
      />
    </div>
  );
};

export default App;