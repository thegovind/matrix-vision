/**
 * @fileoverview Interactive Activation Functions Module.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, StepNavigator } from '../../components/shared';
import { Zap, X } from 'lucide-react';

const STEPS = [
  {
    title: 'Why Nonlinearity?',
    desc: 'Without activation functions, neural networks can only learn linear relationships. Nonlinearity is the magic!',
  },
  {
    title: 'Sigmoid Function',
    desc: 'The classic S-curve that squashes values between 0 and 1. Great for probabilities!',
  },
  {
    title: 'ReLU: Rectified Linear Unit',
    desc: 'Simple but powerful: output the input if positive, zero otherwise. The most popular choice!',
  },
  {
    title: 'Tanh: Hyperbolic Tangent',
    desc: 'Like sigmoid but centered at zero, outputting between -1 and 1.',
  },
  {
    title: 'Comparing Activations',
    desc: 'Each activation has trade-offs. Compare them to understand when to use which!',
  },
];

const ActivationsModule: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [inputValue, setInputValue] = useState(0);

  const renderVisual = () => {
    switch (step) {
      case 0:
        return <WhyNonlinearityVisual />;
      case 1:
        return <SigmoidVisual inputValue={inputValue} setInputValue={setInputValue} />;
      case 2:
        return <ReLUVisual inputValue={inputValue} setInputValue={setInputValue} />;
      case 3:
        return <TanhVisual inputValue={inputValue} setInputValue={setInputValue} />;
      case 4:
        return <CompareVisual inputValue={inputValue} setInputValue={setInputValue} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header 
        showBreadcrumb 
        breadcrumb={[
          { label: 'Neural Networks', path: '/curriculum#nn' },
          { label: 'Activations', path: '/learn/nn/activations' },
        ]} 
      />

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 bg-gradient-to-r from-yellow-500/10 to-yellow-500/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                  <Zap size={20} className="text-yellow-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Activation Functions</h2>
                  <p className="text-xs text-neutral-500">The nonlinear magic</p>
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

// Why nonlinearity
const WhyNonlinearityVisual: React.FC = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-4">
      {/* Linear only */}
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
        <div className="text-sm font-medium text-red-400 mb-3 text-center">Without Activation</div>
        <div className="flex justify-center mb-3">
          <div className="relative bg-black/30 rounded-lg" style={{ width: 120, height: 100 }}>
            <svg viewBox="0 0 120 100" className="absolute inset-0">
              <line x1="10" y1="90" x2="110" y2="10" stroke="#ef4444" strokeWidth="2" />
            </svg>
            <div className="absolute bottom-1 right-1 text-[8px] text-neutral-500">Only lines!</div>
          </div>
        </div>
        <p className="text-[10px] text-neutral-400 text-center">
          Linear(Linear(x)) = still Linear!
        </p>
      </div>

      {/* With activation */}
      <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
        <div className="text-sm font-medium text-green-400 mb-3 text-center">With Activation</div>
        <div className="flex justify-center mb-3">
          <div className="relative bg-black/30 rounded-lg" style={{ width: 120, height: 100 }}>
            <svg viewBox="0 0 120 100" className="absolute inset-0">
              <path d="M 10 80 Q 40 80 60 50 Q 80 20 110 20" fill="none" stroke="#22c55e" strokeWidth="2" />
            </svg>
            <div className="absolute bottom-1 right-1 text-[8px] text-neutral-500">Any shape!</div>
          </div>
        </div>
        <p className="text-[10px] text-neutral-400 text-center">
          Can learn complex patterns!
        </p>
      </div>
    </div>

    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 text-center">
      <p className="text-sm mb-2">
        Activation functions add <span className="text-yellow-400">nonlinearity</span> between layers.
      </p>
      <p className="text-[10px] text-neutral-500">
        Without them, a 100-layer network would be equivalent to a single layer!
      </p>
    </div>
  </div>
);

