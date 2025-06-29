import React, { createContext, useContext, useState, useEffect } from 'react';
import { Character, Quest, Skill, Shadow, Dungeon, UserProfile } from '../types';
import { initialQuests, initialSkills, initialShadows, initialDungeons, getInitialCharacter } from '../data/initialData';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

interface AppContextType {
  user: User | null;
  character: Character | null;
  quests: Quest[];
  skills: Skill[];
  shadows: Shadow[];
  dungeons: Dungeon[];
  loading: boolean;
  updateCharacter: (updates: Partial<Character>) => Promise<void>;
  completeQuest: (questId: string) => Promise<void>;
  unlockSkill: (skillId: string) => Promise<void>;
  extractShadow: (questId: string) => Promise<void>;
  completeDungeon: (dungeonId: string) => Promise<void>;
  levelUp: () => Promise<void>;
  addExperience: (amount: number) => Promise<void>;
  resetDailyQuests: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [character, setCharacter] = useState<Character | null>(null);
  const [quests, setQuests] = useState<Quest[]>(initialQuests);
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [shadows, setShadows] = useState<Shadow[]>(initialShadows);
  const [dungeons, setDungeons] = useState<Dungeon[]>(initialDungeons);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        loadUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        loadUserProfile(session.user.id);
      } else {
        setUser(null);
        setCharacter(null);
        // Reset to initial data when logged out
        setQuests(initialQuests);
        setSkills(initialSkills);
        setShadows(initialShadows);
        setDungeons(initialDungeons);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (userId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No profile found, this is expected for new users
          console.log('No profile found for user, will be created on first save');
        } else {
          throw error;
        }
      }

      if (data && data.character) {
        // Load character data
        setCharacter(data.character);
        
        // Load game state from character data if it exists
        if (data.character.gameState) {
          const gameState = data.character.gameState;
          if (gameState.quests) setQuests(gameState.quests);
          if (gameState.skills) setSkills(gameState.skills);
          if (gameState.shadows) setShadows(gameState.shadows);
          if (gameState.dungeons) setDungeons(gameState.dungeons);
        }
      } else {
        // New user or no character data, use initial character with default gender
        const newCharacter = getInitialCharacter('Hunter', 'male');
        newCharacter.id = userId;
        setCharacter(newCharacter);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveGameState = async () => {
    if (!user || !character) return;

    try {
      const gameState = {
        quests,
        skills,
        shadows,
        dungeons,
        lastSaved: new Date().toISOString()
      };

      const updatedCharacter = {
        ...character,
        gameState
      };

      // Check if profile exists
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (existingProfile) {
        // Update existing profile
        const { error } = await supabase
          .from('profiles')
          .update({ 
            character: updatedCharacter,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        // Profile doesn't exist, user needs to complete registration
        console.log('Profile not found, user needs to complete registration');
      }
    } catch (error) {
      console.error('Error saving game state:', error);
    }
  };

  const updateCharacter = async (updates: Partial<Character>) => {
    if (!character) return;

    const updatedCharacter = {
      ...character,
      ...updates
    };
    
    setCharacter(updatedCharacter);
    
    // Save to database
    await saveGameState();
  };

  const addExperience = async (amount: number) => {
    if (!character) return;

    const newExp = character.experience + amount;
    const expToNextLevel = character.level * 100;
    
    if (newExp >= expToNextLevel) {
      await updateCharacter({
        experience: newExp - expToNextLevel,
        level: character.level + 1,
        attributePoints: character.attributePoints + 3,
        skillPoints: character.skillPoints + 1
      });
    } else {
      await updateCharacter({
        experience: newExp
      });
    }
  };

  const levelUp = async () => {
    if (!character) return;

    await updateCharacter({
      level: character.level + 1,
      experience: 0,
      attributePoints: character.attributePoints + 3,
      skillPoints: character.skillPoints + 1
    });
  };

  const completeQuest = async (questId: string) => {
    const updatedQuests = quests.map(quest => 
      quest.id === questId 
        ? { ...quest, completed: true, completedAt: new Date().toISOString() }
        : quest
    );
    
    setQuests(updatedQuests);
    
    const completedQuest = quests.find(q => q.id === questId);
    if (completedQuest) {
      await addExperience(completedQuest.experience);
    }
    
    // Save game state after quest completion
    await saveGameState();
  };

  const unlockSkill = async (skillId: string) => {
    if (!character || character.skillPoints <= 0) return;
    
    const canUnlock = skills.find(skill => 
      skill.id === skillId && 
      !skill.unlocked && 
      (skill.prerequisite === null || 
        skills.some(s => s.id === skill.prerequisite && s.unlocked))
    );
    
    if (canUnlock) {
      const updatedSkills = skills.map(skill => 
        skill.id === skillId 
          ? { ...skill, unlocked: true, unlockedAt: new Date().toISOString() } 
          : skill
      );
      
      setSkills(updatedSkills);
      
      await updateCharacter({
        skillPoints: character.skillPoints - 1
      });
    }
  };

  const extractShadow = async (questId: string) => {
    if (!character) return;

    const quest = quests.find(q => q.id === questId);
    if (!quest || !quest.completed) return;
    
    const shadowExists = shadows.some(s => s.questId === questId);
    if (shadowExists) return;
    
    const newShadow: Shadow = {
      id: `shadow-${Date.now()}`,
      questId: questId,
      name: `${quest.title} Shadow`,
      description: `Extracted from ${quest.title}`,
      bonus: {
        stat: quest.attributeBonus?.stat || 'strength',
        value: Math.max(1, Math.floor(quest.experience / 10))
      },
      level: 1,
      extractedAt: new Date().toISOString()
    };
    
    const updatedShadows = [...shadows, newShadow];
    setShadows(updatedShadows);
    
    if (character.stats && newShadow.bonus.stat in character.stats) {
      const updatedStats = {
        ...character.stats,
        [newShadow.bonus.stat]: character.stats[newShadow.bonus.stat as keyof typeof character.stats] + newShadow.bonus.value
      };
      await updateCharacter({ stats: updatedStats });
    }
    
    // Save game state after shadow extraction
    await saveGameState();
  };

  const completeDungeon = async (dungeonId: string) => {
    const dungeon = dungeons.find(d => d.id === dungeonId);
    if (!dungeon) return;
    
    const updatedDungeons = dungeons.map(d => 
      d.id === dungeonId 
        ? { ...d, completed: true, completedAt: new Date().toISOString() } 
        : d
    );
    
    setDungeons(updatedDungeons);
    
    await addExperience(dungeon.experience);
    
    const dungeonIndex = dungeons.findIndex(d => d.id === dungeonId);
    const nextDungeon = dungeons[dungeonIndex + 1];
    
    if (nextDungeon) {
      const finalUpdatedDungeons = updatedDungeons.map(d => 
        d.id === nextDungeon.id 
          ? { ...d, locked: false } 
          : d
      );
      setDungeons(finalUpdatedDungeons);
    }
    
    // Save game state after dungeon completion
    await saveGameState();
  };

  const resetDailyQuests = async () => {
    const updatedQuests = quests.map(quest => 
      quest.type === 'daily' 
        ? { ...quest, completed: false } 
        : quest
    );
    
    setQuests(updatedQuests);
    
    // Save game state after reset
    await saveGameState();
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error signing out:', error);
  };

  return (
    <AppContext.Provider value={{
      user,
      character,
      quests,
      skills,
      shadows,
      dungeons,
      loading,
      updateCharacter,
      completeQuest,
      unlockSkill,
      extractShadow,
      completeDungeon,
      levelUp,
      addExperience,
      resetDailyQuests,
      signOut
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};