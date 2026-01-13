/**
 * @fileoverview Interactive Backpropagation Module.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, StepNavigator } from '../../components/shared';
import { RotateCcw, X, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    title: 'The Learning Problem',
    desc: 'How does a neural network learn from mistakes? By computing how each weight contributed to the error!',
  },
  {
    title: 'Forward Pass',
    desc: 'Data flows forward through the network to produce an output. Watch the activations propagate!',
  },
  {
    title: 'Computing the Loss',
    desc: 'The loss measures how wrong our prediction is. The goal: minimize this number!',
  },
  {
    title: 'Backward Pass',
    desc: 'Gradients flow backward using the chain rule. Each weight learns how much it contributed to the error.',
  },
  {
    title: 'Weight Updates',
    desc: 'Adjust weights in the opposite direction of their gradients. This is gradient descent in action!',
  },
];

const BackpropModule: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [weights, setWeights] = useState([0.5, -0.3, 0.8, 0.2]);
  const [learningRate, setLearningRate] = useState(0.5);
  const [animationPhase, setAnimationPhase] = useState<'forward' | 'backward' | 'update'>('forward');

  const renderVisual = () => {
    switch (step) {
      case 0:
        return <LearningProblemVisual />;
      case 1:
        return <ForwardPassVisual weights={weights} />;
      case 2:
        return <LossVisual weights={weights} />;
      case 3:
        return <BackwardPassVisual weights={weights} />;
      case 4:
        return (
          <WeightUpdateVisual 
            weights={weights} 
            setWeights={setWeights}
            learningRate={learningRate}
            setLearningRate={setLearningRate}
          />
        );
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
          { label: 'Backprop', path: '/learn/nn/backprop' },
        ]} 
      />

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 bg-gradient-to-r from-pink-500/10 to-pink-500/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                  <RotateCcw size={20} className="text-pink-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Backpropagation</h2>
                  <p className="text-xs text-neutral-500">How neural networks learn</p>
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

// Learning problem intro
const LearningProblemVisual: React.FC = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-center gap-4">
      {/* Input */}
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-blue-500/20 border-2 border-blue-500/50 flex items-center justify-center">
          <span className="font-mono text-blue-300">x</span>
        </div>
        <div className="text-[10px] text-neutral-500 mt-1">Input</div>
      </div>

      <ArrowRight className="text-neutral-600" />

      {/* Network */}
      <div className="text-center">
        <div className="w-24 h-16 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
          <span className="text-sm text-purple-300">f(x; <span className="text-pink-400">w</span>)</span>
        </div>
        <div className="text-[10px] text-neutral-500 mt-1">Network with weights</div>
      </div>

      <ArrowRight className="text-neutral-600" />

      {/* Output */}
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500/50 flex items-center justify-center">
          <span className="font-mono text-green-300">ŷ</span>
        </div>
        <div className="text-[10px] text-neutral-500 mt-1">Prediction</div>
      </div>

      <span className="text-neutral-500">vs</span>

      {/* Target */}
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-orange-500/20 border-2 border-orange-500/50 flex items-center justify-center">
          <span className="font-mono text-orange-300">y</span>
        </div>
        <div className="text-[10px] text-neutral-500 mt-1">Target</div>
      </div>
    </div>

    <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4 text-center">
      <p className="text-sm mb-2">
        <span className="text-pink-400">The Question:</span> How do we adjust the weights <span className="font-mono text-pink-300">w</span> so that 
        our prediction <span className="font-mono text-green-300">ŷ</span> gets closer to the target <span className="font-mono text-orange-300">y</span>?
      </p>
      <p className="text-[10px] text-neutral-500">
        Answer: Backpropagation computes how each weight affects the error!
      </p>
    </div>
  </div>
);

