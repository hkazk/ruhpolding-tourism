import React from 'react';
import { useTexture } from '@react-three/drei';

function Room() {
  // Load modern textures
  const floorTexture = useTexture('https://threejs.org/examples/textures/floors/FloorsCheckerboard_S_Diffuse.jpg');
  const normalTexture = useTexture('https://threejs.org/examples/textures/waternormals.jpg');
  
  // Configure modern floor texture
  floorTexture.wrapS = floorTexture.wrapT = 1000;
  floorTexture.repeat.set(4, 4);
  
  // Configure subtle surface texture
  normalTexture.wrapS = normalTexture.wrapT = 1000;
  normalTexture.repeat.set(8, 8);

  return (
    <group>
      {/* Modern polished concrete floor with geometric pattern */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial 
          map={floorTexture}
          color="#F5F5F5"
          roughness={0.1}
          metalness={0.05}
          normalMap={normalTexture}
          normalScale={[0.1, 0.1]}
        />
      </mesh>
      
      {/* Back Wall - Modern minimalist white */}
      <mesh position={[0, 2.5, -5]} receiveShadow>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial 
          color="#FEFEFE"
          roughness={0.2}
          metalness={0.0}
          normalMap={normalTexture}
          normalScale={[0.05, 0.05]}
        />
      </mesh>
      
      {/* Left Wall - Modern white */}
      <mesh 
        position={[-5, 2.5, 0]} 
        rotation={[0, Math.PI / 2, 0]} 
        receiveShadow
      >
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial 
          color="#FEFEFE"
          roughness={0.2}
          metalness={0.0}
          normalMap={normalTexture}
          normalScale={[0.05, 0.05]}
        />
      </mesh>
      
      {/* Right Wall - Modern white */}
      <mesh 
        position={[5, 2.5, 0]} 
        rotation={[0, -Math.PI / 2, 0]} 
        receiveShadow
      >
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial 
          color="#FEFEFE"
          roughness={0.2}
          metalness={0.0}
          normalMap={normalTexture}
          normalScale={[0.05, 0.05]}
        />
      </mesh>
      
      {/* Modern baseboards */}
      <mesh position={[0, 0.05, -5]}>
        <boxGeometry args={[10, 0.1, 0.05]} />
        <meshStandardMaterial 
          color="#C0C0C0" 
          roughness={0.05}
          metalness={0.9}
        />
      </mesh>
      
      <mesh position={[-5, 0.05, 0]}>
        <boxGeometry args={[0.05, 0.1, 10]} />
        <meshStandardMaterial 
          color="#C0C0C0" 
          roughness={0.05}
          metalness={0.9}
        />
      </mesh>
      
      <mesh position={[5, 0.05, 0]}>
        <boxGeometry args={[0.05, 0.1, 10]} />
        <meshStandardMaterial 
          color="#C0C0C0" 
          roughness={0.05}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
}

export default Room;