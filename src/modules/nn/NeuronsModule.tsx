/**
 * @fileoverview Interactive Neurons & Perceptrons Module.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, StepNavigator } from '../../components/shared';
import { Circle, Zap, X } from 'lucide-react';

const STEPS = [
  {
    title: 'The Biological Inspiration',
    desc: 'Real neurons receive signals, process them, and fire if the total exceeds a threshold.',
  },
  {
    title: 'The Artificial Neuron',
    desc: 'An artificial neuron takes inputs, multiplies by weights, sums them up, and applies an activation.',
  },
  {
    title: 'Weights: Learning Parameters',
    desc: 'Drag the sliders to change weights. See how the output changes!',
  },
  {
    title: 'The Bias Term',
    desc: 'Bias shifts the activation function, allowing the neuron to fire even with zero input.',
  },
  {
    title: 'Decision Boundary',
    desc: 'A single neuron can only separate data with a straight line. Click to add points!',
  },
];

const NeuronsModule: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [inputs, setInputs] = useState([0.5, 0.3]);
  const [weights, setWeights] = useState([0.7, -0.4]);
  const [bias, setBias] = useState(0.1);
  const [points, setPoints] = useState<{x: number, y: number, label: number}[]>([]);

  const renderVisual = () => {
    switch (step) {
      case 0:
        return <BioNeuronVisual />;
      case 1:
        return <ArtificialNeuronVisual inputs={inputs} weights={weights} bias={bias} />;
      case 2:
        return (
          <WeightsVisual 
            inputs={inputs} 
            weights={weights} 
            setWeights={setWeights}
            bias={bias}
          />
        );
      case 3:
        return (
          <BiasVisual 
            inputs={inputs} 
            weights={weights} 
            bias={bias}
            setBias={setBias}
          />
        );
      case 4:
        return (
          <DecisionBoundaryVisual 
            weights={weights}
            bias={bias}
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
          { label: 'Neurons', path: '/learn/nn/neurons' },
        ]} 
      />

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 bg-gradient-to-r from-green-500/10 to-green-500/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <Circle size={20} className="text-green-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Neurons & Perceptrons</h2>
                  <p className="text-xs text-neutral-500">The fundamental building blocks</p>
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

// Biological neuron
const BioNeuronVisual: React.FC = () => (
  <div className="space-y-4">
    <div className="flex justify-center">
      <div className="relative bg-black/50 rounded-lg p-8" style={{ width: 320, height: 180 }}>
        {/* Dendrites */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 space-y-3">
          {['Signal A', 'Signal B', 'Signal C'].map((label, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
              <div className="w-12 h-0.5 bg-green-400/50" />
              <span className="text-[9px] text-neutral-500">{label}</span>
            </div>
          ))}
        </div>

        {/* Cell body */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500/30 to-purple-500/20 border-2 border-violet-400/50 flex items-center justify-center">
            <Zap size={24} className="text-violet-400" />
          </div>
          <div className="text-[9px] text-neutral-500 text-center mt-1">Cell Body</div>
        </div>

        {/* Axon */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <div className="w-16 h-1 bg-gradient-to-r from-violet-400/50 to-orange-400/50 rounded" />
          <div className="w-4 h-4 rounded-full bg-orange-400 animate-pulse" />
          <span className="text-[9px] text-neutral-500">Output</span>
        </div>
      </div>
    </div>

    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center text-sm">
      <p className="text-neutral-300">
        <span className="text-green-400">Dendrites</span> receive signals → 
        <span className="text-violet-400"> Soma</span> processes → 
        <span className="text-orange-400"> Axon</span> transmits
      </p>
      <p className="text-[10px] text-neutral-500 mt-2">
        If the combined signal exceeds a threshold, the neuron "fires"
      </p>
    </div>
  </div>
);

// Artificial neuron diagram
const ArtificialNeuronVisual: React.FC<{
  inputs: number[];
  weights: number[];
  bias: number;
}> = ({ inputs, weights, bias }) => {
  const weightedSum = inputs.reduce((sum, inp, i) => sum + inp * weights[i], 0) + bias;
  const output = 1 / (1 + Math.exp(-weightedSum)); // Sigmoid

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-6">
        {/* Inputs */}
        <div className="space-y-3">
          {inputs.map((inp, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center font-mono text-sm text-blue-300">
                {inp.toFixed(1)}
              </div>
              <div className="text-xs text-neutral-500">x{i + 1}</div>
              <div className="w-8 border-t border-dashed border-neutral-600" />
              <div className="text-[10px] text-green-400 font-mono">×{weights[i]}</div>
            </div>
          ))}
        </div>

        {/* Neuron */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500/30 to-purple-500/20 border-2 border-violet-400/50 flex flex-col items-center justify-center">
            <div className="text-[10px] text-neutral-500">Σ + b</div>
            <div className="font-mono text-sm text-violet-300">{weightedSum.toFixed(2)}</div>
          </div>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-neutral-500">
            σ(z)
          </div>
        </div>

        {/* Output */}
        <div className="flex items-center gap-2">
          <div className="w-8 border-t-2 border-orange-400" />
          <div className="w-12 h-12 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center font-mono text-orange-300">
            {output.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="bg-violet-500/10 border border-violet-500/20 rounded-lg p-3 text-center font-mono text-sm">
        output = σ(<span className="text-blue-300">{inputs[0]}×{weights[0]}</span> + 
        <span className="text-blue-300"> {inputs[1]}×{weights[1]}</span> + 
        <span className="text-green-300"> {bias}</span>) = 
        <span className="text-orange-400"> {output.toFixed(3)}</span>
      </div>
    </div>
  );
};

// Weights interactive
const WeightsVisual: React.FC<{
  inputs: number[];
  weights: number[];
  setWeights: (w: number[]) => void;
  bias: number;
}> = ({ inputs, weights, setWeights, bias }) => {
  const weightedSum = inputs.reduce((sum, inp, i) => sum + inp * weights[i], 0) + bias;
  const output = 1 / (1 + Math.exp(-weightedSum));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
        {weights.map((w, i) => (
          <div key={i} className="bg-black/30 rounded-lg p-3">
            <div className="flex justify-between text-xs text-neutral-500 mb-2">
              <span>Weight w{i + 1}</span>
              <span className={w >= 0 ? 'text-green-400' : 'text-red-400'}>{w.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="-2"
              max="2"
              step="0.1"
              value={w}
              onChange={(e) => {
                const newWeights = [...weights];
                newWeights[i] = parseFloat(e.target.value);
                setWeights(newWeights);
              }}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-neutral-600 mt-1">
              <span>-2</span>
              <span>0</span>
              <span>+2</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-8 text-sm">
        <div>
          <span className="text-neutral-500">Weighted sum: </span>
          <span className="text-violet-400 font-mono">{weightedSum.toFixed(3)}</span>
        </div>
        <div>
          <span className="text-neutral-500">Output: </span>
          <span className="text-orange-400 font-mono">{output.toFixed(3)}</span>
        </div>
      </div>

      {/* Output bar */}
      <div className="max-w-xs mx-auto">
        <div className="h-4 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-orange-400 to-orange-500 transition-all"
            style={{ width: `${output * 100}%` }}
          />
        </div>
      </div>

      <p className="text-[10px] text-neutral-500 text-center">
        Positive weights amplify, negative weights suppress
      </p>
    </div>
  );
};

// Bias visual
const BiasVisual: React.FC<{
  inputs: number[];
  weights: number[];
  bias: number;
  setBias: (b: number) => void;
}> = ({ inputs, weights, bias, setBias }) => {
  // Generate sigmoid curve
  const curvePoints = Array.from({ length: 50 }, (_, i) => {
    const x = -5 + i * 0.2;
    const y = 1 / (1 + Math.exp(-x));
    return { x, y };
  });

  const weightedSum = inputs.reduce((sum, inp, i) => sum + inp * weights[i], 0);
  const withBias = weightedSum + bias;
  const output = 1 / (1 + Math.exp(-withBias));

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="relative bg-black/50 rounded-lg" style={{ width: 280, height: 160 }}>
          <svg className="absolute inset-0" viewBox="0 0 280 160">
            {/* Axes */}
            <line x1="40" y1="130" x2="260" y2="130" stroke="white" strokeWidth="0.5" opacity="0.3" />
            <line x1="140" y1="20" x2="140" y2="140" stroke="white" strokeWidth="0.5" opacity="0.3" />

            {/* Sigmoid curve */}
            <path
              d={curvePoints.map((p, i) => 
                `${i === 0 ? 'M' : 'L'} ${140 + p.x * 20} ${130 - p.y * 100}`
              ).join(' ')}
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="2"
            />

            {/* Current point */}
            <circle
              cx={140 + withBias * 20}
              cy={130 - output * 100}
              r="6"
              fill="#f97316"
            />

            {/* Vertical line showing input */}
            <line
              x1={140 + withBias * 20}
              y1="130"
              x2={140 + withBias * 20}
              y2={130 - output * 100}
              stroke="#f97316"
              strokeWidth="1"
              strokeDasharray="4"
            />
          </svg>

          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] text-neutral-500">
            z (weighted sum + bias)
          </div>
        </div>
      </div>

      {/* Bias slider */}
      <div className="max-w-xs mx-auto bg-black/30 rounded-lg p-3">
        <div className="flex justify-between text-xs text-neutral-500 mb-2">
          <span>Bias</span>
          <span className={bias >= 0 ? 'text-green-400' : 'text-red-400'}>{bias.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min="-3"
          max="3"
          step="0.1"
          value={bias}
          onChange={(e) => setBias(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center text-sm">
        <p>Bias shifts the curve left/right, changing when the neuron activates</p>
      </div>
    </div>
  );
};

// Decision boundary
const DecisionBoundaryVisual: React.FC<{
  weights: number[];
  bias: number;
  points: { x: number; y: number; label: number }[];
  setPoints: (p: { x: number; y: number; label: number }[]) => void;
}> = ({ weights, bias, points, setPoints }) => {
  const addPoint = (e: React.MouseEvent<HTMLDivElement>, label: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1 - (e.clientY - rect.top) / rect.height;
    setPoints([...points, { x, y, label }]);
  };

  // Decision boundary: w1*x + w2*y + b = 0 → y = -(w1*x + b) / w2
  const getY = (x: number) => -(weights[0] * x + bias) / weights[1];

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div 
          className="relative bg-black/50 rounded-lg cursor-crosshair overflow-hidden"
          style={{ width: 250, height: 250 }}
          onClick={(e) => addPoint(e, e.shiftKey ? 0 : 1)}
        >
          {/* Decision boundary line */}
          {weights[1] !== 0 && (
            <div 
              className="absolute w-full h-0.5 bg-violet-500 origin-left"
              style={{
                left: 0,
                top: `${(1 - getY(0)) * 100}%`,
                width: '141%',
                transform: `rotate(${-Math.atan2(getY(1) - getY(0), 1) * 180 / Math.PI}deg)`,
              }}
            />
          )}

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

          {/* Grid */}
          <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 opacity-10">
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} className="border border-white" />
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => setPoints([])}
          className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs"
        >
          Clear Points
        </button>
      </div>

      <div className="text-center text-sm text-neutral-400">
        Click to add <span className="text-blue-400">blue</span> points, 
        Shift+Click for <span className="text-red-400">red</span> points
      </div>

      <p className="text-[10px] text-neutral-500 text-center">
        A single neuron creates a linear decision boundary
      </p>
    </div>
  );
};

export default NeuronsModule;
