import React, { useState, useEffect } from 'react';
import { X, FileText, ChevronDown, Plus, Trash2, Save, Edit } from 'lucide-react';

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

interface TemplateEditFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (template: RFQTemplate) => void;
  template: RFQTemplate | null;
}

const TemplateEditForm: React.FC<TemplateEditFormProps> = ({
  isOpen,
  onClose,
  onSave,
  template
}) => {
  const [formData, setFormData] = useState<RFQTemplate | null>(null);
  const [dropdowns, setDropdowns] = useState({
    category: false,
    subCategory: false,
    subSubCategory: false
  });

  const [newItem, setNewItem] = useState({
    productName: '',
    uom: ''
  });

  const [editingItem, setEditingItem] = useState<string | null>(null);

  const categories = {
    'Office Supplies': {
      'Furniture': ['Desks & Chairs', 'Storage', 'Meeting Room'],
      'Stationery': ['Writing Materials', 'Paper Products', 'Filing'],
      'Equipment': ['Printers', 'Scanners', 'Shredders']
    },
    'Technology': {
      'Hardware': ['Computers', 'Servers', 'Networking'],
      'Software': ['Operating Systems', 'Applications', 'Security'],
      'Services': ['Support', 'Consulting', 'Training']
    },
    'Services': {
      'Food & Beverage': ['Event Catering', 'Office Catering', 'Vending'],
      'Cleaning': ['Office Cleaning', 'Deep Cleaning', 'Maintenance'],
      'Maintenance': ['HVAC', 'Electrical', 'Plumbing']
    },
    'Manufacturing': {
      'Raw Materials': ['Metals', 'Plastics', 'Chemicals'],
      'Components': ['Electronic', 'Mechanical', 'Fasteners'],
      'Tools': ['Hand Tools', 'Power Tools', 'Measuring']
    }
  };

  const uomOptions = [
    'Piece', 'Unit', 'Set', 'Pair', 'Box', 'Pack', 'Carton', 'Dozen',
    'Meter', 'Kilogram', 'Liter', 'Square Meter', 'Cubic Meter',
    'Hour', 'Day', 'Month', 'Year', 'Person', 'Service'
  ];

  useEffect(() => {
    if (isOpen && template) {
      setFormData({ ...template });
    }
  }, [isOpen, template]);

  const handleDropdownToggle = (dropdown: keyof typeof dropdowns) => {
    setDropdowns(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };

  const handleCategorySelect = (category: string) => {
    if (formData) {
      setFormData(prev => prev ? {
        ...prev,
        category,
        subCategory: '',
        subSubCategory: ''
      } : null);
    }
    setDropdowns(prev => ({ ...prev, category: false }));
  };

  const handleSubCategorySelect = (subCategory: string) => {
    if (formData) {
      setFormData(prev => prev ? {
        ...prev,
        subCategory,
        subSubCategory: ''
      } : null);
    }
    setDropdowns(prev => ({ ...prev, subCategory: false }));
  };

  const handleSubSubCategorySelect = (subSubCategory: string) => {
    if (formData) {
      setFormData(prev => prev ? { ...prev, subSubCategory } : null);
    }
    setDropdowns(prev => ({ ...prev, subSubCategory: false }));
  };

  const handleAddItem = () => {
    if (newItem.productName.trim() && newItem.uom && formData) {
      const item: RFQItem = {
        id: Date.now().toString(),
        productName: newItem.productName.trim(),
        uom: newItem.uom
      };
      setFormData(prev => prev ? {
        ...prev,
        items: [...prev.items, item]
      } : null);
      setNewItem({ productName: '', uom: '' });
    }
  };

  const handleRemoveItem = (id: string) => {
    if (formData) {
      setFormData(prev => prev ? {
        ...prev,
        items: prev.items.filter(item => item.id !== id)
      } : null);
    }
  };

  const handleEditItem = (id: string, field: 'productName' | 'uom', value: string) => {
    if (formData) {
      setFormData(prev => prev ? {
        ...prev,
        items: prev.items.map(item => 
          item.id === id ? { ...item, [field]: value } : item
        )
      } : null);
    }
  };

  const handleSubmit = () => {
    if (formData) {
      onSave(formData);
    }
  };

  const handleClose = () => {
    setFormData(null);
    setNewItem({ productName: '', uom: '' });
    setEditingItem(null);
    setDropdowns({ category: false, subCategory: false, subSubCategory: false });
    onClose();
  };

  if (!isOpen || !formData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end lg:items-center justify-center">
      <div className="bg-white w-full h-full lg:h-auto lg:max-w-2xl lg:rounded-xl lg:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 lg:p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Edit className="text-blue-600" size={24} />
            <div>
              <h2 className="text-xl font-medium text-gray-900">Edit Template</h2>
              <p className="text-sm text-gray-600">{formData.templateNo}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-4 lg:p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Template Information</h3>
            
            {/* Template Title */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Template Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData(prev => prev ? { ...prev, title: e.target.value } : null)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter template title"
              />
            </div>

            {/* Category Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => handleDropdownToggle('category')}
                  className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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
                        className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
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

            {/* Sub-Category Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sub-Category *
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => handleDropdownToggle('subCategory')}
                  disabled={!formData.category}
                  className={`w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg transition-colors ${
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
                    {Object.keys(categories[formData.category as keyof typeof categories]).map((subCategory) => (
                      <button
                        key={subCategory}
                        type="button"
                        onClick={() => handleSubCategorySelect(subCategory)}
                        className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
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

            {/* Sub-Sub-Category Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sub-Sub-Category (Optional)
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => handleDropdownToggle('subSubCategory')}
                  disabled={!formData.subCategory}
                  className={`w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg transition-colors ${
                    formData.subCategory 
                      ? 'hover:bg-gray-50' 
                      : 'bg-gray-100 cursor-not-allowed'
                  }`}
                >
                  <span className={formData.subSubCategory ? 'text-gray-900' : 'text-gray-500'}>
                    {formData.subSubCategory || (formData.subCategory ? 'Select sub-sub-category' : 'Select sub-category first')}
                  </span>
                  <ChevronDown size={20} className={`transform transition-transform ${dropdowns.subSubCategory ? 'rotate-180' : ''}`} />
                </button>

                {dropdowns.subSubCategory && formData.category && formData.subCategory && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    {categories[formData.category as keyof typeof categories][formData.subCategory]?.map((subSubCategory) => (
                      <button
                        key={subSubCategory}
                        type="button"
                        onClick={() => handleSubSubCategorySelect(subSubCategory)}
                        className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                          formData.subSubCategory === subSubCategory ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                        }`}
                      >
                        {subSubCategory}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Items Management */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Template Items</h3>
            
            {/* Add New Item Form */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-gray-900 mb-3">Add New Item</h4>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                  <input
                    type="text"
                    placeholder="Product name"
                    value={newItem.productName}
                    onChange={(e) => setNewItem(prev => ({ ...prev, productName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex space-x-2">
                  <select
                    value={newItem.uom}
                    onChange={(e) => setNewItem(prev => ({ ...prev, uom: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">UOM</option>
                    {uomOptions.map(uom => (
                      <option key={uom} value={uom}>{uom}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    disabled={!newItem.productName.trim() || !newItem.uom}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Items List */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Current Items ({formData.items.length})</h4>
              {formData.items.length > 0 ? (
                <div className="space-y-2">
                  {formData.items.map((item, index) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                      <div className="flex-1 flex items-center space-x-4">
                        <span className="text-sm font-medium text-gray-500 w-8">#{index + 1}</span>
                        {editingItem === item.id ? (
                          <>
                            <input
                              type="text"
                              value={item.productName}
                              onChange={(e) => handleEditItem(item.id, 'productName', e.target.value)}
                              className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <select
                              value={item.uom}
                              onChange={(e) => handleEditItem(item.id, 'uom', e.target.value)}
                              className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              {uomOptions.map(uom => (
                                <option key={uom} value={uom}>{uom}</option>
                              ))}
                            </select>
                            <button
                              type="button"
                              onClick={() => setEditingItem(null)}
                              className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
                            >
                              Save
                            </button>
                          </>
                        ) : (
                          <>
                            <span className="flex-1 font-medium text-gray-900">{item.productName}</span>
                            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                              {item.uom}
                            </span>
                            <button
                              type="button"
                              onClick={() => setEditingItem(item.id)}
                              className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
                            >
                              <Edit size={14} />
                            </button>
                          </>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors ml-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>No items in this template. Add your first item above.</p>
                </div>
              )}
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
              onClick={handleSubmit}
              disabled={!formData.title.trim() || !formData.category || !formData.subCategory}
              className="flex-1 flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
            >
              <Save size={16} className="mr-2" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateEditForm;