/**
 * @fileoverview Interactive Diffusion Policy Module.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, StepNavigator } from '../../components/shared';
import { Sparkles, X, Play, Pause, RotateCcw } from 'lucide-react';

const STEPS = [
  {
    title: 'What is Diffusion Policy?',
    desc: 'A powerful approach that uses diffusion models to generate robot actions.',
  },
  {
    title: 'Action Chunking',
    desc: 'Generate multiple future actions at once for smoother execution.',
  },
  {
    title: 'Observation Conditioning',
    desc: 'Condition the denoising process on current robot observations.',
  },
  {
    title: 'Training Process',
    desc: 'Learn from expert demonstrations using noise prediction.',
  },
  {
    title: 'Inference Pipeline',
    desc: 'Generate action sequences through iterative denoising.',
  },
  {
    title: 'Real-World Results',
    desc: 'Diffusion Policy achieves state-of-the-art on manipulation tasks.',
  },
];

const DiffusionPolicyModule: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const renderVisual = () => {
    switch (step) {
      case 0:
        return <WhatIsDiffusionPolicyVisual />;
      case 1:
        return <ActionChunkingVisual />;
      case 2:
        return <ObservationConditioningVisual />;
      case 3:
        return <TrainingVisual />;
      case 4:
        return <InferenceVisual />;
      case 5:
        return <ResultsVisual />;
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
          { label: 'Diffusion Policy', path: '/learn/generative/diffusion-policy' },
        ]} 
      />

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 bg-gradient-to-r from-pink-500/10 to-orange-500/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                  <Sparkles size={20} className="text-pink-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Diffusion Policy</h2>
                  <p className="text-xs text-neutral-500">Actions through denoising</p>
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

// What is Diffusion Policy
const WhatIsDiffusionPolicyVisual: React.FC = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-center gap-6">
      {/* Observation */}
      <div className="text-center">
        <div className="w-20 h-20 rounded-lg bg-blue-500/20 border border-blue-500/30 p-2 flex flex-col items-center justify-center">
          <span className="text-2xl">📷</span>
          <span className="text-[10px] text-blue-300 mt-1">Robot view</span>
        </div>
        <div className="text-xs text-neutral-400 mt-2">Observation</div>
      </div>

      <div className="text-neutral-600">→</div>

      {/* Policy */}
      <div className="text-center">
        <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 flex flex-col items-center justify-center">
          <Sparkles className="text-pink-400 mb-1" size={24} />
          <div className="text-xs text-pink-300">Diffusion</div>
          <div className="text-xs text-pink-300">Policy</div>
        </div>
        <div className="text-xs text-neutral-400 mt-2">πθ(a|o)</div>
      </div>

      <div className="text-neutral-600">→</div>

      {/* Actions */}
      <div className="text-center">
        <div className="w-24 h-20 rounded-lg bg-green-500/20 border border-green-500/30 p-2">
          <svg viewBox="0 0 80 50" className="w-full h-full">
            <path
              d="M 5 40 Q 20 10, 40 25 T 75 10"
              stroke="rgb(34, 197, 94)"
              strokeWidth="2"
              fill="none"
            />
            {[5, 25, 45, 65].map((x, i) => (
              <circle key={i} cx={x} cy={40 - i * 9} r="4" fill="rgb(34, 197, 94)" />
            ))}
          </svg>
        </div>
        <div className="text-xs text-neutral-400 mt-2">Action Trajectory</div>
      </div>
    </div>

    <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4 text-center">
      <p className="text-sm text-neutral-300">
        Diffusion Policy learns to generate robot actions by reversing a noising process.
      </p>
      <p className="text-xs text-neutral-500 mt-2">
        Key insight: Actions are high-dimensional and multimodal - perfect for diffusion!
      </p>
    </div>
  </div>
);

