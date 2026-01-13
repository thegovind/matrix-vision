/**
 * @fileoverview Interactive Kinematics Module.
 */

import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, StepNavigator } from '../../components/shared';
import { Compass, X } from 'lucide-react';

const STEPS = [
  {
    title: 'What is Kinematics?',
    desc: 'The study of robot motion without considering forces.',
  },
  {
    title: 'Joint Space vs Task Space',
    desc: 'Two ways to describe robot position: angles or end-effector position.',
  },
  {
    title: 'Forward Kinematics',
    desc: 'Given joint angles, compute the end-effector position.',
  },
  {
    title: 'Inverse Kinematics',
    desc: 'Given a target position, find the joint angles to reach it.',
  },
  {
    title: 'Multiple Solutions',
    desc: 'IK often has multiple valid solutions - or none at all.',
  },
  {
    title: 'Kinematics in VLAs',
    desc: 'VLAs learn kinematics implicitly from demonstration data.',
  },
];

const KinematicsModule: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const renderVisual = () => {
    switch (step) {
      case 0:
        return <WhatIsKinematicsVisual />;
      case 1:
        return <JointVsTaskSpaceVisual />;
      case 2:
        return <ForwardKinematicsVisual />;
      case 3:
        return <InverseKinematicsVisual />;
      case 4:
        return <MultipleSolutionsVisual />;
      case 5:
        return <KinematicsVLAVisual />;
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
          { label: 'Kinematics', path: '/learn/robotics/kinematics' },
        ]} 
      />

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 bg-gradient-to-r from-orange-500/10 to-orange-500/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <Compass size={20} className="text-orange-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Kinematics</h2>
                  <p className="text-xs text-neutral-500">Robot geometry & motion</p>
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

// What is Kinematics
const WhatIsKinematicsVisual: React.FC = () => (
  <div className="space-y-4">
    <div className="flex justify-center">
      <svg width="280" height="140" viewBox="0 0 280 140">
        {/* Base */}
        <rect x="40" y="110" width="40" height="20" fill="rgb(64, 64, 64)" rx="4" />
        
        {/* Link 1 */}
        <line x1="60" y1="110" x2="60" y2="60" stroke="rgb(249, 115, 22)" strokeWidth="8" strokeLinecap="round" />
        <circle cx="60" cy="110" r="8" fill="rgb(249, 115, 22)" stroke="white" strokeWidth="2" />
        
        {/* Link 2 */}
        <line x1="60" y1="60" x2="140" y2="40" stroke="rgb(234, 88, 12)" strokeWidth="8" strokeLinecap="round" />
        <circle cx="60" cy="60" r="8" fill="rgb(234, 88, 12)" stroke="white" strokeWidth="2" />
        
        {/* Link 3 */}
        <line x1="140" y1="40" x2="200" y2="70" stroke="rgb(194, 65, 12)" strokeWidth="6" strokeLinecap="round" />
        <circle cx="140" cy="40" r="6" fill="rgb(194, 65, 12)" stroke="white" strokeWidth="2" />
        
        {/* End effector */}
        <circle cx="200" cy="70" r="10" fill="rgb(34, 197, 94)" />
        <text x="200" y="95" textAnchor="middle" fill="rgb(34, 197, 94)" fontSize="10">(x, y)</text>
        
        {/* Angle annotations */}
        <path d="M 60 100 A 10 10 0 0 1 60 90" stroke="rgb(147, 197, 253)" fill="none" strokeWidth="2" />
        <text x="75" y="95" fill="rgb(147, 197, 253)" fontSize="10">θ₁</text>
        
        <path d="M 68 60 A 10 10 0 0 0 72 52" stroke="rgb(147, 197, 253)" fill="none" strokeWidth="2" />
        <text x="82" y="55" fill="rgb(147, 197, 253)" fontSize="10">θ₂</text>
      </svg>
    </div>

    <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
      <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 text-center">
        <div className="text-orange-400 text-sm font-medium">Geometry</div>
        <div className="text-[10px] text-neutral-500">Position and orientation</div>
      </div>
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-center">
        <div className="text-blue-400 text-sm font-medium">No Forces</div>
        <div className="text-[10px] text-neutral-500">Just motion relationships</div>
      </div>
    </div>

    <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 text-center">
      <p className="text-sm text-neutral-300">
        Kinematics answers: "Where will my robot end-effector be if I set these joint angles?"
      </p>
    </div>
  </div>
);

