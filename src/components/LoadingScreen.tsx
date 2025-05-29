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
    }, 100); // Slowed down typing speed

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000); // Increased loading time

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
          transition={{ duration: 0.8 }}
          className={`fixed inset-0 z-[9999] flex items-center justify-center
            ${theme === 'dark' 
              ? 'bg-gradient-to-br from-dark-300 via-dark-400 to-dark-500' 
              : 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200'}`}
          style={{ backdropFilter: 'blur(10px)' }}
        >
          <div className="text-center px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`text-2xl md:text-4xl lg:text-5xl font-bold mb-8 
                bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-400 
                bg-size-200 animate-gradient text-transparent bg-clip-text`}
            >
              {text}
            </motion.h1>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center gap-3"
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                  className={`w-4 h-4 rounded-full 
                    ${theme === 'dark' 
                      ? 'bg-gradient-to-r from-primary-400 to-secondary-400' 
                      : 'bg-gradient-to-r from-primary-500 to-secondary-500'}`}
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