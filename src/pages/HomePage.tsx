/**
 * @fileoverview Homepage component with curriculum overview.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Sparkles, 
  ChevronRight, 
  Play,
  BookOpen,
  Target,
  Rocket,
  Bot,
  Eye,
  Layers,
  Zap,
  Calculator,
} from 'lucide-react';
import { Header, ModuleCard, ProgressBar } from '../components/shared';
import { CATEGORIES, MODULES, calculateProgress, getNextModule } from '../config/curriculum';

const HomePage: React.FC = () => {
  // In a real app, this would come from a context or localStorage
  const [completedModules] = useState<string[]>([]);
  const progress = calculateProgress(completedModules);
  const nextModule = getNextModule(completedModules);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 py-20 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-8">
              <Sparkles size={14} className="text-violet-400" />
              <span className="text-sm text-violet-300">Interactive learning from first principles</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              From <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">Math</span> to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Robots</span>
            </h1>

            <p className="text-xl text-neutral-400 mb-8 leading-relaxed">
              Interactive visual lessons taking you from calculus and linear algebra 
              to Vision-Language-Action models. Learn how to build the AI that powers 
              modern robotics.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {nextModule ? (
                <Link
                  to={nextModule.path}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-violet-500/25 transition-all"
                >
                  <Play size={18} />
                  Start Learning: {nextModule.title}
                </Link>
              ) : (
                <Link
                  to="/learn/math/calculus"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-violet-500/25 transition-all"
                >
                  <Play size={18} />
                  Start Your Journey
                </Link>
              )}
              <Link
                to="/curriculum"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-white/10 text-neutral-300 hover:bg-white/5 transition-all"
              >
                <BookOpen size={18} />
                View Curriculum
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path Overview */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">The Complete VLA Learning Path</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            A structured curriculum that builds understanding from foundational math 
            to cutting-edge Vision-Language-Action models used in robotics.
          </p>
        </div>

        {/* Journey visualization */}
        <div className="relative">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((category, i) => (
              <Link
                key={category.id}
                to={`/curriculum#${category.id}`}
                className="group relative p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all text-center"
              >
                <div 
                  className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                  style={{ 
                    background: `linear-gradient(135deg, ${category.color}30, ${category.color}10)`,
                  }}
                >
                  <CategoryIcon category={category.id} color={category.color} />
                </div>
                <h3 className="font-medium text-sm mb-1">{category.name}</h3>
                <p className="text-[10px] text-neutral-500">
                  {category.modules.length} modules
                </p>
                {i < CATEGORIES.length - 1 && (
                  <ChevronRight 
                    size={16} 
                    className="absolute -right-2 top-1/2 -translate-y-1/2 text-neutral-700 hidden lg:block" 
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Modules */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Start Here</h2>
            <p className="text-neutral-500">Recommended first modules to begin your journey</p>
          </div>
          <Link 
            to="/curriculum" 
            className="text-sm text-violet-400 hover:text-violet-300 flex items-center gap-1"
          >
            View all <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {['calculus', 'linear-algebra', 'neurons'].map(id => {
            const module = MODULES[id];
            return (
              <ModuleCard 
                key={id}
                module={module}
                isUnlocked={true}
                isCompleted={completedModules.includes(id)}
              />
            );
          })}
        </div>
      </section>

      {/* What You'll Build */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="rounded-3xl bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-transparent border border-white/10 p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Build Understanding From First Principles
              </h2>
              <p className="text-neutral-400 mb-8">
                Don't just use AI – understand how it works. Our interactive approach 
                lets you explore each concept hands-on, building intuition that will 
                serve you throughout your robotics and AI journey.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: Calculator, text: 'Master the math that powers deep learning' },
                  { icon: Layers, text: 'Build neural networks from scratch' },
                  { icon: Eye, text: 'Understand how machines process vision' },
                  { icon: Bot, text: 'Create Vision-Language-Action systems' },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
                      <Icon size={16} className="text-violet-400" />
                    </div>
                    <span className="text-neutral-300">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/10 border border-white/10 flex items-center justify-center">
                <VLADiagram />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain size={20} className="text-violet-400" />
              <span className="text-sm text-neutral-500">VLA Learning Lab</span>
            </div>
            <p className="text-xs text-neutral-600">
              Built for aspiring roboticists and AI engineers
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Helper component for category icons
const CategoryIcon: React.FC<{ category: string; color: string }> = ({ category, color }) => {
  const icons: Record<string, React.FC<{ size?: number; color?: string }>> = {
    math: Calculator,
    nn: Zap,
    cnn: Eye,
    transformers: Layers,
    vit: Target,
    vla: Bot,
  };
  const Icon = icons[category] || BookOpen;
  return <Icon size={20} color={color} />;
};

// VLA Pipeline Diagram
const VLADiagram: React.FC = () => (
  <div className="p-8 text-center">
    <div className="flex items-center justify-center gap-4 text-sm">
      <div className="space-y-2">
        <div className="w-16 h-16 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mx-auto">
          <Eye size={24} className="text-blue-400" />
        </div>
        <span className="text-xs text-neutral-500">Vision</span>
      </div>
      <ChevronRight className="text-neutral-600" />
      <div className="space-y-2">
        <div className="w-16 h-16 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto">
          <BookOpen size={24} className="text-green-400" />
        </div>
        <span className="text-xs text-neutral-500">Language</span>
      </div>
      <ChevronRight className="text-neutral-600" />
      <div className="space-y-2">
        <div className="w-16 h-16 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center mx-auto">
          <Bot size={24} className="text-violet-400" />
        </div>
        <span className="text-xs text-neutral-500">Action</span>
      </div>
    </div>
    <p className="text-xs text-neutral-600 mt-6">
      The complete Vision-Language-Action pipeline
    </p>
  </div>
);

export default HomePage;
