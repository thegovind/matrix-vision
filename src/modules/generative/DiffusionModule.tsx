/**
 * @fileoverview Interactive Diffusion Models Module.
 */

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, StepNavigator } from '../../components/shared';
import { Sparkles, X, Play, Pause, RotateCcw } from 'lucide-react';

const STEPS = [
  {
    title: 'What is Diffusion?',
    desc: 'Diffusion models learn to reverse the process of gradually adding noise to data.',
  },
  {
    title: 'Forward Process',
    desc: 'We progressively add Gaussian noise until the data becomes pure noise.',
  },
  {
    title: 'Reverse Process',
    desc: 'The model learns to denoise step by step, reconstructing the original data.',
  },
  {
    title: 'Noise Prediction',
    desc: 'A neural network predicts the noise added at each timestep.',
  },
  {
    title: 'Sampling',
    desc: 'Generate new data by starting from noise and iteratively denoising.',
  },
  {
    title: 'Diffusion for Actions',
    desc: 'In robotics, diffusion models can generate smooth action trajectories.',
  },
];

const DiffusionModule: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const renderVisual = () => {
    switch (step) {
      case 0:
        return <WhatIsDiffusionVisual />;
      case 1:
        return <ForwardProcessVisual />;
      case 2:
        return <ReverseProcessVisual />;
      case 3:
        return <NoisePredictionVisual />;
      case 4:
        return <SamplingVisual />;
      case 5:
        return <DiffusionActionsVisual />;
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
          { label: 'Diffusion Models', path: '/learn/generative/diffusion' },
        ]} 
      />

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 bg-gradient-to-r from-pink-500/10 to-pink-500/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                  <Sparkles size={20} className="text-pink-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Diffusion Models</h2>
                  <p className="text-xs text-neutral-500">Learning to denoise</p>
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

// What is Diffusion
const WhatIsDiffusionVisual: React.FC = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-center gap-8">
      {/* Clean data */}
      <div className="text-center">
        <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-3xl">
          🎯
        </div>
        <div className="text-xs text-neutral-400 mt-2">Clean Data</div>
      </div>

      {/* Bidirectional arrow */}
      <div className="flex flex-col items-center gap-1">
        <div className="text-pink-400 text-xs">add noise →</div>
        <div className="w-16 h-0.5 bg-gradient-to-r from-pink-400 to-neutral-600" />
        <div className="w-16 h-0.5 bg-gradient-to-r from-neutral-600 to-pink-400" />
        <div className="text-pink-400 text-xs">← denoise</div>
      </div>

      {/* Noisy data */}
      <div className="text-center">
        <div className="w-20 h-20 rounded-lg bg-neutral-700 flex items-center justify-center overflow-hidden">
          <div className="w-full h-full" style={{
            background: 'repeating-conic-gradient(#666 0% 25%, #444 0% 50%) 50% / 4px 4px'
          }} />
        </div>
        <div className="text-xs text-neutral-400 mt-2">Pure Noise</div>
      </div>
    </div>

    <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4 text-center">
      <p className="text-sm text-neutral-300">
        Diffusion models work by learning to reverse a gradual noising process.
      </p>
      <p className="text-xs text-neutral-500 mt-2">
        This simple idea has revolutionized image generation (Stable Diffusion, DALL-E 3)
        and is now being applied to robotics!
      </p>
    </div>
  </div>
);

// Forward process visualization
const ForwardProcessVisual: React.FC = () => {
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

  const noiseLevel = t / 100;

  return (
    <div className="space-y-4">
      {/* Visualization */}
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: 7 }).map((_, i) => {
          const stepNoise = Math.min(1, (i / 6) * 1.2);
          const isActive = i / 6 <= noiseLevel + 0.1;
          return (
            <div 
              key={i}
              className={`w-12 h-12 rounded-lg transition-all ${isActive ? 'ring-2 ring-pink-400' : ''}`}
              style={{
                background: `linear-gradient(135deg, 
                  rgba(236, 72, 153, ${1 - stepNoise}) 0%, 
                  rgba(168, 85, 247, ${1 - stepNoise}) 100%),
                  repeating-conic-gradient(rgba(100,100,100,${stepNoise}) 0% 25%, rgba(60,60,60,${stepNoise}) 0% 50%) 50% / ${4 + stepNoise * 8}px ${4 + stepNoise * 8}px`
              }}
            />
          );
        })}
      </div>

      {/* Timeline */}
      <div className="max-w-md mx-auto space-y-2">
        <div className="flex justify-between text-xs text-neutral-500">
          <span>t = 0 (clean)</span>
          <span>t = T (noise)</span>
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
        <p className="text-sm">q(xₜ | x₀) = √ᾱₜ · x₀ + √(1-ᾱₜ) · ε</p>
        <p className="text-xs text-neutral-500 mt-1">
          At each step, we mix the original data with Gaussian noise
        </p>
      </div>
    </div>
  );
};

