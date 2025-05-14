import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';

interface Message {
  sender: 'user' | 'bot';
  message: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isBot ? '' : 'flex-row-reverse'}`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isBot ? 'bg-primary-900/30' : 'bg-secondary-900/30'
        }`}
      >
        {isBot ? (
          <Bot className="w-5 h-5 text-primary-400" />
        ) : (
          <User className="w-5 h-5 text-secondary-400" />
        )}
      </div>
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          isBot
            ? 'bg-dark-300 text-white'
            : 'bg-primary-600/10 text-primary-400'
        }`}
      >
        {message.message}
      </div>
    </motion.div>
  );
};