import React, { useState, useEffect } from 'react';
import { X, ChevronDown, Plus, AlertCircle, Info, Shield, FileText } from 'lucide-react';
import DocumentRequirementsModal from './DocumentRequirementsModal';

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

interface DocumentRequirement {
  id: string;
  name: string;
  isMandatory: boolean;
}

interface AddSupplierFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (supplier: SupplierData) => void;
  defaultType: 'approved' | 'credit-pending';
  requestDocuments?: boolean;
}

const AddSupplierForm: React.FC<AddSupplierFormProps> = ({
  isOpen,
  onClose,
  onSave,
  defaultType,
  requestDocuments = false
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    contactPerson: '',
    city: '',
    country: '',
    category: '',
    subCategory: '',
    supplierType: 'Distributor' as 'Distributor' | 'Manufacturer' | 'Service Provider' | 'Retailer' | 'Wholesaler',
    assignmentType: defaultType as 'approved' | 'credit-pending',
    requestDocuments: requestDocuments
  });

  const [dropdowns, setDropdowns] = useState({
    country: false,
    category: false,
    subCategory: false,
    supplierType: false
  });
  
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [documentRequirements, setDocumentRequirements] = useState<DocumentRequirement[]>([]);

  const countries = [
    'USA', 'Canada', 'United Kingdom', 'Germany', 'France', 'Australia', 'Japan', 'India', 'China', 'Brazil'
  ];

  const categories = {
    'Technology': ['Hardware', 'Software', 'IT Services', 'Telecommunications'],
    'Manufacturing': ['Components', 'Raw Materials', 'Equipment', 'Tools'],
    'Services': ['Consulting', 'Marketing', 'Legal', 'Financial'],
    'Logistics': ['Shipping', 'Warehousing', 'Transportation', 'Packaging']
  };

  const supplierTypes = ['Distributor', 'Manufacturer', 'Service Provider', 'Retailer', 'Wholesaler'];

  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        assignmentType: defaultType,
        requestDocuments: requestDocuments,
        name: '',
        email: '',
        phone: '',
        contactPerson: '',
        city: '',
        country: '',
        category: '',
        subCategory: '',
        supplierType: 'Distributor'
      }));
    }
  }, [isOpen, defaultType, requestDocuments]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const supplierData: SupplierData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      contactPerson: formData.contactPerson,
      location: {
        city: formData.city,
        country: formData.country
      },
      category: formData.category,
      subCategory: formData.subCategory,
      type: formData.supplierType,
      status: formData.assignmentType,
      documentsOnFile: formData.requestDocuments
    };

    onSave(supplierData);
  };

  const handleDropdownToggle = (dropdown: keyof typeof dropdowns) => {
    setDropdowns(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };

  const handleDocumentRequirements = (requirements: DocumentRequirement[]) => {
    setDocumentRequirements(requirements);
    setIsDocumentModalOpen(false);
    // Auto-enable request documents if requirements are added
    if (requirements.length > 0) {
      setFormData(prev => ({ ...prev, requestDocuments: true }));
    }
  };

  const handleCategorySelect = (category: string) => {
    setFormData(prev => ({
      ...prev,
      category,
      subCategory: '' // Reset subcategory when category changes
    }));
    setDropdowns(prev => ({ ...prev, category: false }));
  };

  const handleSubCategorySelect = (subCategory: string) => {
    setFormData(prev => ({ ...prev, subCategory }));
    setDropdowns(prev => ({ ...prev, subCategory: false }));
  };

  const handleSupplierTypeSelect = (supplierType: 'Distributor' | 'Manufacturer' | 'Service Provider' | 'Retailer' | 'Wholesaler') => {
    setFormData(prev => ({ ...prev, supplierType }));
    setDropdowns(prev => ({ ...prev, supplierType: false }));
  };

  const handleCountrySelect = (country: string) => {
    setFormData(prev => ({ ...prev, country }));
    setDropdowns(prev => ({ ...prev, country: false }));
  };

  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.email.trim() &&
      formData.country &&
      formData.category &&
      formData.subCategory
    );
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end lg:items-center justify-center">
      <div className="bg-white w-full h-full lg:h-auto lg:max-w-2xl lg:rounded-xl lg:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 lg:p-6 flex items-center justify-between">
          <h2 className="text-xl font-medium text-gray-900">
            Add {formData.assignmentType === 'approved' ? 'Approved' : 'Credit'} Supplier
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 lg:p-6 space-y-6">
          {/* Assignment Type Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assignment Type *
            </label>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, assignmentType: 'approved' }))}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  formData.assignmentType === 'approved'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Approved Supplier
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, assignmentType: 'credit-pending' }))}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  formData.assignmentType === 'credit-pending'
                    ? 'bg-white text-green-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Credit Supplier
              </button>
            </div>
          </div>

          {/* Credit Supplier Warning */}
          {formData.assignmentType === 'credit-pending' && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <Info size={16} className="text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-900">Credit Supplier Confirmation Required</p>
                  <p className="text-xs text-yellow-700 mt-1">
                    Assigning this supplier as a Credit Supplier requires them to confirm via email. 
                    Status will remain Pending until confirmed by the supplier.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Basic Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Supplier Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Supplier Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter supplier name"
              />
            </div>

            {/* Contact Person */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Person
              </label>
              <input
                type="text"
                value={formData.contactPerson}
                onChange={(e) => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter contact person name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter email address"
              />
              {formData.email && !validateEmail(formData.email) && (
                <p className="text-red-500 text-sm mt-1">Please enter a valid email address</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter phone number"
              />
            </div>
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country *
            </label>
            {/* Country */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => handleDropdownToggle('country')}
                  className="w-full flex items-center justify-between px-3 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className={formData.country ? 'text-gray-900' : 'text-gray-500'}>
                    {formData.country || 'Select country'}
                  </span>
                  <ChevronDown size={20} className={`transform transition-transform ${dropdowns.country ? 'rotate-180' : ''}`} />
                </button>

                {dropdowns.country && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                    {countries.map((country) => (
                      <button
                        key={country}
                        type="button"
                        onClick={() => handleCountrySelect(country)}
                        className={`w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors ${
                          formData.country === country ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                        }`}
                      >
                        {country}
                      </button>
                    ))}
                  </div>
                )}
              </div>
          </div>

          {/* Supplier Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Supplier Type *
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => handleDropdownToggle('supplierType')}
                className="w-full flex items-center justify-between px-3 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className={formData.supplierType ? 'text-gray-900' : 'text-gray-500'}>
                  {formData.supplierType || 'Select supplier type'}
                </span>
                <ChevronDown size={20} className={`transform transition-transform ${dropdowns.supplierType ? 'rotate-180' : ''}`} />
              </button>

              {dropdowns.supplierType && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  {supplierTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleSupplierTypeSelect(type as any)}
                      className={`w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors ${
                        formData.supplierType === type ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Category & Sub-Category */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => handleDropdownToggle('category')}
                  className="w-full flex items-center justify-between px-3 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className={formData.category ? 'text-gray-900' : 'text-gray-500'}>
                    {formData.category || 'Select category'}
                  </span>
                  <ChevronDown size={20} className={`transform transition-transform ${dropdowns.category ? 'rotate-180' : ''}`} />
                </button>

                {dropdowns.category && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    {Object.keys(categories).map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => handleCategorySelect(category)}
                        className={`w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors ${
                          formData.category === category ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sub-Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sub-Category *
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => handleDropdownToggle('subCategory')}
                  disabled={!formData.category}
                  className={`w-full flex items-center justify-between px-3 py-3 border border-gray-300 rounded-lg transition-colors ${
                    formData.category 
                      ? 'hover:bg-gray-50' 
                      : 'bg-gray-100 cursor-not-allowed'
                  }`}
                >
                  <span className={formData.subCategory ? 'text-gray-900' : 'text-gray-500'}>
                    {formData.subCategory || (formData.category ? 'Select sub-category' : 'Select category first')}
                  </span>
                  <ChevronDown size={20} className={`transform transition-transform ${dropdowns.subCategory ? 'rotate-180' : ''}`} />
                </button>

                {dropdowns.subCategory && formData.category && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    {categories[formData.category as keyof typeof categories].map((subCategory) => (
                      <button
                        key={subCategory}
                        type="button"
                        onClick={() => handleSubCategorySelect(subCategory)}
                        className={`w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors ${
                          formData.subCategory === subCategory ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                        }`}
                      >
                        {subCategory}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Request Documents Toggle */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="space-y-4">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.requestDocuments}
                  onChange={(e) => setFormData(prev => ({ ...prev, requestDocuments: e.target.checked }))}
                  className="mt-1 text-blue-600 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">Request Documents</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Ask supplier to upload business documents (licenses, certificates, etc.)
                  </div>
                </div>
              </label>
              
              {formData.requestDocuments && (
                <div className="pl-6">
                  <button
                    type="button"
                    onClick={() => setIsDocumentModalOpen(true)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    <FileText size={16} className="mr-2" />
                    Specify Documents Needed ({documentRequirements.length})
                  </button>
                  {documentRequirements.length > 0 && (
                    <div className="mt-3 space-y-1">
                      {documentRequirements.slice(0, 3).map((req) => (
                        <div key={req.id} className="flex items-center space-x-2 text-xs text-gray-600">
                          <span className={`w-2 h-2 rounded-full ${req.isMandatory ? 'bg-red-500' : 'bg-blue-500'}`}></span>
                          <span>{req.name}</span>
                          <span className={req.isMandatory ? 'text-red-600' : 'text-blue-600'}>
                            ({req.isMandatory ? 'Required' : 'Optional'})
                          </span>
                        </div>
                      ))}
                      {documentRequirements.length > 3 && (
                        <div className="text-xs text-gray-500">
                          +{documentRequirements.length - 3} more documents
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 pt-4 mt-8">
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isFormValid()}
                className="flex-1 flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Add {formData.assignmentType === 'approved' ? 'Approved' : 'Credit'} Supplier
              </button>
            </div>
          </div>
        </form>
      </div>
      
      {/* Document Requirements Modal */}
      <DocumentRequirementsModal
        isOpen={isDocumentModalOpen}
        onClose={() => setIsDocumentModalOpen(false)}
        onSave={handleDocumentRequirements}
      />
    </div>
  );
};

export default AddSupplierForm;