import { motion } from 'framer-motion';
import { Trophy, Leaf, TreePine } from 'lucide-react';

const contributors = [
  {
    id: 1,
    name: "Sarah Johnson",
    trees: 1547,
    location: "California, USA",
    imageUrl: "https://sabimages.com/wp-content/uploads/2024/07/cute-girl-pic-dp25.jpg",
    badge: "Forest Guardian"
  },
  {
    id: 2,
    name: "Michael Chen",
    trees: 1285,
    location: "Vancouver, Canada",
    imageUrl: "https://sabimages.com/wp-content/uploads/2024/07/cute-girl-pic-dp25.jpg",
    badge: "Earth Champion"
  },
  {
    id: 3,
    name: "Emma Williams",
    trees: 1123,
    location: "London, UK",
    imageUrl: "https://sabimages.com/wp-content/uploads/2024/07/cute-girl-pic-dp25.jpg",
    badge: "Green Warrior"
  },
  // Add more contributors as needed
];

const ContributorCard = ({ contributor, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300"
    >
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img
            src={contributor.imageUrl}
            alt={contributor.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500"
          />
          {index === 0 && (
            <Trophy className="absolute -top-2 -right-2 w-6 h-6 text-yellow-500" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{contributor.name}</h3>
          <p className="text-sm text-gray-600">{contributor.location}</p>
          <div className="mt-2 flex items-center space-x-2">
            <TreePine className="w-4 h-4 text-emerald-500" />
            <span className="text-emerald-600 font-medium">
              {contributor.trees.toLocaleString()} trees planted
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
          {contributor.badge}
        </span>
      </div>
    </motion.div>
  );
};

const TopContributors = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Green Champions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet the incredible individuals leading our mission for a greener planet.
            Their dedication inspires us all to make a difference.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contributors.map((contributor, index) => (
            <ContributorCard
              key={contributor.id}
              contributor={contributor}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <button className="inline-flex items-center px-6 py-3 border border-emerald-500 text-emerald-500 rounded-lg hover:bg-emerald-50 transition-colors">
            <Leaf className="w-5 h-5 mr-2" />
            View All Contributors
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default TopContributors;