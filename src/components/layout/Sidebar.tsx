import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ScrollText, 
  Lightbulb, 
  Ghost, 
  Swords, 
  User,
  Menu,
  X,
  Trophy
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';
import { useCustomization } from '../../context/CustomizationContext';

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const { character } = useAppContext();
  const { customization } = useCustomization();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const navItems = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/quests', label: 'Quests', icon: <ScrollText size={20} /> },
    { path: '/skills', label: 'Skills', icon: <Lightbulb size={20} /> },
    { path: '/shadows', label: 'Shadows', icon: <Ghost size={20} /> },
    { path: '/dungeons', label: 'Dungeons', icon: <Swords size={20} /> },
    { path: '/achievements', label: 'Achievements', icon: <Trophy size={20} /> },
    { path: '/profile', label: 'Profile', icon: <User size={20} /> },
  ];

  if (!character) return null;

  const getAvatarFrameStyle = () => {
    if (customization.avatarFrame === 'none') return {};
    
    const frames: { [key: string]: any } = {
      bronze: { border: '3px solid #cd7f32' },
      silver: { border: '3px solid #c0c0c0' },
      golden: { border: '3px solid #ffd700' },
      platinum: { border: '3px solid #e5e4e2' },
      legendary: { border: '3px solid transparent', background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)' },
      shadow: { border: '3px solid transparent', background: 'linear-gradient(45deg, #2d1b69, #11998e)' },
      conqueror: { border: '3px solid transparent', background: 'linear-gradient(45deg, #ff9a9e, #fecfef)' },
      perfect: { border: '3px solid transparent', background: 'linear-gradient(45deg, #a8edea, #fed6e3)' }
    };
    
    return frames[customization.avatarFrame] || {};
  };

  return (
    <>
      <motion.div 
        className={`bg-dark-300 border-r border-primary-900/30 h-screen relative ${
          collapsed ? 'w-20' : 'w-64'
        } transition-all duration-300`}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <div className="p-4 border-b border-primary-900/30 flex items-center justify-between">
          {!collapsed && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-heading text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400"
            >
              Solo Improvement
            </motion.div>
          )}
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-dark-200 transition-colors duration-200"
          >
            {collapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        <div className="py-6">
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <img
                src={character.avatar}
                alt="Character avatar"
                className="w-16 h-16 rounded-full object-cover"
                style={getAvatarFrameStyle()}
              />
              <div className="absolute -bottom-1 -right-1 bg-primary-500 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {character.level}
              </div>
            </div>
            {!collapsed && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-2 text-center"
              >
                <div 
                  className="font-bold"
                  style={{ color: customization.nameColor }}
                >
                  {character.name}
                </div>
                <div className="text-xs text-gray-400">{customization.title}</div>
                <div className="text-xs mt-1 px-2 py-0.5 bg-primary-900 rounded-full inline-block">
                  Rank {character.rank}
                </div>
              </motion.div>
            )}
          </div>

          <nav className="space-y-1 px-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''} ${
                    collapsed ? 'justify-center' : ''
                  }`
                }
              >
                {item.icon}
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            ))}
          </nav>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;