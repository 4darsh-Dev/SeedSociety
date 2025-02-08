

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { motion } from "framer-motion";
import { TreeDeciduous, Search, Filter, TreePalm } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";


// Custom hook for map state management
const useTreeMap = () => {
  const [trees, setTrees] = useState([]);
  const [center, setCenter] = useState([20.5937, 78.9629]);
  const [zoom, setZoom] = useState(5);

  // Simulate fetching tree data
  useEffect(() => {
    // const mockTrees = [
    //   { id: 1, position: [51.505, -0.09], species: "Oak", health: "good" },
    //   { id: 2, position: [51.51, -0.1], species: "Pine", health: "fair" },
    //   { id: 3, position: [51.52, -0.08], species: "Maple", health: "poor" },
    // ];
    const mockTrees = [
      // Andhra Pradesh
      { id: 1, position: [16.5062, 80.6480], species: "Neem", health: "good" },
      { id: 2, position: [16.5080, 80.6500], species: "Mango", health: "fair" },
      { id: 3, position: [16.5100, 80.6520], species: "Arjun", health: "poor" },
      { id: 4, position: [16.5120, 80.6540], species: "Ashoka", health: "good" },
      { id: 5, position: [16.5140, 80.6560], species: "Jamun", health: "good" },
    
      // Arunachal Pradesh
      { id: 6, position: [27.0844, 93.6053], species: "Neem", health: "good" },
      { id: 7, position: [27.0860, 93.6070], species: "Mango", health: "good" },
      { id: 8, position: [27.0880, 93.6090], species: "Arjun", health: "fair" },
      { id: 9, position: [27.0900, 93.6110], species: "Ashoka", health: "poor" },
      { id: 10, position: [27.0920, 93.6130], species: "Jamun", health: "good" },
    
      // Assam
      { id: 11, position: [26.2006, 92.9376], species: "Neem", health: "fair" },
      { id: 12, position: [26.2020, 92.9390], species: "Mango", health: "good" },
      { id: 13, position: [26.2040, 92.9410], species: "Arjun", health: "good" },
      { id: 14, position: [26.2060, 92.9430], species: "Ashoka", health: "poor" },
      { id: 15, position: [26.2080, 92.9450], species: "Jamun", health: "good" },
    
      // Bihar
      { id: 16, position: [25.0961, 85.3131], species: "Neem", health: "good" },
      { id: 17, position: [25.0980, 85.3150], species: "Mango", health: "fair" },
      { id: 18, position: [25.1000, 85.3170], species: "Arjun", health: "good" },
      { id: 19, position: [25.1020, 85.3190], species: "Ashoka", health: "poor" },
      { id: 20, position: [25.1040, 85.3210], species: "Jamun", health: "good" },
    
      // Chhattisgarh
      { id: 21, position: [21.2787, 81.8661], species: "Neem", health: "good" },
      { id: 22, position: [21.2800, 81.8680], species: "Mango", health: "good" },
      { id: 23, position: [21.2820, 81.8700], species: "Arjun", health: "fair" },
      { id: 24, position: [21.2840, 81.8720], species: "Ashoka", health: "poor" },
      { id: 25, position: [21.2860, 81.8740], species: "Jamun", health: "good" },
    
      // Goa
      { id: 26, position: [15.2993, 74.1240], species: "Neem", health: "fair" },
      { id: 27, position: [15.3010, 74.1260], species: "Mango", health: "good" },
      { id: 28, position: [15.3030, 74.1280], species: "Arjun", health: "good" },
      { id: 29, position: [15.3050, 74.1300], species: "Ashoka", health: "poor" },
      { id: 30, position: [15.3070, 74.1320], species: "Jamun", health: "good" },
    
      // Gujarat
      { id: 31, position: [22.2587, 71.1924], species: "Neem", health: "good" },
      { id: 32, position: [22.2600, 71.1940], species: "Mango", health: "fair" },
      { id: 33, position: [22.2620, 71.1960], species: "Arjun", health: "good" },
      { id: 34, position: [22.2640, 71.1980], species: "Ashoka", health: "poor" },
      { id: 35, position: [22.2660, 71.2000], species: "Jamun", health: "good" },
    
      // Haryana
      { id: 36, position: [29.0588, 76.0856], species: "Neem", health: "good" },
      { id: 37, position: [29.0600, 76.0870], species: "Mango", health: "good" },
      { id: 38, position: [29.0620, 76.0890], species: "Arjun", health: "fair" },
      { id: 39, position: [29.0640, 76.0910], species: "Ashoka", health: "poor" },
      { id: 40, position: [29.0660, 76.0930], species: "Jamun", health: "good" },
    
      // Himachal Pradesh
      { id: 41, position: [31.1048, 77.1734], species: "Neem", health: "fair" },
      { id: 42, position: [31.1060, 77.1750], species: "Mango", health: "good" },
      { id: 43, position: [31.1080, 77.1770], species: "Arjun", health: "good" },
      { id: 44, position: [31.1100, 77.1790], species: "Ashoka", health: "poor" },
      { id: 45, position: [31.1120, 77.1810], species: "Jamun", health: "good" },
    
      // Jharkhand
      { id: 46, position: [23.6102, 85.2799], species: "Neem", health: "good" },
      { id: 47, position: [23.6120, 85.2810], species: "Mango", health: "fair" },
      { id: 48, position: [23.6140, 85.2830], species: "Arjun", health: "good" },
      { id: 49, position: [23.6160, 85.2850], species: "Ashoka", health: "poor" },
      { id: 50, position: [23.6180, 85.2870], species: "Jamun", health: "good" },
    
      // Karnataka
      { id: 51, position: [15.3173, 75.7139], species: "Neem", health: "good" },
      { id: 52, position: [15.3190, 75.7150], species: "Mango", health: "good" },
      { id: 53, position: [15.3210, 75.7170], species: "Arjun", health: "fair" },
      { id: 54, position: [15.3230, 75.7190], species: "Ashoka", health: "poor" },
      { id: 55, position: [15.3250, 75.7210], species: "Jamun", health: "good" },
    
      // Kerala
      { id: 56, position: [10.8505, 76.2711], species: "Neem", health: "fair" },
      { id: 57, position: [10.8520, 76.2730], species: "Mango", health: "good" },
      { id: 58, position: [10.8540, 76.2750], species: "Arjun", health: "good" },
      { id: 59, position: [10.8560, 76.2770], species: "Ashoka", health: "poor" },
      { id: 60, position: [10.8580, 76.2790], species: "Jamun", health: "good" },
    
      // Madhya Pradesh
      { id: 61, position: [22.9734, 78.6569], species: "Neem", health: "good" },
      { id: 62, position: [22.9750, 78.6580], species: "Mango", health: "fair" },
      { id: 63, position: [22.9770, 78.6600], species: "Arjun", health: "good" },
      { id: 64, position: [22.9790, 78.6620], species: "Ashoka", health: "poor" },
      { id: 65, position: [22.9810, 78.6640], species: "Jamun", health: "good" },
    
      // Maharashtra
      { id: 66, position: [19.7515, 75.7139], species: "Neem", health: "good" },
      { id: 67, position: [19.7530, 75.7150], species: "Mango", health: "good" },
      { id: 68, position: [19.7550, 75.7170], species: "Arjun", health: "fair" },
      { id: 69, position: [19.7570, 75.7190], species: "Ashoka", health: "poor" },
      { id: 70, position: [19.7590, 75.7210], species: "Jamun", health: "good" },
    
      // Manipur
      { id: 71, position: [24.6637, 93.9063], species: "Neem", health: "fair" },
      { id: 72, position: [24.6650, 93.9080], species: "Mango", health: "good" },
      { id: 73, position: [24.6670, 93.9100], species: "Arjun", health: "good" },
      { id: 74, position: [24.6690, 93.9120], species: "Ashoka", health: "poor" },
      { id: 75, position: [24.6710, 93.9140], species: "Jamun", health: "good" },
    
      // Meghalaya
      { id: 76, position: [25.4670, 91.3662], species: "Neem", health: "good" },
      { id: 77, position: [25.4690, 91.3680], species: "Mango", health: "fair" },
      { id: 78, position: [25.4710, 91.3700], species: "Arjun", health: "good" },
      { id: 79, position: [25.4730, 91.3720], species: "Ashoka", health: "poor" },
      { id: 80, position: [25.4750, 91.3740], species: "Jamun", health: "good" },
    
      // Mizoram
      { id: 81, position: [23.1645, 92.9376], species: "Neem", health: "fair" },
      { id: 82, position: [23.1660, 92.9390], species: "Mango", health: "good" },
      { id: 83, position: [23.1680, 92.9410], species: "Arjun", health: "good" },
      { id: 84, position: [23.1700, 92.9430], species: "Ashoka", health: "poor" },
      { id: 85, position: [23.1720, 92.9450], species: "Jamun", health: "good" },
    
      // Nagaland
      { id: 86, position: [26.1584, 94.5624], species: "Neem", health: "good" },
      { id: 87, position: [26.1600, 94.5640], species: "Mango", health: "fair" },
      { id: 88, position: [26.1620, 94.5660], species: "Arjun", health: "good" },
      { id: 89, position: [26.1640, 94.5680], species: "Ashoka", health: "poor" },
      { id: 90, position: [26.1660, 94.5700], species: "Jamun", health: "good" },
    
      // Odisha
      { id: 91, position: [20.9517, 85.0985], species: "Neem", health: "good" },
      { id: 92, position: [20.9530, 85.1000], species: "Mango", health: "good" },
      { id: 93, position: [20.9550, 85.1020], species: "Arjun", health: "fair" },
      { id: 94, position: [20.9570, 85.1040], species: "Ashoka", health: "poor" },
      { id: 95, position: [20.9590, 85.1060], species: "Jamun", health: "good" },
    
      // Punjab
      { id: 96, position: [30.7333, 76.7794], species: "Neem", health: "fair" },
      { id: 97, position: [30.7350, 76.7810], species: "Mango", health: "good" },
      { id: 98, position: [30.7370, 76.7830], species: "Arjun", health: "good" },
      { id: 99, position: [30.7390, 76.7850], species: "Ashoka", health: "poor" },
      { id: 100, position: [30.7410, 76.7870], species: "Jamun", health: "good" },
    
      // Rajasthan
      { id: 101, position: [26.9124, 75.7873], species: "Neem", health: "good" },
      { id: 102, position: [26.9140, 75.7890], species: "Mango", health: "fair" },
      { id: 103, position: [26.9160, 75.7910], species: "Arjun", health: "good" },
      { id: 104, position: [26.9180, 75.7930], species: "Ashoka", health: "poor" },
      { id: 105, position: [26.9200, 75.7950], species: "Jamun", health: "good" },
    
      // Sikkim
      { id: 106, position: [27.5330, 88.5122], species: "Neem", health: "fair" },
      { id: 107, position: [27.5350, 88.5140], species: "Mango", health: "good" },
      { id: 108, position: [27.5370, 88.5160], species: "Arjun", health: "good" },
      { id: 109, position: [27.5390, 88.5180], species: "Ashoka", health: "poor" },
      { id: 110, position: [27.5410, 88.5200], species: "Jamun", health: "good" },
    
      // Tamil Nadu
      { id: 111, position: [11.1271, 78.6569], species: "Neem", health: "good" },
      { id: 112, position: [11.1290, 78.6580], species: "Mango", health: "good" },
      { id: 113, position: [11.1310, 78.6600], species: "Arjun", health: "fair" },
      { id: 114, position: [11.1330, 78.6620], species: "Ashoka", health: "poor" },
      { id: 115, position: [11.1350, 78.6640], species: "Jamun", health: "good" },
    
      // Telangana
      { id: 116, position: [18.1124, 79.0193], species: "Neem", health: "good" },
      { id: 117, position: [18.1140, 79.0210], species: "Mango", health: "fair" },
      { id: 118, position: [18.1160, 79.0230], species: "Arjun", health: "good" },
      { id: 119, position: [18.1180, 79.0250], species: "Ashoka", health: "poor" },
      { id: 120, position: [18.1200, 79.0270], species: "Jamun", health: "good" },

      // Tripura
      { id: 121, position: [23.9408, 91.9882], species: "Neem", health: "fair" },
      { id: 122, position: [23.9420, 91.9900], species: "Mango", health: "good" },
      { id: 123, position: [23.9440, 91.9920], species: "Arjun", health: "good" },
      { id: 124, position: [23.9460, 91.9940], species: "Ashoka", health: "poor" },
      { id: 125, position: [23.9480, 91.9960], species: "Jamun", health: "good" },
    ];
    setTrees(mockTrees);
  }, []);

  return { trees, center, setCenter, zoom, setZoom };
};

