/**
 * @fileoverview Progress bar component.
 */

import React from 'react';

interface ProgressBarProps {
  progress: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  showLabel = true,
  size = 'md',
  color = 'violet'
}) => {
  const heights = { sm: 'h-1', md: 'h-2', lg: 'h-3' };
  
  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-neutral-500">Progress</span>
          <span className="text-xs font-medium text-violet-400">{progress}%</span>
        </div>
      )}
      <div className={`w-full bg-white/5 rounded-full overflow-hidden ${heights[size]}`}>
        <div 
          className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r from-${color}-500 to-${color}-600`}
          style={{ 
            width: `${progress}%`,
            background: `linear-gradient(90deg, #8b5cf6, #7c3aed)`
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
