import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader, Copy, Check, ThumbsUp, ThumbsDown } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I understand you're asking about "${userMessage.content}". As GLM-4.5, I'm designed to help with complex reasoning, coding, and problem-solving tasks. I can assist you with a wide range of topics including:\n\n• Technical questions and programming\n• Data analysis and interpretation\n• Creative writing and content generation\n• Research and information synthesis\n• Mathematical and logical reasoning\n\nHow can I help you further with this topic?`,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const copyToClipboard = (text: string, messageId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(messageId);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const formatMessage = (content: string) => {
    return content.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < content.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center max-w-md">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Welcome to GLM-4.5
              </h2>
              <p className="text-gray-600 mb-6">
                I'm an advanced AI model designed for intelligent agents. I can help you with reasoning, coding, and complex problem-solving.
              </p>
              <div className="grid grid-cols-1 gap-3">
                <button
                  onClick={() => setInput("Explain quantum computing in simple terms")}
                  className="p-3 text-left text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Explain quantum computing in simple terms
                </button>
                <button
                  onClick={() => setInput("Help me debug this Python code")}
                  className="p-3 text-left text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Help me debug this Python code
                </button>
                <button
                  onClick={() => setInput("Write a creative story about AI")}
                  className="p-3 text-left text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Write a creative story about AI
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-6 max-w-3xl mx-auto">
            {messages.map((message) => (
              <div key={message.id} className="group">
                <div className="flex items-start space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gradient-to-br from-purple-500 to-blue-500 text-white'
                  }`}>
                    {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium text-gray-900">
                        {message.role === 'user' ? 'You' : 'GLM-4.5'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="prose prose-sm max-w-none text-gray-800 leading-relaxed">
                      {formatMessage(message.content)}
                    </div>
                    {message.role === 'assistant' && (
                      <div className="flex items-center space-x-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => copyToClipboard(message.content, message.id)}
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Copy message"
                        >
                          {copiedMessageId === message.id ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-500" />
                          )}
                        </button>
                        <button
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Good response"
                        >
                          <ThumbsUp className="w-4 h-4 text-gray-500" />
                        </button>
                        <button
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Bad response"
                        >
                          <ThumbsDown className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="group">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium text-gray-900">GLM-4.5</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Loader className="w-4 h-4 animate-spin text-gray-600" />
                      <span className="text-sm text-gray-600">Thinking...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Message GLM-4.5..."
              className="w-full resize-none border border-gray-300 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={1}
              style={{ minHeight: '52px', maxHeight: '200px' }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-3 bottom-3 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="text-xs text-gray-500 text-center mt-2">
            GLM-4.5 can make mistakes. Consider checking important information.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;