// Action Chunking
const ActionChunkingVisual: React.FC = () => {
  const [horizonLength, setHorizonLength] = useState(8);
  
  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <svg width="300" height="100" viewBox="0 0 300 100">
          {/* Timeline */}
          <line x1="20" y1="50" x2="280" y2="50" stroke="rgb(64, 64, 64)" strokeWidth="2" />
          
          {/* Current position */}
          <circle cx="40" cy="50" r="8" fill="rgb(236, 72, 153)" />
          <text x="40" y="80" textAnchor="middle" fill="rgb(156, 163, 175)" fontSize="10">t</text>
          
          {/* Action chunk */}
          {Array.from({ length: horizonLength }).map((_, i) => (
            <g key={i}>
              <circle 
                cx={60 + i * 25} 
                cy={50} 
                r="5" 
                fill={i === 0 ? 'rgb(34, 197, 94)' : 'rgba(34, 197, 94, 0.4)'}
              />
              {i < horizonLength - 1 && (
                <line 
                  x1={65 + i * 25} 
                  y1={50} 
                  x2={80 + i * 25} 
                  y2={50} 
                  stroke="rgb(34, 197, 94)" 
                  strokeWidth="1.5"
                  strokeDasharray="3"
                />
              )}
            </g>
          ))}

          {/* Bracket */}
          <path 
            d={`M 55 30 L 55 25 L ${55 + horizonLength * 25} 25 L ${55 + horizonLength * 25} 30`}
            stroke="rgb(236, 72, 153)"
            strokeWidth="1.5"
            fill="none"
          />
          <text 
            x={55 + horizonLength * 12.5} 
            y="18" 
            textAnchor="middle" 
            fill="rgb(236, 72, 153)" 
            fontSize="10"
          >
            {horizonLength} steps
          </text>
        </svg>
      </div>

      {/* Slider */}
      <div className="max-w-xs mx-auto space-y-2">
        <div className="flex justify-between text-xs text-neutral-500">
          <span>Horizon: {horizonLength}</span>
        </div>
        <input
          type="range"
          min="4"
          max="16"
          value={horizonLength}
          onChange={(e) => setHorizonLength(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
          <div className="text-green-400 text-sm font-medium">Temporal Coherence</div>
          <div className="text-[10px] text-neutral-500">Actions are naturally smooth</div>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-center">
          <div className="text-blue-400 text-sm font-medium">Error Recovery</div>
          <div className="text-[10px] text-neutral-500">Replan before executing all</div>
        </div>
      </div>
    </div>
  );
};

// Observation Conditioning
const ObservationConditioningVisual: React.FC = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-center gap-4">
      {/* Observations */}
      <div className="flex gap-2">
        {[2, 1, 0].map((i) => (
          <div key={i} className="text-center">
            <div 
              className={`w-12 h-12 rounded-lg border flex items-center justify-center text-lg
                ${i === 0 ? 'bg-cyan-500/20 border-cyan-500/30' : 'bg-cyan-500/10 border-cyan-500/20 opacity-50'}`}
            >
              📷
            </div>
            <div className="text-[9px] text-neutral-500 mt-1">t-{i}</div>
          </div>
        ))}
      </div>

      <div className="text-neutral-600">→</div>

      {/* Encoder */}
      <div className="text-center">
        <div className="w-16 h-16 rounded-lg bg-purple-500/20 border border-purple-500/30 flex flex-col items-center justify-center">
          <div className="text-[10px] text-purple-300">Vision</div>
          <div className="text-[10px] text-purple-300">Encoder</div>
        </div>
      </div>

      <div className="text-neutral-600">→</div>

      {/* Embedding */}
      <div className="text-center">
        <div className="w-12 h-16 rounded-lg bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center">
          <div className="text-[10px] text-yellow-300">z</div>
        </div>
        <div className="text-[9px] text-neutral-500 mt-1">Embedding</div>
      </div>

      <div className="text-neutral-600">→</div>

      {/* Denoiser */}
      <div className="text-center">
        <div className="w-16 h-16 rounded-lg bg-pink-500/20 border border-pink-500/30 flex flex-col items-center justify-center">
          <Sparkles className="text-pink-400" size={16} />
          <div className="text-[10px] text-pink-300 mt-1">Denoise</div>
        </div>
      </div>
    </div>

    <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4 max-w-md mx-auto">
      <p className="text-sm text-center mb-2">Conditioning methods:</p>
      <div className="space-y-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400" />
          <span><strong>FiLM:</strong> Modulate features via scale + bias</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-pink-400" />
          <span><strong>Cross-attention:</strong> Attend to observation tokens</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-400" />
          <span><strong>Concatenation:</strong> Append to noisy actions</span>
        </div>
      </div>
    </div>
  </div>
);

// Training Process
const TrainingVisual: React.FC = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-center gap-3 flex-wrap">
      {/* Expert demo */}
      <div className="text-center">
        <div className="w-14 h-14 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
          <span className="text-xl">👨‍🏫</span>
        </div>
        <div className="text-[9px] text-neutral-500 mt-1">Expert</div>
      </div>

      <div className="text-neutral-600">→</div>

      {/* Clean action */}
      <div className="text-center">
        <div className="w-14 h-14 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center text-xs">
          a₀
        </div>
        <div className="text-[9px] text-neutral-500 mt-1">Clean</div>
      </div>

      <div className="text-neutral-600">+ε→</div>

      {/* Noisy action */}
      <div className="text-center">
        <div className="w-14 h-14 rounded-lg bg-neutral-500/30 border border-neutral-500/30 flex items-center justify-center text-xs">
          aₜ
        </div>
        <div className="text-[9px] text-neutral-500 mt-1">Noisy</div>
      </div>

      <div className="text-neutral-600">→</div>

      {/* Network */}
      <div className="text-center">
        <div className="w-16 h-16 rounded-lg bg-pink-500/20 border border-pink-500/30 flex flex-col items-center justify-center">
          <div className="text-[10px] text-pink-300">εθ(aₜ,o,t)</div>
        </div>
        <div className="text-[9px] text-neutral-500 mt-1">Predict ε</div>
      </div>
    </div>

    <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4 text-center">
      <p className="text-sm font-mono">L = 𝔼ₜ,ε ||ε - εθ(√ᾱₜa₀ + √(1-ᾱₜ)ε, o, t)||²</p>
      <p className="text-xs text-neutral-500 mt-2">
        Train to predict the noise added to expert actions
      </p>
    </div>

    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-center">
      <p className="text-sm">
        Data: pairs of (observation, expert action trajectory)
      </p>
    </div>
  </div>
);

// Inference Pipeline
const InferenceVisual: React.FC = () => {
  const [denoiseStep, setDenoiseStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const maxSteps = 5;

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setDenoiseStep(prev => {
          if (prev >= maxSteps) {
            setIsPlaying(false);
            return maxSteps;
          }
          return prev + 1;
        });
      }, 500);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  const noiseLevel = 1 - denoiseStep / maxSteps;

  return (
    <div className="space-y-4">
      {/* Denoising visualization */}
      <div className="flex items-center justify-center gap-4">
        {/* Observation */}
        <div className="text-center">
          <div className="w-14 h-14 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-xl">
            📷
          </div>
          <div className="text-[9px] text-neutral-500 mt-1">Obs</div>
        </div>

        <div className="text-neutral-600">→</div>

        {/* Denoising steps */}
        <div className="flex items-center gap-2">
          {Array.from({ length: maxSteps + 1 }).map((_, i) => {
            const isActive = i <= denoiseStep;
            const stepNoise = 1 - i / maxSteps;
            return (
              <div 
                key={i}
                className={`w-10 h-10 rounded transition-all ${isActive ? 'ring-2 ring-pink-400' : ''}`}
                style={{
                  background: `linear-gradient(135deg, 
                    rgba(34, 197, 94, ${1 - stepNoise}) 0%, 
                    rgba(16, 185, 129, ${1 - stepNoise}) 100%),
                    repeating-conic-gradient(rgba(100,100,100,${stepNoise}) 0% 25%, rgba(60,60,60,${stepNoise}) 0% 50%) 50% / ${3 + stepNoise * 6}px ${3 + stepNoise * 6}px`
                }}
              />
            );
          })}
        </div>

        <div className="text-neutral-600">→</div>

        {/* Final action */}
        <div className="text-center">
          <div className="w-14 h-14 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center">
            <svg viewBox="0 0 40 40" className="w-8 h-8">
              <path
                d="M 5 35 Q 15 15, 20 20 T 35 5"
                stroke="rgb(34, 197, 94)"
                strokeWidth="2"
                fill="none"
                opacity={1 - noiseLevel}
              />
            </svg>
          </div>
          <div className="text-[9px] text-neutral-500 mt-1">Actions</div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          disabled={denoiseStep === maxSteps}
          className="px-3 py-1 bg-pink-500/20 hover:bg-pink-500/30 rounded text-sm flex items-center gap-1 disabled:opacity-50"
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          Denoise
        </button>
        <button
          onClick={() => { setDenoiseStep(0); setIsPlaying(false); }}
          className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-sm flex items-center gap-1"
        >
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
        <p className="text-sm">Step {denoiseStep}/{maxSteps} - Noise: {Math.round(noiseLevel * 100)}%</p>
        <p className="text-xs text-neutral-500 mt-1">
          {denoiseStep === maxSteps ? '✅ Actions ready for execution!' : 'Iteratively removing noise...'}
        </p>
      </div>
    </div>
  );
};

// Results
const ResultsVisual: React.FC = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 text-center">
        <div className="text-2xl mb-1">🥢</div>
        <div className="text-purple-400 text-sm font-medium">Push-T</div>
        <div className="text-lg text-purple-300">88%</div>
        <div className="text-[10px] text-neutral-500">Success rate</div>
      </div>
      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
        <div className="text-2xl mb-1">🫖</div>
        <div className="text-green-400 text-sm font-medium">Pour Water</div>
        <div className="text-lg text-green-300">95%</div>
        <div className="text-[10px] text-neutral-500">Success rate</div>
      </div>
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-center">
        <div className="text-2xl mb-1">🧱</div>
        <div className="text-blue-400 text-sm font-medium">Stack Blocks</div>
        <div className="text-lg text-blue-300">78%</div>
        <div className="text-[10px] text-neutral-500">Success rate</div>
      </div>
      <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4 text-center">
        <div className="text-2xl mb-1">🔌</div>
        <div className="text-pink-400 text-sm font-medium">Plug Insert</div>
        <div className="text-lg text-pink-300">92%</div>
        <div className="text-[10px] text-neutral-500">Success rate</div>
      </div>
    </div>

    <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-lg p-4 text-center">
      <p className="text-sm font-medium mb-2">Why Diffusion Policy Works:</p>
      <div className="grid grid-cols-3 gap-2 text-[10px]">
        <div className="bg-black/20 rounded p-2">
          <span className="text-pink-400">Multimodal</span>
          <br />Multiple valid solutions
        </div>
        <div className="bg-black/20 rounded p-2">
          <span className="text-purple-400">Expressive</span>
          <br />Complex distributions
        </div>
        <div className="bg-black/20 rounded p-2">
          <span className="text-cyan-400">Stable</span>
          <br />Training stability
        </div>
      </div>
    </div>

    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
      <p className="text-sm">🎉 Foundation for modern VLA systems like π₀ and OpenVLA!</p>
    </div>
  </div>
);

export default DiffusionPolicyModule;
