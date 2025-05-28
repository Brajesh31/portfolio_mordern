import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import { useTheme } from './ThemeProvider';

type ShapeType = 'circle' | 'square' | 'hexagon';

interface Shape {
  id: number;
  type: ShapeType;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  initialX: number;
  initialY: number;
}

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
  const types: ShapeType[] = ['circle', 'square', 'hexagon'];
  const type = types[Math.floor(Math.random() * types.length)];
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

  const getShapePath = () => {
    if (shape.type === 'hexagon') {
      const a = shape.size / 2;
      const points = [];
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        points.push(`${a + a * Math.cos(angle)},${a + a * Math.sin(angle)}`);
      }
      return `polygon(${points.join(' ')})`;
    }
    return undefined;
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
          scale: 1,
          opacity: 1,
          rotate: [shape.rotation, shape.rotation + 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          width: shape.size,
          height: shape.size,
          backgroundColor: shape.color,
          borderRadius: shape.type === 'circle' ? '50%' : shape.type === 'square' ? '4px' : '0',
          clipPath: shape.type === 'hexagon' ? getShapePath() : undefined,
        }}
      />
    </motion.div>
  );
};

export const BackgroundShapes: React.FC<BackgroundShapesProps> = ({
  count = 35,
  colors = [
    'rgba(59, 130, 246, 0.08)', // Blue
    'rgba(99, 102, 241, 0.08)', // Indigo
    'rgba(139, 92, 246, 0.08)', // Purple
    'rgba(236, 72, 153, 0.08)', // Pink
    'rgba(239, 68, 68, 0.08)', // Red
    'rgba(16, 185, 129, 0.08)', // Green
  ],
  minSize = 32,
  maxSize = 80,
  attractionRadius = 150,
  attractionStrength = 0.15
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
      className={`fixed inset-0 overflow-hidden pointer-events-none transition-colors duration-300 ${
        theme === 'dark' ? 'bg-dark-bg' : 'bg-light-bg'
      }`}
      style={{ zIndex: -1 }}
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