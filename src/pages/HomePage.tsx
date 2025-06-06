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
import Stats from '../components/sections/Stats';
import ThemeAwareImage from '../components/ThemeAwareImage';
import { useTheme } from '../components/ThemeProvider';
import AnimatedJobTitle from '../components/AnimatedJobTitle';

const jobTitles = [
  "Full Stack Developer",
  "UI/UX Designer",
  "AI Engineer",
  "Software Architect"
];

const featuredSkills = [
  { name: 'React', icon: '⚛️', color: '#61DAFB', gradient: 'from-blue-400 to-cyan-400' },
  { name: 'TypeScript', icon: '📘', color: '#3178C6', gradient: 'from-blue-500 to-blue-600' },
  { name: 'Node.js', icon: '🟩', color: '#339933', gradient: 'from-green-400 to-green-600' },
  { name: 'Python', icon: '🐍', color: '#3776AB', gradient: 'from-blue-600 to-blue-800' },
  { name: 'MongoDB', icon: '🍃', color: '#47A248', gradient: 'from-green-500 to-green-700' },
  { name: 'AWS', icon: '☁️', color: '#FF9900', gradient: 'from-orange-400 to-orange-600' },
];

const slideVariants = {
  hidden: (direction: 'left' | 'right') => ({
    x: direction === 'left' ? -100 : 100,
    opacity: 0
  }),
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const SkillBall = ({ skill, index }) => {
  const { theme } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative group perspective-1000"
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotateX: [0, 5, 0],
          rotateY: [0, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: index * 0.2,
        }}
        whileHover={{
          scale: 1.2,
          rotateY: 180,
          transition: { duration: 0.6 }
        }}
        className={`w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full flex items-center justify-center text-3xl md:text-4xl
          preserve-3d cursor-pointer transform-gpu
          ${theme === 'dark' ? 'bg-dark-card' : 'bg-light-card'}
          bg-gradient-to-br ${skill.gradient}
          shadow-[0_0_15px_rgba(0,0,0,0.1)]
          dark:shadow-[0_0_15px_rgba(255,255,255,0.1)]
          transition-all duration-300`}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br opacity-20 backdrop-blur-sm" />
        <div className="relative transform-gpu backface-hidden">
          {skill.icon}
        </div>
        <div 
          className="absolute inset-0 rounded-full flex items-center justify-center backface-hidden"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <span className="text-base font-medium">{skill.name}</span>
        </div>
      </motion.div>
      
      <div 
        className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-4 rounded-full
          bg-gradient-to-b ${skill.gradient} opacity-30 blur-sm
          transform-gpu scale-y-50 rotate-x-60`}
      />
    </motion.div>
  );
};

const FeaturedSection = ({ title, viewAllLink, children, direction = 'left' }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={slideVariants}
    custom={direction}
    className="py-4 md:py-6 max-w-6xl mx-auto px-4 md:px-6 lg:px-8"
  >
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
  </motion.div>
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
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={slideVariants}
        custom="left"
        className="container-section min-h-[85vh] flex flex-col justify-center pt-16"
      >
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
                  darkSrc="/self-dark.png"
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
            <AnimatedJobTitle 
              titles={jobTitles}
              className="text-lg sm:text-xl lg:text-2xl font-semibold mb-6"
            />
            
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
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={slideVariants}
        custom="right"
      >
        <Stats />
      </motion.div>

      <FeaturedSection title="Featured Skills" viewAllLink="/skills" direction="left">
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
          {featuredSkills.map((skill, index) => (
            <SkillBall key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </FeaturedSection>

      <FeaturedSection title="Featured Projects" viewAllLink="/projects" direction="right">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </FeaturedSection>

      <FeaturedSection title="Featured Certificates" viewAllLink="/certificates" direction="left">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredCertificates.map((certificate) => (
            <CertificateCard key={certificate.id} certificate={certificate} />
          ))}
        </div>
      </FeaturedSection>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={slideVariants}
        custom="right"
        className="mt-2"
      >
        <Education />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={slideVariants}
        custom="left"
        className="mt-2"
      >
        <Experience />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={slideVariants}
        custom="right"
        className="mt-2"
      >
        <Contact />
      </motion.div>
    </div>
  );
}

export default HomePage;