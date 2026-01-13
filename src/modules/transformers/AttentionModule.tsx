/**
 * @fileoverview Interactive Attention Mechanism Module.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, StepNavigator } from '../../components/shared';
import { Eye, ArrowRight, X } from 'lucide-react';

const STEPS = [
  {
    title: 'Why Attention?',
    desc: 'When processing a sequence, not all elements are equally important. Attention learns what to focus on.',
  },
  {
    title: 'Query, Key, Value',
    desc: 'The core ingredients: Query asks "what am I looking for?", Keys answer "what do I have?", Values are "what to retrieve".',
  },
  {
    title: 'Computing Attention Scores',
    desc: 'We compare each Query to all Keys using dot product. Higher score = more relevant!',
  },
  {
    title: 'Softmax: Making Weights',
    desc: 'Softmax converts scores to probabilities that sum to 1. Click cells to see the calculation!',
  },
  {
    title: 'Weighted Sum of Values',
    desc: 'The output is a weighted combination of Values, where weights come from attention scores.',
  },
  {
    title: 'Self-Attention in Action',
    desc: 'Watch how words attend to other words in a sentence. This is the magic of transformers!',
  },
];

const AttentionModule: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedToken, setSelectedToken] = useState(0);
  const [hoveredCell, setHoveredCell] = useState<[number, number] | null>(null);

  const renderVisual = () => {
    switch (step) {
      case 0:
        return <WhyAttentionVisual />;
      case 1:
        return <QKVVisual />;
      case 2:
        return <AttentionScoresVisual selectedToken={selectedToken} setSelectedToken={setSelectedToken} />;
      case 3:
        return <SoftmaxVisual hoveredCell={hoveredCell} setHoveredCell={setHoveredCell} />;
      case 4:
        return <WeightedSumVisual />;
      case 5:
        return <SelfAttentionVisual selectedToken={selectedToken} setSelectedToken={setSelectedToken} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header 
        showBreadcrumb 
        breadcrumb={[
          { label: 'Transformers', path: '/curriculum#transformers' },
          { label: 'Attention', path: '/learn/transformers/attention' },
        ]} 
      />

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 bg-gradient-to-r from-amber-500/10 to-amber-500/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <Eye size={20} className="text-amber-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Attention Mechanism</h2>
                  <p className="text-xs text-neutral-500">Learning what to focus on</p>
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

// Why attention
const WhyAttentionVisual: React.FC = () => {
  const words = ['The', 'cat', 'sat', 'on', 'the', 'mat'];
  const [hovered, setHovered] = useState<number | null>(null);

  // Simulated attention weights when hovering on "cat"
  const attentionToWords: Record<number, number[]> = {
    1: [0.1, 0.3, 0.25, 0.05, 0.1, 0.2], // cat attends to...
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center gap-2">
        {words.map((word, i) => {
          const weight = hovered !== null ? (attentionToWords[hovered]?.[i] || 0.1) : 0.16;
          return (
            <button
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="px-3 py-2 rounded-lg transition-all"
              style={{
                backgroundColor: `rgba(251, 191, 36, ${weight})`,
                border: hovered === i ? '2px solid #fbbf24' : '2px solid transparent',
              }}
            >
              <span className="text-sm">{word}</span>
            </button>
          );
        })}
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 text-center">
        <p className="text-sm text-neutral-300 mb-2">
          When processing "<span className="text-amber-400">cat</span>", the model learns to attend more to 
          related words like "<span className="text-amber-400">sat</span>" and "<span className="text-amber-400">mat</span>".
        </p>
        <p className="text-[10px] text-neutral-500">
          Hover over words to see attention patterns
        </p>
      </div>
    </div>
  );
};

// QKV explanation
const QKVVisual: React.FC = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-center gap-6">
      <div className="text-center p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl w-24">
        <div className="text-2xl mb-2">Q</div>
        <div className="text-xs text-blue-400">Query</div>
        <div className="text-[9px] text-neutral-500 mt-1">"What am I looking for?"</div>
      </div>
      <div className="text-center p-4 bg-green-500/10 border border-green-500/20 rounded-xl w-24">
        <div className="text-2xl mb-2">K</div>
        <div className="text-xs text-green-400">Key</div>
        <div className="text-[9px] text-neutral-500 mt-1">"What do I contain?"</div>
      </div>
      <div className="text-center p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl w-24">
        <div className="text-2xl mb-2">V</div>
        <div className="text-xs text-purple-400">Value</div>
        <div className="text-[9px] text-neutral-500 mt-1">"What to output?"</div>
      </div>
    </div>

    <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 max-w-md mx-auto">
      <p className="text-sm text-center text-neutral-300">
        Each token is projected into three vectors:
      </p>
      <div className="font-mono text-sm text-center mt-2">
        <span className="text-blue-400">Q = x·W_q</span>
        {' | '}
        <span className="text-green-400">K = x·W_k</span>
        {' | '}
        <span className="text-purple-400">V = x·W_v</span>
      </div>
    </div>
  </div>
);

// Attention scores computation
const AttentionScoresVisual: React.FC<{
  selectedToken: number;
  setSelectedToken: (t: number) => void;
}> = ({ selectedToken, setSelectedToken }) => {
  const tokens = ['I', 'love', 'AI'];
  
  // Simulated query and key vectors
  const queries = [[1, 0.5], [0.8, 1.2], [0.3, 0.9]];
  const keys = [[0.9, 0.4], [1.1, 1.0], [0.4, 1.1]];
  
  // Compute dot products
  const dotProduct = (a: number[], b: number[]) => 
    a.reduce((sum, val, i) => sum + val * b[i], 0);
  
  const scores = keys.map(k => dotProduct(queries[selectedToken], k));

  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-2 mb-4">
        {tokens.map((token, i) => (
          <button
            key={i}
            onClick={() => setSelectedToken(i)}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedToken === i
                ? 'bg-blue-500 text-white'
                : 'bg-white/10 text-neutral-400 hover:bg-white/20'
            }`}
          >
            {token}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4">
        {/* Query vector */}
        <div className="text-center">
          <div className="text-xs text-blue-400 mb-2">Query (Q)</div>
          <div className="bg-blue-500/20 rounded-lg p-2">
            <div className="font-mono text-xs">
              [{queries[selectedToken].map(v => v.toFixed(1)).join(', ')}]
            </div>
          </div>
        </div>

        <span className="text-neutral-500">·</span>

        {/* Key vectors */}
        <div className="text-center">
          <div className="text-xs text-green-400 mb-2">Keys (K)</div>
          <div className="space-y-1">
            {keys.map((k, i) => (
              <div 
                key={i}
                className="bg-green-500/20 rounded-lg p-2 flex items-center gap-2"
              >
                <span className="text-[10px] text-neutral-500">{tokens[i]}</span>
                <span className="font-mono text-xs">[{k.map(v => v.toFixed(1)).join(', ')}]</span>
              </div>
            ))}
          </div>
        </div>

        <span className="text-neutral-500">=</span>

        {/* Scores */}
        <div className="text-center">
          <div className="text-xs text-amber-400 mb-2">Scores</div>
          <div className="space-y-1">
            {scores.map((s, i) => (
              <div key={i} className="bg-amber-500/20 rounded-lg p-2 font-mono text-xs text-amber-300">
                {s.toFixed(2)}
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-[10px] text-neutral-500 text-center">
        Score = Q · K (dot product measures similarity)
      </p>
    </div>
  );
};

// Softmax visualization
const SoftmaxVisual: React.FC<{
  hoveredCell: [number, number] | null;
  setHoveredCell: (c: [number, number] | null) => void;
}> = ({ hoveredCell, setHoveredCell }) => {
  const scores = [2.1, 1.8, 0.9];
  const scaledScores = scores.map(s => s / Math.sqrt(2)); // Scaled by sqrt(d_k)
  const expScores = scaledScores.map(s => Math.exp(s));
  const sumExp = expScores.reduce((a, b) => a + b, 0);
  const softmax = expScores.map(e => e / sumExp);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-6 text-sm">
        {/* Raw scores */}
        <div className="text-center">
          <div className="text-xs text-neutral-500 mb-2">Scores</div>
          {scores.map((s, i) => (
            <div key={i} className="font-mono text-neutral-300 h-8 flex items-center justify-center">
              {s.toFixed(1)}
            </div>
          ))}
        </div>

        <ArrowRight className="text-neutral-600" />

        {/* Scaled */}
        <div className="text-center">
          <div className="text-xs text-neutral-500 mb-2">÷√d_k</div>
          {scaledScores.map((s, i) => (
            <div key={i} className="font-mono text-neutral-400 h-8 flex items-center justify-center">
              {s.toFixed(2)}
            </div>
          ))}
        </div>

        <ArrowRight className="text-neutral-600" />

        {/* Exp */}
        <div className="text-center">
          <div className="text-xs text-neutral-500 mb-2">exp()</div>
          {expScores.map((e, i) => (
            <div key={i} className="font-mono text-blue-300 h-8 flex items-center justify-center">
              {e.toFixed(2)}
            </div>
          ))}
        </div>

        <ArrowRight className="text-neutral-600" />

        {/* Softmax */}
        <div className="text-center">
          <div className="text-xs text-neutral-500 mb-2">Softmax</div>
          {softmax.map((s, i) => (
            <div 
              key={i} 
              className="h-8 flex items-center justify-center"
            >
              <div 
                className="rounded px-2 py-1 font-mono text-amber-300"
                style={{ backgroundColor: `rgba(251, 191, 36, ${s})` }}
              >
                {(s * 100).toFixed(0)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-center">
        <div className="font-mono text-sm mb-1">
          softmax(z)_i = e^z_i / Σ e^z_j
        </div>
        <p className="text-[10px] text-neutral-500">
          Converts scores to probabilities that sum to 1
        </p>
      </div>
    </div>
  );
};

// Weighted sum
const WeightedSumVisual: React.FC = () => {
  const weights = [0.5, 0.35, 0.15];
  const values = [[1.0, 0.2], [0.5, 0.8], [0.3, 0.1]];
  const tokens = ['I', 'love', 'AI'];
  
  // Weighted sum
  const output = values[0].map((_, d) => 
    values.reduce((sum, v, i) => sum + weights[i] * v[d], 0)
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-4">
        {/* Weights */}
        <div className="text-center">
          <div className="text-xs text-amber-400 mb-2">Weights</div>
          {weights.map((w, i) => (
            <div key={i} className="flex items-center gap-2 mb-1">
              <span className="text-[10px] text-neutral-500 w-8">{tokens[i]}</span>
              <div 
                className="w-12 h-5 rounded text-[10px] font-mono flex items-center justify-center text-amber-300"
                style={{ backgroundColor: `rgba(251, 191, 36, ${w})` }}
              >
                {w.toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <span className="text-neutral-500">×</span>

        {/* Values */}
        <div className="text-center">
          <div className="text-xs text-purple-400 mb-2">Values (V)</div>
          {values.map((v, i) => (
            <div key={i} className="bg-purple-500/20 rounded px-2 py-1 mb-1 font-mono text-[10px] text-purple-300">
              [{v.map(x => x.toFixed(1)).join(', ')}]
            </div>
          ))}
        </div>

        <span className="text-neutral-500">=</span>

        {/* Output */}
        <div className="text-center">
          <div className="text-xs text-green-400 mb-2">Output</div>
          <div className="bg-green-500/20 rounded-lg p-3 font-mono text-sm text-green-300">
            [{output.map(x => x.toFixed(2)).join(', ')}]
          </div>
        </div>
      </div>

      <div className="bg-violet-500/10 border border-violet-500/20 rounded-lg p-3 text-center font-mono text-sm">
        Output = Σ (weight_i × value_i)
      </div>
    </div>
  );
};

// Self-attention interactive
const SelfAttentionVisual: React.FC<{
  selectedToken: number;
  setSelectedToken: (t: number) => void;
}> = ({ selectedToken, setSelectedToken }) => {
  const sentence = ['The', 'robot', 'picked', 'up', 'the', 'red', 'ball'];
  
  // Simulated attention patterns
  const attentionPatterns: Record<number, number[]> = {
    0: [0.4, 0.1, 0.1, 0.05, 0.2, 0.05, 0.1],
    1: [0.1, 0.3, 0.2, 0.05, 0.05, 0.15, 0.15],
    2: [0.05, 0.25, 0.2, 0.15, 0.05, 0.1, 0.2],
    3: [0.1, 0.1, 0.25, 0.15, 0.1, 0.1, 0.2],
    4: [0.3, 0.05, 0.05, 0.05, 0.35, 0.1, 0.1],
    5: [0.05, 0.1, 0.05, 0.05, 0.1, 0.25, 0.4],
    6: [0.05, 0.15, 0.15, 0.1, 0.1, 0.25, 0.2],
  };

  const weights = attentionPatterns[selectedToken] || attentionPatterns[0];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-center gap-2">
        {sentence.map((word, i) => (
          <button
            key={i}
            onClick={() => setSelectedToken(i)}
            className={`px-3 py-2 rounded-lg text-sm transition-all ${
              selectedToken === i
                ? 'bg-amber-500 text-black font-medium'
                : 'bg-white/5'
            }`}
            style={{
              backgroundColor: selectedToken !== i 
                ? `rgba(251, 191, 36, ${weights[i]})` 
                : undefined,
            }}
          >
            {word}
          </button>
        ))}
      </div>

      {/* Attention bars */}
      <div className="max-w-sm mx-auto space-y-1">
        {sentence.map((word, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-[10px] text-neutral-500 w-12 text-right">{word}</span>
            <div className="flex-1 h-4 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all"
                style={{ width: `${weights[i] * 100}%` }}
              />
            </div>
            <span className="text-[10px] text-amber-400 font-mono w-10">
              {(weights[i] * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>

      <p className="text-[10px] text-neutral-500 text-center">
        Click a word to see what it attends to. This is self-attention!
      </p>
    </div>
  );
};

export default AttentionModule;
