/**
 * @fileoverview Module card component for curriculum display.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Clock, 
  Lock, 
  CheckCircle,
  TrendingUp,
  Grid3X3,
  BarChart3,
  Circle,
  Zap,
  RotateCcw,
  Layers,
  Image,
  Minimize2,
  Network,
  Eye,
  GitBranch,
  Box,
  LayoutGrid,
  Scan,
  Cpu,
  Move3D,
  Bot,
} from 'lucide-react';
import type { LearningModule } from '../../types';

// Icon mapping
const ICONS: Record<string, React.FC<{ size?: number; className?: string }>> = {
  TrendingUp,
  Grid3X3,
  BarChart3,
  Circle,
  Zap,
  RotateCcw,
  Layers,
  Image,
  Minimize2,
  Network,
  Eye,
  GitBranch,
  Box,
  LayoutGrid,
  Scan,
  Cpu,
  Move3D,
  Bot,
};

interface ModuleCardProps {
  module: LearningModule;
  isUnlocked: boolean;
  isCompleted: boolean;
  compact?: boolean;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ 
  module, 
  isUnlocked, 
  isCompleted,
  compact = false 
}) => {
  const Icon = ICONS[module.icon] || Circle;
  
  const cardContent = (
    <div 
      className={`group relative overflow-hidden rounded-2xl transition-all duration-300 ${
        isUnlocked 
          ? 'bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/[0.04]' 
          : 'bg-white/[0.01] border border-white/5 opacity-60'
      } ${compact ? 'p-4' : 'p-6'}`}
    >
      {/* Gradient accent */}
      <div 
        className={`absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity`}
        style={{ 
          background: `linear-gradient(90deg, ${module.gradient[0]}, ${module.gradient[1]})` 
        }}
      />

      <div className="flex items-start gap-4">
        {/* Icon */}
        <div 
          className={`${compact ? 'w-10 h-10' : 'w-12 h-12'} rounded-xl flex items-center justify-center shrink-0 transition-colors`}
          style={{ 
            background: `linear-gradient(135deg, ${module.gradient[0]}20, ${module.gradient[1]}10)`,
            color: module.gradient[0]
          }}
        >
          {isCompleted ? (
            <CheckCircle size={compact ? 20 : 24} className="text-green-400" />
          ) : !isUnlocked ? (
            <Lock size={compact ? 18 : 20} className="text-neutral-600" />
          ) : (
            <Icon size={compact ? 20 : 24} />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`font-semibold truncate ${compact ? 'text-sm' : 'text-base'}`}>
              {module.title}
            </h3>
            {isCompleted && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-400 font-medium">
                Done
              </span>
            )}
          </div>
          
          {!compact && (
            <p className="text-sm text-neutral-500 mb-3 line-clamp-2">
              {module.description}
            </p>
          )}

          <div className="flex items-center gap-4 text-xs text-neutral-500">
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {module.duration}m
            </span>
            <span className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span 
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full ${
                    i < module.difficulty 
                      ? 'bg-violet-400' 
                      : 'bg-white/10'
                  }`}
                />
              ))}
            </span>
          </div>
        </div>

        {/* Arrow */}
        {isUnlocked && (
          <ChevronRight 
            size={20} 
            className="text-neutral-600 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" 
          />
        )}
      </div>
    </div>
  );

  if (!isUnlocked) {
    return cardContent;
  }

  return (
    <Link to={module.path}>
      {cardContent}
    </Link>
  );
};

export default ModuleCard;
