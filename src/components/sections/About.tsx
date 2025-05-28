import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../ThemeProvider';
import SectionHeading from '../common/SectionHeading';

const About = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { theme } = useTheme();

  return (
    <div className="container-section">
      <SectionHeading 
        title="About Me" 
        subtitle="My journey in technology and design"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative">
        {/* Vertical Line */}
        <div className="absolute left-1/2 lg:right-1/2 top-0 bottom-0 w-px hidden lg:block">
          <div className="h-[30%] bg-gradient-to-b from-transparent via-primary-500/50 to-primary-500/50" />
          <div className="h-[40%] bg-transparent" />
          <div className="h-[30%] bg-gradient-to-t from-transparent via-primary-500/50 to-primary-500/50" />
        </div>

        {/* About Text */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="prose prose-lg dark:prose-invert max-w-none lg:pr-16"
        >
          <p className="text-lg leading-relaxed mb-6">
            I'm <span className="text-primary-500 font-semibold">Brajesh Kumar</span>, 
            a passionate and adaptable Computer Science and Engineering student at GL Bajaj 
            Group of Institutions (Batch 2023–2027). With a strong foundation in full-stack 
            development, machine learning, and AI-based systems, I thrive on building 
            real-world tech solutions that are not only innovative but impactful.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            I bring a hands-on approach to problem-solving, demonstrated through my wide 
            array of projects ranging from intelligent personal assistants like Emma, 
            AI-powered therapy bots like Thea, to full-fledged web platforms like SEMAC 
            and IdeaPool. I've also contributed to game development and ed-tech innovations, 
            combining creativity with code.
          </p>
          <p className="text-lg leading-relaxed">
            Beyond code, I'm a team player, quick learner, and a creative thinker — always 
            excited to collaborate and bring new ideas to life.
          </p>
        </motion.div>

        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative w-full max-w-md mx-auto lg:ml-16"
        >
          <div 
            className="relative w-full pt-[100%] perspective-1000 cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 preserve-3d"
            >
              {/* Front Image */}
              <motion.div
                className="absolute inset-0 backface-hidden"
                initial={false}
                animate={{ opacity: isFlipped ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={theme === 'dark' ? '/personal-dark.jpg' : '/personal-light.jpg'}
                  alt="Brajesh Kumar - Front"
                  className="w-full h-full object-cover rounded-2xl shadow-xl"
                />
              </motion.div>

              {/* Back Image */}
              <motion.div
                className="absolute inset-0 backface-hidden"
                style={{ transform: 'rotateY(180deg)' }}
                initial={false}
                animate={{ opacity: isFlipped ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={theme === 'dark' ? '/self-dark.jpg' : '/self-light.jpg'}
                  alt="Brajesh Kumar - Back"
                  className="w-full h-full object-cover rounded-2xl shadow-xl"
                />
              </motion.div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-primary-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            </motion.div>
          </div>

          {/* Image Caption */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-gray-500 dark:text-gray-400"
          >
            Click to flip
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;