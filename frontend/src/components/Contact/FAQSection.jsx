import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Leaf, Trees, Users, LineChart, Building2, Sprout, Shield } from 'lucide-react';

const FAQItem = ({ question, answer, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-emerald-100 rounded-xl overflow-hidden bg-white/80 backdrop-blur-sm"
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between text-left hover:bg-emerald-50/50 transition-colors duration-200"
      >
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-emerald-100/50">
            <Icon className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="text-lg font-medium text-emerald-900">{question}</h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-emerald-500" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 text-emerald-700 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQSection = () => {
  const faqs = [
    {
      icon: Trees,
      question: "What is SeedSociety and how does it work?",
      answer: "SeedSociety is a technology-driven platform that revolutionizes tree plantation by making it a sustainable, community-driven movement. We combine advanced technology with community engagement to create measurable environmental impact. Our platform connects local planters with businesses, tracks plantation progress in real-time, and rewards sustainable actions through blockchain-based tokens."
    },
    {
      icon: Users,
      question: "How does the community engagement system work?",
      answer: "Our community system works on three levels: First, we connect local planters with businesses to create sustainable partnerships. Second, we implement a blockchain-based rewards system where users earn tokens for verified plantation activities. Finally, we provide a social networking platform for environmental champions to share experiences, coordinate efforts, and inspire others in the community."
    },
    {
      icon: LineChart,
      question: "What technologies do you use for tracking tree growth?",
      answer: "We employ cutting-edge technology for accurate tracking: Computer Vision algorithms monitor plant health and growth patterns, while Geo-Tagging ensures precise location tracking. Our system also includes sophisticated water monitoring capabilities and provides a comprehensive impact measurement dashboard that analyzes environmental impact across different regions."
    },
    {
      icon: Building2,
      question: "How can businesses benefit from partnering with SeedSociety?",
      answer: "Businesses gain multiple benefits: They receive detailed ESG (Environmental, Social, and Governance) reports for compliance and stakeholder communication. They can participate in our local business partnership program to offer rewards to verified planters. Additionally, they can earn carbon credits and tokens through their environmental initiatives, which can be utilized for various purposes."
    },
    {
      icon: Shield,
      question: "How do you verify plantation activities?",
      answer: "We use a multi-layered verification system: Our Computer Vision technology analyzes plant images for authenticity, Geo-tagging confirms location accuracy, and our community moderators conduct periodic verification checks. This ensures all reported plantation activities are genuine and properly maintained."
    },
    {
      icon: Sprout,
      question: "What is the reward system and how does it work?",
      answer: "Our reward system operates on blockchain technology, ensuring transparency and security. Users earn tokens for verified plantation activities, which can be exchanged for discounts and coupons from partner businesses. The system tracks both planting and maintenance activities, encouraging long-term commitment to tree care."
    },
    {
      icon: Leaf,
      question: "Can individuals track their environmental impact?",
      answer: "Yes! Users get access to a personal dashboard showing their plantation history, growth tracking, and environmental impact metrics. This includes data on carbon offset, water conservation impact, and biodiversity contribution. Users can also share their achievements and impact statistics with their community."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 py-12"
    >
      {/* Decorative Elements */}
      <motion.div 
        className="absolute top-0 right-0 text-emerald-100/20 -z-10"
        animate={{
          rotate: [0, 10, -10, 0],
          transition: { duration: 20, repeat: Infinity }
        }}
      >
        <Trees size={200} />
      </motion.div>

      <div className="text-center mb-12">
        <motion.h2 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-3xl font-bold text-emerald-900 mb-4"
        >
          Frequently Asked Questions
        </motion.h2>
        <p className="text-emerald-600">
          Everything you need to know about SeedSociety and our mission
        </p>
      </div>

      <motion.div 
        className="space-y-4"
        variants={{
          show: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        initial="hidden"
        animate="show"
      >
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            icon={faq.icon}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default FAQSection;