// Joint vs Task Space
const JointVsTaskSpaceVisual: React.FC = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
      {/* Joint Space */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-center">
        <h3 className="text-blue-400 font-medium mb-2">Joint Space</h3>
        <div className="text-2xl mb-2">θ</div>
        <div className="text-xs text-neutral-400 space-y-1">
          <div>θ₁ = 45°</div>
          <div>θ₂ = 30°</div>
          <div>θ₃ = -15°</div>
        </div>
        <div className="text-[10px] text-neutral-500 mt-2">
          Joint angles/positions
        </div>
      </div>

      {/* Task Space */}
      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
        <h3 className="text-green-400 font-medium mb-2">Task Space</h3>
        <div className="text-2xl mb-2">x</div>
        <div className="text-xs text-neutral-400 space-y-1">
          <div>x = 0.5m</div>
          <div>y = 0.3m</div>
          <div>z = 0.4m</div>
        </div>
        <div className="text-[10px] text-neutral-500 mt-2">
          End-effector pose
        </div>
      </div>
    </div>

    {/* Conversion arrows */}
    <div className="flex items-center justify-center gap-4">
      <div className="text-center">
        <div className="text-xs text-neutral-500">FK</div>
        <div className="text-blue-400">θ → x</div>
      </div>
      <div className="text-neutral-600 text-2xl">⇄</div>
      <div className="text-center">
        <div className="text-xs text-neutral-500">IK</div>
        <div className="text-green-400">x → θ</div>
      </div>
    </div>

    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 text-center">
      <p className="text-sm">
        <strong>Forward Kinematics (FK):</strong> Easy, unique solution<br />
        <strong>Inverse Kinematics (IK):</strong> Hard, multiple solutions
      </p>
    </div>
  </div>
);

