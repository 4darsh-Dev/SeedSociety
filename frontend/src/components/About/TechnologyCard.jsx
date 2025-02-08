import React from 'react';
import { motion } from 'framer-motion';

const TechnologyCard = ({ icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white p-6 rounded-lg shadow-lg text-center"
    >
      <div className="text-emerald-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-emerald-600 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

export default TechnologyCard;