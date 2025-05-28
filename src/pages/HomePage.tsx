import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ExternalLink, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { personalInfo } from '../data/personal';
import { projects } from '../data/projects';
import { certificates } from '../data/certificates';
import Education from '../components/sections/Education';
import Experience from '../components/sections/Experience';
import Contact from '../components/sections/Contact';
import ThemeAwareImage from '../components/ThemeAwareImage';
import { useTheme } from '../components/ThemeProvider';

const featuredSkills = [
  { name: 'React', icon: '⚛️', color: '#61DAFB' },
  { name: 'TypeScript', icon: '📘', color: '#3178C6' },
  { name: 'Node.js', icon: '🟩', color: '#339933' },
  { name: 'Python', icon: '🐍', color: '#3776AB' },
  { name: 'MongoDB', icon: '🍃', color: '#47A248' },
  { name: 'AWS', icon: '☁️', color: '#FF9900' },
];

const SkillBall = ({ skill, index }) => {
  const { theme } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.1, rotate: 360 }}
      className="relative group"
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: index * 0.2,
        }}
        className={`w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full flex items-center justify-center text-2xl md:text-3xl
          shadow-lg transform-gpu perspective-1000 cursor-pointer
          ${theme === 'dark' 
            ? 'bg-dark-card hover:bg-dark-bg' 
            : 'bg-light-card hover:bg-light-bg'} 
          transition-all duration-300`}
        style={{
          boxShadow: `0 0 20px ${skill.color}20`,
        }}
      >
        {skill.icon}
      </motion.div>
      
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className={`px-2 py-1 text-sm rounded ${theme === 'dark' ? 'bg-dark-card' : 'bg-light-card'} shadow-lg whitespace-nowrap`}>
          {skill.name}
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedSection = ({ title, viewAllLink, children }) => (
  <div className="py-4 md:py-6 max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
      <Link
        to={viewAllLink}
        className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
      >
        View All <ExternalLink size={16} />
      </Link>
    </div>
    {children}
  </div>
);

const CertificateCard = ({ certificate }) => {
  const { theme } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`bg-light-card dark:bg-dark-card rounded-xl overflow-hidden transition-all duration-300 group`}
    >
      <div
        className="h-40 md:h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${certificate.image})` }}
      />
      <div className="p-4">
        <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900 dark:text-white">
          {certificate.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
          {certificate.issuer}
        </p>
        <p className="text-gray-500 dark:text-gray-500 text-xs mb-4">
          {certificate.date}
        </p>
        <button className="btn btn-primary w-full">View Certificate</button>
      </div>
    </motion.div>
  );
};

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-light-card dark:bg-dark-card rounded-xl overflow-hidden group transition-all duration-300"
    >
      <div
        className="h-40 md:h-48 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${project.image})` }}
      />
      <div className="p-4">
        <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-primary-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="skill-tag text-xs">
              {tag}
            </span>
          ))}
        </div>
        <Link to={`/projects`} className="btn btn-primary w-full">
          View Project
        </Link>
      </div>
    </motion.div>
  );
};

function HomePage() {
  const featuredProjects = projects.filter(project => project.featured).slice(0, 3);
  const featuredCertificates = certificates.filter(cert => cert.featured).slice(0, 3);

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'brajesh_kumar_resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen">
      <div className="container-section min-h-[85vh] flex flex-col justify-center pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center lg:justify-end order-1 lg:order-none"
          >
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[450px] lg:h-[450px]">
              <motion.div 
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-primary-500/30"
              />
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-4 rounded-full border-2 border-dashed border-primary-400/40"
              />
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-light-bg dark:from-dark-bg to-light-card dark:to-dark-card border border-primary-600/20 overflow-hidden shadow-xl">
                <ThemeAwareImage
                  darkSrc="/self-dark.jpg"
                  lightSrc="/self-light.jpg"
                  alt={personalInfo.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              <span className="block">{personalInfo.fullName.split(' ')[0]}</span>
              <span className="block text-primary-500">{personalInfo.fullName.split(' ')[1]}</span>
            </h1>
            <h2 className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 mb-6">
              {personalInfo.title}
            </h2>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
              <Link
                to="/contact"
                className="btn btn-primary flex items-center gap-2"
              >
                Hire Me <ChevronRight size={16} />
              </Link>
              <Link
                to="/projects"
                className="btn btn-outline flex items-center gap-2"
              >
                View Projects <ChevronRight size={16} />
              </Link>
              <button
                onClick={handleDownloadResume}
                className="btn btn-outline flex items-center gap-2"
              >
                Download Resume <Download size={16} />
              </button>
            </div>
            
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
              {personalInfo.bio.split('\n')[0]}
            </p>
          </motion.div>
        </div>
      </div>

      <FeaturedSection title="Featured Skills" viewAllLink="/skills">
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
          {featuredSkills.map((skill, index) => (
            <SkillBall key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </FeaturedSection>

      <FeaturedSection title="Featured Projects" viewAllLink="/projects">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </FeaturedSection>

      <FeaturedSection title="Featured Certificates" viewAllLink="/certificates">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredCertificates.map((certificate) => (
            <CertificateCard key={certificate.id} certificate={certificate} />
          ))}
        </div>
      </FeaturedSection>

      <div className="mt-2">
        <Education />
      </div>

      <div className="mt-2">
        <Experience />
      </div>

      <div className="mt-2">
        <Contact />
      </div>
    </div>
  );
}

export default HomePage;