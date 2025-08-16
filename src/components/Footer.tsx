import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const links = [
    {
      title: 'Resources',
      items: [
        { name: 'Technical Report', href: 'https://arxiv.org/abs/2508.06471' },
        { name: 'Technical Blog', href: 'https://z.ai/blog/glm-4.5' },
        { name: 'Documentation', href: 'https://zhipu-ai.feishu.cn/wiki/Gv3swM0Yci7w7Zke9E0crhU7n7D' },
        { name: 'API Platform', href: 'https://docs.z.ai/guides/llm/glm-4.5' }
      ]
    },
    {
      title: 'Models',
      items: [
        { name: 'GLM-4.5', href: 'https://huggingface.co/zai-org/GLM-4.5' },
        { name: 'GLM-4.5-Air', href: 'https://huggingface.co/zai-org/GLM-4.5-Air' },
        { name: 'GLM-4.5-FP8', href: 'https://huggingface.co/zai-org/GLM-4.5-FP8' },
        { name: 'GLM-4.5-Air-FP8', href: 'https://huggingface.co/zai-org/GLM-4.5-Air-FP8' }
      ]
    },
    {
      title: 'Community',
      items: [
        { name: 'GitHub', href: 'https://github.com/THUDM/GLM-4.5' },
        { name: 'Discord', href: 'https://discord.gg/QR7SARHRxK' },
        { name: 'WeChat Group', href: '#' },
        { name: 'Try GLM-4.5', href: 'https://chat.z.ai' }
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <span className="text-xl font-bold">GLM-4.5</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Advanced foundation models designed for intelligent agents with exceptional performance 
              in reasoning, coding, and complex problem-solving.
            </p>
            <div className="flex items-center space-x-4">
              <motion.a
                href="https://github.com/THUDM/GLM-4.5"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Links */}
          {links.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1) }}
            >
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.name}>
                    <motion.a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors text-sm flex items-center space-x-1"
                      whileHover={{ x: 4 }}
                    >
                      <span>{item.name}</span>
                      <ExternalLink className="w-3 h-3" />
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="border-t border-gray-800 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">
              © 2025 Zhipu AI. Licensed under the Apache License 2.0.
            </p>
            <div className="flex items-center space-x-1 text-gray-400 text-sm mt-4 md:mt-0">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>for the AI community</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;