import emma from '/src/assets/emma.jpg';
import thea from '/src/assets/thea.jpg';
import ella from '/src/assets/ella.jpg';
import knights from '/src/assets/knights.jpg';
import mathematrix from '/src/assets/mathematrix.jpg';
import semac from '/src/assets/semc.jpg';
import ideapool from '/src/assets/ideapool.jpg';
import fitdeck from '/src/assets/firedeck.jpg';
import chatterbox from '/src/assets/chatterbox.jpg';
import capnshare from '/src/assets/capnshare.jpg';
import careerMapper from '/src/assets/career-mapper.jpg';
import inventory from '/src/assets/inventory.jpg';
import faceRecognition from '/src/assets/face-recognition.jpg';
import agilePlanner from '/src/assets/agile-planner.jpg';
import agrotech from '/src/assets/agrotech.jpg';
import influencer from '/src/assets/influencer.jpg';

export const projects = [
  {
    id: '3',
    title: 'Emma – Personal Assistant',
    description:
      'A smart command-line Python-based personal assistant that performs everyday digital tasks such as setting reminders, opening applications, fetching real-time weather and news, and managing personal schedules.',
    image: emma,
    tags: [
      'Python',
      'APIs (NewsAPI, OpenWeather)',
      'CLI Interface',
      'pyttsx3',
      'SpeechRecognition',
    ],
    github: 'https://github.com/Brajesh31/emma',
    featured: true,
    categories: ['AI/ML & Chatbots', 'Productivity Tools & Utilities', 'Backend/API Development']
  },
  {
    id: '4',
    title: 'Thea – AI Therapist',
    description:
      'An AI-powered virtual mental health assistant that provides therapeutic interactions using a custom dataset of emotional responses to mimic empathetic conversations.',
    image: thea,
    tags: [
      'Python',
      'TensorFlow',
      'NLP (NLTK, spaCy)',
      'Custom Dataset',
      'Flask',
    ],
    github: 'https://github.com/Brajesh31/thea',
    featured: true,
    categories: ['AI/ML & Chatbots', 'Healthcare & Wellness', 'Backend/API Development']
  },
  {
    id: '5',
    title: 'Ella – AI Chat Companion',
    description:
      'A mobile-friendly AI chatbot app that provides context-aware, friendly conversations for daily engagement and emotional support.',
    image: ella,
    tags: ['React Native', 'Expo', 'Firebase', 'ML Models (Dialogflow)'],
    github: 'https://github.com/Brajesh31/ella',
    featured: true,
    categories: ['AI/ML & Chatbots', 'Mobile App Development', 'Frontend Development']
  },
  {
    id: '6',
    title: 'The Knights of Flovora',
    description:
      'A 2D adventure RPG with quest-based progression, combat mechanics, and collectible items, offering a classic dungeon crawler experience.',
    image: knights,
    tags: ['Flutter', 'Dart', 'Flame Game Engine', 'Custom UI/UX'],
    github: 'https://github.com/Brajesh31/knights',
    featured: true,
    categories: ['Game Development', 'Mobile App Development']
  },
  {
    id: '6',
    title: 'Mathematrix',
    description:
      'An interactive learning platform for children to practice multiplication tables through gamified quizzes and animations.',
    image: mathematrix,
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/Brajesh31/mathematrix',
    featured: false,
    categories: ['Frontend Development', 'EdTech & Learning']
  },
  {
    id: '6',
    title: 'SEMAC',
    description:
      'A central hub for college students to manage semester-related resources including timetables, attendance, notes, and grade prediction using ML.',
    image: semac,
    tags: ['Next.js', 'MongoDB', 'Python', 'Machine Learning'],
    github: 'https://github.com/Brajesh31/semac',
    featured: true,
    categories: ['Full Stack Development', 'EdTech & Learning', 'Data Science & Analytics']
  }
];

// Helper function to get unique categories from projects
export const getUniqueCategories = () => {
  const categories = new Set<string>();
  projects.forEach(project => {
    project.categories.forEach(category => categories.add(category));
  });
  return Array.from(categories).sort();
};

// Helper function to get projects by category
export const getProjectsByCategory = (category: string) => {
  return projects.filter(project => project.categories.includes(category));
};