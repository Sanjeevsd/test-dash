import React, { useState } from 'react';
import { FileText, Plus, Search, Filter, Calendar, Eye, Edit, MoreHorizontal, Clock, CheckCircle } from 'lucide-react';

interface RFQ {
  id: string;
  rfqNumber: string;
  title: string;
  category: string;
  status: 'Draft' | 'Published' | 'Closed' | 'Cancelled';
  deadline: string;
  suppliersInvited: number;
  quotationsReceived: number;
  createdDate: string;
  estimatedValue: string;
}

interface RFQListProps {
  sidebarCollapsed: boolean;
}

const RFQList: React.FC<RFQListProps> = ({ sidebarCollapsed }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const rfqs: RFQ[] = [
    {
      id: '1',
      rfqNumber: 'RFQ-2024-001',
      title: 'Office Equipment Procurement',
      category: 'Office Supplies',
      status: 'Published',
      deadline: '2024-01-30',
      suppliersInvited: 5,
      quotationsReceived: 3,
      createdDate: '2024-01-10',
      estimatedValue: '$45,000'
    },
    {
      id: '2',
      rfqNumber: 'RFQ-2024-002',
      title: 'IT Services Annual Contract',
      category: 'Technology',
      status: 'Published',
      deadline: '2024-01-28',
      suppliersInvited: 8,
      quotationsReceived: 6,
      createdDate: '2024-01-08',
      estimatedValue: '$120,000'
    },
    {
      id: '3',
      rfqNumber: 'RFQ-2024-003',
      title: 'Marketing Campaign Development',
      category: 'Services',
      status: 'Closed',
      deadline: '2024-01-25',
      suppliersInvited: 4,
      quotationsReceived: 4,
      createdDate: '2024-01-05',
      estimatedValue: '$32,000'
    },
    {
      id: '4',
      rfqNumber: 'RFQ-2024-004',
      title: 'Manufacturing Materials Q2',
      category: 'Manufacturing',
      status: 'Draft',
      deadline: '2024-02-15',
      suppliersInvited: 0,
      quotationsReceived: 0,
      createdDate: '2024-01-12',
      estimatedValue: '$250,000'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft': return 'bg-gray-100 text-gray-700';
      case 'Published': return 'bg-blue-100 text-blue-700';
      case 'Closed': return 'bg-green-100 text-green-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredRFQs = rfqs.filter(rfq => {
    const matchesSearch = rfq.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         rfq.rfqNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || rfq.status.toLowerCase() === selectedFilter;
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
          <h1 className="text-lg font-semibold text-gray-900 mb-1">RFQ List</h1>
          <p className="text-xs text-gray-500">Manage your request for quotations</p>
        </div>
        
        <div className="flex items-center space-x-2 mt-3 lg:mt-0">
          <button className="flex items-center px-3 py-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-xs font-medium">
            <Plus size={12} className="mr-1" />
            Create RFQ
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
              placeholder="Search RFQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-500 focus:border-transparent text-xs"
            />
          </div>
          
          <div className="flex space-x-2">
            {['all', 'draft', 'published', 'closed', 'cancelled'].map((filter) => (
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

      {/* RFQ List */}
      <div className="space-y-2">
        {filteredRFQs.map((rfq) => (
          <div key={rfq.id} className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-sm transition-all duration-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full font-medium">
                    {rfq.rfqNumber}
                  </span>
                  <h3 className="font-medium text-gray-900 text-xs">{rfq.title}</h3>
                  <span className={`px-1.5 py-0.5 text-xs font-medium rounded-full ${getStatusColor(rfq.status)}`}>
                    {rfq.status}
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-gray-500 mb-2">
                  <div className="flex items-center space-x-1">
                    <Calendar size={10} />
                    <span>Deadline: {new Date(rfq.deadline).toLocaleDateString()}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span>{rfq.category}</span>
                  <span className="text-gray-400">•</span>
                  <span className="font-medium text-gray-700">{rfq.estimatedValue}</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                  <span>{rfq.suppliersInvited} suppliers invited</span>
                  <span className="text-gray-400">•</span>
                  <span>{rfq.quotationsReceived} quotations received</span>
                  <span className="text-gray-400">•</span>
                  <span>Created {new Date(rfq.createdDate).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 text-blue-600 hover:text-blue-700 rounded">
                  <Eye size={12} />
                </button>
                <button className="p-1 text-gray-600 hover:text-gray-700 rounded">
                  <Edit size={12} />
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
      {filteredRFQs.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <FileText size={32} className="mx-auto text-gray-300 mb-3" />
          <h3 className="text-sm font-medium text-gray-900 mb-1">No RFQs found</h3>
          <p className="text-xs text-gray-600">
            {searchQuery ? 'Try adjusting your search' : 'Create your first RFQ to get started'}
          </p>
        </div>
      )}
    </main>
  );
};

export default RFQList;