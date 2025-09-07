import React, { useState } from 'react';
import { CheckSquare, Plus, Search, Filter, Calendar, Clock, User, MoreHorizontal, Check, X } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'To Do' | 'In Progress' | 'Review' | 'Done';
  assignee: string;
  dueDate: string;
  category: string;
}

interface MyJobsProps {
  sidebarCollapsed: boolean;
}

const MyJobs: React.FC<MyJobsProps> = ({ sidebarCollapsed }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const tasks: Task[] = [
    {
      id: '1',
      title: 'Review supplier quotations for office equipment',
      description: 'Compare and analyze 5 quotations received for office furniture procurement',
      priority: 'High',
      status: 'To Do',
      assignee: 'John Buyer',
      dueDate: '2024-01-20',
      category: 'RFQ Review'
    },
    {
      id: '2',
      title: 'Approve IT services contract',
      description: 'Final approval needed for annual IT support contract with Global Supply Co.',
      priority: 'High',
      status: 'In Progress',
      assignee: 'John Buyer',
      dueDate: '2024-01-18',
      category: 'Approval'
    },
    {
      id: '3',
      title: 'Update supplier database',
      description: 'Add new suppliers from marketplace search to active supplier list',
      priority: 'Medium',
      status: 'To Do',
      assignee: 'John Buyer',
      dueDate: '2024-01-22',
      category: 'Data Management'
    },
    {
      id: '4',
      title: 'Prepare Q2 procurement plan',
      description: 'Draft procurement strategy and budget allocation for Q2 operations',
      priority: 'Medium',
      status: 'Review',
      assignee: 'John Buyer',
      dueDate: '2024-01-25',
      category: 'Planning'
    },
    {
      id: '5',
      title: 'Negotiate with TechCorp Industries',
      description: 'Follow up on pricing negotiations for manufacturing materials',
      priority: 'Low',
      status: 'To Do',
      assignee: 'John Buyer',
      dueDate: '2024-01-30',
      category: 'Negotiation'
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
      case 'To Do': return 'bg-gray-100 text-gray-700';
      case 'In Progress': return 'bg-blue-100 text-blue-700';
      case 'Review': return 'bg-purple-100 text-purple-700';
      case 'Done': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || task.status.toLowerCase().replace(' ', '-') === selectedFilter;
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
          <h1 className="text-lg font-semibold text-gray-900 mb-1">My Tasks</h1>
          <p className="text-xs text-gray-500">Manage your procurement tasks and to-dos</p>
        </div>
        
        <div className="flex items-center space-x-2 mt-3 lg:mt-0">
          <button className="flex items-center px-3 py-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-xs font-medium">
            <Plus size={12} className="mr-1" />
            Add Task
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-3 mb-4">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-3 lg:space-y-0 lg:space-x-3">
          <div className="flex-1 relative">
            <Search size={14} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-500 focus:border-transparent text-xs"
            />
          </div>
          
          <div className="flex space-x-2">
            {['all', 'to-do', 'in-progress', 'review', 'done'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedFilter === filter
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tasks List */}
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
                </div>
                <p className="text-xs text-gray-600 mb-2">{task.description}</p>
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar size={10} />
                    <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User size={10} />
                    <span>{task.assignee}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span>{task.category}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
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
          <CheckSquare size={32} className="mx-auto text-gray-300 mb-3" />
          <h3 className="text-sm font-medium text-gray-900 mb-1">No tasks found</h3>
          <p className="text-xs text-gray-600">
            {searchQuery ? 'Try adjusting your search' : 'All caught up! No tasks to show.'}
          </p>
        </div>
      )}
    </main>
  );
};

export default MyJobs;