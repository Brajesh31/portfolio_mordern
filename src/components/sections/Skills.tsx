import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import { SkillCategory } from '../../types';

const skillsData: SkillCategory[] = [
  {
    title: 'Programming Languages',
    skills: [
      { name: 'JavaScript', icon: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg' },
      { name: 'Python', icon: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg' },
      { name: 'Go/Golang', icon: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg' },
      { name: 'Java', icon: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg' },
      { name: 'C++', icon: 'https://images.pexels.com/photos/2004166/pexels-photo-2004166.jpeg' },
      { name: 'TypeScript', icon: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg' },
    ],
  },
  {
    title: 'Front-End Technologies',
    skills: [
      { name: 'React', icon: 'https://images.pexels.com/photos/11035482/pexels-photo-11035482.jpeg' },
      { name: 'Angular', icon: 'https://images.pexels.com/photos/11035474/pexels-photo-11035474.jpeg' },
      { name: 'Vue.js', icon: 'https://images.pexels.com/photos/11035386/pexels-photo-11035386.jpeg' },
      { name: 'Next.js', icon: 'https://images.pexels.com/photos/11035397/pexels-photo-11035397.jpeg' },
      { name: 'Tailwind CSS', icon: 'https://images.pexels.com/photos/11035512/pexels-photo-11035512.jpeg' },
      { name: 'SASS', icon: 'https://images.pexels.com/photos/11035516/pexels-photo-11035516.jpeg' },
    ],
  },
  {
    title: 'Back-End Technologies',
    skills: [
      { name: 'Node.js', icon: 'https://images.pexels.com/photos/11035371/pexels-photo-11035371.jpeg' },
      { name: 'Express.js', icon: 'https://images.pexels.com/photos/11035376/pexels-photo-11035376.jpeg' },
      { name: 'Django', icon: 'https://images.pexels.com/photos/11035381/pexels-photo-11035381.jpeg' },
      { name: 'Flask', icon: 'https://images.pexels.com/photos/11035384/pexels-photo-11035384.jpeg' },
      { name: 'GraphQL', icon: 'https://images.pexels.com/photos/11035391/pexels-photo-11035391.jpeg' },
      { name: 'REST APIs', icon: 'https://images.pexels.com/photos/11035394/pexels-photo-11035394.jpeg' },
    ],
  },
];

const SkillCard: React.FC<{ skill: { name: string; icon: string } }> = ({ skill }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.05,
        rotateY: 10,
        rotateX: -10,
        z: 50
      }}
      className="group relative h-48 rounded-xl overflow-hidden transform-gpu perspective-1000"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${skill.icon})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      
      <div className="absolute inset-0 p-6 flex flex-col justify-end transform transition-transform duration-300 group-hover:translate-y-[-10px]">
        <h3 className="text-xl font-bold text-white mb-2">{skill.name}</h3>
        <div className="h-1 w-12 bg-primary-500 rounded-full transform origin-left transition-transform duration-300 group-hover:scale-x-150" />
      </div>
      
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 backdrop-blur-sm transition-opacity duration-300" />
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
        title="Skills & Expertise" 
        subtitle="Technologies and tools I work with"
      />
      
      <div className="space-y-16">
        {skillsData.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-8 text-primary-500">{category.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.skills.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        viewport={{ once: true }}
        className="flex justify-center mt-16"
      >
        <motion.button
          onClick={handleDownloadResume}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary flex items-center gap-2"
        >
          <Download size={16} /> Download Resume
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Skills;