// Interactive Forward Kinematics
const ForwardKinematicsVisual: React.FC = () => {
  const [theta1, setTheta1] = useState(45);
  const [theta2, setTheta2] = useState(30);
  
  const L1 = 60;
  const L2 = 50;
  
  const rad1 = (theta1 * Math.PI) / 180;
  const rad2 = ((theta1 + theta2) * Math.PI) / 180;
  
  const x1 = 80 + L1 * Math.cos(rad1);
  const y1 = 100 - L1 * Math.sin(rad1);
  const x2 = x1 + L2 * Math.cos(rad2);
  const y2 = y1 - L2 * Math.sin(rad2);

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <svg width="240" height="140" viewBox="0 0 240 140">
          {/* Base */}
          <rect x="60" y="100" width="40" height="15" fill="rgb(64, 64, 64)" rx="3" />
          
          {/* Link 1 */}
          <line x1="80" y1="100" x2={x1} y2={y1} stroke="rgb(249, 115, 22)" strokeWidth="6" strokeLinecap="round" />
          <circle cx="80" cy="100" r="6" fill="rgb(249, 115, 22)" stroke="white" strokeWidth="2" />
          
          {/* Link 2 */}
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgb(234, 88, 12)" strokeWidth="5" strokeLinecap="round" />
          <circle cx={x1} cy={y1} r="5" fill="rgb(234, 88, 12)" stroke="white" strokeWidth="2" />
          
          {/* End effector */}
          <circle cx={x2} cy={y2} r="8" fill="rgb(34, 197, 94)" />
          
          {/* Position display */}
          <text x="180" y="30" fill="rgb(34, 197, 94)" fontSize="10">
            x = {((x2 - 80) / 100).toFixed(2)}m
          </text>
          <text x="180" y="45" fill="rgb(34, 197, 94)" fontSize="10">
            y = {((100 - y2) / 100).toFixed(2)}m
          </text>
        </svg>
      </div>

      {/* Sliders */}
      <div className="max-w-xs mx-auto space-y-3">
        <div>
          <div className="flex justify-between text-xs text-neutral-400 mb-1">
            <span>θ₁ (shoulder)</span>
            <span>{theta1}°</span>
          </div>
          <input
            type="range"
            min="-90"
            max="90"
            value={theta1}
            onChange={(e) => setTheta1(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <div className="flex justify-between text-xs text-neutral-400 mb-1">
            <span>θ₂ (elbow)</span>
            <span>{theta2}°</span>
          </div>
          <input
            type="range"
            min="-135"
            max="135"
            value={theta2}
            onChange={(e) => setTheta2(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 text-center">
        <p className="text-sm font-mono">
          x = L₁cos(θ₁) + L₂cos(θ₁+θ₂)<br />
          y = L₁sin(θ₁) + L₂sin(θ₁+θ₂)
        </p>
      </div>
    </div>
  );
};

// Inverse Kinematics
const InverseKinematicsVisual: React.FC = () => {
  const [targetX, setTargetX] = useState(80);
  const [targetY, setTargetY] = useState(40);
  
  const L1 = 60;
  const L2 = 50;
  
  // IK solution
  const dx = targetX - 80;
  const dy = 100 - targetY;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const reachable = dist <= L1 + L2 && dist >= Math.abs(L1 - L2);
  
  let x1 = 80, y1 = 100, theta1 = 0, theta2 = 0;
  
  if (reachable) {
    const cosTheta2 = (dist * dist - L1 * L1 - L2 * L2) / (2 * L1 * L2);
    theta2 = Math.acos(Math.max(-1, Math.min(1, cosTheta2)));
    const k1 = L1 + L2 * Math.cos(theta2);
    const k2 = L2 * Math.sin(theta2);
    theta1 = Math.atan2(dy, dx) - Math.atan2(k2, k1);
    
    x1 = 80 + L1 * Math.cos(theta1);
    y1 = 100 - L1 * Math.sin(theta1);
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <svg width="240" height="140" viewBox="0 0 240 140">
          {/* Base */}
          <rect x="60" y="100" width="40" height="15" fill="rgb(64, 64, 64)" rx="3" />
          
          {/* Target */}
          <circle 
            cx={targetX} 
            cy={targetY} 
            r="12" 
            fill={reachable ? 'rgba(234, 179, 8, 0.3)' : 'rgba(239, 68, 68, 0.3)'} 
            stroke={reachable ? 'rgb(234, 179, 8)' : 'rgb(239, 68, 68)'} 
            strokeWidth="2"
            strokeDasharray="4"
          />
          <text 
            x={targetX} 
            y={targetY + 4} 
            textAnchor="middle" 
            fill={reachable ? 'rgb(234, 179, 8)' : 'rgb(239, 68, 68)'} 
            fontSize="10"
          >
            target
          </text>
          
          {reachable && (
            <>
              {/* Link 1 */}
              <line x1="80" y1="100" x2={x1} y2={y1} stroke="rgb(249, 115, 22)" strokeWidth="6" strokeLinecap="round" />
              <circle cx="80" cy="100" r="6" fill="rgb(249, 115, 22)" stroke="white" strokeWidth="2" />
              
              {/* Link 2 */}
              <line x1={x1} y1={y1} x2={targetX} y2={targetY} stroke="rgb(234, 88, 12)" strokeWidth="5" strokeLinecap="round" />
              <circle cx={x1} cy={y1} r="5" fill="rgb(234, 88, 12)" stroke="white" strokeWidth="2" />
              
              {/* End effector */}
              <circle cx={targetX} cy={targetY} r="6" fill="rgb(34, 197, 94)" />
            </>
          )}
        </svg>
      </div>

      {/* Target controls */}
      <div className="max-w-xs mx-auto space-y-3">
        <div>
          <div className="flex justify-between text-xs text-neutral-400 mb-1">
            <span>Target X</span>
            <span>{((targetX - 80) / 100).toFixed(2)}m</span>
          </div>
          <input
            type="range"
            min="0"
            max="180"
            value={targetX}
            onChange={(e) => setTargetX(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <div className="flex justify-between text-xs text-neutral-400 mb-1">
            <span>Target Y</span>
            <span>{((100 - targetY) / 100).toFixed(2)}m</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={100 - targetY}
            onChange={(e) => setTargetY(100 - parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className={`border rounded-lg p-3 text-center ${reachable ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
        <p className="text-sm">
          {reachable 
            ? `✅ Reachable! θ₁ = ${(theta1 * 180 / Math.PI).toFixed(1)}°, θ₂ = ${(theta2 * 180 / Math.PI).toFixed(1)}°`
            : '❌ Target out of reach!'
          }
        </p>
      </div>
    </div>
  );
};

// Multiple Solutions
const MultipleSolutionsVisual: React.FC = () => {
  const [showElbowUp, setShowElbowUp] = useState(true);
  
  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <svg width="240" height="140" viewBox="0 0 240 140">
          {/* Base */}
          <rect x="60" y="100" width="40" height="15" fill="rgb(64, 64, 64)" rx="3" />
          
          {/* Target point */}
          <circle cx="160" cy="60" r="8" fill="rgb(234, 179, 8)" />
          
          {/* Elbow up solution */}
          <g opacity={showElbowUp ? 1 : 0.3}>
            <line x1="80" y1="100" x2="110" y2="45" stroke="rgb(34, 197, 94)" strokeWidth="5" strokeLinecap="round" />
            <line x1="110" y1="45" x2="160" y2="60" stroke="rgb(34, 197, 94)" strokeWidth="4" strokeLinecap="round" />
            <circle cx="110" cy="45" r="4" fill="rgb(34, 197, 94)" />
          </g>
          
          {/* Elbow down solution */}
          <g opacity={!showElbowUp ? 1 : 0.3}>
            <line x1="80" y1="100" x2="130" y2="95" stroke="rgb(59, 130, 246)" strokeWidth="5" strokeLinecap="round" />
            <line x1="130" y1="95" x2="160" y2="60" stroke="rgb(59, 130, 246)" strokeWidth="4" strokeLinecap="round" />
            <circle cx="130" cy="95" r="4" fill="rgb(59, 130, 246)" />
          </g>
          
          {/* Labels */}
          <text x="95" y="35" fill="rgb(34, 197, 94)" fontSize="10">Elbow up</text>
          <text x="130" y="115" fill="rgb(59, 130, 246)" fontSize="10">Elbow down</text>
        </svg>
      </div>

      {/* Toggle */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setShowElbowUp(true)}
          className={`px-4 py-2 rounded-lg text-sm transition-all ${
            showElbowUp ? 'bg-green-500/30 text-green-400 border border-green-500/50' : 'bg-white/5 text-neutral-400'
          }`}
        >
          Elbow Up
        </button>
        <button
          onClick={() => setShowElbowUp(false)}
          className={`px-4 py-2 rounded-lg text-sm transition-all ${
            !showElbowUp ? 'bg-blue-500/30 text-blue-400 border border-blue-500/50' : 'bg-white/5 text-neutral-400'
          }`}
        >
          Elbow Down
        </button>
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 text-center">
        <p className="text-sm">
          Same target position, two valid configurations!
        </p>
        <p className="text-xs text-neutral-500 mt-1">
          IK solvers must choose based on constraints or preferences
        </p>
      </div>
    </div>
  );
};

// Kinematics in VLAs
const KinematicsVLAVisual: React.FC = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-center gap-4">
      {/* Traditional */}
      <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 text-center">
        <div className="text-orange-400 text-sm font-medium mb-2">Traditional</div>
        <div className="text-xs text-neutral-400 space-y-1">
          <div>1. Detect object</div>
          <div>2. Plan path → x</div>
          <div>3. IK solve → θ</div>
          <div>4. Execute</div>
        </div>
      </div>

      <div className="text-neutral-600">vs</div>

      {/* VLA */}
      <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4 text-center">
        <div className="text-pink-400 text-sm font-medium mb-2">VLA</div>
        <div className="text-xs text-neutral-400 space-y-1">
          <div>1. See image</div>
          <div>2. Output → θ</div>
          <div className="text-pink-300">(direct!)</div>
        </div>
      </div>
    </div>

    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
      <p className="text-sm text-center mb-2">VLAs learn implicit kinematics:</p>
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="bg-black/20 rounded p-2 text-center">
          <span className="text-green-400">✓</span> No explicit IK<br />
          <span className="text-neutral-500">Learned from data</span>
        </div>
        <div className="bg-black/20 rounded p-2 text-center">
          <span className="text-green-400">✓</span> Handles uncertainty<br />
          <span className="text-neutral-500">Robust to noise</span>
        </div>
      </div>
    </div>

    <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 text-center">
      <p className="text-sm">
        Understanding kinematics helps you understand what the VLA is learning!
      </p>
    </div>
  </div>
);

export default KinematicsModule;
