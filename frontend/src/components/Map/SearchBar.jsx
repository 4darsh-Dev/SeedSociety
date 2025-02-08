import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, X } from 'lucide-react';

const SearchBar = ({ onSearch, recentSearches = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  return (
    <motion.div
      initial={false}
      animate={{ width: isExpanded ? '100%' : '300px' }}
      className="relative"
    >
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          placeholder="Search for localities..."
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
        />
        {searchValue && (
          <button
            onClick={() => setSearchValue('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isExpanded && recentSearches.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-2">
              <h3 className="text-sm font-medium text-gray-500 px-3 py-2">
                Recent Searches
              </h3>
              {recentSearches.map((search, index) => (
                <motion.button
                  key={index}
                  whileHover={{ backgroundColor: '#f3f4f6' }}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left"
                  onClick={() => {
                    setSearchValue(search);
                    onSearch(search);
                  }}
                >
                  <MapPin className="w-5 h-5 text-emerald-500" />
                  <span>{search}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SearchBar;