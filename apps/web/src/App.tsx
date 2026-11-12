import React from 'react';

export const App: React.FC = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ backgroundColor: '#F7F5EF', color: '#263128' }}
    >
      <header className="max-w-xl text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight" style={{ color: '#263128' }}>
          Nature 3D
        </h1>
        <p className="text-sm" style={{ color: '#62695F' }}>
          A scroll-driven 3D exploration of nature loss and recovery. Scaffold established.
        </p>
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs"
          style={{
            backgroundColor: '#9CAF8820',
            border: '1px solid #9CAF8850',
            color: '#263128',
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: '#9CAF88' }}
          />
          apps/web scaffold operational
        </div>
      </header>
    </div>
  );
};

export default App;
