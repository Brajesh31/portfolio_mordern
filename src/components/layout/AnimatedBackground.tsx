import React from 'react';
import { motion } from 'framer-motion';

export const shapes = ["circle", "rectangle", "polygon"];

const Shape: React.FC<{ type: string; index: number }> = ({ type, index }) => {
  const baseStyles = "absolute opacity-10 dark:opacity-5 pointer-events-none";
  const colors = [
    'bg-primary-500',
    'bg-secondary-500',
    'bg-accent-500'
  ];

  const getRandomPosition = () => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
  });

  const getShapeStyles = () => {
    switch (type) {
      case 'circle':
        return 'rounded-full w-32 h-32';
      case 'rectangle':
        return 'w-40 h-24 rotate-45';
      case 'polygon':
        return 'w-32 h-32 rotate-45 transform-gpu';
      default:
        return '';
    }
  };

  const animation = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const,
      }
    }
  };

  const floatAnimation = {
    y: [0, 15, 0],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "linear"
    }
  };

  return (
    <motion.div
      className={`${baseStyles} ${getShapeStyles()} ${colors[index % colors.length]}`}
      style={getRandomPosition()}
      {...animation}
      animate={{
        ...animation.animate,
        ...floatAnimation
      }}
    />
  );
};

const AnimatedBackground = () => {
  // Create multiple instances of each shape type
  const shapesArray = shapes.reduce((acc, shape) => {
    return [...acc, ...Array(3).fill(shape)]; // 3 instances of each shape
  }, [] as string[]);

  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      {shapesArray.map((shape, index) => (
        <Shape key={`${shape}-${index}`} type={shape} index={index} />
      ))}
    </div>
  );
};

export default AnimatedBackground;