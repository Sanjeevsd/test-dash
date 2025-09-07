import React, { useState, useEffect } from 'react';
import { X, Search, MapPin, Building, Plus, Check, AlertCircle, Info, Shield, Scan, Store, Edit3 } from 'lucide-react';
import AddSupplierForm from './AddSupplierForm';

interface ExistingSupplier {
  id: string;
  name: string;
  location: {
    city: string;
    country: string;
  };
  type: 'Distributor' | 'Manufacturer' | 'Service Provider' | 'Retailer' | 'Wholesaler';
  email: string;
  phone: string;
  contactPerson: string;
  category: string;
  subCategory: string;
}

interface SupplierData {
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
  documentsOnFile: boolean;
}

interface SupplierSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (supplier: SupplierData) => void;
}

const SupplierSearchModal: React.FC<SupplierSearchModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [currentView, setCurrentView] = useState<'options' | 'scan' | 'marketplace' | 'manual' | 'assign'>('options');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ExistingSupplier[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<ExistingSupplier | null>(null);
  const [assignmentType, setAssignmentType] = useState<'approved' | 'credit-pending'>('approved');
  const [requestDocuments, setRequestDocuments] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Mock supplier database
  const supplierDatabase: ExistingSupplier[] = [
    {
      id: 'db1',
      name: 'Global Tech Solutions',
      location: { city: 'San Francisco', country: 'USA' },
      type: 'Distributor',
      email: 'contact@globaltech.com',
      phone: '+1-555-0100',
      contactPerson: 'Alice Johnson',
      category: 'Technology',
      subCategory: 'Hardware'
    },
    {
      id: 'db2',
      name: 'Premium Manufacturing Co.',
      location: { city: 'Detroit', country: 'USA' },
      type: 'Manufacturer',
      email: 'info@premiummfg.com',
      phone: '+1-555-0200',
      contactPerson: 'Bob Wilson',
      category: 'Manufacturing',
      subCategory: 'Components'
    },
    {
      id: 'db3',
      name: 'Elite Services Group',
      location: { city: 'New York', country: 'USA' },
      type: 'Service Provider',
      email: 'hello@eliteservices.com',
      phone: '+1-555-0300',
      contactPerson: 'Carol Davis',
      category: 'Services',
      subCategory: 'Consulting'
    }
  ];

  const ctaOptions = [
    {
      id: 'scan',
      icon: Scan,
      title: 'Scan Business Card',
      description: 'Scan a business card to extract supplier information',
      color: 'from-blue-500 to-blue-600',
      action: () => setCurrentView('scan')
    },
    {
      id: 'marketplace',
      icon: Store,
      title: 'Search Marketplace',
      description: 'Find suppliers from our marketplace database',
      color: 'from-green-500 to-green-600',
      action: () => setCurrentView('marketplace')
    },
    {
      id: 'manual',
      icon: Edit3,
      title: 'Add Manually',
      description: 'Enter supplier information manually',
      color: 'from-purple-500 to-purple-600',
      action: () => setCurrentView('manual')
    }
  ];

  // Search functionality with debounce
  useEffect(() => {
    if (searchQuery.length >= 2 && currentView === 'marketplace') {
      setIsSearching(true);
      const timer = setTimeout(() => {
        const results = supplierDatabase.filter(supplier =>
          supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          supplier.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          supplier.location.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
          supplier.type.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(results);
        setIsSearching(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [searchQuery, currentView]);

  const handleSupplierSelect = (supplier: ExistingSupplier) => {
    setSelectedSupplier(supplier);
    setCurrentView('assign');
  };

  const handleAssignSupplier = () => {
    if (selectedSupplier) {
      const supplierData: SupplierData = {
        name: selectedSupplier.name,
        email: selectedSupplier.email,
        phone: selectedSupplier.phone,
        contactPerson: selectedSupplier.contactPerson,
        location: selectedSupplier.location,
        category: selectedSupplier.category,
        subCategory: selectedSupplier.subCategory,
        type: selectedSupplier.type,
        status: assignmentType,
        documentsOnFile: requestDocuments
      };
      
      onSave(supplierData);
      handleClose();
    }
  };

  const handleAddSupplierSave = (supplierData: SupplierData) => {
    onSave(supplierData);
    handleClose();
  };

  const handleClose = () => {
    setCurrentView('options');
    setSearchQuery('');
    setSearchResults([]);
    setSelectedSupplier(null);
    setAssignmentType('approved');
    setRequestDocuments(false);
    onClose();
  };

  const getSupplierTypeColor = (type: string) => {
    const colors = {
      'Distributor': 'bg-blue-100 text-blue-800',
      'Manufacturer': 'bg-green-100 text-green-800',
      'Service Provider': 'bg-purple-100 text-purple-800',
      'Retailer': 'bg-orange-100 text-orange-800',
      'Wholesaler': 'bg-indigo-100 text-indigo-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end lg:items-center justify-center">
      <div className="bg-white w-full h-full lg:h-auto lg:max-w-2xl lg:rounded-2xl lg:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {currentView !== 'options' && (
              <button
                onClick={() => setCurrentView('options')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ←
              </button>
            )}
            <h2 className="text-xl font-semibold text-gray-900">
              {currentView === 'options' && 'Add Supplier'}
              {currentView === 'scan' && 'Scan Business Card'}
              {currentView === 'marketplace' && 'Search Marketplace'}
              {currentView === 'manual' && 'Add Manually'}
              {currentView === 'assign' && 'Assign Supplier'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* CTA Options View */}
          {currentView === 'options' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">How would you like to add a supplier?</h3>
                <p className="text-gray-600">Choose the method that works best for you</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {ctaOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={option.action}
                    className={`group relative overflow-hidden bg-gradient-to-r ${option.color} p-6 rounded-2xl text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                        <option.icon size={24} />
                      </div>
                      <div className="flex-1 text-left">
                        <h4 className="text-lg font-semibold mb-1">{option.title}</h4>
                        <p className="text-white text-opacity-90 text-sm">{option.description}</p>
                      </div>
                      <div className="text-white text-opacity-60">
                        →
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Scan Business Card View */}
          {currentView === 'scan' && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Scan size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Scan Business Card</h3>
              <p className="text-gray-600 mb-8">Use your camera to scan a business card and automatically extract supplier information</p>
              
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 mb-6">
                <div className="text-gray-400 mb-4">
                  <Scan size={48} className="mx-auto" />
                </div>
                <p className="text-gray-600 mb-4">Position the business card in the frame</p>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
                  Start Camera
                </button>
              </div>
              
              <p className="text-sm text-gray-500">
                Make sure the business card is well-lit and all text is clearly visible
              </p>
            </div>
          )}

          {/* Marketplace Search View */}
          {currentView === 'marketplace' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Store size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Search Marketplace</h3>
                <p className="text-gray-600">Find suppliers from our verified marketplace database</p>
              </div>

              {/* Search Section */}
              <div className="mb-6">
                <div className="relative">
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by supplier name, location, or type..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Search Results */}
              {isSearching && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                  <p className="text-gray-600 mt-2">Searching suppliers...</p>
                </div>
              )}

              {searchResults.length > 0 && (
                <div className="space-y-3">
                  {searchResults.map((supplier) => (
                    <div
                      key={supplier.id}
                      className="border border-gray-200 rounded-xl p-4 hover:border-green-300 hover:bg-green-50 transition-all cursor-pointer"
                      onClick={() => handleSupplierSelect(supplier)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-gray-900">{supplier.name}</h4>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSupplierTypeColor(supplier.type)}`}>
                              {supplier.type}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 mb-1">
                            <MapPin size={14} className="mr-1" />
                            <span>{supplier.location.city}, {supplier.location.country}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Building size={14} className="mr-1" />
                            <span>{supplier.category} • {supplier.subCategory}</span>
                          </div>
                        </div>
                        <button className="ml-4 px-4 py-2 bg-green-600 text-white text-sm rounded-xl hover:bg-green-700 transition-colors font-medium">
                          Select
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* No Results */}
              {searchQuery.length >= 2 && searchResults.length === 0 && !isSearching && (
                <div className="text-center py-8">
                  <Search size={48} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No suppliers found</h3>
                  <p className="text-gray-600 mb-4">
                    We couldn't find any suppliers matching "{searchQuery}"
                  </p>
                  <button
                    onClick={() => setCurrentView('manual')}
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium"
                  >
                    <Plus size={16} className="mr-2" />
                    Add New Supplier
                  </button>
                </div>
              )}

              {/* Initial State */}
              {searchQuery.length < 2 && (
                <div className="text-center py-8 text-gray-500">
                  <Store size={48} className="mx-auto text-gray-300 mb-4" />
                  <p>Start typing to search our supplier marketplace</p>
                </div>
              )}
            </div>
          )}

          {/* Manual Form View */}
          {currentView === 'manual' && (
            <AddSupplierForm
              isOpen={true}
              onClose={() => setCurrentView('options')}
              onSave={handleAddSupplierSave}
              defaultType={assignmentType}
              requestDocuments={requestDocuments}
            />
          )}

          {/* Supplier Assignment View */}
          {currentView === 'assign' && selectedSupplier && (
            <div className="space-y-6">
              {/* Selected Supplier Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Selected Supplier</h3>
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-medium text-gray-900">{selectedSupplier.name}</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSupplierTypeColor(selectedSupplier.type)}`}>
                    {selectedSupplier.type}
                  </span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex items-center">
                    <MapPin size={14} className="mr-1" />
                    <span>{selectedSupplier.location.city}, {selectedSupplier.location.country}</span>
                  </div>
                  <div className="flex items-center">
                    <Building size={14} className="mr-1" />
                    <span>{selectedSupplier.category} • {selectedSupplier.subCategory}</span>
                  </div>
                </div>
              </div>

              {/* Assignment Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Assignment Options
                </label>
                <div className="space-y-3">
                  {/* Approved Supplier Option */}
                  <label className="flex items-start space-x-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="assignmentType"
                      value="approved"
                      checked={assignmentType === 'approved'}
                      onChange={(e) => setAssignmentType(e.target.value as 'approved' | 'credit-pending')}
                      className="mt-1 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Approved Supplier</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Supplier can immediately receive RFQs and participate in procurement processes.
                      </div>
                    </div>
                  </label>

                  {/* Credit Supplier Option */}
                  <label className="flex items-start space-x-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="assignmentType"
                      value="credit-pending"
                      checked={assignmentType === 'credit-pending'}
                      onChange={(e) => setAssignmentType(e.target.value as 'approved' | 'credit-pending')}
                      className="mt-1 text-green-600 focus:ring-green-500"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Credit Supplier</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Supplier will receive a confirmation email and must accept before becoming active.
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Request Documents Toggle */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={requestDocuments}
                    onChange={(e) => setRequestDocuments(e.target.checked)}
                    className="mt-1 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Request Documents</div>
                    <div className="text-sm text-gray-600 mt-1">
                      Ask supplier to upload business documents (licenses, certificates, etc.)
                    </div>
                  </div>
                </label>
              </div>

              {/* Credit Confirmation Notice */}
              {assignmentType === 'credit-pending' && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <Info size={16} className="text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-900">Credit Supplier Confirmation Required</p>
                      <p className="text-xs text-yellow-700 mt-1">
                        The supplier will receive an email invitation to confirm their credit supplier status. 
                        They will remain in "Pending" status until confirmed.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setCurrentView('marketplace')}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Back to Search
                </button>
                <button
                  onClick={handleAssignSupplier}
                  className="flex-1 flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                >
                  <Check size={16} className="mr-2" />
                  Assign Supplier
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplierSearchModal;