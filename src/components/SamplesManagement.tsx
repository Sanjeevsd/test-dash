import React, { useState } from 'react';
import { Package, Plus, Search, Filter, Calendar, Eye, Download, MoreHorizontal, MapPin, Building } from 'lucide-react';

interface Sample {
  id: string;
  productName: string;
  supplierName: string;
  category: string;
  requestDate: string;
  status: 'Requested' | 'Received' | 'Testing' | 'Approved' | 'Rejected';
  location: string;
  notes: string;
}

interface SamplesManagementProps {
  sidebarCollapsed: boolean;
}

const SamplesManagement: React.FC<SamplesManagementProps> = ({ sidebarCollapsed }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const samples: Sample[] = [
    {
      id: '1',
      productName: 'Executive Office Chair',
      supplierName: 'TechCorp Industries',
      category: 'Office Furniture',
      requestDate: '2024-01-15',
      status: 'Received',
      location: 'Warehouse A',
      notes: 'Ergonomic design with lumbar support'
    },
    {
      id: '2',
      productName: 'LED Monitor 27"',
      supplierName: 'Global Supply Co.',
      category: 'IT Equipment',
      requestDate: '2024-01-12',
      status: 'Testing',
      location: 'IT Lab',
      notes: '4K resolution, USB-C connectivity'
    },
    {
      id: '3',
      productName: 'Coffee Machine',
      supplierName: 'Innovation Partners',
      category: 'Kitchen Equipment',
      requestDate: '2024-01-10',
      status: 'Approved',
      location: 'Office Kitchen',
      notes: 'Automatic espresso machine with milk frother'
    },
    {
      id: '4',
      productName: 'Security Camera',
      supplierName: 'Quality Components',
      category: 'Security Equipment',
      requestDate: '2024-01-08',
      status: 'Requested',
      location: 'Pending',
      notes: 'IP camera with night vision capability'
    },
    {
      id: '5',
      productName: 'Standing Desk',
      supplierName: 'Design Masters',
      category: 'Office Furniture',
      requestDate: '2024-01-05',
      status: 'Rejected',
      location: 'Returned',
      notes: 'Height adjustment mechanism was faulty'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Requested': return 'bg-blue-100 text-blue-700';
      case 'Received': return 'bg-green-100 text-green-700';
      case 'Testing': return 'bg-yellow-100 text-yellow-700';
      case 'Approved': return 'bg-emerald-100 text-emerald-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredSamples = samples.filter(sample => {
    const matchesSearch = sample.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sample.supplierName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || sample.status.toLowerCase() === selectedFilter;
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
          <h1 className="text-lg font-semibold text-gray-900 mb-1">Samples</h1>
          <p className="text-xs text-gray-500">Track and manage product samples</p>
        </div>
        
        <div className="flex items-center space-x-2 mt-3 lg:mt-0">
          <button className="flex items-center px-3 py-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-xs font-medium">
            <Plus size={12} className="mr-1" />
            Request Sample
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
              placeholder="Search samples..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-500 focus:border-transparent text-xs"
            />
          </div>
          
          <div className="flex space-x-2">
            {['all', 'requested', 'received', 'testing', 'approved', 'rejected'].map((filter) => (
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

      {/* Samples List */}
      <div className="space-y-2">
        {filteredSamples.map((sample) => (
          <div key={sample.id} className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-sm transition-all duration-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-medium text-gray-900 text-xs">{sample.productName}</h3>
                  <span className={`px-1.5 py-0.5 text-xs font-medium rounded-full ${getStatusColor(sample.status)}`}>
                    {sample.status}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-2">{sample.notes}</p>
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Building size={10} />
                    <span>{sample.supplierName}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar size={10} />
                    <span>{new Date(sample.requestDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin size={10} />
                    <span>{sample.location}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span>{sample.category}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
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
      {filteredSamples.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <Package size={32} className="mx-auto text-gray-300 mb-3" />
          <h3 className="text-sm font-medium text-gray-900 mb-1">No samples found</h3>
          <p className="text-xs text-gray-600">
            {searchQuery ? 'Try adjusting your search' : 'Request your first sample to get started'}
          </p>
        </div>
      )}
    </main>
  );
};

export default SamplesManagement;