import React, { useState } from 'react';
import { X, Users, Check } from 'lucide-react';

interface TeamSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (selectedTeam: string[]) => void;
  teamMembers: string[];
  selectedMembers: string[];
}

const TeamSelector: React.FC<TeamSelectorProps> = ({
  isOpen,
  onClose,
  onSave,
  teamMembers,
  selectedMembers
}) => {
  const [selected, setSelected] = useState<string[]>(selectedMembers);

  const handleToggle = (member: string) => {
    setSelected(prev => 
      prev.includes(member)
        ? prev.filter(m => m !== member)
        : [...prev, member]
    );
  };

  const handleSave = () => {
    onSave(selected);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Users size={20} className="text-blue-600" />
            <h3 className="text-lg font-medium text-gray-900">Select Team</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Team Members List */}
        <div className="p-4 max-h-80 overflow-y-auto">
          <div className="space-y-2">
            {teamMembers.map((member) => (
              <label
                key={member}
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(member)}
                  onChange={() => handleToggle(member)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">
                    {getInitials(member)}
                  </span>
                </div>
                <span className="text-sm text-gray-700">{member}</span>
                {selected.includes(member) && (
                  <Check size={16} className="text-blue-600 ml-auto" />
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex space-x-3 p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Save Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamSelector;