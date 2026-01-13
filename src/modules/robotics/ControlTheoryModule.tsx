/**
 * @fileoverview Interactive Control Theory Module.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, StepNavigator } from '../../components/shared';
import { Sliders, X, Play, Pause, RotateCcw } from 'lucide-react';

const STEPS = [
  {
    title: 'What is Control Theory?',
    desc: 'The science of making systems behave as desired.',
  },
  {
    title: 'Feedback Control',
    desc: 'Measuring output and adjusting input to reduce error.',
  },
  {
    title: 'PID Control',
    desc: 'The workhorse of control: Proportional, Integral, Derivative.',
  },
  {
    title: 'Tuning PID Gains',
    desc: 'Adjusting Kp, Ki, Kd for desired performance.',
  },
  {
    title: 'Model Predictive Control',
    desc: 'Looking ahead to optimize future behavior.',
  },
  {
    title: 'Control in VLAs',
    desc: 'How VLAs implement control implicitly.',
  },
];

const ControlTheoryModule: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const renderVisual = () => {
    switch (step) {
      case 0:
        return <WhatIsControlVisual />;
      case 1:
        return <FeedbackControlVisual />;
      case 2:
        return <PIDControlVisual />;
      case 3:
        return <PIDTuningVisual />;
      case 4:
        return <MPCVisual />;
      case 5:
        return <ControlVLAVisual />;
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
          { label: 'Control Theory', path: '/learn/robotics/control-theory' },
        ]} 
      />

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 bg-gradient-to-r from-orange-500/10 to-yellow-500/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <Sliders size={20} className="text-orange-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Control Theory</h2>
                  <p className="text-xs text-neutral-500">Making robots behave</p>
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

// What is Control
const WhatIsControlVisual: React.FC = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-center gap-4">
      {/* Desired */}
      <div className="text-center">
        <div className="w-16 h-16 rounded-lg bg-green-500/20 border border-green-500/30 flex flex-col items-center justify-center">
          <span className="text-xl">🎯</span>
          <span className="text-[10px] text-green-300">Target</span>
        </div>
        <div className="text-xs text-neutral-400 mt-2">Desired</div>
      </div>

      <div className="flex flex-col items-center">
        <div className="text-yellow-400 text-xs mb-1">Control</div>
        <svg width="60" height="24" viewBox="0 0 60 24">
          <line x1="0" y1="12" x2="50" y2="12" stroke="rgb(234, 179, 8)" strokeWidth="2" />
          <polygon points="50,7 60,12 50,17" fill="rgb(234, 179, 8)" />
        </svg>
      </div>

      {/* System */}
      <div className="text-center">
        <div className="w-16 h-16 rounded-lg bg-orange-500/20 border border-orange-500/30 flex flex-col items-center justify-center">
          <span className="text-xl">⚙️</span>
          <span className="text-[10px] text-orange-300">System</span>
        </div>
        <div className="text-xs text-neutral-400 mt-2">Robot</div>
      </div>

      <div className="flex flex-col items-center">
        <svg width="40" height="24" viewBox="0 0 40 24">
          <line x1="0" y1="12" x2="30" y2="12" stroke="rgb(156, 163, 175)" strokeWidth="2" />
          <polygon points="30,7 40,12 30,17" fill="rgb(156, 163, 175)" />
        </svg>
      </div>

      {/* Actual */}
      <div className="text-center">
        <div className="w-16 h-16 rounded-lg bg-blue-500/20 border border-blue-500/30 flex flex-col items-center justify-center">
          <span className="text-xl">📍</span>
          <span className="text-[10px] text-blue-300">Actual</span>
        </div>
        <div className="text-xs text-neutral-400 mt-2">Output</div>
      </div>
    </div>

    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 text-center">
      <p className="text-sm text-neutral-300">
        Control theory answers: "How do I command my robot to achieve the target?"
      </p>
    </div>

    <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-center">
        <div className="text-blue-400 text-sm font-medium">Open Loop</div>
        <div className="text-[10px] text-neutral-500">No feedback</div>
      </div>
      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
        <div className="text-green-400 text-sm font-medium">Closed Loop</div>
        <div className="text-[10px] text-neutral-500">With feedback</div>
      </div>
    </div>
  </div>
);

// Feedback Control Loop
const FeedbackControlVisual: React.FC = () => (
  <div className="space-y-4">
    <div className="flex justify-center">
      <svg width="320" height="140" viewBox="0 0 320 140">
        {/* Reference input */}
        <text x="20" y="50" fill="rgb(34, 197, 94)" fontSize="10">r(t)</text>
        <line x1="40" y1="50" x2="70" y2="50" stroke="rgb(34, 197, 94)" strokeWidth="2" />
        
        {/* Summing junction */}
        <circle cx="85" cy="50" r="12" fill="none" stroke="white" strokeWidth="2" />
        <text x="85" y="54" textAnchor="middle" fill="white" fontSize="12">Σ</text>
        <text x="75" y="40" fill="rgb(34, 197, 94)" fontSize="10">+</text>
        <text x="75" y="75" fill="rgb(239, 68, 68)" fontSize="10">−</text>
        
        {/* Error */}
        <line x1="97" y1="50" x2="120" y2="50" stroke="rgb(234, 179, 8)" strokeWidth="2" />
        <text x="108" y="42" fill="rgb(234, 179, 8)" fontSize="10">e(t)</text>
        
        {/* Controller */}
        <rect x="120" y="35" width="50" height="30" fill="rgb(147, 51, 234)" fillOpacity="0.3" stroke="rgb(147, 51, 234)" rx="4" />
        <text x="145" y="54" textAnchor="middle" fill="rgb(147, 51, 234)" fontSize="10">Controller</text>
        
        {/* Control signal */}
        <line x1="170" y1="50" x2="200" y2="50" stroke="rgb(147, 51, 234)" strokeWidth="2" />
        <text x="185" y="42" fill="rgb(147, 51, 234)" fontSize="10">u(t)</text>
        
        {/* Plant */}
        <rect x="200" y="35" width="50" height="30" fill="rgb(249, 115, 22)" fillOpacity="0.3" stroke="rgb(249, 115, 22)" rx="4" />
        <text x="225" y="54" textAnchor="middle" fill="rgb(249, 115, 22)" fontSize="10">Plant</text>
        
        {/* Output */}
        <line x1="250" y1="50" x2="290" y2="50" stroke="rgb(59, 130, 246)" strokeWidth="2" />
        <text x="280" y="42" fill="rgb(59, 130, 246)" fontSize="10">y(t)</text>
        
        {/* Feedback path */}
        <line x1="270" y1="50" x2="270" y2="100" stroke="rgb(239, 68, 68)" strokeWidth="2" />
        <line x1="270" y1="100" x2="85" y2="100" stroke="rgb(239, 68, 68)" strokeWidth="2" />
        <line x1="85" y1="100" x2="85" y2="62" stroke="rgb(239, 68, 68)" strokeWidth="2" />
        
        {/* Sensor */}
        <rect x="150" y="85" width="40" height="20" fill="rgb(239, 68, 68)" fillOpacity="0.3" stroke="rgb(239, 68, 68)" rx="4" />
        <text x="170" y="99" textAnchor="middle" fill="rgb(239, 68, 68)" fontSize="9">Sensor</text>
      </svg>
    </div>

    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 text-center">
      <p className="text-sm font-mono">e(t) = r(t) - y(t)</p>
      <p className="text-xs text-neutral-500 mt-2">
        Error = Reference - Output (what we want to minimize!)
      </p>
    </div>
  </div>
);

// PID Control
const PIDControlVisual: React.FC = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
      {/* Proportional */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-center">
        <div className="text-blue-400 text-lg font-bold">P</div>
        <div className="text-blue-300 text-xs font-medium">Proportional</div>
        <div className="text-[10px] text-neutral-500 mt-1">Kp × e(t)</div>
        <div className="text-[9px] text-neutral-400 mt-2">React to current error</div>
      </div>

      {/* Integral */}
      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
        <div className="text-green-400 text-lg font-bold">I</div>
        <div className="text-green-300 text-xs font-medium">Integral</div>
        <div className="text-[10px] text-neutral-500 mt-1">Ki × ∫e(t)dt</div>
        <div className="text-[9px] text-neutral-400 mt-2">Eliminate steady error</div>
      </div>

      {/* Derivative */}
      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 text-center">
        <div className="text-purple-400 text-lg font-bold">D</div>
        <div className="text-purple-300 text-xs font-medium">Derivative</div>
        <div className="text-[10px] text-neutral-500 mt-1">Kd × de/dt</div>
        <div className="text-[9px] text-neutral-400 mt-2">Anticipate future</div>
      </div>
    </div>

    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 text-center">
      <p className="text-sm font-mono">u(t) = Kp·e(t) + Ki·∫e(t)dt + Kd·de/dt</p>
      <p className="text-xs text-neutral-500 mt-2">
        The PID controller combines all three terms
      </p>
    </div>
  </div>
);

