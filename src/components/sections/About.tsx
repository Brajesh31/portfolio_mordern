import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';

const About = () => {
  const frontendSkills = [
    'HTML5',
    'CSS3',
    'JavaScript',
    'TypeScript',
    'React.js',
    'Angular',
    'Vue.js',
    'Next.js',
    'Bootstrap',
    'Tailwind CSS',
    'Pug/Jade',
  ];

  const backendSkills = [
    'Node.js',
    'Express.js',
    'Python',
    'Django',
    'Flask',
    'Ruby on Rails',
    'Java',
    'C#',
    '.NET',
    'MongoDB',
    'MySQL',
    'PostgreSQL',
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="container-section">
      <SectionHeading title="About Me" subtitle="My personal journey" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-dark-200 rounded-xl p-6 md:p-8 lg:p-10 border border-gray-800 shadow-lg"
      >
        <motion.p
          {...fadeInUp}
          className="text-lg md:text-xl leading-relaxed text-gray-300 space-y-4"
        >
          I'm <strong>Brajesh Kumar</strong>, a passionate and adaptable
          Computer Science and Engineering student at GL Bajaj Group of
          Institutions (Batch 2023–2027). With a strong foundation in full-stack
          development, machine learning, and AI-based systems, I thrive on
          building real-world tech solutions that are not only innovative but
          impactful.
          <br />
          <br />I bring a hands-on approach to problem-solving, demonstrated
          through my wide array of projects ranging from intelligent personal
          assistants like <em>Emma</em>, AI-powered therapy bots like{' '}
          <em>Thea</em>, to full-fledged web platforms like <em>SEMAC</em> and{' '}
          <em>IdeaPool</em>. I’ve also contributed to game development and
          ed-tech innovations, combining creativity with code.
          <br />
          <br />
          My toolkit includes a wide stack of technologies: MERN, Python,
          Django, Flutter, React Native, TensorFlow, GANs, and cloud tools like
          AWS. I'm constantly learning, experimenting, and pushing boundaries.
          <br />
          <br />
          I’ve interned with over 10 companies, gaining real-world exposure in
          Python development, web design, and AI systems. I hold over 100+
          certifications from platforms like IBM, Coursera, Forage, Google
          Cloud, Cisco, and more, and I actively participate in hackathons,
          CTFs, and coding contests (3★ CodeChef, 5★ HackerRank in Python).
          <br />
          <br />
          Beyond code, I’m a team player, quick learner, and a creative thinker
          — always excited to collaborate and bring new ideas to life.
        </motion.p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {/* Frontend Skills */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="card"
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
          className="card"
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
