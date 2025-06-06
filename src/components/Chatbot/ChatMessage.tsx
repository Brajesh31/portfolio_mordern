import React from 'react';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isBot, timestamp }) => {
  return (
    <div className={`flex gap-3 ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center
        ${isBot ? 'bg-primary-100 dark:bg-primary-900' : 'bg-secondary-100 dark:bg-secondary-900'}`}>
        {isBot ? <Bot size={18} /> : <User size={18} />}
      </div>
      <div className={`max-w-[80%] break-words ${isBot ? 'mr-13' : 'ml-13'}`}>
        <div className={`rounded-2xl px-4 py-2 ${
          isBot 
            ? 'bg-light-card dark:bg-dark-card' 
            : 'bg-primary-500 text-white'
        }`}>
          {message}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {timestamp.toLocaleTimeString([], { hour: '4-digit', minute: '4-digit' })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;