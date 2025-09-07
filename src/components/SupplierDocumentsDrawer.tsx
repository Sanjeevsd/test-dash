import React from 'react';
import { X, FileText, Download, Eye, Calendar, Shield, CheckCircle, AlertCircle } from 'lucide-react';

interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  contactPerson: string;
  location: {
    city: string;
    country: string;
  };
  category: string;
  subCategory: string;
  type: 'Distributor' | 'Manufacturer' | 'Service Provider' | 'Retailer' | 'Wholesaler';
  status: 'approved' | 'credit-pending' | 'credit-confirmed';
  dateAdded: string;
  documentsOnFile: boolean;
}

interface Document {
  id: string;
  name: string;
  type: 'Business License' | 'Tax Certificate' | 'Insurance' | 'Quality Certificate' | 'Bank Statement' | 'Other';
  uploadDate: string;
  status: 'verified' | 'pending' | 'expired';
  fileSize: string;
  expiryDate?: string;
}

interface SupplierDocumentsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  supplier: Supplier | null;
}

const SupplierDocumentsDrawer: React.FC<SupplierDocumentsDrawerProps> = ({
  isOpen,
  onClose,
  supplier
}) => {
  const documents: Document[] = [
    {
      id: '1',
      name: 'Business Registration Certificate',
      type: 'Business License',
      uploadDate: '2024-01-10',
      status: 'verified',
      fileSize: '2.4 MB',
      expiryDate: '2025-01-10'
    },
    {
      id: '2',
      name: 'Tax Identification Certificate',
      type: 'Tax Certificate',
      uploadDate: '2024-01-08',
      status: 'verified',
      fileSize: '1.8 MB'
    },
    {
      id: '3',
      name: 'General Liability Insurance',
      type: 'Insurance',
      uploadDate: '2024-01-05',
      status: 'pending',
      fileSize: '3.2 MB',
      expiryDate: '2024-12-31'
    },
    {
      id: '4',
      name: 'ISO 9001 Quality Certificate',
      type: 'Quality Certificate',
      uploadDate: '2023-12-15',
      status: 'expired',
      fileSize: '1.5 MB',
      expiryDate: '2024-01-01'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      verified: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Verified' },
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle, label: 'Pending Review' },
      expired: { color: 'bg-red-100 text-red-800', icon: AlertCircle, label: 'Expired' }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const IconComponent = config.icon;

    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        <IconComponent size={12} className="mr-1" />
        {config.label}
      </span>
    );
  };

  const getDocumentTypeIcon = (type: string) => {
    return <FileText size={16} className="text-blue-600" />;
  };

  if (!isOpen || !supplier) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />
      
      {/* Drawer */}
      <div className={`
        fixed top-0 right-0 h-full bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        w-full lg:w-96 overflow-y-auto
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            <Shield className="text-purple-600" size={24} />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Supplier Documents</h2>
              <p className="text-sm text-gray-600">{supplier.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Supplier Info */}
        <div className="p-4 bg-blue-50 border-b border-gray-200">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-blue-700">Contact:</span>
              <span className="text-blue-900 font-medium">{supplier.contactPerson}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700">Email:</span>
              <span className="text-blue-900">{supplier.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700">Phone:</span>
              <span className="text-blue-900">{supplier.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700">Type:</span>
              <span className="text-blue-900 font-medium">{supplier.type}</span>
            </div>
          </div>
        </div>

        {/* Documents List */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {documents.map((document) => (
              <div key={document.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm">{document.name}</h4>
                  </div>
                  {getStatusBadge(document.status)}
                </div>

                <div className="grid grid-cols-1 gap-4 text-xs text-gray-600 mb-3">
                  <div>
                    <span className="font-medium">Uploaded:</span>
                    <p>{new Date(document.uploadDate).toLocaleDateString()}</p>
                  </div>
                  {document.expiryDate && (
                    <div>
                      <span className="font-medium">Expires:</span>
                      <p className={new Date(document.expiryDate) < new Date() ? 'text-red-600' : ''}>
                        {new Date(document.expiryDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <button className="flex items-center px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors">
                    <Eye size={12} className="mr-1" />
                    View
                  </button>
                  <button className="flex items-center px-3 py-1 bg-gray-600 text-white text-xs rounded-lg hover:bg-gray-700 transition-colors">
                    <Download size={12} className="mr-1" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Document Summary */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Document Summary</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Documents:</span>
                <span className="font-medium">{documents.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Verified:</span>
                <span className="text-green-600 font-medium">{documents.filter(d => d.status === 'verified').length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pending:</span>
                <span className="text-yellow-600 font-medium">{documents.filter(d => d.status === 'pending').length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expired:</span>
                <span className="text-red-600 font-medium">{documents.filter(d => d.status === 'expired').length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupplierDocumentsDrawer;