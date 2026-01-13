/**
 * @fileoverview Interactive Probability & Statistics Module.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, StepNavigator } from '../../components/shared';
import { BarChart3, X } from 'lucide-react';

const STEPS = [
  {
    title: 'Probability Basics',
    desc: 'Probability measures how likely an event is to occur, from 0 (impossible) to 1 (certain).',
  },
  {
    title: 'Probability Distributions',
    desc: 'A distribution shows all possible values and their probabilities. Meet the Normal (Gaussian) distribution!',
  },
  {
    title: "Bayes' Theorem",
    desc: 'Update beliefs based on evidence. This is fundamental to machine learning and inference.',
  },
  {
    title: 'Mean, Variance & Standard Deviation',
    desc: 'Statistics that describe the center and spread of data. Essential for understanding model outputs.',
  },
  {
    title: 'Sampling & Estimation',
    desc: 'How we learn about populations from samples. The foundation of training neural networks.',
  },
];

const StatisticsModule: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [diceRolls, setDiceRolls] = useState<number[]>([]);
  const [prior, setPrior] = useState(0.5);
  const [evidence, setEvidence] = useState<'positive' | 'negative' | null>(null);

  const renderVisual = () => {
    switch (step) {
      case 0:
        return <ProbabilityBasicsVisual diceRolls={diceRolls} setDiceRolls={setDiceRolls} />;
      case 1:
        return <DistributionVisual />;
      case 2:
        return <BayesVisual prior={prior} setPrior={setPrior} evidence={evidence} setEvidence={setEvidence} />;
      case 3:
        return <StatisticsVisual />;
      case 4:
        return <SamplingVisual />;
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
          { label: 'Statistics', path: '/learn/math/statistics' },
        ]} 
      />

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-cyan-500/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <BarChart3 size={20} className="text-cyan-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Probability & Statistics</h2>
                  <p className="text-xs text-neutral-500">The math of uncertainty</p>
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

// Probability basics with dice
const ProbabilityBasicsVisual: React.FC<{
  diceRolls: number[];
  setDiceRolls: (rolls: number[]) => void;
}> = ({ diceRolls, setDiceRolls }) => {
  const rollDice = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceRolls([...diceRolls.slice(-19), roll]);
  };

  const counts = [1, 2, 3, 4, 5, 6].map(n => diceRolls.filter(r => r === n).length);
  const total = diceRolls.length || 1;

  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-4">
        <button
          onClick={rollDice}
          className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-medium transition-colors"
        >
          🎲 Roll Dice
        </button>
        <button
          onClick={() => setDiceRolls([])}
          className="px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Last roll */}
      {diceRolls.length > 0 && (
        <div className="text-center">
          <div className="text-4xl mb-2">
            {['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'][diceRolls[diceRolls.length - 1] - 1]}
          </div>
          <div className="text-sm text-neutral-400">Rolled: {diceRolls[diceRolls.length - 1]}</div>
        </div>
      )}

      {/* Frequency distribution */}
      <div className="flex justify-center gap-2 h-32 items-end">
        {[1, 2, 3, 4, 5, 6].map((n, i) => (
          <div key={n} className="flex flex-col items-center gap-1">
            <div className="text-[10px] text-cyan-400">{((counts[i] / total) * 100).toFixed(0)}%</div>
            <div 
              className="w-8 bg-cyan-500/50 rounded-t transition-all"
              style={{ height: `${(counts[i] / total) * 100}px` }}
            />
            <div className="text-xs text-neutral-500">{n}</div>
          </div>
        ))}
      </div>

      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3 text-center text-sm">
        <p>P(any number) = 1/6 ≈ <span className="text-cyan-400">16.67%</span></p>
        <p className="text-[10px] text-neutral-500 mt-1">
          Roll more to see the distribution approach equal probability!
        </p>
      </div>
    </div>
  );
};

