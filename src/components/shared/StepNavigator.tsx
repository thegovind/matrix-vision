/**
 * @fileoverview Step navigator for multi-step demos.
 */

import React from 'react';

interface Step {
  title: string;
  desc: string;
}

interface StepNavigatorProps {
  steps: Step[];
  currentStep: number;
  onStepChange: (step: number) => void;
  onComplete: () => void;
  children: React.ReactNode;
}

const StepNavigator: React.FC<StepNavigatorProps> = ({
  steps,
  currentStep,
  onStepChange,
  onComplete,
  children,
}) => {
  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  return (
    <>
      {/* Content */}
      <div className="p-6">
        {/* Progress dots */}
        <div className="flex items-center justify-center gap-1.5 mb-6">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => onStepChange(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentStep 
                  ? 'w-6 bg-violet-500' 
                  : i < currentStep 
                    ? 'bg-violet-500/50' 
                    : 'bg-white/20'
              }`}
            />
          ))}
        </div>

        {/* Step header */}
        <div className="text-center mb-6">
          <div className="text-xs text-violet-400 font-medium uppercase tracking-wider mb-1">
            Step {currentStep + 1} of {steps.length}
          </div>
          <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
          <p className="text-neutral-400 text-sm max-w-md mx-auto">{step.desc}</p>
        </div>

        {/* Visual content */}
        <div className="bg-black/30 rounded-xl p-6 min-h-[200px] flex items-center justify-center">
          {children}
        </div>
      </div>

      {/* Navigation */}
      <div className="px-6 py-4 border-t border-white/10 bg-black/20 flex items-center justify-between">
        <button
          onClick={() => onStepChange(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="px-4 py-2 rounded-lg text-sm text-neutral-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={() => isLastStep ? onComplete() : onStepChange(currentStep + 1)}
          className="px-6 py-2 rounded-lg text-sm font-medium bg-violet-500 text-white hover:bg-violet-600 transition-colors"
        >
          {isLastStep ? 'Complete!' : 'Next →'}
        </button>
      </div>
    </>
  );
};

export default StepNavigator;
