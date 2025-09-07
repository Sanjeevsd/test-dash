import React, { useState } from 'react';
import { UserCheck, Plus, Search, Filter, Calendar, Eye, Check, X, Clock, User, Building } from 'lucide-react';

interface InvitedTask {
  id: string;
  title: string;
  description: string;
  invitedBy: string;
  inviterCompany: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'Accepted' | 'Declined';
  inviteDate: string;
  dueDate: string;
  estimatedValue?: string;
}

interface InvitedTasksProps {
  sidebarCollapsed: boolean;
}

const InvitedTasks: React.FC<InvitedTasksProps> = ({ sidebarCollapsed }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const invitedTasks: InvitedTask[] = [
    {
      id: '1',
      title: 'Supply Chain Optimization Consultation',
      description: 'Provide expertise on optimizing procurement processes for manufacturing operations',
      invitedBy: 'Jennifer Smith',
      inviterCompany: 'Manufacturing Corp',
      category: 'Consulting',
      priority: 'High',
      status: 'Pending',
      inviteDate: '2024-01-15',
      dueDate: '2024-02-15',
      estimatedValue: '$25,000'
    },
    {
      id: '2',
      title: 'Vendor Assessment for IT Equipment',
      description: 'Evaluate and recommend suppliers for enterprise IT hardware procurement',
      invitedBy: 'Robert Johnson',
      inviterCompany: 'Tech Solutions Inc',
      category: 'Assessment',
      priority: 'Medium',
      status: 'Pending',
      inviteDate: '2024-01-14',
      dueDate: '2024-01-30',
      estimatedValue: '$15,000'
    },
    {
      id: '3',
      title: 'Procurement Process Audit',
      description: 'Conduct comprehensive audit of current procurement workflows and compliance',
      invitedBy: 'Maria Garcia',
      inviterCompany: 'Global Enterprises',
      category: 'Audit',
      priority: 'Medium',
      status: 'Accepted',
      inviteDate: '2024-01-12',
      dueDate: '2024-02-28',
      estimatedValue: '$40,000'
    },
    {
      id: '4',
      title: 'Supplier Negotiation Training',
      description: 'Deliver training workshop on advanced supplier negotiation techniques',
      invitedBy: 'David Wilson',
      inviterCompany: 'Learning Solutions',
      category: 'Training',
      priority: 'Low',
      status: 'Declined',
      inviteDate: '2024-01-10',
      dueDate: '2024-01-25',
      estimatedValue: '$8,000'
    },
    {
      id: '5',
      title: 'Cost Reduction Strategy Development',
      description: 'Develop comprehensive cost reduction strategy for procurement operations',
      invitedBy: 'Susan Lee',
      inviterCompany: 'Efficiency Partners',
      category: 'Strategy',
      priority: 'High',
      status: 'Pending',
      inviteDate: '2024-01-13',
      dueDate: '2024-03-01',
      estimatedValue: '$35,000'
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-orange-100 text-orange-700';
      case 'Accepted': return 'bg-green-100 text-green-700';
      case 'Declined': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleAcceptTask = (taskId: string) => {
    console.log('Accept task:', taskId);
  };

  const handleDeclineTask = (taskId: string) => {
    console.log('Decline task:', taskId);
  };

  const filteredTasks = invitedTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.invitedBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || task.status.toLowerCase() === selectedFilter;
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
          <h1 className="text-lg font-semibold text-gray-900 mb-1">Invited Tasks</h1>
          <p className="text-xs text-gray-500">Tasks and assignments you've been invited to</p>
        </div>
        
        <div className="flex items-center space-x-2 mt-3 lg:mt-0">
          <span className="text-xs text-gray-500">
            {invitedTasks.filter(t => t.status === 'Pending').length} pending invitations
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
              placeholder="Search invitations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-500 focus:border-transparent text-xs"
            />
          </div>
          
          <div className="flex space-x-2">
            {['all', 'pending', 'accepted', 'declined'].map((filter) => (
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

      {/* Invited Tasks List */}
      <div className="space-y-2">
        {filteredTasks.map((task) => (
          <div key={task.id} className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-sm transition-all duration-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-medium text-gray-900 text-xs">{task.title}</h3>
                  <span className={`px-1.5 py-0.5 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  <span className={`px-1.5 py-0.5 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-2">{task.description}</p>
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <User size={10} />
                    <span>{task.invitedBy}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Building size={10} />
                    <span>{task.inviterCompany}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar size={10} />
                    <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                  {task.estimatedValue && (
                    <>
                      <span className="text-gray-400">•</span>
                      <span className="font-medium text-gray-700">{task.estimatedValue}</span>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {task.status === 'Pending' && (
                  <>
                    <button
                      onClick={() => handleAcceptTask(task.id)}
                      className="flex items-center px-2 py-1 bg-green-600 text-white rounded text-xs font-medium hover:bg-green-700 transition-colors"
                    >
                      <Check size={10} className="mr-1" />
                      Accept
                    </button>
                    <button
                      onClick={() => handleDeclineTask(task.id)}
                      className="flex items-center px-2 py-1 bg-red-600 text-white rounded text-xs font-medium hover:bg-red-700 transition-colors"
                    >
                      <X size={10} className="mr-1" />
                      Decline
                    </button>
                  </>
                )}
                <button className="p-1 text-blue-600 hover:text-blue-700 rounded">
                  <Eye size={12} />
                </button>
                <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                  <MoreHorizontal size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTasks.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <UserCheck size={32} className="mx-auto text-gray-300 mb-3" />
          <h3 className="text-sm font-medium text-gray-900 mb-1">No invited tasks found</h3>
          <p className="text-xs text-gray-600">
            {searchQuery ? 'Try adjusting your search' : 'No task invitations at the moment'}
          </p>
        </div>
      )}
    </main>
  );
};

export default InvitedTasks;