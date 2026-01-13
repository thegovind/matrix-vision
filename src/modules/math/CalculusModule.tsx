/**
 * @fileoverview Interactive Calculus Demo - Derivatives, Gradients, Chain Rule.
 */

import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, StepNavigator, InteractiveCanvas } from '../../components/shared';
import { TrendingUp, ArrowRight, X } from 'lucide-react';

const STEPS = [
  {
    title: 'What is a Derivative?',
    desc: 'A derivative measures how fast something changes. Move the slider to see the slope at any point!',
  },
  {
    title: 'Gradients in 2D',
    desc: 'For functions with multiple inputs, the gradient shows the direction of steepest increase.',
  },
  {
    title: 'The Chain Rule',
    desc: 'When functions are composed, we multiply their derivatives. This is essential for backpropagation!',
  },
  {
    title: 'Partial Derivatives',
    desc: 'With multiple variables, we take derivatives with respect to each one separately.',
  },
  {
    title: 'Gradient Descent',
    desc: 'To minimize a function, we move in the opposite direction of the gradient. This is how neural networks learn!',
  },
];

const CalculusModule: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [xValue, setXValue] = useState(0);
  const [learningRate, setLearningRate] = useState(0.1);
  const [gdX, setGdX] = useState(3);

  // f(x) = x^2
  const f = (x: number) => x * x;
  // f'(x) = 2x
  const fPrime = (x: number) => 2 * x;

  // Gradient descent step
  const stepGD = () => {
    setGdX(prev => prev - learningRate * fPrime(prev));
  };

  const renderVisual = () => {
    switch (step) {
      case 0:
        return <DerivativeVisual xValue={xValue} setXValue={setXValue} />;
      case 1:
        return <GradientVisual />;
      case 2:
        return <ChainRuleVisual />;
      case 3:
        return <PartialDerivativeVisual />;
      case 4:
        return (
          <GradientDescentVisual 
            gdX={gdX} 
            stepGD={stepGD} 
            learningRate={learningRate} 
            setLearningRate={setLearningRate}
            reset={() => setGdX(3)}
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
          { label: 'Math', path: '/curriculum#math' },
          { label: 'Calculus', path: '/learn/math/calculus' },
        ]} 
      />

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden">
          {/* Module header */}
          <div className="px-6 py-4 border-b border-white/10 bg-gradient-to-r from-orange-500/10 to-orange-500/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <TrendingUp size={20} className="text-orange-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Calculus Fundamentals</h2>
                  <p className="text-xs text-neutral-500">Derivatives, gradients, and the chain rule</p>
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

// Derivative visualization
const DerivativeVisual: React.FC<{
  xValue: number;
  setXValue: (x: number) => void;
}> = ({ xValue, setXValue }) => {
  const f = (x: number) => x * x;
  const fPrime = (x: number) => 2 * x;
  const slope = fPrime(xValue);
  const yValue = f(xValue);

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="relative bg-black/50 rounded-lg p-4" style={{ width: 300, height: 200 }}>
          {/* Y-axis */}
          <div className="absolute left-8 top-2 bottom-8 w-px bg-white/20" />
          {/* X-axis */}
          <div className="absolute left-8 right-2 bottom-8 h-px bg-white/20" />
          
          {/* Curve f(x) = x² */}
          <svg className="absolute inset-0" viewBox="0 0 300 200" preserveAspectRatio="none">
            <path
              d={`M ${30 + (-3 + 3) * 40} ${160 - 9 * 15} ` + 
                 Array.from({ length: 61 }, (_, i) => {
                   const x = -3 + i * 0.1;
                   const y = x * x;
                   return `L ${30 + (x + 3) * 40} ${160 - y * 15}`;
                 }).join(' ')}
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="2"
            />
            {/* Tangent line at xValue */}
            <line
              x1={30 + (xValue - 1 + 3) * 40}
              y1={160 - (yValue - slope) * 15}
              x2={30 + (xValue + 1 + 3) * 40}
              y2={160 - (yValue + slope) * 15}
              stroke="#f97316"
              strokeWidth="2"
            />
            {/* Point on curve */}
            <circle
              cx={30 + (xValue + 3) * 40}
              cy={160 - yValue * 15}
              r="6"
              fill="#f97316"
            />
          </svg>
          
          <div className="absolute left-2 top-2 text-[10px] text-neutral-500">y</div>
          <div className="absolute right-2 bottom-2 text-[10px] text-neutral-500">x</div>
        </div>
      </div>

      {/* Slider */}
      <div className="max-w-xs mx-auto">
        <input
          type="range"
          min="-2.5"
          max="2.5"
          step="0.1"
          value={xValue}
          onChange={(e) => setXValue(parseFloat(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-neutral-500 mt-1">
          <span>-2.5</span>
          <span>0</span>
          <span>2.5</span>
        </div>
      </div>

      {/* Info */}
      <div className="bg-violet-500/10 border border-violet-500/20 rounded-lg p-4 text-center">
        <div className="font-mono text-sm mb-2">
          f(x) = x² → f'(x) = 2x
        </div>
        <div className="flex justify-center gap-8 text-sm">
          <div>
            <span className="text-neutral-500">x = </span>
            <span className="text-violet-400">{xValue.toFixed(1)}</span>
          </div>
          <div>
            <span className="text-neutral-500">f(x) = </span>
            <span className="text-violet-400">{yValue.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-neutral-500">slope = </span>
            <span className="text-orange-400">{slope.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Gradient visualization
const GradientVisual: React.FC = () => {
  const [point, setPoint] = useState({ x: 1, y: 1 });

  // f(x,y) = x² + y²
  // ∇f = (2x, 2y)
  const gradient = { x: 2 * point.x, y: 2 * point.y };
  const magnitude = Math.sqrt(gradient.x ** 2 + gradient.y ** 2);

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div 
          className="relative bg-black/50 rounded-lg cursor-crosshair"
          style={{ width: 250, height: 250 }}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 4;
            const y = -((e.clientY - rect.top) / rect.height - 0.5) * 4;
            setPoint({ x, y });
          }}
        >
          {/* Grid */}
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="border border-white/5" />
            ))}
          </div>

          {/* Axes */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20" />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-white/20" />

          {/* Point */}
          <div 
            className="absolute w-3 h-3 bg-violet-500 rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{ 
              left: `${(point.x / 4 + 0.5) * 100}%`,
              top: `${(-point.y / 4 + 0.5) * 100}%`,
            }}
          />

          {/* Gradient arrow */}
          {magnitude > 0 && (
            <svg className="absolute inset-0 pointer-events-none" viewBox="0 0 250 250">
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#f97316" />
                </marker>
              </defs>
              <line
                x1={125 + point.x * 250 / 4}
                y1={125 - point.y * 250 / 4}
                x2={125 + (point.x + gradient.x * 0.3) * 250 / 4}
                y2={125 - (point.y + gradient.y * 0.3) * 250 / 4}
                stroke="#f97316"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
            </svg>
          )}
        </div>
      </div>

      <div className="bg-violet-500/10 border border-violet-500/20 rounded-lg p-4 text-center">
        <div className="font-mono text-sm mb-3">
          f(x,y) = x² + y² → ∇f = (2x, 2y)
        </div>
        <div className="flex justify-center gap-6 text-xs">
          <div>
            <span className="text-neutral-500">Point: </span>
            <span className="text-violet-400">({point.x.toFixed(1)}, {point.y.toFixed(1)})</span>
          </div>
          <div>
            <span className="text-neutral-500">Gradient: </span>
            <span className="text-orange-400">({gradient.x.toFixed(1)}, {gradient.y.toFixed(1)})</span>
          </div>
        </div>
        <p className="text-[10px] text-neutral-500 mt-2">Click anywhere to move the point</p>
      </div>
    </div>
  );
};

