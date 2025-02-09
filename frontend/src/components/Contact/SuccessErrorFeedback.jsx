import React from 'react';
import { motion } from 'framer-motion';

const SuccessErrorFeedback = ({ type, message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`p-4 rounded-md ${
        type === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
      }`}
    >
      {message}
    </motion.div>
  );
};

export default SuccessErrorFeedback;