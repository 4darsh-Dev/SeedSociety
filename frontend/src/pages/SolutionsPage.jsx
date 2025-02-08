import React from 'react';
import { motion } from 'framer-motion';
import TechStackVisualization from '../components/Tech/TechVisualization';
import UseCaseCarousel from '../components/Tech/UseCaseCarousel';
import { Server, Database, Brain, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white rounded-xl p-6 shadow-lg border border-emerald-100"
  >
    <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-emerald-600" />
    </div>
    <h3 className="text-lg font-semibold text-emerald-900 mb-2">{title}</h3>
    <p className="text-emerald-600">{description}</p>
  </motion.div>
);

const SolutionsPage = () => {
  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-emerald-900 mb-4">
            Our Technical Solutions
          </h1>
          <p className="text-xl text-emerald-600 max-w-2xl mx-auto">
            Leveraging cutting-edge technology to create sustainable environmental impact
          </p>
        </motion.div>

        {/* Key Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <FeatureCard
            icon={MapPin}
            title="Location Tracking"
            description="Real-time GPS tracking and monitoring of plantation sites with geofencing capabilities"
          />
          <FeatureCard
            icon={Brain}
            title="AI Analysis"
            description="Advanced image processing for plant health monitoring and growth tracking"
          />
          <FeatureCard
            icon={Server}
            title="Smart Alerts"
            description="Weather API integration for predictive maintenance and care alerts"
          />
          <FeatureCard
            icon={Database}
            title="Data Management"
            description="Robust data storage with PostgreSQL and vector optimization using Pinecone"
          />
        </div>

        {/* Tech Stack Visualization */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-emerald-900 mb-8">
            Technical Architecture
          </h2>
          <TechStackVisualization />
        </section>

        {/* Use Cases */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-emerald-900 mb-8">
            Industry Solutions
          </h2>
          <UseCaseCarousel />
        </section>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default SolutionsPage;