// Interactive PID Tuning
const PIDTuningVisual: React.FC = () => {
  const [kp, setKp] = useState(1);
  const [ki, setKi] = useState(0);
  const [kd, setKd] = useState(0);
  const [history, setHistory] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const target = 50;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const stateRef = useRef({ position: 0, velocity: 0, integral: 0 });

  const reset = useCallback(() => {
    setHistory([]);
    stateRef.current = { position: 0, velocity: 0, integral: 0 };
    setIsRunning(false);
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        const state = stateRef.current;
        const error = target - state.position;
        state.integral += error * 0.05;
        const derivative = -state.velocity;
        
        const control = kp * error + ki * state.integral + kd * derivative;
        state.velocity += control * 0.1;
        state.velocity *= 0.95; // damping
        state.position += state.velocity;
        
        setHistory(prev => {
          const next = [...prev, state.position];
          return next.slice(-100);
        });

        if (Math.abs(error) < 0.5 && Math.abs(state.velocity) < 0.1) {
          setIsRunning(false);
        }
      }, 30);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, kp, ki, kd]);

  return (
    <div className="space-y-4">
      {/* Response plot */}
      <div className="flex justify-center">
        <svg width="280" height="100" viewBox="0 0 280 100" className="bg-black/20 rounded">
          {/* Target line */}
          <line x1="0" y1={100 - target} x2="280" y2={100 - target} stroke="rgb(34, 197, 94)" strokeWidth="1" strokeDasharray="4" />
          <text x="5" y={96 - target} fill="rgb(34, 197, 94)" fontSize="8">target</text>
          
          {/* Response curve */}
          <polyline
            fill="none"
            stroke="rgb(59, 130, 246)"
            strokeWidth="2"
            points={history.map((y, i) => `${i * 2.8},${100 - y}`).join(' ')}
          />
        </svg>
      </div>

      {/* Gain sliders */}
      <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
        <div>
          <div className="flex justify-between text-xs text-blue-400 mb-1">
            <span>Kp</span>
            <span>{kp.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={kp}
            onChange={(e) => { setKp(parseFloat(e.target.value)); reset(); }}
            className="w-full"
          />
        </div>
        <div>
          <div className="flex justify-between text-xs text-green-400 mb-1">
            <span>Ki</span>
            <span>{ki.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={ki}
            onChange={(e) => { setKi(parseFloat(e.target.value)); reset(); }}
            className="w-full"
          />
        </div>
        <div>
          <div className="flex justify-between text-xs text-purple-400 mb-1">
            <span>Kd</span>
            <span>{kd.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={kd}
            onChange={(e) => { setKd(parseFloat(e.target.value)); reset(); }}
            className="w-full"
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="px-3 py-1 bg-orange-500/20 hover:bg-orange-500/30 rounded text-sm flex items-center gap-1"
        >
          {isRunning ? <Pause size={14} /> : <Play size={14} />}
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={reset}
          className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-sm flex items-center gap-1"
        >
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 text-center text-xs">
        <span className="text-blue-400">High Kp</span> = fast but oscillates • 
        <span className="text-green-400"> Ki</span> = removes steady-state error • 
        <span className="text-purple-400"> Kd</span> = reduces overshoot
      </div>
    </div>
  );
};

// Model Predictive Control
const MPCVisual: React.FC = () => (
  <div className="space-y-4">
    <div className="flex justify-center">
      <svg width="300" height="120" viewBox="0 0 300 120">
        {/* Past trajectory */}
        <polyline
          fill="none"
          stroke="rgb(156, 163, 175)"
          strokeWidth="2"
          points="20,90 40,85 60,75 80,70 100,65"
        />
        
        {/* Current position */}
        <circle cx="100" cy="65" r="6" fill="rgb(59, 130, 246)" />
        <text x="100" y="90" textAnchor="middle" fill="rgb(59, 130, 246)" fontSize="10">now</text>
        
        {/* Prediction horizon */}
        <rect x="100" y="20" width="180" height="70" fill="rgb(147, 51, 234)" fillOpacity="0.1" stroke="rgb(147, 51, 234)" strokeDasharray="4" rx="4" />
        <text x="190" y="15" textAnchor="middle" fill="rgb(147, 51, 234)" fontSize="10">Prediction Horizon</text>
        
        {/* Predicted trajectories */}
        <polyline
          fill="none"
          stroke="rgb(147, 51, 234)"
          strokeWidth="2"
          strokeOpacity="0.5"
          points="100,65 130,55 160,40 190,35 220,32 250,30"
        />
        <polyline
          fill="none"
          stroke="rgb(147, 51, 234)"
          strokeWidth="2"
          strokeOpacity="0.3"
          points="100,65 130,60 160,50 190,45 220,42 250,40"
        />
        <polyline
          fill="none"
          stroke="rgb(147, 51, 234)"
          strokeWidth="2"
          strokeOpacity="0.3"
          points="100,65 130,70 160,60 190,48 220,38 250,32"
        />
        
        {/* Optimal trajectory */}
        <polyline
          fill="none"
          stroke="rgb(34, 197, 94)"
          strokeWidth="3"
          points="100,65 130,55 160,40 190,35 220,32 250,30"
        />
        
        {/* Target */}
        <line x1="100" y1="30" x2="280" y2="30" stroke="rgb(234, 179, 8)" strokeWidth="1" strokeDasharray="4" />
        <text x="285" y="34" fill="rgb(234, 179, 8)" fontSize="10">goal</text>
      </svg>
    </div>

    <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 text-center">
        <div className="text-purple-400 text-sm font-medium">Predict</div>
        <div className="text-[10px] text-neutral-500">Simulate future outcomes</div>
      </div>
      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
        <div className="text-green-400 text-sm font-medium">Optimize</div>
        <div className="text-[10px] text-neutral-500">Find best control sequence</div>
      </div>
    </div>

    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 text-center">
      <p className="text-sm">
        MPC looks ahead and plans optimal actions over a horizon
      </p>
      <p className="text-xs text-neutral-500 mt-1">
        Can handle constraints, nonlinearities, and multi-objective optimization
      </p>
    </div>
  </div>
);

// Control in VLAs
const ControlVLAVisual: React.FC = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-center gap-4">
      {/* Traditional */}
      <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 text-center max-w-[140px]">
        <div className="text-orange-400 text-sm font-medium mb-2">Classical</div>
        <div className="text-xs text-neutral-400 space-y-1">
          <div>PID / MPC</div>
          <div>Explicit gains</div>
          <div>Hand-tuned</div>
        </div>
      </div>

      <div className="text-neutral-600">vs</div>

      {/* VLA */}
      <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4 text-center max-w-[140px]">
        <div className="text-pink-400 text-sm font-medium mb-2">VLA</div>
        <div className="text-xs text-neutral-400 space-y-1">
          <div>Neural policy</div>
          <div>Implicit control</div>
          <div>Learned from data</div>
        </div>
      </div>
    </div>

    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
      <p className="text-sm text-center mb-2">VLAs learn control behaviors:</p>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-black/20 rounded p-2 text-center">
          <span className="text-blue-400">Reactive</span>
          <br />Respond to obstacles
        </div>
        <div className="bg-black/20 rounded p-2 text-center">
          <span className="text-green-400">Predictive</span>
          <br />Anticipate outcomes
        </div>
        <div className="bg-black/20 rounded p-2 text-center">
          <span className="text-yellow-400">Adaptive</span>
          <br />Adjust to changes
        </div>
        <div className="bg-black/20 rounded p-2 text-center">
          <span className="text-pink-400">Smooth</span>
          <br />Generate fluid motions
        </div>
      </div>
    </div>

    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
      <p className="text-sm">
        VLAs combine perception + control in one end-to-end model!
      </p>
      <p className="text-xs text-neutral-500 mt-1">
        No need to hand-tune PID gains or design explicit controllers
      </p>
    </div>
  </div>
);

export default ControlTheoryModule;
