import React from 'react';
import { Canvas } from '@react-three/fiber';
import { MenuExperience } from './MenuExperience';
import { MenuUI } from './MenuUI';
import './MenuBook.css';

export default function MenuBook3DViewer({ onClose }) {
  return (
    <div className="menu-book-container">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
        shadows
      >
        <MenuExperience />
      </Canvas>

      {/* UI Overlay */}
      <MenuUI onClose={onClose} />
    </div>
  );
}