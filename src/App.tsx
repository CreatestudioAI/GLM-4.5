import React, { useState } from 'react';
import Header from './components/Header';
import ChatInterface from './components/ChatInterface';
import Sidebar from './components/Sidebar';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-white">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <ChatInterface />
      </div>
    </div>
  );
}

export default App;