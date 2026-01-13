/**
 * @fileoverview Interactive Linear Algebra Module - Vectors, Matrices, Transformations.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, StepNavigator } from '../../components/shared';
import { Grid3X3, ArrowRight, RotateCcw, X } from 'lucide-react';

const STEPS = [
  {
    title: 'Vectors: Direction & Magnitude',
    desc: 'A vector is an arrow with direction and length. Click to create vectors and see their components!',
  },
  {
    title: 'Vector Operations',
    desc: 'Addition combines vectors tip-to-tail. Scalar multiplication stretches or shrinks them.',
  },
  {
    title: 'Matrices: Grids of Numbers',
    desc: 'A matrix is a 2D array. Each element has a row and column index.',
  },
  {
    title: 'Matrix-Vector Multiplication',
    desc: 'Multiplying a matrix by a vector transforms the vector. This is how neural networks work!',
  },
  {
    title: 'Linear Transformations',
    desc: 'Rotation, scaling, shearing - all are matrix multiplications. Drag to see the transformation!',
  },
  {
    title: 'The Dot Product',
    desc: 'The dot product measures similarity between vectors. Essential for attention mechanisms!',
  },
];

const LinearAlgebraModule: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [vector1, setVector1] = useState({ x: 2, y: 1 });
  const [vector2, setVector2] = useState({ x: 1, y: 2 });
  const [transformAngle, setTransformAngle] = useState(0);
  const [transformScale, setTransformScale] = useState(1);

  const renderVisual = () => {
    switch (step) {
      case 0:
        return <VectorBasicsVisual vector={vector1} setVector={setVector1} />;
      case 1:
        return <VectorOpsVisual v1={vector1} v2={vector2} setV1={setVector1} setV2={setVector2} />;
      case 2:
        return <MatrixIntroVisual />;
      case 3:
        return <MatrixVectorVisual />;
      case 4:
        return (
          <TransformVisual 
            angle={transformAngle} 
            setAngle={setTransformAngle}
            scale={transformScale}
            setScale={setTransformScale} 
          />
        );
      case 5:
        return <DotProductVisual v1={vector1} v2={vector2} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header 
        showBreadcrumb 
        breadcrumb={[
          { label: 'Math', path: '/curriculum#math' },
          { label: 'Linear Algebra', path: '/learn/math/linear-algebra' },
        ]} 
      />

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 bg-gradient-to-r from-violet-500/10 to-violet-500/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
                  <Grid3X3 size={20} className="text-violet-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Linear Algebra</h2>
                  <p className="text-xs text-neutral-500">Vectors, matrices, and transformations</p>
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

// Vector basics
const VectorBasicsVisual: React.FC<{
  vector: { x: number; y: number };
  setVector: (v: { x: number; y: number }) => void;
}> = ({ vector, setVector }) => {
  const magnitude = Math.sqrt(vector.x ** 2 + vector.y ** 2);

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div 
          className="relative bg-black/50 rounded-lg cursor-crosshair"
          style={{ width: 250, height: 250 }}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
            const y = -((e.clientY - rect.top) / rect.height - 0.5) * 6;
            setVector({ x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 });
          }}
        >
          {/* Grid */}
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-20">
            {Array.from({ length: 36 }).map((_, i) => (
              <div key={i} className="border border-white/20" />
            ))}
          </div>

          {/* Axes */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/30" />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-white/30" />

          {/* Vector arrow */}
          <svg className="absolute inset-0" viewBox="0 0 250 250">
            <defs>
              <marker id="arrowV" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
              </marker>
            </defs>
            <line
              x1="125"
              y1="125"
              x2={125 + vector.x * 250 / 6}
              y2={125 - vector.y * 250 / 6}
              stroke="#8b5cf6"
              strokeWidth="3"
              markerEnd="url(#arrowV)"
            />
          </svg>

          {/* Component lines */}
          <div 
            className="absolute h-px bg-red-400/50"
            style={{
              left: '50%',
              top: '50%',
              width: Math.abs(vector.x) * 250 / 6,
              transform: `translateX(${vector.x > 0 ? 0 : -100}%)`
            }}
          />
          <div 
            className="absolute w-px bg-green-400/50"
            style={{
              left: `${50 + vector.x * 100 / 6}%`,
              top: vector.y > 0 ? `${50 - vector.y * 100 / 6}%` : '50%',
              height: Math.abs(vector.y) * 250 / 6,
            }}
          />
        </div>
      </div>

      <div className="bg-violet-500/10 border border-violet-500/20 rounded-lg p-4 text-center">
        <div className="font-mono text-lg mb-2">
          v⃗ = (<span className="text-red-400">{vector.x}</span>, <span className="text-green-400">{vector.y}</span>)
        </div>
        <div className="text-sm text-neutral-400">
          |v⃗| = √({vector.x}² + {vector.y}²) = <span className="text-violet-400">{magnitude.toFixed(2)}</span>
        </div>
        <p className="text-[10px] text-neutral-500 mt-2">Click anywhere to change the vector</p>
      </div>
    </div>
  );
};

// Vector operations
const VectorOpsVisual: React.FC<{
  v1: { x: number; y: number };
  v2: { x: number; y: number };
  setV1: (v: { x: number; y: number }) => void;
  setV2: (v: { x: number; y: number }) => void;
}> = ({ v1, v2 }) => {
  const sum = { x: v1.x + v2.x, y: v1.y + v2.y };

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="relative bg-black/50 rounded-lg" style={{ width: 280, height: 220 }}>
          {/* Axes */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20" />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-white/20" />

          <svg className="absolute inset-0" viewBox="0 0 280 220">
            <defs>
              <marker id="arrBlue" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="#3b82f6" />
              </marker>
              <marker id="arrGreen" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="#22c55e" />
              </marker>
              <marker id="arrPurple" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="#8b5cf6" />
              </marker>
            </defs>

            {/* Vector 1 from origin */}
            <line
              x1="140" y1="110"
              x2={140 + v1.x * 25} y2={110 - v1.y * 25}
              stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrBlue)"
            />

            {/* Vector 2 from tip of v1 */}
            <line
              x1={140 + v1.x * 25} y1={110 - v1.y * 25}
              x2={140 + sum.x * 25} y2={110 - sum.y * 25}
              stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrGreen)"
              strokeDasharray="4"
            />

            {/* Sum vector */}
            <line
              x1="140" y1="110"
              x2={140 + sum.x * 25} y2={110 - sum.y * 25}
              stroke="#8b5cf6" strokeWidth="3" markerEnd="url(#arrPurple)"
            />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-sm">
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-2">
          <div className="text-blue-400 text-xs mb-1">v⃗₁</div>
          <div className="font-mono">({v1.x}, {v1.y})</div>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-2">
          <div className="text-green-400 text-xs mb-1">v⃗₂</div>
          <div className="font-mono">({v2.x}, {v2.y})</div>
        </div>
        <div className="bg-violet-500/10 border border-violet-500/20 rounded-lg p-2">
          <div className="text-violet-400 text-xs mb-1">v⃗₁ + v⃗₂</div>
          <div className="font-mono">({sum.x}, {sum.y})</div>
        </div>
      </div>

      <p className="text-[10px] text-neutral-500 text-center">
        Vector addition: place the second vector at the tip of the first
      </p>
    </div>
  );
};

// Matrix introduction
const MatrixIntroVisual: React.FC = () => {
  const [hoveredCell, setHoveredCell] = useState<[number, number] | null>(null);
  const matrix = [
    [1, 2, 3],
    [4, 5, 6],
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="bg-black/50 rounded-lg p-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl text-neutral-500">[</span>
            <div className="grid grid-cols-3 gap-2">
              {matrix.map((row, i) =>
                row.map((val, j) => (
                  <button
                    key={`${i}-${j}`}
                    onMouseEnter={() => setHoveredCell([i, j])}
                    onMouseLeave={() => setHoveredCell(null)}
                    className={`w-12 h-12 rounded-lg font-mono text-lg flex items-center justify-center transition-all
                      ${hoveredCell?.[0] === i && hoveredCell?.[1] === j 
                        ? 'bg-violet-500 text-white scale-110' 
                        : 'bg-white/10 text-neutral-300 hover:bg-white/20'}`}
                  >
                    {val}
                  </button>
                ))
              )}
            </div>
            <span className="text-2xl text-neutral-500">]</span>
          </div>
        </div>
      </div>

      <div className="bg-violet-500/10 border border-violet-500/20 rounded-lg p-4 text-center">
        <div className="text-sm mb-2">
          This is a <span className="text-violet-400">2×3</span> matrix (2 rows, 3 columns)
        </div>
        {hoveredCell && (
          <div className="font-mono text-sm">
            A[<span className="text-orange-400">{hoveredCell[0]}</span>][<span className="text-blue-400">{hoveredCell[1]}</span>] = 
            <span className="text-violet-400"> {matrix[hoveredCell[0]][hoveredCell[1]]}</span>
          </div>
        )}
        <p className="text-[10px] text-neutral-500 mt-2">Hover over cells to see their indices</p>
      </div>
    </div>
  );
};

// Matrix-vector multiplication
const MatrixVectorVisual: React.FC = () => {
  const matrix = [[2, 0], [0, 3]];
  const vector = [1, 1];
  const result = [
    matrix[0][0] * vector[0] + matrix[0][1] * vector[1],
    matrix[1][0] * vector[0] + matrix[1][1] * vector[1],
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-4">
        {/* Matrix */}
        <div className="text-center">
          <div className="text-xs text-neutral-500 mb-2">Matrix A</div>
          <div className="flex items-center">
            <span className="text-lg text-neutral-500">[</span>
            <div className="grid grid-cols-2 gap-1">
              {matrix.flat().map((v, i) => (
                <div key={i} className="w-8 h-8 bg-blue-500/20 rounded flex items-center justify-center font-mono text-blue-300">
                  {v}
                </div>
              ))}
            </div>
            <span className="text-lg text-neutral-500">]</span>
          </div>
        </div>

        <span className="text-neutral-500">×</span>

        {/* Vector */}
        <div className="text-center">
          <div className="text-xs text-neutral-500 mb-2">Vector v⃗</div>
          <div className="flex items-center">
            <span className="text-lg text-neutral-500">[</span>
            <div className="grid grid-cols-1 gap-1">
              {vector.map((v, i) => (
                <div key={i} className="w-8 h-8 bg-green-500/20 rounded flex items-center justify-center font-mono text-green-300">
                  {v}
                </div>
              ))}
            </div>
            <span className="text-lg text-neutral-500">]</span>
          </div>
        </div>

        <span className="text-neutral-500">=</span>

        {/* Result */}
        <div className="text-center">
          <div className="text-xs text-neutral-500 mb-2">Result</div>
          <div className="flex items-center">
            <span className="text-lg text-neutral-500">[</span>
            <div className="grid grid-cols-1 gap-1">
              {result.map((v, i) => (
                <div key={i} className="w-8 h-8 bg-violet-500/20 rounded flex items-center justify-center font-mono text-violet-300">
                  {v}
                </div>
              ))}
            </div>
            <span className="text-lg text-neutral-500">]</span>
          </div>
        </div>
      </div>

      <div className="bg-violet-500/10 border border-violet-500/20 rounded-lg p-4">
        <div className="text-xs text-center text-neutral-400 mb-2">Each output = row × column (dot product)</div>
        <div className="font-mono text-sm text-center">
          <div><span className="text-violet-400">{result[0]}</span> = <span className="text-blue-300">2</span>×<span className="text-green-300">1</span> + <span className="text-blue-300">0</span>×<span className="text-green-300">1</span></div>
          <div><span className="text-violet-400">{result[1]}</span> = <span className="text-blue-300">0</span>×<span className="text-green-300">1</span> + <span className="text-blue-300">3</span>×<span className="text-green-300">1</span></div>
        </div>
      </div>
    </div>
  );
};

// Linear transformation
const TransformVisual: React.FC<{
  angle: number;
  setAngle: (a: number) => void;
  scale: number;
  setScale: (s: number) => void;
}> = ({ angle, setAngle, scale, setScale }) => {
  const radians = (angle * Math.PI) / 180;
  const cos = Math.cos(radians) * scale;
  const sin = Math.sin(radians) * scale;

  // Original unit square corners
  const original = [[0, 0], [1, 0], [1, 1], [0, 1]];
  
  // Transform points
  const transformed = original.map(([x, y]) => [
    cos * x - sin * y,
    sin * x + cos * y,
  ]);

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="relative bg-black/50 rounded-lg" style={{ width: 250, height: 200 }}>
          {/* Grid */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[160px] grid grid-cols-4 grid-rows-4 opacity-10">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="border border-white" />
            ))}
          </div>

          <svg className="absolute inset-0" viewBox="0 0 250 200">
            {/* Original square */}
            <polygon
              points={original.map(([x, y]) => `${125 + x * 50},${100 - y * 50}`).join(' ')}
              fill="rgba(59, 130, 246, 0.2)"
              stroke="#3b82f6"
              strokeWidth="1"
              strokeDasharray="4"
            />
            
            {/* Transformed square */}
            <polygon
              points={transformed.map(([x, y]) => `${125 + x * 50},${100 - y * 50}`).join(' ')}
              fill="rgba(139, 92, 246, 0.3)"
              stroke="#8b5cf6"
              strokeWidth="2"
            />

            {/* Axes */}
            <line x1="125" y1="180" x2="125" y2="20" stroke="white" strokeWidth="0.5" opacity="0.3" />
            <line x1="20" y1="100" x2="230" y2="100" stroke="white" strokeWidth="0.5" opacity="0.3" />
          </svg>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
        <div>
          <div className="flex justify-between text-xs text-neutral-500 mb-1">
            <span>Rotation</span>
            <span>{angle}°</span>
          </div>
          <input
            type="range"
            min="0"
            max="360"
            value={angle}
            onChange={(e) => setAngle(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <div className="flex justify-between text-xs text-neutral-500 mb-1">
            <span>Scale</span>
            <span>{scale.toFixed(1)}×</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={scale}
            onChange={(e) => setScale(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="bg-violet-500/10 border border-violet-500/20 rounded-lg p-3 text-center font-mono text-sm">
        <span className="text-neutral-500">Transform matrix: </span>
        [{cos.toFixed(2)}, {(-sin).toFixed(2)}; {sin.toFixed(2)}, {cos.toFixed(2)}]
      </div>
    </div>
  );
};

// Dot product
const DotProductVisual: React.FC<{
  v1: { x: number; y: number };
  v2: { x: number; y: number };
}> = ({ v1, v2 }) => {
  const dotProduct = v1.x * v2.x + v1.y * v2.y;
  const mag1 = Math.sqrt(v1.x ** 2 + v1.y ** 2);
  const mag2 = Math.sqrt(v2.x ** 2 + v2.y ** 2);
  const cosAngle = dotProduct / (mag1 * mag2);
  const angleDeg = Math.acos(Math.max(-1, Math.min(1, cosAngle))) * 180 / Math.PI;

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="relative bg-black/50 rounded-lg" style={{ width: 200, height: 200 }}>
          <svg className="absolute inset-0" viewBox="0 0 200 200">
            <defs>
              <marker id="arr1" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="#3b82f6" />
              </marker>
              <marker id="arr2" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="#22c55e" />
              </marker>
            </defs>

            {/* Vector 1 */}
            <line
              x1="100" y1="100"
              x2={100 + v1.x * 25} y2={100 - v1.y * 25}
              stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arr1)"
            />

            {/* Vector 2 */}
            <line
              x1="100" y1="100"
              x2={100 + v2.x * 25} y2={100 - v2.y * 25}
              stroke="#22c55e" strokeWidth="3" markerEnd="url(#arr2)"
            />

            {/* Angle arc */}
            <path
              d={`M ${100 + 20 * v1.x / mag1} ${100 - 20 * v1.y / mag1} 
                  A 20 20 0 0 ${v1.x * v2.y - v1.y * v2.x > 0 ? 1 : 0} 
                  ${100 + 20 * v2.x / mag2} ${100 - 20 * v2.y / mag2}`}
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>

      <div className="bg-violet-500/10 border border-violet-500/20 rounded-lg p-4 text-center">
        <div className="font-mono text-sm mb-2">
          v⃗₁ · v⃗₂ = x₁x₂ + y₁y₂
        </div>
        <div className="font-mono mb-2">
          (<span className="text-blue-400">{v1.x}</span>)(<span className="text-green-400">{v2.x}</span>) + 
          (<span className="text-blue-400">{v1.y}</span>)(<span className="text-green-400">{v2.y}</span>) = 
          <span className="text-violet-400 text-lg"> {dotProduct}</span>
        </div>
        <div className="text-sm text-neutral-400">
          Angle between vectors: <span className="text-violet-400">{angleDeg.toFixed(1)}°</span>
        </div>
      </div>

      <div className="text-[10px] text-neutral-500 text-center">
        {dotProduct > 0 ? 'Positive: vectors point in similar directions' :
         dotProduct < 0 ? 'Negative: vectors point in opposite directions' :
         'Zero: vectors are perpendicular'}
      </div>
    </div>
  );
};

export default LinearAlgebraModule;
