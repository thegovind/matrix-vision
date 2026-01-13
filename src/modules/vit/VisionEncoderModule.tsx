/**
 * @fileoverview Interactive Vision Encoder Module.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, StepNavigator } from '../../components/shared';
import { Eye, X, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    title: 'From Patches to Understanding',
    desc: 'The vision encoder transforms patched images into rich visual representations.',
  },
  {
    title: 'CLS Token',
    desc: 'A special learnable token that aggregates information from all patches.',
  },
  {
    title: 'Transformer Layers',
    desc: 'Stack of self-attention + FFN blocks that process the patch sequence.',
  },
  {
    title: 'Output Representations',
    desc: 'The final layer produces embeddings ready for classification or other tasks.',
  },
  {
    title: 'Full Pipeline Demo',
    desc: 'See the complete ViT pipeline from image to prediction!',
  },
];

const VisionEncoderModule: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const renderVisual = () => {
    switch (step) {
      case 0:
        return <PatchesToUnderstandingVisual />;
      case 1:
        return <CLSTokenVisual />;
      case 2:
        return <TransformerLayersVisual />;
      case 3:
        return <OutputRepresentationsVisual />;
      case 4:
        return <FullPipelineVisual />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header 
        showBreadcrumb 
        breadcrumb={[
          { label: 'Vision Transformer', path: '/curriculum#vit' },
          { label: 'Vision Encoder', path: '/learn/vit/encoder' },
        ]} 
      />

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 bg-gradient-to-r from-violet-500/10 to-violet-500/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
                  <Eye size={20} className="text-violet-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Vision Encoder</h2>
                  <p className="text-xs text-neutral-500">Understanding images with transformers</p>
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

// Patches to understanding
const PatchesToUnderstandingVisual: React.FC = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-center gap-4">
      {/* Input patches */}
      <div className="text-center">
        <div className="text-[10px] text-neutral-500 mb-2">Image Patches</div>
        <div className="grid grid-cols-3 gap-1">
          {Array.from({ length: 9 }).map((_, i) => (
            <div 
              key={i}
              className="w-8 h-8 rounded bg-amber-500/20 border border-amber-500/30"
            />
          ))}
        </div>
        <div className="text-[10px] text-amber-400 mt-1">Low-level pixels</div>
      </div>

      <ArrowRight className="text-neutral-600" />

      {/* Vision Encoder */}
      <div className="text-center">
        <div className="text-[10px] text-neutral-500 mb-2">Vision Encoder</div>
        <div className="w-24 h-24 rounded-xl bg-violet-500/20 border-2 border-violet-500/40 flex flex-col items-center justify-center">
          <div className="text-xs text-violet-400 mb-1">ViT</div>
          <div className="text-[9px] text-neutral-500">12 layers</div>
          <div className="text-[9px] text-neutral-500">768 dim</div>
        </div>
      </div>

      <ArrowRight className="text-neutral-600" />

      {/* Output representations */}
      <div className="text-center">
        <div className="text-[10px] text-neutral-500 mb-2">Representations</div>
        <div className="flex flex-col gap-1">
          {['cat', 'fur', 'eyes', 'ears', 'face'].map((concept, i) => (
            <div 
              key={i}
              className="px-3 py-1 rounded bg-green-500/20 border border-green-500/30 text-[10px] text-green-400"
            >
              {concept}
            </div>
          ))}
        </div>
        <div className="text-[10px] text-green-400 mt-1">High-level concepts</div>
      </div>
    </div>

    <div className="bg-violet-500/10 border border-violet-500/20 rounded-lg p-4 text-center">
      <p className="text-sm">
        The <span className="text-violet-400">Vision Encoder</span> transforms raw pixels into 
        <span className="text-green-400"> semantic representations</span>.
      </p>
      <p className="text-[10px] text-neutral-400 mt-2">
        Each layer builds more abstract features from the previous layer.
      </p>
    </div>
  </div>
);

// CLS token
const CLSTokenVisual: React.FC = () => {
  const [layerIndex, setLayerIndex] = useState(0);
  const layers = ['Input', 'Layer 4', 'Layer 8', 'Layer 12'];

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="flex items-center gap-2">
          {/* CLS token */}
          <div className="text-center">
            <div 
              className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                layerIndex === 0 
                  ? 'bg-blue-500/30 border-2 border-blue-500'
                  : 'bg-blue-500 border-2 border-blue-300'
              }`}
            >
              CLS
            </div>
          </div>

          {/* Patch tokens */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div 
              key={i}
              className={`w-10 h-10 rounded-lg flex items-center justify-center text-[10px] transition-all ${
                layerIndex === 0 
                  ? 'bg-amber-500/30 border border-amber-500/50'
                  : 'bg-amber-500/20 border border-amber-500/30'
              }`}
            >
              P{i + 1}
            </div>
          ))}
          <div className="text-neutral-500 text-xs">...</div>
        </div>
      </div>

      {/* Attention visualization */}
      {layerIndex > 0 && (
        <div className="flex justify-center">
          <div className="text-center">
            <svg width="280" height="40" className="overflow-visible">
              {/* Lines from CLS to patches */}
              {Array.from({ length: 5 }).map((_, i) => (
                <line
                  key={i}
                  x1="25"
                  y1="20"
                  x2={75 + i * 45}
                  y2="20"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  opacity={0.3 + (layerIndex / 4) * 0.5 - i * 0.1}
                />
              ))}
            </svg>
            <div className="text-[10px] text-blue-400">
              CLS attends to all patches
            </div>
          </div>
        </div>
      )}

      {/* Layer slider */}
      <div className="max-w-xs mx-auto">
        <div className="flex justify-between text-xs text-neutral-500 mb-1">
          <span>Layer Depth</span>
          <span>{layers[layerIndex]}</span>
        </div>
        <input
          type="range"
          min="0"
          max="3"
          step="1"
          value={layerIndex}
          onChange={(e) => setLayerIndex(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-center">
        <p className="text-sm mb-2">
          <span className="text-blue-400">[CLS]</span> = Classification Token
        </p>
        <p className="text-[10px] text-neutral-400">
          {layerIndex === 0 
            ? 'At input: Just a learnable embedding, no image info yet.'
            : layerIndex < 3
            ? `After layer ${layerIndex * 4}: Starting to aggregate patch information.`
            : 'Final layer: Contains summary of entire image. Used for classification!'
          }
        </p>
      </div>
    </div>
  );
};

// Transformer layers
const TransformerLayersVisual: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const numLayers = 6;

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="flex flex-col gap-2">
          {Array.from({ length: numLayers }).map((_, i) => (
            <div 
              key={i}
              className={`flex items-center gap-2 p-2 rounded-lg transition-all cursor-pointer ${
                activeLayer === i ? 'bg-white/10 scale-105' : 'hover:bg-white/5'
              }`}
              onClick={() => setActiveLayer(activeLayer === i ? null : i)}
            >
              <div className="w-6 h-6 rounded bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-[10px] text-cyan-400">
                {i + 1}
              </div>
              <div className="flex gap-1">
                <div className="px-2 py-1 rounded bg-cyan-500/30 text-[9px] text-cyan-300">
                  Attention
                </div>
                <div className="px-2 py-1 rounded bg-purple-500/30 text-[9px] text-purple-300">
                  FFN
                </div>
                <div className="px-2 py-1 rounded bg-green-500/30 text-[9px] text-green-300">
                  + Residual
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeLayer !== null && (
        <div className="bg-white/5 rounded-lg p-4 max-w-md mx-auto">
          <div className="text-sm font-medium mb-2 text-center">Layer {activeLayer + 1} Details</div>
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div className="bg-cyan-500/10 rounded p-2">
              <div className="text-cyan-400 mb-1">Multi-Head Attention</div>
              <div className="text-neutral-400">12 heads, each 64-dim</div>
            </div>
            <div className="bg-purple-500/10 rounded p-2">
              <div className="text-purple-400 mb-1">Feed-Forward</div>
              <div className="text-neutral-400">768 → 3072 → 768</div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3 text-center text-[10px]">
        <p className="text-neutral-300">
          ViT-Base: <span className="text-cyan-400">12 layers</span>, 
          <span className="text-purple-400"> 12 heads</span>, 
          <span className="text-green-400"> 768 dim</span>
        </p>
        <p className="text-neutral-500 mt-1">
          ~86 million parameters
        </p>
      </div>
    </div>
  );
};

// Output representations
const OutputRepresentationsVisual: React.FC = () => {
  const [task, setTask] = useState<'classification' | 'segmentation' | 'retrieval'>('classification');

  return (
    <div className="space-y-4">
      {/* Task selector */}
      <div className="flex justify-center gap-2">
        {(['classification', 'segmentation', 'retrieval'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTask(t)}
            className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
              task === t 
                ? 'bg-violet-500 text-white' 
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4">
        {/* ViT output */}
        <div className="text-center">
          <div className="text-[10px] text-neutral-500 mb-2">ViT Output</div>
          <div className="flex gap-1">
            <div className="w-8 h-8 rounded bg-blue-500/40 border border-blue-500 flex items-center justify-center text-[8px]">
              CLS
            </div>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-8 h-8 rounded bg-amber-500/30 border border-amber-500/50" />
            ))}
          </div>
        </div>

        <ArrowRight className="text-neutral-600" />

        {/* Task-specific head */}
        {task === 'classification' && (
          <div className="text-center">
            <div className="text-[10px] text-neutral-500 mb-2">MLP Head</div>
            <div className="flex flex-col gap-1">
              <div className="px-3 py-1 rounded bg-green-500/30 text-[10px] text-green-400">cat: 0.92</div>
              <div className="px-3 py-1 rounded bg-green-500/20 text-[10px] text-green-300">dog: 0.05</div>
              <div className="px-3 py-1 rounded bg-green-500/10 text-[10px] text-green-200">bird: 0.03</div>
            </div>
          </div>
        )}

        {task === 'segmentation' && (
          <div className="text-center">
            <div className="text-[10px] text-neutral-500 mb-2">Decoder</div>
            <div className="grid grid-cols-4 gap-0.5">
              {Array.from({ length: 16 }).map((_, i) => (
                <div 
                  key={i}
                  className={`w-4 h-4 rounded-sm ${
                    [0, 1, 4, 5].includes(i) ? 'bg-green-500' : 
                    [2, 3, 6, 7].includes(i) ? 'bg-blue-500' : 'bg-amber-500'
                  }`}
                />
              ))}
            </div>
            <div className="text-[10px] text-neutral-400 mt-1">Pixel masks</div>
          </div>
        )}

        {task === 'retrieval' && (
          <div className="text-center">
            <div className="text-[10px] text-neutral-500 mb-2">Embedding</div>
            <div className="w-16 h-16 rounded-xl bg-purple-500/30 border border-purple-500/50 flex items-center justify-center">
              <div className="text-[9px] text-purple-400 font-mono">
                [0.2,<br/>-0.1,<br/>0.8,<br/>...]
              </div>
            </div>
            <div className="text-[10px] text-purple-400 mt-1">768-dim vector</div>
          </div>
        )}
      </div>

      <div className="bg-violet-500/10 border border-violet-500/20 rounded-lg p-3 text-center text-sm">
        {task === 'classification' && (
          <p>Use <span className="text-blue-400">[CLS]</span> token → <span className="text-green-400">Linear layer</span> → Class probabilities</p>
        )}
        {task === 'segmentation' && (
          <p>Use <span className="text-amber-400">patch tokens</span> → <span className="text-green-400">Decoder</span> → Per-pixel masks</p>
        )}
        {task === 'retrieval' && (
          <p>Use <span className="text-blue-400">[CLS]</span> token directly as image embedding for search</p>
        )}
      </div>
    </div>
  );
};

// Full pipeline
const FullPipelineVisual: React.FC = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const stages = ['Image', 'Patches', 'Embed', 'Encode', 'Output'];

  const autoPlay = () => {
    setCurrentStage(0);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i >= stages.length) {
        clearInterval(interval);
      } else {
        setCurrentStage(i);
      }
    }, 800);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center items-center gap-2 overflow-x-auto py-2">
        {stages.map((stage, i) => (
          <React.Fragment key={i}>
            <div 
              className={`flex-shrink-0 text-center transition-all ${
                currentStage >= i ? 'opacity-100 scale-100' : 'opacity-30 scale-90'
              }`}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-1 ${
                i === 0 ? 'bg-amber-500/30 border border-amber-500/50' :
                i === 1 ? 'bg-orange-500/30 border border-orange-500/50' :
                i === 2 ? 'bg-purple-500/30 border border-purple-500/50' :
                i === 3 ? 'bg-cyan-500/30 border border-cyan-500/50' :
                'bg-green-500/30 border border-green-500/50'
              }`}>
                {i === 0 && '🖼️'}
                {i === 1 && (
                  <div className="grid grid-cols-2 gap-0.5">
                    {[1,2,3,4].map(n => <div key={n} className="w-3 h-3 bg-orange-500/50 rounded-sm" />)}
                  </div>
                )}
                {i === 2 && (
                  <div className="flex flex-col gap-0.5">
                    {[1,2,3].map(n => <div key={n} className="w-8 h-1 bg-purple-500/50 rounded" />)}
                  </div>
                )}
                {i === 3 && <span className="text-xs">ViT</span>}
                {i === 4 && <span className="text-lg">🐱</span>}
              </div>
              <div className="text-[10px] text-neutral-400">{stage}</div>
            </div>
            {i < stages.length - 1 && (
              <ArrowRight 
                className={`text-neutral-600 flex-shrink-0 transition-opacity ${
                  currentStage > i ? 'opacity-100' : 'opacity-30'
                }`} 
                size={14} 
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        <button
          onClick={autoPlay}
          className="px-4 py-2 bg-violet-500 hover:bg-violet-600 rounded-lg text-sm transition-colors"
        >
          ▶ Play Animation
        </button>
        <button
          onClick={() => setCurrentStage(0)}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors"
        >
          ↺ Reset
        </button>
      </div>

      {/* Stage description */}
      <div className="bg-white/5 rounded-lg p-4 text-center min-h-[80px]">
        {currentStage === 0 && (
          <div>
            <div className="text-amber-400 font-medium mb-1">1. Input Image</div>
            <p className="text-[10px] text-neutral-400">224×224×3 RGB image enters the pipeline</p>
          </div>
        )}
        {currentStage === 1 && (
          <div>
            <div className="text-orange-400 font-medium mb-1">2. Patch Extraction</div>
            <p className="text-[10px] text-neutral-400">Split into 14×14 = 196 patches of 16×16 pixels each</p>
          </div>
        )}
        {currentStage === 2 && (
          <div>
            <div className="text-purple-400 font-medium mb-1">3. Linear Embedding</div>
            <p className="text-[10px] text-neutral-400">Each patch flattened and projected to 768-dim + [CLS] token + position embeddings</p>
          </div>
        )}
        {currentStage === 3 && (
          <div>
            <div className="text-cyan-400 font-medium mb-1">4. Transformer Encoder</div>
            <p className="text-[10px] text-neutral-400">12 layers of self-attention + FFN process the sequence</p>
          </div>
        )}
        {currentStage === 4 && (
          <div>
            <div className="text-green-400 font-medium mb-1">5. Output</div>
            <p className="text-[10px] text-neutral-400">[CLS] token → MLP head → "cat" with 92% confidence!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisionEncoderModule;
