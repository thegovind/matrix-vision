/**
 * @fileoverview Coming Soon placeholder page for modules under development.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/shared';
import { Construction, ArrowLeft, X } from 'lucide-react';

interface ComingSoonPageProps {
  title: string;
}

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header 
        showBreadcrumb 
        breadcrumb={[
          { label: 'Curriculum', path: '/curriculum' },
          { label: title, path: '#' },
        ]} 
      />

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/10 bg-gradient-to-r from-amber-500/10 to-amber-500/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <Construction size={20} className="text-amber-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">{title}</h2>
                  <p className="text-xs text-neutral-500">Coming Soon</p>
                </div>
              </div>
              <button 
                onClick={() => navigate('/curriculum')} 
                className="p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={18} className="text-neutral-400" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-12 text-center">
            <div className="w-24 h-24 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-6">
              <Construction size={48} className="text-amber-400" />
            </div>
            
            <h3 className="text-2xl font-bold mb-4">Under Construction</h3>
            
            <p className="text-neutral-400 max-w-md mx-auto mb-8">
              This interactive module is currently being developed. Check back soon for an 
              immersive learning experience with visualizations and hands-on exercises!
            </p>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => navigate('/curriculum')}
                className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-medium transition-colors flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                Back to Curriculum
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
