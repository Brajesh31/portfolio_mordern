import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeProvider';

const LoadingScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();
  const [text, setText] = useState('');
  const fullText = 'Hello Developers, Freelancers, Innovators...';
  
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      clearInterval(typingInterval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`fixed inset-0 z-50 flex items-center justify-center
            ${theme === 'dark' 
              ? 'bg-gradient-to-br from-dark-300 via-dark-400 to-dark-500' 
              : 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200'}`}
        >
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-2xl md:text-4xl font-bold mb-8 
                bg-gradient-to-r from-primary-400 to-secondary-400 
                text-transparent bg-clip-text`}
            >
              {text}
            </motion.h1>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center gap-2"
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                  className="w-3 h-3 rounded-full bg-primary-500"
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;