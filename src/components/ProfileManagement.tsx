import React, { useState } from 'react';
import { User, Phone, Mail, Lock, Eye, EyeOff, Camera, Save, Shield, Check, X } from 'lucide-react';
import ProfileEditForm from './ProfileEditForm';
import PasswordResetForm from './PasswordResetForm';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  profilePicture?: string;
}

interface ProfileManagementProps {
  sidebarCollapsed: boolean;
}

const ProfileManagement: React.FC<ProfileManagementProps> = ({ sidebarCollapsed }) => {
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isPasswordFormOpen, setIsPasswordFormOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: 'John',
    lastName: 'Buyer',
    email: 'john.buyer@techcorp.com',
    phoneNumber: '555-0123',
    countryCode: '+1',
    profilePicture: undefined
  });

  const handleSaveProfile = (updatedData: ProfileData) => {
    setProfileData(updatedData);
    setIsEditFormOpen(false);
    showSuccess('Profile updated successfully!');
  };

  const handlePasswordReset = () => {
    setIsPasswordFormOpen(false);
    showSuccess('Password updated successfully!');
  };

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
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
          <span className="font-medium">{successMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <div className="flex items-center space-x-3 mb-3">
          <User className="text-blue-600" size={28} />
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">My Profile</h1>
        </div>
        <p className="text-gray-600 font-medium">Manage your personal information and account settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-soft hover:shadow-medium transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">Personal Information</h2>
            <button
              onClick={() => setIsEditFormOpen(true)}
              className="flex items-center px-4 py-2.5 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-xl hover:from-primary-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-soft hover:shadow-medium"
            >
              <User size={16} className="mr-2" />
              <span>Edit Profile</span>
            </button>
          </div>

          {/* Profile Picture Section */}
          <div className="flex items-center space-x-6 mb-8 pb-6 border-b border-gray-100">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                {profileData.profilePicture ? (
                  <img 
                    src={profileData.profilePicture} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-white font-bold text-2xl">
                    {profileData.firstName[0]}{profileData.lastName[0]}
                  </span>
                )}
              </div>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm">
                <Camera size={14} className="text-gray-600" />
              </button>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                {profileData.firstName} {profileData.lastName}
              </h3>
              <p className="text-gray-600 font-medium">Procurement Manager</p>
              <p className="text-sm text-gray-500 mt-1">TechCorp Industries</p>
            </div>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">First Name</label>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <User size={16} className="text-gray-400" />
                <span className="text-gray-900 font-medium">{profileData.firstName}</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Last Name</label>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <User size={16} className="text-gray-400" />
                <span className="text-gray-900 font-medium">{profileData.lastName}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Email Address</label>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Mail size={16} className="text-gray-400" />
                <span className="text-gray-900 font-medium">{profileData.email}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Phone Number</label>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Phone size={16} className="text-gray-400" />
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🇺🇸</span>
                  <span className="text-gray-900 font-medium">
                    {profileData.countryCode} {profileData.phoneNumber}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-soft hover:shadow-medium transition-all duration-300">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="text-green-600" size={24} />
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">Security</h2>
          </div>

          {/* Password Section */}
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Lock size={16} className="text-green-600" />
                  <span className="font-medium text-gray-900">Password</span>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                  Secure
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Last updated 30 days ago
              </p>
              <button
                onClick={() => setIsPasswordFormOpen(true)}
                className="w-full flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium shadow-soft hover:shadow-medium"
              >
                <Lock size={16} className="mr-2" />
                Change Password
              </button>
            </div>

            {/* Security Tips */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-gray-900 mb-2">Security Tips</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Use a strong, unique password</li>
                <li>• Enable two-factor authentication</li>
                <li>• Review login activity regularly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Edit Form */}
      <ProfileEditForm
        isOpen={isEditFormOpen}
        onClose={() => setIsEditFormOpen(false)}
        onSave={handleSaveProfile}
        initialData={profileData}
      />

      {/* Password Reset Form */}
      <PasswordResetForm
        isOpen={isPasswordFormOpen}
        onClose={() => setIsPasswordFormOpen(false)}
        onSave={handlePasswordReset}
      />

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

export default ProfileManagement;