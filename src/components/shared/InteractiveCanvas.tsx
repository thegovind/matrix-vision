/**
 * @fileoverview Interactive canvas component for visualizations.
 */

import React, { useRef, useEffect, useCallback } from 'react';

interface InteractiveCanvasProps {
  width: number;
  height: number;
  draw: (ctx: CanvasRenderingContext2D, frame: number) => void;
  onMouseMove?: (x: number, y: number) => void;
  onClick?: (x: number, y: number) => void;
  className?: string;
}

const InteractiveCanvas: React.FC<InteractiveCanvasProps> = ({
  width,
  height,
  draw,
  onMouseMove,
  onClick,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const animationRef = useRef<number>();

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    draw(ctx, frameRef.current);
    frameRef.current++;
    animationRef.current = requestAnimationFrame(animate);
  }, [draw]);

  useEffect(() => {
    animate();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={`rounded-lg ${className}`}
      onMouseMove={(e) => {
        if (onMouseMove) {
          const { x, y } = getCanvasCoords(e);
          onMouseMove(x, y);
        }
      }}
      onClick={(e) => {
        if (onClick) {
          const { x, y } = getCanvasCoords(e);
          onClick(x, y);
        }
      }}
    />
  );
};

export default InteractiveCanvas;
