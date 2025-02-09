import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { TreePalm, Sprout, Users } from 'lucide-react';
import React from 'react';

const MarketHero = () => {
  const features = [
    {
      icon: <TreePalm className="w-8 h-8 text-primary" />,
      title: "Sustainable Planting",
      description: "Join our mission to create a greener future through community-driven tree plantation"
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Community Building",
      description: "Connect with local planters and businesses in your area"
    },
    {
      icon: <Sprout className="w-8 h-8 text-primary" />,
      title: "Smart Tracking",
      description: "Monitor plantation growth with advanced technology"
    }
  ];

  return (
    <section className="relative h-screen bg-background">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          loop={true}
          className="h-full"
        >
          {[1, 2, 3].map((index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full bg-cover bg-center" 
                   style={{ backgroundImage: `url('https://png.pngtree.com/thumb_back/fh260/background/20240325/pngtree-product-presentation-green-cosmetic-podium-background-image_15695091.jpg')` }}>
                <div className="absolute inset-0 bg-black/40" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-6xl font-poppins font-bold text-white mb-6"
        >
          Plant a Tree, <br />Grow a Community
        </motion.h1>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid md:grid-cols-3 gap-8 mt-12"
        >
          {features.map((feature, index) => (
            <div key={index} className="bg-white/90 p-6 rounded-lg">
              {feature.icon}
              <h3 className="text-xl font-poppins font-semibold mt-4">{feature.title}</h3>
              <p className="text-slate-600 mt-2 font-open-sans">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MarketHero;
