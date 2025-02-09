import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, Twitter } from 'lucide-react';

const TeamMemberTile = ({ name, role, image, socials }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white p-6 rounded-lg shadow-lg text-center"
    >
      <img
        src={image}
        alt={name}
        className="w-32 h-32 rounded-full mx-auto mb-4"
      />
      <h3 className="text-xl font-semibold text-emerald-600">{name}</h3>
      <p className="text-gray-600 mb-4">{role}</p>
      <div className="flex justify-center space-x-4">
        <a href={socials.linkedin} className="text-emerald-500 hover:text-emerald-700">
          <Linkedin size={24} />
        </a>
        <a href={socials.github} className="text-emerald-500 hover:text-emerald-700">
          <Github size={24} />
        </a>
        <a href={socials.twitter} className="text-emerald-500 hover:text-emerald-700">
          <Twitter size={24} />
        </a>
      </div>
    </motion.div>
  );
};

export default TeamMemberTile;