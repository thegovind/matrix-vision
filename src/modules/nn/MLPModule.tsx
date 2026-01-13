/**
 * @fileoverview Interactive Multi-Layer Perceptron Module.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, StepNavigator } from '../../components/shared';
import { Layers, X } from 'lucide-react';

const STEPS = [
  {
    title: 'Beyond Single Neurons',
    desc: 'A single neuron can only draw a straight line. Stack layers to create complex decision boundaries!',
  },
  {
    title: 'Hidden Layers',
    desc: 'Layers between input and output learn intermediate features. More layers = more abstraction.',
  },
  {
    title: 'Universal Approximation',
    desc: 'An MLP with one hidden layer can approximate ANY function! But depth helps learn efficiently.',
  },
  {
    title: 'Feature Hierarchies',
    desc: 'Early layers learn simple patterns, deeper layers combine them into complex concepts.',
  },
  {
    title: 'Build Your Own MLP',
    desc: 'Experiment with different architectures. How do width and depth affect the decision boundary?',
  },
];

const MLPModule: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [hiddenLayers, setHiddenLayers] = useState([4, 4]);
  const [points, setPoints] = useState<{x: number, y: number, label: number}[]>([]);

  const renderVisual = () => {
    switch (step) {
      case 0:
        return <BeyondSingleVisual />;
      case 1:
        return <HiddenLayersVisual layers={hiddenLayers} />;
      case 2:
        return <UniversalApproxVisual />;
      case 3:
        return <FeatureHierarchyVisual />;
      case 4:
        return (
          <BuildMLPVisual 
            layers={hiddenLayers} 
            setLayers={setHiddenLayers}
            points={points}
            setPoints={setPoints}
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
          { label: 'MLP', path: '/learn/nn/mlp' },
        ]} 
      />

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 bg-gradient-to-r from-purple-500/10 to-purple-500/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Layers size={20} className="text-purple-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Multi-Layer Perceptrons</h2>
                  <p className="text-xs text-neutral-500">Deep networks with hidden layers</p>
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

// Single neuron limitation
const BeyondSingleVisual: React.FC = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-4">
      {/* Single neuron */}
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
        <div className="text-sm font-medium text-red-400 mb-3 text-center">Single Neuron</div>
        <div className="flex justify-center mb-3">
          <div className="relative bg-black/30 rounded-lg" style={{ width: 120, height: 120 }}>
            {/* XOR pattern - can't solve! */}
            <div className="absolute w-3 h-3 rounded-full bg-blue-400" style={{ top: '20%', left: '20%' }} />
            <div className="absolute w-3 h-3 rounded-full bg-red-400" style={{ top: '20%', right: '20%' }} />
            <div className="absolute w-3 h-3 rounded-full bg-red-400" style={{ bottom: '20%', left: '20%' }} />
            <div className="absolute w-3 h-3 rounded-full bg-blue-400" style={{ bottom: '20%', right: '20%' }} />
            {/* Can only draw one line */}
            <div className="absolute top-0 left-1/2 w-px h-full bg-yellow-400/50 -rotate-45 origin-top" />
          </div>
        </div>
        <p className="text-[10px] text-neutral-400 text-center">
          ❌ Can't separate XOR pattern!
        </p>
      </div>

      {/* MLP */}
      <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
        <div className="text-sm font-medium text-green-400 mb-3 text-center">MLP (2+ layers)</div>
        <div className="flex justify-center mb-3">
          <div className="relative bg-black/30 rounded-lg" style={{ width: 120, height: 120 }}>
            {/* Same XOR pattern */}
            <div className="absolute w-3 h-3 rounded-full bg-blue-400" style={{ top: '20%', left: '20%' }} />
            <div className="absolute w-3 h-3 rounded-full bg-red-400" style={{ top: '20%', right: '20%' }} />
            <div className="absolute w-3 h-3 rounded-full bg-red-400" style={{ bottom: '20%', left: '20%' }} />
            <div className="absolute w-3 h-3 rounded-full bg-blue-400" style={{ bottom: '20%', right: '20%' }} />
            {/* Can draw complex boundary */}
            <svg viewBox="0 0 120 120" className="absolute inset-0">
              <path 
                d="M 60 10 Q 100 60 60 110 Q 20 60 60 10" 
                fill="none" 
                stroke="#22c55e" 
                strokeWidth="2"
                opacity="0.7"
              />
            </svg>
          </div>
        </div>
        <p className="text-[10px] text-neutral-400 text-center">
          ✅ Can learn any boundary!
        </p>
      </div>
    </div>

    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 text-center">
      <p className="text-sm">
        The XOR problem showed that single neurons can't solve all problems.
        <br />
        <span className="text-purple-400">Adding hidden layers</span> unlocks the power of neural networks!
      </p>
    </div>
  </div>
);

