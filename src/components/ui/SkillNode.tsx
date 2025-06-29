import React from 'react';
import { motion } from 'framer-motion';
import { Skill } from '../../types';
import { Lightbulb } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

interface SkillNodeProps {
  skill: Skill;
  isPrerequisiteUnlocked: boolean;
}

const SkillNode: React.FC<SkillNodeProps> = ({ skill, isPrerequisiteUnlocked }) => {
  const { unlockSkill, character } = useAppContext();
  const [showTooltip, setShowTooltip] = React.useState(false);

  const canUnlock = !skill.unlocked && isPrerequisiteUnlocked && character.skillPoints > 0;

  const handleUnlock = () => {
    if (canUnlock) {
      unlockSkill(skill.id);
    }
  };

  return (
    <motion.div
      className="absolute"
      style={{ left: `${skill.position.x}px`, top: `${skill.position.y}px` }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div
        className={`skill-node ${skill.unlocked ? 'unlocked' : isPrerequisiteUnlocked ? 'can-unlock' : 'locked'}`}
        onClick={handleUnlock}
      >
        <Lightbulb
          size={24}
          className={skill.unlocked ? 'text-primary-400' : 'text-gray-400'}
        />
        
        {showTooltip && (
          <motion.div
            className="absolute z-10 bg-dark-200 border border-primary-900/30 rounded-md p-3 w-64 -translate-x-1/2 -translate-y-full -mt-2 left-1/2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h4 className="font-medium text-primary-400">{skill.name}</h4>
            <p className="text-sm text-gray-400 mt-1">{skill.description}</p>
            
            <div className="mt-2 text-xs">
              <span className="text-gray-400">Bonus: </span>
              <span className="text-white">+{skill.bonus.value} {skill.bonus.stat}</span>
            </div>
            
            {!skill.unlocked && (
              <div className="mt-2 text-xs text-gray-400">
                {isPrerequisiteUnlocked ? (
                  character.skillPoints > 0 ? (
                    <span className="text-green-400">Available to unlock</span>
                  ) : (
                    <span className="text-yellow-400">Need skill points</span>
                  )
                ) : (
                  <span className="text-red-400">Prerequisites not met</span>
                )}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SkillNode;