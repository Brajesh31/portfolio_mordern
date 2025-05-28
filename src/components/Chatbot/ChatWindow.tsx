import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Paperclip } from 'lucide-react';
import ChatMessage from './ChatMessage';

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatWindowProps {
  onClose: () => void;
}

type AIProvider = 'openai' | 'deepseek' | 'openrouter';

const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi! I'm Brajesh's AI assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      text: input,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Cancel any existing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new AbortController for this request
      abortControllerRef.current = new AbortController();

      const openAIKey = import.meta.env.VITE_OPENAI_API_KEY;
      const deepseekKey = import.meta.env.VITE_DEEPSEEK_API_KEY;
      const openrouterKey = import.meta.env.VITE_OPENROUTER_API_KEY;
      const siteUrl = import.meta.env.VITE_SITE_URL;

      // Determine which AI provider to use based on available keys
      let provider: AIProvider = 'openrouter';
      if (openAIKey) provider = 'openai';
      else if (deepseekKey) provider = 'deepseek';

      let response;
      let botResponse: string;

      switch (provider) {
        case 'openai':
          response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${openAIKey}`,
            },
            body: JSON.stringify({
              model: 'gpt-3.5-turbo',
              messages: [
                {
                  role: 'system',
                  content: "You are a helpful AI assistant for Brajesh's portfolio website. Be concise, professional, and friendly."
                },
                {
                  role: 'user',
                  content: input
                }
              ],
              temperature: 0.7
            }),
            signal: abortControllerRef.current.signal
          });
          break;

        case 'deepseek':
          response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${deepseekKey}`,
            },
            body: JSON.stringify({
              model: 'deepseek-chat',
              messages: [
                {
                  role: 'system',
                  content: "You are a helpful AI assistant for Brajesh's portfolio website. Be concise, professional, and friendly."
                },
                {
                  role: 'user',
                  content: input
                }
              ]
            }),
            signal: abortControllerRef.current.signal
          });
          break;

        default: // openrouter
          if (!openrouterKey || !siteUrl) {
            throw new Error('Missing OpenRouter configuration');
          }
          response = await fetch('https://api.openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${openrouterKey}`,
              'HTTP-Referer': siteUrl,
              'X-Title': 'Portfolio AI Chatbot'
            },
            body: JSON.stringify({
              model: 'openchat/openchat-3.5-0106:free',
              messages: [
                {
                  role: 'system',
                  content: "You are a helpful AI assistant for Brajesh's portfolio website. Be concise, professional, and friendly."
                },
                {
                  role: 'user',
                  content: input
                }
              ]
            }),
            signal: abortControllerRef.current.signal
          });
      }

      if (!response.ok) {
        console.error('API Error:', response.status, response.statusText);
        botResponse = "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.";
      } else {
        try {
          const data = await response.json();
          botResponse = data.choices?.[0]?.message?.content?.trim() || 
            "I couldn't generate a proper response. Please try rephrasing your question.";
        } catch (error) {
          console.error('Response parsing error:', error);
          botResponse = "I encountered an issue processing the response. Please try again.";
        }
      }

      const botMessage = {
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      
      let errorMessage = "I apologize, but I'm having trouble connecting right now. Please try again later.";
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = "The request took too long. Please try a shorter message.";
        } else if (error.message.includes('configuration')) {
          errorMessage = "I'm currently unavailable due to a configuration issue. Please contact the site administrator.";
        }
      }

      setMessages(prev => [...prev, {
        text: errorMessage,
        isBot: true,
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMessages(prev => [...prev, {
        text: `Attached file: ${file.name}`,
        isBot: false,
        timestamp: new Date(),
      }]);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-2rem)] h-[600px] max-h-[80vh] 
      bg-light-card dark:bg-dark-card rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 
      flex flex-col overflow-hidden z-50">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
        <h3 className="font-semibold">Chat with AI Assistant</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <ChatMessage
            key={idx}
            message={msg.text}
            isBot={msg.isBot}
            timestamp={msg.timestamp}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={handleFileClick}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <Paperclip size={20} />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 focus:outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="p-2 bg-primary-500 hover:bg-primary-600 text-white rounded-full transition-colors disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
        <div className="text-xs text-center text-gray-500 mt-2">
          Powered by AI
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;