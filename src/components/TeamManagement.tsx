import React, { useState } from 'react';
import { Users, Plus, Search, Filter, Edit, Trash2, UserPlus, Check } from 'lucide-react';
import AddTeamMemberForm from './AddTeamMemberForm';
import EditTeamMemberForm from './EditTeamMemberForm';

interface TeamMember {
  id: string;
  fullName: string;
  email: string;
  department: string;
  role: 'Procurement Manager' | 'Buyer' | 'Sub-Buyer' | 'Approver' | 'Collaborator';
  status: 'Active' | 'Inactive';
  joinedDate: string;
}

interface TeamManagementProps {
  sidebarCollapsed: boolean;
}

const TeamManagement: React.FC<TeamManagementProps> = ({ sidebarCollapsed }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isEditMemberOpen, setIsEditMemberOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [filters, setFilters] = useState({
    department: '',
    role: '',
    status: ''
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      fullName: 'John Buyer',
      email: 'john.buyer@company.com',
      department: 'Procurement',
      role: 'Procurement Manager',
      status: 'Active',
      joinedDate: '2024-01-01'
    },
    {
      id: '2',
      fullName: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      department: 'Procurement',
      role: 'Buyer',
      status: 'Active',
      joinedDate: '2024-01-15'
    },
    {
      id: '3',
      fullName: 'Mike Davis',
      email: 'mike.davis@company.com',
      department: 'Finance',
      role: 'Approver',
      status: 'Active',
      joinedDate: '2024-01-10'
    },
    {
      id: '4',
      fullName: 'Lisa Wilson',
      email: 'lisa.wilson@company.com',
      department: 'Operations',
      role: 'Sub-Buyer',
      status: 'Active',
      joinedDate: '2024-01-20'
    },
    {
      id: '5',
      fullName: 'David Brown',
      email: 'david.brown@company.com',
      department: 'IT',
      role: 'Collaborator',
      status: 'Inactive',
      joinedDate: '2024-01-05'
    },
    {
      id: '6',
      fullName: 'Emma Martinez',
      email: 'emma.martinez@company.com',
      department: 'Procurement',
      role: 'Buyer',
      status: 'Active',
      joinedDate: '2024-01-25'
    }
  ]);

  const departments = ['Procurement', 'Finance', 'Operations', 'IT', 'HR'];
  const roles = ['Procurement Manager', 'Buyer', 'Sub-Buyer', 'Approver', 'Collaborator'];

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = !filters.department || member.department === filters.department;
    const matchesRole = !filters.role || member.role === filters.role;
    const matchesStatus = !filters.status || member.status === filters.status;

    return matchesSearch && matchesDepartment && matchesRole && matchesStatus;
  });

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      'Procurement Manager': { color: 'bg-purple-100 text-purple-800', label: 'Manager' },
      'Buyer': { color: 'bg-blue-100 text-blue-800', label: 'Buyer' },
      'Sub-Buyer': { color: 'bg-indigo-100 text-indigo-800', label: 'Sub-Buyer' },
      'Approver': { color: 'bg-green-100 text-green-800', label: 'Approver' },
      'Collaborator': { color: 'bg-gray-100 text-gray-800', label: 'Collaborator' }
    };

    const config = roleConfig[role as keyof typeof roleConfig];
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
        status === 'Active' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-gray-100 text-gray-800'
      }`}>
        <div className={`w-2 h-2 rounded-full mr-1 ${
          status === 'Active' ? 'bg-green-600' : 'bg-gray-400'
        }`} />
        {status}
      </span>
    );
  };

  const handleAddMember = (memberData: Omit<TeamMember, 'id' | 'joinedDate'>) => {
    const newMember: TeamMember = {
      ...memberData,
      id: Date.now().toString(),
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setTeamMembers(prev => [...prev, newMember]);
    setIsAddMemberOpen(false);
    showSuccess(`Invitation sent to ${memberData.fullName}!`);
  };

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member);
    setIsEditMemberOpen(true);
  };

  const handleUpdateMember = (updatedMember: TeamMember) => {
    setTeamMembers(prev => prev.map(member => 
      member.id === updatedMember.id ? updatedMember : member
    ));
    setIsEditMemberOpen(false);
    setEditingMember(null);
    showSuccess('Team member updated successfully!');
  };

  const handleRemoveMember = (id: string) => {
    const member = teamMembers.find(m => m.id === id);
    setTeamMembers(prev => prev.filter(member => member.id !== id));
    showSuccess(`${member?.fullName} removed from team`);
  };

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const clearFilters = () => {
    setFilters({ department: '', role: '', status: '' });
  };

  const hasActiveFilters = Object.values(filters).some(filter => filter !== '');

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
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <Users className="text-blue-600" size={28} />
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">Team Management</h1>
            </div>
            <p className="text-gray-600 font-medium">Manage team members and roles</p>
          </div>
          <button 
            onClick={() => setIsAddMemberOpen(true)}
            className="hidden lg:flex items-center px-4 py-2.5 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-xl hover:from-primary-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-soft hover:shadow-medium"
          >
            <UserPlus size={16} className="mr-2" />
            <span>Add Member</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6 shadow-soft hover:shadow-medium transition-all duration-300">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-soft"
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-soft"
          >
            <Filter size={16} className="mr-2" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="ml-2 w-2 h-2 bg-blue-600 rounded-full"></span>
            )}
          </button>
        </div>

        {/* Filter Panel */}
        {isFilterOpen && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Department Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select
                  value={filters.department}
                  onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              {/* Role Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={filters.role}
                  onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="">All Roles</option>
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <div className="mt-4">
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Team Members List */}
      <div className="space-y-4">
        {/* Mobile: Card Layout */}
        <div className="lg:hidden">
          {filteredMembers.map((member) => (
            <div key={member.id} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{member.fullName}</h3>
                  <p className="text-sm text-gray-600 mb-2">{member.email}</p>
                  <div className="flex items-center space-x-2 mb-2">
                    {getRoleBadge(member.role)}
                    {getStatusBadge(member.status)}
                  </div>
                  <p className="text-sm text-gray-600">{member.department}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="text-sm text-gray-600">
                  Joined {new Date(member.joinedDate).toLocaleDateString()}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditMember(member)}
                    className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleRemoveMember(member.id)}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Table Layout */}
        <div className="hidden lg:block bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Team Member</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Department</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Role</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Joined</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{member.fullName}</h3>
                        <p className="text-sm text-gray-600">{member.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-gray-900">{member.department}</p>
                    </td>
                    <td className="py-4 px-4">
                      {getRoleBadge(member.role)}
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(member.status)}
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-gray-900">{new Date(member.joinedDate).toLocaleDateString()}</p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleEditMember(member)}
                          className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleRemoveMember(member.id)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {filteredMembers.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
            <Users size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No team members found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || hasActiveFilters 
                ? 'Try adjusting your search or filters'
                : 'Start by adding your first team member'
              }
            </p>
            <button 
              onClick={() => setIsAddMemberOpen(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <UserPlus size={16} className="mr-2" />
              Add Team Member
            </button>
          </div>
        )}
      </div>

      {/* Floating Add Button (Mobile) */}
      <button 
        onClick={() => setIsAddMemberOpen(true)}
        className="lg:hidden fixed bottom-20 right-4 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center z-40"
      >
        <UserPlus size={24} />
      </button>

      {/* Add Team Member Form */}
      <AddTeamMemberForm
        isOpen={isAddMemberOpen}
        onClose={() => setIsAddMemberOpen(false)}
        onSave={handleAddMember}
      />

      {/* Edit Team Member Form */}
      <EditTeamMemberForm
        isOpen={isEditMemberOpen}
        onClose={() => {
          setIsEditMemberOpen(false);
          setEditingMember(null);
        }}
        onSave={handleUpdateMember}
        member={editingMember}
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


export default TeamManagement;