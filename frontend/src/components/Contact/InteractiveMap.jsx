
import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';

const mapAccessToken = import.meta.env.VITE_MAP_ACCESS_TOKEN;

const InteractiveMap = () => {
  useEffect(() => {
    // Initialize map
    const map = L.map('map', {
      scrollWheelZoom: false, // Disable scroll to prevent accidental zooming
    }).setView([28.7041, 77.1025], 5);

    // Tile layer with a modern theme
    L.tileLayer('https://{s}.tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token='+ mapAccessToken, {
      attribution:
        '© <a href="https://jawg.io" target="_blank">Jawg Maps</a> contributors, © <a href="https://www.openstreetmap.org" target="_blank">OpenStreetMap</a>',
    }).addTo(map);

    // Custom marker icon
    const customIcon = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // Custom marker icon
      iconSize: [40, 40],
      iconAnchor: [20, 40], // Adjust anchor for proper placement
      popupAnchor: [0, -40],
    });

    // Add marker with custom popup
    const marker = L.marker([28.7041, 77.1025], { icon: customIcon }).addTo(map);
    marker.bindPopup('<b>New Delhi</b><br>Capital of India.').openPopup();

    const marker2 = L.marker([20.5937, 78.9629], { icon: customIcon }).addTo(map);
    marker2.bindPopup('<b>SeedSociety HQ</b><br>Central Location.').openPopup();

    return () => map.remove();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="relative w-full h-[500px] rounded-2xl shadow-xl overflow-hidden border border-gray-200 bg-white"
    >
      {/* Map Container */}
      <div id="map" className="w-full h-full"></div>

      {/* Floating Controls */}
      <div className="absolute top-4 left-4 z-10 flex space-x-4">
        <button
          onClick={() => alert('Zoom In')}
          className="p-2 bg-emerald-500 text-white rounded-full shadow-md hover:bg-emerald-600 transition"
        >
          +
        </button>
        <button
          onClick={() => alert('Zoom Out')}
          className="p-2 bg-emerald-500 text-white rounded-full shadow-md hover:bg-emerald-600 transition"
        >
          -
        </button>
      </div>
    </motion.div>
  );
};

export default InteractiveMap;
