
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const SocialProof = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">Community Impact</h2>
        
        {/* Swiper Component */}
        <Swiper
          modules={[Autoplay]}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          spaceBetween={30}
          className="testimonial-swiper"
        >
          {[...Array(4)].map((_, i) => (
            <SwiperSlide key={i}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="bg-green-50 p-8 rounded-2xl h-full"
              >
                <p className="text-lg mb-4">
                  "SeedSociety transformed our urban forestry program"
                </p>
                <div className="font-semibold">- City Environmental Dept.</div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SocialProof;