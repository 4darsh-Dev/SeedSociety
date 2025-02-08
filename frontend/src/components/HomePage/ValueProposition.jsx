
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';
import { useRef } from 'react';

const ValueProposition = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-20 bg-green-50">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
        <motion.div
          ref={ref}
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          className="bg-white p-8 rounded-2xl shadow-lg"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-green mb-2">
              {isInView ? <CountUp end={100} suffix="k+" /> : '0'}
            </div>
            <h3 className="text-xl">Trees Planted</h3>
          </div>
        </motion.div>
        <motion.div
          ref={ref}
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          className="bg-white p-8 rounded-2xl shadow-lg"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-green mb-2">
              {isInView ? <CountUp end={200} suffix="+" /> : '0'}
            </div>
            <h3 className="text-xl">Cities Covered</h3>
          </div>
        </motion.div>
        <motion.div
          ref={ref}
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          className="bg-white p-8 rounded-2xl shadow-lg"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-green mb-2">
              {isInView ? <CountUp end={4000} suffix="+" /> : '0'}
            </div>
            <h3 className="text-xl">Members</h3>
          </div>
        </motion.div>
        {/* Add more stats similarly */}
      </div>

      <div className="container mx-auto px-4 mt-20">
        <h2 className="text-4xl font-bold mb-8 text-center">Trusted By</h2>
        <motion.div
          className="flex flex-wrap justify-center gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          {['ESG', 'UN', 'ISO'].map((badge) => (
            <motion.div
              key={badge}
              whileHover={{ y: -5 }}
              className="bg-white px-6 py-3 rounded-full shadow-md"
            >
              {badge} Certified
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ValueProposition;