// Chain rule visualization
const ChainRuleVisual: React.FC = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-center gap-4">
      <div className="text-center p-4 bg-white/5 rounded-xl">
        <div className="text-2xl mb-2">x</div>
        <div className="text-xs text-neutral-500">Input</div>
      </div>
      <ArrowRight className="text-neutral-600" />
      <div className="text-center p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
        <div className="text-2xl mb-2">g(x)</div>
        <div className="text-xs text-blue-400">Inner function</div>
        <div className="text-[10px] text-neutral-500 mt-1">g(x) = x²</div>
      </div>
      <ArrowRight className="text-neutral-600" />
      <div className="text-center p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
        <div className="text-2xl mb-2">f(g)</div>
        <div className="text-xs text-green-400">Outer function</div>
        <div className="text-[10px] text-neutral-500 mt-1">f(g) = sin(g)</div>
      </div>
      <ArrowRight className="text-neutral-600" />
      <div className="text-center p-4 bg-violet-500/10 border border-violet-500/20 rounded-xl">
        <div className="text-2xl mb-2">y</div>
        <div className="text-xs text-violet-400">Output</div>
      </div>
    </div>

    <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 text-center">
      <div className="text-sm text-orange-300 mb-2">The Chain Rule</div>
      <div className="font-mono text-lg">
        <span className="text-violet-400">dy/dx</span> = 
        <span className="text-green-400"> df/dg</span> × 
        <span className="text-blue-400"> dg/dx</span>
      </div>
      <div className="font-mono text-sm text-neutral-400 mt-2">
        = cos(x²) × 2x
      </div>
    </div>

    <div className="text-center text-xs text-neutral-500">
      This is exactly how backpropagation works - derivatives flow backwards through the chain!
    </div>
  </div>
);

