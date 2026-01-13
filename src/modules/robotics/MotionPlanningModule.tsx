/**
 * @fileoverview Interactive Motion Planning Module.
 */

import React, { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, StepNavigator } from '../../components/shared';
import { Route, X, Play, RotateCcw, Shuffle } from 'lucide-react';

const STEPS = [
  {
    title: 'What is Motion Planning?',
    desc: 'Finding collision-free paths from start to goal.',
  },
  {
    title: 'Configuration Space',
    desc: 'Representing robot positions as points in a high-dimensional space.',
  },
  {
    title: 'Sampling-Based Planning',
    desc: 'RRT and PRM: randomly sampling to explore the space.',
  },
  {
    title: 'Path Optimization',
    desc: 'Smoothing and shortcutting to improve path quality.',
  },
  {
    title: 'Trajectory Planning',
    desc: 'Adding time and velocity to create executable motion.',
  },
  {
    title: 'Planning in VLAs',
    desc: 'How VLAs implicitly plan through learned policies.',
  },
];

const MotionPlanningModule: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const renderVisual = () => {
    switch (step) {
      case 0:
        return <WhatIsPlanningVisual />;
      case 1:
        return <ConfigSpaceVisual />;
      case 2:
        return <RRTVisual />;
      case 3:
        return <PathOptimizationVisual />;
      case 4:
        return <TrajectoryPlanningVisual />;
      case 5:
        return <PlanningVLAVisual />;
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
          { label: 'Motion Planning', path: '/learn/robotics/motion-planning' },
        ]} 
      />

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 bg-gradient-to-r from-orange-500/10 to-cyan-500/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <Route size={20} className="text-orange-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Motion Planning</h2>
                  <p className="text-xs text-neutral-500">Finding paths through space</p>
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

// What is Motion Planning
const WhatIsPlanningVisual: React.FC = () => (
  <div className="space-y-4">
    <div className="flex justify-center">
      <svg width="280" height="140" viewBox="0 0 280 140">
        {/* Obstacles */}
        <rect x="80" y="40" width="50" height="40" fill="rgb(239, 68, 68)" fillOpacity="0.3" stroke="rgb(239, 68, 68)" rx="4" />
        <rect x="160" y="70" width="40" height="50" fill="rgb(239, 68, 68)" fillOpacity="0.3" stroke="rgb(239, 68, 68)" rx="4" />
        <rect x="100" y="90" width="30" height="30" fill="rgb(239, 68, 68)" fillOpacity="0.3" stroke="rgb(239, 68, 68)" rx="4" />
        
        {/* Start */}
        <circle cx="30" cy="70" r="10" fill="rgb(34, 197, 94)" />
        <text x="30" y="95" textAnchor="middle" fill="rgb(34, 197, 94)" fontSize="10">Start</text>
        
        {/* Goal */}
        <circle cx="250" cy="50" r="10" fill="rgb(234, 179, 8)" />
        <text x="250" y="75" textAnchor="middle" fill="rgb(234, 179, 8)" fontSize="10">Goal</text>
        
        {/* Path */}
        <path 
          d="M 40 70 Q 60 30, 80 25 Q 140 15, 180 50 Q 200 40, 240 50"
          stroke="rgb(59, 130, 246)"
          strokeWidth="3"
          fill="none"
          strokeDasharray="6"
        />
      </svg>
    </div>

    <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
        <div className="text-green-400 text-xl">🚀</div>
        <div className="text-[10px] text-neutral-500">Start config</div>
      </div>
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-center">
        <div className="text-red-400 text-xl">🚧</div>
        <div className="text-[10px] text-neutral-500">Obstacles</div>
      </div>
      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 text-center">
        <div className="text-yellow-400 text-xl">🎯</div>
        <div className="text-[10px] text-neutral-500">Goal config</div>
      </div>
    </div>

    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-center">
      <p className="text-sm text-neutral-300">
        Motion planning finds a collision-free path from start to goal
      </p>
    </div>
  </div>
);

