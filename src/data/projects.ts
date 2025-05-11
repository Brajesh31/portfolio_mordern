import emma from '/src/assets/emma.jpg';
import thea from '/src/assets/thea.jpg';
import ella from '/src/assets/ella.jpg';
import knights from '/src/assets/knights.jpg';
import mathematrix from '/src/assets/mathematrix.jpg';
import semac from '/src/assets/semc.jpg';
import ideapool from '/src/assets/ideapool.jpg';
import fitdeck from '/src/assets/fitdeck.jpg';
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
    id: '1',
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
  },
  {
    id: '2',
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
  },
  {
    id: '3',
    title: 'Ella – AI Chat Companion',
    description:
      'A mobile-friendly AI chatbot app that provides context-aware, friendly conversations for daily engagement and emotional support.',
    image: ella,
    tags: ['React Native', 'Expo', 'Firebase', 'ML Models (Dialogflow)'],
    github: 'https://github.com/Brajesh31/ella',
    featured: true,
  },
  {
    id: '4',
    title: 'The Knights of Flovora',
    description:
      'A 2D adventure RPG with quest-based progression, combat mechanics, and collectible items, offering a classic dungeon crawler experience.',
    image: knights,
    tags: ['Flutter', 'Dart', 'Flame Game Engine', 'Custom UI/UX'],
    github: 'https://github.com/Brajesh31/knights',
    featured: true,
  },
  {
    id: '5',
    title: 'Mathematrix',
    description:
      'An interactive learning platform for children to practice multiplication tables through gamified quizzes and animations.',
    image: mathematrix,
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/Brajesh31/mathematrix',
    featured: false,
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
  },
  {
    id: '7',
    title: 'IdeaPool',
    description:
      'A collaboration space for developers and designers to pitch their startup/project ideas and find team members to work with.',
    image: ideapool,
    tags: ['MERN Stack', 'JWT Auth', 'REST API'],
    github: 'https://github.com/Brajesh31/ideapool',
    featured: true,
  },
  {
    id: '8',
    title: 'FitDeck',
    description:
      'A community platform for fitness lovers to connect, share workout routines, follow coaches, and access trending fitness content.',
    image: fitdeck,
    tags: ['MERN Stack', 'React Hooks', 'MongoDB Atlas'],
    github: 'https://github.com/Brajesh31/fitdeck',
    featured: false,
  },
  {
    id: '9',
    title: 'ChatterBox',
    description:
      'A lightweight chat application that supports real-time communication through dynamic chat rooms with socket-based messaging.',
    image: chatterbox,
    tags: ['Node.js', 'Socket.io', 'Express.js'],
    github: 'https://github.com/Brajesh31/chatterbox',
    featured: false,
  },
  {
    id: '10',
    title: "Cap'nShare",
    description:
      'A food-sharing app for college campuses aiming to reduce food waste by letting students donate surplus food to others in need.',
    image: capnshare,
    tags: ['Ruby on Rails', 'PostgreSQL', 'AWS S3'],
    github: 'https://github.com/Brajesh31/capnshare',
    featured: false,
  },
  {
    id: '11',
    title: 'Career Mapper',
    description:
      'A decision-making tool for students/job seekers that compares job offers based on living standards, health, crime, and other indices across cities.',
    image: careerMapper,
    tags: ['Python', 'React.js', 'MySQL'],
    github: 'https://github.com/Brajesh31/career-mapper',
    featured: false,
  },
  {
    id: '12',
    title: 'Inventory Management System',
    description:
      'A web app to help businesses monitor inventory in real time, including product management, sales tracking, and stock forecasting.',
    image: inventory,
    tags: ['Python', 'Django', 'SQLite'],
    github: 'https://github.com/Brajesh31/inventory',
    featured: false,
  },
  {
    id: '13',
    title: 'Face Recognition Project',
    description:
      'A facial recognition system that identifies and verifies faces in real-time using computer vision and deep learning.',
    image: faceRecognition,
    tags: ['Python', 'OpenCV', 'TensorFlow'],
    github: 'https://github.com/Brajesh31/face-recognition',
    featured: false,
  },
  {
    id: '14',
    title: 'Lab Agile Planning',
    description:
      'A visual Agile board for managing lab and software development workflows with features like sprint creation, task boards, and backlog prioritization.',
    image: agilePlanner,
    tags: ['Jira API', 'React.js', 'Agile'],
    github: 'https://github.com/Brajesh31/agile-planner',
    featured: false,
  },
  {
    id: '15',
    title: 'AgroTech',
    description:
      'An IoT-integrated agricultural tech solution for monitoring soil moisture, weather, and crop health in real-time, helping farmers increase yield.',
    image: agrotech,
    tags: ['React.js', 'Node.js', 'MongoDB', 'IoT'],
    github: 'https://github.com/Brajesh31/agrotech',
    featured: false,
  },
  {
    id: '16',
    title: 'Influencer Sponsor Platform',
    description:
      'A professional platform that connects influencers and sponsors for collaboration opportunities, proposal handling, and campaign performance tracking.',
    image: influencer,
    tags: ['Next.js', 'React.js', 'PostgreSQL'],
    github: 'https://github.com/Brajesh31/influencer-platform',
    featured: false,
  },
];
