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
  blur: number;
  opacity: number;
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
    'bg-gradient-to-br from-pink-500/30 via-purple-500/20 to-indigo-500/30',
    'bg-gradient-to-tr from-blue-500/30 via-cyan-500/20 to-teal-500/30',
    'bg-gradient-to-bl from-violet-500/30 via-purple-500/20 to-fuchsia-500/30',
    'bg-gradient-to-r from-emerald-500/30 via-green-500/20 to-lime-500/30',
    'bg-gradient-to-tl from-amber-500/30 via-orange-500/20 to-yellow-500/30',
    'bg-gradient-to-tr from-pink-400/30 to-purple-500/30',
    'bg-gradient-to-br from-yellow-400/30 to-pink-500/30',
    'bg-gradient-to-tr from-blue-400/30 to-cyan-500/30'
  ];

  return {
    id: Math.random(),
    x,
    y,
    size,
    rotation: Math.random() * 360,
    gradient: gradients[Math.floor(Math.random() * gradients.length)],
    blur: Math.random() * 20 + 30,
    opacity: Math.random() * 0.3 + 0.4,
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
    const maxDistance = 500;

    if (distance < maxDistance) {
      const force = (1 - distance / maxDistance) * 0.5;
      const targetX = shape.initialX + dx * force;
      const targetY = shape.initialY + dy * force;

      controls.start({
        x: targetX,
        y: targetY,
        scale: isHovered ? 1.3 : 1.1,
        rotate: shape.rotation + (isHovered ? 180 : 90),
        transition: { 
          type: "spring",
          stiffness: 30,
          damping: 20,
          mass: 1.5
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
          stiffness: 30,
          damping: 20,
          mass: 1.5
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
      whileHover={{ scale: 1.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`absolute rounded-full backdrop-blur-3xl ${shape.gradient}`}
      style={{
        width: shape.size,
        height: shape.size,
        filter: `blur(${shape.blur}px)`,
        opacity: shape.opacity,
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        cursor: 'pointer',
        pointerEvents: 'auto'
      }}
    />
  );
};

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  count = 5,
  minSize = 300,
  maxSize = 600
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
          theme === 'dark' ? 'bg-dark-bg/80' : 'bg-light-bg/80'
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