// Configuration Space
const ConfigSpaceVisual: React.FC = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-center gap-6">
      {/* Workspace */}
      <div className="text-center">
        <svg width="120" height="100" viewBox="0 0 120 100">
          <rect x="5" y="5" width="110" height="90" fill="none" stroke="rgb(64, 64, 64)" rx="4" />
          
          {/* Robot arm */}
          <line x1="60" y1="90" x2="60" y2="50" stroke="rgb(249, 115, 22)" strokeWidth="4" />
          <line x1="60" y1="50" x2="90" y2="30" stroke="rgb(234, 88, 12)" strokeWidth="3" />
          <circle cx="90" cy="30" r="5" fill="rgb(34, 197, 94)" />
          
          {/* Obstacle */}
          <rect x="70" y="55" width="25" height="25" fill="rgb(239, 68, 68)" fillOpacity="0.5" />
        </svg>
        <div className="text-xs text-neutral-400 mt-1">Workspace</div>
        <div className="text-[10px] text-neutral-500">(x, y)</div>
      </div>

      <div className="text-neutral-600">→</div>

      {/* C-space */}
      <div className="text-center">
        <svg width="120" height="100" viewBox="0 0 120 100">
          <rect x="5" y="5" width="110" height="90" fill="none" stroke="rgb(64, 64, 64)" rx="4" />
          
          {/* C-obstacle (blob) */}
          <ellipse cx="70" cy="50" rx="30" ry="25" fill="rgb(239, 68, 68)" fillOpacity="0.3" stroke="rgb(239, 68, 68)" />
          
          {/* Free space point */}
          <circle cx="30" cy="70" r="5" fill="rgb(34, 197, 94)" />
          
          {/* Axes */}
          <text x="55" y="98" fill="rgb(147, 197, 253)" fontSize="10">θ₁</text>
          <text x="2" y="55" fill="rgb(147, 197, 253)" fontSize="10">θ₂</text>
        </svg>
        <div className="text-xs text-neutral-400 mt-1">C-Space</div>
        <div className="text-[10px] text-neutral-500">(θ₁, θ₂)</div>
      </div>
    </div>

    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 text-center">
      <p className="text-sm">
        <span className="text-purple-400">Configuration space</span> represents all possible robot positions
      </p>
      <p className="text-xs text-neutral-500 mt-1">
        Obstacles in workspace become "C-obstacles" in configuration space
      </p>
    </div>

    <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
        <div className="text-green-400 text-sm">C-free</div>
        <div className="text-[10px] text-neutral-500">Valid configurations</div>
      </div>
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-center">
        <div className="text-red-400 text-sm">C-obstacle</div>
        <div className="text-[10px] text-neutral-500">Collision states</div>
      </div>
    </div>
  </div>
);

