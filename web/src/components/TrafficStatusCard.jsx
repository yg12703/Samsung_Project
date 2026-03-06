import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Navigation, TrendingUp, Heart, AlertTriangle, Activity, Siren, StopCircle } from 'lucide-react';
import { useSavedRoutes } from '@/hooks/useSavedRoutes.js';
import { useToast } from '@/hooks/use-toast.js';

const TrafficStatusCard = ({
  routeName,
  distance,
  travelTime,
  trafficStatus,
  description,
  isAlternative = false,
  accidentCount = 0,
  density = 0,
  hasEmergency = false,
  signalStatus = 'Standard'
}) => {
  const { toggleSave, isSaved } = useSavedRoutes();
  const { toast } = useToast();
  const saved = isSaved(routeName);

  const handleSave = (e) => {
    e.stopPropagation();
    toggleSave({ routeName, distance, travelTime, trafficStatus, description, isAlternative });
    toast({
      title: saved ? "Route Removed" : "Route Saved",
      description: saved ? `${routeName} removed from saved routes.` : `${routeName} added to saved routes.`,
    });
  };

  const getStatusColor = () => {
    switch (trafficStatus) {
      case 'light': return 'bg-green-100 text-green-800 border-green-200';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'heavy': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDensityColor = (d) => {
    if (d >= 80) return 'text-red-500';
    if (d >= 60) return 'text-orange-500';
    if (d >= 30) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden border-2 hover:shadow-2xl transition-all duration-300 cursor-pointer relative group">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
          onClick={handleSave}
        >
          <Heart className={`w-5 h-5 ${saved ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </Button>
        
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4 pr-10">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{routeName}</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {isAlternative && <Badge variant="outline">Alternative Route</Badge>}
                {hasEmergency && (
                  <Badge variant="destructive" className="animate-pulse flex items-center gap-1">
                    <Siren className="w-3 h-3" /> Emergency Active
                  </Badge>
                )}
              </div>
            </div>
            <Badge className={`${getStatusColor()} border capitalize`}>
              {trafficStatus} Traffic
            </Badge>
          </div>

          <p className="text-gray-600 mb-4 text-sm">{description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 flex items-center gap-1"><Navigation className="w-3 h-3" /> Dist</span>
              <span className="text-sm font-semibold text-gray-900">{distance}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" /> Time</span>
              <span className="text-sm font-semibold text-gray-900">{travelTime}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 flex items-center gap-1"><Activity className="w-3 h-3" /> Density</span>
              <span className={`text-sm font-semibold ${getDensityColor(density)}`}>{density}%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Alerts</span>
              <span className="text-sm font-semibold text-gray-900">{accidentCount}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-3">
            <span className="flex items-center gap-1">
              <StopCircle className="w-4 h-4 text-primary" /> Signals: {signalStatus}
            </span>
            <span className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4" /> Live Updated
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TrafficStatusCard;