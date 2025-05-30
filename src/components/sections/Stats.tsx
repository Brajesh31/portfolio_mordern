import React from 'react';
import { motion } from 'framer-motion';
import { Users, FolderGit, Award, Clock } from 'lucide-react';
import { useTheme } from '../ThemeProvider';

interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay: number;
}

const StatItem: React.FC<StatItemProps> = ({ icon, value, label, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="flex flex-col items-center"
    >
      <div className="icon-box mb-4 p-4 bg-primary-500/10 rounded-xl">
        {icon}
      </div>
      <motion.h3
        className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary-400 to-secondary-400 
        bg-clip-text text-transparent"
      >
        {value}
      </motion.h3>
      <p className="text-gray-400 text-sm">{label}</p>
    </motion.div>
  );
};

const Stats = () => {
  const { theme } = useTheme();
  
  const stats = [
    {
      icon: <Clock className="w-8 h-8 text-primary-400" />,
      value: "8+",
      label: "Months Experience",
    },
    {
      icon: <FolderGit className="w-8 h-8 text-primary-400" />,
      value: "15+",
      label: "Projects Completed",
    },
    {
      icon: <Award className="w-8 h-8 text-primary-400" />,
      value: "100+",
      label: "Certifications",
    },
    {
      icon: <Users className="w-8 h-8 text-primary-400" />,
      value: "200+",
      label: "People Served",
    },
  ];

  return (
    <div className="relative py-20">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-500/5 to-transparent" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary-500/20"
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
              ],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative">
          {stats.map((stat, index) => (
            <React.Fragment key={stat.label}>
              <StatItem
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                delay={index * 0.1}
              />
              {index < stats.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -translate-y-1/2 h-16 w-px 
                  bg-gradient-to-b from-transparent via-primary-500/20 to-transparent"
                  style={{ left: `${((index + 1) * 100) / 4}%` }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;