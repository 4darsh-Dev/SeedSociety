import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Building2, Landmark } from 'lucide-react';

const UseCaseCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [userType, setUserType] = useState('corporate');

  const useCases = {
    corporate: [
      {
        title: "ESG Reporting & Compliance",
        description: "Automated environmental impact tracking and reporting for corporate sustainability goals.",
        features: ["Real-time data collection", "Automated report generation", "Compliance tracking"]
      },
      {
        title: "Employee Engagement",
        description: "Gamified plantation initiatives for corporate team building and CSR activities.",
        features: ["Team challenges", "Impact leaderboards", "Reward distribution"]
      },
      {
        title: "Carbon Credit Management",
        description: "Track and trade carbon credits through blockchain-verified plantation activities.",
        features: ["Credit calculation", "Trading platform", "Verification system"]
      }
    ],
    government: [
      {
        title: "Urban Forest Management",
        description: "Comprehensive solution for managing city-wide plantation initiatives.",
        features: ["Geographic planning", "Resource allocation", "Progress monitoring"]
      },
      {
        title: "Citizen Engagement",
        description: "Platform for coordinating public participation in environmental initiatives.",
        features: ["Public dashboard", "Volunteer management", "Impact visualization"]
      },
      {
        title: "Environmental Monitoring",
        description: "Advanced monitoring system for tracking environmental health indicators.",
        features: ["Sensor integration", "Data analytics", "Alert system"]
      }
    ]
  };

  const currentCases = useCases[userType];

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      {/* Type Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-emerald-100 p-1 rounded-lg inline-flex">
          <button
            onClick={() => setUserType('corporate')}
            className={`px-4 py-2 rounded-md flex items-center gap-2 transition-all ${
              userType === 'corporate' 
                ? 'bg-white shadow-md text-emerald-700' 
                : 'text-emerald-600 hover:text-emerald-700'
            }`}
          >
            <Building2 className="w-4 h-4" />
            Corporate
          </button>
          <button
            onClick={() => setUserType('government')}
            className={`px-4 py-2 rounded-md flex items-center gap-2 transition-all ${
              userType === 'government' 
                ? 'bg-white shadow-md text-emerald-700' 
                : 'text-emerald-600 hover:text-emerald-700'
            }`}
          >
            <Landmark className="w-4 h-4" />
            Government
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-emerald-50/50 rounded-lg p-8"
          >
            <h3 className="text-2xl font-bold text-emerald-900 mb-4">
              {currentCases[activeIndex].title}
            </h3>
            <p className="text-emerald-700 mb-6">
              {currentCases[activeIndex].description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentCases[activeIndex].features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-4 rounded-lg shadow-sm"
                >
                  {feature}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
          <button
            onClick={() => setActiveIndex((prev) => 
              prev === 0 ? currentCases.length - 1 : prev - 1
            )}
            className="p-2 rounded-full bg-white shadow-lg text-emerald-600 hover:text-emerald-700"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => setActiveIndex((prev) => 
              prev === currentCases.length - 1 ? 0 : prev + 1
            )}
            className="p-2 rounded-full bg-white shadow-lg text-emerald-600 hover:text-emerald-700"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {currentCases.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === activeIndex 
                ? 'bg-emerald-500 w-6' 
                : 'bg-emerald-200 hover:bg-emerald-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default UseCaseCarousel;