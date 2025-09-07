import React from 'react';
import { Calendar, TrendingUp, Users, FileText, AlertCircle, ChevronRight, Star, MapPin, Award, Eye, Plus, Search } from 'lucide-react';
import CreateRFQModal from './CreateRFQModal';
import FindSuppliersModal from './FindSuppliersModal';

interface DashboardProps {
  sidebarCollapsed: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ sidebarCollapsed }) => {
  const [fromDate, setFromDate] = React.useState('2024-01-01');
  const [toDate, setToDate] = React.useState('2024-01-31');
  const [isCreateRFQModalOpen, setIsCreateRFQModalOpen] = React.useState(false);
  const [isFindSuppliersModalOpen, setIsFindSuppliersModalOpen] = React.useState(false);

  const kpiData = [
    { label: 'Total RFQs', value: '147', color: 'blue' },
    { label: 'Total RFQ Value', value: '$2.4M', color: 'green' },
    { label: 'Vendors Invited', value: '89', color: 'purple' },
    { label: 'Quotations Received', value: '234', color: 'orange' },
  ];

  const suppliers = [
    {
      name: 'TechCorp Industries',
      type: 'Product',
      location: 'CA, USA',
      status: 'Preferred',
      isFavorite: true
    },
    {
      name: 'Global Supply Co.',
      type: 'Service',
      location: 'NY, USA',
      status: 'Credit',
      isFavorite: false
    },
    {
      name: 'Innovation Partners',
      type: 'Freelancer',
      location: 'TX, USA',
      status: 'Preferred',
      isFavorite: true
    },
    {
      name: 'MegaManuf Inc.',
      type: 'Product',
      location: 'IL, USA',
      status: 'Preferred',
      isFavorite: false
    },
    {
      name: 'Swift Logistics',
      type: 'Service',
      location: 'FL, USA',
      status: 'Credit',
      isFavorite: false
    },
    {
      name: 'Design Masters',
      type: 'Freelancer',
      location: 'WA, USA',
      status: 'Preferred',
      isFavorite: true
    },
    {
      name: 'Quality Components',
      type: 'Product',
      location: 'CO, USA',
      status: 'Credit',
      isFavorite: false
    },
    {
      name: 'Expert Consultants',
      type: 'Service',
      location: 'MA, USA',
      status: 'Preferred',
      isFavorite: true
    },
    {
      name: 'Creative Solutions',
      type: 'Freelancer',
      location: 'OR, USA',
      status: 'Credit',
      isFavorite: false
    },
    {
      name: 'Reliable Parts Co.',
      type: 'Product',
      location: 'AZ, USA',
      status: 'Preferred',
      isFavorite: false
    }
  ];

  const quotations = [
    {
      rfqTitle: 'Office Equipment RFQ-2024-001',
      supplier: 'TechCorp Industries',
      value: '$45,000',
      status: 'Submitted',
      date: '2024-01-15',
      statusColor: 'green'
    },
    {
      rfqTitle: 'IT Services RFQ-2024-002',
      supplier: 'Global Supply Co.',
      value: '$78,500',
      status: 'Pending',
      date: '2024-01-14',
      statusColor: 'yellow'
    },
    {
      rfqTitle: 'Marketing Campaign RFQ-2024-003',
      supplier: 'Innovation Partners',
      value: '$32,000',
      status: 'Accepted',
      date: '2024-01-13',
      statusColor: 'blue'
    },
    {
      rfqTitle: 'Manufacturing Materials RFQ-2024-004',
      supplier: 'MegaManuf Inc.',
      value: '$125,000',
      status: 'Submitted',
      date: '2024-01-12',
      statusColor: 'green'
    },
    {
      rfqTitle: 'Logistics Services RFQ-2024-005',
      supplier: 'Swift Logistics',
      value: '$67,200',
      status: 'Pending',
      date: '2024-01-11',
      statusColor: 'yellow'
    }
  ];

  const alerts = [
    {
      message: 'New quotation received from TechCorp Industries',
      time: '2 hours ago',
      type: 'success',
      unread: true
    },
    {
      message: 'Supplier Global Supply Co. updated their profile',
      time: '4 hours ago',
      type: 'info',
      unread: true
    },
    {
      message: 'RFQ deadline approaching for Marketing Campaign',
      time: '1 day ago',
      type: 'warning',
      unread: false
    }
  ];

  const getStatusBadge = (status: string, color: string) => {
    const colors = {
      green: 'bg-green-100 text-green-800',
      yellow: 'bg-yellow-100 text-yellow-800',
      blue: 'bg-blue-100 text-blue-800',
      purple: 'bg-purple-100 text-purple-800',
      orange: 'bg-orange-100 text-orange-800'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[color as keyof typeof colors]}`}>
        {status}
      </span>
    );
  };

  const getSupplierStatusBadge = (status: string) => {
    const statusColors = {
      'Preferred': 'bg-green-100 text-green-700',
      'Credit': 'bg-blue-100 text-blue-700',
    };

    return (
      <span className={`px-1.5 py-0.5 text-xs font-medium rounded-full ${statusColors[status as keyof typeof statusColors]}`}>
        {status}
      </span>
    );
  };

  const getSupplierTypeBadge = (type: string) => {
    const typeColors = {
      'Distributor': 'bg-blue-100 text-blue-700',
      'Manufacturer': 'bg-green-100 text-green-700',
      'Service Provider': 'bg-purple-100 text-purple-700',
      'Retailer': 'bg-orange-100 text-orange-700',
      'Wholesaler': 'bg-indigo-100 text-indigo-700'
    };

    return (
      <span className={`inline-flex items-center px-1.5 py-0.5 text-xs font-medium rounded-full ${typeColors[type as keyof typeof typeColors]}`}>
        {type}
      </span>
    );
  };

  return (
    <main className={`
      transition-all duration-300 ease-in-out
      ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}
      pt-20 lg:pt-28 px-4 lg:px-8 pb-8 min-h-screen bg-gray-50
    `}>
      {/* Header */}
      <div className="mb-4 sm:mb-6 lg:mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 mb-1">Dashboard</h1>
        </div>
        
        {/* CTAs - Hidden on mobile, shown on desktop */}
        <div className="hidden lg:flex items-center space-x-3">
          <button 
            onClick={() => setIsFindSuppliersModalOpen(true)}
            className="flex items-center px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 text-xs"
          >
            <Search size={14} className="mr-1.5 text-primary-600" />
            <span className="text-gray-700 font-medium">Find Suppliers</span>
          </button>
          <button 
            onClick={() => setIsCreateRFQModalOpen(true)}
            className="flex items-center px-3 py-2 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-lg hover:from-primary-700 hover:to-purple-700 transition-all duration-200 text-xs"
          >
            <Plus size={14} className="mr-1.5" />
            <span className="font-medium">Create RFQ</span>
          </button>
        </div>
        
        {/* Mobile/Tablet CTAs */}
        <div className="lg:hidden flex items-center space-x-2 mt-3 sm:mt-4">
          <button 
            onClick={() => setIsFindSuppliersModalOpen(true)}
            className="flex-1 flex items-center justify-center px-2 py-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 text-xs"
          >
            <Search size={12} className="mr-1 text-primary-600" />
            <span className="text-gray-700 font-medium">Find</span>
          </button>
          <button 
            onClick={() => setIsCreateRFQModalOpen(true)}
            className="flex-1 flex items-center justify-center px-2 py-1.5 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-lg hover:from-primary-700 hover:to-purple-700 transition-all duration-200 text-xs"
          >
            <Plus size={12} className="mr-1" />
            <span className="font-medium">Create RFQ</span>
          </button>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="mb-4 sm:mb-6 lg:mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900 mb-2 sm:mb-0">Live RFQ Metrics</h2>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
              <Calendar size={12} className="text-primary-600 hidden sm:block" />
              <div className="flex items-center space-x-1 sm:space-x-2">
                <div className="flex flex-col">
                  <label className="text-xs font-medium text-gray-500 mb-0.5">From</label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1 text-xs focus:ring-1 focus:ring-primary-500 focus:border-transparent hover:border-gray-400 transition-all duration-200"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-medium text-gray-500 mb-0.5">To</label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1 text-xs focus:ring-1 focus:ring-primary-500 focus:border-transparent hover:border-gray-400 transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {kpiData.map((kpi, index) => (
              <div key={index} className="bg-gradient-to-br from-primary-50 to-purple-50 p-3 rounded-lg border border-primary-100 hover:shadow-md transition-all duration-300">
                <div className="text-lg font-semibold text-gray-900 mb-0.5">{kpi.value}</div>
                <div className="text-xs font-medium text-gray-600">{kpi.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Top Suppliers */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Suppliers</h3>
            <button className="text-primary-600 hover:text-primary-700 text-xs font-medium flex items-center hover:bg-primary-50 px-2 py-1 rounded-md transition-all duration-200">
              View All
              <ChevronRight size={12} className="ml-1" />
            </button>
          </div>

          <div className="space-y-2">
            {suppliers.slice(0, 8).map((supplier, index) => (
              <div key={index} className="flex items-center justify-between p-2 hover:bg-primary-50 rounded-md transition-all duration-200 border border-transparent hover:border-primary-100">
                <div className="flex-1">
                    <div className="flex flex-col mb-1">
                      <h4 className="font-medium text-gray-900 text-xs">{supplier.name}</h4>
                    </div>
                    <div className="text-xs text-gray-500">
                      <span>{supplier.location}</span>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getSupplierStatusBadge(supplier.status)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Quotations */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Latest Quotations</h3>
            <button className="text-primary-600 hover:text-primary-700 text-xs font-medium flex items-center hover:bg-primary-50 px-2 py-1 rounded-md transition-all duration-200">
              View All
              <ChevronRight size={12} className="ml-1" />
            </button>
          </div>

          <div className="space-y-3">
            {quotations.slice(0, 5).map((quotation, index) => (
              <div key={index} className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0 hover:bg-primary-50 p-2 rounded-md transition-all duration-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-xs truncate">{quotation.rfqTitle.replace(/RFQ-\d{4}-\d{3}/, '').trim()}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{quotation.supplier}</p>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex items-center space-x-2">
                    <div className="font-semibold text-gray-900 text-xs">{quotation.value}</div>
                    <button className="flex items-center px-2 py-1 bg-primary-600 text-white text-xs rounded-md hover:bg-primary-700 transition-all duration-200 font-medium">
                      <Eye size={10} className="mr-0.5" />
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Alerts & Notifications</h3>
            <button className="text-primary-600 hover:text-primary-700 text-xs font-medium flex items-center hover:bg-primary-50 px-2 py-1 rounded-md transition-all duration-200">
              View All
              <ChevronRight size={12} className="ml-1" />
            </button>
          </div>

          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className={`flex items-start space-x-2 p-2 rounded-md border transition-all duration-200 ${
                alert.unread 
                  ? 'bg-gradient-to-r from-primary-50 to-purple-50 border-primary-200' 
                  : 'bg-gray-50/50 border-gray-200/50 hover:bg-gray-100/50'
              }`}>
                <div className={`p-1 rounded-full ${
                  alert.type === 'success' ? 'bg-gradient-to-r from-green-100 to-green-200' :
                  alert.type === 'warning' ? 'bg-gradient-to-r from-yellow-100 to-orange-100' : 'bg-gradient-to-r from-primary-100 to-purple-100'
                }`}>
                  <AlertCircle size={10} className={
                    alert.type === 'success' ? 'text-green-600' :
                    alert.type === 'warning' ? 'text-yellow-600' : 'text-primary-600'
                  } />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900 mb-0.5">{alert.message}</p>
                  <p className="text-xs text-gray-500">{alert.time}</p>
                </div>
                {alert.unread && (
                  <div className="w-1.5 h-1.5 bg-gradient-to-r from-primary-600 to-purple-600 rounded-full flex-shrink-0 mt-1"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Create RFQ Modal */}
      <CreateRFQModal 
        isOpen={isCreateRFQModalOpen} 
        onClose={() => setIsCreateRFQModalOpen(false)} 
      />
      
      {/* Find Suppliers Modal */}
      <FindSuppliersModal 
        isOpen={isFindSuppliersModalOpen} 
        onClose={() => setIsFindSuppliersModalOpen(false)} 
      />
    </main>
  );
};

export default Dashboard;