import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import FlippingImage from '../FlippingImage';

const About = () => {
  const frontendSkills = [
    'HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React.js',
    'Angular', 'Vue.js', 'Next.js', 'Bootstrap', 'Tailwind CSS', 'Pug/Jade',
  ];

  const backendSkills = [
    'Node.js', 'Express.js', 'Python', 'Django', 'Flask',
    'Ruby on Rails', 'Java', 'C#', '.NET', 'MongoDB', 'MySQL', 'PostgresSQL',
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="container-section">
      <SectionHeading title="About Me" subtitle="My personal journey" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-light-card dark:bg-dark-card rounded-xl p-6 md:p-8 lg:p-10 border border-gray-200 dark:border-gray-800 shadow-lg transition-colors duration-300 h-full flex flex-col justify-center"
        >
          <motion.p
            {...fadeInUp}
            className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 space-y-4"
          >
            I'm <strong>Brajesh Kumar</strong>, a passionate and adaptable
            Computer Science and Engineering student at GL Bajaj Group of
            Institutions (Batch 2023–2027). With a strong foundation in full-stack
            development, machine learning, and AI-based systems, I thrive on
            building real-world tech solutions that are not only innovative but
            impactful.
            <br />
            <br />
            I bring a hands-on approach to problem-solving, demonstrated through my
            wide array of projects ranging from intelligent personal assistants
            like <em>Emma</em>, AI-powered therapy bots like <em>Thea</em>, to
            full-fledged web platforms like <em>SEMAC</em> and <em>IdeaPool</em>.
            I've also contributed to game development and ed-tech innovations,
            combining creativity with code.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex items-center justify-center lg:justify-end h-full"
        >
          <FlippingImage
            frontLight="/personal-light.jpg"
            frontDark="/personal-dark.jpg"
            backLight="/self-light.jpg"
            backDark="/self-dark.png"
            alt="Brajesh Kumar"
            className="aspect-square w-full max-w-[500px] h-auto"
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {/* Frontend Skills */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-light-card dark:bg-dark-card rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-lg transition-colors duration-300"
        >
          <h3 className="text-xl font-semibold mb-6 text-primary-400">
            Front-End
          </h3>
          <div className="flex flex-wrap gap-3">
            {frontendSkills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="skill-tag"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Backend Skills */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-light-card dark:bg-dark-card rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-lg transition-colors duration-300"
        >
          <h3 className="text-xl font-semibold mb-6 text-primary-400">
            Back-End
          </h3>
          <div className="flex flex-wrap gap-3">
            {backendSkills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="skill-tag"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;