import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import ModelInfo from './components/ModelInfo';
import ChatInterface from './components/ChatInterface';
import Documentation from './components/Documentation';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'chat':
        return <ChatInterface />;
      case 'models':
        return <ModelInfo />;
      case 'docs':
        return <Documentation />;
      default:
        return <Hero />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <AnimatePresence mode="wait">
        <motion.main
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="pt-20"
        >
          {renderSection()}
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default App;