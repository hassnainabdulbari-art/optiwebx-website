"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

export default function AIOrb() {
  const orbRef = useRef<THREE.Mesh>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (orbRef.current) {
      orbRef.current.rotation.y += 0.004;
      orbRef.current.rotation.x = Math.sin(t * 0.6) * 0.15;
    }

    if (ring1.current) {
      ring1.current.rotation.x += 0.01;
      ring1.current.rotation.z += 0.004;
    }

    if (ring2.current) {
      ring2.current.rotation.y -= 0.012;
      ring2.current.rotation.z += 0.003;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.4}>
      <group>
        {/* Main Orb */}
        <mesh ref={orbRef}>
          <icosahedronGeometry args={[1.15, 6]} />
          <meshPhysicalMaterial
            color="#5B8CFF"
            metalness={0.9}
            roughness={0.08}
            transmission={0.95}
            thickness={2}
            clearcoat={1}
            clearcoatRoughness={0}
            emissive="#3B82F6"
            emissiveIntensity={2}
          />
        </mesh>

        {/* Inner Core */}
        <mesh scale={0.45}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial
            color="#A855F7"
            emissive="#9333EA"
            emissiveIntensity={5}
          />
        </mesh>

        {/* Ring 1 */}
        <mesh ref={ring1} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.65, 0.025, 16, 120]} />
          <meshStandardMaterial
            color="#60A5FA"
            emissive="#3B82F6"
            emissiveIntensity={4}
          />
        </mesh>

        {/* Ring 2 */}
        <mesh ref={ring2} rotation={[0, Math.PI / 3, Math.PI / 4]}>
          <torusGeometry args={[2.05, 0.02, 16, 120]} />
          <meshStandardMaterial
            color="#C084FC"
            emissive="#A855F7"
            emissiveIntensity={3}
          />
        </mesh>

        {/* Small Energy Nodes */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const radius = 2.15;

          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * radius,
                Math.sin(angle) * 0.4,
                Math.sin(angle) * radius,
              ]}
            >
              <sphereGeometry args={[0.06, 16, 16]} />
              <meshStandardMaterial
                color="#FFFFFF"
                emissive="#60A5FA"
                emissiveIntensity={8}
              />
            </mesh>
          );
        })}

        {/* Lights */}
        <pointLight color="#3B82F6" intensity={25} distance={8} />
        <pointLight
          color="#A855F7"
          intensity={18}
          distance={8}
          position={[2, 2, 2]}
        />
      </group>
    </Float>
  );
}