// Reverse process
const ReverseProcessVisual: React.FC = () => {
  const [t, setT] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setT(prev => prev <= 0 ? 100 : prev - 2);
      }, 50);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  const noiseLevel = t / 100;

  return (
    <div className="space-y-4">
      {/* Central visualization */}
      <div className="flex justify-center">
        <div 
          className="w-32 h-32 rounded-xl transition-all"
          style={{
            background: `linear-gradient(135deg, 
              rgba(236, 72, 153, ${1 - noiseLevel}) 0%, 
              rgba(168, 85, 247, ${1 - noiseLevel}) 100%),
              repeating-conic-gradient(rgba(100,100,100,${noiseLevel}) 0% 25%, rgba(60,60,60,${noiseLevel}) 0% 50%) 50% / ${4 + noiseLevel * 12}px ${4 + noiseLevel * 12}px`
          }}
        />
      </div>

      {/* Controls */}
      <div className="max-w-md mx-auto space-y-2">
        <div className="flex justify-between text-xs text-neutral-500">
          <span>t = T (noise)</span>
          <span>t = 0 (clean)</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={100 - t}
          onChange={(e) => setT(100 - parseInt(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3 py-1 bg-pink-500/20 hover:bg-pink-500/30 rounded text-sm flex items-center gap-1"
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            {isPlaying ? 'Pause' : 'Denoise'}
          </button>
          <button
            onClick={() => { setT(100); setIsPlaying(false); }}
            className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-sm flex items-center gap-1"
          >
            <RotateCcw size={14} /> Reset
          </button>
        </div>
      </div>

      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 text-center">
        <p className="text-sm">The model learns p(xₜ₋₁ | xₜ) to reverse the process</p>
        <p className="text-xs text-neutral-500 mt-1">
          Starting from pure noise, iteratively denoise to generate data
        </p>
      </div>
    </div>
  );
};

// Noise prediction network
const NoisePredictionVisual: React.FC = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-center gap-4">
      {/* Input */}
      <div className="text-center">
        <div className="w-16 h-16 rounded-lg bg-neutral-600 flex items-center justify-center text-xs">
          xₜ
        </div>
        <div className="text-[10px] text-neutral-500 mt-1">Noisy input</div>
      </div>

      <div className="text-neutral-600">+</div>

      {/* Timestep */}
      <div className="text-center">
        <div className="w-12 h-16 rounded-lg bg-blue-500/30 flex items-center justify-center text-xs">
          t
        </div>
        <div className="text-[10px] text-neutral-500 mt-1">Timestep</div>
      </div>

      <div className="text-neutral-600">→</div>

      {/* Network */}
      <div className="text-center">
        <div className="w-20 h-20 rounded-lg bg-pink-500/20 border border-pink-500/30 flex flex-col items-center justify-center">
          <div className="text-pink-400 text-xs">U-Net</div>
          <div className="text-[10px] text-neutral-500">εθ(xₜ, t)</div>
        </div>
        <div className="text-[10px] text-neutral-500 mt-1">Denoiser</div>
      </div>

      <div className="text-neutral-600">→</div>

      {/* Output */}
      <div className="text-center">
        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-pink-500/40 to-purple-500/40 flex items-center justify-center text-xs">
          ε̂
        </div>
        <div className="text-[10px] text-neutral-500 mt-1">Predicted noise</div>
      </div>
    </div>

    <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-3 text-center">
      <p className="text-sm">L = ||ε - εθ(xₜ, t)||²</p>
      <p className="text-xs text-neutral-500 mt-2">
        Train the network to predict the noise that was added
      </p>
    </div>
  </div>
);

// Sampling process
const SamplingVisual: React.FC = () => {
  const steps = ['z ~ N(0,I)', 'x₁₀₀₀', 'x₇₅₀', 'x₅₀₀', 'x₂₅₀', 'x₀'];
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {steps.map((label, i) => (
          <React.Fragment key={i}>
            <div className="text-center">
              <div 
                className="w-14 h-14 rounded-lg flex items-center justify-center text-[10px]"
                style={{
                  background: i === 0 
                    ? 'repeating-conic-gradient(#666 0% 25%, #444 0% 50%) 50% / 6px 6px'
                    : `linear-gradient(135deg, 
                        rgba(236, 72, 153, ${i / 5}) 0%, 
                        rgba(168, 85, 247, ${i / 5}) 100%),
                        repeating-conic-gradient(rgba(100,100,100,${1 - i/5}) 0% 25%, rgba(60,60,60,${1 - i/5}) 0% 50%) 50% / ${6 - i}px ${6 - i}px`
                }}
              />
              <div className="text-[9px] text-neutral-500 mt-1">{label}</div>
            </div>
            {i < steps.length - 1 && (
              <div className="text-pink-400 text-xs">→</div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 text-center">
        <p className="text-sm font-mono">xₜ₋₁ = (xₜ - √(1-αₜ)·εθ(xₜ,t)) / √αₜ + σₜz</p>
        <p className="text-xs text-neutral-500 mt-2">
          DDPM sampling: iteratively remove predicted noise
        </p>
      </div>
    </div>
  );
};

// Diffusion for actions
const DiffusionActionsVisual: React.FC = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-center gap-4">
      {/* State */}
      <div className="text-center">
        <div className="w-16 h-16 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
          <span className="text-2xl">🤖</span>
        </div>
        <div className="text-[10px] text-neutral-500 mt-1">State sₜ</div>
      </div>

      <div className="text-neutral-600">→</div>

      {/* Diffusion */}
      <div className="text-center">
        <div className="w-20 h-20 rounded-lg bg-pink-500/20 border border-pink-500/30 flex flex-col items-center justify-center">
          <Sparkles className="text-pink-400 mb-1" size={20} />
          <div className="text-[10px] text-pink-300">Diffusion</div>
          <div className="text-[10px] text-pink-300">Policy</div>
        </div>
        <div className="text-[10px] text-neutral-500 mt-1">πθ(a|s)</div>
      </div>

      <div className="text-neutral-600">→</div>

      {/* Action trajectory */}
      <div className="text-center">
        <div className="w-24 h-16 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center p-2">
          <svg viewBox="0 0 80 40" className="w-full h-full">
            <path
              d="M 5 35 Q 20 5, 40 20 T 75 10"
              stroke="rgb(34, 197, 94)"
              strokeWidth="2"
              fill="none"
            />
            {[5, 25, 45, 65].map((x, i) => (
              <circle key={i} cx={x} cy={35 - i * 8} r="3" fill="rgb(34, 197, 94)" />
            ))}
          </svg>
        </div>
        <div className="text-[10px] text-neutral-500 mt-1">Action trajectory</div>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
        <div className="text-green-400 text-sm font-medium">Smooth</div>
        <div className="text-[10px] text-neutral-500">Generates continuous trajectories</div>
      </div>
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-center">
        <div className="text-blue-400 text-sm font-medium">Multimodal</div>
        <div className="text-[10px] text-neutral-500">Can represent multiple solutions</div>
      </div>
    </div>

    <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-3 text-center">
      <p className="text-sm">🎉 Diffusion policies achieve state-of-the-art on robot manipulation!</p>
      <p className="text-xs text-neutral-500 mt-1">
        Used in Diffusion Policy, π₀ (Physical Intelligence), and more
      </p>
    </div>
  </div>
);

export default DiffusionModule;
