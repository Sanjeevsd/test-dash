import React, { useState } from 'react';
import { X, Save, Plus, Calendar, Users } from 'lucide-react';

interface SubtaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { title: string; assignedTeam: string[]; dueDate: string }) => void;
  teamMembers: string[];
}

const SubtaskForm: React.FC<SubtaskFormProps> = ({
  isOpen,
  onClose,
  onSave,
  teamMembers
}) => {
  const [formData, setFormData] = useState({
    title: '',
    assignedTeam: [] as string[],
    dueDate: ''
  });

  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onSave(formData);
      setFormData({ title: '', assignedTeam: [], dueDate: '' });
    }
  };

  const handleTeamToggle = (member: string) => {
    setFormData(prev => ({
      ...prev,
      assignedTeam: prev.assignedTeam.includes(member)
        ? prev.assignedTeam.filter(m => m !== member)
        : [...prev.assignedTeam, member]
    }));
  };

  const handleClose = () => {
    setFormData({ title: '', assignedTeam: [], dueDate: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Add Subtask</h3>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Subtask Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subtask Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
              placeholder="Enter subtask title"
            />
          </div>

          {/* Assign Team */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assign Team
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsTeamDropdownOpen(!isTeamDropdownOpen)}
                className="w-full flex items-center justify-between px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm text-gray-700">
                  {formData.assignedTeam.length > 0 
                    ? `${formData.assignedTeam.length} member(s) selected`
                    : 'Select team members'
                  }
                </span>
                <Users size={16} className="text-gray-400" />
              </button>

              {isTeamDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                  {teamMembers.map((member) => (
                    <label
                      key={member}
                      className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.assignedTeam.includes(member)}
                        onChange={() => handleTeamToggle(member)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{member}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            
            {/* Selected Team Members */}
            {formData.assignedTeam.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {formData.assignedTeam.map((member) => (
                  <span
                    key={member}
                    className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                  >
                    {member}
                    <button
                      type="button"
                      onClick={() => handleTeamToggle(member)}
                      className="ml-1 hover:text-blue-900"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Due Date
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
            />
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              <Save size={16} className="mr-2" />
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubtaskForm;