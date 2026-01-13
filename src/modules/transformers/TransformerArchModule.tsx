/**
 * @fileoverview Interactive Transformer Architecture Module.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, StepNavigator } from '../../components/shared';
import { Boxes, X, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    title: 'The Big Picture',
    desc: 'Transformers revolutionized AI. They\'re behind GPT, BERT, and modern vision models.',
  },
  {
    title: 'Multi-Head Attention',
    desc: 'Instead of one attention pattern, use multiple "heads" that attend to different things!',
  },
  {
    title: 'Feed-Forward Network',
    desc: 'After attention, each token goes through a small MLP independently.',
  },
  {
    title: 'Layer Normalization & Residuals',
    desc: 'Training deep transformers requires normalization and skip connections.',
  },
  {
    title: 'Encoder vs Decoder',
    desc: 'Different architectures for different tasks. Some models use both!',
  },
];

const TransformerArchModule: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const renderVisual = () => {
    switch (step) {
      case 0:
        return <BigPictureVisual />;
      case 1:
        return <MultiHeadVisual />;
      case 2:
        return <FFNVisual />;
      case 3:
        return <NormResidualVisual />;
      case 4:
        return <EncoderDecoderVisual />;
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
          { label: 'Architecture', path: '/learn/transformers/architecture' },
        ]} 
      />

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 bg-gradient-to-r from-teal-500/10 to-teal-500/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center">
                  <Boxes size={20} className="text-teal-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Transformer Architecture</h2>
                  <p className="text-xs text-neutral-500">Components of modern AI</p>
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

// Big picture
const BigPictureVisual: React.FC = () => {
  const models = [
    { name: 'GPT-4', type: 'Decoder', task: 'Text Generation', color: 'green' },
    { name: 'BERT', type: 'Encoder', task: 'Understanding', color: 'blue' },
    { name: 'T5', type: 'Enc-Dec', task: 'Translation', color: 'purple' },
    { name: 'ViT', type: 'Encoder', task: 'Image Classification', color: 'orange' },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
        {models.map((model) => (
          <div 
            key={model.name}
            className={`p-3 rounded-xl border ${
              model.color === 'green' ? 'bg-green-500/10 border-green-500/20' :
              model.color === 'blue' ? 'bg-blue-500/10 border-blue-500/20' :
              model.color === 'purple' ? 'bg-purple-500/10 border-purple-500/20' :
              'bg-orange-500/10 border-orange-500/20'
            }`}
          >
            <div className={`font-bold ${
              model.color === 'green' ? 'text-green-400' :
              model.color === 'blue' ? 'text-blue-400' :
              model.color === 'purple' ? 'text-purple-400' :
              'text-orange-400'
            }`}>{model.name}</div>
            <div className="text-[10px] text-neutral-400">{model.type}</div>
            <div className="text-[10px] text-neutral-500">{model.task}</div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <div className="bg-white/5 rounded-xl p-4 max-w-xs">
          <div className="text-center text-sm mb-3">Transformer Block</div>
          <div className="flex flex-col gap-2">
            <div className="bg-cyan-500/20 border border-cyan-500/30 rounded-lg px-4 py-2 text-center text-xs text-cyan-300">
              Multi-Head Attention
            </div>
            <div className="text-center text-neutral-500 text-xs">+</div>
            <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg px-4 py-2 text-center text-xs text-purple-300">
              Feed-Forward Network
            </div>
            <div className="text-center text-neutral-500 text-xs">+</div>
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg px-4 py-2 text-center text-xs text-green-300">
              LayerNorm & Residuals
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-[10px] text-neutral-500">
        All these famous models use the same building blocks!
      </div>
    </div>
  );
};

// Multi-head attention
const MultiHeadVisual: React.FC = () => {
  const [activeHead, setActiveHead] = useState<number | null>(null);
  
  const heads = [
    { pattern: 'Syntax', desc: 'Subject-verb agreement', color: '#ef4444' },
    { pattern: 'Position', desc: 'Previous/next tokens', color: '#f59e0b' },
    { pattern: 'Semantic', desc: 'Related concepts', color: '#22c55e' },
    { pattern: 'Reference', desc: 'Pronouns to nouns', color: '#3b82f6' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-4">
        {heads.map((head, i) => (
          <button
            key={i}
            onClick={() => setActiveHead(activeHead === i ? null : i)}
            className={`text-center transition-all ${activeHead === i ? 'scale-110' : ''}`}
          >
            <div 
              className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center mb-1 transition-all ${
                activeHead === i ? 'ring-2 ring-white' : ''
              }`}
              style={{ 
                backgroundColor: `${head.color}20`,
                borderColor: `${head.color}50`,
              }}
            >
              <span className="text-xs" style={{ color: head.color }}>H{i + 1}</span>
            </div>
            <div className="text-[9px] text-neutral-400">{head.pattern}</div>
          </button>
        ))}
      </div>

      {/* Attention matrix for selected head */}
      <div className="flex justify-center">
        <div className="bg-black/50 rounded-lg p-4">
          <div className="text-[10px] text-neutral-500 mb-2 text-center">
            {activeHead !== null ? `Head ${activeHead + 1}: ${heads[activeHead].desc}` : 'Click a head to see its pattern'}
          </div>
          <div className="grid grid-cols-4 gap-1">
            {Array.from({ length: 16 }).map((_, i) => {
              let opacity = 0.1;
              if (activeHead !== null) {
                const row = Math.floor(i / 4);
                const col = i % 4;
                // Different patterns for different heads
                if (activeHead === 0) opacity = row === col ? 0.8 : 0.1; // diagonal
                if (activeHead === 1) opacity = col === row - 1 ? 0.8 : 0.1; // previous
                if (activeHead === 2) opacity = Math.abs(row - col) <= 1 ? 0.4 : 0.1; // nearby
                if (activeHead === 3) opacity = col === 0 ? 0.5 : 0.1; // first token
              }
              return (
                <div
                  key={i}
                  className="w-8 h-8 rounded"
                  style={{
                    backgroundColor: activeHead !== null 
                      ? `${heads[activeHead].color}` 
                      : '#ffffff',
                    opacity,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3 text-center">
        <p className="text-sm">
          <span className="text-cyan-400">Multi-head</span> = Multiple attention patterns in parallel
        </p>
        <p className="text-[10px] text-neutral-400 mt-1">
          Each head can learn to focus on different relationships!
        </p>
      </div>
    </div>
  );
};

// Feed-forward network
const FFNVisual: React.FC = () => {
  const [inputVals] = useState([0.3, -0.5, 0.8, 0.2]);
  const expansion = 4;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-4">
        {/* Input */}
        <div className="text-center">
          <div className="text-[10px] text-neutral-500 mb-2">d_model</div>
          <div className="flex flex-col gap-1">
            {inputVals.map((v, i) => (
              <div key={i} className="w-8 h-6 rounded bg-blue-500/30 border border-blue-500/50 flex items-center justify-center text-[9px] font-mono">
                {v.toFixed(1)}
              </div>
            ))}
          </div>
          <div className="text-[9px] text-blue-400 mt-1">{inputVals.length}</div>
        </div>

        <ArrowRight className="text-neutral-600" size={16} />

        {/* Expanded */}
        <div className="text-center">
          <div className="text-[10px] text-neutral-500 mb-2">d_ff (4×)</div>
          <div className="flex flex-col gap-0.5">
            {Array.from({ length: inputVals.length * expansion }).map((_, i) => (
              <div key={i} className="w-6 h-2 rounded bg-purple-500/40 border border-purple-500/50" />
            ))}
          </div>
          <div className="text-[9px] text-purple-400 mt-1">{inputVals.length * expansion}</div>
        </div>

        <div className="text-center">
          <div className="text-[10px] text-green-400 mb-1">ReLU/GELU</div>
          <div className="text-2xl text-green-400">∿</div>
        </div>

        <ArrowRight className="text-neutral-600" size={16} />

        {/* Output */}
        <div className="text-center">
          <div className="text-[10px] text-neutral-500 mb-2">d_model</div>
          <div className="flex flex-col gap-1">
            {inputVals.map((_, i) => (
              <div key={i} className="w-8 h-6 rounded bg-green-500/30 border border-green-500/50 flex items-center justify-center text-[9px] font-mono">
                ?
              </div>
            ))}
          </div>
          <div className="text-[9px] text-green-400 mt-1">{inputVals.length}</div>
        </div>
      </div>

      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 text-center">
        <div className="font-mono text-sm mb-1">
          FFN(x) = W₂ · ReLU(W₁ · x + b₁) + b₂
        </div>
        <p className="text-[10px] text-neutral-400">
          Expand to 4× dimension, apply nonlinearity, project back down.
          <br />
          Applied to each token independently!
        </p>
      </div>

      <div className="bg-white/5 rounded-lg p-2 text-center text-[10px] text-neutral-400">
        In GPT-3: d_model = 12288, d_ff = 49152 (4×)
      </div>
    </div>
  );
};

// Layer norm and residuals
const NormResidualVisual: React.FC = () => (
  <div className="space-y-4">
    <div className="flex justify-center">
      <div className="relative" style={{ width: 200, height: 240 }}>
        {/* Input */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-8 rounded bg-blue-500/30 border border-blue-500/50 flex items-center justify-center text-xs">
          Input
        </div>

        {/* LayerNorm */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-24 h-8 rounded bg-green-500/20 border border-green-500/40 flex items-center justify-center text-[10px] text-green-400">
          LayerNorm
        </div>

        {/* Attention */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-20 h-10 rounded bg-cyan-500/30 border border-cyan-500/50 flex items-center justify-center text-xs text-cyan-300">
          Attention
        </div>

        {/* Residual connection 1 */}
        <svg className="absolute inset-0" viewBox="0 0 200 240">
          <path 
            d="M 100 40 L 100 48 L 40 48 L 40 140 L 100 140" 
            fill="none" 
            stroke="#f59e0b" 
            strokeWidth="2"
            strokeDasharray="4"
          />
          <circle cx="100" cy="140" r="6" fill="#f59e0b" />
          <text x="42" y="95" fill="#f59e0b" fontSize="10">+</text>
        </svg>

        {/* LayerNorm 2 */}
        <div className="absolute top-[144px] left-1/2 -translate-x-1/2 w-24 h-8 rounded bg-green-500/20 border border-green-500/40 flex items-center justify-center text-[10px] text-green-400">
          LayerNorm
        </div>

        {/* FFN */}
        <div className="absolute top-[184px] left-1/2 -translate-x-1/2 w-16 h-10 rounded bg-purple-500/30 border border-purple-500/50 flex items-center justify-center text-xs text-purple-300">
          FFN
        </div>

        {/* Output */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-8 rounded bg-blue-500/30 border border-blue-500/50 flex items-center justify-center text-xs">
          Output
        </div>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
        <div className="text-sm font-medium text-green-400 mb-1">LayerNorm</div>
        <p className="text-[10px] text-neutral-400">
          Normalizes each token independently. Mean=0, Var=1.
          Stabilizes training of deep networks.
        </p>
      </div>
      <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
        <div className="text-sm font-medium text-orange-400 mb-1">Residuals</div>
        <p className="text-[10px] text-neutral-400">
          Skip connections add input to output.
          Allows gradients to flow directly through.
        </p>
      </div>
    </div>
  </div>
);

// Encoder vs Decoder
const EncoderDecoderVisual: React.FC = () => {
  const [activeArch, setActiveArch] = useState<'encoder' | 'decoder' | 'both'>('encoder');

  return (
    <div className="space-y-4">
      {/* Architecture selector */}
      <div className="flex justify-center gap-2">
        {(['encoder', 'decoder', 'both'] as const).map((arch) => (
          <button
            key={arch}
            onClick={() => setActiveArch(arch)}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeArch === arch 
                ? 'bg-teal-500 text-white' 
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            {arch.charAt(0).toUpperCase() + arch.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-8">
        {/* Encoder */}
        {(activeArch === 'encoder' || activeArch === 'both') && (
          <div className="text-center">
            <div className="text-sm font-medium text-blue-400 mb-2">Encoder</div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3 w-32">
              <div className="bg-blue-500/20 rounded p-2 mb-2 text-[10px]">
                Full Attention
              </div>
              <div className="bg-blue-500/20 rounded p-2 text-[10px]">
                Bidirectional
              </div>
              <div className="mt-2 text-[9px] text-neutral-400">
                See all tokens
              </div>
            </div>
            <div className="text-[10px] text-blue-400 mt-2">
              BERT, ViT
            </div>
          </div>
        )}

        {activeArch === 'both' && (
          <div className="flex items-center text-neutral-600">→</div>
        )}

        {/* Decoder */}
        {(activeArch === 'decoder' || activeArch === 'both') && (
          <div className="text-center">
            <div className="text-sm font-medium text-green-400 mb-2">Decoder</div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3 w-32">
              <div className="bg-green-500/20 rounded p-2 mb-2 text-[10px]">
                Masked Attention
              </div>
              <div className="bg-green-500/20 rounded p-2 text-[10px]">
                Autoregressive
              </div>
              <div className="mt-2 text-[9px] text-neutral-400">
                Can't see future
              </div>
            </div>
            <div className="text-[10px] text-green-400 mt-2">
              GPT, LLaMA
            </div>
          </div>
        )}
      </div>

      {/* Masking visualization */}
      <div className="flex justify-center">
        <div className="bg-black/50 rounded-lg p-3">
          <div className="text-[10px] text-neutral-500 mb-2 text-center">
            Attention Mask
          </div>
          <div className="grid grid-cols-4 gap-0.5">
            {Array.from({ length: 16 }).map((_, i) => {
              const row = Math.floor(i / 4);
              const col = i % 4;
              const isAllowed = activeArch === 'encoder' ? true : col <= row;
              return (
                <div
                  key={i}
                  className={`w-6 h-6 rounded ${
                    isAllowed 
                      ? activeArch === 'encoder' ? 'bg-blue-500/50' : 'bg-green-500/50'
                      : 'bg-red-500/20'
                  }`}
                >
                  {!isAllowed && <span className="flex items-center justify-center h-full text-[10px] text-red-400">✗</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-3 text-center text-[10px] text-neutral-400">
        <span className="text-blue-400">Encoders</span> understand context. 
        <span className="text-green-400 ml-2">Decoders</span> generate sequences.
        <br />
        <span className="text-purple-400">Encoder-Decoder</span> models (T5, Whisper) do both!
      </div>
    </div>
  );
};

export default TransformerArchModule;
