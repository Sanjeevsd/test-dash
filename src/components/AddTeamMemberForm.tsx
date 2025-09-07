import React, { useState } from 'react';
import { X, User, Mail, Building, UserCheck, ChevronDown } from 'lucide-react';

interface TeamMember {
  id: string;
  fullName: string;
  email: string;
  department: string;
  role: 'Procurement Manager' | 'Buyer' | 'Sub-Buyer' | 'Approver' | 'Collaborator';
  status: 'Active' | 'Inactive';
  joinedDate: string;
  subTeamId?: string;
}

interface SubTeam {
  id: string;
  name: string;
  scope: {
    categories?: string[];
    locations?: string[];
  };
  memberIds: string[];
}

interface AddTeamMemberFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (member: Omit<TeamMember, 'id' | 'joinedDate'>) => void;
}

const AddTeamMemberForm: React.FC<AddTeamMemberFormProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    department: '',
    role: 'Buyer' as TeamMember['role'],
    status: 'Active' as TeamMember['status']
  });

  const [dropdowns, setDropdowns] = useState({
    department: false,
    role: false
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    department: '',
    role: ''
  });

  const departments = ['Procurement', 'Finance', 'Operations', 'IT', 'HR', 'Marketing', 'Sales'];
  const roles = [
    { value: 'Procurement Manager', label: 'Procurement Manager', description: 'Full access to manage everything' },
    { value: 'Buyer', label: 'Buyer', description: 'Can add suppliers, create RFQs, forward for approval' },
    { value: 'Sub-Buyer', label: 'Sub-Buyer', description: 'Same as Buyer but limited to sub-team scope' },
    { value: 'Approver', label: 'Approver', description: 'Approves RFQs via email links' },
    { value: 'Collaborator', label: 'Collaborator', description: 'View-only access, can message team' }
  ];

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({ fullName: '', email: '', department: '', role: '' });
    
    // Validate form
    let hasErrors = false;
    
    if (!formData.fullName.trim()) {
      setErrors(prev => ({ ...prev, fullName: 'Full name is required' }));
      hasErrors = true;
    }
    
    if (!formData.email.trim()) {
      setErrors(prev => ({ ...prev, email: 'Email is required' }));
      hasErrors = true;
    } else if (!validateEmail(formData.email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      hasErrors = true;
    }
    
    if (!formData.department) {
      setErrors(prev => ({ ...prev, department: 'Department is required' }));
      hasErrors = true;
    }
    
    if (!formData.role) {
      setErrors(prev => ({ ...prev, role: 'Role is required' }));
      hasErrors = true;
    }
    
    if (!hasErrors) {
      onSave({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        department: formData.department,
        role: formData.role,
        status: formData.status
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      fullName: '',
      email: '',
      department: '',
      role: 'Buyer',
      status: 'Active'
    });
    setErrors({ fullName: '', email: '', department: '', role: '' });
    setDropdowns({ department: false, role: false });
    onClose();
  };

  const handleDropdownToggle = (dropdown: keyof typeof dropdowns) => {
    setDropdowns(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };

  const handleDepartmentSelect = (department: string) => {
    setFormData(prev => ({ ...prev, department }));
    setDropdowns(prev => ({ ...prev, department: false }));
  };

  const handleRoleSelect = (role: TeamMember['role']) => {
    setFormData(prev => ({ ...prev, role }));
    setDropdowns(prev => ({ ...prev, role: false }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end lg:items-center justify-center">
      <div className="bg-white w-full h-full lg:h-auto lg:max-w-md lg:rounded-xl lg:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 lg:p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <User className="text-blue-600" size={24} />
            <h2 className="text-xl font-medium text-gray-900">Add Team Member</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 lg:p-6 space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.fullName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter full name"
              />
            </div>
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter email address"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department *
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => handleDropdownToggle('department')}
                className={`w-full flex items-center justify-between px-4 py-3 border rounded-lg hover:bg-gray-50 transition-colors ${
                  errors.department ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Building size={20} className="text-gray-400" />
                  <span className={formData.department ? 'text-gray-900' : 'text-gray-500'}>
                    {formData.department || 'Select department'}
                  </span>
                </div>
                <ChevronDown size={20} className={`transform transition-transform ${dropdowns.department ? 'rotate-180' : ''}`} />
              </button>

              {dropdowns.department && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                  {departments.map((department) => (
                    <button
                      key={department}
                      type="button"
                      onClick={() => handleDepartmentSelect(department)}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                        formData.department === department ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                      }`}
                    >
                      {department}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {errors.department && (
              <p className="text-red-500 text-sm mt-1">{errors.department}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role Assignment *
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => handleDropdownToggle('role')}
                className={`w-full flex items-center justify-between px-4 py-3 border rounded-lg hover:bg-gray-50 transition-colors ${
                  errors.role ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <UserCheck size={20} className="text-gray-400" />
                  <span className={formData.role ? 'text-gray-900' : 'text-gray-500'}>
                    {formData.role || 'Select role'}
                  </span>
                </div>
                <ChevronDown size={20} className={`transform transition-transform ${dropdowns.role ? 'rotate-180' : ''}`} />
              </button>

              {dropdowns.role && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-80 overflow-y-auto">
                  {roles.map((role) => (
                    <button
                      key={role.value}
                      type="button"
                      onClick={() => handleRoleSelect(role.value as TeamMember['role'])}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                        formData.role === role.value ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                      }`}
                    >
                      <div className="font-medium">{role.label}</div>
                      <div className="text-xs text-gray-500 mt-1">{role.description}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role}</p>
            )}
          </div>

          {/* Invitation Notice */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-3">
              <Mail size={16} className="text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">Invitation Email</p>
                <p className="text-xs text-blue-700 mt-1">
                  An invitation email will be sent to the member with login instructions and role details.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 pt-4 mt-8">
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Mail size={16} className="mr-2" />
                Send Invitation
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeamMemberForm;