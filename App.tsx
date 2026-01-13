/**
 * @fileoverview Main Application - VLA Learning Lab.
 * 
 * Interactive learning platform covering the complete journey from
 * mathematical foundations to Vision-Language-Action models.
 * 
 * @module App
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import HomePage from './src/pages/HomePage';
import CurriculumPage from './src/pages/CurriculumPage';

// Learning Modules
import { CalculusModule, LinearAlgebraModule, StatisticsModule } from './src/modules/math';
import { NeuronsModule, ActivationsModule, BackpropModule, MLPModule } from './src/modules/nn';
import { AttentionModule, SelfAttentionModule, TransformerArchModule } from './src/modules/transformers';
import { ViTModule, PatchEmbeddingModule, VisionEncoderModule } from './src/modules/vit';
import { VLAModule } from './src/modules/vla';
import { DiffusionModule, FlowMatchingModule, DiffusionPolicyModule } from './src/modules/generative';
import { KinematicsModule, DynamicsModule, ControlTheoryModule, MotionPlanningModule } from './src/modules/robotics';

// Legacy CNN Lab (preserved)
import CNNLab from './src/legacy/CNNLab';

// =============================================================================
// MAIN APP WITH ROUTING
// =============================================================================

/**
 * Main Application Component with React Router.
 */
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home & Navigation */}
        <Route path="/" element={<HomePage />} />
        <Route path="/curriculum" element={<CurriculumPage />} />

        {/* Math Foundations */}
        <Route path="/learn/math/calculus" element={<CalculusModule />} />
        <Route path="/learn/math/linear-algebra" element={<LinearAlgebraModule />} />
        <Route path="/learn/math/statistics" element={<StatisticsModule />} />
        
        {/* Neural Network Basics */}
        <Route path="/learn/nn/neurons" element={<NeuronsModule />} />
        <Route path="/learn/nn/activations" element={<ActivationsModule />} />
        <Route path="/learn/nn/backprop" element={<BackpropModule />} />
        <Route path="/learn/nn/mlp" element={<MLPModule />} />
        
        {/* CNN - All routes use CNNLab with camera input */}
        <Route path="/learn/cnn/image-matrix" element={<CNNLab />} />
        <Route path="/learn/cnn/convolution" element={<CNNLab />} />
        <Route path="/learn/cnn/pooling" element={<CNNLab />} />
        <Route path="/learn/cnn/architecture" element={<CNNLab />} />
        
        {/* Transformers */}
        <Route path="/learn/transformers/attention" element={<AttentionModule />} />
        <Route path="/learn/transformers/self-attention" element={<SelfAttentionModule />} />
        <Route path="/learn/transformers/architecture" element={<TransformerArchModule />} />
        
        {/* Vision Transformers */}
        <Route path="/learn/vit/patch-embedding" element={<PatchEmbeddingModule />} />
        <Route path="/learn/vit/architecture" element={<ViTModule />} />
        <Route path="/learn/vit/encoder" element={<VisionEncoderModule />} />
        
        {/* VLA Models */}
        <Route path="/learn/vla/fusion" element={<VLAModule />} />
        <Route path="/learn/vla/action" element={<VLAModule />} />
        <Route path="/learn/vla/complete" element={<VLAModule />} />
        
        {/* Generative Models for Actions */}
        <Route path="/learn/generative/diffusion" element={<DiffusionModule />} />
        <Route path="/learn/generative/flow-matching" element={<FlowMatchingModule />} />
        <Route path="/learn/generative/diffusion-policy" element={<DiffusionPolicyModule />} />
        
        {/* Robotics Fundamentals */}
        <Route path="/learn/robotics/kinematics" element={<KinematicsModule />} />
        <Route path="/learn/robotics/dynamics" element={<DynamicsModule />} />
        <Route path="/learn/robotics/control-theory" element={<ControlTheoryModule />} />
        <Route path="/learn/robotics/motion-planning" element={<MotionPlanningModule />} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
