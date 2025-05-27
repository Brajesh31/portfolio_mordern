import React from 'react';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import { ScrollToTop } from '../common/ScrollToTop';
import AnimatedBackground from './AnimatedBackground';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-white dark:bg-dark-300 text-gray-900 dark:text-white transition-colors duration-200">
      <AnimatedBackground />
      <div className="absolute top-0 right-0 w-1/2 h-screen bg-gradient-to-b from-primary-50/10 dark:from-primary-900/5 to-transparent -z-10" />
      
      <Navbar />
      
      <main className="pt-20">
        {children}
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Layout;