// Hidden layers visualization
const HiddenLayersVisual: React.FC<{ layers: number[] }> = ({ layers }) => {
  const allLayers = [2, ...layers, 1]; // Input, hidden, output

  return (
    <div className="space-y-4">
      <div className="flex justify-center items-center overflow-x-auto py-4">
        <div className="flex items-center gap-8">
          {allLayers.map((neurons, layerIdx) => (
            <React.Fragment key={layerIdx}>
              <div className="flex flex-col gap-2 items-center">
                <div className="text-[10px] text-neutral-500 mb-1">
                  {layerIdx === 0 ? 'Input' : layerIdx === allLayers.length - 1 ? 'Output' : `Hidden ${layerIdx}`}
                </div>
                {Array.from({ length: Math.min(neurons, 6) }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-mono ${
                      layerIdx === 0 ? 'bg-blue-500/30 border border-blue-500/50 text-blue-300' :
                      layerIdx === allLayers.length - 1 ? 'bg-green-500/30 border border-green-500/50 text-green-300' :
                      'bg-purple-500/30 border border-purple-500/50 text-purple-300'
                    }`}
                  >
                    {neurons > 6 && i === 5 ? '...' : `n${i + 1}`}
                  </div>
                ))}
                {neurons > 6 && (
                  <div className="text-[10px] text-neutral-500">+{neurons - 6} more</div>
                )}
              </div>
              {layerIdx < allLayers.length - 1 && (
                <div className="text-neutral-600 text-2xl">→</div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto text-center">
        <div className="bg-blue-500/10 rounded-lg p-2">
          <div className="text-lg font-bold text-blue-400">2</div>
          <div className="text-[10px] text-neutral-500">Inputs</div>
        </div>
        <div className="bg-purple-500/10 rounded-lg p-2">
          <div className="text-lg font-bold text-purple-400">{layers.length}</div>
          <div className="text-[10px] text-neutral-500">Hidden Layers</div>
        </div>
        <div className="bg-green-500/10 rounded-lg p-2">
          <div className="text-lg font-bold text-green-400">{layers.reduce((a, b) => a * b, 2)}</div>
          <div className="text-[10px] text-neutral-500">Total Params</div>
        </div>
      </div>
    </div>
  );
};

// Universal approximation
const UniversalApproxVisual: React.FC = () => {
  const [complexity, setComplexity] = useState(1);

  // Generate a complex function to approximate
  const targetFn = (x: number) => Math.sin(x * 2) + 0.5 * Math.sin(x * 5);
  const approxFn = (x: number, c: number) => {
    if (c === 1) return 0;
    if (c === 2) return Math.sin(x * 2);
    return targetFn(x);
  };

  const points = Array.from({ length: 100 }, (_, i) => {
    const x = -3 + i * 0.06;
    return { x, target: targetFn(x), approx: approxFn(x, complexity) };
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="relative bg-black/50 rounded-lg" style={{ width: 280, height: 160 }}>
          <svg className="absolute inset-0" viewBox="0 0 280 160">
            {/* Target function */}
            <path
              d={points.map((p, i) => 
                `${i === 0 ? 'M' : 'L'} ${140 + p.x * 40} ${80 - p.target * 40}`
              ).join(' ')}
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeDasharray="4"
            />
            
            {/* Approximation */}
            <path
              d={points.map((p, i) => 
                `${i === 0 ? 'M' : 'L'} ${140 + p.x * 40} ${80 - p.approx * 40}`
              ).join(' ')}
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="2"
            />
          </svg>
          
          <div className="absolute top-2 right-2 text-[10px]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-amber-500" style={{ borderStyle: 'dashed' }} />
              <span className="text-amber-400">Target</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-purple-500" />
              <span className="text-purple-400">MLP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Complexity slider */}
      <div className="max-w-xs mx-auto">
        <div className="flex justify-between text-xs text-neutral-500 mb-1">
          <span>Hidden Layer Width</span>
          <span>{complexity === 1 ? '1 neuron' : complexity === 2 ? '4 neurons' : '16 neurons'}</span>
        </div>
        <input
          type="range"
          min="1"
          max="3"
          step="1"
          value={complexity}
          onChange={(e) => setComplexity(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-center text-sm">
        <p className="font-medium text-amber-400 mb-1">Universal Approximation Theorem</p>
        <p className="text-[10px] text-neutral-400">
          A neural network with a single hidden layer containing a finite number of neurons
          can approximate any continuous function on a compact subset of Rⁿ.
        </p>
      </div>
    </div>
  );
};

// Feature hierarchy
const FeatureHierarchyVisual: React.FC = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-center gap-4">
      {/* Layer 1: Edges */}
      <div className="text-center">
        <div className="text-[10px] text-neutral-500 mb-2">Layer 1</div>
        <div className="grid grid-cols-2 gap-1">
          <div className="w-8 h-8 bg-gradient-to-r from-white/20 to-transparent rounded" />
          <div className="w-8 h-8 bg-gradient-to-b from-white/20 to-transparent rounded" />
          <div className="w-8 h-8 bg-gradient-to-br from-white/20 to-transparent rounded" />
          <div className="w-8 h-8 bg-gradient-to-tr from-white/20 to-transparent rounded" />
        </div>
        <div className="text-[9px] text-blue-400 mt-1">Edges</div>
      </div>

      <div className="text-neutral-600">→</div>

      {/* Layer 2: Shapes */}
      <div className="text-center">
        <div className="text-[10px] text-neutral-500 mb-2">Layer 2</div>
        <div className="grid grid-cols-2 gap-1">
          <div className="w-8 h-8 rounded-full border-2 border-white/20" />
          <div className="w-8 h-8 border-2 border-white/20" />
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-white/20 mt-1" />
          <div className="w-8 h-8 rounded-lg bg-white/10" />
        </div>
        <div className="text-[9px] text-purple-400 mt-1">Shapes</div>
      </div>

      <div className="text-neutral-600">→</div>

      {/* Layer 3: Parts */}
      <div className="text-center">
        <div className="text-[10px] text-neutral-500 mb-2">Layer 3</div>
        <div className="grid grid-cols-2 gap-1">
          <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center text-[10px]">👁️</div>
          <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center text-[10px]">👃</div>
          <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center text-[10px]">🚗</div>
          <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center text-[10px]">🐾</div>
        </div>
        <div className="text-[9px] text-green-400 mt-1">Parts</div>
      </div>

      <div className="text-neutral-600">→</div>

      {/* Layer 4: Objects */}
      <div className="text-center">
        <div className="text-[10px] text-neutral-500 mb-2">Layer 4</div>
        <div className="grid grid-cols-2 gap-1">
          <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center text-lg">🧑</div>
          <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center text-lg">🚙</div>
          <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center text-lg">🐱</div>
          <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center text-lg">🏠</div>
        </div>
        <div className="text-[9px] text-orange-400 mt-1">Objects</div>
      </div>
    </div>

    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 text-center">
      <p className="text-sm mb-1">
        <span className="text-purple-400">Depth enables hierarchy:</span>
      </p>
      <p className="text-[10px] text-neutral-400">
        Pixels → Edges → Textures → Parts → Objects → Scenes
      </p>
    </div>
  </div>
);

// Build your own MLP
const BuildMLPVisual: React.FC<{
  layers: number[];
  setLayers: (l: number[]) => void;
  points: { x: number; y: number; label: number }[];
  setPoints: (p: { x: number; y: number; label: number }[]) => void;
}> = ({ layers, setLayers, points, setPoints }) => {
  const addPoint = (e: React.MouseEvent<HTMLDivElement>, label: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1 - (e.clientY - rect.top) / rect.height;
    setPoints([...points, { x, y, label }]);
  };

  const addLayer = () => setLayers([...layers, 4]);
  const removeLayer = () => layers.length > 1 && setLayers(layers.slice(0, -1));
  const updateLayer = (idx: number, neurons: number) => {
    const newLayers = [...layers];
    newLayers[idx] = neurons;
    setLayers(newLayers);
  };

  return (
    <div className="space-y-4">
      {/* Network architecture controls */}
      <div className="flex justify-center items-center gap-2 flex-wrap">
        <div className="px-3 py-1.5 bg-blue-500/20 rounded-lg text-xs text-blue-300">
          Input (2)
        </div>
        
        {layers.map((neurons, i) => (
          <React.Fragment key={i}>
            <span className="text-neutral-600">→</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => updateLayer(i, Math.max(1, neurons - 1))}
                className="w-6 h-6 bg-white/10 rounded hover:bg-white/20 text-xs"
              >
                -
              </button>
              <div className="px-3 py-1.5 bg-purple-500/20 rounded-lg text-xs text-purple-300 min-w-[60px] text-center">
                Hidden ({neurons})
              </div>
              <button
                onClick={() => updateLayer(i, neurons + 1)}
                className="w-6 h-6 bg-white/10 rounded hover:bg-white/20 text-xs"
              >
                +
              </button>
            </div>
          </React.Fragment>
        ))}
        
        <span className="text-neutral-600">→</span>
        <div className="px-3 py-1.5 bg-green-500/20 rounded-lg text-xs text-green-300">
          Output (1)
        </div>
      </div>

      {/* Layer controls */}
      <div className="flex justify-center gap-2">
        <button
          onClick={addLayer}
          className="px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg text-xs text-purple-300 transition-colors"
        >
          + Add Layer
        </button>
        <button
          onClick={removeLayer}
          disabled={layers.length <= 1}
          className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-xs text-red-300 transition-colors disabled:opacity-50"
        >
          - Remove Layer
        </button>
        <button
          onClick={() => setPoints([])}
          className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs transition-colors"
        >
          Clear Points
        </button>
      </div>

      {/* Interactive canvas */}
      <div className="flex justify-center">
        <div 
          className="relative bg-black/50 rounded-lg cursor-crosshair overflow-hidden"
          style={{ width: 220, height: 220 }}
          onClick={(e) => addPoint(e, e.shiftKey ? 0 : 1)}
        >
          {/* Grid */}
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-10">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="border border-white" />
            ))}
          </div>

          {/* Points */}
          {points.map((p, i) => (
            <div
              key={i}
              className={`absolute w-4 h-4 rounded-full -translate-x-1/2 -translate-y-1/2 ${
                p.label === 1 ? 'bg-blue-500' : 'bg-red-500'
              }`}
              style={{ left: `${p.x * 100}%`, top: `${(1 - p.y) * 100}%` }}
            />
          ))}
        </div>
      </div>

      <div className="text-center text-sm text-neutral-400">
        Click to add <span className="text-blue-400">blue</span> points, 
        Shift+Click for <span className="text-red-400">red</span> points
      </div>

      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 text-center">
        <div className="font-mono text-xs">
          Architecture: 2 → {layers.join(' → ')} → 1
        </div>
        <div className="text-[10px] text-neutral-500 mt-1">
          Total parameters: ~{2 + layers.reduce((sum, n, i) => 
            sum + (i === 0 ? 2 * n : layers[i-1] * n) + n, 0) + layers[layers.length-1]}
        </div>
      </div>
    </div>
  );
};

export default MLPModule;
