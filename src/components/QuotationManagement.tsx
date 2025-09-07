import React, { useState } from 'react';
import { FileText, Search, Filter, Calendar, Eye, Send, Clock, CheckCircle, XCircle, User, MessageSquare, Plus, Download } from 'lucide-react';
import ApprovalModal from './ApprovalModal';

interface RFQQuote {
  id: string;
  rfqNumber: string;
  rfqTitle: string;
  supplierName: string;
  quotedAmount: string;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  approvalStatus?: {
    status: 'pending' | 'approved' | 'rejected';
    approverName?: string;
    approverEmail?: string;
    timestamp?: string;
    comments?: string;
  };
  rfqDetails: {
    category: string;
    description: string;
    deadline: string;
  };
}

interface QuotationManagementProps {
  sidebarCollapsed: boolean;
}

const QuotationManagement: React.FC<QuotationManagementProps> = ({ sidebarCollapsed }) => {
  const [activeTab, setActiveTab] = useState<'received' | 'approved' | 'rejected'>('received');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<RFQQuote | null>(null);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    status: '',
    approvalStatus: ''
  });

  const [rfqQuotes, setRFQQuotes] = useState<RFQQuote[]>([
    {
      id: '1',
      rfqNumber: 'RFQ-2024-001',
      rfqTitle: 'Office Equipment Procurement',
      supplierName: 'TechCorp Industries',
      quotedAmount: '$45,000',
      submittedDate: '2024-01-15',
      status: 'pending',
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
      submittedDate: '2024-01-14',
      status: 'pending',
      approvalStatus: {
        status: 'pending',
        approverName: 'Sarah Johnson',
        approverEmail: 'sarah.johnson@company.com',
        timestamp: '2024-01-16T10:30:00Z'
      },
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
      submittedDate: '2024-01-13',
      status: 'approved',
      approvalStatus: {
        status: 'approved',
        approverName: 'Mike Davis',
        approverEmail: 'mike.davis@company.com',
        timestamp: '2024-01-15T14:20:00Z',
        comments: 'Quote looks reasonable and within budget. Approved for procurement.'
      },
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
      submittedDate: '2024-01-12',
      status: 'rejected',
      approvalStatus: {
        status: 'rejected',
        approverName: 'Director Smith',
        approverEmail: 'director@company.com',
        timestamp: '2024-01-14T16:45:00Z',
        comments: 'Quote exceeds our Q1 budget allocation. Please negotiate or find alternative supplier.'
      },
      rfqDetails: {
        category: 'Manufacturing',
        description: 'Raw materials for Q2 production cycle',
        deadline: '2024-02-15'
      }
    },
    {
      id: '5',
      rfqNumber: 'RFQ-2024-005',
      rfqTitle: 'Logistics Services',
      supplierName: 'Swift Logistics',
      quotedAmount: '$67,200',
      submittedDate: '2024-01-11',
      status: 'pending',
      rfqDetails: {
        category: 'Logistics',
        description: 'Shipping and warehousing services',
        deadline: '2024-02-01'
      }
    }
  ]);

  // Filter by tab first
  const tabFilteredQuotes = rfqQuotes.filter(quote => {
    if (activeTab === 'received') {
      return quote.status === 'pending';
    } else if (activeTab === 'approved') {
      return quote.status === 'approved';
    } else {
      return quote.status === 'rejected';
    }
  });

  const filteredQuotes = tabFilteredQuotes.filter(quote => {
    const matchesSearch = quote.rfqTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         quote.rfqNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         quote.supplierName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !filters.status || quote.status === filters.status;
    const matchesApprovalStatus = !filters.approvalStatus || quote.approvalStatus?.status === filters.approvalStatus;
    
    let matchesDateRange = true;
    if (filters.dateFrom && filters.dateTo) {
      const quoteDate = new Date(quote.submittedDate);
      const fromDate = new Date(filters.dateFrom);
      const toDate = new Date(filters.dateTo);
      matchesDateRange = quoteDate >= fromDate && quoteDate <= toDate;
    }

    return matchesSearch && matchesStatus && matchesApprovalStatus && matchesDateRange;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock, label: 'Pending Review' },
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

  const getApprovalStatusBadge = (approvalStatus?: RFQQuote['approvalStatus']) => {
    if (!approvalStatus) return null;

    const statusConfig = {
      pending: { color: 'bg-orange-100 text-orange-800', icon: Clock, label: 'Approval Pending' },
      approved: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Approved' },
      rejected: { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Rejected' }
    };

    const config = statusConfig[approvalStatus.status];
    const IconComponent = config.icon;

    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        <IconComponent size={12} className="mr-1" />
        {config.label}
      </span>
    );
  };

  const handleSendForApproval = (quote: RFQQuote) => {
    setSelectedQuote(quote);
    setIsApprovalModalOpen(true);
  };

  const handleApprovalSubmit = (data: { approverEmail: string; comments: string }) => {
    if (selectedQuote) {
      setRFQQuotes(prev => prev.map(quote => 
        quote.id === selectedQuote.id 
          ? {
              ...quote,
              approvalStatus: {
                status: 'pending',
                approverEmail: data.approverEmail,
                timestamp: new Date().toISOString(),
                comments: data.comments
              }
            }
          : quote
      ));
      setIsApprovalModalOpen(false);
      setSelectedQuote(null);
      showSuccess('Approval request sent successfully!');
    }
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
      approvalStatus: ''
    });
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
          <CheckCircle size={20} />
          <span className="font-medium">{successMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <div className="flex items-center space-x-3 mb-3">
          <FileText className="text-blue-600" size={28} />
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">Quotations</h1>
        </div>
        <p className="text-gray-600 font-medium">Manage quotations and approval workflow</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl border border-gray-200 mb-6 shadow-soft hover:shadow-medium transition-all duration-300">
        <div className="flex">
          <button
            onClick={() => setActiveTab('received')}
            className={`flex-1 py-4 px-6 text-center font-bold transition-all duration-200 ${
              activeTab === 'received'
                ? 'text-primary-600 border-b-2 border-primary-600 bg-gradient-to-r from-primary-50 to-purple-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <span>Received</span>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {rfqQuotes.filter(q => q.status === 'pending').length}
              </span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('approved')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
              activeTab === 'approved'
                ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <span>Approved</span>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                {rfqQuotes.filter(q => q.status === 'approved').length}
              </span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('rejected')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
              activeTab === 'rejected'
                ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <span>Rejected</span>
              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                {rfqQuotes.filter(q => q.status === 'rejected').length}
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
              placeholder="Search by RFQ title or supplier..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              <span className="ml-2 w-2 h-2 bg-blue-600 rounded-full"></span>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Date To */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
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
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {/* Approval Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Approval Status</label>
                <select
                  value={filters.approvalStatus}
                  onChange={(e) => setFilters(prev => ({ ...prev, approvalStatus: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="">All Approval Status</option>
                  <option value="pending">Approval Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quotations List */}
      <div className="space-y-4">
        {/* Mobile: Card Layout */}
        <div className="lg:hidden">
          {filteredQuotes.map((quote) => (
            <div key={quote.id} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                      {quote.rfqNumber}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{quote.rfqTitle}</h3>
                  <p className="text-sm text-gray-600 mb-2">{quote.supplierName}</p>
                  <div className="flex items-center space-x-2 mb-2">
                    {getStatusBadge(quote.status)}
                    {quote.approvalStatus && getApprovalStatusBadge(quote.approvalStatus)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-gray-600">Amount:</span>
                  <p className="font-bold text-gray-900">{quote.quotedAmount}</p>
                </div>
                <div>
                  <span className="text-gray-600">Submitted:</span>
                  <p className="font-medium text-gray-900">{new Date(quote.submittedDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-3">
                  <button className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium">
                    <Eye size={14} className="mr-1" />
                    View
                  </button>
                  <button className="flex items-center text-green-600 hover:text-green-700 text-sm font-medium">
                    <Download size={14} className="mr-1" />
                    PDF
                  </button>
                </div>
                {activeTab === 'received' && !quote.approvalStatus && (
                  <button
                    onClick={() => handleSendForApproval(quote)}
                    className="flex items-center text-orange-600 hover:text-orange-700 text-sm font-medium"
                  >
                    <Send size={14} className="mr-1" />
                    Send for Approval
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
                  <th className="text-left py-3 px-4 font-medium text-gray-600">RFQ Details</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Supplier</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Approval</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuotes.map((quote) => (
                  <tr key={quote.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 text-xs font-medium rounded-full mb-1">
                          {quote.rfqNumber}
                        </span>
                        <h3 className="font-semibold text-gray-900">{quote.rfqTitle}</h3>
                        <p className="text-sm text-gray-600 mt-1">{quote.rfqDetails.description}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-medium text-gray-900">{quote.supplierName}</p>
                      <p className="text-sm text-gray-600">{new Date(quote.submittedDate).toLocaleDateString()}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-bold text-gray-900">{quote.quotedAmount}</p>
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(quote.status)}
                    </td>
                    <td className="py-4 px-4">
                      {quote.approvalStatus ? (
                        <div>
                          {getApprovalStatusBadge(quote.approvalStatus)}
                          {quote.approvalStatus.approverName && (
                            <p className="text-xs text-gray-600 mt-1">
                              by {quote.approvalStatus.approverName}
                            </p>
                          )}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">Not sent</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye size={16} />
                        </button>
                        <button className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors">
                          <Download size={16} />
                        </button>
                        {activeTab === 'received' && !quote.approvalStatus && (
                          <button
                            onClick={() => handleSendForApproval(quote)}
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
        {filteredQuotes.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
            <FileText size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No quotations found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || hasActiveFilters 
                ? `Try adjusting your search or filters for ${activeTab} quotations`
                : `No ${activeTab} quotations found`
              }
            </p>
          </div>
        )}
      </div>

      {/* Approval Modal */}
      <ApprovalModal
        isOpen={isApprovalModalOpen}
        onClose={() => {
          setIsApprovalModalOpen(false);
          setSelectedQuote(null);
        }}
        onSubmit={handleApprovalSubmit}
        quote={selectedQuote}
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

export default QuotationManagement;