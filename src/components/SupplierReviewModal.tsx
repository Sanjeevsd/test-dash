import React from 'react';
import { X, Star, Calendar, MessageSquare, User, Shield } from 'lucide-react';

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
  lastReviewDate?: string;
  rating?: number;
  reviewComments?: string;
}

interface SupplierReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  supplier: Supplier | null;
}

const SupplierReviewModal: React.FC<SupplierReviewModalProps> = ({
  isOpen,
  onClose,
  supplier
}) => {
  if (!isOpen || !supplier) return null;

  const getRatingStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={20}
            className={`${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-lg font-medium text-gray-900 ml-2">({rating}/5)</span>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end lg:items-center justify-center">
      <div className="bg-white w-full h-full lg:h-auto lg:max-w-2xl lg:rounded-xl lg:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 lg:p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Star className="text-purple-600" size={24} />
            <div>
              <h2 className="text-xl font-medium text-gray-900">Supplier Review</h2>
              <p className="text-sm text-gray-600">{supplier.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 lg:p-6 space-y-6">
          {/* Supplier Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-3">Supplier Information</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-blue-700">Contact Person:</span>
                <p className="font-medium text-blue-900">{supplier.contactPerson}</p>
              </div>
              <div>
                <span className="text-blue-700">Supplier Type:</span>
                <p className="font-medium text-blue-900">{supplier.type}</p>
              </div>
              <div>
                <span className="text-blue-700">Category:</span>
                <p className="font-medium text-blue-900">{supplier.category} → {supplier.subCategory}</p>
              </div>
              <div>
                <span className="text-blue-700">Location:</span>
                <p className="font-medium text-blue-900">{supplier.location.city}, {supplier.location.country}</p>
              </div>
            </div>
          </div>

          {/* Review Details */}
          {supplier.rating && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-4">Review Details</h3>
              
              {/* Rating */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-purple-700 mb-2">Overall Rating</label>
                {getRatingStars(supplier.rating)}
              </div>

              {/* Review Date */}
              {supplier.lastReviewDate && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-purple-700 mb-2">Review Date</label>
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} className="text-purple-600" />
                    <span className="text-purple-900 font-medium">
                      {new Date(supplier.lastReviewDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}

              {/* Comments */}
              {supplier.reviewComments && (
                <div>
                  <label className="block text-sm font-medium text-purple-700 mb-2">Review Comments</label>
                  <div className="bg-white border border-purple-200 rounded-lg p-3">
                    <p className="text-purple-900">{supplier.reviewComments}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Performance Metrics */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Performance Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">12</div>
                <div className="text-sm text-gray-600">RFQs Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">95%</div>
                <div className="text-sm text-gray-600">On-Time Delivery</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">$245K</div>
                <div className="text-sm text-gray-600">Total Value</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">3.2 days</div>
                <div className="text-sm text-gray-600">Avg Response Time</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
              Update Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierReviewModal;