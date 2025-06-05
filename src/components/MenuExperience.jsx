// Menu Experience Component
const MenuExperience = () => {
    return (
      <>
        <Float
          rotation-x={-Math.PI / 4}
          floatIntensity={0.4}
          speed={1}
          rotationIntensity={0.5}
        >
          <MenuBook />
        </Float>
  
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={2.5}
          maxDistance={6}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 6}
          target={[0, 0, 0]}
          dampingFactor={0.05}
          enableDamping={true}
        />
        <mesh position-y={-1.5} rotation-x={-Math.PI / 2} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <shadowMaterial transparent opacity={0.05} />
        </mesh>
      </>
    );
  };