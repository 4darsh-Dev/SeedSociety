import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Calendar } from "lucide-react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale,
} from "chart.js";

// Register required components for Chart.js
ChartJS.register(LineElement, PointElement, Tooltip, Legend, LinearScale, CategoryScale);

import Theme from "./Theme";

const ProgressTimeline = ({ data }) => {
  // Ensure valid data is passed; otherwise, use default values
  const defaultData = [
    { name: "Jan", progress: 30 },
    { name: "Feb", progress: 45 },
    { name: "Mar", progress: 65 },
    { name: "Apr", progress: 80 },
  ];

  // Use data.timeline if available, otherwise fallback to defaultData
  const timelineData = data?.timeline || defaultData;

  const chartData = {
    labels: timelineData.map((item) => item.name),
    datasets: [
      {
        label: "Project Progress",
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
      </CardContent>
    </Card>
  );
};

export default ProgressTimeline;
