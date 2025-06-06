import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import { Project } from '../../types';
import { projects, getUniqueCategories } from '../../data/projects';

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
        className="bg-light-card dark:bg-dark-card rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <div
            className="h-64 sm:h-80 bg-cover bg-center rounded-t-xl"
            style={{ backgroundImage: `url(${project.image})` }}
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-light-card/80 dark:bg-dark-card/80 rounded-full hover:bg-light-bg/80 dark:hover:bg-dark-bg/80 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900 dark:text-white">
            {project.title}
          </h3>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span key={tag} className="skill-tag">
                {tag}
              </span>
            ))}
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
            {project.description}
          </p>

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
      className="bg-light-card dark:bg-dark-card rounded-xl overflow-hidden group transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div
        className="h-48 bg-cover bg-center rounded-lg mb-4 transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${project.image})` }}
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-primary-400 transition-colors">
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="skill-tag text-xs">
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              +{project.tags.length - 3} more
            </span>
          )}
        </div>
        <button className="btn btn-primary w-full">View Project</button>
      </div>
    </motion.div>
  );
};

const CategorySection: React.FC<{
  category: string;
  projects: Project[];
  onProjectClick: (project: Project) => void;
}> = ({ category, projects, onProjectClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <h2 className="text-2xl font-bold mb-8 text-primary-500">
        {category}
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
          ({projects.length} projects)
        </span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => onProjectClick(project)}
          />
        ))}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const categories = getUniqueCategories();

  return (
    <div className="container-section">
      <SectionHeading
        title="Projects"
        subtitle="Explore my work across different domains"
      />

      {categories.map((category) => (
        <CategorySection
          key={category}
          category={category}
          projects={projects.filter((p) => p.categories.includes(category))}
          onProjectClick={setSelectedProject}
        />
      ))}

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