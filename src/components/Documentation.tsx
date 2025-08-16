import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, Code, Terminal, Cpu, ExternalLink, Copy, Check } from 'lucide-react';

const Documentation: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const quickStartCode = `import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

MODEL_PATH = "zai-org/GLM-4.5"
messages = [{"role": "user", "content": "Hello!"}]

tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
inputs = tokenizer.apply_chat_template(
    messages,
    tokenize=True,
    add_generation_prompt=True,
    return_dict=True,
    return_tensors="pt",
)

model = AutoModelForCausalLM.from_pretrained(
    pretrained_model_name_or_path=MODEL_PATH,
    torch_dtype=torch.bfloat16,
    device_map="auto",
)

inputs = inputs.to(model.device)
generated_ids = model.generate(**inputs, max_new_tokens=128, do_sample=False)
output_text = tokenizer.decode(generated_ids[0][inputs.input_ids.shape[1]:])
print(output_text)`;

  const vllmCode = `vllm serve zai-org/GLM-4.5-Air \\
    --tensor-parallel-size 8 \\
    --tool-call-parser glm45 \\
    --reasoning-parser glm45 \\
    --enable-auto-tool-choice \\
    --served-model-name glm-4.5-air`;

  const sglangCode = `python3 -m sglang.launch_server \\
  --model-path zai-org/GLM-4.5-Air \\
  --tp-size 8 \\
  --tool-call-parser glm45 \\
  --reasoning-parser glm45 \\
  --speculative-algorithm EAGLE \\
  --speculative-num-steps 3 \\
  --speculative-eagle-topk 1 \\
  --speculative-num-draft-tokens 4 \\
  --mem-fraction-static 0.7 \\
  --served-model-name glm-4.5-air \\
  --host 0.0.0.0 \\
  --port 8000`;

  const apiCode = `from openai import OpenAI

client = OpenAI(
    api_key="EMPTY",
    base_url="http://127.0.0.1:8000/v1",
)

completion = client.chat.completions.create(
    model="glm-4.5-air",
    messages=[
        {"role": "user", "content": "Hello, GLM-4.5!"}
    ],
    max_tokens=4096,
    temperature=0.0,
    # extra_body={"chat_template_kwargs": {"enable_thinking": False}}
)

print(completion.choices[0].message.content)`;

  const sections = [
    {
      id: 'quick-start',
      title: 'Quick Start',
      icon: Terminal,
      content: (
        <div className="space-y-6">
          <p className="text-gray-600">
            Get started with GLM-4.5 using transformers library. First, install the required packages:
          </p>
          <div className="bg-gray-900 rounded-lg p-4 relative">
            <button
              onClick={() => copyToClipboard('pip install -r requirements.txt', 'install')}
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
            >
              {copiedCode === 'install' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
            <code className="text-green-400 text-sm">pip install -r requirements.txt</code>
          </div>
          <p className="text-gray-600">Then use the following code to run inference:</p>
          <div className="bg-gray-900 rounded-lg p-4 relative">
            <button
              onClick={() => copyToClipboard(quickStartCode, 'quickstart')}
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
            >
              {copiedCode === 'quickstart' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{quickStartCode}</code>
            </pre>
          </div>
        </div>
      )
    },
    {
      id: 'vllm',
      title: 'vLLM Deployment',
      icon: Cpu,
      content: (
        <div className="space-y-6">
          <p className="text-gray-600">
            Deploy GLM-4.5 using vLLM for high-performance inference with support for both BF16 and FP8 precision:
          </p>
          <div className="bg-gray-900 rounded-lg p-4 relative">
            <button
              onClick={() => copyToClipboard(vllmCode, 'vllm')}
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
            >
              {copiedCode === 'vllm' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{vllmCode}</code>
            </pre>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> If using 8x H100 GPUs with GLM-4.5 and encountering memory issues, 
              add <code className="bg-yellow-100 px-1 rounded">--cpu-offload-gb 16</code> parameter.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'sglang',
      title: 'SGLang Deployment',
      icon: Code,
      content: (
        <div className="space-y-6">
          <p className="text-gray-600">
            Deploy GLM-4.5 using SGLang with speculative decoding for optimal performance:
          </p>
          <div className="bg-gray-900 rounded-lg p-4 relative">
            <button
              onClick={() => copyToClipboard(sglangCode, 'sglang')}
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
            >
              {copiedCode === 'sglang' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{sglangCode}</code>
            </pre>
          </div>
          <p className="text-gray-600">
            For FP8 models, add <code className="bg-gray-100 px-1 rounded">--disable-shared-experts-fusion</code> 
            and adjust the tensor parallel size accordingly.
          </p>
        </div>
      )
    },
    {
      id: 'api',
      title: 'API Usage',
      icon: Book,
      content: (
        <div className="space-y-6">
          <p className="text-gray-600">
            Once your model is deployed, you can interact with it using OpenAI-compatible API:
          </p>
          <div className="bg-gray-900 rounded-lg p-4 relative">
            <button
              onClick={() => copyToClipboard(apiCode, 'api')}
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
            >
              {copiedCode === 'api' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{apiCode}</code>
            </pre>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Key Features:</h4>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                <span><strong>Thinking Mode:</strong> Enabled by default for complex reasoning tasks</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                <span><strong>Tool Calling:</strong> Supports OpenAI-style function calling</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                <span><strong>Streaming:</strong> Real-time response streaming available</span>
              </li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  const [activeSection, setActiveSection] = useState('quick-start');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Documentation</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Complete guide to deploying and using GLM-4.5 models
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-2xl p-6 border border-gray-200 sticky top-24">
            <h3 className="font-semibold text-gray-900 mb-4">Contents</h3>
            <nav className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <motion.button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-3 ${
                      activeSection === section.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                    whileHover={{ x: 4 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{section.title}</span>
                  </motion.button>
                );
              })}
            </nav>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">External Links</h4>
              <div className="space-y-2">
                <a
                  href="https://arxiv.org/abs/2508.06471"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Technical Report</span>
                </a>
                <a
                  href="https://z.ai/blog/glm-4.5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Technical Blog</span>
                </a>
                <a
                  href="https://github.com/THUDM/GLM-4.5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>GitHub Repository</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3"
        >
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                activeSection === section.id && (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                    </div>
                    {section.content}
                  </motion.div>
                )
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Documentation;