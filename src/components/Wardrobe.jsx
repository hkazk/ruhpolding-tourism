import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function Wardrobe(props) {
  const group = useRef();
  
  // Try to load the GLB file, with error handling
  let nodes, materials;
  try {
    const gltf = useGLTF('/models/wardrobe.glb');
    nodes = gltf.nodes || {};
    materials = gltf.materials || {};
  } catch (error) {
    console.error('Error loading wardrobe.glb:', error);
    // Return a simple placeholder if GLB fails to load
    return (
      <group ref={group} {...props} dispose={null}>
        <mesh position={[0, 1, 0]} castShadow receiveShadow>
          <boxGeometry args={[2, 2.5, 0.8]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[-0.48, 1, 0.41]} castShadow receiveShadow>
          <boxGeometry args={[0.9, 2.3, 0.05]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[0.48, 1, 0.41]} castShadow receiveShadow>
          <boxGeometry args={[0.9, 2.3, 0.05]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
      </group>
    );
  }

  // Check if we have the expected nodes before trying to render
  if (!nodes || Object.keys(nodes).length === 0) {
    console.warn('No nodes found in wardrobe.glb, using placeholder');
    return (
      <group ref={group} {...props} dispose={null}>
        <mesh position={[0, 1, 0]} castShadow receiveShadow>
          <boxGeometry args={[2, 2.5, 0.8]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[-0.48, 1, 0.41]} castShadow receiveShadow>
          <boxGeometry args={[0.9, 2.3, 0.05]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[0.48, 1, 0.41]} castShadow receiveShadow>
          <boxGeometry args={[0.9, 2.3, 0.05]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
      </group>
    );
  }

  // If we have nodes, try to render them safely
  return (
    <group ref={group} {...props} dispose={null}>
      {Object.entries(nodes).map(([key, node]) => {
        if (node.isMesh && node.geometry) {
          const material = node.material && materials[node.material.name] 
            ? materials[node.material.name] 
            : new THREE.MeshStandardMaterial({ color: '#8B4513' });

          return (
            <mesh
              key={key}
              geometry={node.geometry}
              material={material}
              position={node.position}
              rotation={node.rotation}
              scale={node.scale}
              castShadow
              receiveShadow
            />
          );
        }
        return null;
      })}
    </group>
  );
}

// Only preload if the file exists
try {
  useGLTF.preload('/models/wardrobe.glb');
} catch (error) {
  console.warn('Could not preload wardrobe.glb:', error);
}