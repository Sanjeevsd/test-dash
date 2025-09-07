import React, { useState } from 'react';
import { X, FileText, ChevronDown, Plus, Trash2, ArrowLeft, ArrowRight, Save } from 'lucide-react';

interface RFQItem {
  id: string;
  productName: string;
  uom: string;
  quantity?: number;
}

interface TemplateData {
  title: string;
  category: string;
  subCategory: string;
  subSubCategory?: string;
  items: RFQItem[];
}

interface TemplateCreateFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (template: TemplateData) => void;
}

const TemplateCreateForm: React.FC<TemplateCreateFormProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<TemplateData>({
    title: '',
    category: '',
    subCategory: '',
    subSubCategory: '',
    items: []
  });

  const [dropdowns, setDropdowns] = useState({
    category: false,
    subCategory: false,
    subSubCategory: false
  });

  const [newItem, setNewItem] = useState({
    productName: '',
    uom: ''
  });

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

  const steps = [
    { number: 1, title: 'Basic Info', description: 'Template title and category' },
    { number: 2, title: 'Add Items', description: 'Product list and specifications' },
    { number: 3, title: 'Review', description: 'Confirm and save template' }
  ];

  const handleDropdownToggle = (dropdown: keyof typeof dropdowns) => {
    setDropdowns(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };

  const handleCategorySelect = (category: string) => {
    setFormData(prev => ({
      ...prev,
      category,
      subCategory: '',
      subSubCategory: ''
    }));
    setDropdowns(prev => ({ ...prev, category: false }));
  };

  const handleSubCategorySelect = (subCategory: string) => {
    setFormData(prev => ({
      ...prev,
      subCategory,
      subSubCategory: ''
    }));
    setDropdowns(prev => ({ ...prev, subCategory: false }));
  };

  const handleSubSubCategorySelect = (subSubCategory: string) => {
    setFormData(prev => ({ ...prev, subSubCategory }));
    setDropdowns(prev => ({ ...prev, subSubCategory: false }));
  };

  const handleAddItem = () => {
    if (newItem.productName.trim() && newItem.uom) {
      const item: RFQItem = {
        id: Date.now().toString(),
        productName: newItem.productName.trim(),
        uom: newItem.uom
      };
      setFormData(prev => ({
        ...prev,
        items: [...prev.items, item]
      }));
      setNewItem({ productName: '', uom: '' });
    }
  };

  const handleRemoveItem = (id: string) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onSave(formData);
    handleClose();
  };

  const handleClose = () => {
    setCurrentStep(1);
    setFormData({
      title: '',
      category: '',
      subCategory: '',
      subSubCategory: '',
      items: []
    });
    setNewItem({ productName: '', uom: '' });
    setDropdowns({ category: false, subCategory: false, subSubCategory: false });
    onClose();
  };

  const isStep1Valid = () => {
    return formData.title.trim() && formData.category && formData.subCategory;
  };

  const isStep2Valid = () => {
    return formData.items.length > 0;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end lg:items-center justify-center">
      <div className="bg-white w-full h-full lg:h-auto lg:max-w-2xl lg:rounded-xl lg:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 lg:p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="text-purple-600" size={24} />
            <h2 className="text-xl font-medium text-gray-900">Create RFQ Template</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-4 lg:px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  currentStep >= step.number
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step.number}
                </div>
                <div className="ml-3 hidden lg:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-purple-600' : 'text-gray-600'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 lg:w-20 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-purple-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="p-4 lg:p-6">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
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
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                              formData.category === category ? 'bg-purple-50 text-purple-700' : 'text-gray-700'
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
                              formData.subCategory === subCategory ? 'bg-purple-50 text-purple-700' : 'text-gray-700'
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
                              formData.subSubCategory === subSubCategory ? 'bg-purple-50 text-purple-700' : 'text-gray-700'
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
            </div>
          )}

          {/* Step 2: Add Items */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Add Items to Template</h3>
                
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <select
                        value={newItem.uom}
                        onChange={(e) => setNewItem(prev => ({ ...prev, uom: e.target.value }))}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Items List */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Template Items ({formData.items.length})</h4>
                  {formData.items.length > 0 ? (
                    <div className="space-y-2">
                      {formData.items.map((item, index) => (
                        <div key={item.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4">
                              <span className="text-sm font-medium text-gray-500 w-8">#{index + 1}</span>
                              <span className="font-medium text-gray-900">{item.productName}</span>
                              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                {item.uom}
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                      <p>No items added yet. Add your first item above.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Review Template</h3>
                
                {/* Template Summary */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-purple-900 mb-3">Template Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-purple-700">Title:</span>
                      <span className="ml-2 font-medium text-purple-900">{formData.title}</span>
                    </div>
                    <div>
                      <span className="text-purple-700">Category:</span>
                      <span className="ml-2 font-medium text-purple-900">
                        {formData.category} → {formData.subCategory}
                        {formData.subSubCategory && ` → ${formData.subSubCategory}`}
                      </span>
                    </div>
                    <div>
                      <span className="text-purple-700">Items:</span>
                      <span className="ml-2 font-medium text-purple-900">{formData.items.length} items</span>
                    </div>
                  </div>
                </div>

                {/* Items Preview */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Items List</h4>
                  <div className="space-y-2">
                    {formData.items.map((item, index) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <span className="text-sm font-medium text-gray-500 w-8">#{index + 1}</span>
                          <span className="font-medium text-gray-900">{item.productName}</span>
                          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            {item.uom}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={currentStep === 1 ? handleClose : handlePrevious}
              className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {currentStep === 1 ? (
                <>
                  <X size={16} className="mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <ArrowLeft size={16} className="mr-2" />
                  Previous
                </>
              )}
            </button>

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={currentStep === 1 ? !isStep1Valid() : !isStep2Valid()}
                className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <ArrowRight size={16} className="ml-2" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                <Save size={16} className="mr-2" />
                Save Template
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCreateForm;