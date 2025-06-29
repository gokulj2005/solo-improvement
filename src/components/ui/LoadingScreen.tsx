import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 size={48} className="text-primary-400" />
        </motion.div>
        
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">
            Loading Your Journey
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Syncing your progress...
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;