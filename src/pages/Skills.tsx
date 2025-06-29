import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import SkillNode from '../components/ui/SkillNode';
import { Award, Lightbulb } from 'lucide-react';

const Skills: React.FC = () => {
  const { skills, character } = useAppContext();
  
  // Check if prerequisites are met for each skill
  const isPrerequisiteUnlocked = (prerequisiteId: string | null): boolean => {
    if (prerequisiteId === null) return true;
    const prerequisite = skills.find(s => s.id === prerequisiteId);
    return prerequisite?.unlocked || false;
  };

  return (
    <div>
      <motion.div 
        className="flex justify-between items-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-heading font-bold">Skills</h1>
        <div className="flex items-center gap-2 bg-dark-300 rounded-lg px-4 py-2">
          <Lightbulb size={18} className="text-primary-400" />
          <span className="text-sm font-medium">Skill Points: </span>
          <span className="text-sm font-bold text-primary-400">{character.skillPoints}</span>
        </div>
      </motion.div>

      <div className="mb-6">
        <div className="card p-6">
          <p className="text-gray-400 text-sm mb-2">
            Unlock skills to enhance your abilities. Skills may require prerequisites and cost skill points to unlock.
          </p>
          
          {character.skillPoints > 0 ? (
            <div className="text-sm text-primary-400 flex items-center gap-1 mt-2">
              <Award size={14} />
              You have {character.skillPoints} skill points to spend!
            </div>
          ) : (
            <div className="text-sm text-gray-500 flex items-center gap-1 mt-2">
              <Award size={14} />
              Level up to earn more skill points
            </div>
          )}
        </div>
      </div>

      <div className="card p-6 h-[600px] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        {/* Connecting lines between related skills */}
        <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          {skills.map(skill => {
            if (skill.prerequisite) {
              const prerequisite = skills.find(s => s.id === skill.prerequisite);
              if (prerequisite) {
                return (
                  <line
                    key={`${skill.id}-${prerequisite.id}`}
                    x1={prerequisite.position.x + 8}
                    y1={prerequisite.position.y + 8}
                    x2={skill.position.x + 8}
                    y2={skill.position.y + 8}
                    stroke={skill.unlocked ? "#3B82F6" : "#374151"}
                    strokeWidth="2"
                    strokeDasharray={skill.unlocked ? "0" : "4"}
                  />
                );
              }
            }
            return null;
          })}
        </svg>

        {skills.map(skill => (
          <SkillNode
            key={skill.id}
            skill={skill}
            isPrerequisiteUnlocked={isPrerequisiteUnlocked(skill.prerequisite)}
          />
        ))}
      </div>
    </div>
  );
};

export default Skills;