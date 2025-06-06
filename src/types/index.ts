export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
  featured: boolean;
  categories: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  date: string;
  description: string[];
  icon: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  location: string;
  date: string;
  icon: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  icon: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  readingTime: string;
  author: {
    name: string;
    avatar: string;
  };
  images: string[];
  tags: string[];
  featured?: boolean;
}