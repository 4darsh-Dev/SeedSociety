
import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useScroll, useTransform } from 'framer-motion';
import { Smartphone, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const PhoneModel = () => (
  <mesh>
    <boxGeometry args={[0.7, 1.4, 0.1]} />
    <meshStandardMaterial color="#f3f4f6" />
  </mesh>
);

const  AppHighlights = () => {
  const ref = useRef();
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], [-100, 0]);

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2 h-96">
          <Canvas camera={{ position: [0, 0, 3] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <PhoneModel />
          </Canvas>
        </div>
        
        <motion.div style={{ x }} className="w-full md:w-1/2">
          <h2 className="text-4xl font-bold mb-8">Key Features</h2>
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="p-4 bg-green-100 rounded-lg">
                <Zap size={32} className="text-[var(--primary-green)]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Real-time Monitoring</h3>
                <p className="text-gray-600">AI-powered plant health analysis with instant insights</p>
              </div>
            </div>
            {/* Add more features similarly */}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AppHighlights;