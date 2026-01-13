/**
 * @fileoverview Interactive Self-Attention Module.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, StepNavigator } from '../../components/shared';
import { Scan, X } from 'lucide-react';

const STEPS = [
  {
    title: 'Why Attention?',
    desc: 'Different words relate to each other differently. Attention lets the model focus on relevant parts.',
  },
  {
    title: 'Query, Key, Value',
    desc: 'Each token becomes three vectors: Query (what I\'m looking for), Key (what I contain), Value (what I offer).',
  },
  {
    title: 'Attention Scores',
    desc: 'Query and Key dot products measure relevance. Higher score = more attention!',
  },
  {
    title: 'Weighted Sum',
    desc: 'Attention weights sum to 1 (softmax). The output is a weighted average of Values.',
  },
  {
    title: 'Interactive Attention',
    desc: 'See attention in action! Click on words to see what they attend to.',
  },
];

const SelfAttentionModule: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const renderVisual = () => {
    switch (step) {
      case 0:
        return <WhyAttentionVisual />;
      case 1:
        return <QKVVisual />;
      case 2:
        return <AttentionScoresVisual />;
      case 3:
        return <WeightedSumVisual />;
      case 4:
        return <InteractiveAttentionVisual />;
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
          { label: 'Self-Attention', path: '/learn/transformers/self-attention' },
        ]} 
      />

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-cyan-500/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <Scan size={20} className="text-cyan-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Self-Attention Mechanism</h2>
                  <p className="text-xs text-neutral-500">The core of Transformers</p>
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
  const sentence = ['The', 'cat', 'sat', 'on', 'the', 'mat', 'because', 'it', 'was', 'tired'];
  const [highlightedWord, setHighlightedWord] = useState<number | null>(7); // "it"

  // "it" should attend to "cat"
  const attentionWeights = highlightedWord === 7 
    ? [0.05, 0.6, 0.05, 0.02, 0.02, 0.1, 0.05, 0.01, 0.05, 0.05]
    : Array(10).fill(0.1);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-center gap-2">
        {sentence.map((word, i) => (
          <button
            key={i}
            onClick={() => setHighlightedWord(i)}
            className={`px-3 py-2 rounded-lg transition-all ${
              i === highlightedWord 
                ? 'bg-cyan-500 text-white scale-110' 
                : 'bg-white/5 hover:bg-white/10'
            }`}
            style={{
              opacity: highlightedWord !== null ? Math.max(0.3, attentionWeights[i]) : 1,
              boxShadow: attentionWeights[i] > 0.3 ? `0 0 ${attentionWeights[i] * 20}px rgba(34, 211, 238, ${attentionWeights[i]})` : 'none'
            }}
          >
            {word}
          </button>
        ))}
      </div>

      {highlightedWord === 7 && (
        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4 text-center">
          <p className="text-sm mb-2">
            <span className="text-cyan-400">"it"</span> attends most strongly to <span className="text-cyan-400">"cat"</span>
          </p>
          <p className="text-[10px] text-neutral-400">
            The model learned that "it" refers to "cat" by computing attention scores!
          </p>
        </div>
      )}

      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 text-center">
        <p className="text-xs text-neutral-300">
          Click on different words to see what they might attend to.
          <br />
          <span className="text-purple-400">Attention solves the reference problem!</span>
        </p>
      </div>
    </div>
  );
};

// QKV explanation
const QKVVisual: React.FC = () => {
  const [activeVector, setActiveVector] = useState<'Q' | 'K' | 'V' | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-6">
        {/* Token */}
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center mb-2">
            <span className="font-medium">cat</span>
          </div>
          <div className="text-[10px] text-neutral-500">Token</div>
        </div>

        <div className="flex items-center text-neutral-600 text-2xl">→</div>

        {/* QKV vectors */}
        <div className="flex gap-3">
          {[
            { label: 'Q', name: 'Query', color: 'red', desc: 'What am I looking for?' },
            { label: 'K', name: 'Key', color: 'green', desc: 'What do I contain?' },
            { label: 'V', name: 'Value', color: 'blue', desc: 'What can I offer?' },
          ].map(({ label, name, color, desc }) => (
            <button
              key={label}
              onClick={() => setActiveVector(activeVector === label as 'Q' | 'K' | 'V' ? null : label as 'Q' | 'K' | 'V')}
              className={`text-center transition-all ${activeVector === label ? 'scale-110' : ''}`}
            >
              <div 
                className={`w-12 h-16 rounded-lg border-2 flex flex-col items-center justify-center mb-1 ${
                  color === 'red' ? 'bg-red-500/20 border-red-500/50' :
                  color === 'green' ? 'bg-green-500/20 border-green-500/50' :
                  'bg-blue-500/20 border-blue-500/50'
                } ${activeVector === label ? 'ring-2 ring-white' : ''}`}
              >
                <span className={`font-bold text-lg ${
                  color === 'red' ? 'text-red-400' :
                  color === 'green' ? 'text-green-400' :
                  'text-blue-400'
                }`}>{label}</span>
                <div className="flex flex-col gap-0.5">
                  {[0.1, 0.7, -0.3].map((v, i) => (
                    <div key={i} className="w-8 h-0.5 bg-white/20 rounded" />
                  ))}
                </div>
              </div>
              <div className={`text-[10px] ${
                color === 'red' ? 'text-red-400' :
                color === 'green' ? 'text-green-400' :
                'text-blue-400'
              }`}>{name}</div>
            </button>
          ))}
        </div>
      </div>

      {activeVector && (
        <div className={`rounded-lg p-4 text-center ${
          activeVector === 'Q' ? 'bg-red-500/10 border border-red-500/20' :
          activeVector === 'K' ? 'bg-green-500/10 border border-green-500/20' :
          'bg-blue-500/10 border border-blue-500/20'
        }`}>
          <p className="text-sm">
            {activeVector === 'Q' && '"Query: What information am I looking for?" - Used to probe other tokens'}
            {activeVector === 'K' && '"Key: What information do I have?" - Used to be probed by other tokens'}
            {activeVector === 'V' && '"Value: What information can I contribute?" - Aggregated based on attention'}
          </p>
        </div>
      )}

      <div className="bg-white/5 rounded-lg p-3">
        <div className="font-mono text-xs text-center text-neutral-400">
          Q = X @ W<sub>Q</sub> &nbsp; K = X @ W<sub>K</sub> &nbsp; V = X @ W<sub>V</sub>
        </div>
      </div>
    </div>
  );
};

