import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';

interface Profile {
  name: string;
  username?: string;
  url: string;
  logo: string;
  category: 'Coding' | 'Learning' | 'Professional';
}

const profiles: Profile[] = [
  {
    name: 'GitHub',
    username: 'Brajesh31',
    url: 'https://github.com/Brajesh31',
    logo: '/logos/github.png',
    category: 'Coding'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/brajesh-kumar-9b58651a8/',
    logo: '/logos/linkedin.png',
    category: 'Professional'
  },
  {
    name: 'CodeChef',
    username: 'brajesh31',
    url: 'https://www.codechef.com/users/brajesh31',
    logo: '/logos/codechef.png',
    category: 'Coding'
  },
  {
    name: 'HackerRank',
    username: 'bk117134',
    url: 'https://www.hackerrank.com/profile/bk117134',
    logo: '/logos/hackerrank.png',
    category: 'Coding'
  },
  {
    name: 'Codeforces',
    username: 'bk117134',
    url: 'https://codeforces.com/profile/bk117134',
    logo: '/logos/codeforces.png',
    category: 'Coding'
  },
  {
    name: 'freeCodeCamp',
    url: 'https://www.freecodecamp.org/fccefc996a3-a55c-4b7d-bca0-b59b68536279',
    logo: '/logos/freecodecamp.png',
    category: 'Coding'
  },
  {
    name: 'GeeksforGeeks',
    logo: '/logos/gfg.png',
    url: 'https://www.geeksforgeeks.org/user/brajesh31/',
    category: 'Coding'
  },
  {
    name: 'Google Cloud',
    url: 'https://www.cloudskillsboost.google/public_profiles/9c512a6d-9347-491d-a16f-1db7651126d9',
    logo: '/logos/gcloud.png',
    category: 'Learning'
  },
  {
    name: 'Microsoft Learn',
    url: 'https://learn.microsoft.com/en-us/users/brajeshkumar-2922/',
    logo: '/logos/mslearn.png',
    category: 'Learning'
  },
  {
    name: 'Coursera',
    url: 'https://www.coursera.org/user/d1d21a6feea4a96b11b52a876f8d5278',
    logo: '/logos/coursera.png',
    category: 'Learning'
  },
  {
    name: 'Udemy',
    url: 'https://www.udemy.com/user/brajesh-kumar-547/',
    logo: '/logos/udemy.png',
    category: 'Learning'
  },
  {
    name: 'edX',
    url: 'https://profile.edx.org/u/brajesh31_4',
    logo: '/logos/edx.png',
    category: 'Learning'
  },
  {
    name: 'Cisco Network Academy',
    url: 'https://www.netacad.com/profile?&tab=profile',
    logo: '/logos/cisco.png',
    category: 'Learning'
  },
  {
    name: 'Cognitive Class',
    url: 'https://courses.cognitiveclass.ai/u/bk117134',
    logo: '/logos/cognitive.png',
    category: 'Learning'
  },
  {
    name: 'Saylor Academy',
    url: 'https://learn.saylor.org/user/profile.php?id=2051648',
    logo: '/logos/saylor.png',
    category: 'Learning'
  },
  {
    name: 'SoloLearn',
    username: '32005015',
    url: 'https://www.sololearn.com/en/profile/32005015',
    logo: '/logos/sololearn.png',
    category: 'Learning'
  },
  {
    name: 'C# Corner',
    url: 'https://www.c-sharpcorner.com/members/brajesh-kumar62',
    logo: '/logos/csharp.png',
    category: 'Professional'
  },
  {
    name: 'Credly',
    url: 'https://www.credly.com/users/brajesh-kumar.d85228d3',
    logo: '/logos/credly.png',
    category: 'Professional'
  },
  {
    name: 'Unstop',
    url: 'https://unstop.com/u/Brajesh3101',
    logo: '/logos/unstop.png',
    category: 'Professional'
  },
  {
    name: 'Campus Code',
    url: 'https://www.campuscode.in/',
    logo: '/logos/campuscode.png',
    category: 'Professional'
  },
  {
    name: 'Forage',
    url: 'https://www.theforage.com/profile/qXFNjXrD3s5vM5xDh',
    logo: '/logos/forage.png',
    category: 'Professional'
  },
  {
    name: 'Infosys Springboard',
    url: 'https://infyspringboard.onwingspan.com/web/en/app/profile/competency/certificate',
    logo: '/logos/infosys.png',
    category: 'Professional'
  }
];

const ProfileCard: React.FC<{ profile: Profile }> = ({ profile }) => {
  return (
    <motion.a
      href={profile.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-light-card dark:bg-dark-card rounded-xl p-6 flex flex-col items-center gap-4
        border border-gray-200 dark:border-gray-800 hover:border-primary-500
        transition-all duration-300 group"
    >
      <div className="w-16 h-16 rounded-full bg-light-bg dark:bg-dark-bg p-3 
        group-hover:shadow-lg group-hover:shadow-primary-500/20 transition-shadow duration-300">
        <img
          src={profile.logo}
          alt={`${profile.name} logo`}
          className="w-full h-full object-contain"
        />
      </div>
      
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-1 group-hover:text-primary-500 transition-colors">
          {profile.name}
        </h3>
        {profile.username && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            @{profile.username}
          </p>
        )}
        <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400
          group-hover:text-primary-500 transition-colors">
          Visit Profile <ExternalLink size={16} />
        </div>
      </div>
    </motion.a>
  );
};

const ProfilesPage = () => {
  const categories = ['Coding', 'Professional', 'Learning'] as const;

  return (
    <div className="container-section">
      <SectionHeading
        title="My Profiles"
        subtitle="Connect with me across various platforms"
      />

      {categories.map(category => (
        <div key={category} className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-primary-500">{category} Profiles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {profiles
              .filter(profile => profile.category === category)
              .map(profile => (
                <ProfileCard key={profile.name} profile={profile} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfilesPage;