/**
 * @fileoverview Interactive Flow Matching Module.
 */

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, StepNavigator } from '../../components/shared';
import { Wind, X, Play, Pause, RotateCcw } from 'lucide-react';

const STEPS = [
  {
    title: 'What is Flow Matching?',
    desc: 'A simpler and faster alternative to diffusion for generative modeling.',
  },
  {
    title: 'Optimal Transport',
    desc: 'Find the most efficient path to move probability mass from noise to data.',
  },
  {
    title: 'Vector Fields',
    desc: 'Learn a velocity field that transports samples along optimal paths.',
  },
  {
    title: 'Conditional Flows',
    desc: 'Condition the flow on individual data points for easier training.',
  },
  {
    title: 'Advantages',
    desc: 'Straighter paths mean fewer steps and faster generation.',
  },
  {
    title: 'Flow Matching for VLAs',
    desc: 'Flow matching enables efficient action generation in robotics.',
  },
];

const FlowMatchingModule: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const renderVisual = () => {
    switch (step) {
      case 0:
        return <WhatIsFlowVisual />;
      case 1:
        return <OptimalTransportVisual />;
      case 2:
        return <VectorFieldVisual />;
      case 3:
        return <ConditionalFlowVisual />;
      case 4:
        return <AdvantagesVisual />;
      case 5:
        return <FlowForVLAVisual />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header 
        showBreadcrumb 
        breadcrumb={[
          { label: 'Generative Models', path: '/curriculum#generative' },
          { label: 'Flow Matching', path: '/learn/generative/flow-matching' },
        ]} 
      />

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 bg-gradient-to-r from-pink-500/10 to-cyan-500/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                  <Wind size={20} className="text-pink-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Flow Matching</h2>
                  <p className="text-xs text-neutral-500">Optimal transport for generation</p>
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

          <StepNavigator
            steps={STEPS}
            currentStep={step}
            onStepChange={setStep}
            onComplete={() => navigate('/curriculum')}
          >
            {renderVisual()}
          </StepNavigator>
        </div>
      </div>
    </div>
  );
};

// What is Flow visual
const WhatIsFlowVisual: React.FC = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-center gap-8">
      {/* Noise distribution */}
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-neutral-700 flex items-center justify-center relative">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-neutral-400"
              style={{
                transform: `rotate(${i * 45}deg) translateY(-24px)`,
              }}
            />
          ))}
          <span className="text-xs text-neutral-400">p₀</span>
        </div>
        <div className="text-xs text-neutral-400 mt-2">Noise</div>
      </div>

      {/* Flow arrow */}
      <div className="flex flex-col items-center gap-1">
        <svg width="60" height="30" viewBox="0 0 60 30">
          <path
            d="M 5 15 Q 30 5, 55 15"
            stroke="rgb(236, 72, 153)"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrowhead)"
          />
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="rgb(236, 72, 153)" />
            </marker>
          </defs>
        </svg>
        <div className="text-pink-400 text-xs">Flow φₜ</div>
      </div>

      {/* Data distribution */}
      <div className="text-center">
        <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
          <span className="text-xs text-white">p₁</span>
        </div>
        <div className="text-xs text-neutral-400 mt-2">Data</div>
      </div>
    </div>

    <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4 text-center">
      <p className="text-sm text-neutral-300">
        Flow matching learns a continuous transformation from noise to data.
      </p>
      <p className="text-xs text-neutral-500 mt-2">
        Instead of learning to denoise, we learn velocity vectors that "push" samples along.
      </p>
    </div>
  </div>
);

