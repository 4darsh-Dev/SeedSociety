import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import TreeMap from '../components/Map/TreeMap';
import SearchBar from '../components/Map/SearchBar';
import Footer from '../components/Footer';
import DataVisualizationSidebar from '../components/DataVisualization/StatsDashboard';

const TaggingPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className='relative top-20 left-8'>
      <SearchBar />
      </div>
      
      
      <main className="pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
          <h1 className="text-3xl md:text-2xl font-bold text-gray-900 mb-4">
            Explore Our Green Impact
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Discover trees planted in your area and contribute to our growing forest.
          </p>
        </motion.div>

        <div className="relative">
          <div className='max-w-[calc(100%-400px)]'>
          <TreeMap />
          </div>
          
          <DataVisualizationSidebar />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TaggingPage;