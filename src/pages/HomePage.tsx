import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Code, ImageIcon, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { personalInfo } from '../data/personal';
import { projects } from '../data/projects';
import { certificates } from '../data/certificates';
import SectionHeading from '../components/common/SectionHeading';

const FeaturedSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mt-20">
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-2xl font-bold">{title}</h2>
      <Link to={`/${title.toLowerCase()}`} className="text-primary-500 hover:text-primary-400 flex items-center gap-1">
        View All <ExternalLink size={16} />
      </Link>
    </div>
    {children}
  </div>
);

function HomePage() {
  const featuredProjects = projects.filter(project => project.featured).slice(0, 3);
  const featuredCertificates = certificates.filter(cert => cert.featured).slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="container-section min-h-screen flex flex-col justify-center pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center lg:justify-end order-1 lg:order-none"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80">
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
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-dark-100 to-dark-300 border border-primary-600/20 overflow-hidden shadow-xl">
                <img src="/src/assets/avatar.png" alt={personalInfo.fullName} className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4">
              <span className="block">{personalInfo.fullName.split(' ')[0]}</span>
              <span className="block text-primary-500">{personalInfo.fullName.split(' ')[1]}</span>
            </h1>
            <h2 className="text-xl sm:text-2xl text-gray-400 mb-8">
              {personalInfo.title}
            </h2>
            
            <div className="flex flex-wrap gap-4 mb-8">
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
            </div>
            
            <p className="text-gray-400 text-lg">
              {personalInfo.bio.split('\n')[0]}
            </p>
          </motion.div>
        </div>

        {/* Featured Projects */}
        <FeaturedSection title="Projects">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="card overflow-hidden group"
              >
                <div
                  className="h-48 bg-cover bg-center rounded-lg mb-4"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="skill-tag text-xs">{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </FeaturedSection>

        {/* Featured Certificates */}
        <FeaturedSection title="Certificates">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCertificates.map((cert) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="card overflow-hidden group"
              >
                <div
                  className="h-48 bg-cover bg-center rounded-lg mb-4"
                  style={{ backgroundImage: `url(${cert.image})` }}
                />
                <h3 className="text-xl font-semibold mb-2">{cert.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{cert.issuer}</p>
                <p className="text-gray-500 text-xs">{cert.date}</p>
              </motion.div>
            ))}
          </div>
        </FeaturedSection>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
          {[
            { title: 'About Me', path: '/about' },
            { title: 'Education', path: '/education' },
            { title: 'Experience', path: '/experience' },
            { title: 'Skills', path: '/skills' }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={item.path}
                className="card group text-center py-8 hover:bg-primary-900/10 block"
              >
                <h3 className="text-lg font-medium group-hover:text-primary-400">
                  {item.title}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;