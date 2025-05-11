import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import { Project } from '../../types';

// ✅ Local images from /src/assets/
import imgSEMC from '/src/assets/semc.jpg';
import imgMazeCrafter from '/src/assets/mazecrafter.jpg';
import imgGlobex from '/src/assets/globex.jpg';
import imgFireDeck from '/src/assets/firedeck.jpg';
import imgAuric from '/src/assets/auric.jpg';
import imgSkillSwap from '/src/assets/skillswap.jpg';
import imgEmma from '/src/assets/emma.jpg';
import imgThea from '/src/assets/thea.jpg';
import imgElla from '/src/assets/ella.jpg';
import imgKnights from '/src/assets/knights.jpg';
import imgMathematrix from '/src/assets/mathematrix.jpg';
import imgIdeapool from '/src/assets/ideapool.jpg';
import imgFitdeck from '/src/assets/firedeck.jpg';
import imgChatterbox from '/src/assets/chatterbox.jpg';
import imgCapnshare from '/src/assets/capnshare.jpg';
import imgCareerMapper from '/src/assets/career-mapper.jpg';
import imgInventory from '/src/assets/inventory.jpg';
import imgFaceRecognition from '/src/assets/face-recognition.jpg';
import imgAgilePlanner from '/src/assets/agile-planner.jpg';
import imgAgrotech from '/src/assets/agrotech.jpg';
import imgInfluencer from '/src/assets/influencer.jpg';

