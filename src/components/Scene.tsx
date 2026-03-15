import { Canvas } from '@react-three/fiber';
import { Stars, Lantern } from './ThreeElements';
import { OrbitControls, Environment, Float } from '@react-three/drei';

export function Scene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <color attach="background" args={['#0A0F2C']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#FFD700" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0FA958" />
        
        <Stars />
        
        {/* Floating Lanterns */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <Lantern position={[-4, 2, -5]} scale={1.2} speed={0.8} />
        </Float>
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
          <Lantern position={[3, -2, -3]} scale={0.8} speed={1.2} />
        </Float>
        <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.5}>
          <Lantern position={[-2, -3, -8]} scale={1.5} speed={0.6} />
        </Float>
        <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.2}>
          <Lantern position={[5, 3, -10]} scale={2} speed={0.9} />
        </Float>

        <Environment preset="night" />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
}
