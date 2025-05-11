import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Code, ImageIcon } from 'lucide-react';
import { personalInfo } from '../../data/personal';

function Home() {
  return (
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
              <img src="/src/assets/avatar.svg" alt={personalInfo.fullName} className="w-full h-full object-cover" />
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
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="btn btn-primary flex items-center gap-2"
            >
              Hire Me <ChevronRight size={16} />
            </motion.a>
            <motion.a
              href="#projects"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="btn btn-outline flex items-center gap-2"
            >
              View Projects <ChevronRight size={16} />
            </motion.a>
          </div>
        </motion.div>
      </div>
      
      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="card p-6 hover:shadow-lg hover:-translate-y-1"
        >
          <div className="flex items-start gap-4">
            <div className="icon-box bg-primary-900/30">
              <Code size={24} className="text-primary-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Full Stack Developer</h3>
              <p className="text-gray-400">
                Experienced in both frontend and backend development with modern technologies
              </p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="card p-6 hover:shadow-lg hover:-translate-y-1"
        >
          <div className="flex items-start gap-4">
            <div className="icon-box bg-primary-900/30">
              <ImageIcon size={24} className="text-primary-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">UI/UX Designer</h3>
              <p className="text-gray-400">
                Creating beautiful and intuitive user interfaces
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Quick Info Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
        {['About Me', 'Education', 'Projects', 'Contact'].map((item, index) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase().replace(" ", "-")}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
            className="card group text-center py-8 hover:bg-primary-900/10"
          >
            <h3 className="text-lg font-medium group-hover:text-primary-400">
              {item}
            </h3>
          </motion.a>
        ))}
      </div>
    </div>
  );
}

export default Home;