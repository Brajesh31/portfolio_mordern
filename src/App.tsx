import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import { AnimatedBackground } from './components/AnimatedBackground';
import FallingStarsBackground from './components/FallingStarsBackground';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';
import { Loader } from './components/common/Loader';
import SocialSidebar from './components/SocialSidebar';
import ChatbotButton from './components/Chatbot/ChatbotButton';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import EducationPage from './pages/EducationPage';
import ExperiencePage from './pages/ExperiencePage';
import ProfilesPage from './pages/ProfilesPage';
import ProjectsPage from './pages/ProjectsPage';
import CertificatesPage from './pages/CertificatesPage';
import SkillsPage from './pages/SkillsPage';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';
import BlogsPage from './pages/BlogsPage';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="relative min-h-screen flex flex-col transition-colors duration-300 dark:bg-dark-bg bg-light-bg text-gray-900 dark:text-white">
          <LoadingScreen />
          <AnimatedBackground 
            count={6}
            minSize={300}
            maxSize={600}
          />
          <FallingStarsBackground />
          
          <Navbar />
          <SocialSidebar />
          <ChatbotButton />
          
          <main className="relative z-10 flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/education" element={<EducationPage />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/profiles" element={<ProfilesPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/certificates" element={<CertificatesPage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/blogs" element={<BlogsPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          
          <Footer />
          <ScrollToTop />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;