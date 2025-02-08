import React from 'react';
import { motion } from 'framer-motion';

const SectionHeader = ({ title, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      <h2 className="text-4xl font-bold text-emerald-600 mb-4">{title}</h2>
      <p className="text-lg text-gray-600">{subtitle}</p>
    </motion.div>
  );
};

export default SectionHeader;