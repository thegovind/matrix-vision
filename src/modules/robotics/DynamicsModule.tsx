/**
 * @fileoverview Interactive Dynamics Module.
 */

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, StepNavigator } from '../../components/shared';
import { Zap, X, Play, Pause, RotateCcw } from 'lucide-react';

const STEPS = [
  {
    title: 'What is Dynamics?',
    desc: 'The study of forces and torques that cause robot motion.',
  },
  {
    title: 'Newton-Euler Equations',
    desc: 'Relating forces, mass, and acceleration: F = ma.',
  },
  {
    title: 'Inertia & Mass',
    desc: 'Understanding how mass distribution affects robot motion.',
  },
  {
    title: 'Torque & Actuation',
    desc: 'How motors generate the forces needed for movement.',
  },
  {
    title: 'Gravity Compensation',
    desc: 'Counteracting gravity to hold a position.',
  },
  {
    title: 'Dynamics in VLAs',
    desc: 'How VLAs implicitly learn dynamic behaviors.',
  },
];

const DynamicsModule: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const renderVisual = () => {
    switch (step) {
      case 0:
        return <WhatIsDynamicsVisual />;
      case 1:
        return <NewtonEulerVisual />;
      case 2:
        return <InertiaMassVisual />;
      case 3:
        return <TorqueVisual />;
      case 4:
        return <GravityCompensationVisual />;
      case 5:
        return <DynamicsVLAVisual />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header 
        showBreadcrumb 
        breadcrumb={[
          { label: 'Robotics', path: '/curriculum#robotics' },
          { label: 'Dynamics', path: '/learn/robotics/dynamics' },
        ]} 
      />

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 bg-gradient-to-r from-orange-500/10 to-red-500/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <Zap size={20} className="text-orange-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Dynamics</h2>
                  <p className="text-xs text-neutral-500">Forces & motion</p>
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

// What is Dynamics
const WhatIsDynamicsVisual: React.FC = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-center gap-8">
      {/* Kinematics */}
      <div className="text-center">
        <div className="w-20 h-20 rounded-lg bg-blue-500/20 border border-blue-500/30 flex flex-col items-center justify-center">
          <span className="text-xl">📐</span>
          <span className="text-[10px] text-blue-300 mt-1">Position</span>
        </div>
        <div className="text-xs text-neutral-400 mt-2">Kinematics</div>
      </div>

      <div className="text-neutral-600">+</div>

      {/* Forces */}
      <div className="text-center">
        <div className="w-20 h-20 rounded-lg bg-red-500/20 border border-red-500/30 flex flex-col items-center justify-center">
          <span className="text-xl">💪</span>
          <span className="text-[10px] text-red-300 mt-1">Forces</span>
        </div>
        <div className="text-xs text-neutral-400 mt-2">+ Forces</div>
      </div>

      <div className="text-neutral-600">=</div>

      {/* Dynamics */}
      <div className="text-center">
        <div className="w-20 h-20 rounded-lg bg-orange-500/20 border border-orange-500/30 flex flex-col items-center justify-center">
          <Zap className="text-orange-400" size={24} />
          <span className="text-[10px] text-orange-300 mt-1">Motion</span>
        </div>
        <div className="text-xs text-neutral-400 mt-2">Dynamics</div>
      </div>
    </div>

    <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 text-center">
      <p className="text-sm text-neutral-300">
        Dynamics tells us how to generate motion: "What torques do I need to achieve this trajectory?"
      </p>
    </div>

    <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-center">
        <div className="text-blue-400 text-sm font-medium">Forward Dynamics</div>
        <div className="text-[10px] text-neutral-500">τ → θ̈ (torque to accel)</div>
      </div>
      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
        <div className="text-green-400 text-sm font-medium">Inverse Dynamics</div>
        <div className="text-[10px] text-neutral-500">θ̈ → τ (accel to torque)</div>
      </div>
    </div>
  </div>
);

// Newton-Euler
const NewtonEulerVisual: React.FC = () => {
  const [mass, setMass] = useState(5);
  const [accel, setAccel] = useState(2);
  const force = mass * accel;

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <svg width="280" height="100" viewBox="0 0 280 100">
          {/* Mass block */}
          <rect 
            x="100" 
            y="40" 
            width={20 + mass * 4} 
            height={20 + mass * 4} 
            fill="rgb(249, 115, 22)" 
            rx="4"
          />
          <text x={110 + mass * 2} y={55 + mass * 2} textAnchor="middle" fill="white" fontSize="12">
            {mass}kg
          </text>

          {/* Force arrow */}
          <line 
            x1={125 + mass * 4} 
            y1={50 + mass * 2} 
            x2={125 + mass * 4 + force * 3} 
            y2={50 + mass * 2} 
            stroke="rgb(34, 197, 94)" 
            strokeWidth="3"
          />
          <polygon 
            points={`${125 + mass * 4 + force * 3},${45 + mass * 2} ${135 + mass * 4 + force * 3},${50 + mass * 2} ${125 + mass * 4 + force * 3},${55 + mass * 2}`}
            fill="rgb(34, 197, 94)"
          />
          <text 
            x={130 + mass * 4 + force * 1.5} 
            y={38 + mass * 2} 
            fill="rgb(34, 197, 94)" 
            fontSize="10"
          >
            F = {force}N
          </text>

          {/* Acceleration arrow */}
          <text x="220" y="75" fill="rgb(147, 197, 253)" fontSize="10">a = {accel} m/s²</text>
        </svg>
      </div>

      {/* Sliders */}
      <div className="max-w-xs mx-auto space-y-3">
        <div>
          <div className="flex justify-between text-xs text-neutral-400 mb-1">
            <span>Mass (m)</span>
            <span>{mass} kg</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={mass}
            onChange={(e) => setMass(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <div className="flex justify-between text-xs text-neutral-400 mb-1">
            <span>Acceleration (a)</span>
            <span>{accel} m/s²</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={accel}
            onChange={(e) => setAccel(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
        <p className="text-lg font-mono text-green-400">F = m × a</p>
        <p className="text-sm text-neutral-400 mt-1">
          {force}N = {mass}kg × {accel}m/s²
        </p>
      </div>
    </div>
  );
};

// Inertia & Mass
const InertiaMassVisual: React.FC = () => {
  const [massDistribution, setMassDistribution] = useState(50);
  
  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <svg width="280" height="120" viewBox="0 0 280 120">
          {/* Pivot */}
          <circle cx="140" cy="60" r="8" fill="rgb(64, 64, 64)" stroke="white" strokeWidth="2" />
          
          {/* Arm */}
          <line x1="60" y1="60" x2="220" y2="60" stroke="rgb(249, 115, 22)" strokeWidth="4" />
          
          {/* Mass indicators */}
          <circle 
            cx={60 + massDistribution * 0.8} 
            cy="60" 
            r={8 + (100 - massDistribution) / 10}
            fill="rgb(234, 88, 12)"
          />
          <circle 
            cx={220 - massDistribution * 0.8} 
            cy="60" 
            r={8 + massDistribution / 10}
            fill="rgb(234, 88, 12)"
          />

          {/* Labels */}
          <text x="140" y="100" textAnchor="middle" fill="rgb(147, 197, 253)" fontSize="10">
            I = Σ mᵢrᵢ²
          </text>
        </svg>
      </div>

      {/* Slider */}
      <div className="max-w-xs mx-auto space-y-2">
        <div className="flex justify-between text-xs text-neutral-400">
          <span>Mass near center</span>
          <span>Mass at ends</span>
        </div>
        <input
          type="range"
          min="10"
          max="90"
          value={massDistribution}
          onChange={(e) => setMassDistribution(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
        <div className={`border rounded-lg p-3 text-center transition-all ${massDistribution < 50 ? 'bg-green-500/10 border-green-500/30' : 'bg-white/5 border-white/10'}`}>
          <div className="text-sm font-medium">Low Inertia</div>
          <div className="text-[10px] text-neutral-500">Easy to accelerate</div>
        </div>
        <div className={`border rounded-lg p-3 text-center transition-all ${massDistribution >= 50 ? 'bg-red-500/10 border-red-500/30' : 'bg-white/5 border-white/10'}`}>
          <div className="text-sm font-medium">High Inertia</div>
          <div className="text-[10px] text-neutral-500">Needs more torque</div>
        </div>
      </div>
    </div>
  );
};

// Torque visualization
const TorqueVisual: React.FC = () => {
  const [torque, setTorque] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const [angle, setAngle] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setAngle(prev => (prev + torque / 10) % 360);
      }, 50);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, torque]);

  const rad = (angle * Math.PI) / 180;
  const L = 50;
  const endX = 120 + L * Math.cos(rad);
  const endY = 60 - L * Math.sin(rad);

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <svg width="240" height="120" viewBox="0 0 240 120">
          {/* Motor */}
          <circle cx="120" cy="60" r="15" fill="rgb(64, 64, 64)" stroke="rgb(249, 115, 22)" strokeWidth="3" />
          <text x="120" y="64" textAnchor="middle" fill="white" fontSize="10">M</text>
          
          {/* Arm */}
          <line x1="120" y1="60" x2={endX} y2={endY} stroke="rgb(249, 115, 22)" strokeWidth="6" strokeLinecap="round" />
          <circle cx={endX} cy={endY} r="8" fill="rgb(234, 88, 12)" />

          {/* Torque arrow */}
          <path 
            d="M 135 45 A 20 20 0 0 1 135 75" 
            stroke="rgb(34, 197, 94)" 
            strokeWidth="2" 
            fill="none"
            markerEnd="url(#torqueArrow)"
          />
          <defs>
            <marker id="torqueArrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <polygon points="0 0, 6 3, 0 6" fill="rgb(34, 197, 94)" />
            </marker>
          </defs>
          <text x="155" y="60" fill="rgb(34, 197, 94)" fontSize="10">τ</text>
        </svg>
      </div>

      {/* Controls */}
      <div className="max-w-xs mx-auto space-y-3">
        <div>
          <div className="flex justify-between text-xs text-neutral-400 mb-1">
            <span>Torque (τ)</span>
            <span>{torque}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={torque}
            onChange={(e) => setTorque(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3 py-1 bg-orange-500/20 hover:bg-orange-500/30 rounded text-sm flex items-center gap-1"
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            {isPlaying ? 'Stop' : 'Apply Torque'}
          </button>
          <button
            onClick={() => { setAngle(0); setIsPlaying(false); }}
            className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-sm flex items-center gap-1"
          >
            <RotateCcw size={14} /> Reset
          </button>
        </div>
      </div>

      <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 text-center">
        <p className="text-sm font-mono">τ = I × α</p>
        <p className="text-xs text-neutral-500 mt-1">
          Torque = Moment of Inertia × Angular Acceleration
        </p>
      </div>
    </div>
  );
};

// Gravity Compensation
const GravityCompensationVisual: React.FC = () => {
  const [compensation, setCompensation] = useState(0);
  const gravity = 100;
  const netForce = gravity - compensation;
  const displacement = Math.max(0, netForce / 5);

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <svg width="200" height="140" viewBox="0 0 200 140">
          {/* Base */}
          <rect x="80" y="20" width="40" height="15" fill="rgb(64, 64, 64)" rx="3" />
          
          {/* Arm (droops based on net force) */}
          <line 
            x1="100" 
            y1="35" 
            x2="100" 
            y2={60 + displacement} 
            stroke="rgb(249, 115, 22)" 
            strokeWidth="6" 
            strokeLinecap="round" 
          />
          <circle cx="100" cy="35" r="6" fill="rgb(249, 115, 22)" stroke="white" strokeWidth="2" />
          
          {/* Mass */}
          <rect 
            x="85" 
            y={60 + displacement} 
            width="30" 
            height="25" 
            fill="rgb(234, 88, 12)" 
            rx="4"
          />
          
          {/* Gravity arrow */}
          <line x1="130" y1={70 + displacement} x2="130" y2={90 + displacement} stroke="rgb(239, 68, 68)" strokeWidth="2" />
          <polygon points={`125,${90 + displacement} 135,${90 + displacement} 130,${100 + displacement}`} fill="rgb(239, 68, 68)" />
          <text x="145" y={85 + displacement} fill="rgb(239, 68, 68)" fontSize="10">mg</text>
          
          {/* Compensation arrow */}
          {compensation > 0 && (
            <>
              <line x1="70" y1={85 + displacement} x2="70" y2={85 + displacement - compensation / 3} stroke="rgb(34, 197, 94)" strokeWidth="2" />
              <polygon points={`65,${85 + displacement - compensation / 3} 75,${85 + displacement - compensation / 3} 70,${75 + displacement - compensation / 3}`} fill="rgb(34, 197, 94)" />
              <text x="45" y={80 + displacement - compensation / 6} fill="rgb(34, 197, 94)" fontSize="10">τ_g</text>
            </>
          )}
        </svg>
      </div>

      {/* Slider */}
      <div className="max-w-xs mx-auto space-y-2">
        <div className="flex justify-between text-xs text-neutral-400">
          <span>Gravity Compensation</span>
          <span>{compensation}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={compensation}
          onChange={(e) => setCompensation(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      <div className={`border rounded-lg p-3 text-center ${compensation >= 95 ? 'bg-green-500/10 border-green-500/20' : 'bg-yellow-500/10 border-yellow-500/20'}`}>
        <p className="text-sm">
          {compensation >= 95 
            ? '✅ Fully compensated! Arm holds position.'
            : `⚠️ Net force: ${netForce.toFixed(0)}% - Arm droops`
          }
        </p>
        <p className="text-xs text-neutral-500 mt-1">
          τ_compensation = τ_gravity to hold still
        </p>
      </div>
    </div>
  );
};

// Dynamics in VLAs
const DynamicsVLAVisual: React.FC = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-center gap-4">
      {/* Traditional */}
      <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 text-center">
        <div className="text-orange-400 text-sm font-medium mb-2">Model-Based</div>
        <div className="text-xs text-neutral-400 space-y-1">
          <div>• Compute M(q), C(q,q̇), g(q)</div>
          <div>• Inverse dynamics</div>
          <div>• Requires accurate model</div>
        </div>
      </div>

      <div className="text-neutral-600">vs</div>

      {/* VLA */}
      <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4 text-center">
        <div className="text-pink-400 text-sm font-medium mb-2">VLA</div>
        <div className="text-xs text-neutral-400 space-y-1">
          <div>• Learn from experience</div>
          <div>• Implicit dynamics</div>
          <div>• Adapts to payloads</div>
        </div>
      </div>
    </div>

    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
      <p className="text-sm text-center mb-2">What VLAs learn about dynamics:</p>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-black/20 rounded p-2">
          <span className="text-green-400">Heavy objects</span>
          <br />Move slower, grip harder
        </div>
        <div className="bg-black/20 rounded p-2">
          <span className="text-blue-400">Friction</span>
          <br />Adjust force for surfaces
        </div>
        <div className="bg-black/20 rounded p-2">
          <span className="text-yellow-400">Momentum</span>
          <br />Anticipate motion
        </div>
        <div className="bg-black/20 rounded p-2">
          <span className="text-pink-400">Compliance</span>
          <br />Soft vs rigid interactions
        </div>
      </div>
    </div>

    <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 text-center">
      <p className="text-sm">
        VLAs learn physics from watching humans handle objects!
      </p>
    </div>
  </div>
);

export default DynamicsModule;
