import React from 'react';
import ReactFlow, { 
  Handle, 
  Position, 
  Background, 
  Controls,
  MarkerType 
} from 'reactflow';
import { motion } from 'framer-motion';
import { Server, Database, Box, Cloud } from 'lucide-react';

// Custom Node Components
const ServiceNode = ({ data }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="px-4 py-3 rounded-lg bg-white/90 backdrop-blur-sm border-2 border-emerald-100 shadow-lg"
    >
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-md bg-emerald-100">
          {data.icon}
        </div>
        <div>
          <h3 className="font-medium text-emerald-900">{data.label}</h3>
          <p className="text-sm text-emerald-600">{data.description}</p>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </motion.div>
  );
};

const TechStackVisualization = () => {
  const initialNodes = [
    {
      id: '1',
      type: 'service',
      position: { x: 250, y: 0 },
      data: { 
        label: 'Frontend (React Native)',
        description: 'Mobile UI Components',
        icon: <Box className="w-5 h-5 text-emerald-600" />
      }
    },
    {
      id: '2',
      type: 'service',
      position: { x: 250, y: 100 },
      data: { 
        label: 'Backend Services',
        description: 'Node.js + Express + Flask',
        icon: <Server className="w-5 h-5 text-emerald-600" />
      }
    },
    {
      id: '3',
      type: 'service',
      position: { x: 100, y: 200 },
      data: { 
        label: 'PostgreSQL',
        description: 'Main Database',
        icon: <Database className="w-5 h-5 text-emerald-600" />
      }
    },
    {
      id: '4',
      type: 'service',
      position: { x: 400, y: 200 },
      data: { 
        label: 'Pinecone Vector DB',
        description: 'Vector Storage',
        icon: <Database className="w-5 h-5 text-emerald-600" />
      }
    },
    {
      id: '5',
      type: 'service',
      position: { x: 250, y: 300 },
      data: { 
        label: 'AI Services',
        description: 'PyTorch + ML Models',
        icon: <Cloud className="w-5 h-5 text-emerald-600" />
      }
    },
  ];

  const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', animated: true, markerEnd: { type: MarkerType.Arrow } },
    { id: 'e2-3', source: '2', target: '3', animated: true, markerEnd: { type: MarkerType.Arrow } },
    { id: 'e2-4', source: '2', target: '4', animated: true, markerEnd: { type: MarkerType.Arrow } },
    { id: 'e2-5', source: '2', target: '5', animated: true, markerEnd: { type: MarkerType.Arrow } },
  ];

  const nodeTypes = {
    service: ServiceNode,
  };

  return (
    <div className="h-[600px] bg-gradient-to-b from-emerald-50/50 to-white rounded-xl shadow-lg border border-emerald-100">
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={initialNodes}
        edges={initialEdges}
        fitView
        className="bg-emerald-50/30"
      >
        <Background color="#10B981" size={1.5} gap={16} />
        <Controls className="bg-white shadow-lg border-emerald-100" />
      </ReactFlow>
    </div>
  );
};

export default TechStackVisualization;