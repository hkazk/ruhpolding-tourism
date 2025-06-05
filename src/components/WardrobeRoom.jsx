import React, { Suspense, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Html, useProgress } from '@react-three/drei';
import Wardrobe from './Wardrobe';
import DisplayTable from './DisplayTable';
import OldCabinet from './OldCabinet';
import DisplayCabinet from './DisplayCabinet';
import Statues from './Statues';
import Carrier from './Carrier';
import Golden from './Golden';
import Picture from './Picture';
import ObjectDetailsModal from './ObjectDetailsModal';
import InteractiveObject from './InteractiveObject';
import Room from './Room';

// Loading component
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ 
        color: 'white', 
        fontSize: '16px',
        background: 'rgba(0,0,0,0.8)',
        padding: '15px 20px',
        borderRadius: '10px'
      }}>
        Loading Room: {progress.toFixed(0)}%
      </div>
    </Html>
  );
}

const WardrobeRoom = () => {
  const [selectedObject, setSelectedObject] = useState(null);

  return (
    <div style={{ width: '100%', height: '100vh', background: '#1a1a1a' }}>
      {/* Object Details Modal */}
      <ObjectDetailsModal 
        object={selectedObject} 
        onClose={() => setSelectedObject(null)} 
      />
      <button 
        onClick={() => window.history.back()} 
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          background: 'linear-gradient(135deg, rgba(74, 144, 226, 0.8), rgba(74, 144, 226, 0.6))',
          color: 'white',
          border: '2px solid rgba(74, 144, 226, 0.5)',
          padding: '1rem 2rem',
          borderRadius: '30px',
          fontSize: '1.1rem',
          cursor: 'pointer',
          zIndex: 100,
          backdropFilter: 'blur(10px)',
          fontWeight: '500'
        }}
      >
        ← Back
      </button>

      {/* Info Panel */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        color: 'white',
        background: 'rgba(0,0,0,0.7)',
        padding: '15px',
        borderRadius: '10px',
        fontFamily: 'Arial, sans-serif',
        zIndex: 100,
        maxWidth: '300px'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>🏠 Bavarian Room</h3>
        <p style={{ margin: '0', fontSize: '14px', opacity: 0.8 }}>
          Traditional wardrobe in an authentic Alpine room setting.
        </p>
        <p style={{ margin: '10px 0 0 0', fontSize: '12px', opacity: 0.6 }}>
          Drag to look around • Scroll to zoom
        </p>
      </div>

      <Canvas
        camera={{ position: [3, 2, 5], fov: 60 }}
        shadows
      >
        <Suspense fallback={<Loader />}>
          {/* ONLY CHANDELIER LIGHTING */}
          
          {/* NO ambient light */}
          <ambientLight intensity={0.0} />
          
          {/* Main light source */}
          <pointLight 
            position={[0, 3, 3]} 
            intensity={70.0} 
            color="#FFE066"
            distance={20}
            decay={2}
            castShadow
            shadow-mapSize={[4096, 4096]}
            shadow-camera-near={0.1}
            shadow-camera-far={20}
            shadow-bias={-0.001}
          />

          {/* Room Environment */}
          <Room />
          
          {/* Interactive Objects with Enhanced Hover Effects */}
          
          {/* Wardrobe positioned on the left wall, same wall as display cabinet */}
          <InteractiveObject onClick={() => setSelectedObject('wardrobe')} objectId="wardrobe">
            <Wardrobe 
              position={[-4.5, 2.0, -2]} 
              rotation={[0, Math.PI / 2, 0]}
              scale={[2, 2, 2]}
            />
          </InteractiveObject>
          
          {/* Display Table positioned in center */}
          <InteractiveObject onClick={() => setSelectedObject('displayTable')} objectId="displayTable">
            <DisplayTable 
              position={[0, 0.5, 0]} 
              rotation={[0, Math.PI, 0]}
              scale={[2, 2, 2]}
            />
          </InteractiveObject>
          
          {/* Old Cabinet positioned on the right side */}
          <InteractiveObject onClick={() => setSelectedObject('oldCabinet')} objectId="oldCabinet">
            <OldCabinet 
              position={[3, 1.2, -4.2]} 
              scale={[2, 2, 2]}
            />
          </InteractiveObject>
          
          {/* Display Cabinet positioned on the left wall, facing center */}
          <InteractiveObject onClick={() => setSelectedObject('displayCabinet')} objectId="displayCabinet">
            <DisplayCabinet 
              position={[-4.5, 1.7, 2.5]} 
              rotation={[0, Math.PI / 2, 0]}
              scale={[2, 2, 2]}
            />
          </InteractiveObject>
          
          {/* Statues positioned against the back wall */}
          <InteractiveObject onClick={() => setSelectedObject('statues')} objectId="statues">
            <Statues 
              position={[-2, 2.0, -4.5]} 
              rotation={[0, -Math.PI / 6, 0]}
              scale={[3, 3, 3]}
            />
          </InteractiveObject>
          
          {/* Carrier positioned against the right wall */}
          <InteractiveObject onClick={() => setSelectedObject('carrier')} objectId="carrier">
            <Carrier 
              position={[3.8, 1.6, 3]} 
              rotation={[0, -Math.PI / 2, 0]}
              scale={[2, 2, 2]}
            />
          </InteractiveObject>
          
          {/* Picture positioned against the right wall */}
          <InteractiveObject onClick={() => setSelectedObject('picture')} objectId="picture">
            <Picture 
              position={[4.90, 2.5, -1]} 
              rotation={[0, Math.PI / 360, 0]}
              scale={[2, 2, 2]}
            />
          </InteractiveObject>
          
          {/* Golden chandelier positioned above the display table */}
          <InteractiveObject onClick={() => setSelectedObject('golden')} objectId="golden">
            <Golden 
              position={[0, 4, 0]} 
              rotation={[0, 0, 0]}
              scale={[1.3, 1.3, 1.3]}
            />
          </InteractiveObject>
          
          {/* Ground shadows */}
          <ContactShadows
            rotation-x={Math.PI / 2}
            position={[0, 0.01, 0]}
            opacity={0.3}
            width={8}
            height={8}
            blur={2}
            far={4}
          />
          
          {/* Camera Controls - targeting the center of the room */}
          <OrbitControls
            target={[0, 1.5, 0]}
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={12}
            maxPolarAngle={Math.PI / 2.1}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default WardrobeRoom;