// Partial derivative visualization
const PartialDerivativeVisual: React.FC = () => (
  <div className="space-y-4">
    <div className="bg-black/50 rounded-lg p-6 text-center">
      <div className="font-mono text-lg mb-4">
        f(x, y) = x²y + 3xy²
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="text-xs text-blue-400 mb-2">∂f/∂x (hold y constant)</div>
          <div className="font-mono">2xy + 3y²</div>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <div className="text-xs text-green-400 mb-2">∂f/∂y (hold x constant)</div>
          <div className="font-mono">x² + 6xy</div>
        </div>
      </div>
    </div>

    <div className="bg-violet-500/10 border border-violet-500/20 rounded-lg p-4 text-center">
      <div className="font-mono text-sm">
        ∇f = (∂f/∂x, ∂f/∂y) = (<span className="text-blue-400">2xy + 3y²</span>, <span className="text-green-400">x² + 6xy</span>)
      </div>
      <p className="text-[10px] text-neutral-500 mt-2">
        The gradient is a vector of all partial derivatives
      </p>
    </div>
  </div>
);

// Gradient descent visualization
const GradientDescentVisual: React.FC<{
  gdX: number;
  stepGD: () => void;
  learningRate: number;
  setLearningRate: (lr: number) => void;
  reset: () => void;
}> = ({ gdX, stepGD, learningRate, setLearningRate, reset }) => {
  const f = (x: number) => x * x;
  const yValue = f(gdX);
  const gradient = 2 * gdX;

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="relative bg-black/50 rounded-lg p-4" style={{ width: 300, height: 180 }}>
          {/* Curve */}
          <svg className="absolute inset-0" viewBox="0 0 300 180">
            <path
              d={`M ${30} ${160 - 9 * 15} ` + 
                 Array.from({ length: 61 }, (_, i) => {
                   const x = -3 + i * 0.1;
                   const y = x * x;
                   return `L ${30 + (x + 3) * 40} ${160 - y * 15}`;
                 }).join(' ')}
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="2"
            />
            {/* Current position */}
            <circle
              cx={30 + (gdX + 3) * 40}
              cy={160 - yValue * 15}
              r="8"
              fill="#f97316"
            />
            {/* Gradient arrow (pointing left = towards minimum) */}
            <line
              x1={30 + (gdX + 3) * 40}
              y1={160 - yValue * 15}
              x2={30 + (gdX - Math.sign(gradient) * 0.5 + 3) * 40}
              y2={160 - yValue * 15}
              stroke="#22c55e"
              strokeWidth="2"
              markerEnd="url(#arrow)"
            />
          </svg>
          
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] text-neutral-500">
            Minimum at x=0
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        <button
          onClick={stepGD}
          className="px-4 py-2 bg-violet-500 hover:bg-violet-600 rounded-lg text-sm font-medium transition-colors"
        >
          Step Down Gradient
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Learning rate */}
      <div className="max-w-xs mx-auto">
        <div className="flex justify-between text-xs text-neutral-500 mb-1">
          <span>Learning Rate</span>
          <span>{learningRate}</span>
        </div>
        <input
          type="range"
          min="0.05"
          max="0.5"
          step="0.05"
          value={learningRate}
          onChange={(e) => setLearningRate(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Info */}
      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center text-sm">
        <div className="flex justify-center gap-6">
          <span>x = <span className="text-orange-400">{gdX.toFixed(3)}</span></span>
          <span>f(x) = <span className="text-violet-400">{yValue.toFixed(4)}</span></span>
          <span>∇f = <span className="text-green-400">{gradient.toFixed(3)}</span></span>
        </div>
        <div className="text-[10px] text-neutral-500 mt-1">
          x_new = x - α × ∇f = {gdX.toFixed(3)} - {learningRate} × {gradient.toFixed(3)}
        </div>
      </div>
    </div>
  );
};

export default CalculusModule;
