import React from 'react';
import { motion } from 'framer-motion';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { School } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import 'react-vertical-timeline-component/style.min.css';
import { useTheme } from '../ThemeProvider';

const educationList = [
  {
    institution: 'GL Bajaj Group of Institutions',
    degree: 'B.Tech in Computer Science and Engineering',
    location: 'Mathura',
    date: '2023 - 2027',
    logo: '/glbajaj.png',
    details: [
      'Currently pursuing',
      'Focus: Full Stack Development, AI/ML, SDLC, Cloud, and DevOps',
      'Active participation in hackathons, coding contests, and internships'
    ]
  },
  {
    institution: 'Delhi Public School',
    degree: 'Higher Secondary Education (12th Grade)',
    location: 'Madhubani',
    date: '2021 - 2023',
    logo: '/dps.png',
    details: [
      'Percentage: 66%',
      'Subjects: Physics, Chemistry, Math, English, Computer Science',
      'Focus: Logical thinking, competitive exams, foundational coding'
    ]
  },
  {
    institution: 'Delhi Public School',
    degree: 'Secondary Education (10th Grade)',
    location: 'Madhubani',
    date: '2019 - 2021',
    logo: '/dps.png',
    details: [
      'Percentage: 91%',
      'Achievements: Excelled in math and science; active in school tech clubs',
      'Activities: Coding workshops, quizzes, tech exhibitions'
    ]
  }
];

const Education = () => {
  const { theme } = useTheme();

  return (
    <div className="container-section">
      <SectionHeading 
        title="Education" 
        subtitle="My academic journey and qualifications"
      />
      
      <VerticalTimeline lineColor={theme === 'dark' ? '#2563eb' : '#3b82f6'}>
        {educationList.map((item, index) => (
          <VerticalTimelineElement
            key={index}
            date={item.date}
            icon={
              item.logo ? (
                <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
                  <img 
                    src={item.logo} 
                    alt={`${item.institution} logo`}
                    className="w-3/4 h-3/4 object-contain"
                  />
                </div>
              ) : (
                <School />
              )
            }
            iconClassName={theme === 'dark' ? 'bg-dark-accent-primary' : 'bg-light-accent-primary'}
            contentStyle={{ 
              background: theme === 'dark' ? 'rgba(17, 17, 27, 0.8)' : 'rgba(255, 255, 255, 0.8)', 
              color: theme === 'dark' ? '#fff' : '#1f2937',
              boxShadow: theme === 'dark' 
                ? '0 4px 16px rgba(59, 130, 246, 0.3)'
                : '0 4px 16px rgba(59, 130, 246, 0.05)',
              border: theme === 'dark'
                ? '1px solid rgba(59, 130, 246, 0.4)'
                : '1px solid rgba(59, 130, 246, 0.3)',
            }}
            contentArrowStyle={{ 
              borderRight: theme === 'dark'
                ? '7px solid rgba(59, 130, 246, 0.4)'
                : '7px solid rgba(59, 130, 246, 0.3)'
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
                    alt={`${item.institution} logo`}
                    className="w-12 h-12 object-contain"
                  />
                )}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {item.institution}
                  </h3>
                  <h4 className="text-lg text-primary-600 dark:text-primary-400">
                    {item.degree}
                  </h4>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {item.location}
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                {item.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </motion.div>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default Education;