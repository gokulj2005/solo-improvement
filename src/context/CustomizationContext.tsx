import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserCustomization } from '../types/achievements';

interface CustomizationContextType {
  customization: UserCustomization;
  updateCustomization: (updates: Partial<UserCustomization>) => void;
  resetToDefaults: () => void;
}

const defaultCustomization: UserCustomization = {
  theme: 'dark',
  accentColor: '#3b82f6',
  avatarFrame: 'none',
  title: 'Novice',
  badges: [],
  nameColor: '#ffffff',
  profileBackground: 'default',
  questNotifications: true,
  levelUpEffects: true,
  soundEffects: false,
  autoSave: true,
  language: 'en'
};

const CustomizationContext = createContext<CustomizationContextType | undefined>(undefined);

export const CustomizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customization, setCustomization] = useState<UserCustomization>(defaultCustomization);

  // Load customization from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('userCustomization');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCustomization({ ...defaultCustomization, ...parsed });
      } catch (error) {
        console.error('Error loading customization:', error);
      }
    }
  }, []);

  // Save to localStorage whenever customization changes
  useEffect(() => {
    localStorage.setItem('userCustomization', JSON.stringify(customization));
    
    // Apply theme changes to document
    document.documentElement.setAttribute('data-theme', customization.theme);
    document.documentElement.style.setProperty('--accent-color', customization.accentColor);
  }, [customization]);

  const updateCustomization = (updates: Partial<UserCustomization>) => {
    setCustomization(prev => ({ ...prev, ...updates }));
  };

  const resetToDefaults = () => {
    setCustomization(defaultCustomization);
    localStorage.removeItem('userCustomization');
  };

  return (
    <CustomizationContext.Provider value={{
      customization,
      updateCustomization,
      resetToDefaults
    }}>
      {children}
    </CustomizationContext.Provider>
  );
};

export const useCustomization = () => {
  const context = useContext(CustomizationContext);
  if (context === undefined) {
    throw new Error('useCustomization must be used within a CustomizationProvider');
  }
  return context;
};