import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useTheme } from './ThemeProvider';

interface Shape {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  gradient: string;
  initialX: number;
  initialY: number;
}

interface AnimatedBackgroundProps {
  count?: number;
  minSize?: number;
  maxSize?: number;
}

const generateShape = (width: number, height: number, minSize: number, maxSize: number): Shape => {
  const size = Math.random() * (maxSize - minSize) + minSize;
  const x = Math.random() * (width - size);
  const y = Math.random() * (height - size);
  
  const gradients = [
    'bg-gradient-to-tr from-pink-500/20 via-purple-500/20 to-cyan-500/20',
    'bg-gradient-to-bl from-blue-500/20 via-purple-500/20 to-pink-500/20',
    'bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20',
    'bg-gradient-to-tr from-green-500/20 via-emerald-500/20 to-teal-500/20',
    'bg-gradient-to-bl from-orange-500/20 via-amber-500/20 to-yellow-500/20'
  ];

  return {
    id: Math.random(),
    x,
    y,
    size,
    rotation: Math.random() * 360,
    gradient: gradients[Math.floor(Math.random() * gradients.length)],
    initialX: x,
    initialY: y
  };
};

const AnimatedShape: React.FC<{ shape: Shape; mouseX: number; mouseY: number }> = ({ 
  shape, 
  mouseX, 
  mouseY 
}) => {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const dx = mouseX - shape.initialX;
    const dy = mouseY - shape.initialY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = 400;

    if (distance < maxDistance) {
      const force = (1 - distance / maxDistance) * 0.4;
      const targetX = shape.initialX + dx * force;
      const targetY = shape.initialY + dy * force;

      controls.start({
        x: targetX,
        y: targetY,
        scale: isHovered ? 1.2 : 1.1,
        rotate: shape.rotation + 180,
        transition: { 
          type: "spring",
          stiffness: 40,
          damping: 15
        }
      });
    } else {
      controls.start({
        x: shape.initialX,
        y: shape.initialY,
        scale: isHovered ? 1.2 : 1,
        rotate: shape.rotation,
        transition: { 
          type: "spring",
          stiffness: 40,
          damping: 15
        }
      });
    }
  }, [mouseX, mouseY, shape, controls, isHovered]);

  return (
    <motion.div
      initial={{ 
        x: shape.initialX,
        y: shape.initialY,
        scale: 0,
        opacity: 0,
        rotate: shape.rotation
      }}
      animate={controls}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`absolute rounded-full backdrop-blur-3xl ${shape.gradient}`}
      style={{
        width: shape.size,
        height: shape.size,
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        filter: 'blur(40px)',
        cursor: 'pointer',
        pointerEvents: 'auto'
      }}
    />
  );
};

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  count = 5,
  minSize = 200,
  maxSize = 500
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
        generateShape(width, height, minSize, maxSize)
      );
    };

    setShapes(generateShapes());

    const handleResize = () => {
      setShapes(generateShapes());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [count, minSize, maxSize]);

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
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: -1 }}
    >
      <div 
        className={`absolute inset-0 transition-colors duration-300 ${
          theme === 'dark' ? 'bg-dark-bg/90' : 'bg-light-bg/90'
        }`}
      />
      <div className="relative w-full h-full">
        {shapes.map((shape) => (
          <AnimatedShape
            key={shape.id}
            shape={shape}
            mouseX={mousePosition.x}
            mouseY={mousePosition.y}
          />
        ))}
      </div>
    </div>
  );
};