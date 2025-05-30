import { BlogPost } from '../types';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Scalable Web Applications with React and TypeScript',
    summary: 'Learn how to create maintainable and type-safe React applications using TypeScript, best practices, and modern development patterns.',
    content: `React and TypeScript have become the go-to combination for building modern web applications. In this post, we'll explore how to leverage TypeScript's type system to create more maintainable and scalable React applications.

We'll cover:
- Setting up a new React + TypeScript project
- Type-safe props and state management
- Common patterns and best practices
- Performance optimization techniques
- Testing strategies

Stay tuned for more in-depth tutorials and insights!`,
    date: '2024-03-15',
    readingTime: '5 min',
    author: {
      name: 'Brajesh Kumar',
      avatar: '/personal-dark.jpg'
    },
    images: [
      'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg',
      'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg'
    ],
    tags: ['React', 'TypeScript', 'Web Development'],
    featured: true
  },
  {
    id: '2',
    title: 'Implementing AI-Powered Features in Web Applications',
    summary: 'Discover how to integrate artificial intelligence capabilities into your web applications using modern APIs and services.',
    content: `Artificial Intelligence is revolutionizing web development. Learn how to implement AI features in your applications using popular services and APIs.

Topics covered:
- Natural Language Processing with OpenAI
- Image Recognition with TensorFlow.js
- Chatbot Implementation
- Voice Recognition
- Sentiment Analysis

More detailed tutorials coming soon!`,
    date: '2024-03-10',
    readingTime: '7 min',
    author: {
      name: 'Brajesh Kumar',
      avatar: '/personal-dark.jpg'
    },
    images: [
      'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
      'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg'
    ],
    tags: ['AI', 'Machine Learning', 'Web Development'],
    featured: true
  },
  {
    id: '3',
    title: 'Modern CSS Techniques for Responsive Design',
    summary: 'Explore advanced CSS techniques and modern layout patterns for creating responsive and adaptive web designs.',
    content: `CSS has evolved significantly, offering powerful features for creating responsive designs. Let's explore modern CSS techniques that make responsive design more efficient and maintainable.

We'll discuss:
- CSS Grid and Flexbox
- Container Queries
- Custom Properties
- Modern CSS Reset
- Responsive Typography

Stay tuned for detailed examples and code snippets!`,
    date: '2024-03-05',
    readingTime: '6 min',
    author: {
      name: 'Brajesh Kumar',
      avatar: '/personal-dark.jpg'
    },
    images: [
      'https://images.pexels.com/photos/11035390/pexels-photo-11035390.jpeg',
      'https://images.pexels.com/photos/11035382/pexels-photo-11035382.jpeg'
    ],
    tags: ['CSS', 'Responsive Design', 'Web Development'],
    featured: false
  }
];

export const getUniqueTags = () => {
  const tags = new Set<string>();
  blogPosts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
};

export const getFeaturedPosts = () => {
  return blogPosts.filter(post => post.featured);
};

export const searchPosts = (query: string, tag?: string) => {
  return blogPosts.filter(post => {
    const matchesQuery = post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.summary.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase());
    
    const matchesTag = tag ? post.tags.includes(tag) : true;
    
    return matchesQuery && matchesTag;
  });
};