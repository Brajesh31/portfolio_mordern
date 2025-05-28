import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import TagCloud from 'TagCloud';
import { useTheme } from './ThemeProvider';

interface SkillsSphereProps {
  radius?: number;
  maxSpeed?: number;
  initSpeed?: number;
  direction?: number;
  keep?: boolean;
}

const skills = [
  { text: 'React.js', color: '#61DAFB' },
  { text: 'Python', color: '#3776AB' },
  { text: 'Node.js', color: '#339933' },
  { text: 'Machine Learning', color: '#FF6F61' },
  { text: 'Django', color: '#092E20' },
  { text: 'Flutter', color: '#02569B' },
  { text: 'JavaScript', color: '#F7DF1E' },
  { text: 'HTML5', color: '#E34F26' },
  { text: 'CSS3', color: '#1572B6' },
  { text: 'AWS', color: '#FF9900' },
  { text: 'MongoDB', color: '#47A248' },
  { text: 'SQL', color: '#4479A1' },
  { text: 'UI/UX', color: '#FF3366' },
  { text: 'C++', color: '#00599C' },
  { text: 'Git', color: '#F05032' },
  { text: 'TypeScript', color: '#3178C6' },
  { text: 'Next.js', color: '#000000' },
  { text: 'TailwindCSS', color: '#06B6D4' },
  { text: 'Docker', color: '#2496ED' },
  { text: 'GraphQL', color: '#E10098' }
];

export const SkillsSphere: React.FC<SkillsSphereProps> = ({
  radius = 300,
  maxSpeed = 7,
  initSpeed = 32,
  direction = 135,
  keep = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    let tagCloud: any = null;

    const createTagCloud = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        
        // Clear any existing content
        container.innerHTML = '';
        
        // Create spans for each skill
        skills.forEach(skill => {
          const span = document.createElement('span');
          span.textContent = skill.text;
          span.style.color = theme === 'dark' ? '#fff' : '#000';
          span.className = 'cursor-pointer transition-colors duration-300 hover:text-primary-500';
          container.appendChild(span);
        });

        // Initialize TagCloud
        tagCloud = TagCloud(container, container.querySelectorAll('span'), {
          radius,
          maxSpeed,
          initSpeed,
          direction,
          keep,
        });

        // Add hover effect
        const spans = container.querySelectorAll('span');
        spans.forEach((span: HTMLSpanElement) => {
          span.addEventListener('mouseover', () => {
            span.style.color = skills.find(s => s.text === span.textContent)?.color || '#3b82f6';
          });
          span.addEventListener('mouseout', () => {
            span.style.color = theme === 'dark' ? '#fff' : '#000';
          });
        });
      }
    };

    createTagCloud();

    // Cleanup
    return () => {
      if (tagCloud) {
        tagCloud.destroy();
      }
    };
  }, [radius, maxSpeed, initSpeed, direction, keep, theme]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full h-[600px] flex items-center justify-center"
    >
      <div
        ref={containerRef}
        className="tagcloud text-2xl font-semibold select-none"
        style={{ color: theme === 'dark' ? '#fff' : '#000' }}
      />
    </motion.div>
  );
};