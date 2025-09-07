import React, { useState } from 'react';
import { Shield, Search, Filter, Clock, CheckCircle, XCircle, User, Calendar, MessageSquare, Send, Eye } from 'lucide-react';

interface ApprovalRequest {
  id: string;
  rfqNumber: string;
  rfqTitle: string;
  supplierName: string;
  quotedAmount: string;
  requestedBy: string;
  requestedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  approverName?: string;
  approverEmail?: string;
  approvedDate?: string;
  comments?: string;
  requestComments?: string;
  rfqDetails: {
    category: string;
    description: string;
    deadline: string;
  };
}

interface RFQApprovalsProps {
  sidebarCollapsed: boolean;
}

const RFQApprovals: React.FC<RFQApprovalsProps> = ({ sidebarCollapsed }) => {
  const [activeTab, setActiveTab] = useState<'ongoing' | 'closed'>('ongoing');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    status: '',
    approver: ''
  });

  const [approvalRequests, setApprovalRequests] = useState<ApprovalRequest[]>([
    {
      id: '1',
      rfqNumber: 'RFQ-2024-001',
      rfqTitle: 'Office Equipment Procurement',
      supplierName: 'TechCorp Industries',
      quotedAmount: '$45,000',
      requestedBy: 'John Buyer',
      requestedDate: '2024-01-15',
      status: 'pending',
      approverEmail: 'sarah.johnson@company.com',
      requestComments: 'This quote looks competitive and meets our requirements. Please review for approval.',
      rfqDetails: {
        category: 'Office Equipment',
        description: 'Complete office setup including desks, chairs, and computers',
        deadline: '2024-01-30'
      }
    },
    {
      id: '2',
      rfqNumber: 'RFQ-2024-002',
      rfqTitle: 'IT Services Contract',
      supplierName: 'Global Supply Co.',
      quotedAmount: '$78,500',
      requestedBy: 'John Buyer',
      requestedDate: '2024-01-14',
      status: 'approved',
      approverName: 'Sarah Johnson',
      approverEmail: 'sarah.johnson@company.com',
      approvedDate: '2024-01-16',
      comments: 'Quote looks reasonable and within budget. Approved for procurement.',
      requestComments: 'Annual IT support contract renewal. Supplier has good track record.',
      rfqDetails: {
        category: 'IT Services',
        description: 'Annual IT support and maintenance contract',
        deadline: '2024-01-28'
      }
    },
    {
      id: '3',
      rfqNumber: 'RFQ-2024-003',
      rfqTitle: 'Marketing Campaign',
      supplierName: 'Innovation Partners',
      quotedAmount: '$32,000',
      requestedBy: 'John Buyer',
      requestedDate: '2024-01-13',
      status: 'rejected',
      approverName: 'Mike Davis',
      approverEmail: 'mike.davis@company.com',
      approvedDate: '2024-01-15',
      comments: 'Quote exceeds our Q1 marketing budget allocation. Please negotiate or find alternative supplier.',
      requestComments: 'Digital marketing campaign for Q1 product launch.',
      rfqDetails: {
        category: 'Marketing',
        description: 'Q1 digital marketing campaign development',
        deadline: '2024-01-25'
      }
    },
    {
      id: '4',
      rfqNumber: 'RFQ-2024-004',
      rfqTitle: 'Manufacturing Materials',
      supplierName: 'Quality Components Inc.',
      quotedAmount: '$125,000',
      requestedBy: 'John Buyer',
      requestedDate: '2024-01-12',
      status: 'pending',
      approverEmail: 'director@company.com',
      requestComments: 'High-value procurement requiring director approval. Materials needed for Q2 production.',
      rfqDetails: {
        category: 'Manufacturing',
        description: 'Raw materials for Q2 production cycle',
        deadline: '2024-02-15'
      }
    }
  ]);

  // Filter by tab first
  const tabFilteredRequests = approvalRequests.filter(request => {
    if (activeTab === 'ongoing') {
      return request.status === 'pending';
    } else {
      return request.status === 'approved' || request.status === 'rejected';
    }
  });

  const filteredRequests = tabFilteredRequests.filter(request => {
    const matchesSearch = request.rfqTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.rfqNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.requestedBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !filters.status || request.status === filters.status;
    const matchesApprover = !filters.approver || 
                           (request.approverName && request.approverName.toLowerCase().includes(filters.approver.toLowerCase()));
    
    let matchesDateRange = true;
    if (filters.dateFrom && filters.dateTo) {
      const requestDate = new Date(request.requestedDate);
      const fromDate = new Date(filters.dateFrom);
      const toDate = new Date(filters.dateTo);
      matchesDateRange = requestDate >= fromDate && requestDate <= toDate;
    }

    return matchesSearch && matchesStatus && matchesApprover && matchesDateRange;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock, label: 'Pending' },
      approved: { color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle, label: 'Approved' },
      rejected: { color: 'bg-red-100 text-red-800 border-red-200', icon: XCircle, label: 'Rejected' }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const IconComponent = config.icon;

    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${config.color}`}>
        <IconComponent size={12} className="mr-1" />
        {config.label}
      </span>
    );
  };

  const handleResendApproval = (request: ApprovalRequest) => {
    showSuccess('Approval link resent successfully!');
  };

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const clearFilters = () => {
    setFilters({
      dateFrom: '',
      dateTo: '',
      status: '',
      approver: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(filter => filter !== '');

  // Get unique approvers for filter
  const uniqueApprovers = Array.from(new Set(
    approvalRequests
      .filter(req => req.approverName)
      .map(req => req.approverName!)
  )).sort();

  return (
    <main className={`
      transition-all duration-300 ease-in-out
      ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}
      pt-20 lg:pt-28 px-4 lg:px-8 pb-8 min-h-screen bg-gray-25
    `}>
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-2xl shadow-large flex items-center space-x-2 animate-slide-in">
          <CheckCircle size={20} />
          <span className="font-medium">{successMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <div className="flex items-center space-x-3 mb-3">
          <Shield className="text-green-600" size={28} />
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">Approvals</h1>
        </div>
        <p className="text-gray-600 font-medium">Track and manage RFQ approval requests</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl border border-gray-200 mb-6 shadow-soft hover:shadow-medium transition-all duration-300">
        <div className="flex">
          <button
            onClick={() => setActiveTab('ongoing')}
            className={`flex-1 py-4 px-6 text-center font-bold transition-all duration-200 ${
              activeTab === 'ongoing'
                ? 'text-orange-600 border-b-2 border-orange-600 bg-gradient-to-r from-orange-50 to-yellow-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <span>Ongoing</span>
              <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                {approvalRequests.filter(req => req.status === 'pending').length}
              </span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('closed')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
              activeTab === 'closed'
                ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <span>Closed</span>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                {approvalRequests.filter(req => req.status === 'approved' || req.status === 'rejected').length}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by RFQ title, supplier, or requester..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter size={16} className="mr-2" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="ml-2 w-2 h-2 bg-green-600 rounded-full"></span>
            )}
          </button>
        </div>

        {/* Filter Panel */}
        {isFilterOpen && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Date From */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Date To */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                >
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {/* Approver Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Approver</label>
                <select
                  value={filters.approver}
                  onChange={(e) => setFilters(prev => ({ ...prev, approver: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                >
                  <option value="">All Approvers</option>
                  {uniqueApprovers.map(approver => (
                    <option key={approver} value={approver}>{approver}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Approval Requests List */}
      <div className="space-y-4">
        {/* Mobile: Card Layout */}
        <div className="lg:hidden">
          {filteredRequests.map((request) => (
            <div key={request.id} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                      {request.rfqNumber}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{request.rfqTitle}</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    {getStatusBadge(request.status)}
                  </div>
                </div>
              </div>

              <div className="mb-4 text-sm">
                <div>
                  <span className="text-gray-600">RFQ Date:</span>
                  <p className="font-medium text-gray-900">{new Date(request.requestedDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-3">
                  <button className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium">
                    <Eye size={14} className="mr-1" />
                    View Details
                  </button>
                </div>
                {activeTab === 'ongoing' && request.status === 'pending' && (
                  <button
                    onClick={() => handleResendApproval(request)}
                    className="flex items-center text-orange-600 hover:text-orange-700 text-sm font-medium"
                  >
                    <Send size={14} className="mr-1" />
                    Resend
                  </button>
                )}
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
                  <th className="text-left py-3 px-4 font-medium text-gray-600">RFQ Number</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">RFQ Title</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">RFQ Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 text-xs font-medium rounded-full">
                        {request.rfqNumber}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <h3 className="font-semibold text-gray-900">{request.rfqTitle}</h3>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-gray-900">{new Date(request.requestedDate).toLocaleDateString()}</p>
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(request.status)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye size={16} />
                        </button>
                        {activeTab === 'ongoing' && request.status === 'pending' && (
                          <button
                            onClick={() => handleResendApproval(request)}
                            className="p-2 text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg transition-colors"
                          >
                            <Send size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {filteredRequests.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
            <Shield size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No approval requests found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || hasActiveFilters 
                ? `Try adjusting your search or filters for ${activeTab} requests`
                : `No ${activeTab} approval requests found`
              }
            </p>
          </div>
        )}
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

export default RFQApprovals;