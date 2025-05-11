import React from 'react';
import { motion } from 'framer-motion';

export const Loader = () => {
  return (
    <div className="fixed inset-0 bg-dark-300 flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-16 h-16 border-t-4 border-r-4 border-primary-500 rounded-full"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-primary-500 font-medium"
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
};