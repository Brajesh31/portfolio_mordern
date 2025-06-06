import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, X } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import { Certificate } from '../../types';

// Sample certificates data
const certificatesData: Certificate[] = [
  {
    id: '3',
    title: 'Python for Data Science',
    issuer: 'IBM',
    date: 'May 2024',
    image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg',
    credentialId: 'IBM-DS-001',
    credentialUrl: 'https://www.credly.com/badges/python-for-data-science'
  },
  {
    id: '4',
    title: 'Data Science Methodologies',
    issuer: 'IBM',
    date: 'July 2024',
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg',
    credentialId: 'IBM-DS-002',
    credentialUrl: 'https://www.credly.com/badges/data-science-methodologies'
  },
  {
    id: '5',
    title: 'Data Science Foundations - Level 3',
    issuer: 'IBM',
    date: 'July 2024',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    credentialId: 'IBM-DS-003',
    credentialUrl: 'https://www.credly.com/badges/data-science-foundations'
  },
  {
    id: '6',
    title: 'SQL and Relational Databases 101',
    issuer: 'CognitiveClass.ai',
    date: 'June 2024',
    image: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg',
    credentialId: 'CC-SQL-101',
    credentialUrl: 'https://courses.cognitiveclass.ai/certificates/sql-101'
  },
  {
    id: '6',
    title: 'The Art of Prompt Engineering',
    issuer: 'CognitiveClass.ai',
    date: 'June 2024',
    image: 'https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg',
    credentialId: 'CC-PROMPT-ART',
    credentialUrl: 'https://courses.cognitiveclass.ai/certificates/prompt-engineering'
  },
  {
    id: '6',
    title: 'Gemini in Google Docs',
    issuer: 'Google Cloud',
    date: 'May 2024',
    image: 'https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg',
    credentialId: 'GGL-GEM-DOCS',
    credentialUrl: 'https://googlecloud.skillshop.com/certificates/gemini-docs'
  },
  {
    id: '7',
    title: 'Gemini in Google Sheets',
    issuer: 'Google Cloud',
    date: 'May 2024',
    image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg',
    credentialId: 'GGL-GEM-SHEETS',
    credentialUrl: 'https://googlecloud.skillshop.com/certificates/gemini-sheets'
  },
  {
    id: '8',
    title: 'Gemini in Google Slides',
    issuer: 'Google Cloud',
    date: 'May 2024',
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg',
    credentialId: 'GGL-GEM-SLIDES',
    credentialUrl: 'https://googlecloud.skillshop.com/certificates/gemini-slides'
  },
  {
    id: '9',
    title: 'Gemini in Google Meet',
    issuer: 'Google Cloud',
    date: 'May 2024',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    credentialId: 'GGL-GEM-MEET',
    credentialUrl: 'https://googlecloud.skillshop.com/certificates/gemini-meet'
  },
  {
    id: '10',
    title: 'Pandas Bootcamp | Data Analysis with Pandas Python3',
    issuer: 'Udemy',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg',
    credentialId: 'UDE-PANDAS',
    credentialUrl: 'https://udemy.com/certificate/pandas-bootcamp'
  },
  {
    id: '12',
    title: 'SQL and Relational Databases 101',
    issuer: 'CognitiveClass.ai',
    date: 'June 2024',
    image: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg',
    credentialId: 'CC-SQL-101',
    credentialUrl: 'https://courses.cognitiveclass.ai/certificates/sql-101'
  },
  {
    id: '13',
    title: 'The Art of Prompt Engineering',
    issuer: 'CognitiveClass.ai',
    date: 'June 2024',
    image: 'https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg',
    credentialId: 'CC-PROMPT-ART',
    credentialUrl: 'https://courses.cognitiveclass.ai/certificates/prompt-engineering'
  },
  {
    id: '13',
    title: 'Gemini in Google Docs',
    issuer: 'Google Cloud',
    date: 'May 2024',
    image: 'https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg',
    credentialId: 'GGL-GEM-DOCS',
    credentialUrl: 'https://googlecloud.skillshop.com/certificates/gemini-docs'
  },
  {
    id: '14',
    title: 'Gemini in Google Sheets',
    issuer: 'Google Cloud',
    date: 'May 2024',
    image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg',
    credentialId: 'GGL-GEM-SHEETS',
    credentialUrl: 'https://googlecloud.skillshop.com/certificates/gemini-sheets'
  },
  {
    id: '15',
    title: 'Gemini in Google Slides',
    issuer: 'Google Cloud',
    date: 'May 2024',
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg',
    credentialId: 'GGL-GEM-SLIDES',
    credentialUrl: 'https://googlecloud.skillshop.com/certificates/gemini-slides'
  },
  {
    id: '16',
    title: 'Gemini in Google Meet',
    issuer: 'Google Cloud',
    date: 'May 2024',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    credentialId: 'GGL-GEM-MEET',
    credentialUrl: 'https://googlecloud.skillshop.com/certificates/gemini-meet'
  },
  {
    id: '17',
    title: 'Pandas Bootcamp | Data Analysis with Pandas Python3',
    issuer: 'Udemy',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg',
    credentialId: 'UDE-PANDAS',
    credentialUrl: 'https://udemy.com/certificate/pandas-bootcamp'
  },
  {
    id: '18',
    title: 'Gemini in Google Docs',
    issuer: 'Google Cloud',
    date: 'May 2024',
    image: 'https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg',
    credentialId: 'GGL-GEM-DOCS',
    credentialUrl: 'https://googlecloud.skillshop.com/certificates/gemini-docs'
  },
  {
    id: '19',
    title: 'Gemini in Google Slides',
    issuer: 'Google Cloud',
    date: 'May 2024',
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg',
    credentialId: 'GGL-GEM-SLIDES',
    credentialUrl: 'https://googlecloud.skillshop.com/certificates/gemini-slides'
  },
  {
    id: '20',
    title: 'Gemini in Google Meet',
    issuer: 'Google Cloud',
    date: 'May 2024',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    credentialId: 'GGL-GEM-MEET',
    credentialUrl: 'https://googlecloud.skillshop.com/certificates/gemini-meet'
  },
  {
    id: '21',
    title: 'Create a Budget with Google Sheets',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg',
    credentialId: 'RKE7ENA811A0',
    credentialUrl: 'https://coursera.org/verify/RKE7ENA811A0'
  },
  {
    id: '22',
    title: 'Strategically Build and Engage Your Network on LinkedIn',
    issuer: 'United Latino Students Association',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    credentialId: 'YC6VX14WS7BU',
    credentialUrl: 'https://coursera.org/verify/YC6VX14WS7BU'
  },
  {
    id: '23',
    title: 'Use Canva to Create Desktop and Mobile-friendly Web Pages',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg',
    credentialId: '8ULAP5KM83Y0',
    credentialUrl: 'https://coursera.org/verify/8ULAP5KM83Y0'
  },
  {
    id: '24',
    title: 'Pandas Bootcamp | Data Analysis with Pandas Python3',
    issuer: 'Udemy',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg',
    credentialId: 'UC-f9187042-b451-4a32-b357-83d402ace15a',
    credentialUrl: 'https://udemy.com/certificate/UC-f9187042-b451-4a32-b357-83d402ace15a'
  },
  {
    id: '25',
    title: 'AWS APAC - Solutions Architecture Job Simulation',
    issuer: 'Forage',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg',
    credentialId: 'KuL5Gy2Xm45XuFXhZ',
    credentialUrl: 'https://forage.com/certificate/KuL5Gy2Xm45XuFXhZ'
  },
  {
    id: '26',
    title: 'AWS Multi-Tier VPC Architecture',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    credentialId: 'IYY4SR2OD06R',
    credentialUrl: 'https://coursera.org/verify/IYY4SR2OD06R'
  },
  {
    id: '27',
    title: 'Access an EC2 Instance Shell from the AWS Console',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg',
    credentialId: '15LIUPHYW7GF',
    credentialUrl: 'https://coursera.org/verify/15LIUPHYW7GF'
  },
  {
    id: '28',
    title: 'Advanced Programme Planning Phases Framework in ClickUp',
    issuer: 'United Latino Students Association',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg',
    credentialId: '2T3JW5EUKRED',
    credentialUrl: 'https://coursera.org/verify/2T3JW5EUKRED'
  },
  {
    id: '29',
    title: 'Aerial Image Segmentation with PyTorch',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg',
    credentialId: 'VUNMGL6L2M72',
    credentialUrl: 'https://coursera.org/verify/VUNMGL6L2M72'
  },
  {
    id: '30',
    title: 'Agile Project: Product Prototype Touchpoint Analysis in Miro',
    issuer: 'United Latino Students Association',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg',
    credentialId: 'K50WF4O2GXLZ',
    credentialUrl: 'https://coursera.org/verify/K50WF4O2GXLZ'
  },
  {
    id: '31',
    title: 'Analyze Apple\'s Stock and Financials with Bloomberg Terminal',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    credentialId: '4HZQWP5HBYST',
    credentialUrl: 'https://coursera.org/verify/4HZQWP5HBYST'
  },
  {
    id: '32',
    title: 'Automate Doc Review Process with SharePoint & Power Automate',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg',
    credentialId: 'ZUHAD5FW05JL',
    credentialUrl: 'https://coursera.org/verify/ZUHAD5FW05JL'
  },
  {
    id: '33',
    title: 'Automate Equipment Ordering Prep Process with Power Automate',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg',
    credentialId: 'NUE06IUFWY1B',
    credentialUrl: 'https://coursera.org/verify/NUE06IUFWY1B'
  },
  {
    id: '34',
    title: 'Automate Tasks and Processes with Jira',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg',
    credentialId: '1MSJ6Q06PW40',
    credentialUrl: 'https://coursera.org/verify/1MSJ6Q06PW40'
  },
  {
    id: '35',
    title: 'Automating Sales Tasks with Zapier',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg',
    credentialId: '1OTOQF8IG65W',
    credentialUrl: 'https://coursera.org/verify/1OTOQF8IG65W'
  },
  {
    id: '36',
    title: 'Automating Team Communication with Google Sheets and Apps Script',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    credentialId: '1N2CHIWLNH34',
    credentialUrl: 'https://coursera.org/verify/1N2CHIWLNH34'
  },
  {
    id: '37',
    title: 'Automize Monthly Report Creation with Power Automate',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg',
    credentialId: 'PK0OMCLQMGL6',
    credentialUrl: 'https://coursera.org/verify/PK0OMCLQMGL6'
  },
  {
    id: '38',
    title: 'Azure Synapse SQL Pool - Implement Polybase',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg',
    credentialId: 'J0OKO7WL9ISH',
    credentialUrl: 'https://coursera.org/verify/J0OKO7WL9ISH'
  },
  {
    id: '39',
    title: 'Azure: Create a Virtual Machine and Deploy a Web Server',
    issuer: 'United Latino Students Association',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg',
    credentialId: 'Q7WFBDPSFZ8X',
    credentialUrl: 'https://coursera.org/verify/Q7WFBDPSFZ8X'
  },
  {
    id: '40',
    title: 'Azure: Create a REST API Using NodeJS Serverless Functions',
    issuer: 'United Latino Students Association',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    credentialId: '51JXYKQ5EPK3',
    credentialUrl: 'https://coursera.org/verify/51JXYKQ5EPK3'
  },
  {
    id: '41',
    title: 'Basic Game Development with Levels Using Scratch',
    issuer: 'United Latino Students Association',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg',
    credentialId: 'L8MCEK264OV1',
    credentialUrl: 'https://coursera.org/verify/L8MCEK264OV1'
  },
  {
    id: '42',
    title: 'Beginners Overview of Swagger Editor',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg',
    credentialId: 'AII1YT0BWX7I',
    credentialUrl: 'https://coursera.org/verify/AII1YT0BWX7I'
  },
  {
    id: '43',
    title: 'Brand Marketing and SEO Tools Using Wix',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg',
    credentialId: 'Z8ZFNFW4MFNZ',
    credentialUrl: 'https://coursera.org/verify/Z8ZFNFW4MFNZ'
  },
  {
    id: '44',
    title: 'Build Customizable Sales Presentation Graphics Using Canva',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg',
    credentialId: 'U16VPKBLWHKJ',
    credentialUrl: 'https://coursera.org/verify/U16VPKBLWHKJ'
  },
  {
    id: '45',
    title: 'Build Image Quality Inspection Using AWS Lookout for Vision',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    credentialId: '0LE54BW5JL5F',
    credentialUrl: 'https://coursera.org/verify/0LE54BW5JL5F'
  },
  {
    id: '46',
    title: 'Build a Budget and Analyze Variance Using Google Sheets',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg',
    credentialId: 'JNE5YP648F8O',
    credentialUrl: 'https://coursera.org/verify/JNE5YP648F8O'
  },
  {
    id: '47',
    title: 'Build a Full Website Using WordPress',
    issuer: 'United Latino Students Association',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg',
    credentialId: 'QFVMAGYIFFGH',
    credentialUrl: 'https://coursera.org/verify/QFVMAGYIFFGH'
  },
  {
    id: '48',
    title: 'Build a Product Management Plan Framework in Trello',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg',
    credentialId: 'YL738VGVPJVJ',
    credentialUrl: 'https://coursera.org/verify/YL738VGVPJVJ'
  },
  {
    id: '49',
    title: 'Build a Product Roadmap with Aha!',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg',
    credentialId: 'FI6SUYCHCUVE',
    credentialUrl: 'https://coursera.org/verify/FI6SUYCHCUVE'
  },
  {
    id: '50',
    title: 'Build a Professional Resume Using Canva',
    issuer: 'United Latino Students Association',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    credentialId: '1YZDUHMWNDGF',
    credentialUrl: 'https://coursera.org/verify/1YZDUHMWNDGF'
  },
  {
    id: '51',
    title: 'Build a Computer Vision App with Azure Cognitive Services',
    issuer: 'Microsoft',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg',
    credentialId: 'RKKF6ZJFM0IQ',
    credentialUrl: 'https://coursera.org/verify/RKKF6ZJFM0IQ'
  },
  {
    id: '52',
    title: 'Build a Free Website with WordPress',
    issuer: 'United Latino Students Association',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg',
    credentialId: 'Y2GNDQMPZPAE',
    credentialUrl: 'https://coursera.org/verify/Y2GNDQMPZPAE'
  },
  {
    id: '53',
    title: 'Build a Mobile App with Google Sheets on Glide and No Coding',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg',
    credentialId: 'XFZZ1ZUVBMTQ',
    credentialUrl: 'https://coursera.org/verify/XFZZ1ZUVBMTQ'
  },
  {
    id: '54',
    title: 'Build a Website Using Wix Artificial Design Intelligence',
    issuer: 'United Latino Students Association',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg',
    credentialId: 'K6Z6OYU5G98K',
    credentialUrl: 'https://coursera.org/verify/K6Z6OYU5G98K'
  },
  {
    id: '55',
    title: 'Build an Automated Landing Page Using AI from Wix ADI',
    issuer: 'United Latino Students Association',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    credentialId: 'NUD7PFFBI0NV',
    credentialUrl: 'https://coursera.org/verify/NUD7PFFBI0NV'
  },
  {
    id: '56',
    title: 'Build Your Business Brand Using Canva',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg',
    credentialId: 'KS6H06KDB0C1',
    credentialUrl: 'https://coursera.org/verify/KS6H06KDB0C1'
  },
  {
    id: '57',
    title: 'Build Your First Machine Learning Pipeline Using Dataiku',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg',
    credentialId: 'ZKGKDQA02C5F',
    credentialUrl: 'https://coursera.org/verify/ZKGKDQA02C5F'
  },
  {
    id: '58',
    title: 'Building Candlestick Charts with Google Sheets',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg',
    credentialId: 'XNN2KYUFIQ24',
    credentialUrl: 'https://coursera.org/verify/XNN2KYUFIQ24'
  },
  {
    id: '59',
    title: 'Building Digital Media Using Graphic Design in PowerPoint',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg',
    credentialId: 'WG1LMIY6L30B',
    credentialUrl: 'https://coursera.org/verify/WG1LMIY6L30B'
  },
  {
    id: '60',
    title: 'Building Smart Business Assistants with IBM Watson',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    credentialId: 'H7ZT1S7AZX1W',
    credentialUrl: 'https://coursera.org/verify/H7ZT1S7AZX1W'
  },
  {
    id: '61',
    title: 'Building Students Math Skills with iKnowit',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg',
    credentialId: 'OULMB3R5NKXH',
    credentialUrl: 'https://coursera.org/verify/OULMB3R5NKXH'
  },
  {
    id: '62',
    title: 'Building an Ecosystem Model with Insight Maker',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg',
    credentialId: '3PO29AYDG9LR',
    credentialUrl: 'https://coursera.org/verify/3PO29AYDG9LR'
  },
  {
    id: '63',
    title: 'Business Operations Support in Google Sheets',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg',
    credentialId: 'N3DJFVWTU7DC',
    credentialUrl: 'https://coursera.org/verify/N3DJFVWTU7DC'
  },
  {
    id: '64',
    title: 'Certificate of Excellence in Round 3: Learning Boot Camp of Unstop Talent Park 2025',
    issuer: 'Unstop',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg',
    credentialId: '28b2aae3-4f23-4bc0-80a6-9dbedc5d76fb',
    credentialUrl: 'https://unstop.com'
  },
  {
    id: '65',
    title: 'Certificate of Excellence in Treasure Hunt - February Series',
    issuer: 'Unstop',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    credentialId: '25fa2a50-ffa9-4859-a755-5d31f3325f4c',
    credentialUrl: 'https://unstop.com'
  },
  {
    id: '66',
    title: 'Certificate of Participation in Bug Bounty of Verge - The Technical Fest',
    issuer: 'Unstop',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg',
    credentialId: 'f6a7cfb6-9580-464a-8981-690dc6855a14',
    credentialUrl: 'https://unstop.com'
  },
  {
    id: '67',
    title: 'Certificate of Participation in Challenge 19 of Weekly Coding Challenge',
    issuer: 'Unstop',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg',
    credentialId: 'a1859b6a-e590-40f5-9b2e-a2405b06d2d9',
    credentialUrl: 'https://unstop.com'
  },
  {
    id: '68',
    title: 'Certificate of Participation in Code of the Phoenix | Hackathon of E-Summit 2025',
    issuer: 'Unstop',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg',
    credentialId: '22dccce4-f797-49e7-85e1-b69ea262be1f',
    credentialUrl: 'https://unstop.com'
  },
  {
    id: '69',
    title: 'Certificate of Participation in Cryptic Hunt of Verge - The Technical Fest',
    issuer: 'Unstop',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg',
    credentialId: '5ec13340-bce6-40e8-87f6-fcb00d22ea43',
    credentialUrl: 'https://unstop.com'
  },
  {
    id: '70',
    title: 'Certificate of Participation in Promptify of Invictus 2025',
    issuer: 'Unstop',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    credentialId: 'caab3a7a-b6a2-4821-85db-8c1886c910f4',
    credentialUrl: 'https://unstop.com'
  },
  {
    id: '71',
    title: 'Certificate of Participation in Research Forge of Invictus 2025',
    issuer: 'Unstop',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg',
    credentialId: '78deb237-73d8-4d7d-91e5-8c096beb13a5',
    credentialUrl: 'https://unstop.com'
  },
  {
    id: '72',
    title: 'Certificate of Participation in Round 3: Quiz of Research Forge',
    issuer: 'Unstop',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg',
    credentialId: 'f2125667-41e2-4f22-bb01-d77a4b90af14',
    credentialUrl: 'https://unstop.com'
  },
  {
    id: '73',
    title: 'Change Leadership: Developing Strategic Gap Analysis in Miro',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg',
    credentialId: 'ATHSIF7B1CES',
    credentialUrl: 'https://coursera.org/verify/ATHSIF7B1CES'
  },
  {
    id: '74',
    title: 'Compose and Program Music in Python Using Earsketch',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg',
    credentialId: 'TJLGI394JTDZ',
    credentialUrl: 'https://coursera.org/verify/TJLGI394JTDZ'
  },
  {
    id: '75',
    title: 'Conditional Formatting, Tables and Charts in Microsoft Excel',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    credentialId: 'UPEXJPAWB4B5',
    credentialUrl: 'https://coursera.org/verify/UPEXJPAWB4B5'
  },
  {
    id: '76',
    title: 'Configuring Your IDE for Absolute Beginners with AWS Cloud9',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg',
    credentialId: 'G17VJX2OP20T',
    credentialUrl: 'https://coursera.org/verify/G17VJX2OP20T'
  },
  {
    id: '77',
    title: 'Create Charts and Dashboard Using Google Sheets',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg',
    credentialId: 'NPJDSZNCOMSW',
    credentialUrl: 'https://coursera.org/verify/NPJDSZNCOMSW'
  },
  {
    id: '78',
    title: 'Create Charts and Dashboards Using Microsoft Excel',
    issuer: 'EDX Alumni',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg',
    credentialId: 'JWR6NCIN1XT5',
    credentialUrl: 'https://edx.org/verify/JWR6NCIN1XT5'
  },
  {
    id: '79',
    title: 'Create Engaging Presentations with Easelly',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg',
    credentialId: 'REX7DI09TCZK',
    credentialUrl: 'https://coursera.org/verify/REX7DI09TCZK'
  },
  {
    id: '80',
    title: 'Create Interactive Choice Boards with Seesaw',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    credentialId: 'S0CZ4E7QCNM1',
    credentialUrl: 'https://coursera.org/verify/S0CZ4E7QCNM1'
  },
  {
    id: '81',
    title: 'Create Model-driven Power App for Rental Company',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg',
    credentialId: 'WCUTAD8YU27I',
    credentialUrl: 'https://coursera.org/verify/WCUTAD8YU27I'
  },
  {
    id: '82',
    title: 'Create Organizational Templates in Trello',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg',
    credentialId: 'DNJCY200IB9O',
    credentialUrl: 'https://coursera.org/verify/DNJCY200IB9O'
  },
  {
    id: '83',
    title: 'Create PDF Balance Report Using HTML, Excel & Power Automate',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg',
    credentialId: 'GWJGMSXSCR92',
    credentialUrl: 'https://coursera.org/verify/GWJGMSXSCR92'
  },
  {
    id: '84',
    title: 'Create Power App for Adding Records to SharePoint List',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg',
    credentialId: 'YBTCUTLT27RH',
    credentialUrl: 'https://coursera.org/verify/YBTCUTLT27RH'
  },
  {
    id: '85',
    title: 'Create Student Books with Book Creator',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    credentialId: 'SQ167RI2YCZC',
    credentialUrl: 'https://coursera.org/verify/SQ167RI2YCZC'
  },
  {
    id: '86',
    title: 'Create Tasks and Lists with ClickUp',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg',
    credentialId: 'IK3TNUZS3A4Y',
    credentialUrl: 'https://coursera.org/verify/IK3TNUZS3A4Y'
  },
  {
    id: '87',
    title: 'Create Visually Engaging Presentations Using Microsoft Sway',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg',
    credentialId: 'POHMVG4KOVFW',
    credentialUrl: 'https://coursera.org/verify/POHMVG4KOVFW'
  },
  {
    id: '88',
    title: 'Create Your First Python Program',
    issuer: 'United Latino Students Association',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg',
    credentialId: 'YHRR3XPV5JVQ',
    credentialUrl: 'https://coursera.org/verify/YHRR3XPV5JVQ'
  },
  {
    id: '89',
    title: 'Create Your UX Portfolio with Crevado',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg',
    credentialId: 'H32NN875QYLJ',
    credentialUrl: 'https://coursera.org/verify/H32NN875QYLJ'
  },
  {
    id: '90',
    title: 'Create a Business Proposal with Visme for Businesses',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    credentialId: 'QXBS7ZAF3FQA',
    credentialUrl: 'https://coursera.org/verify/QXBS7ZAF3FQA'
  },
  {
    id: '91',
    title: 'Create a Cover Letter with an Envelope Using Microsoft Word',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg',
    credentialId: 'K6NL4S04JZTL',
    credentialUrl: 'https://coursera.org/verify/K6NL4S04JZTL'
  },
  {
    id: '92',
    title: 'Create a Custom Marketing Analytics Dashboard in Data Studio',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg',
    credentialId: 'KRSEEVF3S95E',
    credentialUrl: 'https://coursera.org/verify/KRSEEVF3S95E'
  },
  {
    id: '93',
    title: 'Create a Customer Service Survey in Microsoft Forms',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg',
    credentialId: 'ZG0QBSD8KJA4',
    credentialUrl: 'https://coursera.org/verify/ZG0QBSD8KJA4'
  },
  {
    id: '94',
    title: 'Create a Simple Gantt Chart Using Google Sheets',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg',
    credentialId: 'H9WO4ATJ78LB',
    credentialUrl: 'https://coursera.org/verify/H9WO4ATJ78LB'
  },
  {
    id: '95',
    title: 'Create a Simple Gantt Chart Using Microsoft Excel',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    credentialId: '7BSJZCRBZVVI',
    credentialUrl: 'https://coursera.org/verify/7BSJZCRBZVVI'
  },
  {
    id: '96',
    title: 'Create a Small Business Website with Weebly',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg',
    credentialId: 'MPUCKEGASAC7',
    credentialUrl: 'https://coursera.org/verify/MPUCKEGASAC7'
  },
  {
    id: '97',
    title: 'Create a Superhero Name Generator with TensorFlow',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg',
    credentialId: '8MOIZXI4E1CY',
    credentialUrl: 'https://coursera.org/verify/8MOIZXI4E1CY'
  },
  {
    id: '98',
    title: 'Create a Custom Workflow in Wrike',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg',
    credentialId: 'S6UK41L554FM',
    credentialUrl: 'https://coursera.org/verify/S6UK41L554FM'
  },
  {
    id: '99',
    title: 'Create a Value Proposition Canvas in Miro',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg',
    credentialId: 'RSFO9MIXS7LE',
    credentialUrl: 'https://coursera.org/verify/RSFO9MIXS7LE'
  },
  {
    id: '100',
    title: 'Create a Website with MailChimp',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    credentialId: '17MVWT63SVII',
    credentialUrl: 'https://coursera.org/verify/17MVWT63SVII'
  },
  {
    id: '101',
    title: 'Create an Email Autoresponder Using Mailchimp',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg',
    credentialId: '8TV78UU71HST',
    credentialUrl: 'https://coursera.org/verify/8TV78UU71HST'
  },
  {
    id: '102',
    title: 'Create an Organizational Company Chart with Canva',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg',
    credentialId: 'V4BOYNXGDOYH',
    credentialUrl: 'https://coursera.org/verify/V4BOYNXGDOYH'
  },
  {
    id: '103',
    title: 'Create an Infographic with Infogram',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg',
    credentialId: 'Y5XRH7BVHZY7',
    credentialUrl: 'https://coursera.org/verify/Y5XRH7BVHZY7'
  },
  {
    id: '104',
    title: 'Create and Design Digital Products Using Canva',
    issuer: 'United Latino Students Association',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg',
    credentialId: '3N7HJKKYETPM',
    credentialUrl: 'https://coursera.org/verify/3N7HJKKYETPM'
  },
  {
    id: '105',
    title: 'Create and Manage a Project Dashboard with Wrike',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    credentialId: 'GEPTT9LRDFZI',
    credentialUrl: 'https://coursera.org/verify/GEPTT9LRDFZI'
  },
  {
    id: '106',
    title: 'Create Attractive Infographics with Creately',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg',
    credentialId: 'OJNGTHX87WKS',
    credentialUrl: 'https://coursera.org/verify/OJNGTHX87WKS'
  },
  {
    id: '107',
    title: 'Create Social Media Content with Prezi',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg',
    credentialId: 'YPR2LQ62N09X',
    credentialUrl: 'https://coursera.org/verify/YPR2LQ62N09X'
  },
  {
    id: '108',
    title: 'Create Website Videos with Canva',
    issuer: 'EDX Alumni',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg',
    credentialId: 'QS8RY49ISMIR',
    credentialUrl: 'https://edx.org/verify/QS8RY49ISMIR'
  },
  {
    id: '109',
    title: 'Create Your E-commerce Store with Ecwid',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg',
    credentialId: '58YWCZ73YWUM',
    credentialUrl: 'https://coursera.org/verify/58YWCZ73YWUM'
  },
  {
    id: '110',
    title: 'Create Your E-commerce Store with Shopify',
    issuer: 'United Latino Students Association',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    credentialId: 'JT72XJYI48V6',
    credentialUrl: 'https://coursera.org/verify/JT72XJYI48V6'
  },
  {
    id: '111',
    title: 'Creating Horizontal and Vertical Timelines in PowerPoint',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg',
    credentialId: 'KQAQ1WQYCPRC',
    credentialUrl: 'https://coursera.org/verify/KQAQ1WQYCPRC'
  },
  {
    id: '112',
    title: 'Creating Multi Task Models with Keras',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg',
    credentialId: 'M554KXELMRMK',
    credentialUrl: 'https://coursera.org/verify/M554KXELMRMK'
  },
  {
    id: '113',
    title: 'Creating Tasks and Goals for a Project in ClickUp',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg',
    credentialId: 'SI8BJIAGA6IF',
    credentialUrl: 'https://coursera.org/verify/SI8BJIAGA6IF'
  },
  {
    id: '114',
    title: 'Creating a Budget with Microsoft Excel',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg',
    credentialId: 'HHQOGKI8I4P7',
    credentialUrl: 'https://coursera.org/verify/HHQOGKI8I4P7'
  },
  {
    id: '115',
    title: 'Creating a Portfolio Using Weebly',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    credentialId: 'G7E0MZ71SS4E',
    credentialUrl: 'https://coursera.org/verify/G7E0MZ71SS4E'
  },
  {
    id: '116',
    title: 'Critical Path Analysis Using Lucidchart',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg',
    credentialId: '3104V29XYNLF',
    credentialUrl: 'https://coursera.org/verify/3104V29XYNLF'
  },
  {
    id: '117',
    title: 'Data Visualization in Microsoft PowerPoint',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg',
    credentialId: 'F7D8F3PC94BS',
    credentialUrl: 'https://coursera.org/verify/F7D8F3PC94BS'
  },
  {
    id: '118',
    title: 'Data Visualization Using Bokeh',
    issuer: 'United Latino Students Association',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg',
    credentialId: 'Y0RQ4WY71RIB',
    credentialUrl: 'https://coursera.org/verify/Y0RQ4WY71RIB'
  },
  {
    id: '119',
    title: 'Data Visualization Using Plotly',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg',
    credentialId: 'PV5TT3N8IC27',
    credentialUrl: 'https://coursera.org/verify/PV5TT3N8IC27'
  },
  {
    id: '120',
    title: 'Data Visualization Using Plotnine and ggplot',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    credentialId: '5AVCKUZKSVR4',
    credentialUrl: 'https://coursera.org/verify/5AVCKUZKSVR4'
  },
  {
    id: '121',
    title: 'Deep Learning with PyTorch: Generative Adversarial Network',
    issuer: 'United Latino Students Association',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg',
    credentialId: '3CWLRJ7TH5KM',
    credentialUrl: 'https://coursera.org/verify/3CWLRJ7TH5KM'
  },
  {
    id: '122',
    title: 'Deep Learning with PyTorch: GradCAM',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg',
    credentialId: 'Q4TQI687KI0F',
    credentialUrl: 'https://coursera.org/verify/Q4TQI687KI0F'
  },
  {
    id: '123',
    title: 'Deep Learning with PyTorch: Image Segmentation',
    issuer: 'United Latino Students Association',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg',
    credentialId: 'YQ5K0LIMZ46Q',
    credentialUrl: 'https://coursera.org/verify/YQ5K0LIMZ46Q'
  },
  {
    id: '124',
    title: 'Deep Learning with PyTorch: Object Localization',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg',
    credentialId: 'UOL99DYSM4W8',
    credentialUrl: 'https://coursera.org/verify/UOL99DYSM4W8'
  },
  {
    id: '125',
    title: 'Design a Pitch Deck with Canva',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    credentialId: 'G1K53UY9ZGKW',
    credentialUrl: 'https://coursera.org/verify/G1K53UY9ZGKW'
  },
  {
    id: '126',
    title: 'Designing and Formatting a Presentation in PowerPoint',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg',
    credentialId: '3U4D49FFC3A3',
    credentialUrl: 'https://coursera.org/verify/3U4D49FFC3A3'
  },
  {
    id: '127',
    title: 'Develop LinkedIn Designs with Visme',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg',
    credentialId: 'NJATP4B8B9FG',
    credentialUrl: 'https://coursera.org/verify/NJATP4B8B9FG'
  },
  {
    id: '128',
    title: 'Develop a Company Website with Wix',
    issuer: 'United Latino Students Association',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg',
    credentialId: 'HPJXL9O13FV1',
    credentialUrl: 'https://coursera.org/verify/HPJXL9O13FV1'
  },
  {
    id: '129',
    title: 'Developing Advanced Programme Delivery Framework in ClickUp',
    issuer: 'United Latino Students Association',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg',
    credentialId: 'UZCO63KQKS5K',
    credentialUrl: 'https://coursera.org/verify/UZCO63KQKS5K'
  },
  {
    id: '130',
    title: 'Developing a Programme Management Blueprint with ClickUp',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    credentialId: 'HVNFZILN7GLS',
    credentialUrl: 'https://coursera.org/verify/HVNFZILN7GLS'
  },
  {
    id: '131',
    title: 'Enhance Student Learning with Interactive Lessons in Nearpod',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg',
    credentialId: 'LYVUPB3LZ7OS',
    credentialUrl: 'https://coursera.org/verify/LYVUPB3LZ7OS'
  },
  {
    id: '132',
    title: 'Enigma - CTF',
    issuer: 'United Latino Students Association',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg',
    credentialId: 'f9da92bf-52af-46dd-8f62-0118bf45b051',
    credentialUrl: 'https://coursera.org/verify/f9da92bf-52af-46dd-8f62-0118bf45b051'
  },
  {
    id: '133',
    title: 'Ethical AI and Its Implications for Modern Business 4.0',
    issuer: 'Udemy',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg',
    credentialId: 'UC-cb5cfeOc-0859-4563-b348-718e21f9',
    credentialUrl: 'https://udemy.com/certificate/UC-cb5cfeOc-0859-4563-b348-718e21f9'
  },
  {
    id: '134',
    title: 'Expand Employee Interaction with Canvas',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg',
    credentialId: 'WRVYTRZ5VGYJ',
    credentialUrl: 'https://coursera.org/verify/WRVYTRZ5VGYJ'
  },
  {
    id: '135',
    title: 'Facial Expression Recognition with PyTorch',
    issuer: 'United Latino Students Association',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    credentialId: 'HTOO8M00GD19',
    credentialUrl: 'https://coursera.org/verify/HTOO8M00GD19'
  },
  {
    id: '136',
    title: 'Finding, Sorting, & Filtering Data in Microsoft Excel',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg',
    credentialId: 'DB3PNC7HBA93',
    credentialUrl: 'https://coursera.org/verify/DB3PNC7HBA93'
  },
  {
    id: '137',
    title: 'Fine Tune BERT for Text Classification with TensorFlow',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg',
    credentialId: '8DTQS6F2TR63',
    credentialUrl: 'https://coursera.org/verify/8DTQS6F2TR63'
  },
  {
    id: '138',
    title: 'Gamification Learning with Genially',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg',
    credentialId: '2L3TURUU9QJO',
    credentialUrl: 'https://coursera.org/verify/2L3TURUU9QJO'
  },
  {
    id: '139',
    title: 'Get Started with Airtable',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg',
    credentialId: 'FGH37PNHVSLN',
    credentialUrl: 'https://coursera.org/verify/FGH37PNHVSLN'
  },
  {
    id: '140',
    title: 'Get Started with Microsoft Forms',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    credentialId: 'T10T2RAL5ILI',
    credentialUrl: 'https://coursera.org/verify/T10T2RAL5ILI'
  },
  {
    id: '141',
    title: 'Get Started with Wrike',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg',
    credentialId: 'B6R9JTJ5AR3D',
    credentialUrl: 'https://coursera.org/verify/B6R9JTJ5AR3D'
  },
  {
    id: '142',
    title: 'Get Started with Asana',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg',
    credentialId: 'X7OAFQLVABI9',
    credentialUrl: 'https://coursera.org/verify/X7OAFQLVABI9'
  },
  {
    id: '143',
    title: 'Get Started with Jira',
    issuer: 'United Latino Students Association',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg',
    credentialId: 'GYRO5U6WZ8TF',
    credentialUrl: 'https://coursera.org/verify/GYRO5U6WZ8TF'
  },
  {
    id: '144',
    title: 'Get Started with Mural',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg',
    credentialId: '569PZOUB0VGS',
    credentialUrl: 'https://coursera.org/verify/569PZOUB0VGS'
  },
  {
    id: '145',
    title: 'Getting Started in Google Analytics',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    credentialId: 'JFGZWUN6MMYW',
    credentialUrl: 'https://coursera.org/verify/JFGZWUN6MMYW'
  },
  {
    id: '146',
    title: 'Getting Started with Asana',
    issuer: 'United Latino Students Association',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg',
    credentialId: 'CR03PAW9KCGT',
    credentialUrl: 'https://coursera.org/verify/CR03PAW9KCGT'
  },
  {
    id: '147',
    title: 'Getting Started with Azure DevOps Boards',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg',
    credentialId: 'QVSTBQPBO4C0',
    credentialUrl: 'https://coursera.org/verify/QVSTBQPBO4C0'
  },
  {
    id: '148',
    title: 'Getting Started with Microsoft Excel',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg',
    credentialId: 'R93VJ0DS5N4N',
    credentialUrl: 'https://coursera.org/verify/R93VJ0DS5N4N'
  },
  {
    id: '149',
    title: 'Getting Started with Azure IOT Hub',
    issuer: 'United Latino Students Association',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg',
    credentialId: 'XC1DF5OV8F53',
    credentialUrl: 'https://coursera.org/verify/XC1DF5OV8F53'
  },
  {
    id: '150',
    title: 'Getting Started with ImageJ',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    credentialId: 'SOJMI9JE36KN',
    credentialUrl: 'https://coursera.org/verify/SOJMI9JE36KN'
  },
  {
    id: '151',
    title: 'Getting Started with Prezi for Small Businesses',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg',
    credentialId: 'XEYBVO42KZD2',
    credentialUrl: 'https://coursera.org/verify/XEYBVO42KZD2'
  },
  {
    id: '152',
    title: 'Goldman Sachs - Software Engineering Job Simulation',
    issuer: 'Forage',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg',
    credentialId: 'g5sno7hGQtPfLJrrb',
    credentialUrl: 'https://forage.com'
  },
  {
    id: '153',
    title: 'Graphic Design: Pop Your LinkedIn with 3D Effect Using Canva',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg',
    credentialId: '6YSPMK2JPRKU',
    credentialUrl: 'https://coursera.org/verify/6YSPMK2JPRKU'
  },
  {
    id: '154',
    title: 'Hiring and Onboarding Employees with ClickUp',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg',
    credentialId: 'J8976NJ3VMYQ',
    credentialUrl: 'https://coursera.org/verify/J8976NJ3VMYQ'
  },
  {
    id: '155',
    title: 'How To Set Up Project Sites and Spaces with Confluence',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    credentialId: 'HCJ4HMJ3Y8KQ',
    credentialUrl: 'https://coursera.org/verify/HCJ4HMJ3Y8KQ'
  },
  {
    id: '156',
    title: 'How To Visualize Your Data Using Microsoft PowerPoint',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg',
    credentialId: 'AW7SEWYRE41Y',
    credentialUrl: 'https://coursera.org/verify/AW7SEWYRE41Y'
  },
  {
    id: '157',
    title: 'How to Create Presentations Using Canva',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg',
    credentialId: '8EE2GLS76DJ4',
    credentialUrl: 'https://coursera.org/verify/8EE2GLS76DJ4'
  },
  {
    id: '158',
    title: 'How to Use Custom and Conditional Formatting in Excel',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg',
    credentialId: 'XSNZY8KGL4PT',
    credentialUrl: 'https://coursera.org/verify/XSNZY8KGL4PT'
  },
  {
    id: '159',
    title: 'How to Use Roadmaps in Jira',
    issuer: 'United Latino Students Association',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg',
    credentialId: 'IS2L5RUG6CKG',
    credentialUrl: 'https://coursera.org/verify/IS2L5RUG6CKG'
  },
  {
    id: '160',
    title: 'Hyperparameter Tuning with Keras Tuner',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    credentialId: '30TFGKRD59AF',
    credentialUrl: 'https://coursera.org/verify/30TFGKRD59AF'
  },
  {
    id: '161',
    title: 'Improve Business Performance with Google Forms',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg',
    credentialId: 'K073WI84ZE1W',
    credentialUrl: 'https://coursera.org/verify/K073WI84ZE1W'
  },
  {
    id: '162',
    title: 'Improve Business Performance with Microsoft Forms',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg',
    credentialId: 'NF2EVESJHHXK',
    credentialUrl: 'https://coursera.org/verify/NF2EVESJHHXK'
  },
  {
    id: '163',
    title: 'Improve Communication with Genial.ly',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg',
    credentialId: 'NOVX7BE1RTYK',
    credentialUrl: 'https://coursera.org/verify/NOVX7BE1RTYK'
  },
  {
    id: '164',
    title: 'Improve Efficiency in Asana for Project Managers',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg',
    credentialId: 'OG3ZL72VYZS3',
    credentialUrl: 'https://coursera.org/verify/OG3ZL72VYZS3'
  },
  {
    id: '165',
    title: 'Increase SEO Traffic with WordPress',
    issuer: 'United Latino Students Association',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    credentialId: 'TM6P18UAV1WR',
    credentialUrl: 'https://coursera.org/verify/TM6P18UAV1WR'
  },
  {
    id: '166',
    title: 'Introduction to Basic Game Development Using Scratch',
    issuer: 'United Latino Students Association',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg',
    credentialId: 'NHHE1KNG8VWZ',
    credentialUrl: 'https://coursera.org/verify/NHHE1KNG8VWZ'
  },
  {
    id: '167',
    title: 'Introduction to Business Analysis Using Spreadsheets: Basics',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg',
    credentialId: 'IFVUFN93EHG8',
    credentialUrl: 'https://coursera.org/verify/IFVUFN93EHG8'
  },
  {
    id: '168',
    title: 'Introduction to Data Analysis Using Microsoft Excel',
    issuer: 'United Latino Students Association',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg',
    credentialId: '0PGZYEVN8R1M',
    credentialUrl: 'https://coursera.org/verify/0PGZYEVN8R1M'
  },
  {
    id: '169',
    title: 'Introduction to Data Science',
    issuer: 'Cisco',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg',
    credentialId: 'CISCO-DS-001',
    credentialUrl: 'https://skillsforall.com'
  },
  {
    id: '170',
    title: 'Introduction to Project Management with ClickUp',
    issuer: 'Coursera',
    date: 'March 2025',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    credentialId: 'Z0L8DPXOS8UY',
    credentialUrl: 'https://coursera.org/verify/Z0L8DPXOS8UY'
  }
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
