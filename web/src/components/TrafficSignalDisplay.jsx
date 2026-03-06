import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { StopCircle, Timer, Zap } from 'lucide-react';
import { useTrafficSignalOptimization } from '@/hooks/useTrafficSignalOptimization.js';

const TrafficSignalDisplay = () => {
  const { intersections } = useTrafficSignalOptimization();

  const getColorClass = (state) => {
    switch (state) {
      case 'green': return 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]';
      case 'yellow': return 'bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.6)]';
      case 'red': return 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)]';
      default: return 'bg-gray-300';
    }
  };

  return (
    <Card className="overflow-hidden border-2 border-gray-100">
      <CardHeader className="bg-gray-50 border-b border-gray-100 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <StopCircle className="w-5 h-5 text-primary" />
            AI Signal Optimization
          </CardTitle>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 flex items-center gap-1">
            <Zap className="w-3 h-3" /> Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-100">
          {intersections.map((intersection) => (
            <div key={intersection.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div>
                <h4 className="font-semibold text-gray-900">{intersection.name}</h4>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                  Density: {Math.round(intersection.density)}%
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center justify-center bg-gray-900 rounded-lg p-2 gap-1.5 w-12">
                  <div className={`w-4 h-4 rounded-full transition-all duration-300 ${intersection.state === 'red' ? getColorClass('red') : 'bg-gray-700'}`} />
                  <div className={`w-4 h-4 rounded-full transition-all duration-300 ${intersection.state === 'yellow' ? getColorClass('yellow') : 'bg-gray-700'}`} />
                  <div className={`w-4 h-4 rounded-full transition-all duration-300 ${intersection.state === 'green' ? getColorClass('green') : 'bg-gray-700'}`} />
                </div>
                
                <div className="flex flex-col items-end min-w-[60px]">
                  <motion.span 
                    key={intersection.timer}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-2xl font-bold tabular-nums ${
                      intersection.state === 'red' ? 'text-red-600' : 
                      intersection.state === 'yellow' ? 'text-yellow-600' : 'text-green-600'
                    }`}
                  >
                    {intersection.timer}s
                  </motion.span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Timer className="w-3 h-3" /> remaining
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrafficSignalDisplay;