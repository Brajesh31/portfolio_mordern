import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Send, ExternalLink } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SectionHeading from '../common/SectionHeading';
import { useTheme } from '../ThemeProvider';

interface SubService {
  title: string;
  description: string;
}

interface ServiceCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  subServices: SubService[];
}

const services: ServiceCategory[] = [
  {
    id: 'web-dev',
    title: '🚀 Web Development Services',
    icon: '🚀',
    description: 'End-to-end web solutions using modern technologies and best practices.',
    subServices: [
      {
        title: 'Full-Stack Web Application Development',
        description: 'I design and build powerful end-to-end web applications using modern tech stacks like MERN (MongoDB, Express.js, React.js, Node.js), Django, and Laravel. From the user interface to the database and everything in between, I ensure a seamless experience, fast performance, and scalable architecture.',
      },
      {
        title: 'Responsive Front-End Development',
        description: 'With a strong focus on pixel-perfect design and smooth interactions, I create front-ends that are not just responsive but also highly engaging. Using frameworks like React, Angular, and Vue, I ensure your site adapts fluidly across all screen sizes.',
      },
      {
        title: 'E-Commerce Website Development',
        description: 'Launch your online store with fully customizable e-commerce platforms tailored for your brand. I build feature-rich e-commerce solutions with cart systems, secure payment gateways, inventory management, and order tracking.',
      },
      {
        title: 'Landing Page Design & Optimization',
        description: 'Maximize conversions with a high-performing landing page tailored for marketing campaigns, product launches, or lead capture. I design fast-loading, visually compelling landing pages optimized for SEO and mobile usability.',
      },
      {
        title: 'Portfolio Website Development',
        description: 'Showcase your personal or professional journey through an elegant and modern portfolio. I create unique layouts, animation-rich interfaces, and smooth navigation to help you make a lasting impression.',
      },
    ],
  },
  {
    id: 'ai-ml',
    title: '🧠 AI & Machine Learning Services',
    icon: '🧠',
    description: 'Cutting-edge AI solutions for modern business needs.',
    subServices: [
      {
        title: 'AI-Powered Chatbots & Virtual Assistants',
        description: 'Develop conversational agents that can handle customer queries, schedule tasks, provide support, and more. Using state-of-the-art NLP models, TensorFlow, and OpenAI APIs.',
      },
      {
        title: 'Image Processing & Computer Vision',
        description: 'From facial recognition and object detection to image enhancement and segmentation, I build custom solutions using GANs, OpenCV, and PyTorch.',
      },
      {
        title: 'Recommendation Systems',
        description: 'Increase user engagement and retention through intelligent systems that suggest content, products, or services using collaborative filtering and content-based approaches.',
      },
      {
        title: 'AI Therapy Bot Development',
        description: 'Build mental health bots and virtual companions designed to simulate human-like empathy and support, combining psychology-based conversational flows with advanced NLP.',
      },
    ],
  },
  {
    id: 'data-science',
    title: '📊 Data Science & Automation',
    icon: '📊',
    description: 'Transform data into actionable insights and automated workflows.',
    subServices: [
      {
        title: 'Data Analysis & Visualization',
        description: 'Turn raw data into insights through rich, interactive dashboards using tools like Plotly, Bokeh, and Power BI to create real-time, visually appealing charts and reports.',
      },
      {
        title: 'Process Automation Scripts',
        description: 'I help businesses automate manual tasks such as data entry, file organization, reporting, and notifications using Python and Power Automate.',
      },
      {
        title: 'Business Intelligence Reports',
        description: 'I deliver dynamic BI reports by combining SQL-based data extraction, Excel analytics, and Google Data Studio visualization.',
      },
    ],
  },
  {
    id: 'cloud-devops',
    title: '🌐 Cloud & DevOps Services',
    icon: '🌐',
    description: 'Scalable cloud solutions and DevOps practices.',
    subServices: [
      {
        title: 'Cloud Architecture Setup',
        description: 'Design secure, scalable, and cost-effective cloud infrastructures for web apps, APIs, or data systems using AWS, Azure, or GCP.',
      },
      {
        title: 'Web Hosting & Deployment',
        description: 'Deploy your website or app with speed and reliability, including DNS configuration, SSL setup, and continuous integration.',
      },
    ],
  },
  {
    id: 'ui-ux',
    title: '✍️ UI/UX Design & Branding',
    icon: '✍️',
    description: 'Create beautiful and intuitive user experiences.',
    subServices: [
      {
        title: 'UI/UX Design for Web & Mobile Apps',
        description: 'I design beautiful, user-centric interfaces that reflect your brand and optimize user journeys using Figma and Adobe XD.',
      },
      {
        title: 'Design System Creation',
        description: 'Maintain consistency across your product with a centralized design system, including reusable component libraries and clear guidelines.',
      },
    ],
  },
  {
    id: 'mentoring',
    title: '🎓 Technical Mentoring & Consulting',
    icon: '🎓',
    description: 'Share knowledge and guide others in their tech journey.',
    subServices: [
      {
        title: 'College-Level Project Mentorship',
        description: 'Provide structured, personalized guidance to students on academic or capstone projects, from ideation to deployment.',
      },
      {
        title: 'Workshops and Training',
        description: 'Conduct impactful workshops covering topics like AI project development, web frameworks, and automation workflows.',
      },
    ],
  },
];

const Services = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
      setShowBanner(bottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const handleContactClick = (service: string) => {
    navigate('/contact', { state: { selectedService: service } });
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg py-20 relative transition-colors duration-300">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Services I Offer" 
          subtitle="Explore my professional services and let's create something amazing together"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {services.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className={`bg-light-card dark:bg-dark-card rounded-xl overflow-hidden border transition-colors duration-300 ${
                expandedCategory === category.id
                  ? 'border-primary-500 shadow-lg shadow-primary-500/20'
                  : 'border-gray-200 dark:border-gray-800'
              }`}
            >
              <button
                onClick={() => handleCategoryClick(category.id)}
                className="w-full text-left p-6 focus:outline-none"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {category.title}
                  </h3>
                  <motion.div
                    animate={{ rotate: expandedCategory === category.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-primary-400" />
                  </motion.div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  {category.description}
                </p>
              </button>

              <AnimatePresence>
                {expandedCategory === category.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 space-y-4">
                      {category.subServices.map((service, index) => (
                        <motion.div
                          key={service.title}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-light-bg dark:bg-dark-bg rounded-lg p-4 transition-colors duration-300"
                        >
                          <h4 className="font-medium text-primary-600 dark:text-primary-400 mb-2">
                            {service.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            {service.description}
                          </p>
                          <button
                            onClick={() => handleContactClick(service.title)}
                            className="text-sm flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                          >
                            <Send size={14} /> Contact for this service
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-primary-600 text-white py-4 px-6 flex items-center justify-between"
          >
            <p className="text-lg font-medium">Ready to start a project?</p>
            <Link
              to="/contact"
              className="flex items-center gap-2 bg-white text-primary-600 px-6 py-2 rounded-full hover:bg-primary-50 transition-colors"
            >
              Let's Work Together <ExternalLink size={16} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Services;