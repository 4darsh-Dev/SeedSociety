import React from 'react';
import { motion } from 'framer-motion';

const ImpactCard = ({ title, value, description }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white p-6 rounded-lg shadow-lg text-center"
    >
      <h3 className="text-2xl font-bold text-emerald-600">{title}</h3>
      <p className="text-4xl font-bold text-gray-800 my-4">{value}</p>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

export default ImpactCard;