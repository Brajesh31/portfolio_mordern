import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { personalInfo } from '../../data/personal';

const Footer = () => {
  return (
    <footer className="bg-dark-400 py-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-400">
              © 2025 {personalInfo.fullName}. Built with{' '}
              <Heart className="inline-block h-4 w-4 text-red-500 mx-1" fill="currentColor" />{' '}
              using MERN Stack + Figma + Tailwind CSS
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href={personalInfo.contact.linkedin}
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-primary-500 transition-colors"
            >
              LinkedIn
            </a>
            <a 
              href={personalInfo.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary-500 transition-colors"
            >
              GitHub
            </a>
            <a 
              href={`mailto:${personalInfo.contact.email}`}
              className="text-gray-400 hover:text-primary-500 transition-colors"
            >
              Email
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;