import React, { useState, useEffect } from 'react';
import { X, MapPin, ChevronDown } from 'lucide-react';

interface Location {
  id: string;
  type: 'Office' | 'Operation';
  businessUnit: string;
  country: string;
  state: string;
  city: string;
  streetAddress: string;
  address2?: string;
}

interface LocationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (location: Omit<Location, 'id'>) => void;
  initialData?: Location | null;
}

const LocationForm: React.FC<LocationFormProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData
}) => {
  const [formData, setFormData] = useState({
    type: 'Office' as 'Office' | 'Operation',
    businessUnit: '',
    country: '',
    state: '',
    city: '',
    streetAddress: '',
    address2: ''
  });

  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isStateOpen, setIsStateOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [stateSearch, setStateSearch] = useState('');

  const countries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    'Germany',
    'France',
    'Japan',
    'India',
    'China',
    'Brazil'
  ];

  const statesByCountry: { [key: string]: string[] } = {
    'United States': [
      'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
      'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
      'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
      'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
      'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
      'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
      'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
      'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
      'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
      'West Virginia', 'Wisconsin', 'Wyoming'
    ],
    'Canada': [
      'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick',
      'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia',
      'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan',
      'Yukon'
    ],
    'United Kingdom': [
      'England', 'Scotland', 'Wales', 'Northern Ireland'
    ],
    'Australia': [
      'New South Wales', 'Victoria', 'Queensland', 'Western Australia',
      'South Australia', 'Tasmania', 'Australian Capital Territory',
      'Northern Territory'
    ]
  };

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          type: initialData.type,
          businessUnit: initialData.businessUnit,
          country: initialData.country,
          state: initialData.state,
          city: initialData.city,
          streetAddress: initialData.streetAddress,
          address2: initialData.address2 || ''
        });
      } else {
        setFormData({
          type: 'Office',
          businessUnit: '',
          country: '',
          state: '',
          city: '',
          streetAddress: '',
          address2: ''
        });
      }
    }
  }, [isOpen, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      type: formData.type,
      businessUnit: formData.businessUnit,
      country: formData.country,
      state: formData.state,
      city: formData.city,
      streetAddress: formData.streetAddress,
      address2: formData.address2 || undefined
    });
  };

  const handleCountrySelect = (country: string) => {
    setFormData(prev => ({
      ...prev,
      country,
      state: '' // Reset state when country changes
    }));
    setIsCountryOpen(false);
    setCountrySearch('');
  };

  const handleStateSelect = (state: string) => {
    setFormData(prev => ({ ...prev, state }));
    setIsStateOpen(false);
    setStateSearch('');
  };

  const filteredCountries = countries.filter(country =>
    country.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const availableStates = formData.country ? statesByCountry[formData.country] || [] : [];
  const filteredStates = availableStates.filter(state =>
    state.toLowerCase().includes(stateSearch.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end lg:items-center justify-center">
      <div className="bg-white w-full h-full lg:h-auto lg:max-w-md lg:rounded-xl lg:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 lg:p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <MapPin className="text-green-600" size={24} />
            <h2 className="text-xl font-medium text-gray-900">
              {initialData ? 'Edit Location' : 'Add Location'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 lg:p-6 space-y-4">
          {/* Location Type Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location Type *
            </label>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, type: 'Office' }))}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  formData.type === 'Office'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Office
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, type: 'Operation' }))}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  formData.type === 'Operation'
                    ? 'bg-white text-green-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Operation
              </button>
            </div>
          </div>

          {/* Business Unit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Unit *
            </label>
            <input
              type="text"
              required
              value={formData.businessUnit}
              onChange={(e) => setFormData(prev => ({ ...prev, businessUnit: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter business unit name"
            />
          </div>

          {/* Country Dropdown with Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country *
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCountryOpen(!isCountryOpen)}
                className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className={formData.country ? 'text-gray-900' : 'text-gray-500'}>
                  {formData.country || 'Select country'}
                </span>
                <ChevronDown size={20} className={`transform transition-transform ${isCountryOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCountryOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  <div className="p-2 border-b border-gray-200">
                    <input
                      type="text"
                      placeholder="Search countries..."
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {filteredCountries.map((country) => (
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
                </div>
              )}
            </div>
          </div>

          {/* State Dropdown with Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State *
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsStateOpen(!isStateOpen)}
                disabled={!formData.country}
                className={`w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg transition-colors ${
                  formData.country 
                    ? 'hover:bg-gray-50' 
                    : 'bg-gray-100 cursor-not-allowed'
                }`}
              >
                <span className={formData.state ? 'text-gray-900' : 'text-gray-500'}>
                  {formData.state || (formData.country ? 'Select state' : 'Select country first')}
                </span>
                <ChevronDown size={20} className={`transform transition-transform ${isStateOpen ? 'rotate-180' : ''}`} />
              </button>

              {isStateOpen && formData.country && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  <div className="p-2 border-b border-gray-200">
                    <input
                      type="text"
                      placeholder="Search states..."
                      value={stateSearch}
                      onChange={(e) => setStateSearch(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {filteredStates.map((state) => (
                      <button
                        key={state}
                        type="button"
                        onClick={() => handleStateSelect(state)}
                        className={`w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors ${
                          formData.state === state ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                        }`}
                      >
                        {state}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City *
            </label>
            <input
              type="text"
              required
              value={formData.city}
              onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter city name"
            />
          </div>

          {/* Street Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Street Address *
            </label>
            <input
              type="text"
              required
              value={formData.streetAddress}
              onChange={(e) => setFormData(prev => ({ ...prev, streetAddress: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter street address"
            />
          </div>

          {/* Address 2 (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address 2 (Optional)
            </label>
            <input
              type="text"
              value={formData.address2}
              onChange={(e) => setFormData(prev => ({ ...prev, address2: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Apartment, suite, etc."
            />
          </div>

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
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                {initialData ? 'Update Location' : 'Add Location'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LocationForm;