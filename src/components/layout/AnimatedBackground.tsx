import React from 'react';
import { motion } from 'framer-motion';

export const shapes = ["circle", "rectangle", "polygon", "hexagon"];

const Shape: React.FC<{ type: string; index: number }> = ({ type, index }) => {
  const baseStyles = "absolute opacity-10 dark:opacity-5 pointer-events-none backdrop-blur-3xl";
  const colors = [
    'bg-primary-500',
    'bg-secondary-500',
    'bg-accent-500',
    'bg-primary-400',
    'bg-secondary-400'
  ];

  const getRandomPosition = () => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    transform: `scale(${0.5 + Math.random() * 1.5})`,
  });

  const getShapeStyles = () => {
    switch (type) {
      case 'circle':
        return 'rounded-full w-32 h-32';
      case 'rectangle':
        return 'w-40 h-24 rotate-45';
      case 'polygon':
        return 'w-32 h-32 clip-path-polygon transform-gpu';
      case 'hexagon':
        return 'w-32 h-32 clip-path-hexagon';
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
    return [...acc, ...Array(4).fill(shape)]; // 4 instances of each shape
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