// ✅ Project data with local image references
const projectsData: Project[] = [
  {
    id: '1',
    title: 'SEM&C',
    description: 'A full-stack application for managing search engine marketing campaigns across multiple platforms.',
    image: imgSEMC,
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    github: 'https://github.com/Brajesh31/semc',
    demo: 'https://example.com',
    featured: true,
  },
  {
    id: '2',
    title: 'MazeCrafter',
    description: 'An interactive tool for creating and solving mazes with customizable algorithms.',
    image: imgMazeCrafter,
    tags: ['JavaScript', 'Canvas API', 'Algorithms'],
    github: 'https://github.com/Brajesh31/mazecrafter',
    featured: true,
  },
  {
    id: '3',
    title: 'Globex',
    description: 'A global exchange rate calculator with historical data visualization.',
    image: imgGlobex,
    tags: ['TypeScript', 'React', 'Chart.js', 'API'],
    github: 'https://github.com/Brajesh31/globex',
    demo: 'https://example.com',
    featured: true,
  },
  {
    id: '4',
    title: 'FireDeck',
    description: 'A collaborative flashcard application for studying with spaced repetition algorithms.',
    image: imgFiredeck,
    tags: ['React', 'Firebase', 'Tailwind CSS'],
    github: 'https://github.com/Brajesh31/firedeck',
    demo: 'https://example.com',
    featured: true,
  },
  {
    id: '5',
    title: 'Auric',
    description: 'Audio recognition system using machine learning to identify music and sounds.',
    image: imgAuric,
    tags: ['Python', 'TensorFlow', 'Web Audio API'],
    github: 'https://github.com/Brajesh31/auric',
    featured: false,
  },
  {
    id: '6',
    title: 'SkillSwap',
    description: 'Platform connecting people to exchange skills and knowledge in local communities.',
    image: imgSkillswap,
    tags: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    github: 'https://github.com/Brajesh31/skillswap',
    demo: 'https://example.com',
    featured: false,
  },
  {
    id: '7',
    title: 'Emma – Personal Assistant',
    description: 'A smart command-line Python-based personal assistant that performs everyday digital tasks.',
    image: imgEmma,
    tags: ['Python', 'APIs', 'CLI Interface', 'pyttsx3', 'SpeechRecognition'],
    github: 'https://github.com/Brajesh31/emma',
    featured: true,
  },
  {
    id: '8',
    title: 'Thea – AI Therapist',
    description: 'An AI-powered virtual mental health assistant using emotional response datasets.',
    image: imgThea,
    tags: ['Python', 'TensorFlow', 'NLP', 'Custom Dataset', 'Flask'],
    github: 'https://github.com/Brajesh31/thea',
    featured: true,
  },
  {
    id: '9',
    title: 'Ella – AI Chat Companion',
    description: 'Mobile AI chatbot for daily engagement and emotional support.',
    image: imgElla,
    tags: ['React Native', 'Expo', 'Firebase', 'ML Models'],
    github: 'https://github.com/Brajesh31/ella',
    featured: true,
  },
  {
    id: '10',
    title: 'The Knights of Flovora',
    description: 'A 2D RPG game with quests, combat, and dungeon crawling mechanics.',
    image: imgKnights,
    tags: ['Flutter', 'Dart', 'Flame'],
    github: 'https://github.com/Brajesh31/knights',
    featured: true,
  },
  {
    id: '11',
    title: 'Mathematrix',
    description: 'Gamified math learning platform for children.',
    image: imgMathematrix,
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/Brajesh31/mathematrix',
    featured: false,
  },
  {
    id: '12',
    title: 'IdeaPool',
    description: 'A collaboration space for developers to pitch and join ideas.',
    image: imgIdeapool,
    tags: ['MERN Stack', 'JWT', 'REST API'],
    github: 'https://github.com/Brajesh31/ideapool',
    featured: true,
  },
  {
    id: '13',
    title: 'FitDeck',
    description: 'Social platform for fitness lovers to share routines and follow coaches.',
    image: imgFitdeck,
    tags: ['MERN Stack', 'Hooks', 'MongoDB'],
    github: 'https://github.com/Brajesh31/fitdeck',
    featured: false,
  },
  {
    id: '14',
    title: 'ChatterBox',
    description: 'A real-time socket-based chat app with dynamic rooms.',
    image: imgChatterbox,
    tags: ['Node.js', 'Socket.io', 'Express'],
    github: 'https://github.com/Brajesh31/chatterbox',
    featured: false,
  },
  {
    id: '15',
    title: "Cap'nShare",
    description: 'Food sharing app for reducing food wastage on campuses.',
    image: imgCapnshare,
    tags: ['Ruby on Rails', 'PostgreSQL', 'AWS S3'],
    github: 'https://github.com/Brajesh31/capnshare',
    featured: false,
  },
  {
    id: '16',
    title: 'Career Mapper',
    description: 'Compare job offers based on location-based indices.',
    image: imgCareerMapper,
    tags: ['Python', 'React.js', 'MySQL'],
    github: 'https://github.com/Brajesh31/career-mapper',
    featured: false,
  },
  {
    id: '17',
    title: 'Inventory Management System',
    description: 'Track products, sales, and stock forecasts.',
    image: imgInventory,
    tags: ['Python', 'Django', 'SQLite'],
    github: 'https://github.com/Brajesh31/inventory',
    featured: false,
  },
  {
    id: '18',
    title: 'Face Recognition Project',
    description: 'Face detection and verification using OpenCV & TensorFlow.',
    image: imgFaceRecognition,
    tags: ['Python', 'OpenCV', 'TensorFlow'],
    github: 'https://github.com/Brajesh31/face-recognition',
    featured: false,
  },
  {
    id: '19',
    title: 'Lab Agile Planning',
    description: 'Agile board tool for managing software sprints and backlogs.',
    image: imgAgilePlanner,
    tags: ['Jira API', 'React.js', 'Agile'],
    github: 'https://github.com/Brajesh31/agile-planner',
    featured: false,
  },
  {
    id: '20',
    title: 'AgroTech',
    description: 'IoT solution for monitoring farming conditions in real time.',
    image: imgAgrotech,
    tags: ['React.js', 'Node.js', 'MongoDB', 'IoT'],
    github: 'https://github.com/Brajesh31/agrotech',
    featured: false,
  },
  {
    id: '21',
    title: 'Influencer Sponsor Platform',
    description: 'Connect influencers with sponsors for marketing campaigns.',
    image: imgInfluencer,
    tags: ['Next.js', 'React.js', 'PostgreSQL'],
    github: 'https://github.com/Brajesh31/influencer-platform',
    featured: false,
  }
];
const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({
  project,
  onClose,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className="bg-dark-200 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <div
            className="h-64 sm:h-80 bg-cover bg-center rounded-t-xl"
            style={{ backgroundImage: `url(${project.image})` }}
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-dark-300/80 rounded-full hover:bg-dark-400/80 transition-colors"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <h3 className="text-2xl sm:text-3xl font-bold mb-2">
            {project.title}
          </h3>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span key={tag} className="skill-tag">
                {tag}
              </span>
            ))}
          </div>

          <p className="text-gray-300 mb-6 text-lg">{project.description}</p>

          <div className="flex flex-wrap gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline flex items-center gap-2"
              >
                <Github size={16} /> View Code
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary flex items-center gap-2"
              >
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectCard: React.FC<{ project: Project; onClick: () => void }> = ({
  project,
  onClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="card overflow-hidden group"
      onClick={onClick}
    >
      <div
        className="h-48 bg-cover bg-center rounded-lg mb-4 transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${project.image})` }}
      />
      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-400 transition-colors">
        {project.title}
      </h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="skill-tag text-xs">
            {tag}
          </span>
        ))}
        {project.tags.length > 3 && (
          <span className="text-xs text-gray-400">
            +{project.tags.length - 3} more
          </span>
        )}
      </div>
      <button className="btn btn-primary w-full">View Project</button>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  const filteredProjects =
    filter === 'all'
      ? projectsData
      : projectsData.filter((project) => project.featured);

  return (
    <div className="container-section">
      <SectionHeading
        title="Projects"
        subtitle="Check out some of my recent work"
      />

      <div className="flex justify-center mb-8">
        <div className="bg-dark-200 p-1 rounded-lg inline-flex">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md transition-colors ${
              filter === 'all'
                ? 'bg-primary-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            All Projects
          </button>
          <button
            onClick={() => setFilter('featured')}
            className={`px-4 py-2 rounded-md transition-colors ${
              filter === 'featured'
                ? 'bg-primary-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Featured
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
