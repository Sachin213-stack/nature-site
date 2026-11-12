import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { SceneManager } from './SceneManager';
import { useSiteStore } from '../../store/useSiteStore';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class CanvasErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('3D Canvas encountered rendering error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 pointer-events-none flex items-end justify-start p-6 text-xs text-slate-500">
          <span>WebGL 3D fallback mode active</span>
        </div>
      );
    }
    return this.props.children;
  }
}

export const SceneCanvas: React.FC = () => {
  const isReducedMotion = useSiteStore((s) => s.isReducedMotion);

  if (isReducedMotion) {
    return null; // Respect user preference for reduced motion
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.85 }}
    >
      <CanvasErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
            alpha: true,
          }}
        >
          <SceneManager />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
};
