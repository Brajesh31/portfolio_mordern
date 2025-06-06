import React from 'react';
import { motion } from 'framer-motion';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { Briefcase } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import { useTheme } from '../ThemeProvider';
import 'react-vertical-timeline-component/style.min.css';

const experienceList = [
  {
    title: 'Campus Ambassador',
    company: 'International Model United Nations Association (IMUNA)',
    location: 'India',
    date: 'Sep 2024 - Present',
    logo: '/imuna.png',
    description: [
      'Computer Information Systems and Statistical Data Analysis',
      'Full-time role representing IMUNA'
    ],
  },
  {
    title: 'Campus Ambassador',
    company: 'Indian Institute of Technology, Madras',
    location: 'India (Remote)',
    date: 'Oct 2024 - Jan 2025',
    logo: '/iitm.png',
    description: [
      'Information Technology Infrastructure',
      'Statistical Data Analysis',
      'Remote full-time position'
    ],
  },
  {
    title: 'Campus Ambassador',
    company: 'Indian Institute of Technology, Roorkee',
    location: 'India (Remote)',
    date: 'Mar 2025- Apr 2025',
    logo: '/iitr.png',
    description: [
      'Represented Cognizance 2025',
      'Managed student engagement and event promotion'
    ],
  },
  {
    title: 'Campus Ambassador',
    company: 'Indian Institute of Technology, Delhi',
    location: 'Delhi, India (Remote)',
    date: 'Jan 2025 - Feb 2025',
    logo: '/iitd.png',
    description: [
      'Kaizen 2025 program representative',
      'Coordinated between institution and student body'
    ],
  },
  {
    title: 'Student',
    company: 'GL Bajaj Group of Institutions',
    location: 'Mathura, Uttar Pradesh',
    date: 'Sep 2023 - Present',
    logo: '/glbajaj.png',
    description: [
      'B.Tech in Computer Science and Engineering',
      'Focus on Artificial Intelligence (AI) and Project Management',
      'Active participation in technical events and projects'
    ],
  }
];

const Experience = () => {
  const { theme } = useTheme();

  return (
    <div className="container-section">
      <SectionHeading 
        title="Experience" 
        subtitle="My professional journey and work history"
      />
      
      <VerticalTimeline lineColor={theme === 'dark' ? '#2563eb' : '#3b82f6'}>
        {experienceList.map((item, index) => (
          <VerticalTimelineElement
            key={index}
            date={item.date}
            icon={
              item.logo ? (
                <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
                  <img 
                    src={item.logo} 
                    alt={`${item.company} logo`}
                    className="w-3/4 h-3/4 object-contain"
                  />
                </div>
              ) : (
                <Briefcase />
              )
            }
            iconClassName={theme === 'dark' ? 'bg-dark-accent-secondary' : 'bg-light-accent-secondary'}
            contentStyle={{ 
              background: theme === 'dark' ? 'rgba(17, 17, 27, 0.8)' : 'rgba(255, 255, 255, 0.8)', 
              color: theme === 'dark' ? '#fff' : '#1f2937',
              boxShadow: theme === 'dark'
                ? '0 4px 16px rgba(20, 184, 166, 0.3)'
                : '0 4px 16px rgba(20, 184, 166, 0.05)',
              border: theme === 'dark'
                ? '1px solid rgba(20, 184, 166, 0.4)'
                : '1px solid rgba(20, 184, 166, 0.3)',
            }}
            contentArrowStyle={{ 
              borderRight: theme === 'dark'
                ? '7px solid rgba(20, 184, 166, 0.4)'
                : '7px solid rgba(20, 184, 166, 0.3)'
            }}
            visible={true}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="transition-colors duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                {item.logo && (
                  <img 
                    src={item.logo}
                    alt={`${item.company} logo`}
                    className="w-12 h-12 object-contain"
                  />
                )}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <h4 className="text-lg text-secondary-600 dark:text-secondary-400">
                    {item.company}
                  </h4>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {item.location}
              </p>
              
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                {item.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </motion.div>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default Experience;