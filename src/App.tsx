import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Quests from './pages/Quests';
import Skills from './pages/Skills';
import Shadows from './pages/Shadows';
import Dungeons from './pages/Dungeons';
import Profile from './pages/Profile';
import Achievements from './pages/Achievements';
import Auth from './pages/Auth';
import LoadingScreen from './components/ui/LoadingScreen';
import NotificationContainer from './components/notifications/NotificationContainer';
import { AppProvider } from './context/AppContext';
import { NotificationProvider } from './context/NotificationContext';
import { AchievementProvider } from './context/AchievementContext';
import { CustomizationProvider } from './context/CustomizationContext';
import { useAppContext } from './context/AppContext';
import { useNotificationEffects } from './hooks/useNotificationEffects';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { character, loading } = useAppContext();
  
  // Use notification effects in protected routes
  useNotificationEffects();
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  return character ? <>{children}</> : <Navigate to="/auth" />;
};

function App() {
  return (
    <CustomizationProvider>
      <NotificationProvider>
        <AppProvider>
          <AchievementProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                  <Route index element={<Dashboard />} />
                  <Route path="quests" element={<Quests />} />
                  <Route path="skills" element={<Skills />} />
                  <Route path="shadows" element={<Shadows />} />
                  <Route path="dungeons" element={<Dungeons />} />
                  <Route path="achievements" element={<Achievements />} />
                  <Route path="profile" element={<Profile />} />
                </Route>
              </Routes>
              <NotificationContainer />
            </BrowserRouter>
          </AchievementProvider>
        </AppProvider>
      </NotificationProvider>
    </CustomizationProvider>
  );
}

export default App;