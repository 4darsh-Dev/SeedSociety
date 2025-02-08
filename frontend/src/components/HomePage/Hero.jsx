import { motion } from 'framer-motion';
import { Sun } from 'lucide-react';
import treeImg from "../../assets/isolated-tree-b-min.png"

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Let's Grow A Greener And Shield Against{' '}
              <span className="inline-flex items-center">
                <Sun className="h-12 w-12 text-yellow-500 mx-2" />
                Radiation
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Join us in our mission to combat climate change and protect our planet's future. 
              Your donation will directly fund tree planting initiatives worldwide, creating 
              a sustainable and greener world for generations to come.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-emerald-500 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-emerald-600 transition-colors"
              >
                Support Our Mission
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-emerald-500 text-emerald-500 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors flex items-center gap-2"
              >
                Learn More
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </motion.button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="w-full h-[500px] relative">
              <svg className="absolute inset-0" viewBox="0 0 400 400">
                <motion.path
                  d="M200,50 Q400,150 200,250 Q0,350 200,450"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-emerald-500"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                {/* Add more decorative SVG elements here */}
              </svg>
              <img
                src={treeImg}
                alt="Tree Illustration"
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;