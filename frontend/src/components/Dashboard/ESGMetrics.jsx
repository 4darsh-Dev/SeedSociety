
import React,{ useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import Theme from './Theme';
import { TrendingUp } from 'lucide-react';

const ESGMetrics = ({ esgData }) => {
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          ESG Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {esgData.map((metric, index) => (
            <div key={index} className="text-center p-4 rounded-lg bg-gray-50">
              <div className="text-2xl font-bold text-primary">{metric.value}</div>
              <div className="text-sm text-gray-600">{metric.label}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ESGMetrics;
