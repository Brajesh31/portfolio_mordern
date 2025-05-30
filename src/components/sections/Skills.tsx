import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import { SkillCategory } from '../../types';

const skillsData: SkillCategory[] = [
  {
    title: 'Programming Languages',
    skills: [
      { name: 'JavaScript', icon: '🟨' },
      { name: 'Python', icon: '🐍' },
      { name: 'Go/Golang', icon: '🔷' },
      { name: 'C++', icon: '🔠' },
      { name: 'Java', icon: '☕' },
      { name: 'Shell', icon: '💻' },
      { name: 'HTML5', icon: '🌐' },
      { name: 'CSS3', icon: '🎨' },
    ],
  },
  {
    title: 'Front-End Technologies',
    skills: [
      { name: 'ReactJS', icon: '⚛️' },
      { name: 'Angular', icon: '🅰️' },
      { name: 'Vue.js', icon: '💚' },
      { name: 'TypeScript', icon: '📘' },
      { name: 'Bootstrap', icon: '🅱️' },
      { name: 'GraphQL', icon: '📊' },
      { name: 'Firebase', icon: '🔥' },
    ],
  },
  {
    title: 'Back-End Technologies',
    skills: [
      { name: 'Node.js', icon: '🟩' },
      { name: 'Express.js', icon: '🚂' },
      { name: 'ASP.NET', icon: '🔷' },
      { name: 'C#', icon: '🔵' },
      { name: '.NET Core', icon: '🎯' },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'MS SQL Server', icon: '🗃️' },
      { name: 'MongoDB', icon: '🍃' },
      { name: 'PostgreSQL', icon: '🐘' },
      { name: 'MySQL', icon: '🐬' },
    ],
  },
  {
    title: 'DevOps & Tools',
    skills: [
      { name: 'Git', icon: '📊' },
      { name: 'Jenkins', icon: '🔧' },
      { name: 'Docker', icon: '🐳' },
      { name: 'Ansible', icon: '🔄' },
      { name: 'CircleCI', icon: '⭕' },
    ],
  },
  {
    title: 'Cloud & Hosting',
    skills: [
      { name: 'AWS', icon: '☁️' },
      { name: 'Azure', icon: '📦' },
      { name: 'Firebase', icon: '🔥' },
      { name: 'Heroku', icon: '💜' },
    ],
  },
  {
    title: 'UI/UX & Design',
    skills: [
      { name: 'Figma', icon: '🎨' },
      { name: 'Canva', icon: '🖌️' },
      { name: 'Adobe XD', icon: '✨' },
      { name: 'PowerPoint', icon: '📊' },
    ],
  },
  {
    title: 'Soft Skills',
    skills: [
      { name: 'Analytical', icon: '🧠' },
      { name: 'Collaborator', icon: '🤝' },
      { name: 'Leader', icon: '👥' },
      { name: 'Adaptable', icon: '🔄' },
    ],
  },
];

const shuffleArray = <T extends unknown>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const SkillIcon: React.FC<{ skill: { name: string; icon: string } }> = ({ skill }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.05 }}
      className="flex flex-col items-center p-4 bg-light-card dark:bg-dark-card rounded-lg border border-gray-200 dark:border-gray-800 hover:border-primary-500 transition-all duration-300"
    >
      <span className="text-3xl mb-2">{skill.icon}</span>
      <span className="text-sm font-medium text-gray-900 dark:text-white">{skill.name}</span>
    </motion.div>
  );
};

const SkillCategorySection: React.FC<{ category: SkillCategory; delay: number }> = ({ category, delay }) => {
  const [randomizedSkills, setRandomizedSkills] = useState(category.skills);

  useEffect(() => {
    setRandomizedSkills(shuffleArray(category.skills));
  }, [category.skills]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay * 0.2 }}
      viewport={{ once: true }}
      className="mb-12"
    >
      <h3 className="text-xl font-bold mb-6 text-primary-400">{category.title}</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {randomizedSkills.map((skill) => (
          <SkillIcon key={skill.name} skill={skill} />
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'brajesh_kumar_resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container-section">
      <SectionHeading 
        title="Skills & Toolset" 
        subtitle="Technologies I work with"
      />
      
      {skillsData.map((category, index) => (
        <SkillCategorySection key={category.title} category={category} delay={index} />
      ))}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        viewport={{ once: true }}
        className="flex justify-center mt-8"
      >
        <motion.button
          onClick={handleDownloadResume}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white"
        >
          <Download size={16} /> Download Resume
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Skills;