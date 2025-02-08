import { motion } from 'framer-motion';
import { Download, CheckCircle, ArrowRight } from 'lucide-react';

const AppDownload = () => {
  const features = [
    "Track your planted trees in real-time",
    "Join local planting events",
    "Earn rewards for your green actions",
    "Connect with eco-conscious community"
  ];

  return (
    <section className="py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Take Green Action Anywhere
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Download our mobile app to start your tree-planting journey today.
              Track your impact, join events, and connect with fellow environmental champions.
            </p>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span className="text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </div>

            <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row">
              <motion.a
                href="#download-android"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
              >
                <Download className="w-5 h-5 mr-2" />
                Google Play
              </motion.a>
              <motion.a
                href="#download-ios"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-emerald-500 text-emerald-500 rounded-lg hover:bg-emerald-50 transition-colors"
              >
                App Store
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Phone frame */}
              <div className="relative z-10 bg-gray-800 rounded-[3rem] p-4 shadow-2xl">
                <div className="relative aspect-[6/8.5] rounded-[2.5rem] overflow-hidden bg-white">
                  <img
                    src="https://i.ytimg.com/vi/kFrln-zMAR4/hqdefault.jpg"
                    alt="App Interface"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -z-10 inset-0 bg-gradient-to-r from-emerald-200 to-teal-200 blur-3xl opacity-30 animate-pulse" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;