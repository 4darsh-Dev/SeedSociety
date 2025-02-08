import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Download, TrendingUp, Trees, Users, RefreshCw, ChevronLeft } from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Custom hook for managing real-time stats
const useRealTimeStats = () => {
  const [stats, setStats] = useState({
    totalTrees: 0,
    healthyTrees: 0,
    speciesCount: 0,
    contributors: 0
  });

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setStats(prev => ({
        totalTrees: prev.totalTrees + Math.floor(Math.random() * 5),
        healthyTrees: prev.healthyTrees + Math.floor(Math.random() * 3),
        speciesCount: 45, // Static for demo
        contributors: prev.contributors + Math.floor(Math.random() * 2)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return stats;
};

// Stats Card Component
const StatCard = ({ title, value, icon: Icon, trend }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg p-4 shadow-md"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</h3>
        </div>
        <div className="p-3 bg-emerald-100 rounded-full">
          <Icon className="w-6 h-6 text-emerald-600" />
        </div>
      </div>
      {trend && (
        <div className="mt-2 flex items-center text-sm">
          <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
          <span className="text-emerald-600">+{trend}% this week</span>
        </div>
      )}
    </motion.div>
  );
};

// Species Distribution Chart
const SpeciesChart = ({ data }) => {
  const COLORS = ['#059669', '#10B981', '#34D399', '#6EE7B7', '#A7F3D0'];
  
  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        data: data.map(item => item.value),
        backgroundColor: COLORS,
        borderColor: COLORS,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((acc, curr) => acc + curr, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
    cutout: '60%', // Creates a donut chart
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Species Distribution</h3>
      <div className="h-64">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

// Export Button Component
const ExportButton = ({ onExport, format }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await onExport(format);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center justify-center px-4 py-2 rounded-lg 
        ${format === 'csv' ? 'bg-emerald-500 text-white' : 'border-2 border-emerald-500 text-emerald-500'}
        hover:opacity-90 transition-all`}
      onClick={handleExport}
      disabled={isExporting}
    >
      {isExporting ? (
        <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
      ) : (
        <Download className="w-5 h-5 mr-2" />
      )}
      Export {format.toUpperCase()}
    </motion.button>
  );
};

// Main Sidebar Component
const DataVisualizationSidebar = () => {
  const stats = useRealTimeStats();
  const [isOpen, setIsOpen] = useState(true);

  const speciesData = [
    { name: 'Mango', value: 400 },
    { name: 'Neem', value: 300 },
    { name: 'Arjun', value: 300 },
    { name: 'Guava', value: 200 },
    { name: 'Others', value: 100 }
  ];

  const handleExport = async (format) => {
    // Implement export logic here
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
    console.log(`Exporting data in ${format} format`);
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: isOpen ? 0 : '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed right-0 top-0 h-screen w-96 bg-gray-50 shadow-lg overflow-y-auto"
      style={{ marginTop: '4rem' }} // Account for navbar
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 bg-emerald-500 text-white p-2 rounded-l-lg shadow-md"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.div>
      </button>

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4">
          <StatCard
            title="Total Trees"
            value={stats.totalTrees}
            icon={Trees}
            trend={12}
          />
          <StatCard
            title="Contributors"
            value={stats.contributors}
            icon={Users}
            trend={8}
          />
        </div>

        {/* Species Distribution */}
        <SpeciesChart data={speciesData} />

        {/* Export Options */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Export Data</h3>
          <div className="flex gap-4">
            <ExportButton onExport={handleExport} format="csv" />
            <ExportButton onExport={handleExport} format="geojson" />
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-sm text-gray-500 flex items-center">
          <RefreshCw className="w-4 h-4 mr-2" />
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </motion.div>
  );
};

export default DataVisualizationSidebar;