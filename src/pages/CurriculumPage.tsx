/**
 * @fileoverview Curriculum page with all learning modules.
 */

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header, ModuleCard, ProgressBar } from '../components/shared';
import { CATEGORIES, calculateProgress, isModuleUnlocked, getNextModule } from '../config/curriculum';
import { Target, Clock, BookOpen } from 'lucide-react';

const CurriculumPage: React.FC = () => {
  // In a real app, this would come from a context or localStorage
  const [completedModules] = useState<string[]>([]);
  const progress = calculateProgress(completedModules);
  const location = useLocation();

  // Scroll to hash on load
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location.hash]);

  // Calculate stats
  const totalModules = CATEGORIES.reduce((acc, cat) => acc + cat.modules.length, 0);
  const totalDuration = CATEGORIES.reduce(
    (acc, cat) => acc + cat.modules.reduce((sum, m) => sum + m.duration, 0), 
    0
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header 
        showBreadcrumb 
        breadcrumb={[{ label: 'Curriculum', path: '/curriculum' }]} 
      />

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Learning Curriculum</h1>
          <p className="text-neutral-400 max-w-2xl mx-auto mb-8">
            A structured path from mathematical foundations to Vision-Language-Action models.
            Complete modules unlock new topics.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-violet-400">{totalModules}</div>
              <div className="text-xs text-neutral-500">Modules</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-violet-400">{Math.round(totalDuration / 60)}h</div>
              <div className="text-xs text-neutral-500">Content</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-violet-400">{CATEGORIES.length}</div>
              <div className="text-xs text-neutral-500">Categories</div>
            </div>
          </div>

          {/* Progress */}
          <div className="max-w-md mx-auto">
            <ProgressBar progress={progress} />
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-12">
          {CATEGORIES.map((category) => (
            <section key={category.id} id={category.id} className="scroll-mt-24">
              {/* Category header */}
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${category.color}30, ${category.color}10)` }}
                >
                  <BookOpen size={24} style={{ color: category.color }} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{category.name}</h2>
                  <p className="text-sm text-neutral-500">{category.description}</p>
                </div>
                <div className="ml-auto text-right hidden sm:block">
                  <div className="text-sm text-neutral-400">
                    {category.modules.filter(m => completedModules.includes(m.id)).length} / {category.modules.length} completed
                  </div>
                </div>
              </div>

              {/* Modules grid */}
              <div className="grid md:grid-cols-2 gap-4">
                {category.modules.map((module) => (
                  <ModuleCard
                    key={module.id}
                    module={module}
                    isUnlocked={true}
                    isCompleted={completedModules.includes(module.id)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurriculumPage;
