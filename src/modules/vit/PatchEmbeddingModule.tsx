/**
 * @fileoverview Interactive Patch Embedding Module.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, StepNavigator } from '../../components/shared';
import { Grid3X3, X, Image } from 'lucide-react';

const STEPS = [
  {
    title: 'Images as Sequences',
    desc: 'Transformers work with sequences. How do we turn a 2D image into a sequence?',
  },
  {
    title: 'Patch Extraction',
    desc: 'Divide the image into non-overlapping patches. Each patch becomes a "visual token".',
  },
  {
    title: 'Linear Projection',
    desc: 'Flatten each patch and project it to the model dimension using a linear layer.',
  },
  {
    title: 'Position Embeddings',
    desc: 'Add position information so the model knows where each patch came from.',
  },
  {
    title: 'Interactive Demo',
    desc: 'See how changing patch size affects the number of tokens!',
  },
];

const PatchEmbeddingModule: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const renderVisual = () => {
    switch (step) {
      case 0:
        return <ImagesAsSequencesVisual />;
      case 1:
        return <PatchExtractionVisual />;
      case 2:
        return <LinearProjectionVisual />;
      case 3:
        return <PositionEmbeddingsVisual />;
      case 4:
        return <InteractivePatchingVisual />;
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
          { label: 'Patch Embedding', path: '/learn/vit/patches' },
        ]} 
      />

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 bg-gradient-to-r from-amber-500/10 to-amber-500/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <Grid3X3 size={20} className="text-amber-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Patch Embedding</h2>
                  <p className="text-xs text-neutral-500">Images to tokens for transformers</p>
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

// Images as sequences
const ImagesAsSequencesVisual: React.FC = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
      {/* Text: natural sequence */}
      <div className="text-center">
        <div className="text-sm font-medium text-blue-400 mb-3">Text</div>
        <div className="flex gap-1 justify-center mb-2">
          {['The', 'cat', 'sat'].map((word, i) => (
            <div key={i} className="px-2 py-1 bg-blue-500/20 rounded text-xs">
              {word}
            </div>
          ))}
        </div>
        <div className="text-[10px] text-neutral-400 flex justify-center gap-4">
          <span>1</span>
          <span>→</span>
          <span>2</span>
          <span>→</span>
          <span>3</span>
        </div>
        <p className="text-[10px] text-blue-400 mt-2">Natural sequence!</p>
      </div>

      {/* Image: 2D grid */}
      <div className="text-center">
        <div className="text-sm font-medium text-amber-400 mb-3">Image</div>
        <div className="flex justify-center mb-2">
          <div className="grid grid-cols-4 gap-0.5">
            {Array.from({ length: 16 }).map((_, i) => (
              <div 
                key={i} 
                className="w-6 h-6 bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-[8px] text-neutral-500"
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
        <p className="text-[10px] text-amber-400">2D grid - not a sequence?</p>
      </div>
    </div>

    <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 text-center">
      <p className="text-sm mb-2">
        <span className="text-amber-400">Problem:</span> Transformers expect sequences, but images are 2D grids.
      </p>
      <p className="text-[10px] text-neutral-400">
        <span className="text-green-400">Solution:</span> Split the image into patches and treat each patch as a token!
      </p>
    </div>
  </div>
);

// Patch extraction
const PatchExtractionVisual: React.FC = () => {
  const [hoveredPatch, setHoveredPatch] = useState<number | null>(null);
  const gridSize = 4;
  const patchColors = ['#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7', '#ec4899', '#14b8a6', '#f97316'];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-8">
        {/* Original image with patches */}
        <div className="text-center">
          <div className="text-[10px] text-neutral-500 mb-2">224×224 Image</div>
          <div className="relative">
            <div className="grid grid-cols-4 gap-0.5">
              {Array.from({ length: 16 }).map((_, i) => (
                <div 
                  key={i}
                  className={`w-10 h-10 rounded transition-all cursor-pointer ${
                    hoveredPatch === i ? 'scale-110 z-10' : ''
                  }`}
                  style={{ 
                    backgroundColor: `${patchColors[i % 8]}30`,
                    border: `2px solid ${hoveredPatch === i ? patchColors[i % 8] : 'transparent'}`,
                  }}
                  onMouseEnter={() => setHoveredPatch(i)}
                  onMouseLeave={() => setHoveredPatch(null)}
                >
                  <div className="text-[9px] p-0.5 text-neutral-400">{i + 1}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-[10px] text-neutral-500 mt-2">16 patches × 16×16 pixels</div>
        </div>

        <div className="text-2xl text-neutral-600">→</div>

        {/* Sequence of patches */}
        <div className="text-center">
          <div className="text-[10px] text-neutral-500 mb-2">Patch Sequence</div>
          <div className="flex gap-1 flex-wrap justify-center" style={{ maxWidth: 140 }}>
            {Array.from({ length: 16 }).map((_, i) => (
              <div 
                key={i}
                className={`w-6 h-6 rounded flex items-center justify-center text-[8px] transition-all ${
                  hoveredPatch === i ? 'ring-2 ring-white' : ''
                }`}
                style={{ backgroundColor: `${patchColors[i % 8]}40` }}
              >
                {i + 1}
              </div>
            ))}
          </div>
          <div className="text-[10px] text-neutral-500 mt-2">N = 16 tokens</div>
        </div>
      </div>

      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
        <div className="font-mono text-sm mb-1">
          N = (H × W) / (P × P) = (224 × 224) / (16 × 16) = 196 tokens
        </div>
        <p className="text-[10px] text-neutral-400">
          For a 224×224 image with 16×16 patches
        </p>
      </div>
    </div>
  );
};

// Linear projection
const LinearProjectionVisual: React.FC = () => {
  const patchSize = 16;
  const patchDim = patchSize * patchSize * 3; // 768 for 16x16 RGB
  const modelDim = 768;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-4">
        {/* Patch - 2D */}
        <div className="text-center">
          <div className="text-[10px] text-neutral-500 mb-2">Patch (16×16×3)</div>
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500/30 via-green-500/30 to-blue-500/30 border border-white/20" />
        </div>

        <div className="text-neutral-600">→</div>

        {/* Flatten */}
        <div className="text-center">
          <div className="text-[10px] text-neutral-500 mb-2">Flatten</div>
          <div className="flex gap-0.5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div 
                key={i}
                className="w-2 h-8 rounded-sm bg-gradient-to-b from-red-500/30 via-green-500/30 to-blue-500/30"
              />
            ))}
            <div className="text-neutral-500 self-center text-xs px-1">...</div>
          </div>
          <div className="text-[10px] text-neutral-500 mt-1">{patchDim} values</div>
        </div>

        <div className="text-neutral-600">→</div>

        {/* Linear layer */}
        <div className="text-center">
          <div className="text-[10px] text-neutral-500 mb-2">Linear (W)</div>
          <div className="w-16 h-16 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
            <div className="text-[9px] font-mono text-purple-300">
              {patchDim}<br/>×<br/>{modelDim}
            </div>
          </div>
        </div>

        <div className="text-neutral-600">→</div>

        {/* Output embedding */}
        <div className="text-center">
          <div className="text-[10px] text-neutral-500 mb-2">Patch Embedding</div>
          <div className="flex gap-0.5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div 
                key={i}
                className="w-3 h-10 rounded-sm bg-green-500/40"
              />
            ))}
            <div className="text-neutral-500 self-center text-xs px-1">...</div>
          </div>
          <div className="text-[10px] text-green-400 mt-1">{modelDim} dim</div>
        </div>
      </div>

      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 text-center">
        <div className="font-mono text-sm mb-2">
          E = flatten(patch) @ W + b
        </div>
        <p className="text-[10px] text-neutral-400">
          W is learnable: [{patchDim} × {modelDim}] parameters
        </p>
      </div>
    </div>
  );
};

// Position embeddings
const PositionEmbeddingsVisual: React.FC = () => {
  const [showPositions, setShowPositions] = useState(true);

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="relative">
          <div className="grid grid-cols-4 gap-1">
            {Array.from({ length: 16 }).map((_, i) => (
              <div 
                key={i}
                className="w-12 h-12 rounded-lg bg-amber-500/20 border border-amber-500/30 flex flex-col items-center justify-center"
              >
                <div className="text-[9px] text-amber-400 mb-0.5">P{i + 1}</div>
                {showPositions && (
                  <div className="text-[8px] text-blue-400 font-mono">
                    +pos{i + 1}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Toggle */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowPositions(!showPositions)}
          className={`px-4 py-2 rounded-lg transition-all ${
            showPositions ? 'bg-blue-500 text-white' : 'bg-white/10 hover:bg-white/20'
          }`}
        >
          {showPositions ? 'Position Embeddings ON' : 'Position Embeddings OFF'}
        </button>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
        <div className="text-center mb-3">
          <span className="text-sm">
            Final Token = <span className="text-amber-400">Patch Embed</span> + <span className="text-blue-400">Position Embed</span>
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-[10px] text-neutral-500 mb-1">Without positions</div>
            <p className="text-[10px] text-red-400">
              ❌ Model doesn't know patch order
            </p>
          </div>
          <div>
            <div className="text-[10px] text-neutral-500 mb-1">With positions</div>
            <p className="text-[10px] text-green-400">
              ✅ Model knows spatial layout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Interactive patching
const InteractivePatchingVisual: React.FC = () => {
  const [patchSize, setPatchSize] = useState(16);
  const imageSize = 224;
  const numPatches = (imageSize / patchSize) ** 2;
  const patchesPerSide = imageSize / patchSize;

  return (
    <div className="space-y-4">
      {/* Patch size slider */}
      <div className="max-w-xs mx-auto">
        <div className="flex justify-between text-xs text-neutral-500 mb-1">
          <span>Patch Size</span>
          <span>{patchSize}×{patchSize}</span>
        </div>
        <input
          type="range"
          min="7"
          max="56"
          step="7"
          value={patchSize}
          onChange={(e) => setPatchSize(parseInt(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-[10px] text-neutral-600">
          <span>7</span>
          <span>14</span>
          <span>16</span>
          <span>28</span>
          <span>56</span>
        </div>
      </div>

      {/* Visual representation */}
      <div className="flex justify-center">
        <div 
          className="bg-white/5 rounded-lg overflow-hidden"
          style={{ width: 168, height: 168 }}
        >
          <div 
            className="grid gap-0.5 h-full"
            style={{ 
              gridTemplateColumns: `repeat(${patchesPerSide}, 1fr)`,
            }}
          >
            {Array.from({ length: Math.min(numPatches, 64) }).map((_, i) => (
              <div 
                key={i}
                className="bg-gradient-to-br from-amber-500/30 to-orange-500/30 border border-amber-500/20 flex items-center justify-center"
                style={{ 
                  fontSize: numPatches > 64 ? '0' : '8px',
                }}
              >
                {numPatches <= 64 && i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-amber-400">{numPatches}</div>
          <div className="text-[10px] text-neutral-500">Tokens</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-blue-400">{patchesPerSide}</div>
          <div className="text-[10px] text-neutral-500">Per Side</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-green-400">{patchSize * patchSize * 3}</div>
          <div className="text-[10px] text-neutral-500">Patch Pixels</div>
        </div>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-center text-[10px]">
        <p className="text-neutral-300 mb-1">
          <span className="text-amber-400">Smaller patches</span> = More tokens = More detail but slower
        </p>
        <p className="text-neutral-300">
          <span className="text-amber-400">Larger patches</span> = Fewer tokens = Less detail but faster
        </p>
      </div>
    </div>
  );
};

export default PatchEmbeddingModule;