// Custom map controls
const MapControls = ({ onSearch, onFilter, onThemeToggle }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute top-4 left-4 z-[1000] bg-white rounded-lg shadow-lg p-4 w-full max-w-md"
    >
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search location..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-lg bg-emerald-500 text-white"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Filter className="w-5 h-5" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-lg bg-indigo-500 text-white"
          onClick={onThemeToggle}
        >
          Theme
        </motion.button>
      </div>

      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="mt-4 space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Species
              </label>
              <select
                className="w-full rounded-lg border border-gray-200 p-2 focus:border-emerald-500"
                onChange={(e) => onFilter({ type: "species", value: e.target.value })}
              >
                <option value="">All Species</option>
                <option value="Neem">Neem</option>
                <option value="Mango">Mango</option>
                <option value="Ashoka">Ashoka</option>
                <option value="Arjun">Arjun</option>
                <option value="Jamun">Jamun</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Health Status
              </label>
              <select
                className="w-full rounded-lg border border-gray-200 p-2 focus:border-emerald-500"
                onChange={(e) => onFilter({ type: "health", value: e.target.value })}
              >
                <option value="">All Statuses</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

// Legend component


const Legend = () => (
  <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg">
    <h4 className="font-semibold mb-2">Legend</h4>
    <ul>
      <li className="flex items-center space-x-2">
        <TreePalm className="text-emerald-500" size={20} />
        <span>Good</span>
      </li>
      <li className="flex items-center space-x-2">
        <TreePalm className="text-yellow-500" size={20} />
        <span>Fair</span>
      </li>
      <li className="flex items-center space-x-2">
        <TreePalm className="text-red-500" size={20} />
        <span>Poor</span>
      </li>
    </ul>
  </div>
);

const getTreeIcon = (health) => {
  let color;
  if (health === "good") color = "text-emerald-500";
  else if (health === "fair") color = "text-yellow-500";
  else color = "text-red-500";

  return L.divIcon({
    html: `<div class="${color}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2C10.9 2 10 2.9 10 4V5H8C6.34 5 5 6.34 5 8V9H4C2.9 9 2 9.9 2 11V12C2 13.1 2.9 14 4 14H5V15C5 16.66 6.34 18 8 18H10V19C10 20.1 10.9 21 12 21H13C14.1 21 15 20.1 15 19V18H17C18.66 18 20 16.66 20 15V14H21C22.1 14 23 13.1 23 12V11C23 9.9 22.1 9 21 9H20V8C20 6.34 18.66 5 17 5H15V4C15 2.9 14.1 2 13 2H12Z"/></svg></div>`,
    className: "",
    iconSize: [30, 30], 
    iconAnchor: [15, 15], 
  });
};

// Main tree map component
const TreeMap = () => {
  const { trees, center, setCenter, zoom, setZoom } = useTreeMap();
  const [theme, setTheme] = useState("light");
  const [filters, setFilters] = useState({});

  const handleSearch = async (query) => {
    console.log("Searching for:", query);
  };

  const handleFilter = (filter) => {
    setFilters((prev) => ({ ...prev, [filter.type]: filter.value }));
  };

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const filteredTrees = trees.filter((tree) => {
    return (
      (!filters.species || tree.species.toLowerCase() === filters.species.toLowerCase()) &&
      (!filters.health || tree.health.toLowerCase() === filters.health.toLowerCase())
    );
  });

  const tileLayerUrl =
    theme === "light"
      ? `https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token=${import.meta.env.VITE_MAP_ACCESS_TOKEN}`
      : `https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=${import.meta.env.VITE_MAP_ACCESS_TOKEN}`;

  return (
    <div className="relative h-[calc(100vh-4rem)]">
      <MapControls onSearch={handleSearch} onFilter={handleFilter} onThemeToggle={toggleTheme} />
      <Legend />
      <MapContainer center={center} zoom={zoom} className="h-full w-full">
        <TileLayer url={tileLayerUrl} />
        <MarkerClusterGroup>
          {/* {filteredTrees.map((tree) => (
            <Marker
              key={tree.id}
              position={tree.position}
              icon={L.divIcon({
                html: `<div class="w-4 h-4 rounded-full ${
                  tree.health === "good"
                    ? "bg-emerald-500"
                    : tree.health === "fair"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }"></div>`,
                className: "",
              })}
            />
          ))} */}
              {filteredTrees.map((tree) => (
      <Marker key={tree.id} position={tree.position} icon={getTreeIcon(tree.health)} />
    ))}

        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default TreeMap;