// Normal distribution
const DistributionVisual: React.FC = () => {
  const [mean, setMean] = useState(0);
  const [std, setStd] = useState(1);

  // Generate normal curve points
  const points = Array.from({ length: 100 }, (_, i) => {
    const x = -4 + i * 0.08;
    const y = (1 / (std * Math.sqrt(2 * Math.PI))) * 
              Math.exp(-0.5 * Math.pow((x - mean) / std, 2));
    return { x, y };
  });

  const maxY = Math.max(...points.map(p => p.y));

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="relative bg-black/50 rounded-lg" style={{ width: 300, height: 180 }}>
          <svg className="absolute inset-0" viewBox="0 0 300 180">
            {/* X-axis */}
            <line x1="20" y1="150" x2="280" y2="150" stroke="white" strokeWidth="0.5" opacity="0.3" />
            
            {/* Curve */}
            <path
              d={points.map((p, i) => 
                `${i === 0 ? 'M' : 'L'} ${20 + (p.x + 4) * 32.5} ${150 - (p.y / maxY) * 120}`
              ).join(' ')}
              fill="none"
              stroke="#06b6d4"
              strokeWidth="2"
            />
            
            {/* Fill under curve */}
            <path
              d={`M 20 150 ` + points.map(p => 
                `L ${20 + (p.x + 4) * 32.5} ${150 - (p.y / maxY) * 120}`
              ).join(' ') + ` L 280 150 Z`}
              fill="url(#gradient)"
              opacity="0.3"
            />
            
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Mean line */}
            <line 
              x1={20 + (mean + 4) * 32.5} 
              y1="30" 
              x2={20 + (mean + 4) * 32.5} 
              y2="150"
              stroke="#f97316"
              strokeWidth="2"
              strokeDasharray="4"
            />
          </svg>
          
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] text-neutral-500">
            μ = {mean.toFixed(1)}, σ = {std.toFixed(1)}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
        <div>
          <div className="flex justify-between text-xs text-neutral-500 mb-1">
            <span>Mean (μ)</span>
            <span>{mean.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="-2"
            max="2"
            step="0.1"
            value={mean}
            onChange={(e) => setMean(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <div className="flex justify-between text-xs text-neutral-500 mb-1">
            <span>Std Dev (σ)</span>
            <span>{std.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={std}
            onChange={(e) => setStd(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3 text-center text-sm">
        <p className="font-mono text-xs mb-1">N(μ, σ²) - The Normal Distribution</p>
        <p className="text-[10px] text-neutral-500">
          68% of data falls within 1σ, 95% within 2σ, 99.7% within 3σ
        </p>
      </div>
    </div>
  );
};

// Bayes theorem
const BayesVisual: React.FC<{
  prior: number;
  setPrior: (p: number) => void;
  evidence: 'positive' | 'negative' | null;
  setEvidence: (e: 'positive' | 'negative' | null) => void;
}> = ({ prior, setPrior, evidence, setEvidence }) => {
  // Medical test example: disease prevalence, test sensitivity/specificity
  const sensitivity = 0.95; // True positive rate
  const specificity = 0.90; // True negative rate

  // Calculate posterior using Bayes
  let posterior = prior;
  if (evidence === 'positive') {
    // P(disease|positive) = P(positive|disease)*P(disease) / P(positive)
    const pPositive = sensitivity * prior + (1 - specificity) * (1 - prior);
    posterior = (sensitivity * prior) / pPositive;
  } else if (evidence === 'negative') {
    // P(disease|negative) = P(negative|disease)*P(disease) / P(negative)
    const pNegative = (1 - sensitivity) * prior + specificity * (1 - prior);
    posterior = ((1 - sensitivity) * prior) / pNegative;
  }

  return (
    <div className="space-y-4">
      <div className="text-center text-sm text-neutral-400 mb-4">
        Medical Test Example: Does the patient have the disease?
      </div>

      {/* Prior */}
      <div className="max-w-xs mx-auto">
        <div className="flex justify-between text-xs text-neutral-500 mb-1">
          <span>Prior Probability (disease prevalence)</span>
          <span>{(prior * 100).toFixed(0)}%</span>
        </div>
        <input
          type="range"
          min="0.01"
          max="0.5"
          step="0.01"
          value={prior}
          onChange={(e) => { setPrior(parseFloat(e.target.value)); setEvidence(null); }}
          className="w-full"
        />
      </div>

      {/* Evidence buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setEvidence('positive')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            evidence === 'positive' 
              ? 'bg-red-500 text-white' 
              : 'bg-white/10 hover:bg-white/20'
          }`}
        >
          Test Positive ➕
        </button>
        <button
          onClick={() => setEvidence('negative')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            evidence === 'negative' 
              ? 'bg-green-500 text-white' 
              : 'bg-white/10 hover:bg-white/20'
          }`}
        >
          Test Negative ➖
        </button>
      </div>

      {/* Visualization */}
      <div className="flex justify-center gap-8">
        <div className="text-center">
          <div className="text-xs text-neutral-500 mb-2">Prior</div>
          <div className="w-20 h-20 rounded-full border-4 border-blue-500 flex items-center justify-center">
            <span className="text-lg font-bold text-blue-400">{(prior * 100).toFixed(0)}%</span>
          </div>
        </div>
        
        {evidence && (
          <>
            <div className="flex items-center text-2xl text-neutral-600">→</div>
            <div className="text-center">
              <div className="text-xs text-neutral-500 mb-2">Posterior</div>
              <div className={`w-20 h-20 rounded-full border-4 flex items-center justify-center ${
                posterior > prior ? 'border-red-500' : 'border-green-500'
              }`}>
                <span className={`text-lg font-bold ${
                  posterior > prior ? 'text-red-400' : 'text-green-400'
                }`}>
                  {(posterior * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3 text-center">
        <div className="font-mono text-xs mb-2">
          P(A|B) = P(B|A) × P(A) / P(B)
        </div>
        <p className="text-[10px] text-neutral-500">
          {evidence === 'positive' 
            ? "A positive test significantly increases the probability!"
            : evidence === 'negative'
            ? "A negative test significantly decreases the probability!"
            : "Click a test result to update the probability"}
        </p>
      </div>
    </div>
  );
};

// Mean, variance, std dev
const StatisticsVisual: React.FC = () => {
  const [data, setData] = useState([2, 4, 4, 4, 5, 5, 7, 9]);
  
  const mean = data.reduce((a, b) => a + b, 0) / data.length;
  const variance = data.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / data.length;
  const std = Math.sqrt(variance);

  const addRandom = () => {
    setData([...data, Math.floor(Math.random() * 10) + 1]);
  };

  return (
    <div className="space-y-4">
      {/* Data points */}
      <div className="flex flex-wrap justify-center gap-2">
        {data.map((val, i) => (
          <div 
            key={i}
            className="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center font-mono text-cyan-300"
          >
            {val}
          </div>
        ))}
        <button
          onClick={addRandom}
          className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-xl transition-colors"
        >
          +
        </button>
      </div>

      {/* Number line visualization */}
      <div className="flex justify-center">
        <div className="relative bg-black/50 rounded-lg p-4" style={{ width: 280, height: 80 }}>
          {/* Line */}
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-white/20" />
          
          {/* Mean marker */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-1 h-8 bg-orange-500"
            style={{ left: `${4 + (mean / 10) * 272}px` }}
          />
          
          {/* Std dev range */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 h-4 bg-cyan-500/30 rounded"
            style={{ 
              left: `${Math.max(4, 4 + ((mean - std) / 10) * 272)}px`,
              width: `${(2 * std / 10) * 272}px`
            }}
          />
          
          {/* Data points */}
          {data.map((val, i) => (
            <div
              key={i}
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400"
              style={{ left: `${4 + (val / 10) * 272}px` }}
            />
          ))}
          
          <div className="absolute bottom-1 left-0 right-0 flex justify-between text-[10px] text-neutral-500 px-4">
            <span>0</span>
            <span>5</span>
            <span>10</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 text-center">
          <div className="text-xs text-orange-400 mb-1">Mean (μ)</div>
          <div className="font-mono text-lg text-orange-300">{mean.toFixed(2)}</div>
        </div>
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 text-center">
          <div className="text-xs text-purple-400 mb-1">Variance (σ²)</div>
          <div className="font-mono text-lg text-purple-300">{variance.toFixed(2)}</div>
        </div>
        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3 text-center">
          <div className="text-xs text-cyan-400 mb-1">Std Dev (σ)</div>
          <div className="font-mono text-lg text-cyan-300">{std.toFixed(2)}</div>
        </div>
      </div>

      <p className="text-[10px] text-neutral-500 text-center">
        Mean = average, Variance = average squared distance from mean, Std Dev = √Variance
      </p>
    </div>
  );
};

// Sampling
const SamplingVisual: React.FC = () => {
  const population = Array.from({ length: 100 }, () => Math.random() * 10);
  const [sampleSize, setSampleSize] = useState(10);
  const [samples, setSamples] = useState<number[]>([]);

  const takeSample = () => {
    const newSample = Array.from({ length: sampleSize }, () => 
      population[Math.floor(Math.random() * population.length)]
    );
    setSamples(newSample);
  };

  const popMean = population.reduce((a, b) => a + b, 0) / population.length;
  const sampleMean = samples.length > 0 
    ? samples.reduce((a, b) => a + b, 0) / samples.length 
    : 0;

  return (
    <div className="space-y-4">
      <div className="text-center text-sm text-neutral-400 mb-2">
        Population of 100 values (true mean: {popMean.toFixed(2)})
      </div>

      {/* Population visualization */}
      <div className="flex justify-center">
        <div className="relative bg-black/50 rounded-lg p-2" style={{ width: 280, height: 60 }}>
          {population.map((val, i) => (
            <div
              key={i}
              className={`absolute w-1.5 h-1.5 rounded-full transition-colors ${
                samples.includes(val) ? 'bg-cyan-400' : 'bg-white/20'
              }`}
              style={{ 
                left: `${(i % 20) * 14 + 4}px`,
                top: `${Math.floor(i / 20) * 12 + 4}px`
              }}
            />
          ))}
        </div>
      </div>

      {/* Sample size control */}
      <div className="max-w-xs mx-auto">
        <div className="flex justify-between text-xs text-neutral-500 mb-1">
          <span>Sample Size</span>
          <span>{sampleSize}</span>
        </div>
        <input
          type="range"
          min="5"
          max="50"
          value={sampleSize}
          onChange={(e) => setSampleSize(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="flex justify-center">
        <button
          onClick={takeSample}
          className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-medium transition-colors"
        >
          Take Random Sample
        </button>
      </div>

      {/* Results */}
      {samples.length > 0 && (
        <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <div className="text-xs text-neutral-500 mb-1">Population Mean</div>
            <div className="font-mono text-lg text-neutral-300">{popMean.toFixed(2)}</div>
          </div>
          <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3 text-center">
            <div className="text-xs text-cyan-400 mb-1">Sample Mean</div>
            <div className="font-mono text-lg text-cyan-300">{sampleMean.toFixed(2)}</div>
          </div>
        </div>
      )}

      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3 text-center text-sm">
        <p>Larger samples give estimates closer to the true population mean!</p>
        <p className="text-[10px] text-neutral-500 mt-1">
          This is the Law of Large Numbers - the basis for training neural networks
        </p>
      </div>
    </div>
  );
};

export default StatisticsModule;
