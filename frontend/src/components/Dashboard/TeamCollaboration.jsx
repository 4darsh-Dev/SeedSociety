import React from "react";
import { Bar } from "react-chartjs-2";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Users } from "lucide-react";
import Theme from "./Theme";
import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale,
} from "chart.js";

// Register required components for Chart.js
ChartJS.register(BarElement, Tooltip, Legend, LinearScale, CategoryScale);

// Default data for team collaboration
const defaultTeamData = [
  { name: "Week 1", tasks: 20, completed: 15 },
  { name: "Week 2", tasks: 25, completed: 20 },
  { name: "Week 3", tasks: 30, completed: 25 },
];

const TeamCollaboration = ({ teamData = defaultTeamData }) => {
  const chartData = {
    labels: teamData.map((item) => item.name),
    datasets: [
      {
        label: "Total Tasks",
        data: teamData.map((item) => item.tasks),
        backgroundColor: Theme.primary,
        borderColor: Theme.accent,
        borderWidth: 1,
        borderRadius: 5,
      },
      {
        label: "Completed Tasks",
        data: teamData.map((item) => item.completed),
        backgroundColor: Theme.secondary,
        borderColor: Theme.accent,
        borderWidth: 1,
        borderRadius: 5,
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
        grid: { color: "rgba(17, 24, 39, 0.2)" },
      },
    },
  };

  return (
    <Card className="col-span-2 bg-white shadow-lg rounded-xl transition hover:shadow-2xl duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <Users className="h-5 w-5 text-primary" />
          Team Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 animate-fade-in">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamCollaboration;
