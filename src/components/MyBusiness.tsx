import React, { useState } from 'react';
import { Building, MapPin, Plus, Edit, Trash2, X, Save, ChevronDown } from 'lucide-react';
import CompanyDetailsForm from './CompanyDetailsForm';
import LocationForm from './LocationForm';

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

interface MyBusinessProps {
  sidebarCollapsed: boolean;
  activeView: string;
}

const MyBusiness: React.FC<MyBusinessProps> = ({ sidebarCollapsed, activeView }) => {
  const [isCompanyFormOpen, setIsCompanyFormOpen] = useState(false);
  const [isLocationFormOpen, setIsLocationFormOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [countryFilter, setCountryFilter] = useState('');
  
  const [locations, setLocations] = useState<Location[]>([
    {
      id: '1',
      type: 'Office',
      businessUnit: 'Headquarters',
      country: 'United States',
      state: 'California',
      city: 'San Francisco',
      streetAddress: '123 Business St',
      address2: 'Suite 100'
    },
    {
      id: '2',
      type: 'Operation',
      businessUnit: 'East Coast Operations',
      country: 'United States',
      state: 'New York',
      city: 'New York',
      streetAddress: '456 Operations Ave'
    }
  ]);

  // Get unique countries for filter
  const uniqueCountries = Array.from(new Set(locations.map(loc => loc.country))).sort();

  // Filter locations by country
  const filteredLocations = countryFilter 
    ? locations.filter(loc => loc.country === countryFilter)
    : locations;

  const [companyDetails, setCompanyDetails] = useState<CompanyDetails>({
    companyName: 'TechCorp Industries Inc.',
    publicName: 'TechCorp',
    businessType: 'Hotel',
    hotelType: ['4 Star', 'Boutique Hotel'],
    partOfHotelGroup: true,
    hotelGroup: 'Luxury Hotels International',
    hotelBrand: ['TechCorp Hotels', 'Premium Stay']
  });

  const handleSaveCompany = (details: CompanyDetails) => {
    setCompanyDetails(details);
    setIsCompanyFormOpen(false);
  };

  const handleSaveLocation = (location: Omit<Location, 'id'>) => {
    if (editingLocation) {
      setLocations(prev => prev.map(loc => 
        loc.id === editingLocation.id 
          ? { ...location, id: editingLocation.id }
          : loc
      ));
      setEditingLocation(null);
    } else {
      const newLocation: Location = {
        ...location,
        id: Date.now().toString()
      };
      setLocations(prev => [...prev, newLocation]);
    }
    setIsLocationFormOpen(false);
  };

  const handleEditLocation = (location: Location) => {
    setEditingLocation(location);
    setIsLocationFormOpen(true);
  };

  const handleDeleteLocation = (id: string) => {
    setLocations(prev => prev.filter(loc => loc.id !== id));
  };

  const handleAddLocation = () => {
    setEditingLocation(null);
    setIsLocationFormOpen(true);
  };

  return (
    <main className={`
      transition-all duration-300 ease-in-out
      ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}
      pt-20 lg:pt-28 px-4 lg:px-8 pb-8 min-h-screen bg-gray-25
    `}>
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <div className="flex items-center space-x-3 mb-3">
          <Building className="text-blue-600" size={28} />
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">My Company</h1>
        </div>
        <p className="text-gray-600 font-medium">Manage your company details and locations</p>
      </div>

      {/* Company Details Section */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6 shadow-soft hover:shadow-medium transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">Company Details</h2>
          <button
            onClick={() => setIsCompanyFormOpen(true)}
            className="flex items-center px-4 py-2.5 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-xl hover:from-primary-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-soft hover:shadow-medium"
          >
            <Edit size={16} className="mr-2" />
            <span>Edit Details</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Company Name</label>
            <p className="text-gray-900 font-medium">{companyDetails.companyName}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Public Name</label>
            <p className="text-gray-900 font-medium">{companyDetails.publicName}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Business Type</label>
            <p className="text-gray-900 font-medium">{companyDetails.businessType}</p>
          </div>
          
          {/* Conditional Display */}
          {companyDetails.businessType === 'Hotel' && (
            <>
              {companyDetails.hotelType && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Hotel Type</label>
                  <p className="text-gray-900 font-medium">{companyDetails.hotelType.join(', ')}</p>
                </div>
              )}
              {companyDetails.partOfHotelGroup && companyDetails.hotelGroup && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Hotel Group</label>
                  <p className="text-gray-900 font-medium">{companyDetails.hotelGroup}</p>
                </div>
              )}
              {companyDetails.hotelBrand && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Hotel Brand</label>
                  <p className="text-gray-900 font-medium">{companyDetails.hotelBrand.join(', ')}</p>
                </div>
              )}
            </>
          )}

          {companyDetails.businessType === 'Restaurant' && (
            <>
              {companyDetails.restaurantType && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Restaurant Type</label>
                  <p className="text-gray-900 font-medium">{companyDetails.restaurantType.join(', ')}</p>
                </div>
              )}
              {companyDetails.partOfRestaurantChain && companyDetails.chainGroup && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Chain Group</label>
                  <p className="text-gray-900 font-medium">{companyDetails.chainGroup}</p>
                </div>
              )}
              {companyDetails.businessUnits && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Business Units</label>
                  <p className="text-gray-900 font-medium">{companyDetails.businessUnits}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Locations Section */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-soft hover:shadow-medium transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">Locations</h2>
          <button
            onClick={handleAddLocation}
            className="flex items-center px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium shadow-soft hover:shadow-medium"
          >
            <Plus size={16} className="mr-2" />
            <span>Add Location</span>
          </button>
        </div>

        {/* Country Filter */}
        {locations.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Filter by Country:</label>
              <select
                value={countryFilter}
                onChange={(e) => setCountryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              >
                <option value="">All Countries</option>
                {uniqueCountries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              {countryFilter && (
                <button
                  onClick={() => setCountryFilter('')}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear Filter
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile: Cards Layout */}
        <div className="lg:hidden space-y-4">
          {filteredLocations.map((location) => (
            <div key={location.id} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-soft hover:shadow-medium transition-all duration-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <h3 className="font-bold text-gray-900 tracking-tight">{location.businessUnit}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    location.type === 'Office' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {location.type}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditLocation(location)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteLocation(location.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="text-sm text-gray-700 space-y-1">
                <p className="font-medium text-gray-900">{location.country}, {location.state}</p>
                <p>{location.city}</p>
                <p>{location.streetAddress}{location.address2 ? `, ${location.address2}` : ''}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Table Layout */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Business Unit & Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Country & State</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Location Details</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLocations.map((location) => (
                <tr key={location.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-semibold text-gray-900">{location.businessUnit}</p>
                      <span className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full ${
                        location.type === 'Office' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {location.type}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">{location.country}</p>
                      <p className="text-gray-600">{location.state}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm">
                      <p className="text-gray-900">{location.city}</p>
                      <p className="text-gray-600">{location.streetAddress}{location.address2 ? `, ${location.address2}` : ''}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleEditLocation(location)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteLocation(location.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLocations.length === 0 && locations.length > 0 && (
          <div className="text-center py-12">
            <MapPin size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 mb-4">No locations found for "{countryFilter}"</p>
            <button
              onClick={() => setCountryFilter('')}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filter
            </button>
          </div>
        )}

        {locations.length === 0 && (
          <div className="text-center py-12">
            <MapPin size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 mb-4">No locations added yet</p>
            <button
              onClick={handleAddLocation}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={16} className="mr-2" />
              Add Your First Location
            </button>
          </div>
        )}
      </div>

      {/* Floating Add Button (Mobile) */}
      <button
        onClick={handleAddLocation}
        className="lg:hidden fixed bottom-20 right-4 w-14 h-14 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors flex items-center justify-center z-40"
      >
        <Plus size={24} />
      </button>

      {/* Company Details Form */}
      <CompanyDetailsForm
        isOpen={isCompanyFormOpen}
        onClose={() => setIsCompanyFormOpen(false)}
        onSave={handleSaveCompany}
        initialData={companyDetails}
      />

      {/* Location Form */}
      <LocationForm
        isOpen={isLocationFormOpen}
        onClose={() => {
          setIsLocationFormOpen(false);
          setEditingLocation(null);
        }}
        onSave={handleSaveLocation}
        initialData={editingLocation}
      />
    </main>
  );
};

export default MyBusiness;