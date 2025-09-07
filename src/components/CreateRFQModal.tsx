import React from 'react';
import { X, FileText, Package, Settings, FolderOpen } from 'lucide-react';

interface CreateRFQModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateRFQModal: React.FC<CreateRFQModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleOptionClick = (type: string) => {
    console.log(`Creating RFQ for: ${type}`);
    // Handle RFQ creation logic here
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={20} className="text-gray-500" />
        </button>

        {/* Modal Content */}
        <div className="p-8 text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText size={32} className="text-white" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Request for Quote</h2>
          <p className="text-gray-600 mb-8">Create a new RFQ or use a saved template</p>

          {/* Options */}
          <div className="space-y-3">
            {/* Product Option */}
            <button
              onClick={() => handleOptionClick('Product')}
              className="w-full flex items-center justify-center space-x-3 p-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              <Package size={20} />
              <span className="font-medium">Product</span>
            </button>

            {/* Services Option */}
            <button
              onClick={() => handleOptionClick('Services')}
              className="w-full flex items-center justify-center space-x-3 p-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Settings size={20} />
              <span className="font-medium">Services</span>
            </button>

            {/* Projects Option */}
            <button
              onClick={() => handleOptionClick('Projects')}
              className="w-full flex items-center justify-center space-x-3 p-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <FolderOpen size={20} />
              <span className="font-medium">Projects</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRFQModal;