/**
 * @fileoverview Core type definitions for the VLA Learning Lab.
 * 
 * This file contains all TypeScript interfaces and types used throughout
 * the application, organized by domain.
 */

// =============================================================================
// LEARNING PATH & CURRICULUM TYPES
// =============================================================================

/**
 * Represents a learning module in the curriculum.
 */
export interface LearningModule {
  /** Unique identifier for the module */
  id: string;
  /** Display title */
  title: string;
  /** Short description */
  description: string;
  /** Icon name from lucide-react */
  icon: string;
  /** Route path */
  path: string;
  /** Difficulty level (1-5) */
  difficulty: number;
  /** Estimated time to complete (in minutes) */
  duration: number;
  /** Prerequisites (module IDs) */
  prerequisites: string[];
  /** Learning objectives */
  objectives: string[];
  /** Completion status */
  completed?: boolean;
  /** Gradient colors for UI */
  gradient: [string, string];
}

/**
 * A category grouping related modules.
 */
export interface LearningCategory {
  id: string;
  name: string;
  description: string;
  modules: LearningModule[];
  color: string;
}

/**
 * User's learning progress.
 */
export interface LearningProgress {
  completedModules: string[];
  currentModule: string | null;
  totalTimeSpent: number;
  lastAccessed: Date;
}

// =============================================================================
// PIXEL & IMAGE TYPES (from original)
// =============================================================================

/**
 * Represents the color data for a single pixel.
 */
export interface PixelData {
  r: number;
  g: number;
  b: number;
  a: number;
  hex: string;
  gray: number;
}

/**
 * Display modes for the matrix visualizer.
 */
export type MatrixMode = 'rgb' | 'hex' | 'gray';

// =============================================================================
// KERNEL & ALGORITHM TYPES
// =============================================================================

/**
 * A 3x3 convolution kernel matrix.
 */
export type Kernel = [
  [number, number, number],
  [number, number, number],
  [number, number, number]
];

/**
 * Algorithm configuration with educational content.
 */
export interface AlgorithmInfo {
  name: string;
  description: string;
  kernel: Kernel;
  divisor: number;
  learn: string;
  formula: string;
  deepDive: {
    whatItDoes: string;
    howItWorks: string;
    mathExplained: string;
    realWorld: string[];
    funFact: string;
  };
}

// =============================================================================
// DEMO COMPONENT TYPES
// =============================================================================

/**
 * Props for interactive demo modal components.
 */
export interface DemoProps {
  onClose: () => void;
}

/**
 * Step configuration for interactive demos.
 */
export interface DemoStep {
  title: string;
  desc: string;
  visual: string;
}

// =============================================================================
// MATH VISUALIZATION TYPES
// =============================================================================

/**
 * Point in 2D space.
 */
export interface Point2D {
  x: number;
  y: number;
}

/**
 * Point in 3D space.
 */
export interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Vector representation.
 */
export interface Vector {
  components: number[];
  label?: string;
  color?: string;
}

/**
 * Matrix representation for linear algebra demos.
 */
export interface Matrix {
  rows: number;
  cols: number;
  data: number[][];
  label?: string;
}

// =============================================================================
// NEURAL NETWORK TYPES
// =============================================================================

/**
 * Single neuron in a network.
 */
export interface Neuron {
  id: string;
  value: number;
  bias: number;
  activated: number;
  layer: number;
  index: number;
}

/**
 * Connection between neurons.
 */
export interface Connection {
  from: string;
  to: string;
  weight: number;
}

/**
 * Neural network layer.
 */
export interface NetworkLayer {
  id: string;
  name: string;
  neurons: Neuron[];
  activation: ActivationType;
}

/**
 * Supported activation functions.
 */
export type ActivationType = 'relu' | 'sigmoid' | 'tanh' | 'softmax' | 'linear';

/**
 * Complete neural network for visualization.
 */
export interface NeuralNetwork {
  layers: NetworkLayer[];
  connections: Connection[];
}

// =============================================================================
// TRANSFORMER TYPES
// =============================================================================

/**
 * Attention head visualization.
 */
export interface AttentionHead {
  id: number;
  queryWeights: number[][];
  keyWeights: number[][];
  valueWeights: number[][];
  attentionScores: number[][];
}

/**
 * Token in a sequence.
 */
export interface Token {
  id: number;
  text: string;
  embedding: number[];
  position: number;
}

/**
 * Transformer layer configuration.
 */
export interface TransformerLayer {
  id: number;
  heads: AttentionHead[];
  mlpOutput: number[][];
}

// =============================================================================
// VISION TRANSFORMER TYPES
// =============================================================================

/**
 * Image patch for ViT.
 */
export interface ImagePatch {
  id: number;
  row: number;
  col: number;
  pixels: number[][];
  embedding: number[];
}

/**
 * Vision Transformer configuration.
 */
export interface ViTConfig {
  imageSize: number;
  patchSize: number;
  numPatches: number;
  embeddingDim: number;
  numHeads: number;
  numLayers: number;
}

// =============================================================================
// VLA MODEL TYPES
// =============================================================================

/**
 * Action output from VLA model.
 */
export interface RobotAction {
  type: 'move' | 'rotate' | 'grasp' | 'release';
  parameters: number[];
  confidence: number;
}

/**
 * VLA model state.
 */
export interface VLAState {
  imageInput: number[][];
  languageInput: string;
  encodedVision: number[];
  encodedLanguage: number[];
  fusedRepresentation: number[];
  actionOutput: RobotAction[];
}

// =============================================================================
// UI STATE TYPES
// =============================================================================

/**
 * Camera connection status.
 */
export type CameraStatus = 'idle' | 'connecting' | 'initializing' | 'ready' | 'error';

/**
 * Input source mode.
 */
export type SourceMode = 'upload' | 'camera';

/**
 * Modal identifiers for the learning system.
 */
export type LearnModalType = 
  | 'identity' 
  | 'edge-detection' 
  | 'gaussian-blur' 
  | 'sharpen'
  | 'convolution'
  | 'kernel'
  | 'matrix'
  | null;
