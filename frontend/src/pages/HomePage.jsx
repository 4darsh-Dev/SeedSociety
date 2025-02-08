import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/HomePage/Hero';
import SocialProof from '../components/HomePage/SocialProof';
import ValueProposition from '../components/HomePage/ValueProposition';
import TopContributors from '../components/HomePage/TopContributors';
import AppDownload from '../components/HomePage/AppDownload';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <Navbar />
      <Hero />
      <ValueProposition />
      <TopContributors />
      <AppDownload />
      <SocialProof />
      
      <Footer />
    </div>
  );
};

export default HomePage;