// Sigmoid
const SigmoidVisual: React.FC<{
  inputValue: number;
  setInputValue: (v: number) => void;
}> = ({ inputValue, setInputValue }) => {
  const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));
  const output = sigmoid(inputValue);

  // Generate curve points
  const points = Array.from({ length: 100 }, (_, i) => {
    const x = -6 + i * 0.12;
    return { x, y: sigmoid(x) };
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="relative bg-black/50 rounded-lg" style={{ width: 280, height: 180 }}>
          <svg className="absolute inset-0" viewBox="0 0 280 180">
            {/* Axes */}
            <line x1="140" y1="10" x2="140" y2="170" stroke="white" strokeWidth="0.5" opacity="0.2" />
            <line x1="10" y1="90" x2="270" y2="90" stroke="white" strokeWidth="0.5" opacity="0.2" />
            
            {/* y=0 and y=1 lines */}
            <line x1="10" y1="160" x2="270" y2="160" stroke="white" strokeWidth="0.5" opacity="0.1" strokeDasharray="4" />
            <line x1="10" y1="20" x2="270" y2="20" stroke="white" strokeWidth="0.5" opacity="0.1" strokeDasharray="4" />
            
            {/* Curve */}
            <path
              d={points.map((p, i) => 
                `${i === 0 ? 'M' : 'L'} ${140 + p.x * 20} ${160 - p.y * 140}`
              ).join(' ')}
              fill="none"
              stroke="#eab308"
              strokeWidth="2"
            />
            
            {/* Current point */}
            <circle
              cx={140 + inputValue * 20}
              cy={160 - output * 140}
              r="6"
              fill="#eab308"
            />
          </svg>
          
          <div className="absolute top-2 right-2 text-[10px] text-neutral-500">y=1</div>
          <div className="absolute bottom-2 right-2 text-[10px] text-neutral-500">y=0</div>
        </div>
      </div>

      {/* Input slider */}
      <div className="max-w-xs mx-auto">
        <div className="flex justify-between text-xs text-neutral-500 mb-1">
          <span>Input (x)</span>
          <span>{inputValue.toFixed(1)}</span>
        </div>
        <input
          type="range"
          min="-5"
          max="5"
          step="0.1"
          value={inputValue}
          onChange={(e) => setInputValue(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 text-center">
        <div className="font-mono text-sm mb-2">
          σ(x) = 1 / (1 + e<sup>-x</sup>)
        </div>
        <div className="text-lg">
          σ(<span className="text-blue-400">{inputValue.toFixed(1)}</span>) = 
          <span className="text-yellow-400"> {output.toFixed(4)}</span>
        </div>
        <p className="text-[10px] text-neutral-500 mt-2">
          Output is always between 0 and 1 - perfect for probabilities!
        </p>
      </div>
    </div>
  );
};

// ReLU
const ReLUVisual: React.FC<{
  inputValue: number;
  setInputValue: (v: number) => void;
}> = ({ inputValue, setInputValue }) => {
  const relu = (x: number) => Math.max(0, x);
  const output = relu(inputValue);

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="relative bg-black/50 rounded-lg" style={{ width: 280, height: 180 }}>
          <svg className="absolute inset-0" viewBox="0 0 280 180">
            {/* Axes */}
            <line x1="140" y1="10" x2="140" y2="170" stroke="white" strokeWidth="0.5" opacity="0.2" />
            <line x1="10" y1="140" x2="270" y2="140" stroke="white" strokeWidth="0.5" opacity="0.2" />
            
            {/* ReLU curve */}
            <path
              d="M 40 140 L 140 140 L 240 40"
              fill="none"
              stroke="#22c55e"
              strokeWidth="2"
            />
            
            {/* Current point */}
            <circle
              cx={140 + inputValue * 20}
              cy={140 - output * 20}
              r="6"
              fill="#22c55e"
            />
          </svg>
        </div>
      </div>

      {/* Input slider */}
      <div className="max-w-xs mx-auto">
        <div className="flex justify-between text-xs text-neutral-500 mb-1">
          <span>Input (x)</span>
          <span>{inputValue.toFixed(1)}</span>
        </div>
        <input
          type="range"
          min="-5"
          max="5"
          step="0.1"
          value={inputValue}
          onChange={(e) => setInputValue(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
        <div className="font-mono text-sm mb-2">
          ReLU(x) = max(0, x)
        </div>
        <div className="text-lg">
          ReLU(<span className="text-blue-400">{inputValue.toFixed(1)}</span>) = 
          <span className="text-green-400"> {output.toFixed(1)}</span>
        </div>
        <p className="text-[10px] text-neutral-500 mt-2">
          Simple, fast, and effective! No vanishing gradient for positive values.
        </p>
      </div>
    </div>
  );
};

// Tanh
const TanhVisual: React.FC<{
  inputValue: number;
  setInputValue: (v: number) => void;
}> = ({ inputValue, setInputValue }) => {
  const output = Math.tanh(inputValue);

  // Generate curve points
  const points = Array.from({ length: 100 }, (_, i) => {
    const x = -4 + i * 0.08;
    return { x, y: Math.tanh(x) };
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="relative bg-black/50 rounded-lg" style={{ width: 280, height: 180 }}>
          <svg className="absolute inset-0" viewBox="0 0 280 180">
            {/* Axes */}
            <line x1="140" y1="10" x2="140" y2="170" stroke="white" strokeWidth="0.5" opacity="0.2" />
            <line x1="10" y1="90" x2="270" y2="90" stroke="white" strokeWidth="0.5" opacity="0.2" />
            
            {/* y=-1 and y=1 lines */}
            <line x1="10" y1="20" x2="270" y2="20" stroke="white" strokeWidth="0.5" opacity="0.1" strokeDasharray="4" />
            <line x1="10" y1="160" x2="270" y2="160" stroke="white" strokeWidth="0.5" opacity="0.1" strokeDasharray="4" />
            
            {/* Curve */}
            <path
              d={points.map((p, i) => 
                `${i === 0 ? 'M' : 'L'} ${140 + p.x * 30} ${90 - p.y * 70}`
              ).join(' ')}
              fill="none"
              stroke="#a855f7"
              strokeWidth="2"
            />
            
            {/* Current point */}
            <circle
              cx={140 + inputValue * 30}
              cy={90 - output * 70}
              r="6"
              fill="#a855f7"
            />
          </svg>
          
          <div className="absolute top-2 right-2 text-[10px] text-neutral-500">+1</div>
          <div className="absolute bottom-2 right-2 text-[10px] text-neutral-500">-1</div>
        </div>
      </div>

      {/* Input slider */}
      <div className="max-w-xs mx-auto">
        <div className="flex justify-between text-xs text-neutral-500 mb-1">
          <span>Input (x)</span>
          <span>{inputValue.toFixed(1)}</span>
        </div>
        <input
          type="range"
          min="-4"
          max="4"
          step="0.1"
          value={inputValue}
          onChange={(e) => setInputValue(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 text-center">
        <div className="font-mono text-sm mb-2">
          tanh(x) = (e<sup>x</sup> - e<sup>-x</sup>) / (e<sup>x</sup> + e<sup>-x</sup>)
        </div>
        <div className="text-lg">
          tanh(<span className="text-blue-400">{inputValue.toFixed(1)}</span>) = 
          <span className="text-purple-400"> {output.toFixed(4)}</span>
        </div>
        <p className="text-[10px] text-neutral-500 mt-2">
          Zero-centered output (-1 to 1) - often better than sigmoid for hidden layers.
        </p>
      </div>
    </div>
  );
};

// Compare all
const CompareVisual: React.FC<{
  inputValue: number;
  setInputValue: (v: number) => void;
}> = ({ inputValue, setInputValue }) => {
  const sigmoid = 1 / (1 + Math.exp(-inputValue));
  const relu = Math.max(0, inputValue);
  const tanh = Math.tanh(inputValue);
  const leakyRelu = inputValue > 0 ? inputValue : 0.1 * inputValue;

  return (
    <div className="space-y-4">
      {/* Input slider */}
      <div className="max-w-xs mx-auto">
        <div className="flex justify-between text-xs text-neutral-500 mb-1">
          <span>Input (x)</span>
          <span>{inputValue.toFixed(1)}</span>
        </div>
        <input
          type="range"
          min="-5"
          max="5"
          step="0.1"
          value={inputValue}
          onChange={(e) => setInputValue(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Comparison grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-yellow-400">Sigmoid</span>
            <span className="font-mono text-sm text-yellow-300">{sigmoid.toFixed(3)}</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-yellow-500 transition-all" style={{ width: `${sigmoid * 100}%` }} />
          </div>
          <div className="text-[9px] text-neutral-500 mt-1">Range: [0, 1]</div>
        </div>

        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-green-400">ReLU</span>
            <span className="font-mono text-sm text-green-300">{relu.toFixed(3)}</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 transition-all" style={{ width: `${Math.min(relu / 5 * 100, 100)}%` }} />
          </div>
          <div className="text-[9px] text-neutral-500 mt-1">Range: [0, ∞)</div>
        </div>

        <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-purple-400">Tanh</span>
            <span className="font-mono text-sm text-purple-300">{tanh.toFixed(3)}</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-purple-500 transition-all" 
              style={{ 
                width: `${Math.abs(tanh) * 50}%`,
                marginLeft: tanh < 0 ? `${50 - Math.abs(tanh) * 50}%` : '50%'
              }} 
            />
          </div>
          <div className="text-[9px] text-neutral-500 mt-1">Range: [-1, 1]</div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-blue-400">Leaky ReLU</span>
            <span className="font-mono text-sm text-blue-300">{leakyRelu.toFixed(3)}</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 transition-all" style={{ width: `${Math.min(Math.max(leakyRelu, 0) / 5 * 100, 100)}%` }} />
          </div>
          <div className="text-[9px] text-neutral-500 mt-1">α=0.1 for x&lt;0</div>
        </div>
      </div>

      <div className="bg-white/5 rounded-lg p-3 text-[10px] text-neutral-400">
        <div className="font-medium text-neutral-300 mb-1">When to use which?</div>
        <ul className="space-y-1">
          <li>• <span className="text-green-400">ReLU</span>: Default for hidden layers - fast and effective</li>
          <li>• <span className="text-yellow-400">Sigmoid</span>: Output layer for binary classification</li>
          <li>• <span className="text-purple-400">Tanh</span>: When zero-centered outputs matter</li>
          <li>• <span className="text-blue-400">Leaky ReLU</span>: When "dying ReLU" is a problem</li>
        </ul>
      </div>
    </div>
  );
};

export default ActivationsModule;
