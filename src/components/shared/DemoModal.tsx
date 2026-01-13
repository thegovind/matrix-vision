/**
 * @fileoverview Demo modal wrapper component.
 */

import React from 'react';
import { X } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const DemoModal: React.FC<DemoModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  icon,
  children 
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#141414] border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-violet-500/10 to-purple-500/5">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
                {icon}
              </div>
            )}
            <h3 className="font-semibold text-lg">{title}</h3>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X size={18} className="text-neutral-400" />
          </button>
        </div>
        
        {/* Content */}
        {children}
      </div>
    </div>
  );
};

export default DemoModal;
