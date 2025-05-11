import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, X } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import { Certificate } from '../../types';

// Sample certificates data
const certificatesData: Certificate[] = [
  {
    id: '1',
    title: 'Full Stack Web Development',
    issuer: 'CodeChef',
    date: 'June 2023',
    image: 'https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    credentialId: 'CC-12345',
    credentialUrl: 'https://example.com/cert/1',
  },
  {
    id: '2',
    title: 'Microsoft Certified: Azure Developer Associate',
    issuer: 'Microsoft',
    date: 'August 2023',
    image: 'https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    credentialId: 'MS-67890',
    credentialUrl: 'https://example.com/cert/2',
  },
  {
    id: '3',
    title: 'HackerRank Problem Solving (Advanced)',
    issuer: 'HackerRank',
    date: 'October 2023',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    credentialId: 'HR-24680',
    credentialUrl: 'https://example.com/cert/3',
  },
  {
    id: '4',
    title: 'SQL Advanced Certification',
    issuer: 'LeetCode',
    date: 'January 2024',
    image: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    credentialId: 'LC-13579',
    credentialUrl: 'https://example.com/cert/4',
  },
  {
    id: '5',
    title: 'Machine Learning Fundamentals',
    issuer: 'CodeChef',
    date: 'March 2024',
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    credentialId: 'CC-97531',
    credentialUrl: 'https://example.com/cert/5',
  },
  {
    id: '6',
    title: 'React & Redux Certification',
    issuer: 'FreeCodeCamp',
    date: 'May 2024',
    image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    credentialId: 'FCC-86420',
    credentialUrl: 'https://example.com/cert/6',
  },
];

const CertificateModal: React.FC<{ certificate: Certificate; onClose: () => void }> = ({ certificate, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className="bg-dark-200 rounded-xl max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img 
            src={certificate.image} 
            alt={certificate.title} 
            className="w-full h-48 object-cover rounded-t-xl" 
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-dark-300/80 rounded-full hover:bg-dark-400/80 transition-colors"
          >
            <X size={20} className="text-white" />
          </button>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{certificate.title}</h3>
          <p className="text-gray-400 mb-4">
            Issued by {certificate.issuer} • {certificate.date}
          </p>
          
          <div className="bg-dark-300 rounded-lg p-4 mb-6">
            <p className="text-gray-300 text-sm mb-1">Credential ID</p>
            <p className="font-medium">{certificate.credentialId}</p>
          </div>
          
          {certificate.credentialUrl && (
            <a
              href={certificate.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-full flex items-center justify-center gap-2"
            >
              <ExternalLink size={16} /> View Credential
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const CertificateCard: React.FC<{ certificate: Certificate; onClick: () => void }> = ({ certificate, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="card cursor-pointer hover:shadow-lg transition-all duration-300"
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div className="icon-box bg-secondary-900/30 flex-shrink-0">
          <Award size={24} className="text-secondary-400" />
        </div>
        <div>
          <h3 className="font-semibold hover:text-secondary-400 transition-colors">
            {certificate.title}
          </h3>
          <p className="text-gray-400 text-sm">{certificate.issuer}</p>
          <p className="text-gray-500 text-xs mt-1">{certificate.date}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Certificates = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  
  return (
    <div className="container-section">
      <SectionHeading 
        title="Certificates" 
        subtitle="My qualifications and achievements"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificatesData.map((certificate) => (
          <CertificateCard
            key={certificate.id}
            certificate={certificate}
            onClick={() => setSelectedCertificate(certificate)}
          />
        ))}
      </div>
      
      <AnimatePresence>
        {selectedCertificate && (
          <CertificateModal
            certificate={selectedCertificate}
            onClose={() => setSelectedCertificate(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Certificates;