// Interactive RRT Visualization
const RRTVisual: React.FC = () => {
  const [nodes, setNodes] = useState<{x: number, y: number, parent: number | null}[]>([
    { x: 30, y: 110, parent: null }
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const goalX = 250, goalY = 30;
  const obstacles = [
    { x: 100, y: 50, w: 50, h: 40 },
    { x: 160, y: 80, w: 40, h: 40 },
  ];

  const isCollision = useCallback((x: number, y: number) => {
    return obstacles.some(obs => 
      x > obs.x && x < obs.x + obs.w && y > obs.y && y < obs.y + obs.h
    );
  }, []);

  const step = useCallback(() => {
    setNodes(prev => {
      // Random sample (biased towards goal)
      const targetX = Math.random() < 0.1 ? goalX : Math.random() * 280;
      const targetY = Math.random() < 0.1 ? goalY : Math.random() * 130;

      // Find nearest node
      let nearestIdx = 0;
      let nearestDist = Infinity;
      prev.forEach((node, i) => {
        const dist = Math.sqrt((node.x - targetX) ** 2 + (node.y - targetY) ** 2);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearestIdx = i;
        }
      });

      // Extend towards target
      const nearest = prev[nearestIdx];
      const angle = Math.atan2(targetY - nearest.y, targetX - nearest.x);
      const stepSize = 15;
      const newX = nearest.x + stepSize * Math.cos(angle);
      const newY = nearest.y + stepSize * Math.sin(angle);

      // Check collision
      if (newX < 0 || newX > 280 || newY < 0 || newY > 130 || isCollision(newX, newY)) {
        return prev;
      }

      return [...prev, { x: newX, y: newY, parent: nearestIdx }];
    });
  }, [isCollision]);

  const runRRT = () => {
    setIsRunning(true);
    let count = 0;
    const interval = setInterval(() => {
      step();
      count++;
      if (count > 100) {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 50);
  };

  const reset = () => {
    setNodes([{ x: 30, y: 110, parent: null }]);
    setIsRunning(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <svg width="280" height="140" viewBox="0 0 280 140" className="bg-black/20 rounded">
          {/* Obstacles */}
          {obstacles.map((obs, i) => (
            <rect key={i} x={obs.x} y={obs.y} width={obs.w} height={obs.h} 
              fill="rgb(239, 68, 68)" fillOpacity="0.3" stroke="rgb(239, 68, 68)" rx="4" />
          ))}
          
          {/* Tree edges */}
          {nodes.map((node, i) => 
            node.parent !== null && (
              <line 
                key={`e${i}`}
                x1={nodes[node.parent].x} 
                y1={nodes[node.parent].y}
                x2={node.x}
                y2={node.y}
                stroke="rgb(59, 130, 246)"
                strokeWidth="1.5"
              />
            )
          )}
          
          {/* Tree nodes */}
          {nodes.map((node, i) => (
            <circle key={i} cx={node.x} cy={node.y} r="3" fill="rgb(59, 130, 246)" />
          ))}
          
          {/* Start */}
          <circle cx="30" cy="110" r="6" fill="rgb(34, 197, 94)" />
          
          {/* Goal */}
          <circle cx={goalX} cy={goalY} r="6" fill="rgb(234, 179, 8)" />
        </svg>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-2">
        <button
          onClick={runRRT}
          disabled={isRunning}
          className="px-3 py-1 bg-orange-500/20 hover:bg-orange-500/30 rounded text-sm flex items-center gap-1 disabled:opacity-50"
        >
          <Play size={14} /> Grow RRT
        </button>
        <button
          onClick={step}
          disabled={isRunning}
          className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 rounded text-sm flex items-center gap-1 disabled:opacity-50"
        >
          <Shuffle size={14} /> Step
        </button>
        <button
          onClick={reset}
          className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-sm flex items-center gap-1"
        >
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-center">
        <p className="text-sm">RRT: <span className="text-blue-400">Rapidly-exploring Random Tree</span></p>
        <p className="text-xs text-neutral-500">Nodes: {nodes.length}</p>
      </div>
    </div>
  );
};

// Path Optimization
const PathOptimizationVisual: React.FC = () => {
  const [showOptimized, setShowOptimized] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <svg width="280" height="120" viewBox="0 0 280 120">
          {/* Obstacles */}
          <rect x="100" y="40" width="40" height="50" fill="rgb(239, 68, 68)" fillOpacity="0.3" stroke="rgb(239, 68, 68)" rx="4" />
          <rect x="180" y="50" width="35" height="40" fill="rgb(239, 68, 68)" fillOpacity="0.3" stroke="rgb(239, 68, 68)" rx="4" />
          
          {/* Original path (zigzag) */}
          {!showOptimized && (
            <polyline
              points="30,90 45,75 55,80 70,60 85,50 95,35 150,30 175,45 170,55 220,65 235,50 250,40"
              fill="none"
              stroke="rgb(156, 163, 175)"
              strokeWidth="2"
            />
          )}
          
          {/* Optimized path (smooth) */}
          {showOptimized && (
            <path
              d="M 30 90 Q 60 50, 95 35 Q 130 20, 150 30 Q 220 50, 250 40"
              fill="none"
              stroke="rgb(34, 197, 94)"
              strokeWidth="2"
            />
          )}
          
          {/* Start & Goal */}
          <circle cx="30" cy="90" r="6" fill="rgb(34, 197, 94)" />
          <circle cx="250" cy="40" r="6" fill="rgb(234, 179, 8)" />
        </svg>
      </div>

      {/* Toggle */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setShowOptimized(false)}
          className={`px-4 py-2 rounded-lg text-sm transition-all ${
            !showOptimized ? 'bg-neutral-500/30 text-white border border-neutral-500/50' : 'bg-white/5 text-neutral-400'
          }`}
        >
          Raw Path
        </button>
        <button
          onClick={() => setShowOptimized(true)}
          className={`px-4 py-2 rounded-lg text-sm transition-all ${
            showOptimized ? 'bg-green-500/30 text-green-400 border border-green-500/50' : 'bg-white/5 text-neutral-400'
          }`}
        >
          Optimized
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-center">
          <div className="text-blue-400 text-sm">Shortcutting</div>
          <div className="text-[10px] text-neutral-500">Remove unnecessary waypoints</div>
        </div>
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 text-center">
          <div className="text-purple-400 text-sm">Smoothing</div>
          <div className="text-[10px] text-neutral-500">Spline interpolation</div>
        </div>
      </div>
    </div>
  );
};

// Trajectory Planning
const TrajectoryPlanningVisual: React.FC = () => (
  <div className="space-y-4">
    <div className="flex justify-center">
      <svg width="280" height="140" viewBox="0 0 280 140">
        {/* Position plot */}
        <text x="5" y="15" fill="rgb(147, 197, 253)" fontSize="10">Position</text>
        <rect x="5" y="20" width="130" height="50" fill="none" stroke="rgb(64, 64, 64)" />
        <path d="M 10 65 Q 40 60, 70 40 Q 100 25, 130 30" fill="none" stroke="rgb(59, 130, 246)" strokeWidth="2" />
        
        {/* Velocity plot */}
        <text x="150" y="15" fill="rgb(34, 197, 94)" fontSize="10">Velocity</text>
        <rect x="145" y="20" width="130" height="50" fill="none" stroke="rgb(64, 64, 64)" />
        <line x1="150" y1="45" x2="270" y2="45" stroke="rgb(64, 64, 64)" strokeDasharray="2" />
        <path d="M 150 45 Q 170 30, 190 25 Q 210 32, 230 45 Q 250 58, 270 45" fill="none" stroke="rgb(34, 197, 94)" strokeWidth="2" />
        
        {/* Time axis */}
        <line x1="10" y1="80" x2="130" y2="80" stroke="rgb(156, 163, 175)" strokeWidth="1" />
        <text x="70" y="95" textAnchor="middle" fill="rgb(156, 163, 175)" fontSize="9">time →</text>
        
        <line x1="150" y1="80" x2="270" y2="80" stroke="rgb(156, 163, 175)" strokeWidth="1" />
        <text x="210" y="95" textAnchor="middle" fill="rgb(156, 163, 175)" fontSize="9">time →</text>

        {/* Constraints */}
        <text x="140" y="115" textAnchor="middle" fill="rgb(234, 179, 8)" fontSize="10">Constraints:</text>
        <text x="140" y="130" textAnchor="middle" fill="rgb(156, 163, 175)" fontSize="9">v_max, a_max, jerk limits</text>
      </svg>
    </div>

    <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-2 text-center">
        <div className="text-blue-400 text-xs">Position</div>
        <div className="text-[10px] text-neutral-500">q(t)</div>
      </div>
      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-2 text-center">
        <div className="text-green-400 text-xs">Velocity</div>
        <div className="text-[10px] text-neutral-500">q̇(t)</div>
      </div>
      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-2 text-center">
        <div className="text-purple-400 text-xs">Accel</div>
        <div className="text-[10px] text-neutral-500">q̈(t)</div>
      </div>
    </div>

    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 text-center">
      <p className="text-sm">
        Trajectory = Path + Time parameterization
      </p>
      <p className="text-xs text-neutral-500 mt-1">
        Must respect velocity, acceleration, and jerk limits
      </p>
    </div>
  </div>
);

// Planning in VLAs
const PlanningVLAVisual: React.FC = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-center gap-4">
      {/* Traditional */}
      <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 text-center max-w-[140px]">
        <div className="text-orange-400 text-sm font-medium mb-2">Classical</div>
        <div className="text-xs text-neutral-400 space-y-1">
          <div>1. Build map</div>
          <div>2. Search (RRT/A*)</div>
          <div>3. Optimize path</div>
          <div>4. Time-parameterize</div>
        </div>
      </div>

      <div className="text-neutral-600">vs</div>

      {/* VLA */}
      <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4 text-center max-w-[140px]">
        <div className="text-pink-400 text-sm font-medium mb-2">VLA</div>
        <div className="text-xs text-neutral-400 space-y-1">
          <div>1. See scene</div>
          <div>2. Output actions</div>
          <div className="text-pink-300">(implicit planning)</div>
        </div>
      </div>
    </div>

    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
      <p className="text-sm text-center mb-2">VLAs learn to plan from demonstrations:</p>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-black/20 rounded p-2 text-center">
          <span className="text-green-400">Avoid collisions</span>
          <br />See obstacles, steer around
        </div>
        <div className="bg-black/20 rounded p-2 text-center">
          <span className="text-blue-400">Reach goals</span>
          <br />Navigate to targets
        </div>
        <div className="bg-black/20 rounded p-2 text-center">
          <span className="text-yellow-400">Follow constraints</span>
          <br />Respect limits
        </div>
        <div className="bg-black/20 rounded p-2 text-center">
          <span className="text-pink-400">Replan on-the-fly</span>
          <br />React to changes
        </div>
      </div>
    </div>

    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
      <p className="text-sm">
        VLAs combine perception + planning in one learned model!
      </p>
      <p className="text-xs text-neutral-500 mt-1">
        No explicit map building or graph search required
      </p>
    </div>
  </div>
);

export default MotionPlanningModule;
