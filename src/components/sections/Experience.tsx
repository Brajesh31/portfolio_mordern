import React from 'react';
import { motion } from 'framer-motion';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { Briefcase } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import 'react-vertical-timeline-component/style.min.css';

const experienceList = [
  {
    title: 'Campus Ambassador',
    company: 'International Model United Nations Association (IMUNA)',
    location: 'India',
    date: 'Sep 2024 - Present',
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
    date: 'Mar 2025',
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
    description: [
      'B.Tech in Computer Science and Engineering',
      'Focus on Artificial Intelligence (AI) and Project Management',
      'Active participation in technical events and projects'
    ],
  }
];

const Experience = () => {
  return (
    <div className="container-section">
      <SectionHeading 
        title="Experience" 
        subtitle="My professional journey and work history"
      />
      
      <VerticalTimeline lineColor="#2563eb">
        {experienceList.map((item, index) => (
          <VerticalTimelineElement
            key={index}
            date={item.date}
            icon={<Briefcase />}
            iconClassName="bg-secondary-700 text-white"
            contentStyle={{ 
              background: '#121212', 
              color: '#fff',
              boxShadow: '0 4px 16px rgba(20, 184, 166, 0.1)',
              border: '1px solid rgba(20, 184, 166, 0.2)',
            }}
            contentArrowStyle={{ borderRight: '7px solid rgba(20, 184, 166, 0.2)' }}
            visible={true}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold">{item.title}</h3>
              <h4 className="text-lg text-secondary-400">{item.company}</h4>
              <p className="text-gray-400 mb-4">{item.location}</p>
              
              <ul className="list-disc list-inside text-gray-300 space-y-2">
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