// Attention scores
const AttentionScoresVisual: React.FC = () => {
  const tokens = ['The', 'cat', 'sat'];
  const scores = [
    [0.9, 0.05, 0.05],
    [0.1, 0.7, 0.2],
    [0.2, 0.3, 0.5],
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="relative">
          {/* Column headers (Keys) */}
          <div className="flex gap-2 mb-2 ml-16">
            {tokens.map((t, i) => (
              <div key={i} className="w-12 text-center text-[10px] text-green-400">K: {t}</div>
            ))}
          </div>

          <div className="flex items-start">
            {/* Row headers (Queries) */}
            <div className="flex flex-col gap-2 mr-2">
              {tokens.map((t, i) => (
                <div key={i} className="h-12 flex items-center text-[10px] text-red-400">Q: {t}</div>
              ))}
            </div>

            {/* Score matrix */}
            <div className="grid grid-cols-3 gap-2">
              {scores.flat().map((score, i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-xs font-mono transition-all hover:scale-110"
                  style={{
                    backgroundColor: `rgba(34, 211, 238, ${score * 0.5})`,
                    border: `1px solid rgba(34, 211, 238, ${score})`,
                  }}
                >
                  {score.toFixed(2)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3 text-center">
        <div className="font-mono text-sm mb-2">
          Attention(Q, K) = softmax(Q · K<sup>T</sup> / √d<sub>k</sub>)
        </div>
        <p className="text-[10px] text-neutral-400">
          Each row shows how much that token attends to every other token.
          <br />
          Rows sum to 1 after softmax!
        </p>
      </div>
    </div>
  );
};

// Weighted sum
const WeightedSumVisual: React.FC = () => {
  const weights = [0.1, 0.7, 0.2];
  const values = [
    [0.2, -0.1, 0.5],
    [0.8, 0.3, -0.2],
    [-0.1, 0.6, 0.4],
  ];
  
  // Weighted average
  const output = values[0].map((_, i) => 
    weights.reduce((sum, w, j) => sum + w * values[j][i], 0)
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-4">
        {/* Weights */}
        <div className="text-center">
          <div className="text-[10px] text-neutral-500 mb-2">Attention Weights</div>
          <div className="flex flex-col gap-1">
            {weights.map((w, i) => (
              <div key={i} className="flex items-center gap-2">
                <div 
                  className="w-16 h-6 rounded bg-cyan-500/30 border border-cyan-500/50 flex items-center justify-center text-xs font-mono"
                  style={{ opacity: 0.3 + w * 0.7 }}
                >
                  {w.toFixed(1)}
                </div>
                <span className="text-neutral-600 text-xs">×</span>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="text-center">
          <div className="text-[10px] text-neutral-500 mb-2">Value Vectors</div>
          <div className="flex flex-col gap-1">
            {values.map((v, i) => (
              <div key={i} className="flex gap-1">
                {v.map((val, j) => (
                  <div 
                    key={j}
                    className="w-10 h-6 rounded bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-[10px] font-mono"
                    style={{ opacity: 0.3 + weights[i] * 0.7 }}
                  >
                    {val.toFixed(1)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <span className="text-neutral-600 text-xl">=</span>

        {/* Output */}
        <div className="text-center">
          <div className="text-[10px] text-neutral-500 mb-2">Output</div>
          <div className="flex gap-1">
            {output.map((val, i) => (
              <div 
                key={i}
                className="w-12 h-16 rounded-lg bg-purple-500/30 border border-purple-500/50 flex items-center justify-center font-mono text-sm text-purple-300"
              >
                {val.toFixed(2)}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 text-center">
        <div className="font-mono text-sm mb-1">
          Output = Σ (attention<sub>i</sub> × value<sub>i</sub>)
        </div>
        <p className="text-[10px] text-neutral-400">
          = (0.1 × V<sub>1</sub>) + (0.7 × V<sub>2</sub>) + (0.2 × V<sub>3</sub>)
        </p>
      </div>
    </div>
  );
};

// Interactive attention
const InteractiveAttentionVisual: React.FC = () => {
  const sentence = ['I', 'love', 'coding', 'because', 'it', 'is', 'fun'];
  const [selectedToken, setSelectedToken] = useState<number | null>(null);

  // Simulated attention patterns
  const attentionPatterns: { [key: number]: number[] } = {
    0: [0.5, 0.2, 0.15, 0.05, 0.03, 0.04, 0.03],
    1: [0.15, 0.3, 0.4, 0.05, 0.03, 0.04, 0.03],
    2: [0.1, 0.3, 0.4, 0.05, 0.05, 0.05, 0.05],
    3: [0.1, 0.1, 0.2, 0.3, 0.1, 0.1, 0.1],
    4: [0.1, 0.15, 0.5, 0.1, 0.05, 0.05, 0.05], // "it" -> "coding"
    5: [0.1, 0.1, 0.25, 0.1, 0.2, 0.15, 0.1],
    6: [0.1, 0.1, 0.15, 0.1, 0.1, 0.15, 0.3],
  };

  const weights = selectedToken !== null ? attentionPatterns[selectedToken] : Array(7).fill(1/7);

  return (
    <div className="space-y-4">
      <div className="text-center text-sm text-neutral-400 mb-2">
        Click on a word to see its attention pattern
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {sentence.map((word, i) => {
          const weight = weights[i];
          const isSelected = selectedToken === i;
          
          return (
            <button
              key={i}
              onClick={() => setSelectedToken(selectedToken === i ? null : i)}
              className={`relative px-4 py-3 rounded-xl transition-all ${
                isSelected 
                  ? 'bg-cyan-500 text-white ring-2 ring-cyan-300 scale-110' 
                  : 'bg-white/5 hover:bg-white/10'
              }`}
              style={{
                opacity: selectedToken !== null ? Math.max(0.4, weight) : 1,
              }}
            >
              {word}
              {selectedToken !== null && !isSelected && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-mono text-cyan-400">
                  {(weight * 100).toFixed(0)}%
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Attention heatmap */}
      {selectedToken !== null && (
        <div className="flex justify-center">
          <div className="h-3 flex gap-1 items-end">
            {weights.map((w, i) => (
              <div
                key={i}
                className="w-8 rounded-t transition-all"
                style={{
                  height: `${w * 60}px`,
                  backgroundColor: i === selectedToken ? '#22d3ee' : `rgba(34, 211, 238, ${w})`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3 text-center">
        {selectedToken === 4 ? (
          <p className="text-sm">
            <span className="text-cyan-400">"it"</span> attends most to <span className="text-cyan-400">"coding"</span>!
            <br />
            <span className="text-[10px] text-neutral-400">The model learned the reference automatically.</span>
          </p>
        ) : (
          <p className="text-[10px] text-neutral-400">
            Click <span className="text-cyan-400">"it"</span> to see how the model resolves references!
          </p>
        )}
      </div>
    </div>
  );
};

export default SelfAttentionModule;
