import React, { useState } from 'react';
import { Settings, Bell, Globe, Palette, Shield, Save, Check } from 'lucide-react';

interface PreferencesPageProps {
  sidebarCollapsed: boolean;
}

const PreferencesPage: React.FC<PreferencesPageProps> = ({ sidebarCollapsed }) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [preferences, setPreferences] = useState({
    notifications: {
      email: true,
      push: true,
      rfqUpdates: true,
      supplierMessages: true,
      approvalRequests: true
    },
    language: 'en',
    timezone: 'America/New_York',
    theme: 'light',
    currency: 'USD'
  });

  const handleSave = () => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  return (
    <main className={`
      transition-all duration-300 ease-in-out
      ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}
      pt-20 lg:pt-28 px-4 lg:px-8 pb-8 min-h-screen bg-gray-25
    `}>
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-2xl shadow-large flex items-center space-x-2 animate-slide-in">
          <Check size={20} />
          <span className="font-medium">Preferences saved successfully!</span>
        </div>
      )}

      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <div className="flex items-center space-x-3 mb-3">
          <Settings className="text-blue-600" size={28} />
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">Preferences</h1>
        </div>
        <p className="text-gray-600 font-medium">Customize your application settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-soft hover:shadow-medium transition-all duration-300">
          <div className="flex items-center space-x-3 mb-6">
            <Bell className="text-orange-600" size={24} />
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">Notifications</h2>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">Email Notifications</span>
              <input
                type="checkbox"
                checked={preferences.notifications.email}
                onChange={(e) => setPreferences(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, email: e.target.checked }
                }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </label>
            
            <label className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">Push Notifications</span>
              <input
                type="checkbox"
                checked={preferences.notifications.push}
                onChange={(e) => setPreferences(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, push: e.target.checked }
                }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">RFQ Updates</span>
              <input
                type="checkbox"
                checked={preferences.notifications.rfqUpdates}
                onChange={(e) => setPreferences(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, rfqUpdates: e.target.checked }
                }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">Supplier Messages</span>
              <input
                type="checkbox"
                checked={preferences.notifications.supplierMessages}
                onChange={(e) => setPreferences(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, supplierMessages: e.target.checked }
                }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">Approval Requests</span>
              <input
                type="checkbox"
                checked={preferences.notifications.approvalRequests}
                onChange={(e) => setPreferences(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, approvalRequests: e.target.checked }
                }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </label>
          </div>
        </div>

        {/* Regional Settings */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-soft hover:shadow-medium transition-all duration-300">
          <div className="flex items-center space-x-3 mb-6">
            <Globe className="text-green-600" size={24} />
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">Regional Settings</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <select
                value={preferences.language}
                onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
              <select
                value={preferences.timezone}
                onChange={(e) => setPreferences(prev => ({ ...prev, timezone: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
              <select
                value={preferences.currency}
                onChange={(e) => setPreferences(prev => ({ ...prev, currency: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="USD">US Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
                <option value="GBP">British Pound (GBP)</option>
                <option value="CAD">Canadian Dollar (CAD)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-soft hover:shadow-medium transition-all duration-300">
          <div className="flex items-center space-x-3 mb-6">
            <Palette className="text-purple-600" size={24} />
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">Appearance</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Theme</label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="theme"
                    value="light"
                    checked={preferences.theme === 'light'}
                    onChange={(e) => setPreferences(prev => ({ ...prev, theme: e.target.value }))}
                    className="text-purple-600 focus:ring-purple-500"
                  />
                  <span className="font-medium text-gray-900">Light</span>
                </label>
                <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="theme"
                    value="dark"
                    checked={preferences.theme === 'dark'}
                    onChange={(e) => setPreferences(prev => ({ ...prev, theme: e.target.value }))}
                    className="text-purple-600 focus:ring-purple-500"
                  />
                  <span className="font-medium text-gray-900">Dark</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-soft hover:shadow-medium transition-all duration-300">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="text-red-600" size={24} />
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">Security</h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Shield size={16} className="text-green-600" />
                <span className="font-medium text-green-900">Two-Factor Authentication</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Enabled</span>
              </div>
              <p className="text-sm text-green-700">Your account is protected with 2FA</p>
            </div>

            <button className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-soft hover:shadow-medium"
        >
          <Save size={16} className="mr-2" />
          Save Preferences
        </button>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </main>
  );
};

export default PreferencesPage;