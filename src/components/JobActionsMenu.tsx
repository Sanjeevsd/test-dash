import React from 'react';
import { Edit, FolderX, Copy, RotateCcw } from 'lucide-react';

interface JobActionsMenuProps {
  onAction: (action: string) => void;
  onClose: () => void;
  isClosedJob?: boolean;
}

const JobActionsMenu: React.FC<JobActionsMenuProps> = ({ onAction, onClose, isClosedJob = false }) => {
  const actions = isClosedJob ? [
    { id: 'edit', label: 'Edit', icon: Edit, color: 'text-blue-600' },
    { id: 'duplicate', label: 'Duplicate', icon: Copy, color: 'text-gray-600' },
    { id: 'reopen', label: 'Reopen', icon: RotateCcw, color: 'text-green-600' }
  ] : [
    { id: 'edit', label: 'Edit', icon: Edit, color: 'text-blue-600' },
    { id: 'duplicate', label: 'Duplicate', icon: Copy, color: 'text-gray-600' },
    { id: 'close', label: 'Close', icon: FolderX, color: 'text-green-600' },
  ];

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />
      
      {/* Menu */}
      <div className="absolute top-full right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => onAction(action.id)}
            className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-50 transition-colors"
          >
            <action.icon size={16} className={action.color} />
            <span className="text-sm text-gray-700">{action.label}</span>
          </button>
        ))}
      </div>
    </>
  );
};

export default JobActionsMenu;