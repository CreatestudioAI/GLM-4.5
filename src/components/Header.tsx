import React from 'react';
import { Menu, Plus, User } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
      <div className="flex items-center space-x-3">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
        <button className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Plus className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">New chat</span>
        </button>
      </div>
      
      <div className="flex items-center space-x-3">
        <div className="text-sm font-medium text-gray-900">GLM-4.5</div>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <User className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </header>
  );
};

export default Header;