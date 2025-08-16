import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Globe, Code } from 'lucide-react';

const Hero: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: 'High Performance',
      description: '355B total parameters with 32B active parameters for optimal efficiency'
    },
    {
      icon: Shield,
      title: 'Hybrid Reasoning',
      description: 'Two modes: thinking mode for complex reasoning and non-thinking mode for immediate responses'
    },
    {
      icon: Globe,
      title: 'Versatile Applications',
      description: 'Unifies reasoning, coding, and intelligent agent capabilities'
    },
    {
      icon: Code,
      title: 'Open Source',
      description: 'Released under MIT license for commercial use and secondary development'
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                GLM-4.5
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Advanced foundation models designed for intelligent agents with exceptional performance 
              in reasoning, coding, and complex problem-solving
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.button
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Try GLM-4.5</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View Documentation
            </motion.button>
          </motion.div>

          {/* Performance Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          >
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">63.2</div>
              <div className="text-gray-600">Benchmark Score</div>
              <div className="text-sm text-gray-500 mt-1">3rd place among all models</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
              <div className="text-3xl font-bold text-purple-600 mb-2">355B</div>
              <div className="text-gray-600">Total Parameters</div>
              <div className="text-sm text-gray-500 mt-1">32B active parameters</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
              <div className="text-3xl font-bold text-indigo-600 mb-2">128K</div>
              <div className="text-gray-600">Context Length</div>
              <div className="text-sm text-gray-500 mt-1">Extended context support</div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;