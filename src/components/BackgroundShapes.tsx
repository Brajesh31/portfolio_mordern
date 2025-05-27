import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import { useTheme } from './ThemeProvider';

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
  initialX: number;
  initialY: number;
};

interface BackgroundShapesProps {
  count?: number;
  colors?: string[];
  minSize?: number;
  maxSize?: number;
  attractionRadius?: number;
  attractionStrength?: number;
}

const generateRandomShape = (
  width: number,
  height: number,
  colors: string[],
  minSize: number,
  maxSize: number
): Shape => {
  const type = shapes[Math.floor(Math.random() * shapes.length)];
  const size = Math.random() * (maxSize - minSize) + minSize;
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
    initialX: x,
    initialY: y,
  };
};

const ShapeComponent: React.FC<{
  shape: Shape;
  mouseX: number;
  mouseY: number;
  attractionRadius: number;
  attractionStrength: number;
}> = ({ shape, mouseX, mouseY, attractionRadius, attractionStrength }) => {
  const { theme } = useTheme();
  const controls = useAnimation();
  const x = useMotionValue(shape.x);
  const y = useMotionValue(shape.y);

  useEffect(() => {
    const updatePosition = () => {
      const dx = mouseX - shape.initialX;
      const dy = mouseY - shape.initialY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < attractionRadius) {
        const force = (1 - distance / attractionRadius) * attractionStrength;
        const targetX = shape.initialX + dx * force;
        const targetY = shape.initialY + dy * force;

        controls.start({
          x: targetX,
          y: targetY,
          transition: { type: "spring", stiffness: 50, damping: 10 }
        });
      } else {
        controls.start({
          x: shape.initialX,
          y: shape.initialY,
          transition: { type: "spring", stiffness: 50, damping: 10 }
        });
      }
    };

    updatePosition();
  }, [mouseX, mouseY, shape, controls, attractionRadius, attractionStrength]);

  const baseAnimation = {
    rotate: [shape.rotation, shape.rotation + 360],
    scale: [1, 1.05, 1],
    transition: {
      rotate: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      },
      scale: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      animate={controls}
      style={{ x, y }}
      className="absolute"
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          ...baseAnimation,
          opacity: 1
        }}
        whileHover={{
          scale: 1.2,
          filter: "brightness(1.2)",
          boxShadow: theme === 'dark' 
            ? '0 0 20px rgba(255,255,255,0.2)' 
            : '0 10px 20px rgba(0,0,0,0.1)',
        }}
        className={`transition-colors duration-300`}
        style={{
          width: shape.size,
          height: shape.type === 'circle' ? shape.size : shape.type === 'rectangle' ? shape.size * 0.75 : shape.size,
          backgroundColor: shape.color,
          borderRadius: shape.type === 'circle' ? '50%' : shape.type === 'rectangle' ? '8px' : '0',
          clipPath: shape.type === 'polygon' ? `polygon(${shape.points?.map((p, i) => {
            const angle = (i / (shape.points?.length || 1)) * Math.PI * 2;
            const radius = shape.size / 2 * (0.5 + p * 0.5);
            const x = 50 + Math.cos(angle) * radius;
            const y = 50 + Math.sin(angle) * radius;
            return `${x}% ${y}%`;
          }).join(', ')})` : undefined,
        }}
      />
    </motion.div>
  );
};

export const BackgroundShapes: React.FC<BackgroundShapesProps> = ({
  count = 10,
  colors = [
    'rgba(127, 83, 172, 0.1)',  // Purple
    'rgba(100, 125, 238, 0.1)', // Blue
    'rgba(67, 198, 172, 0.1)',  // Teal
    'rgba(248, 255, 174, 0.1)', // Yellow
  ],
  minSize = 50,
  maxSize = 200,
  attractionRadius = 200,
  attractionStrength = 0.2
}) => {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 overflow-hidden transition-colors duration-300 ${
        theme === 'dark' ? 'bg-dark-bg' : 'bg-light-bg'
      }`}
    >
      <div className="relative w-full h-full">
        {shapes.map((shape) => (
          <ShapeComponent
            key={shape.id}
            shape={shape}
            mouseX={mousePosition.x}
            mouseY={mousePosition.y}
            attractionRadius={attractionRadius}
            attractionStrength={attractionStrength}
          />
        ))}
      </div>
    </div>
  );
};