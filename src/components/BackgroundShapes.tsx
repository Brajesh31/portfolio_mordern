import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const shapes = ['circle', 'rectangle', 'polygon'] as const;

type Shape = {
  id: number;
  type: typeof shapes[number];
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  points?: number[];
};

interface BackgroundShapesProps {
  count?: number;
  colors?: string[];
  minSize?: number;
  maxSize?: number;
}

const defaultColors = [
  'rgba(59, 130, 246, 0.2)', // blue
  'rgba(16, 185, 129, 0.2)', // green
  'rgba(236, 72, 153, 0.2)', // pink
  'rgba(245, 158, 11, 0.2)', // yellow
  'rgba(139, 92, 246, 0.2)', // purple
];

const generateRandomShape = (
  width: number,
  height: number,
  colors: string[],
  minSize: number,
  maxSize: number
): Shape => {
  const type = shapes[Math.floor(Math.random() * shapes.length)];
  const size = Math.random() * (maxSize - minSize) + minSize;
  
  // Ensure shapes stay within viewport bounds
  const x = Math.random() * (width - size);
  const y = Math.random() * (height - size);
  
  return {
    id: Math.random(),
    type,
    x,
    y,
    size,
    color: colors[Math.floor(Math.random() * colors.length)],
    rotation: Math.random() * 360,
    points: type === 'polygon' ? Array.from({ length: 3 + Math.floor(Math.random() * 4) }, () => Math.random()) : undefined,
  };
};

const ShapeComponent: React.FC<{ shape: Shape }> = ({ shape }) => {
  const commonMotionProps = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    whileHover: {
      scale: 1.2,
      rotate: shape.rotation + Math.random() * 90 - 45,
      y: -10,
      filter: 'brightness(1.2)',
      boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
      transition: { duration: 0.3 },
    },
    style: {
      position: 'absolute',
      left: shape.x,
      top: shape.y,
      backgroundColor: shape.color,
      width: shape.size,
      height: shape.type === 'circle' ? shape.size : shape.type === 'rectangle' ? shape.size * 0.75 : shape.size,
      rotate: `${shape.rotation}deg`,
    },
  };

  switch (shape.type) {
    case 'circle':
      return <motion.div {...commonMotionProps} className="rounded-full" />;
    case 'rectangle':
      return <motion.div {...commonMotionProps} className="rounded-lg" />;
    case 'polygon':
      return (
        <motion.div
          {...commonMotionProps}
          style={{
            ...commonMotionProps.style,
            clipPath: `polygon(${shape.points?.map((p, i) => {
              const angle = (i / (shape.points?.length || 1)) * Math.PI * 2;
              const radius = shape.size / 2 * (0.5 + p * 0.5);
              const x = 50 + Math.cos(angle) * radius;
              const y = 50 + Math.sin(angle) * radius;
              return `${x}% ${y}%`;
            }).join(', ')})`,
          }}
        />
      );
    default:
      return null;
  }
};

export const BackgroundShapes: React.FC<BackgroundShapesProps> = ({
  count = 15,
  colors = defaultColors,
  minSize = 50,
  maxSize = 200,
}) => {
  const [shapes, setShapes] = useState<Shape[]>([]);

  useEffect(() => {
    const generateShapes = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      return Array.from({ length: count }, () =>
        generateRandomShape(width, height, colors, minSize, maxSize)
      );
    };

    setShapes(generateShapes());

    const handleResize = () => {
      setShapes(generateShapes());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [count, colors, minSize, maxSize]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="relative w-full h-full">
        {shapes.map((shape) => (
          <ShapeComponent key={shape.id} shape={shape} />
        ))}
      </div>
    </div>
  );
};