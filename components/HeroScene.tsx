"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import AIOrb from "./AIOrb";

export default function HeroScene() {
    
  return (
    <div className="w-full h-[500px]">
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 45,
        }}
      >
        {/* Lights */}
        <ambientLight intensity={1.5} />

        <directionalLight
          position={[5, 5, 5]}
          intensity={3}
          color="#60A5FA"
        />

        <directionalLight
          position={[-5, -5, -5]}
          intensity={2}
          color="#A855F7"
        />

        <AIOrb />

        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={1.2}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
}