/**
 * @fileoverview Learning curriculum configuration.
 * 
 * Defines all learning modules, categories, and the learning path
 * from mathematical foundations to Vision-Language-Action models.
 */

import type { LearningModule, LearningCategory } from '../types';

// =============================================================================
// MODULE DEFINITIONS
// =============================================================================

export const MODULES: Record<string, LearningModule> = {
  // Mathematics Foundations
  'calculus': {
    id: 'calculus',
    title: 'Calculus Fundamentals',
    description: 'Derivatives, gradients, and the chain rule - the backbone of learning',
    icon: 'TrendingUp',
    path: '/learn/math/calculus',
    difficulty: 2,
    duration: 30,
    prerequisites: [],
    objectives: [
      'Understand derivatives as rates of change',
      'Visualize gradients in 2D and 3D',
      'Master the chain rule for backpropagation',
      'Apply partial derivatives to loss functions'
    ],
    gradient: ['#f97316', '#ea580c'],
  },
  'linear-algebra': {
    id: 'linear-algebra',
    title: 'Linear Algebra',
    description: 'Vectors, matrices, and transformations - how AI manipulates data',
    icon: 'Grid3X3',
    path: '/learn/math/linear-algebra',
    difficulty: 2,
    duration: 35,
    prerequisites: [],
    objectives: [
      'Visualize vectors and operations',
      'Understand matrix multiplication',
      'Explore linear transformations',
      'Learn eigenvalues and eigenvectors'
    ],
    gradient: ['#8b5cf6', '#7c3aed'],
  },
  'statistics': {
    id: 'statistics',
    title: 'Probability & Statistics',
    description: 'Distributions, Bayes theorem, and the math of uncertainty',
    icon: 'BarChart3',
    path: '/learn/math/statistics',
    difficulty: 2,
    duration: 25,
    prerequisites: [],
    objectives: [
      'Explore probability distributions',
      'Understand Bayes theorem',
      'Learn about expectation and variance',
      'Apply statistics to ML problems'
    ],
    gradient: ['#06b6d4', '#0891b2'],
  },

  // Neural Network Basics
  'neurons': {
    id: 'neurons',
    title: 'Neurons & Perceptrons',
    description: 'The fundamental building blocks that mimic brain cells',
    icon: 'Circle',
    path: '/learn/nn/neurons',
    difficulty: 1,
    duration: 20,
    prerequisites: ['calculus'],
    objectives: [
      'Understand biological inspiration',
      'Build a single perceptron',
      'Explore weighted sums and biases',
      'See how neurons make decisions'
    ],
    gradient: ['#22c55e', '#16a34a'],
  },
  'activations': {
    id: 'activations',
    title: 'Activation Functions',
    description: 'ReLU, Sigmoid, Tanh - the nonlinear magic that enables learning',
    icon: 'Zap',
    path: '/learn/nn/activations',
    difficulty: 2,
    duration: 20,
    prerequisites: ['neurons', 'calculus'],
    objectives: [
      'Understand why nonlinearity matters',
      'Compare different activation functions',
      'Visualize gradients and saturation',
      'Choose the right activation for your task'
    ],
    gradient: ['#eab308', '#ca8a04'],
  },
  'backprop': {
    id: 'backprop',
    title: 'Backpropagation',
    description: 'How neural networks learn from mistakes using gradients',
    icon: 'RotateCcw',
    path: '/learn/nn/backprop',
    difficulty: 3,
    duration: 35,
    prerequisites: ['activations', 'calculus'],
    objectives: [
      'Trace the chain rule through networks',
      'Visualize gradient flow',
      'Understand weight updates',
      'Debug vanishing/exploding gradients'
    ],
    gradient: ['#ec4899', '#db2777'],
  },
  'mlp': {
    id: 'mlp',
    title: 'Multi-Layer Perceptrons',
    description: 'Deep networks with hidden layers - universal function approximators',
    icon: 'Layers',
    path: '/learn/nn/mlp',
    difficulty: 2,
    duration: 25,
    prerequisites: ['backprop'],
    objectives: [
      'Stack layers to build depth',
      'Understand feature hierarchies',
      'Explore network architectures',
      'Visualize decision boundaries'
    ],
    gradient: ['#a855f7', '#9333ea'],
  },

  // CNN Concepts
  'image-matrix': {
    id: 'image-matrix',
    title: 'Images as Matrices',
    description: 'How computers see - pixels, RGB, and digital representation',
    icon: 'Image',
    path: '/learn/cnn/image-matrix',
    difficulty: 1,
    duration: 15,
    prerequisites: ['linear-algebra'],
    objectives: [
      'Understand pixel representation',
      'Explore RGB color space',
      'See images as number grids',
      'Convert between color and grayscale'
    ],
    gradient: ['#3b82f6', '#2563eb'],
  },
  'convolution': {
    id: 'convolution',
    title: 'Convolution Operations',
    description: 'The sliding window that extracts features from images',
    icon: 'Layers',
    path: '/learn/cnn/convolution',
    difficulty: 2,
    duration: 30,
    prerequisites: ['image-matrix'],
    objectives: [
      'Understand the convolution operation',
      'Explore different kernels',
      'Apply filters interactively',
      'See how features are extracted'
    ],
    gradient: ['#6366f1', '#4f46e5'],
  },
  'pooling': {
    id: 'pooling',
    title: 'Pooling & Stride',
    description: 'Downsampling to reduce dimensions while keeping important features',
    icon: 'Minimize2',
    path: '/learn/cnn/pooling',
    difficulty: 2,
    duration: 20,
    prerequisites: ['convolution'],
    objectives: [
      'Understand max and average pooling',
      'Explore stride and padding',
      'See how pooling builds invariance',
      'Design efficient CNN architectures'
    ],
    gradient: ['#14b8a6', '#0d9488'],
  },
  'cnn-architecture': {
    id: 'cnn-architecture',
    title: 'CNN Architecture',
    description: 'Putting it all together - from input to classification',
    icon: 'Network',
    path: '/learn/cnn/architecture',
    difficulty: 3,
    duration: 30,
    prerequisites: ['pooling', 'mlp'],
    objectives: [
      'Combine conv, pool, and FC layers',
      'Trace feature extraction pipeline',
      'Understand famous architectures (LeNet, VGG)',
      'Design your own CNN'
    ],
    gradient: ['#f43f5e', '#e11d48'],
  },

  // Transformers & Attention
  'attention': {
    id: 'attention',
    title: 'Attention Mechanism',
    description: 'The breakthrough that revolutionized AI - learning what to focus on',
    icon: 'Eye',
    path: '/learn/transformers/attention',
    difficulty: 3,
    duration: 35,
    prerequisites: ['mlp', 'linear-algebra'],
    objectives: [
      'Understand Query, Key, Value',
      'Compute attention scores',
      'Visualize attention patterns',
      'See how context is captured'
    ],
    gradient: ['#f59e0b', '#d97706'],
  },
  'self-attention': {
    id: 'self-attention',
    title: 'Self-Attention & Multi-Head',
    description: 'How transformers process sequences with parallel attention heads',
    icon: 'GitBranch',
    path: '/learn/transformers/self-attention',
    difficulty: 3,
    duration: 30,
    prerequisites: ['attention'],
    objectives: [
      'Understand self-attention',
      'Explore multi-head attention',
      'See how heads specialize',
      'Combine heads effectively'
    ],
    gradient: ['#84cc16', '#65a30d'],
  },
  'transformer-arch': {
    id: 'transformer-arch',
    title: 'Transformer Architecture',
    description: 'Encoder-decoder, layer norm, residuals - the complete picture',
    icon: 'Box',
    path: '/learn/transformers/architecture',
    difficulty: 4,
    duration: 40,
    prerequisites: ['self-attention'],
    objectives: [
      'Understand positional encoding',
      'Trace through encoder/decoder',
      'Explore residual connections',
      'Build a mini-transformer'
    ],
    gradient: ['#0ea5e9', '#0284c7'],
  },

  // Vision Transformers
  'patch-embedding': {
    id: 'patch-embedding',
    title: 'Patch Embedding',
    description: 'Splitting images into patches for transformer processing',
    icon: 'LayoutGrid',
    path: '/learn/vit/patch-embedding',
    difficulty: 3,
    duration: 25,
    prerequisites: ['image-matrix', 'transformer-arch'],
    objectives: [
      'Split images into patches',
      'Create linear embeddings',
      'Add positional information',
      'Prepare visual tokens'
    ],
    gradient: ['#d946ef', '#c026d3'],
  },
  'vit-architecture': {
    id: 'vit-architecture',
    title: 'Vision Transformer (ViT)',
    description: 'Transformers for images - the modern approach to computer vision',
    icon: 'Scan',
    path: '/learn/vit/architecture',
    difficulty: 4,
    duration: 35,
    prerequisites: ['patch-embedding'],
    objectives: [
      'Understand the CLS token',
      'Process patches through transformer',
      'Compare ViT vs CNN',
      'Explore hybrid approaches'
    ],
    gradient: ['#6366f1', '#4f46e5'],
  },
  'vision-encoder': {
    id: 'vision-encoder',
    title: 'Vision Encoders',
    description: 'Encoding images into rich representations for downstream tasks',
    icon: 'Cpu',
    path: '/learn/vit/encoder',
    difficulty: 4,
    duration: 30,
    prerequisites: ['vit-architecture'],
    objectives: [
      'Understand visual representations',
      'Explore CLIP-style encoders',
      'Learn about contrastive learning',
      'Use encoders for transfer learning'
    ],
    gradient: ['#10b981', '#059669'],
  },

  // Vision-Language-Action Models
  'multimodal-fusion': {
    id: 'multimodal-fusion',
    title: 'Multimodal Fusion',
    description: 'Combining vision and language into unified representations',
    icon: 'Combine',
    path: '/learn/vla/fusion',
    difficulty: 4,
    duration: 30,
    prerequisites: ['vision-encoder', 'transformer-arch'],
    objectives: [
      'Align visual and text embeddings',
      'Explore cross-attention',
      'Understand joint representations',
      'Build multimodal models'
    ],
    gradient: ['#f97316', '#ea580c'],
  },
  'action-prediction': {
    id: 'action-prediction',
    title: 'Action Prediction',
    description: 'From understanding to action - how robots decide what to do',
    icon: 'Move3D',
    path: '/learn/vla/action',
    difficulty: 4,
    duration: 35,
    prerequisites: ['multimodal-fusion'],
    objectives: [
      'Tokenize robot actions',
      'Learn action policies',
      'Understand imitation learning',
      'Generate action sequences'
    ],
    gradient: ['#ef4444', '#dc2626'],
  },
  'vla-complete': {
    id: 'vla-complete',
    title: 'VLA Models',
    description: 'The complete pipeline - from camera to robot arm',
    icon: 'Bot',
    path: '/learn/vla/complete',
    difficulty: 5,
    duration: 45,
    prerequisites: ['action-prediction'],
    objectives: [
      'Trace the full VLA pipeline',
      'Understand RT-2, OpenVLA',
      'Explore embodied AI',
      'Build your own VLA system'
    ],
    gradient: ['#8b5cf6', '#7c3aed'],
  },

  // Generative Models for Actions
  'diffusion': {
    id: 'diffusion',
    title: 'Diffusion Models',
    description: 'Learning to denoise - the foundation of modern generative AI',
    icon: 'Sparkles',
    path: '/learn/generative/diffusion',
    difficulty: 4,
    duration: 40,
    prerequisites: ['backprop', 'statistics'],
    objectives: [
      'Understand the forward diffusion process',
      'Learn reverse denoising',
      'Explore noise schedules',
      'Build a simple diffusion model'
    ],
    gradient: ['#ec4899', '#be185d'],
  },
  'flow-matching': {
    id: 'flow-matching',
    title: 'Flow Matching',
    description: 'Continuous normalizing flows - elegant generative modeling',
    icon: 'Wind',
    path: '/learn/generative/flow-matching',
    difficulty: 4,
    duration: 35,
    prerequisites: ['diffusion', 'calculus'],
    objectives: [
      'Understand optimal transport',
      'Learn conditional flow matching',
      'Compare to diffusion models',
      'Apply to trajectory generation'
    ],
    gradient: ['#06b6d4', '#0e7490'],
  },
  'diffusion-policy': {
    id: 'diffusion-policy',
    title: 'Diffusion Policy',
    description: 'Using diffusion models for robot action generation',
    icon: 'Workflow',
    path: '/learn/generative/diffusion-policy',
    difficulty: 5,
    duration: 40,
    prerequisites: ['flow-matching', 'action-prediction'],
    objectives: [
      'Generate action trajectories',
      'Understand action chunking',
      'Explore policy architectures',
      'Implement diffusion policies'
    ],
    gradient: ['#a855f7', '#7e22ce'],
  },

  // Robotics Fundamentals
  'kinematics': {
    id: 'kinematics',
    title: 'Robot Kinematics',
    description: 'The geometry of motion - how robot joints create movement',
    icon: 'Axis3D',
    path: '/learn/robotics/kinematics',
    difficulty: 3,
    duration: 35,
    prerequisites: ['linear-algebra', 'calculus'],
    objectives: [
      'Understand forward kinematics',
      'Learn inverse kinematics',
      'Explore Denavit-Hartenberg parameters',
      'Visualize robot arm configurations'
    ],
    gradient: ['#f97316', '#c2410c'],
  },
  'dynamics': {
    id: 'dynamics',
    title: 'Robot Dynamics',
    description: 'Forces and torques - the physics of robot motion',
    icon: 'Activity',
    path: '/learn/robotics/dynamics',
    difficulty: 3,
    duration: 30,
    prerequisites: ['kinematics'],
    objectives: [
      'Understand equations of motion',
      'Learn about inertia and torque',
      'Explore Lagrangian mechanics',
      'Simulate robot dynamics'
    ],
    gradient: ['#eab308', '#a16207'],
  },
  'control-theory': {
    id: 'control-theory',
    title: 'Control Theory',
    description: 'PID, MPC, and beyond - making robots move precisely',
    icon: 'Settings',
    path: '/learn/robotics/control-theory',
    difficulty: 4,
    duration: 40,
    prerequisites: ['dynamics', 'calculus'],
    objectives: [
      'Understand PID control',
      'Learn model predictive control (MPC)',
      'Explore trajectory tracking',
      'Tune controllers interactively'
    ],
    gradient: ['#22c55e', '#15803d'],
  },
  'motion-planning': {
    id: 'motion-planning',
    title: 'Motion Planning',
    description: 'Finding collision-free paths through space',
    icon: 'Route',
    path: '/learn/robotics/motion-planning',
    difficulty: 4,
    duration: 35,
    prerequisites: ['kinematics', 'control-theory'],
    objectives: [
      'Understand configuration space',
      'Learn RRT and PRM algorithms',
      'Explore trajectory optimization',
      'Plan robot arm movements'
    ],
    gradient: ['#3b82f6', '#1d4ed8'],
  },
};

// =============================================================================
// CATEGORY DEFINITIONS
// =============================================================================

export const CATEGORIES: LearningCategory[] = [
  {
    id: 'math',
    name: 'Mathematical Foundations',
    description: 'The essential math that powers all of AI',
    color: '#f97316',
    modules: [
      MODULES['calculus'],
      MODULES['linear-algebra'],
      MODULES['statistics'],
    ],
  },
  {
    id: 'nn',
    name: 'Neural Network Basics',
    description: 'Building blocks of deep learning',
    color: '#22c55e',
    modules: [
      MODULES['neurons'],
      MODULES['activations'],
      MODULES['backprop'],
      MODULES['mlp'],
    ],
  },
  {
    id: 'cnn',
    name: 'Convolutional Neural Networks',
    description: 'How computers learn to see',
    color: '#3b82f6',
    modules: [
      MODULES['image-matrix'],
      MODULES['convolution'],
      MODULES['pooling'],
      MODULES['cnn-architecture'],
    ],
  },
  {
    id: 'transformers',
    name: 'Transformers & Attention',
    description: 'The architecture behind modern AI',
    color: '#f59e0b',
    modules: [
      MODULES['attention'],
      MODULES['self-attention'],
      MODULES['transformer-arch'],
    ],
  },
  {
    id: 'vit',
    name: 'Vision Transformers',
    description: 'Applying transformers to images',
    color: '#d946ef',
    modules: [
      MODULES['patch-embedding'],
      MODULES['vit-architecture'],
      MODULES['vision-encoder'],
    ],
  },
  {
    id: 'vla',
    name: 'Vision-Language-Action',
    description: 'The future of robotics and embodied AI',
    color: '#8b5cf6',
    modules: [
      MODULES['multimodal-fusion'],
      MODULES['action-prediction'],
      MODULES['vla-complete'],
    ],
  },
  {
    id: 'generative',
    name: 'Generative Models for Actions',
    description: 'Diffusion and flow-based models for robot policy learning',
    color: '#ec4899',
    modules: [
      MODULES['diffusion'],
      MODULES['flow-matching'],
      MODULES['diffusion-policy'],
    ],
  },
  {
    id: 'robotics',
    name: 'Robotics Fundamentals',
    description: 'Kinematics, dynamics, and control theory for embodied AI',
    color: '#f97316',
    modules: [
      MODULES['kinematics'],
      MODULES['dynamics'],
      MODULES['control-theory'],
      MODULES['motion-planning'],
    ],
  },
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get a module by ID.
 */
export const getModule = (id: string): LearningModule | undefined => {
  return MODULES[id];
};

/**
 * Get all modules in order of learning path.
 */
export const getLearningPath = (): LearningModule[] => {
  return CATEGORIES.flatMap(cat => cat.modules);
};

/**
 * Check if a module is unlocked based on completed prerequisites.
 */
export const isModuleUnlocked = (
  moduleId: string, 
  completedModules: string[]
): boolean => {
  const module = MODULES[moduleId];
  if (!module) return false;
  return module.prerequisites.every(prereq => completedModules.includes(prereq));
};

/**
 * Get the next recommended module.
 */
export const getNextModule = (completedModules: string[]): LearningModule | null => {
  const path = getLearningPath();
  return path.find(m => 
    !completedModules.includes(m.id) && 
    isModuleUnlocked(m.id, completedModules)
  ) || null;
};

/**
 * Calculate overall progress percentage.
 */
export const calculateProgress = (completedModules: string[]): number => {
  const total = Object.keys(MODULES).length;
  return Math.round((completedModules.length / total) * 100);
};
