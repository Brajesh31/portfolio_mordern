import React from 'react';
import { motion } from 'framer-motion';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { School } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

const educationList = [
  {
    institution: 'GL Bajaj Group of Institutions',
    degree: 'B.Tech in Computer Science and Engineering',
    location: 'Mathura',
    date: '2023 - 2027',
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
    details: [
      'Percentage: 91%',
      'Achievements: Excelled in math and science; active in school tech clubs',
      'Activities: Coding workshops, quizzes, tech exhibitions'
    ]
  }
];

const Education = () => {
  return (
    <div className="container-section">
      <SectionHeading 
        title="Education" 
        subtitle="My academic journey and qualifications"
      />
      
      <VerticalTimeline lineColor="#2563eb">
        {educationList.map((item, index) => (
          <VerticalTimelineElement
            key={index}
            date={item.date}
            icon={<School />}
            iconClassName="bg-primary-700 text-white"
            contentStyle={{ 
              background: '#121212', 
              color: '#fff',
              boxShadow: '0 4px 16px rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
            }}
            contentArrowStyle={{ borderRight: '7px solid rgba(59, 130, 246, 0.2)' }}
            visible={true}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold">{item.institution}</h3>
              <h4 className="text-lg text-primary-400">{item.degree}</h4>
              <p className="text-gray-400 mb-4">{item.location}</p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
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