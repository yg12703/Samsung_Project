import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Activity, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const TrafficDensityHeatmap = () => {
  const segments = [
    { id: 1, name: 'Outer Ring Road (BLR)', density: 95, trend: 'increasing', vehicles: 3240 },
    { id: 2, name: 'Western Express Highway (BOM)', density: 85, trend: 'stable', vehicles: 2850 },
    { id: 3, name: 'Delhi-Gurgaon Expressway', density: 75, trend: 'decreasing', vehicles: 2420 },
    { id: 4, name: 'IT Corridor (HYD)', density: 40, trend: 'stable', vehicles: 1150 },
  ];

  const getDensityColor = (density) => {
    if (density >= 80) return 'bg-red-500';
    if (density >= 60) return 'bg-orange-500';
    if (density >= 30) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'decreasing': return <TrendingDown className="w-4 h-4 text-green-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <Card className="overflow-hidden">
      <div 
        className="h-32 bg-cover bg-center relative"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1682693619732-3153f4f8385c)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Activity className="w-5 h-5" /> Live Density Map
          </h3>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500" title="0-30%" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" title="30-60%" />
            <div className="w-3 h-3 rounded-full bg-orange-500" title="60-80%" />
            <div className="w-3 h-3 rounded-full bg-red-500" title="80-100%" />
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="space-y-4">
          {segments.map((segment) => (
            <div key={segment.id} className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-gray-900">{segment.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 text-xs">{segment.vehicles} vehicles/hr</span>
                  {getTrendIcon(segment.trend)}
                </div>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${getDensityColor(segment.density)}`}
                  style={{ width: `${segment.density}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrafficDensityHeatmap;