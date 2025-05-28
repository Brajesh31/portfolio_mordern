import React, { useState, useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { useTheme } from './ThemeProvider';

interface Shape {
  id: number;
  x: string;
  y: string;
  size: number;
  rotation: number;
  gradient: string;
  blur: number;
  scale: number;
}

interface AnimatedBackgroundProps {
  shapes?: Shape[];
  className?: string;
}

const defaultShapes: Shape[] = [
  {
    id: 1,
    x: '10%',
    y: '20%',
    size: 300,
    rotation: 45,
    gradient: 'linear-gradient(45deg, rgba(255, 99, 132, 0.2), rgba(54, 162, 235, 0.2))',
    blur: 40,
    scale: 1,
  },
  {
    id: 2,
    x: '70%',
    y: '15%',
    size: 400,
    rotation: -30,
    gradient: 'linear-gradient(135deg, rgba(75, 192, 192, 0.2), rgba(153, 102, 255, 0.2))',
    blur: 50,
    scale: 1.2,
  },
  {
    id: 3,
    x: '30%',
    y: '60%',
    size: 350,
    rotation: 15,
    gradient: 'linear-gradient(225deg, rgba(255, 206, 86, 0.2), rgba(255, 159, 64, 0.2))',
    blur: 45,
    scale: 0.9,
  },
  {
    id: 4,
    x: '80%',
    y: '70%',
    size: 250,
    rotation: 60,
    gradient: 'linear-gradient(315deg, rgba(238, 130, 238, 0.2), rgba(64, 224, 208, 0.2))',
    blur: 35,
    scale: 0.8,
  },
];

const AnimatedShape: React.FC<{ shape: Shape }> = ({ shape }) => {
  const controls = useAnimation();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();

  // Transform mouse position into rotation
  const rotateX = useTransform(mouseY, [0, 300], [-15, 15]);
  const rotateY = useTransform(mouseX, [0, 300], [-15, 15]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  };

  const handleHoverStart = () => {
    setIsHovered(true);
    controls.start({
      scale: shape.scale * 1.1,
      transition: { duration: 0.3, ease: "easeOut" },
    });
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    controls.start({
      scale: shape.scale,
      transition: { duration: 0.5, ease: "easeOut" },
    });
  };

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: shape.x,
        top: shape.y,
        width: shape.size,
        height: shape.size,
        background: shape.gradient,
        borderRadius: '50%',
        filter: `blur(${shape.blur}px)`,
        transform: `rotate(${shape.rotation}deg)`,
        opacity: theme === 'dark' ? 0.15 : 0.25,
        pointerEvents: 'auto',
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={controls}
      whileHover={{ scale: shape.scale * 1.1 }}
      onMouseMove={handleMouseMove}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
    </motion.div>
  );
};

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  shapes = defaultShapes,
  className = '',
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: -1 }}
    >
      <div className="relative w-full h-full">
        {shapes.map((shape) => (
          <AnimatedShape key={shape.id} shape={shape} />
        ))}
      </div>
    </div>
  );
};