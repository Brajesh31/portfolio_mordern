import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeProvider';

interface ThemeAwareImageProps {
  darkSrc: string;
  lightSrc: string;
  alt: string;
  className?: string;
}

const ThemeAwareImage: React.FC<ThemeAwareImageProps> = ({
  darkSrc,
  lightSrc,
  alt,
  className = '',
}) => {
  const { theme } = useTheme();

  return (
    <AnimatePresence mode="wait">
      <motion.img
        key={theme}
        src={theme === 'dark' ? darkSrc : lightSrc}
        alt={alt}
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />
    </AnimatePresence>
  );
};

export default ThemeAwareImage;