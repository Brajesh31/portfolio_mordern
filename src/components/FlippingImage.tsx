import React from 'react';
import { motion } from 'framer-motion';
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
  const { theme } = useTheme();

  return (
    <div 
      className={`perspective-1000 ${className}`}
      role="img"
      aria-label={alt}
    >
      <motion.div
        initial={false}
        whileHover={{ rotateY: 180 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className="preserve-3d relative w-full h-full"
      >
        {/* Front */}
        <motion.div
          className="absolute inset-0 backface-hidden rounded-xl overflow-hidden
            shadow-lg hover:shadow-xl transition-shadow duration-300
            border-2 border-primary-500/20"
        >
          <img
            src={theme === 'dark' ? frontDark : frontLight}
            alt={alt}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Back */}
        <motion.div
          className="absolute inset-0 backface-hidden rounded-xl overflow-hidden
            shadow-lg hover:shadow-xl transition-shadow duration-300
            border-2 border-primary-500/20"
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

export default FlippingImage;