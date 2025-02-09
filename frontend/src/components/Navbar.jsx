
import { useState, useEffect } from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Leaf className="h-8 w-8 text-emerald-500" />
            <span className="ml-2 text-2xl font-semibold text-gray-800">SeedSociety</span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <a
                href="/"
                className="text-gray-700 hover:text-emerald-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </a>
              <a
                href="/geotags"
                className="text-gray-700 hover:text-emerald-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Geotags
              </a>
              <a
                href="/solutions"
                className="text-gray-700 hover:text-emerald-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Solutions
              </a>
              <a
                href="/marketplace"
                className="text-gray-700 hover:text-emerald-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Store
              </a>
              
              {/* <a
                href="/fundraise"
                className="text-gray-700 hover:text-emerald-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Fundraise
              </a>
              <a
                href="/blog"
                className="text-gray-700 hover:text-emerald-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Blog
              </a> */}
              <a
                href="/about"
                className="text-gray-700 hover:text-emerald-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                About Us
              </a>
              <a
                href="/contact"
                className="text-gray-700 hover:text-emerald-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Contact Us
              </a>
              <button className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition-colors">
                Join Us
              </button>
            </div>
          </div>


          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
{isMobileMenuOpen && (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="md:hidden bg-white shadow-lg"
  >
    <div className="px-2 pt-2 pb-3 space-y-1">
      {[
        { name: 'Home', path: '/' },
        { name: 'Geotags', path: '/geotags' },
        { name: 'Solution', path: '/solutions' },
        { name: 'Store', path: '/marketplace' },

        { name: 'About Us', path: '/about' },
        { name: 'Contact Us', path: '/contact' },
      ].map((item) => (
        <a
          key={item.name}
          href={item.path}
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-500 hover:bg-gray-50"
        >
          {item.name}
        </a>
      ))}
    </div>
  </motion.div>
)}
    </motion.nav>
  );
};

export default Navbar;