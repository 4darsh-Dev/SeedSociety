import React from "react";
import { Line, Bar } from "react-chartjs-2";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Calendar } from "lucide-react";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  PointElement,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale,
} from "chart.js";

// Register required components for Chart.js
ChartJS.register(LineElement, BarElement, PointElement, Tooltip, Legend, LinearScale, CategoryScale);

import Theme from "./Theme";

const ProgressTimeline = ({ data }) => {
  // Default data fallback if data prop is not provided
  const defaultData = {
    timeline: [
      { name: "Jan", progress: 30 },
      { name: "Feb", progress: 45 },
      { name: "Mar", progress: 65 },
      { name: "Apr", progress: 80 },
    ],
    carbon: {
      total: 125,
      progress: 75,
    },
    team: [
      { name: "Week 1", tasks: 20, completed: 15 },
      { name: "Week 2", tasks: 25, completed: 20 },
      { name: "Week 3", tasks: 30, completed: 25 },
    ],
    esg: [
      { label: "Environmental", value: "85%" },
      { label: "Social", value: "76%" },
      { label: "Governance", value: "92%" },
    ],
  };

  const timelineData = data?.timeline || defaultData.timeline;

  const chartData = {
    labels: timelineData.map((item) => item.name),
    datasets: [
      {
        label: "Progress Line",
        data: timelineData.map((item) => item.progress),
        borderColor: Theme.primary,
        backgroundColor: "rgba(52, 211, 153, 0.2)", // Soft green fill
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: Theme.accent,
        pointHoverRadius: 8,
        tension: 0.3, // Smooth curves
      },
    ],
  };

  const barChartData = {
    labels: timelineData.map((item) => item.name),
    datasets: [
      {
        label: "Progress Bar",
        data: timelineData.map((item) => item.progress),
        backgroundColor: Theme.secondary,
        borderColor: Theme.accent,
        borderWidth: 1,
        borderRadius: 5,
        hoverBackgroundColor: Theme.primary,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: Theme.text,
          font: {
            family: "Poppins, sans-serif",
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: Theme.secondary,
        titleColor: "#fff",
        bodyColor: "#fff",
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        ticks: { color: Theme.text },
        grid: { display: false },
      },
      y: {
        ticks: { color: Theme.text },
        grid: { color: "rgba(17, 24, 39, 0.2)" }, // Light grid
      },
    },
  };

  return (
    <Card className="col-span-2 bg-white shadow-lg rounded-xl transition hover:shadow-2xl duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <Calendar className="h-5 w-5 text-primary" />
          Project Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 animate-fade-in">
          <Line data={chartData} options={chartOptions} />
        </div>
        <div className="h-64 mt-6 animate-fade-in">
          <Bar data={barChartData} options={chartOptions} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressTimeline;