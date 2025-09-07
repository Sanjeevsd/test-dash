import React, { useState, useEffect } from 'react';
import { X, Building, ChevronDown, Plus } from 'lucide-react';

interface CompanyDetails {
  companyName: string;
  publicName: string;
  businessType: string;
  hotelType?: string[];
  partOfHotelGroup?: boolean;
  hotelGroup?: string;
  hotelBrand?: string[];
  restaurantType?: string[];
  partOfRestaurantChain?: boolean;
  chainGroup?: string;
  businessUnits?: number;
}

interface CompanyDetailsFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (details: CompanyDetails) => void;
  initialData: CompanyDetails;
}

const CompanyDetailsForm: React.FC<CompanyDetailsFormProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData
}) => {
  const [formData, setFormData] = useState<CompanyDetails>(initialData);
  const [isBusinessTypeOpen, setIsBusinessTypeOpen] = useState(false);
  const [isHotelTypeOpen, setIsHotelTypeOpen] = useState(false);
  const [isRestaurantTypeOpen, setIsRestaurantTypeOpen] = useState(false);
  const [isHotelGroupOpen, setIsHotelGroupOpen] = useState(false);
  const [isChainGroupOpen, setIsChainGroupOpen] = useState(false);
  const [newHotelBrand, setNewHotelBrand] = useState('');

  const businessTypes = ['Hotel', 'Restaurant', 'Catering', 'Cloud Kitchen', 'Others'];
  
  const hotelTypes = [
    '5 Star & Luxury',
    '4 Star',
    '3 Star & Below',
    'Resort',
    'Boutique Hotel',
    'Hotel Apartment',
    'Others'
  ];

  const restaurantTypes = [
    'Fine Dining',
    'Casual Dining',
    'Fast Food',
    'Coffee Shop',
    'Cafeteria'
  ];

  const hotelGroups = [
    'Marriott International',
    'Hilton Worldwide',
    'InterContinental Hotels Group',
    'Luxury Hotels International',
    'Boutique Hotel Collection'
  ];

  const chainGroups = [
    'McDonald\'s Corporation',
    'Starbucks Corporation',
    'Subway',
    'KFC',
    'Pizza Hut'
  ];

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData);
    }
  }, [isOpen, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleBusinessTypeSelect = (type: string) => {
    setFormData(prev => ({
      ...prev,
      businessType: type,
      // Reset conditional fields when business type changes
      hotelType: undefined,
      partOfHotelGroup: undefined,
      hotelGroup: undefined,
      hotelBrand: undefined,
      restaurantType: undefined,
      partOfRestaurantChain: undefined,
      chainGroup: undefined,
      businessUnits: undefined
    }));
    setIsBusinessTypeOpen(false);
  };

  const handleHotelTypeToggle = (type: string) => {
    setFormData(prev => ({
      ...prev,
      hotelType: prev.hotelType?.includes(type)
        ? prev.hotelType.filter(t => t !== type)
        : [...(prev.hotelType || []), type]
    }));
  };

  const handleRestaurantTypeToggle = (type: string) => {
    setFormData(prev => ({
      ...prev,
      restaurantType: prev.restaurantType?.includes(type)
        ? prev.restaurantType.filter(t => t !== type)
        : [...(prev.restaurantType || []), type]
    }));
  };

  const handleAddHotelBrand = () => {
    if (newHotelBrand.trim()) {
      setFormData(prev => ({
        ...prev,
        hotelBrand: [...(prev.hotelBrand || []), newHotelBrand.trim()]
      }));
      setNewHotelBrand('');
    }
  };

  const handleRemoveHotelBrand = (brand: string) => {
    setFormData(prev => ({
      ...prev,
      hotelBrand: prev.hotelBrand?.filter(b => b !== brand)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end lg:items-center justify-center">
      <div className="bg-white w-full h-full lg:h-auto lg:max-w-2xl lg:rounded-xl lg:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 lg:p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Building className="text-blue-600" size={24} />
            <h2 className="text-xl font-medium text-gray-900">Company Details</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 lg:p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name (as per license/registry) *
              </label>
              <input
                type="text"
                required
                value={formData.companyName}
                onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter company name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Public Name *
              </label>
              <input
                type="text"
                required
                value={formData.publicName}
                onChange={(e) => setFormData(prev => ({ ...prev, publicName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter public name"
              />
            </div>

            {/* Business Type Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Type *
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsBusinessTypeOpen(!isBusinessTypeOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className={formData.businessType ? 'text-gray-900' : 'text-gray-500'}>
                    {formData.businessType || 'Select business type'}
                  </span>
                  <ChevronDown size={20} className={`transform transition-transform ${isBusinessTypeOpen ? 'rotate-180' : ''}`} />
                </button>

                {isBusinessTypeOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                    {businessTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleBusinessTypeSelect(type)}
                        className={`w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors ${
                          formData.businessType === type ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Conditional Fields for Hotel */}
          {formData.businessType === 'Hotel' && (
            <div className="space-y-4 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900">Hotel Details</h3>
              
              {/* Hotel Type Multi-select */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type of Hotel
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsHotelTypeOpen(!isHotelTypeOpen)}
                    className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-900">
                      {formData.hotelType?.length ? `${formData.hotelType.length} selected` : 'Select hotel types'}
                    </span>
                    <ChevronDown size={20} className={`transform transition-transform ${isHotelTypeOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isHotelTypeOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                      {hotelTypes.map((type) => (
                        <label
                          key={type}
                          className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={formData.hotelType?.includes(type) || false}
                            onChange={() => handleHotelTypeToggle(type)}
                            className="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-gray-700">{type}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
                {formData.hotelType && formData.hotelType.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.hotelType.map((type) => (
                      <span
                        key={type}
                        className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {type}
                        <button
                          type="button"
                          onClick={() => handleHotelTypeToggle(type)}
                          className="ml-1 hover:text-blue-600"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Part of Hotel Group Toggle */}
              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.partOfHotelGroup || false}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      partOfHotelGroup: e.target.checked,
                      hotelGroup: e.target.checked ? prev.hotelGroup : undefined
                    }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Part of Hotel Group?</span>
                </label>
              </div>

              {/* Hotel Group Dropdown */}
              {formData.partOfHotelGroup && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hotel Group
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsHotelGroupOpen(!isHotelGroupOpen)}
                      className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <span className={formData.hotelGroup ? 'text-gray-900' : 'text-gray-500'}>
                        {formData.hotelGroup || 'Select hotel group'}
                      </span>
                      <ChevronDown size={20} className={`transform transition-transform ${isHotelGroupOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isHotelGroupOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                        {hotelGroups.map((group) => (
                          <button
                            key={group}
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, hotelGroup: group }));
                              setIsHotelGroupOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors ${
                              formData.hotelGroup === group ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                            }`}
                          >
                            {group}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Hotel Brand Multi-select with Add New */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hotel Brand
                </label>
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newHotelBrand}
                      onChange={(e) => setNewHotelBrand(e.target.value)}
                      placeholder="Type to add new brand"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddHotelBrand())}
                    />
                    <button
                      type="button"
                      onClick={handleAddHotelBrand}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  {formData.hotelBrand && formData.hotelBrand.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.hotelBrand.map((brand) => (
                        <span
                          key={brand}
                          className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                        >
                          {brand}
                          <button
                            type="button"
                            onClick={() => handleRemoveHotelBrand(brand)}
                            className="ml-1 hover:text-green-600"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Conditional Fields for Restaurant */}
          {formData.businessType === 'Restaurant' && (
            <div className="space-y-4 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900">Restaurant Details</h3>
              
              {/* Restaurant Type Multi-select */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type of Restaurant
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsRestaurantTypeOpen(!isRestaurantTypeOpen)}
                    className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-900">
                      {formData.restaurantType?.length ? `${formData.restaurantType.length} selected` : 'Select restaurant types'}
                    </span>
                    <ChevronDown size={20} className={`transform transition-transform ${isRestaurantTypeOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isRestaurantTypeOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                      {restaurantTypes.map((type) => (
                        <label
                          key={type}
                          className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={formData.restaurantType?.includes(type) || false}
                            onChange={() => handleRestaurantTypeToggle(type)}
                            className="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-gray-700">{type}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
                {formData.restaurantType && formData.restaurantType.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.restaurantType.map((type) => (
                      <span
                        key={type}
                        className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {type}
                        <button
                          type="button"
                          onClick={() => handleRestaurantTypeToggle(type)}
                          className="ml-1 hover:text-blue-600"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Part of Restaurant Chain Toggle */}
              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.partOfRestaurantChain || false}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      partOfRestaurantChain: e.target.checked,
                      chainGroup: e.target.checked ? prev.chainGroup : undefined
                    }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Part of Restaurant Chain Group?</span>
                </label>
              </div>

              {/* Chain Group Dropdown */}
              {formData.partOfRestaurantChain && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chain Group
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsChainGroupOpen(!isChainGroupOpen)}
                      className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <span className={formData.chainGroup ? 'text-gray-900' : 'text-gray-500'}>
                        {formData.chainGroup || 'Select chain group'}
                      </span>
                      <ChevronDown size={20} className={`transform transition-transform ${isChainGroupOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isChainGroupOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                        {chainGroups.map((group) => (
                          <button
                            key={group}
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, chainGroup: group }));
                              setIsChainGroupOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors ${
                              formData.chainGroup === group ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                            }`}
                          >
                            {group}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Number of Business Units */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  No. of Business Units
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.businessUnits || ''}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    businessUnits: e.target.value ? parseInt(e.target.value) : undefined 
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter number of business units"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 pt-4 mt-8">
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyDetailsForm;