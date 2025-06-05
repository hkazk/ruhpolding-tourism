import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export default function DisplayCabinet(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/models/displaycabinet.glb');
  
  return (
    <group ref={group} {...props} dispose={null}>
      {Object.entries(nodes).map(([key, node]) => {
        if (node.isMesh && node.geometry) {
          return (
            <mesh
              key={key}
              geometry={node.geometry}
              material={node.material}
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

useGLTF.preload('/models/displaycabinet.glb');