import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeProvider';

interface FlippingImageProps {
  frontLight: string;
  frontDark: string;
  backLight: string;
  backDark: string;
  alt: string;
  className?: string;
}

const FlippingImage: React.FC<FlippingImageProps> = ({
  frontLight,
  frontDark,
  backLight,
  backDark,
  alt,
  className = ''
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { theme } = useTheme();

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className={`perspective-1000 cursor-pointer ${className}`}
      onClick={handleFlip}
      onKeyPress={(e) => e.key === 'Enter' && handleFlip()}
      role="button"
      tabIndex={0}
      aria-label="Flip image"
    >
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className="preserve-3d relative w-full h-full"
      >
        {/* Front */}
        <motion.div
          className={`absolute inset-0 backface-hidden rounded-full overflow-hidden
            shadow-lg hover:shadow-xl transition-shadow duration-300
            ${isFlipped ? 'pointer-events-none' : ''}`}
        >
          <img
            src={theme === 'dark' ? frontDark : frontLight}
            alt={alt}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Back */}
        <motion.div
          className={`absolute inset-0 backface-hidden rounded-full overflow-hidden
            shadow-lg hover:shadow-xl transition-shadow duration-300
            ${!isFlipped ? 'pointer-events-none' : ''}`}
          style={{ transform: 'rotateY(180deg)' }}
        >
          <img
            src={theme === 'dark' ? backDark : backLight}
            alt={`${alt} - alternate`}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};