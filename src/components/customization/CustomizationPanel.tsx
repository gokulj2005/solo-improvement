import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, User, Settings, Save, RotateCcw, Crown, Badge, Image, Edit, Upload, Camera } from 'lucide-react';
import { useCustomization } from '../../context/CustomizationContext';
import { useAppContext } from '../../context/AppContext';
import { themeOptions, accentColors, avatarFrames, titleOptions, nameColors, profileBackgrounds } from '../../data/customizationOptions';

const CustomizationPanel: React.FC = () => {
  const { customization, updateCustomization, resetToDefaults } = useCustomization();
  const { character } = useAppContext();
  const [activeTab, setActiveTab] = useState('appearance');

  const tabs = [
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'preferences', name: 'Preferences', icon: Settings }
  ];

  const handleSave = () => {
    // Customization is automatically saved via context
    alert('Customization saved successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Preview Card */}
      <div className="card p-4">
        <h3 className="font-medium mb-3">Preview</h3>
        <div className="text-center">
          <div className="relative inline-block mb-3">
            <img
              src={character?.avatar}
              alt="Character preview"
              className="w-16 h-16 rounded-full object-cover"
              style={{
                border: customization.avatarFrame !== 'none' 
                  ? `3px solid ${customization.accentColor}` 
                  : 'none'
              }}
            />
            <div className="absolute -bottom-1 -right-1 bg-primary-500 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {character?.level}
            </div>
          </div>
          <div 
            className="font-bold"
            style={{ color: customization.nameColor }}
          >
            {character?.name}
          </div>
          <div className="text-xs text-gray-400">{customization.title}</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-dark-200 rounded-lg p-1">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 p-2 rounded-md transition-colors ${
                activeTab === tab.id 
                  ? 'bg-primary-600 text-white' 
                  : 'hover:bg-dark-100 text-gray-400'
              }`}
            >
              <Icon size={16} />
              <span className="text-sm">{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'appearance' && <AppearanceTab />}
        {activeTab === 'profile' && <ProfileTab />}
        {activeTab === 'preferences' && <PreferencesTab />}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-primary-900/30">
        <button 
          onClick={resetToDefaults}
          className="btn btn-ghost flex items-center gap-2"
        >
          <RotateCcw size={16} />
          Reset to Defaults
        </button>
        <button 
          onClick={handleSave}
          className="btn btn-primary flex items-center gap-2"
        >
          <Save size={16} />
          Save Changes
        </button>
      </div>
    </div>
  );
};

const AppearanceTab: React.FC = () => {
  const { customization, updateCustomization } = useCustomization();

  return (
    <div className="space-y-6">
      {/* Theme */}
      <div>
        <h3 className="font-medium mb-3">Theme</h3>
        <div className="grid grid-cols-3 gap-3">
          {themeOptions.map(theme => (
            <button
              key={theme.id}
              onClick={() => updateCustomization({ theme: theme.id as any })}
              className={`p-3 rounded-lg border-2 transition-colors ${
                customization.theme === theme.id 
                  ? 'border-primary-500 bg-primary-500/10' 
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <div 
                className="w-full h-6 rounded mb-2"
                style={{ background: theme.preview }}
              />
              <div className="text-sm">{theme.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Accent Color */}
      <div>
        <h3 className="font-medium mb-3">Accent Color</h3>
        <div className="grid grid-cols-4 gap-3">
          {accentColors.map(color => (
            <button
              key={color.id}
              onClick={() => updateCustomization({ accentColor: color.color })}
              className={`p-3 rounded-lg border-2 transition-colors ${
                customization.accentColor === color.color 
                  ? 'border-white' 
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <div 
                className="w-full h-6 rounded mb-2"
                style={{ backgroundColor: color.color }}
              />
              <div className="text-xs">{color.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Avatar Frame */}
      <div>
        <h3 className="font-medium mb-3">Avatar Frame</h3>
        <div className="grid grid-cols-3 gap-3">
          {avatarFrames.map(frame => (
            <button
              key={frame.id}
              onClick={() => frame.unlocked && updateCustomization({ avatarFrame: frame.id })}
              disabled={!frame.unlocked}
              className={`p-3 rounded-lg border-2 transition-colors ${
                customization.avatarFrame === frame.id 
                  ? 'border-primary-500 bg-primary-500/10' 
                  : frame.unlocked 
                    ? 'border-gray-700 hover:border-gray-600' 
                    : 'border-gray-800 opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="relative">
                <div 
                  className="w-10 h-10 rounded-full mx-auto mb-2 bg-gray-600"
                  style={{
                    border: frame.preview ? `2px solid ${frame.preview}` : 'none',
                    background: typeof frame.preview === 'string' && frame.preview.includes('gradient') 
                      ? frame.preview 
                      : undefined
                  }}
                />
                {!frame.unlocked && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Crown size={14} className="text-yellow-400" />
                  </div>
                )}
              </div>
              <div className="text-xs">{frame.name}</div>
              {!frame.unlocked && (
                <div className="text-xs text-gray-500 mt-1">{frame.requirement}</div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProfileTab: React.FC = () => {
  const { customization, updateCustomization } = useCustomization();
  const { character, updateCharacter } = useAppContext();
  const [isEditingName, setIsEditingName] = useState(false);
  const [editName, setEditName] = useState(character?.name || '');
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');

  const handleSaveName = () => {
    if (editName.trim()) {
      updateCharacter({ name: editName.trim() });
      setIsEditingName(false);
    }
  };

  const handleCancelEdit = () => {
    setEditName(character?.name || '');
    setIsEditingName(false);
  };

  const handleCustomAvatar = () => {
    if (customAvatarUrl.trim()) {
      updateCharacter({ avatar: customAvatarUrl.trim() });
      setCustomAvatarUrl('');
    }
  };

  const presetAvatars = [
    {
      id: 'male-1',
      name: 'Male Hunter',
      url: 'https://images.pexels.com/photos/1722198/pexels-photo-1722198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 'female-1',
      name: 'Female Hunter',
      url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 'other-1',
      name: 'Mysterious Hunter',
      url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 'warrior-1',
      name: 'Battle-Hardened',
      url: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 'scholar-1',
      name: 'Scholar',
      url: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 'mystic-1',
      name: 'Mystic',
      url: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Edit Name */}
      <div>
        <h3 className="font-medium mb-3">Hunter Name</h3>
        <div className="space-y-3">
          {isEditingName ? (
            <div className="space-y-2">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full bg-dark-200 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500"
                placeholder="Enter hunter name"
                maxLength={20}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSaveName}
                  className="btn btn-primary text-sm flex items-center gap-1"
                >
                  <Save size={14} />
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="btn btn-ghost text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 bg-dark-200 rounded-lg">
              <div>
                <div className="font-medium">{character?.name}</div>
                <div className="text-xs text-gray-400">Current hunter name</div>
              </div>
              <button
                onClick={() => setIsEditingName(true)}
                className="btn btn-ghost text-sm flex items-center gap-1"
              >
                <Edit size={14} />
                Edit
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Avatar Selection */}
      <div>
        <h3 className="font-medium mb-3">Avatar</h3>
        
        {/* Current Avatar */}
        <div className="mb-4 p-3 bg-dark-200 rounded-lg">
          <div className="flex items-center gap-3">
            <img 
              src={character?.avatar} 
              alt="Current avatar" 
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="font-medium">Current Avatar</div>
              <div className="text-xs text-gray-400">Your hunter's profile picture</div>
            </div>
          </div>
        </div>

        {/* Custom Avatar URL */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Custom Avatar URL</label>
          <div className="space-y-2">
            <input
              type="url"
              value={customAvatarUrl}
              onChange={(e) => setCustomAvatarUrl(e.target.value)}
              className="w-full bg-dark-200 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500"
              placeholder="https://example.com/your-avatar.jpg"
            />
            <button
              onClick={handleCustomAvatar}
              disabled={!customAvatarUrl.trim()}
              className="btn btn-primary text-sm flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Upload size={14} />
              Use Custom Avatar
            </button>
            <p className="text-xs text-gray-400">
              Enter a direct link to an image. Make sure it's publicly accessible.
            </p>
          </div>
        </div>

        {/* Preset Avatars */}
        <div>
          <label className="block text-sm font-medium mb-2">Preset Avatars</label>
          <div className="grid grid-cols-3 gap-3">
            {presetAvatars.map(avatar => (
              <button
                key={avatar.id}
                onClick={() => updateCharacter({ avatar: avatar.url })}
                className={`p-2 rounded-lg border-2 transition-colors ${
                  character?.avatar === avatar.url
                    ? 'border-primary-500 bg-primary-500/10'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <img 
                  src={avatar.url} 
                  alt={avatar.name}
                  className="w-full aspect-square rounded-lg object-cover mb-2"
                />
                <div className="text-xs">{avatar.name}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Title */}
      <div>
        <h3 className="font-medium mb-3">Title</h3>
        <div className="grid grid-cols-1 gap-2">
          {titleOptions.map(title => (
            <button
              key={title.id}
              onClick={() => title.unlocked && updateCustomization({ title: title.name })}
              disabled={!title.unlocked}
              className={`p-3 rounded-lg border-2 transition-colors text-left ${
                customization.title === title.name 
                  ? 'border-primary-500 bg-primary-500/10' 
                  : title.unlocked 
                    ? 'border-gray-700 hover:border-gray-600' 
                    : 'border-gray-800 opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{title.name}</span>
                {!title.unlocked && <Crown size={16} className="text-yellow-400" />}
              </div>
              {!title.unlocked && (
                <div className="text-xs text-gray-500 mt-1">{title.requirement}</div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Name Color */}
      <div>
        <h3 className="font-medium mb-3">Name Color</h3>
        <div className="grid grid-cols-3 gap-3">
          {nameColors.map(color => (
            <button
              key={color.id}
              onClick={() => updateCustomization({ nameColor: color.color })}
              className={`p-3 rounded-lg border-2 transition-colors ${
                customization.nameColor === color.color 
                  ? 'border-primary-500 bg-primary-500/10' 
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <div 
                className="w-full h-6 rounded mb-2"
                style={{ 
                  background: color.color.includes('gradient') ? color.color : color.color 
                }}
              />
              <div className="text-xs">{color.name}</div>
              {color.requirement && (
                <div className="text-xs text-gray-500 mt-1">{color.requirement}</div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const PreferencesTab: React.FC = () => {
  const { customization, updateCustomization } = useCustomization();

  const toggleSetting = (key: keyof typeof customization) => {
    updateCustomization({ [key]: !customization[key] });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-4">Notifications</h3>
        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <span>Quest completion notifications</span>
            <input
              type="checkbox"
              checked={customization.questNotifications}
              onChange={() => toggleSetting('questNotifications')}
              className="rounded"
            />
          </label>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">Effects</h3>
        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <span>Level up effects</span>
            <input
              type="checkbox"
              checked={customization.levelUpEffects}
              onChange={() => toggleSetting('levelUpEffects')}
              className="rounded"
            />
          </label>
          <label className="flex items-center justify-between">
            <span>Sound effects</span>
            <input
              type="checkbox"
              checked={customization.soundEffects}
              onChange={() => toggleSetting('soundEffects')}
              className="rounded"
            />
          </label>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">General</h3>
        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <span>Auto-save progress</span>
            <input
              type="checkbox"
              checked={customization.autoSave}
              onChange={() => toggleSetting('autoSave')}
              className="rounded"
            />
          </label>
          <div className="flex items-center justify-between">
            <span>Language</span>
            <select
              value={customization.language}
              onChange={(e) => updateCustomization({ language: e.target.value })}
              className="bg-dark-200 border border-gray-700 rounded px-3 py-1"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizationPanel;