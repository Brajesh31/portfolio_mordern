import React, { useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
}

const FallingStarsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const animationFrameRef = useRef<number>();
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);

  const createStar = (canvas: HTMLCanvasElement): Star => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 0.5,
    speed: Math.random() * 0.2 + 0.1,
    opacity: Math.random() * 0.8 + 0.2,
    twinkleSpeed: Math.random() * 0.02 + 0.01,
    twinklePhase: Math.random() * Math.PI * 2,
  });

  const createShootingStar = (canvas: HTMLCanvasElement): ShootingStar => ({
    x: Math.random() * canvas.width,
    y: 0,
    length: Math.random() * 80 + 40,
    speed: Math.random() * 15 + 10,
    opacity: 1,
  });

  useEffect(() => {
    if (theme !== 'dark') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize stars
    starsRef.current = Array.from({ length: 200 }, () => createStar(canvas));
    shootingStarsRef.current = [];

    let lastShootingStarTime = 0;
    const shootingStarInterval = 2000; // New shooting star every 4 seconds

    const animate = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw regular stars
      starsRef.current.forEach(star => {
        star.y += star.speed;
        star.twinklePhase += star.twinkleSpeed;
        
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }

        const twinkle = Math.sin(star.twinklePhase) * 0.3 + 0.7;
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Create new shooting stars
      if (timestamp - lastShootingStarTime > shootingStarInterval) {
        if (Math.random() < 0.5) { // 50% chance to create a shooting star
          shootingStarsRef.current.push(createShootingStar(canvas));
          lastShootingStarTime = timestamp;
        }
      }

      // Update and draw shooting stars
      shootingStarsRef.current = shootingStarsRef.current.filter(star => {
        star.x += star.speed;
        star.y += star.speed * 0.6;
        star.opacity -= 0.02;

        if (star.opacity <= 0) return false;

        const gradient = ctx.createLinearGradient(
          star.x, star.y,
          star.x - star.length, star.y - star.length * 0.6
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x - star.length, star.y - star.length * 0.6);
        ctx.stroke();

        return star.opacity > 0;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [theme]);

  if (theme !== 'dark') return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

export default FallingStarsBackground;