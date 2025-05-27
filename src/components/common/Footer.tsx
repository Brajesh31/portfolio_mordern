import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { personalInfo } from '../../data/personal';
import { useTheme } from '../ThemeProvider';

const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experience' },
    { name: 'Certificates', path: '/certificates' },
    { name: 'Contact', path: '/contact' },
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      href: personalInfo.contact.github,
      color: 'hover:text-[#333333]'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: personalInfo.contact.linkedin,
      color: 'hover:text-[#0077B5]'
    },
    {
      name: 'Email',
      icon: Mail,
      href: `mailto:${personalInfo.contact.email}`,
      color: 'hover:text-[#EA4335]'
    }
  ];

  return (
    <footer className={`relative w-full mt-auto py-8 border-t z-10 transition-colors duration-300 
      ${theme === 'dark' 
        ? 'bg-dark-card/95 backdrop-blur-sm border-gray-800' 
        : 'bg-light-card/95 backdrop-blur-sm border-gray-200'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start"
          >
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img 
                src={theme === 'dark' ? '/personal-dark.jpg' : '/personal-light.jpg'} 
                alt="Logo" 
                className="h-10 w-10 rounded-full"
              />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Brajesh<span className="text-primary-500">.</span>
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
              Software Engineer & UI/UX Designer crafting beautiful digital experiences.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start"
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="flex flex-wrap justify-center md:justify-start gap-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start"
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Connect</h3>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-600 dark:text-gray-400 ${link.color} transition-colors`}
                  aria-label={link.name}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
            © {currentYear} {personalInfo.fullName}. All rights reserved.
          </p>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-500" fill="currentColor" /> using
            <a 
              href="https://react.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-1"
            >
              React <ExternalLink className="w-3 h-3" />
            </a>
            &
            <a 
              href="https://tailwindcss.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-1"
            >
              Tailwind CSS <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;