import React, { useState } from 'react';
import { Settings, LogOut, Wifi, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';
import NotificationCenter from '../notifications/NotificationCenter';
import CustomizationPanel from '../customization/CustomizationPanel';

const TopBar: React.FC = () => {
  const { character, signOut, user } = useAppContext();
  const [showCustomization, setShowCustomization] = useState(false);
  
  if (!character) return null;
  
  // Calculate percentage to next level
  const expToNextLevel = character.level * 100;
  const expPercentage = (character.experience / expToNextLevel) * 100;

  const handleSignOut = async () => {
    if (confirm('Are you sure you want to sign out?')) {
      await signOut();
    }
  };

  return (
    <>
      <motion.header 
        className="bg-dark-300/80 backdrop-blur-md border-b border-primary-900/30 py-3 px-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <h1 className="text-2xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">
                Solo Improvement
              </h1>
            </div>
            
            {/* Online status indicator */}
            <div className="flex items-center gap-2 text-xs">
              <Wifi size={14} className="text-green-400" />
              <span className="text-gray-400">Synced</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-2">
              <div className="text-sm">
                <span className="text-gray-400">Level</span>{' '}
                <span className="font-bold text-white">{character.level}</span>
              </div>
              <div className="w-48 h-2 bg-dark-100 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-primary-600 to-primary-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${expPercentage}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="text-sm text-gray-400">
                {character.experience}/{expToNextLevel} XP
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <NotificationCenter />
              <button 
                onClick={() => setShowCustomization(true)}
                className="p-2 rounded-full hover:bg-dark-200 transition-colors duration-200"
                title="Settings & Customization"
              >
                <Settings size={18} />
              </button>
              <button 
                onClick={handleSignOut}
                className="p-2 rounded-full hover:bg-red-600/20 text-red-400 transition-colors duration-200"
                title="Sign Out"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Customization Panel */}
      <AnimatePresence>
        {showCustomization && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowCustomization(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-2xl bg-dark-300 border-l border-primary-900/30 z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-heading font-bold">Settings & Customization</h2>
                  <button
                    onClick={() => setShowCustomization(false)}
                    className="p-2 rounded-full hover:bg-dark-200 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <CustomizationPanel />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default TopBar;