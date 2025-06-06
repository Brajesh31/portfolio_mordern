import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedJobTitleProps {
  titles: string[];
  duration?: number;
  className?: string;
}

const AnimatedJobTitle: React.FC<AnimatedJobTitleProps> = ({
  titles,
  duration = 3000,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % titles.length);
        setIsAnimating(false);
      }, 500);
    }, duration);

    return () => clearInterval(interval);
  }, [titles.length, duration]);

  return (
    <div className={`relative h-[1.5em] ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 text-transparent bg-clip-text"
        >
          {titles[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedJobTitle;