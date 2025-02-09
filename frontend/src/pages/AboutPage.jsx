import React from 'react';
import { motion } from 'framer-motion';
import BlobBackground from '../components/About/BlobBackground';
import SectionHeader from '../components/About/SectionHeader';
import TeamMemberTile from '../components/About/TeamMemberTile';
import ImpactCard from '../components/About/ImpactCard';
import TechnologyCard from '../components/About/TechnologyCard';
import { Linkedin, Github, Twitter, Leaf, Eye, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const AboutUsPage = () => {
  const teamMembers = [
    {
      name: 'Adarsh Maurya',
      role: 'Dev',
      image: 'https://auto-doc-seven.vercel.app/am-pic.png',
      socials: {
        linkedin: 'https://www.linkedin.com/in/adarsh-maurya-dev/',
        github: 'https://github.com/4darsh-Dev',
        twitter: 'https://x.com/4darsh_Dev',
      },
    },
    {
      name: 'Aman Singh',
      role: 'Dev',
      image: 'https://auto-doc-seven.vercel.app/as-pic.jpg',
      socials: {
        linkedin: 'https://www.linkedin.com/in/adarsh-maurya-dev/',
        github: 'https://github.com/AmanSingh494',
        twitter: '#',
      },
    },
  ];

  const impacts = [
    {
      title: 'Trees Planted',
      value: '10,000+',
      description: 'Reducing carbon footprint through verified plantations.',
    },
    {
      title: 'Carbon Offset',
      value: '500+ tons',
      description: 'Verified carbon credits generated.',
    },
  ];

  const technologies = [
    {
      icon: <Leaf size={48} />,
      title: 'Blockchain Tokens',
      description: 'Rewards system for sustainable actions using blockchain.',
    },
    {
      icon: <Eye size={48} />,
      title: 'Computer Vision',
      description: 'Real-time plantation monitoring and growth tracking.',
    },
    {
      icon: <MapPin size={48} />,
      title: 'Geo Tagging',
      description: 'Accurate location tracking for plantations.',
    },
  ];

  return (
    <>
    <Navbar />
    <div className="relative min-h-screen bg-white overflow-hidden">
      <BlobBackground />
      <div  className="relative z-10 mt-6 container mx-auto px-24 py-12">
        {/* About Us Section */}
        <SectionHeader
          title="About Us"
          subtitle="SeedSociety is transforming tree plantation into a sustainable, community-driven movement."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-2xl font-bold text-emerald-600 mb-4">Our Mission</h3>
            <p className="text-gray-600">
              To create a sustainable future by empowering communities and businesses to take actionable steps towards environmental conservation.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-2xl font-bold text-emerald-600 mb-4">Our Vision</h3>
            <p className="text-gray-600">
              A world where every individual and organization contributes to a greener planet through innovative technology and community engagement.
            </p>
          </motion.div>
        </div>

        {/* Environmental Impact Section */}
        <SectionHeader
          title="Environmental Impact"
          subtitle="Our measurable goals and achievements in creating a sustainable future."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {impacts.map((impact, index) => (
            <ImpactCard key={index} {...impact} />
          ))}
        </div>

        {/* Technology Section */}
        <SectionHeader
          title="Technology Behind SeedSociety"
          subtitle="Innovative technologies driving our mission."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {technologies.map((tech, index) => (
            <TechnologyCard key={index} {...tech} />
          ))}
        </div>

        {/* Team Section */}
        <SectionHeader
          title="Our Team"
          subtitle="Meet the passionate individuals behind SeedSociety."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberTile key={index} {...member} />
          ))}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default AboutUsPage;