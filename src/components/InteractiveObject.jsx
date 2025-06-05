import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const InteractiveObject = ({ children, onClick, objectId }) => {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current && hovered) {
      // Very subtle floating animation when hovered
      groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 2) * 0.003;
    }
  });

  return (
    <group
      ref={groupRef}
      onClick={onClick}
      onPointerEnter={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 32 32\'%3E%3Ccircle cx=\'12\' cy=\'12\' r=\'9\' fill=\'none\' stroke=\'%23FFD700\' stroke-width=\'2\'/%3E%3Cpath d=\'m21 21 4 4\' stroke=\'%23FFD700\' stroke-width=\'2\' stroke-linecap=\'round\'/%3E%3C/svg%3E") 16 16, pointer';
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Subtle highlight light when hovered */}
      {hovered && (
        <pointLight
          position={[0, 2, 0]}
          intensity={0.5}
          color="#FFD700"
          distance={6}
          decay={2}
        />
      )}
      
      {children}
    </group>
  );
};

export default InteractiveObject;