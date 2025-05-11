import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';
import { Loader } from './components/common/Loader';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import EducationPage from './pages/EducationPage';
import ExperiencePage from './pages/ExperiencePage';
import ProjectsPage from './pages/ProjectsPage';
import CertificatesPage from './pages/CertificatesPage';
import SkillsPage from './pages/SkillsPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <Router>
      <div className="relative bg-dark-300 text-white">
        <div className="absolute top-0 right-0 w-1/2 h-screen bg-radial-gradient -z-10" />
        
        <Navbar />
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/certificates" element={<CertificatesPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        
        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;