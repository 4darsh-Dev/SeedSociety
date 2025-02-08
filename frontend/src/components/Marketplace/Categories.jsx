import { TreePalm, Leaf, Flower2, Wind } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';


const Categories = () => {
  const categories = [
    { icon: <TreePalm />, name: "Forest Trees" },
    { icon: <Leaf />, name: "Medicinal Plants" },
    { icon: <Flower2 />, name: "Ornamental Plants" },
    { icon: <Wind />, name: "Air Purifying" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-poppins font-bold text-slate-800 mb-12">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center p-6 bg-background rounded-lg 
                         cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="text-primary w-12 h-12">{category.icon}</div>
              <h3 className="mt-4 text-lg font-poppins font-semibold">{category.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
