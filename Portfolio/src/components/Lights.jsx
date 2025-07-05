import React from "react";

export default function Lights() {
  // A small sphere to visualize a light's position
  const LightSphere = ({ position, color }) => (
    <mesh position={position}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );

  return (
    <group>
      {/* A soft, ambient light to fill the scene */}
      <ambientLight intensity={0.1} />

      {/* A strong directional light to act as the sun/main light source */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.0}
        color={0xffffff}
      />

      {/* A vibrant blue point light from one side */}
      <pointLight
        intensity={2.5}
        position={[-8, 4, -5]}
        color={0x0077ff} // Vibrant Blue
      />

      {/* A vibrant magenta point light from the other side */}
      <pointLight
        intensity={2.5}
        position={[8, 4, 5]}
        color={0xff00ff} // Vibrant Magenta/Pink
      />
    </group>
  );
};