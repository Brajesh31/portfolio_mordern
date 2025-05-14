import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import io from 'socket.io-client';

interface Message {
  sender: 'user' | 'bot';
  message: string;
  timestamp: Date;
}

const BACKEND_URL = 'http://localhost:5000';
const socket = io(BACKEND_URL);

export const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => uuidv4());

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/chat/history/${sessionId}`);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    fetchHistory();

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    return () => {
      socket.disconnect();
    };
  }, [sessionId]);

  const sendMessage = async (message: string) => {
    try {
      setIsLoading(true);
      
      // Add user message immediately
      const userMessage: Message = {
        sender: 'user',
        message,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);

      // Send to backend
      const response = await fetch(`${BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message, sessionId })
      });

      const data = await response.json();

      // Add bot response
      const botMessage: Message = {
        sender: 'bot',
        message: data.message,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    sendMessage,
    sessionId
  };
};