import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import React from 'react';

const FeaturedProducts = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: () => Promise.resolve([
      { id: 1, name: 'Neem Tree Kit', price: 29.99, image: 'https://gramyumm.sankalptaru.org/wp-content/uploads/2022/03/1.jpg' },
      { id: 2, name: 'Nutteal mix', price: 39.99, image: 'https://gramyumm.sankalptaru.org/wp-content/uploads/2022/05/Nuttelal.jpg' },
      { id: 3, name: 'Amla Candy', price: 49.99, image: 'https://gramyumm.sankalptaru.org/wp-content/uploads/2022/05/Amla-candy.jpg' },
    ])
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-poppins font-bold text-slate-800 mb-12">Featured Products</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-poppins font-semibold">{product.name}</h3>
                <p className="text-primary text-lg mt-2">${product.price}</p>
                <button className="mt-4 w-full bg-primary text-white py-2 px-4 rounded-md 
                                 hover:bg-secondary transition-colors">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;