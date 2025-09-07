import React, { useState } from 'react';
import { X, User, Mail, MessageSquare, Send, Shield } from 'lucide-react';

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

interface ApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { approverEmail: string; comments: string }) => void;
  quote: RFQQuote | null;
}

const ApprovalModal: React.FC<ApprovalModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  quote
}) => {
  const [formData, setFormData] = useState({
    approverEmail: '',
    comments: ''
  });

  const [errors, setErrors] = useState({
    approverEmail: '',
    comments: ''
  });

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({ approverEmail: '', comments: '' });
    
    // Validate form
    let hasErrors = false;
    
    if (!formData.approverEmail.trim()) {
      setErrors(prev => ({ ...prev, approverEmail: 'Approver email is required' }));
      hasErrors = true;
    } else if (!validateEmail(formData.approverEmail)) {
      setErrors(prev => ({ ...prev, approverEmail: 'Please enter a valid email address' }));
      hasErrors = true;
    }
    
    if (!formData.comments.trim()) {
      setErrors(prev => ({ ...prev, comments: 'Comments are required' }));
      hasErrors = true;
    }
    
    if (!hasErrors) {
      onSubmit(formData);
      // Reset form
      setFormData({ approverEmail: '', comments: '' });
    }
  };

  const handleClose = () => {
    setFormData({ approverEmail: '', comments: '' });
    setErrors({ approverEmail: '', comments: '' });
    onClose();
  };

  if (!isOpen || !quote) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end lg:items-center justify-center">
      <div className="bg-white w-full h-full lg:h-auto lg:max-w-md lg:rounded-xl lg:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 lg:p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="text-green-600" size={24} />
            <h2 className="text-xl font-medium text-gray-900">Send for Approval</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Quote Summary */}
        <div className="p-4 lg:p-6 border-b border-gray-200 bg-blue-50">
          <h3 className="font-semibold text-gray-900 mb-2">Quote Details</h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-600">RFQ:</span>
              <p className="font-medium text-gray-900">{quote.rfqTitle}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-gray-600">Supplier:</span>
                <p className="font-medium text-gray-900">{quote.supplierName}</p>
              </div>
              <div>
                <span className="text-gray-600">Amount:</span>
                <p className="font-bold text-gray-900">{quote.quotedAmount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 lg:p-6 space-y-6">
          {/* Approver Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Approver Email Address *
            </label>
            <div className="relative">
              <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                required
                value={formData.approverEmail}
                onChange={(e) => setFormData(prev => ({ ...prev, approverEmail: e.target.value }))}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.approverEmail ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter approver's email address"
              />
            </div>
            {errors.approverEmail && (
              <p className="text-red-500 text-sm mt-1">{errors.approverEmail}</p>
            )}
          </div>

          {/* Comments */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comments for Approver *
            </label>
            <div className="relative">
              <MessageSquare size={20} className="absolute left-3 top-3 text-gray-400" />
              <textarea
                required
                rows={4}
                value={formData.comments}
                onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none ${
                  errors.comments ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Add context or specific instructions for the approver..."
              />
            </div>
            {errors.comments && (
              <p className="text-red-500 text-sm mt-1">{errors.comments}</p>
            )}
          </div>

          {/* Security Notice */}
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-start space-x-3">
              <Shield size={16} className="text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-900">Secure Approval Process</p>
                <p className="text-xs text-green-700 mt-1">
                  A secure approval link will be sent to the approver's email. They can review the quote details and provide their decision with comments.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 pt-4 mt-8">
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                <Send size={16} className="mr-2" />
                Send Approval Request
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApprovalModal;