/**
 * @fileoverview Interactive Vision Transformer Module.
 */

import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, StepNavigator, InteractiveCanvas } from '../../components/shared';
import { Grid3X3, Scan, Layers, X } from 'lucide-react';

const STEPS = [
  {
    title: 'From CNNs to Transformers',
    desc: 'CNNs use local filters. ViTs treat an image as a sequence of patches and use attention!',
  },
  {
    title: 'Image Patching',
    desc: 'The image is divided into fixed-size patches (e.g., 16×16). Each patch becomes a "token".',
  },
  {
    title: 'Patch Embedding',
    desc: 'Each patch is flattened and projected into an embedding vector, just like word embeddings.',
  },
  {
    title: 'Position Encoding',
    desc: 'Since transformers have no notion of order, we add positional information to each patch.',
  },
  {
    title: 'The [CLS] Token',
    desc: 'A special classification token is prepended. After self-attention, it aggregates image info.',
  },
  {
    title: 'Full ViT Pipeline',
    desc: 'Watch patches flow through embedding → transformer layers → classification head.',
  },
];

const ViTModule: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [patchSize, setPatchSize] = useState(4);
  const [selectedPatch, setSelectedPatch] = useState<number | null>(null);
  const [imageData, setImageData] = useState<number[][] | null>(null);

  const handleDraw = useCallback((data: ImageData) => {
    // Convert to grayscale grid
    const grid: number[][] = [];
    const pixels = data.data;
    for (let y = 0; y < data.height; y++) {
      const row: number[] = [];
      for (let x = 0; x < data.width; x++) {
        const i = (y * data.width + x) * 4;
        const gray = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
        row.push(Math.round(gray));
      }
      grid.push(row);
    }
    setImageData(grid);
  }, []);

  const renderVisual = () => {
    switch (step) {
      case 0:
        return <CNNvsViTVisual />;
      case 1:
        return (
          <PatchingVisual 
            patchSize={patchSize}
            setPatchSize={setPatchSize}
            selectedPatch={selectedPatch}
            setSelectedPatch={setSelectedPatch}
          />
        );
      case 2:
        return <PatchEmbeddingVisual />;
      case 3:
        return <PositionEncodingVisual />;
      case 4:
        return <CLSTokenVisual />;
      case 5:
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
          { label: 'Vision Transformers', path: '/curriculum#vit' },
          { label: 'ViT Architecture', path: '/learn/vit/architecture' },
        ]} 
      />

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 bg-gradient-to-r from-pink-500/10 to-pink-500/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                  <Grid3X3 size={20} className="text-pink-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Vision Transformer (ViT)</h2>
                  <p className="text-xs text-neutral-500">Transformers for computer vision</p>
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

// CNN vs ViT comparison
const CNNvsViTVisual: React.FC = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-4">
      {/* CNN side */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
        <div className="text-center mb-3">
          <Layers className="inline-block text-blue-400 mb-1" size={24} />
          <div className="text-sm font-medium text-blue-400">CNN</div>
        </div>
        <div className="flex justify-center mb-3">
          <div className="relative w-32 h-32 bg-black/30 rounded">
            {/* Sliding filter visualization */}
            <div className="absolute w-8 h-8 border-2 border-blue-400 rounded animate-pulse" 
                 style={{ top: '20%', left: '20%' }} />
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 opacity-30">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className="border border-white/10" />
              ))}
            </div>
          </div>
        </div>
        <ul className="text-[10px] text-neutral-400 space-y-1">
          <li>• Local filters slide across image</li>
          <li>• Hierarchical features (edges → shapes)</li>
          <li>• Translation equivariant</li>
        </ul>
      </div>

      {/* ViT side */}
      <div className="bg-pink-500/10 border border-pink-500/20 rounded-xl p-4">
        <div className="text-center mb-3">
          <Grid3X3 className="inline-block text-pink-400 mb-1" size={24} />
          <div className="text-sm font-medium text-pink-400">ViT</div>
        </div>
        <div className="flex justify-center mb-3">
          <div className="relative w-32 h-32 bg-black/30 rounded">
            {/* Patch grid */}
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
              {Array.from({ length: 16 }).map((_, i) => (
                <div 
                  key={i} 
                  className="border border-pink-400/50"
                  style={{ 
                    backgroundColor: `rgba(236, 72, 153, ${Math.random() * 0.3})` 
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <ul className="text-[10px] text-neutral-400 space-y-1">
          <li>• Split into patches (tokens)</li>
          <li>• Global attention from start</li>
          <li>• Learns spatial relationships</li>
        </ul>
      </div>
    </div>
  </div>
);

// Patching visualization
const PatchingVisual: React.FC<{
  patchSize: number;
  setPatchSize: (s: number) => void;
  selectedPatch: number | null;
  setSelectedPatch: (p: number | null) => void;
}> = ({ patchSize, setPatchSize, selectedPatch, setSelectedPatch }) => {
  const gridSize = 16;
  const numPatches = Math.floor(gridSize / patchSize);
  const totalPatches = numPatches * numPatches;

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="relative" style={{ width: 224, height: 224 }}>
          {/* Sample image (gradient) */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg" />
          
          {/* Patch grid overlay */}
          <div 
            className="absolute inset-0 grid"
            style={{ 
              gridTemplateColumns: `repeat(${numPatches}, 1fr)`,
              gridTemplateRows: `repeat(${numPatches}, 1fr)`,
            }}
          >
            {Array.from({ length: totalPatches }).map((_, i) => (
              <div
                key={i}
                className={`border cursor-pointer transition-all ${
                  selectedPatch === i 
                    ? 'border-white border-2 bg-white/30' 
                    : 'border-white/30 hover:bg-white/20'
                }`}
                onClick={() => setSelectedPatch(selectedPatch === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Patch size control */}
      <div className="max-w-xs mx-auto">
        <div className="flex justify-between text-xs text-neutral-500 mb-1">
          <span>Patch size: {patchSize}×{patchSize}</span>
          <span>{totalPatches} patches total</span>
        </div>
        <input
          type="range"
          min="2"
          max="8"
          step="2"
          value={patchSize}
          onChange={(e) => setPatchSize(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      {selectedPatch !== null && (
        <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-3 text-center text-sm">
          Patch {selectedPatch + 1} → Token {selectedPatch + 1}
        </div>
      )}

      <p className="text-[10px] text-neutral-500 text-center">
        Smaller patches = more tokens = more detail (but more compute!)
      </p>
    </div>
  );
};

// Patch embedding
const PatchEmbeddingVisual: React.FC = () => {
  const patchPixels = Array.from({ length: 16 }, () => Math.round(Math.random() * 255));
  const embedding = [0.3, -0.7, 0.1, 0.9, -0.2, 0.5, -0.4, 0.8];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-6">
        {/* Patch */}
        <div className="text-center">
          <div className="text-xs text-neutral-500 mb-2">4×4 Patch</div>
          <div className="grid grid-cols-4 gap-0.5 p-2 bg-black/30 rounded">
            {patchPixels.map((p, i) => (
              <div 
                key={i}
                className="w-5 h-5 rounded-sm"
                style={{ backgroundColor: `rgb(${p}, ${p}, ${p})` }}
              />
            ))}
          </div>
        </div>

        {/* Arrow */}
        <div className="text-center">
          <div className="text-xs text-pink-400 mb-1">Flatten + Linear</div>
          <div className="text-2xl text-neutral-600">→</div>
        </div>

        {/* Embedding */}
        <div className="text-center">
          <div className="text-xs text-neutral-500 mb-2">Embedding (D=8)</div>
          <div className="flex flex-wrap w-16 gap-1 bg-black/30 p-2 rounded">
            {embedding.map((e, i) => (
              <div 
                key={i}
                className="w-6 h-6 rounded text-[8px] flex items-center justify-center font-mono"
                style={{ 
                  backgroundColor: e > 0 
                    ? `rgba(74, 222, 128, ${Math.abs(e)})` 
                    : `rgba(248, 113, 113, ${Math.abs(e)})`,
                  color: Math.abs(e) > 0.5 ? 'black' : 'white',
                }}
              >
                {e.toFixed(1)}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-3 text-center font-mono text-sm">
        x_patch ∈ ℝ^(P²·C) → E·x ∈ ℝ^D
      </div>

      <p className="text-[10px] text-neutral-500 text-center">
        Each patch is flattened (P²×C pixels) and projected to D dimensions
      </p>
    </div>
  );
};

// Position encoding
const PositionEncodingVisual: React.FC = () => {
  const positions = [
    [0.1, 0.9, 0.2, 0.8],
    [0.3, 0.7, 0.4, 0.6],
    [0.5, 0.5, 0.6, 0.4],
    [0.7, 0.3, 0.8, 0.2],
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-6">
        {/* Patch embeddings */}
        <div className="text-center">
          <div className="text-xs text-neutral-500 mb-2">Patch Embeds</div>
          <div className="space-y-1">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-blue-500/20 rounded px-2 py-1 text-[10px] font-mono text-blue-300">
                patch_{i}
              </div>
            ))}
          </div>
        </div>

        <div className="text-2xl text-neutral-600">+</div>

        {/* Position encodings */}
        <div className="text-center">
          <div className="text-xs text-neutral-500 mb-2">Pos Encoding</div>
          <div className="space-y-1">
            {positions.map((pos, i) => (
              <div key={i} className="flex gap-0.5">
                {pos.map((p, j) => (
                  <div 
                    key={j}
                    className="w-4 h-5 rounded text-[7px]"
                    style={{ backgroundColor: `rgba(168, 85, 247, ${p})` }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="text-2xl text-neutral-600">=</div>

        {/* Combined */}
        <div className="text-center">
          <div className="text-xs text-neutral-500 mb-2">Position-aware</div>
          <div className="space-y-1">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-green-500/20 rounded px-2 py-1 text-[10px] font-mono text-green-300">
                token_{i}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 text-center text-sm">
        <p>Without position encoding, the model can't tell patch order!</p>
        <p className="text-[10px] text-neutral-500 mt-1">
          ViT uses learnable 1D position embeddings
        </p>
      </div>
    </div>
  );
};

// CLS token
const CLSTokenVisual: React.FC = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-center gap-2">
      {/* CLS token */}
      <div className="w-12 h-12 rounded-lg bg-amber-500/30 border-2 border-amber-400 flex items-center justify-center">
        <span className="text-xs font-bold text-amber-300">[CLS]</span>
      </div>

      {/* Patch tokens */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div 
          key={i}
          className="w-10 h-10 rounded-lg bg-pink-500/20 border border-pink-500/30 flex items-center justify-center"
        >
          <span className="text-[9px] text-pink-300">P{i + 1}</span>
        </div>
      ))}

      <div className="text-neutral-500">...</div>
    </div>

    {/* Attention arrows */}
    <div className="flex justify-center">
      <div className="relative bg-black/30 rounded-lg p-4" style={{ width: 280 }}>
        <div className="text-center text-amber-400 mb-2 text-sm font-medium">[CLS]</div>
        <div className="flex justify-center gap-1 mb-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <div 
              key={i}
              className="w-1 bg-amber-400/50"
              style={{ height: 20 + Math.random() * 30 }}
            />
          ))}
        </div>
        <div className="flex justify-around text-[10px] text-neutral-500">
          <span>P1</span>
          <span>P2</span>
          <span>P3</span>
          <span>P4</span>
          <span>P5</span>
          <span>P6</span>
          <span>P7</span>
        </div>
      </div>
    </div>

    <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-center text-sm">
      <p>The [CLS] token attends to all patches and aggregates information</p>
      <p className="text-[10px] text-neutral-500 mt-1">
        Its final representation is used for image classification
      </p>
    </div>
  </div>
);

// Full pipeline
const FullPipelineVisual: React.FC = () => {
  const [animationStep, setAnimationStep] = useState(0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
        {/* Image */}
        <div className={`flex-shrink-0 transition-opacity ${animationStep >= 0 ? 'opacity-100' : 'opacity-30'}`}>
          <div className="w-16 h-16 rounded bg-gradient-to-br from-blue-500/50 to-pink-500/50 border border-white/20" />
          <div className="text-[9px] text-center text-neutral-500 mt-1">Image</div>
        </div>

        <div className="text-neutral-600">→</div>

        {/* Patches */}
        <div className={`flex-shrink-0 transition-opacity ${animationStep >= 1 ? 'opacity-100' : 'opacity-30'}`}>
          <div className="grid grid-cols-3 gap-0.5 w-16 h-16">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="bg-pink-500/30 rounded-sm" />
            ))}
          </div>
          <div className="text-[9px] text-center text-neutral-500 mt-1">Patches</div>
        </div>

        <div className="text-neutral-600">→</div>

        {/* Embeddings */}
        <div className={`flex-shrink-0 transition-opacity ${animationStep >= 2 ? 'opacity-100' : 'opacity-30'}`}>
          <div className="flex gap-0.5">
            <div className="w-3 h-16 bg-amber-500/50 rounded" />
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="w-3 h-16 bg-blue-500/30 rounded" />
            ))}
          </div>
          <div className="text-[9px] text-center text-neutral-500 mt-1">Tokens</div>
        </div>

        <div className="text-neutral-600">→</div>

        {/* Transformer */}
        <div className={`flex-shrink-0 transition-opacity ${animationStep >= 3 ? 'opacity-100' : 'opacity-30'}`}>
          <div className="w-16 h-16 rounded bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
            <div className="text-[10px] text-purple-300 text-center">
              Transformer<br/>×L
            </div>
          </div>
          <div className="text-[9px] text-center text-neutral-500 mt-1">Encoder</div>
        </div>

        <div className="text-neutral-600">→</div>

        {/* Output */}
        <div className={`flex-shrink-0 transition-opacity ${animationStep >= 4 ? 'opacity-100' : 'opacity-30'}`}>
          <div className="w-16 h-16 rounded bg-green-500/20 border border-green-500/30 flex items-center justify-center">
            <div className="text-[10px] text-green-300 text-center">MLP<br/>Head</div>
          </div>
          <div className="text-[9px] text-center text-neutral-500 mt-1">Classify</div>
        </div>
      </div>

      {/* Animation controls */}
      <div className="flex justify-center gap-2">
        {[0, 1, 2, 3, 4].map(s => (
          <button
            key={s}
            onClick={() => setAnimationStep(s)}
            className={`w-3 h-3 rounded-full transition-colors ${
              animationStep === s ? 'bg-pink-500' : 'bg-white/20'
            }`}
          />
        ))}
      </div>

      <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-3 text-center text-sm">
        Image → Patches → Embed + Pos → Transformer → [CLS] → Class
      </div>
    </div>
  );
};

export default ViTModule;
