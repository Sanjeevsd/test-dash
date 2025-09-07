import React, { useState } from 'react';
import { X, FileText, Plus, Trash2, ToggleLeft, ToggleRight, Save } from 'lucide-react';

interface DocumentRequirement {
  id: string;
  name: string;
  isMandatory: boolean;
}

interface DocumentRequirementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (requirements: DocumentRequirement[]) => void;
}

const DocumentRequirementsModal: React.FC<DocumentRequirementsModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [requirements, setRequirements] = useState<DocumentRequirement[]>([
    { id: '1', name: 'Business License', isMandatory: true },
    { id: '2', name: 'Tax Certificate', isMandatory: true },
    { id: '3', name: 'Insurance Certificate', isMandatory: false }
  ]);
  
  const [newRequirement, setNewRequirement] = useState('');

  const handleAddRequirement = () => {
    if (newRequirement.trim()) {
      const requirement: DocumentRequirement = {
        id: Date.now().toString(),
        name: newRequirement.trim(),
        isMandatory: false
      };
      setRequirements(prev => [...prev, requirement]);
      setNewRequirement('');
    }
  };

  const handleRemoveRequirement = (id: string) => {
    setRequirements(prev => prev.filter(req => req.id !== id));
  };

  const handleToggleMandatory = (id: string) => {
    setRequirements(prev => prev.map(req => 
      req.id === id ? { ...req, isMandatory: !req.isMandatory } : req
    ));
  };

  const handleSave = () => {
    onSave(requirements);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end lg:items-center justify-center">
      <div className="bg-white w-full h-full lg:h-auto lg:max-w-md lg:rounded-xl lg:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 lg:p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="text-blue-600" size={24} />
            <h2 className="text-xl font-medium text-gray-900">Document Requirements</h2>
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
          {/* Add New Requirement */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add Document Requirement
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Enter document name"
                value={newRequirement}
                onChange={(e) => setNewRequirement(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddRequirement()}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleAddRequirement}
                disabled={!newRequirement.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Requirements List */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Document Requirements ({requirements.length})</h3>
            {requirements.length > 0 ? (
              <div className="space-y-3">
                {requirements.map((requirement) => (
                  <div key={requirement.id} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{requirement.name}</h4>
                      <p className="text-sm text-gray-600">
                        {requirement.isMandatory ? 'Mandatory' : 'Optional'}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleToggleMandatory(requirement.id)}
                        className="flex items-center space-x-2 px-3 py-1 rounded-lg transition-colors"
                        title={requirement.isMandatory ? 'Make Optional' : 'Make Mandatory'}
                      >
                        {requirement.isMandatory ? (
                          <ToggleRight size={20} className="text-blue-600" />
                        ) : (
                          <ToggleLeft size={20} className="text-gray-400" />
                        )}
                        <span className={`text-xs font-medium ${
                          requirement.isMandatory ? 'text-blue-600' : 'text-gray-500'
                        }`}>
                          {requirement.isMandatory ? 'Required' : 'Optional'}
                        </span>
                      </button>
                      <button
                        onClick={() => handleRemoveRequirement(requirement.id)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                <p>No document requirements added yet.</p>
              </div>
            )}
          </div>

          {/* Info Notice */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <FileText size={16} className="text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">Document Request</p>
                <p className="text-xs text-blue-700 mt-1">
                  These documents will be requested from the supplier via email. Mandatory documents must be provided before approval.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 lg:p-6">
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Save size={16} className="mr-2" />
              Save Requirements
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentRequirementsModal;