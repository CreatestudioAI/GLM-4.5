import React from 'react';
import { motion } from 'framer-motion';
import { Download, ExternalLink, Cpu, HardDrive, Zap } from 'lucide-react';

const ModelInfo: React.FC = () => {
  const models = [
    {
      name: 'GLM-4.5',
      size: '355B-A32B',
      precision: 'BF16',
      description: 'Full-featured model with maximum performance',
      huggingface: 'https://huggingface.co/zai-org/GLM-4.5',
      modelscope: 'https://modelscope.cn/models/ZhipuAI/GLM-4.5'
    },
    {
      name: 'GLM-4.5-Air',
      size: '106B-A12B',
      precision: 'BF16',
      description: 'Compact design with competitive performance',
      huggingface: 'https://huggingface.co/zai-org/GLM-4.5-Air',
      modelscope: 'https://modelscope.cn/models/ZhipuAI/GLM-4.5-Air'
    },
    {
      name: 'GLM-4.5-FP8',
      size: '355B-A32B',
      precision: 'FP8',
      description: 'Optimized precision for better efficiency',
      huggingface: 'https://huggingface.co/zai-org/GLM-4.5-FP8',
      modelscope: 'https://modelscope.cn/models/ZhipuAI/GLM-4.5-FP8'
    },
    {
      name: 'GLM-4.5-Air-FP8',
      size: '106B-A12B',
      precision: 'FP8',
      description: 'Compact model with FP8 optimization',
      huggingface: 'https://huggingface.co/zai-org/GLM-4.5-Air-FP8',
      modelscope: 'https://modelscope.cn/models/ZhipuAI/GLM-4.5-Air-FP8'
    }
  ];

  const requirements = [
    {
      model: 'GLM-4.5',
      precision: 'BF16',
      gpu: 'H100 x 16 / H200 x 8',
      framework: 'sglang'
    },
    {
      model: 'GLM-4.5',
      precision: 'FP8',
      gpu: 'H100 x 8 / H200 x 4',
      framework: 'sglang'
    },
    {
      model: 'GLM-4.5-Air',
      precision: 'BF16',
      gpu: 'H100 x 4 / H200 x 2',
      framework: 'sglang'
    },
    {
      model: 'GLM-4.5-Air',
      precision: 'FP8',
      gpu: 'H100 x 2 / H200 x 1',
      framework: 'sglang'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Model Downloads</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Choose from our collection of foundation models and optimized variants
        </p>
      </motion.div>

      {/* Models Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
      >
        {models.map((model, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{model.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{model.description}</p>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-blue-600 mb-1">{model.size}</div>
                <div className="text-xs text-gray-500">{model.precision}</div>
              </div>
            </div>

            <div className="flex space-x-3">
              <motion.a
                href={model.huggingface}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-md transition-all duration-300 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-4 h-4" />
                <span>Hugging Face</span>
                <ExternalLink className="w-3 h-3" />
              </motion.a>
              <motion.a
                href={model.modelscope}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-md transition-all duration-300 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-4 h-4" />
                <span>ModelScope</span>
                <ExternalLink className="w-3 h-3" />
              </motion.a>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* System Requirements */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl p-8 border border-gray-200"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">System Requirements</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Model</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Precision</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">GPU Requirements</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Framework</th>
              </tr>
            </thead>
            <tbody>
              {requirements.map((req, index) => (
                <motion.tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <td className="py-3 px-4 font-medium text-gray-900">{req.model}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      req.precision === 'FP8' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {req.precision}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{req.gpu}</td>
                  <td className="py-3 px-4 text-gray-600">{req.framework}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-start space-x-3">
            <Zap className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-yellow-800 mb-1">Performance Notes</h4>
              <p className="text-sm text-yellow-700">
                All configurations use MTP layers with speculative decoding for optimal inference speed. 
                Server memory must exceed 1TB for normal operation.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ModelInfo;