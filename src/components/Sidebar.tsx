import React from 'react';
import { X, MessageSquare, Settings, HelpCircle, LogOut } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const conversations = [
    { id: 1, title: 'GLM-4.5 Introduction', time: '2 hours ago' },
    { id: 2, title: 'Code Review Help', time: '1 day ago' },
    { id: 3, title: 'Data Analysis Task', time: '3 days ago' },
    { id: 4, title: 'Writing Assistant', time: '1 week ago' },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">GLM-4.5</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                Recent Conversations
              </h3>
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                >
                  <div className="flex items-start space-x-3">
                    <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5 group-hover:text-gray-600" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {conversation.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {conversation.time}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4 space-y-2">
            <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <HelpCircle className="w-4 h-4" />
              <span>Help & Support</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;