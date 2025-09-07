import React, { useState, useEffect } from 'react';
import { X, FileText, Save, Calculator } from 'lucide-react';

interface RFQItem {
  id: string;
  productName: string;
  uom: string;
  quantity?: number;
}

interface RFQTemplate {
  id: string;
  templateNo: string;
  title: string;
  category: string;
  subCategory: string;
  subSubCategory?: string;
  items: RFQItem[];
  createdDate: string;
}

interface QuantityInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateRFQ: (templateWithQuantities: RFQTemplate) => void;
  template: RFQTemplate | null;
}

const QuantityInputModal: React.FC<QuantityInputModalProps> = ({
  isOpen,
  onClose,
  onCreateRFQ,
  template
}) => {
  const [items, setItems] = useState<RFQItem[]>([]);

  useEffect(() => {
    if (isOpen && template) {
      // Initialize items with empty quantities
      setItems(template.items.map(item => ({ ...item, quantity: undefined })));
    }
  }, [isOpen, template]);

  const handleQuantityChange = (itemId: string, quantity: string) => {
    const numericQuantity = quantity === '' ? undefined : parseInt(quantity);
    setItems(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, quantity: numericQuantity }
        : item
    ));
  };

  const handleCreateRFQ = () => {
    if (template) {
      const templateWithQuantities: RFQTemplate = {
        ...template,
        items: items
      };
      onSave(templateWithQuantities);
    }
  };

  const handleClose = () => {
    setItems([]);
    onClose();
  };

  const isFormValid = () => {
    return items.some(item => item.quantity && item.quantity > 0);
  };

  if (!isOpen || !template) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end lg:items-center justify-center">
      <div className="bg-white w-full h-full lg:h-auto lg:max-w-3xl lg:rounded-xl lg:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 lg:p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Calculator className="text-purple-600" size={24} />
            <div>
              <h2 className="text-xl font-medium text-gray-900">Add Quantities</h2>
              <p className="text-sm text-gray-600">{template.title} ({template.templateNo})</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Template Info */}
        <div className="p-4 lg:p-6 border-b border-gray-200 bg-purple-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-purple-900">{template.title}</h3>
              <p className="text-sm text-purple-700">
                {template.category} → {template.subCategory}
                {template.subSubCategory && ` → ${template.subSubCategory}`}
              </p>
            </div>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 text-sm font-medium rounded-full">
              {template.items.length} items
            </span>
          </div>
        </div>

        {/* Quantity Input Table */}
        <div className="p-4 lg:p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Enter Quantities</h3>
            <p className="text-sm text-gray-600">Add quantities for the items you want to include in your RFQ</p>
          </div>

          {/* Excel-like Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 w-8">#</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Product Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 w-24">UOM</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 w-32">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm font-medium text-gray-500">
                        {index + 1}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-gray-900">{item.productName}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {item.uom}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={item.quantity || ''}
                          onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center"
                          placeholder="0"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Items with quantities:</span>
              <span className="font-medium text-gray-900">
                {items.filter(item => item.quantity && item.quantity > 0).length} of {items.length}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 lg:p-6">
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleCreateRFQ}
              disabled={!isFormValid()}
              className="flex-1 flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
            >
              <Save size={16} className="mr-2" />
              Create RFQ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuantityInputModal;