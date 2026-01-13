/**
 * @fileoverview Interactive VLA (Vision-Language-Action) Module.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, StepNavigator } from '../../components/shared';
import { Bot, Eye, MessageSquare, Zap, ArrowRight, X } from 'lucide-react';

const STEPS = [
  {
    title: 'What is a VLA Model?',
    desc: 'Vision-Language-Action models combine visual perception, language understanding, and action generation for robotics.',
  },
  {
    title: 'The Vision Encoder',
    desc: 'A ViT processes camera input into visual tokens that represent the scene.',
  },
  {
    title: 'Language Understanding',
    desc: 'A language model processes instructions like "pick up the red ball" into semantic tokens.',
  },
  {
    title: 'Multimodal Fusion',
    desc: 'Visual and language tokens are combined using cross-attention to understand the task in context.',
  },
  {
    title: 'Action Prediction',
    desc: 'The model outputs robot actions: position, rotation, and gripper state.',
  },
  {
    title: 'The Complete Pipeline',
    desc: 'See how it all comes together: observe, understand, act!',
  },
];

const VLAModule: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [instruction, setInstruction] = useState('Pick up the red cup');
  const [highlightedComponent, setHighlightedComponent] = useState<string | null>(null);

  const renderVisual = () => {
    switch (step) {
      case 0:
        return <WhatIsVLAVisual />;
      case 1:
        return <VisionEncoderVisual />;
      case 2:
        return <LanguageUnderstandingVisual instruction={instruction} setInstruction={setInstruction} />;
      case 3:
        return <MultimodalFusionVisual />;
      case 4:
        return <ActionPredictionVisual />;
      case 5:
        return <CompletePipelineVisual highlightedComponent={highlightedComponent} setHighlightedComponent={setHighlightedComponent} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header 
        showBreadcrumb 
        breadcrumb={[
          { label: 'VLA Models', path: '/curriculum#vla' },
          { label: 'Complete VLA', path: '/learn/vla/complete' },
        ]} 
      />

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-cyan-500/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <Bot size={20} className="text-cyan-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Vision-Language-Action</h2>
                  <p className="text-xs text-neutral-500">The complete robotics AI system</p>
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

// What is VLA
const WhatIsVLAVisual: React.FC = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-center gap-4">
      {/* Vision */}
      <div className="text-center p-4 bg-pink-500/10 border border-pink-500/20 rounded-xl w-24">
        <Eye className="mx-auto text-pink-400 mb-2" size={28} />
        <div className="text-xs text-pink-400 font-medium">Vision</div>
        <div className="text-[9px] text-neutral-500 mt-1">See the world</div>
      </div>

      <div className="text-xl text-neutral-600">+</div>

      {/* Language */}
      <div className="text-center p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl w-24">
        <MessageSquare className="mx-auto text-blue-400 mb-2" size={28} />
        <div className="text-xs text-blue-400 font-medium">Language</div>
        <div className="text-[9px] text-neutral-500 mt-1">Understand tasks</div>
      </div>

      <div className="text-xl text-neutral-600">+</div>

      {/* Action */}
      <div className="text-center p-4 bg-green-500/10 border border-green-500/20 rounded-xl w-24">
        <Zap className="mx-auto text-green-400 mb-2" size={28} />
        <div className="text-xs text-green-400 font-medium">Action</div>
        <div className="text-[9px] text-neutral-500 mt-1">Move & interact</div>
      </div>
    </div>

    <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4 text-center">
      <p className="text-sm text-neutral-300">
        VLA models enable robots to understand natural language instructions 
        while perceiving and acting in the physical world.
      </p>
      <div className="flex justify-center gap-4 mt-3 text-[10px] text-neutral-500">
        <span>Examples: RT-2, PaLM-E, OpenVLA</span>
      </div>
    </div>
  </div>
);

// Vision encoder detail
const VisionEncoderVisual: React.FC = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-center gap-4">
      {/* Camera image */}
      <div className="text-center">
        <div className="w-28 h-28 rounded-lg bg-gradient-to-br from-amber-700/60 via-red-500/40 to-gray-600/40 relative overflow-hidden">
          {/* Simulated robot view */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-8 bg-red-500/60 rounded" />
          <div className="absolute top-4 right-4 w-4 h-4 bg-blue-500/60 rounded-full" />
          <div className="absolute top-8 left-4 w-8 h-3 bg-green-500/60 rounded" />
        </div>
        <div className="text-[10px] text-neutral-500 mt-1">Camera Input</div>
      </div>

      <ArrowRight className="text-neutral-600" />

      {/* ViT */}
      <div className="text-center">
        <div className="w-20 h-28 rounded-lg bg-pink-500/20 border border-pink-500/30 flex flex-col items-center justify-center p-2">
          <div className="grid grid-cols-3 gap-0.5 mb-2">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="w-4 h-4 rounded-sm bg-pink-400/40" />
            ))}
          </div>
          <div className="text-[10px] text-pink-300">ViT</div>
        </div>
        <div className="text-[10px] text-neutral-500 mt-1">Vision Encoder</div>
      </div>

      <ArrowRight className="text-neutral-600" />

      {/* Visual tokens */}
      <div className="text-center">
        <div className="flex gap-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-4 h-24 rounded bg-pink-500/40" />
          ))}
        </div>
        <div className="text-[10px] text-neutral-500 mt-1">Visual Tokens</div>
      </div>
    </div>

    <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-3 text-center text-sm">
      <p>The vision encoder (typically a ViT) converts the camera image into a sequence of embeddings.</p>
      <p className="text-[10px] text-neutral-500 mt-1">
        These visual tokens capture spatial and semantic information about the scene.
      </p>
    </div>
  </div>
);

// Language understanding
const LanguageUnderstandingVisual: React.FC<{
  instruction: string;
  setInstruction: (s: string) => void;
}> = ({ instruction, setInstruction }) => {
  const tokens = instruction.split(' ');
  const attentionWeights = {
    'Pick': 0.3,
    'up': 0.1,
    'the': 0.1,
    'red': 0.4,
    'cup': 0.5,
    'ball': 0.5,
    'blue': 0.4,
    'block': 0.5,
  };

  const presets = [
    'Pick up the red cup',
    'Move the blue block left',
    'Place the ball in the bin',
  ];

  return (
    <div className="space-y-4">
      {/* Instruction input */}
      <div className="max-w-sm mx-auto">
        <input
          type="text"
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-blue-500/50"
          placeholder="Enter an instruction..."
        />
        <div className="flex gap-2 mt-2">
          {presets.map((preset, i) => (
            <button
              key={i}
              onClick={() => setInstruction(preset)}
              className="px-2 py-1 text-[10px] bg-white/5 hover:bg-white/10 rounded transition-colors"
            >
              {preset.split(' ').slice(0, 2).join(' ')}...
            </button>
          ))}
        </div>
      </div>

      {/* Tokenization */}
      <div className="flex flex-wrap justify-center gap-2">
        {tokens.map((token, i) => {
          const weight = (attentionWeights as any)[token] || 0.2;
          return (
            <div 
              key={i}
              className="px-3 py-2 rounded-lg text-sm"
              style={{ backgroundColor: `rgba(59, 130, 246, ${weight})` }}
            >
              {token}
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-2">
        <ArrowRight className="text-neutral-600 rotate-90" />
      </div>

      {/* Language tokens */}
      <div className="flex justify-center gap-1">
        {tokens.map((_, i) => (
          <div key={i} className="w-6 h-12 rounded bg-blue-500/40" />
        ))}
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-center text-sm">
        <p>Language tokens capture the intent (action) and objects (what to manipulate).</p>
      </div>
    </div>
  );
};

// Multimodal fusion
const MultimodalFusionVisual: React.FC = () => (
  <div className="space-y-4">
    <div className="flex items-start justify-center gap-4">
      {/* Visual tokens */}
      <div className="text-center">
        <div className="text-xs text-pink-400 mb-2">Visual</div>
        <div className="flex gap-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-4 h-16 rounded bg-pink-500/40" />
          ))}
        </div>
      </div>

      {/* Fusion arrows */}
      <div className="flex flex-col items-center gap-2 pt-8">
        <div className="w-8 h-0.5 bg-gradient-to-r from-pink-400 to-purple-400" />
        <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400" />
      </div>

      {/* Cross attention */}
      <div className="text-center">
        <div className="text-xs text-purple-400 mb-2">Cross-Attention</div>
        <div className="w-20 h-20 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
          <div className="grid grid-cols-3 grid-rows-3 gap-0.5">
            {Array.from({ length: 9 }).map((_, i) => (
              <div 
                key={i} 
                className="w-4 h-4 rounded-sm"
                style={{ 
                  backgroundColor: `rgba(168, 85, 247, ${0.2 + Math.random() * 0.6})` 
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Output arrows */}
      <div className="flex flex-col items-center gap-2 pt-8">
        <div className="w-8 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400" />
      </div>

      {/* Fused tokens */}
      <div className="text-center">
        <div className="text-xs text-cyan-400 mb-2">Fused</div>
        <div className="flex gap-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div 
              key={i} 
              className="w-4 h-16 rounded"
              style={{ 
                background: `linear-gradient(to bottom, rgba(236, 72, 153, 0.4), rgba(34, 211, 238, 0.4))` 
              }}
            />
          ))}
        </div>
      </div>

      {/* Language tokens */}
      <div className="text-center">
        <div className="text-xs text-blue-400 mb-2">Language</div>
        <div className="flex gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="w-4 h-16 rounded bg-blue-500/40" />
          ))}
        </div>
      </div>
    </div>

    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 text-center text-sm">
      <p>Cross-attention allows visual tokens to attend to language tokens and vice versa.</p>
      <p className="text-[10px] text-neutral-500 mt-1">
        "red cup" in language → attend to red region in vision
      </p>
    </div>
  </div>
);

// Action prediction
const ActionPredictionVisual: React.FC = () => {
  const [gripper, setGripper] = useState(0.7);
  
  const actions = {
    x: 0.12,
    y: -0.08,
    z: 0.25,
    roll: 0.0,
    pitch: -15.2,
    yaw: 45.0,
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
        {/* Position */}
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
          <div className="text-xs text-green-400 mb-2 font-medium">Position (m)</div>
          <div className="space-y-1 font-mono text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-500">x:</span>
              <span className="text-green-300">{actions.x.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">y:</span>
              <span className="text-green-300">{actions.y.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">z:</span>
              <span className="text-green-300">{actions.z.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Rotation */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
          <div className="text-xs text-amber-400 mb-2 font-medium">Rotation (°)</div>
          <div className="space-y-1 font-mono text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-500">roll:</span>
              <span className="text-amber-300">{actions.roll.toFixed(1)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">pitch:</span>
              <span className="text-amber-300">{actions.pitch.toFixed(1)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">yaw:</span>
              <span className="text-amber-300">{actions.yaw.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gripper */}
      <div className="max-w-xs mx-auto bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-cyan-400 font-medium">Gripper</span>
          <span className="text-cyan-300">{(gripper * 100).toFixed(0)}% open</span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={gripper}
          onChange={(e) => setGripper(parseFloat(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-center mt-2">
          {/* Gripper visualization */}
          <div className="flex items-end gap-1">
            <div 
              className="w-3 rounded-t bg-cyan-400 transition-all"
              style={{ height: 20 + (1 - gripper) * 10, transform: `rotate(${-gripper * 15}deg)` }}
            />
            <div className="w-4 h-2 bg-cyan-600 rounded-b" />
            <div 
              className="w-3 rounded-t bg-cyan-400 transition-all"
              style={{ height: 20 + (1 - gripper) * 10, transform: `rotate(${gripper * 15}deg)` }}
            />
          </div>
        </div>
      </div>

      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center text-sm">
        <p>The action head predicts continuous values for robot control.</p>
        <p className="text-[10px] text-neutral-500 mt-1">
          7-DoF: 3 position + 3 rotation + 1 gripper
        </p>
      </div>
    </div>
  );
};

// Complete pipeline
const CompletePipelineVisual: React.FC<{
  highlightedComponent: string | null;
  setHighlightedComponent: (c: string | null) => void;
}> = ({ highlightedComponent, setHighlightedComponent }) => {
  const components = [
    { id: 'camera', label: 'Camera', color: 'gray', icon: '📷' },
    { id: 'vision', label: 'Vision Encoder', color: 'pink', icon: '🎨' },
    { id: 'language', label: 'Language Model', color: 'blue', icon: '💬' },
    { id: 'fusion', label: 'Multimodal Fusion', color: 'purple', icon: '🔀' },
    { id: 'action', label: 'Action Head', color: 'green', icon: '🤖' },
  ];

  return (
    <div className="space-y-4">
      {/* Pipeline diagram */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {components.map((comp, i) => (
          <React.Fragment key={comp.id}>
            <button
              onMouseEnter={() => setHighlightedComponent(comp.id)}
              onMouseLeave={() => setHighlightedComponent(null)}
              className={`px-3 py-2 rounded-lg text-xs transition-all ${
                highlightedComponent === comp.id 
                  ? `bg-${comp.color}-500/40 border-2 border-${comp.color}-400` 
                  : 'bg-white/10 border border-white/20'
              }`}
              style={highlightedComponent === comp.id ? {
                backgroundColor: comp.color === 'pink' ? 'rgba(236, 72, 153, 0.4)' :
                                comp.color === 'blue' ? 'rgba(59, 130, 246, 0.4)' :
                                comp.color === 'purple' ? 'rgba(168, 85, 247, 0.4)' :
                                comp.color === 'green' ? 'rgba(34, 197, 94, 0.4)' :
                                'rgba(156, 163, 175, 0.4)',
              } : {}}
            >
              <div className="text-lg mb-1 text-center">{comp.icon}</div>
              <div>{comp.label}</div>
            </button>
            {i < components.length - 1 && (
              <ArrowRight className="text-neutral-600 flex-shrink-0" size={16} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Description based on highlighted */}
      <div className="h-24 bg-black/30 rounded-lg p-4 flex items-center justify-center">
        {highlightedComponent === 'camera' && (
          <p className="text-sm text-center">RGB or RGB-D camera captures the robot's view of the environment.</p>
        )}
        {highlightedComponent === 'vision' && (
          <p className="text-sm text-center">Vision Transformer (ViT) extracts spatial features from pixels into visual tokens.</p>
        )}
        {highlightedComponent === 'language' && (
          <p className="text-sm text-center">Pre-trained LLM (PaLM, LLaMA) processes natural language instructions.</p>
        )}
        {highlightedComponent === 'fusion' && (
          <p className="text-sm text-center">Cross-attention aligns visual and language representations.</p>
        )}
        {highlightedComponent === 'action' && (
          <p className="text-sm text-center">MLP head outputs continuous action tokens for robot control.</p>
        )}
        {!highlightedComponent && (
          <p className="text-sm text-neutral-500 text-center">Hover over components to learn more</p>
        )}
      </div>

      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3 text-center">
        <p className="text-sm">🎉 You've learned the complete VLA pipeline!</p>
        <p className="text-[10px] text-neutral-500 mt-1">
          This is the architecture behind modern robotic AI systems.
        </p>
      </div>
    </div>
  );
};

export default VLAModule;
