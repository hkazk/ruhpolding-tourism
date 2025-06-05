import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html, useProgress } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import Wardrobe from './Wardrobe'; // Your existing GLB component

// Loading component
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ 
        color: 'white', 
        fontSize: '16px',
        background: 'rgba(0,0,0,0.8)',
        padding: '10px 20px',
        borderRadius: '10px'
      }}>
        Loading Wardrobe: {progress.toFixed(0)}%
      </div>
    </Html>
  );
}

const WardrobeViewer = () => {
  const navigate = useNavigate();

  return (
    <div style={{ width: '100%', height: '100vh', background: '#1a1a1a' }}>
      {/* Back Button */}
      <button 
        onClick={() => navigate('/museums')} 
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          background: 'linear-gradient(135deg, rgba(74, 144, 226, 0.8), rgba(74, 144, 226, 0.6))',
          color: 'white',
          border: '2px solid rgba(74, 144, 226, 0.5)',
          padding: '0.8rem 1.5rem',
          borderRadius: '25px',
          fontSize: '1rem',
          cursor: 'pointer',
          zIndex: 100,
          backdropFilter: 'blur(10px)',
          fontWeight: '500'
        }}
      >
        ← Back to Museums
      </button>

      <Canvas
        camera={{ position: [3, 2, 5], fov: 50 }}
        shadows
      >
        <Suspense fallback={<Loader />}>
          {/* Lighting setup */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1.2}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <pointLight position={[-5, 5, 5]} intensity={0.3} />
          
          {/* Your existing Wardrobe component */}
          <Wardrobe position={[0, -1.25, 0]} />
          
          {/* Ground shadows */}
          <ContactShadows
            rotation-x={Math.PI / 2}
            position={[0, -1.25, 0]}
            opacity={0.4}
            width={8}
            height={8}
            blur={2}
            far={4}
          />
          
          {/* Interactive controls */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={10}
            target={[0, 0.5, 0]}
          />
          
          {/* Environment lighting */}
          <Environment preset="apartment" />
        </Suspense>
      </Canvas>
      
      {/* UI Info */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        color: 'white',
        background: 'rgba(0,0,0,0.7)',
        padding: '15px',
        borderRadius: '10px',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>🗄️ Wardrobe Viewer</h3>
        <p style={{ margin: '0', fontSize: '14px', opacity: 0.8 }}>
          Drag to rotate • Scroll to zoom • Right-click to pan
        </p>
      </div>
    </div>
  );
};

export default WardrobeViewer;