// Forward pass
const ForwardPassVisual: React.FC<{ weights: number[] }> = ({ weights }) => {
  const input = 1.0;
  const h1 = input * weights[0];
  const h1_act = Math.max(0, h1); // ReLU
  const h2 = input * weights[1];
  const h2_act = Math.max(0, h2);
  const output = h1_act * weights[2] + h2_act * weights[3];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center">
        <div className="relative" style={{ width: 320, height: 180 }}>
          {/* Input node */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <div className="w-12 h-12 rounded-full bg-blue-500/30 border-2 border-blue-500 flex items-center justify-center">
              <span className="font-mono text-sm text-blue-300">{input}</span>
            </div>
          </div>

          {/* Hidden nodes */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/4 -translate-y-1/2">
            <div className="w-12 h-12 rounded-full bg-purple-500/30 border-2 border-purple-500 flex items-center justify-center">
              <span className="font-mono text-xs text-purple-300">{h1_act.toFixed(2)}</span>
            </div>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 bottom-1/4 translate-y-1/2">
            <div className="w-12 h-12 rounded-full bg-purple-500/30 border-2 border-purple-500 flex items-center justify-center">
              <span className="font-mono text-xs text-purple-300">{h2_act.toFixed(2)}</span>
            </div>
          </div>

          {/* Output node */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <div className="w-12 h-12 rounded-full bg-green-500/30 border-2 border-green-500 flex items-center justify-center">
              <span className="font-mono text-xs text-green-300">{output.toFixed(2)}</span>
            </div>
          </div>

          {/* Connections with weights */}
          <svg className="absolute inset-0" viewBox="0 0 320 180">
            {/* Input to hidden */}
            <line x1="55" y1="90" x2="125" y2="45" stroke="#8b5cf6" strokeWidth="2" />
            <text x="80" y="55" fill="#a78bfa" fontSize="10" fontFamily="monospace">w₁={weights[0].toFixed(1)}</text>
            
            <line x1="55" y1="90" x2="125" y2="135" stroke="#8b5cf6" strokeWidth="2" />
            <text x="80" y="125" fill="#a78bfa" fontSize="10" fontFamily="monospace">w₂={weights[1].toFixed(1)}</text>

            {/* Hidden to output */}
            <line x1="185" y1="45" x2="260" y2="90" stroke="#22c55e" strokeWidth="2" />
            <text x="205" y="55" fill="#86efac" fontSize="10" fontFamily="monospace">w₃={weights[2].toFixed(1)}</text>
            
            <line x1="185" y1="135" x2="260" y2="90" stroke="#22c55e" strokeWidth="2" />
            <text x="205" y="130" fill="#86efac" fontSize="10" fontFamily="monospace">w₄={weights[3].toFixed(1)}</text>

            {/* Forward arrow */}
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-center">
        <div className="text-xs text-blue-400 mb-1">Forward Pass Complete!</div>
        <div className="font-mono text-sm">
          Input: <span className="text-blue-300">{input}</span> → 
          Hidden: [<span className="text-purple-300">{h1_act.toFixed(2)}</span>, <span className="text-purple-300">{h2_act.toFixed(2)}</span>] → 
          Output: <span className="text-green-300">{output.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

// Loss computation
const LossVisual: React.FC<{ weights: number[] }> = ({ weights }) => {
  const input = 1.0;
  const target = 1.0;
  const h1_act = Math.max(0, input * weights[0]);
  const h2_act = Math.max(0, input * weights[1]);
  const prediction = h1_act * weights[2] + h2_act * weights[3];
  const loss = 0.5 * Math.pow(prediction - target, 2);
  const error = prediction - target;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-6">
        <div className="text-center">
          <div className="w-20 h-20 rounded-xl bg-green-500/20 border-2 border-green-500/50 flex flex-col items-center justify-center">
            <span className="text-[10px] text-neutral-500">Prediction</span>
            <span className="font-mono text-xl text-green-300">{prediction.toFixed(2)}</span>
          </div>
        </div>

        <div className="text-2xl text-neutral-500">-</div>

        <div className="text-center">
          <div className="w-20 h-20 rounded-xl bg-orange-500/20 border-2 border-orange-500/50 flex flex-col items-center justify-center">
            <span className="text-[10px] text-neutral-500">Target</span>
            <span className="font-mono text-xl text-orange-300">{target.toFixed(2)}</span>
          </div>
        </div>

        <div className="text-2xl text-neutral-500">=</div>

        <div className="text-center">
          <div className="w-20 h-20 rounded-xl bg-red-500/20 border-2 border-red-500/50 flex flex-col items-center justify-center">
            <span className="text-[10px] text-neutral-500">Error</span>
            <span className="font-mono text-xl text-red-300">{error.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-center">
        <div className="font-mono text-sm mb-2">
          Loss = ½ × (ŷ - y)² = ½ × ({error.toFixed(2)})²
        </div>
        <div className="text-2xl font-bold text-red-400">
          L = {loss.toFixed(4)}
        </div>
        <p className="text-[10px] text-neutral-500 mt-2">
          We want to minimize this loss - make it as close to 0 as possible!
        </p>
      </div>
    </div>
  );
};

// Backward pass
const BackwardPassVisual: React.FC<{ weights: number[] }> = ({ weights }) => {
  const input = 1.0;
  const target = 1.0;
  const h1 = input * weights[0];
  const h1_act = Math.max(0, h1);
  const h2 = input * weights[1];
  const h2_act = Math.max(0, h2);
  const prediction = h1_act * weights[2] + h2_act * weights[3];
  
  // Gradients (chain rule!)
  const dL_dPred = prediction - target;
  const dL_dW3 = dL_dPred * h1_act;
  const dL_dW4 = dL_dPred * h2_act;
  const dL_dH1 = dL_dPred * weights[2] * (h1 > 0 ? 1 : 0);
  const dL_dH2 = dL_dPred * weights[3] * (h2 > 0 ? 1 : 0);
  const dL_dW1 = dL_dH1 * input;
  const dL_dW2 = dL_dH2 * input;

  return (
    <div className="space-y-4">
      <div className="text-center text-sm text-neutral-400 mb-2">
        Gradients flow <span className="text-pink-400">backward</span> through the chain rule
      </div>

      <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
        <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-2 text-center">
          <div className="text-[10px] text-pink-400 mb-1">∂L/∂w₁</div>
          <div className="font-mono text-sm text-pink-300">{dL_dW1.toFixed(3)}</div>
        </div>
        <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-2 text-center">
          <div className="text-[10px] text-pink-400 mb-1">∂L/∂w₂</div>
          <div className="font-mono text-sm text-pink-300">{dL_dW2.toFixed(3)}</div>
        </div>
        <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-2 text-center">
          <div className="text-[10px] text-pink-400 mb-1">∂L/∂w₃</div>
          <div className="font-mono text-sm text-pink-300">{dL_dW3.toFixed(3)}</div>
        </div>
        <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-2 text-center">
          <div className="text-[10px] text-pink-400 mb-1">∂L/∂w₄</div>
          <div className="font-mono text-sm text-pink-300">{dL_dW4.toFixed(3)}</div>
        </div>
      </div>

      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 text-center">
        <div className="text-xs text-purple-400 mb-2">Chain Rule in Action</div>
        <div className="font-mono text-[10px] text-neutral-300">
          ∂L/∂w₁ = ∂L/∂pred × ∂pred/∂h₁ × ∂h₁/∂w₁
        </div>
        <div className="font-mono text-[10px] text-neutral-300 mt-1">
          = ({dL_dPred.toFixed(2)}) × ({weights[2].toFixed(1)}) × ({input}) = <span className="text-pink-400">{dL_dW1.toFixed(3)}</span>
        </div>
      </div>

      <p className="text-[10px] text-neutral-500 text-center">
        Each gradient tells us: "How much does the loss increase if this weight increases?"
      </p>
    </div>
  );
};

// Weight update
const WeightUpdateVisual: React.FC<{
  weights: number[];
  setWeights: (w: number[]) => void;
  learningRate: number;
  setLearningRate: (lr: number) => void;
}> = ({ weights, setWeights, learningRate, setLearningRate }) => {
  const input = 1.0;
  const target = 1.0;
  
  // Compute gradients
  const h1 = input * weights[0];
  const h1_act = Math.max(0, h1);
  const h2 = input * weights[1];
  const h2_act = Math.max(0, h2);
  const prediction = h1_act * weights[2] + h2_act * weights[3];
  
  const dL_dPred = prediction - target;
  const gradients = [
    dL_dPred * weights[2] * (h1 > 0 ? 1 : 0) * input,
    dL_dPred * weights[3] * (h2 > 0 ? 1 : 0) * input,
    dL_dPred * h1_act,
    dL_dPred * h2_act,
  ];

  const loss = 0.5 * Math.pow(prediction - target, 2);

  const applyUpdate = () => {
    setWeights(weights.map((w, i) => w - learningRate * gradients[i]));
  };

  const reset = () => {
    setWeights([0.5, -0.3, 0.8, 0.2]);
  };

  return (
    <div className="space-y-4">
      {/* Learning rate slider */}
      <div className="max-w-xs mx-auto">
        <div className="flex justify-between text-xs text-neutral-500 mb-1">
          <span>Learning Rate (α)</span>
          <span>{learningRate}</span>
        </div>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.1"
          value={learningRate}
          onChange={(e) => setLearningRate(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Weight updates */}
      <div className="grid grid-cols-4 gap-2 max-w-lg mx-auto">
        {weights.map((w, i) => (
          <div key={i} className="bg-white/5 rounded-lg p-2 text-center">
            <div className="text-[10px] text-neutral-500 mb-1">w{i + 1}</div>
            <div className="font-mono text-sm text-neutral-300">{w.toFixed(3)}</div>
            <div className="text-[10px] text-pink-400 mt-1">
              {gradients[i] >= 0 ? '-' : '+'}{Math.abs(learningRate * gradients[i]).toFixed(3)}
            </div>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={applyUpdate}
          className="px-6 py-2 bg-pink-500 hover:bg-pink-600 rounded-lg font-medium transition-colors"
        >
          Apply Gradient Step
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Current loss */}
      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
        <div className="text-xs text-green-400 mb-1">Current Loss</div>
        <div className="font-mono text-2xl text-green-300">{loss.toFixed(6)}</div>
        <p className="text-[10px] text-neutral-500 mt-1">
          Keep clicking "Apply Gradient Step" to minimize the loss!
        </p>
      </div>
    </div>
  );
};

export default BackpropModule;