// Optimal Transport visualization
const OptimalTransportVisual: React.FC = () => {
  const [showOptimal, setShowOptimal] = useState(true);
  
  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <svg width="280" height="140" viewBox="0 0 280 140">
          {/* Source points */}
          {[30, 50, 70].map((y, i) => (
            <circle key={`s${i}`} cx="40" cy={y} r="8" fill="rgb(156, 163, 175)" />
          ))}
          
          {/* Target points */}
          {[30, 50, 70].map((y, i) => (
            <circle key={`t${i}`} cx="240" cy={y} r="8" fill="rgb(236, 72, 153)" />
          ))}

          {/* Paths */}
          {showOptimal ? (
            // Optimal: straight lines
            [30, 50, 70].map((y, i) => (
              <line key={`l${i}`} x1="48" y1={y} x2="232" y2={y} 
                stroke="rgb(34, 197, 94)" strokeWidth="2" strokeDasharray="4" />
            ))
          ) : (
            // Non-optimal: crossing paths
            <>
              <path d="M 48 30 Q 140 80, 232 70" stroke="rgb(239, 68, 68)" strokeWidth="2" strokeDasharray="4" fill="none" />
              <path d="M 48 50 Q 140 20, 232 30" stroke="rgb(239, 68, 68)" strokeWidth="2" strokeDasharray="4" fill="none" />
              <path d="M 48 70 Q 140 60, 232 50" stroke="rgb(239, 68, 68)" strokeWidth="2" strokeDasharray="4" fill="none" />
            </>
          )}

          {/* Labels */}
          <text x="40" y="100" textAnchor="middle" fill="rgb(156, 163, 175)" fontSize="12">Noise</text>
          <text x="240" y="100" textAnchor="middle" fill="rgb(236, 72, 153)" fontSize="12">Data</text>
        </svg>
      </div>

      {/* Toggle */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setShowOptimal(true)}
          className={`px-4 py-2 rounded-lg text-sm transition-all ${
            showOptimal ? 'bg-green-500/30 text-green-400 border border-green-500/50' : 'bg-white/5 text-neutral-400'
          }`}
        >
          Optimal Transport
        </button>
        <button
          onClick={() => setShowOptimal(false)}
          className={`px-4 py-2 rounded-lg text-sm transition-all ${
            !showOptimal ? 'bg-red-500/30 text-red-400 border border-red-500/50' : 'bg-white/5 text-neutral-400'
          }`}
        >
          Non-Optimal
        </button>
      </div>

      <div className={`border rounded-lg p-3 text-center ${showOptimal ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
        <p className="text-sm">
          {showOptimal 
            ? 'Optimal transport finds the shortest paths (straight lines)'
            : 'Non-optimal paths are longer and cross each other'
          }
        </p>
      </div>
    </div>
  );
};

// Vector field visualization
const VectorFieldVisual: React.FC = () => {
  const [t, setT] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setT(prev => prev >= 100 ? 0 : prev + 2);
      }, 50);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  const progress = t / 100;

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <svg width="280" height="160" viewBox="0 0 280 160">
          {/* Vector field arrows */}
          {Array.from({ length: 5 }).map((_, row) =>
            Array.from({ length: 7 }).map((_, col) => {
              const x = 30 + col * 35;
              const y = 20 + row * 30;
              const dx = 12;
              const dy = (Math.sin((x + y) * 0.03) * 4) * (1 - progress);
              return (
                <g key={`${row}-${col}`}>
                  <line
                    x1={x}
                    y1={y}
                    x2={x + dx}
                    y2={y + dy}
                    stroke="rgba(236, 72, 153, 0.4)"
                    strokeWidth="1.5"
                  />
                  <circle cx={x + dx} cy={y + dy} r="2" fill="rgb(236, 72, 153)" />
                </g>
              );
            })
          )}

          {/* Traveling particle */}
          <circle
            cx={40 + progress * 200}
            cy={80 + Math.sin(progress * Math.PI) * -20}
            r="6"
            fill="rgb(34, 197, 94)"
          />
        </svg>
      </div>

      {/* Controls */}
      <div className="max-w-md mx-auto space-y-2">
        <div className="flex justify-between text-xs text-neutral-500">
          <span>t = 0</span>
          <span>t = 1</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={t}
          onChange={(e) => setT(parseInt(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3 py-1 bg-pink-500/20 hover:bg-pink-500/30 rounded text-sm flex items-center gap-1"
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            onClick={() => { setT(0); setIsPlaying(false); }}
            className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-sm flex items-center gap-1"
          >
            <RotateCcw size={14} /> Reset
          </button>
        </div>
      </div>

      <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-3 text-center">
        <p className="text-sm font-mono">dxₜ/dt = vθ(xₜ, t)</p>
        <p className="text-xs text-neutral-500 mt-1">
          The neural network learns the velocity field v that pushes samples
        </p>
      </div>
    </div>
  );
};

// Conditional Flow visual
const ConditionalFlowVisual: React.FC = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-center gap-4">
      {/* Noise sample */}
      <div className="text-center">
        <div className="w-12 h-12 rounded-full bg-neutral-600 flex items-center justify-center text-xs">
          x₀
        </div>
        <div className="text-[10px] text-neutral-500 mt-1">Noise</div>
      </div>

      {/* Arrow */}
      <div className="flex flex-col items-center">
        <svg width="60" height="20" viewBox="0 0 60 20">
          <line x1="0" y1="10" x2="50" y2="10" stroke="rgb(236, 72, 153)" strokeWidth="2" />
          <polygon points="50,5 60,10 50,15" fill="rgb(236, 72, 153)" />
        </svg>
        <div className="text-[10px] text-pink-400">ψₜ(x₀|x₁)</div>
      </div>

      {/* Data sample */}
      <div className="text-center">
        <div className="w-12 h-12 rounded-lg bg-pink-500 flex items-center justify-center text-xs">
          x₁
        </div>
        <div className="text-[10px] text-neutral-500 mt-1">Data</div>
      </div>
    </div>

    <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
      <p className="text-sm text-center mb-3">Conditional Flow Path:</p>
      <div className="bg-black/30 rounded p-2 text-center font-mono text-sm">
        ψₜ(x₀|x₁) = (1-t)x₀ + tx₁
      </div>
      <p className="text-xs text-neutral-500 mt-3 text-center">
        A straight line from noise x₀ to data point x₁
      </p>
    </div>

    <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-3">
      <p className="text-sm text-center">
        <strong>Key insight:</strong> We train on simple straight-line paths between pairs,
        but at inference time, the learned field naturally curves to avoid collisions!
      </p>
    </div>
  </div>
);

// Advantages visual
const AdvantagesVisual: React.FC = () => (
  <div className="space-y-4">
    <div className="flex justify-center gap-8">
      {/* Diffusion */}
      <div className="text-center">
        <div className="w-32 h-24 rounded-lg bg-purple-500/10 border border-purple-500/20 p-2">
          <svg viewBox="0 0 100 60" className="w-full h-full">
            <path
              d="M 10 50 Q 20 40, 30 45 Q 40 35, 50 30 Q 60 20, 70 25 Q 80 15, 90 10"
              stroke="rgb(168, 85, 247)"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        <div className="text-xs text-purple-400 mt-2">Diffusion</div>
        <div className="text-[10px] text-neutral-500">Curved, many steps</div>
      </div>

      {/* Flow Matching */}
      <div className="text-center">
        <div className="w-32 h-24 rounded-lg bg-pink-500/10 border border-pink-500/20 p-2">
          <svg viewBox="0 0 100 60" className="w-full h-full">
            <line x1="10" y1="50" x2="90" y2="10" stroke="rgb(236, 72, 153)" strokeWidth="2" />
          </svg>
        </div>
        <div className="text-xs text-pink-400 mt-2">Flow Matching</div>
        <div className="text-[10px] text-neutral-500">Straight, fewer steps</div>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
        <div className="text-green-400 text-lg font-bold">2-5x</div>
        <div className="text-[10px] text-neutral-500">Faster sampling</div>
      </div>
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-center">
        <div className="text-blue-400 text-lg font-bold">Simpler</div>
        <div className="text-[10px] text-neutral-500">Training objective</div>
      </div>
      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 text-center">
        <div className="text-purple-400 text-lg font-bold">Stable</div>
        <div className="text-[10px] text-neutral-500">More stable training</div>
      </div>
    </div>

    <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-3 text-center">
      <p className="text-sm">
        Flow matching achieves similar quality with straighter, more efficient paths!
      </p>
    </div>
  </div>
);

// Flow for VLAs
const FlowForVLAVisual: React.FC = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-center gap-3">
      {/* State */}
      <div className="text-center">
        <div className="w-14 h-14 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-2xl">
          🤖
        </div>
        <div className="text-[10px] text-neutral-500 mt-1">State</div>
      </div>

      <div className="text-neutral-600">+</div>

      {/* Vision */}
      <div className="text-center">
        <div className="w-14 h-14 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-2xl">
          📷
        </div>
        <div className="text-[10px] text-neutral-500 mt-1">Vision</div>
      </div>

      <div className="text-neutral-600">→</div>

      {/* Flow policy */}
      <div className="text-center">
        <div className="w-16 h-16 rounded-lg bg-pink-500/20 border border-pink-500/30 flex flex-col items-center justify-center">
          <Wind className="text-pink-400 mb-1" size={18} />
          <div className="text-[9px] text-pink-300">Flow</div>
        </div>
        <div className="text-[10px] text-neutral-500 mt-1">Policy</div>
      </div>

      <div className="text-neutral-600">→</div>

      {/* Actions */}
      <div className="text-center">
        <div className="w-20 h-14 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center p-2">
          <svg viewBox="0 0 60 30" className="w-full h-full">
            <line x1="5" y1="25" x2="55" y2="5" stroke="rgb(34, 197, 94)" strokeWidth="2" />
            {[5, 20, 35, 50].map((x, i) => (
              <circle key={i} cx={x} cy={25 - i * 5} r="3" fill="rgb(34, 197, 94)" />
            ))}
          </svg>
        </div>
        <div className="text-[10px] text-neutral-500 mt-1">Actions</div>
      </div>
    </div>

    <div className="bg-gradient-to-r from-pink-500/10 to-cyan-500/10 border border-pink-500/20 rounded-lg p-4">
      <p className="text-sm text-center mb-2">Used in state-of-the-art VLAs:</p>
      <div className="flex justify-center gap-4 text-xs">
        <span className="px-2 py-1 bg-white/10 rounded">π₀ (Pi-Zero)</span>
        <span className="px-2 py-1 bg-white/10 rounded">OpenVLA</span>
        <span className="px-2 py-1 bg-white/10 rounded">RT-2</span>
      </div>
    </div>

    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
      <p className="text-sm">🎉 Flow matching enables real-time action generation for robots!</p>
      <p className="text-xs text-neutral-500 mt-1">
        Fewer denoising steps = faster inference = responsive robot control
      </p>
    </div>
  </div>
);

export default FlowMatchingModule;
