import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';
import { Loader } from './components/common/Loader';
import { BackgroundShapes } from './components/BackgroundShapes';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import EducationPage from './pages/EducationPage';
import ExperiencePage from './pages/ExperiencePage';
import ProjectsPage from './pages/ProjectsPage';
import CertificatesPage from './pages/CertificatesPage';
import SkillsPage from './pages/SkillsPage';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="relative min-h-screen transition-colors duration-300 dark:bg-dark-bg bg-light-bg text-gray-900 dark:text-white">
          <BackgroundShapes 
            count={12}
            colors={[
              'rgba(127, 83, 172, 0.1)',  // Purple
              'rgba(100, 125, 238, 0.1)', // Blue
              'rgba(67, 198, 172, 0.1)',  // Teal
              'rgba(248, 255, 174, 0.1)', // Yellow
            ]}
            minSize={100}
            maxSize={300}
          />
          
          <Navbar />
          
          <main className="relative z-10">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/education" element={<EducationPage />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/certificates" element={<CertificatesPage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/services" element={<ServicesPage />} />
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