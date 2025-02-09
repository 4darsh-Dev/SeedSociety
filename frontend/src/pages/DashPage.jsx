
import React, { useState, useEffect } from 'react';
import ProgressTimeline from "../components/Dashboard/ProgressTimeline";
import CarbonOffsetCard from "../components/Dashboard/CarbonOffsetCard";
import ESGMetrics from "../components/Dashboard/ESGMetrics";
import TeamCollaboration from "../components/Dashboard/TeamCollaboration";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DashboardPage = () => {
    // Sample data - in a real app, this would come from an API
    const [data, setData] = useState({
      timeline: [
        { name: 'Jan', progress: 30 },
        { name: 'Feb', progress: 45 },
        { name: 'Mar', progress: 65 },
        { name: 'Apr', progress: 80 },
      ],
      carbon: {
        total: 125,
        progress: 75,
      },
      team: [
        { name: 'Week 1', tasks: 20, completed: 15 },
        { name: 'Week 2', tasks: 25, completed: 20 },
        { name: 'Week 3', tasks: 30, completed: 25 },
      ],
      esg: [
        { label: 'Environmental', value: '85%' },
        { label: 'Social', value: '76%' },
        { label: 'Governance', value: '92%' },
      ],
    });
  
    return (
      <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Organization Dashboard</h1>
          
          <div className="grid grid-cols-3 gap-6">
            {/* Progress Timeline */}
            <ProgressTimeline data={data.timeline} />
            
            {/* Carbon Offset Calculator */}
            <CarbonOffsetCard carbonData={data.carbon} />
            
            {/* Team Collaboration */}
            <TeamCollaboration teamData={data.team} />
            
            {/* ESG Metrics */}
            <ESGMetrics esgData={data.esg} />
          </div>
        </div>
      </div>
      <Footer />
      </>
    );
  };
  
  export default DashboardPage;