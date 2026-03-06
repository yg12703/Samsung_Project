import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Siren, ShieldAlert, MapPin } from 'lucide-react';

const EmergencyVehicleAlert = () => {
  const alerts = [
    {
      id: 1,
      type: 'Ambulance',
      location: 'Approaching AIIMS Intersection',
      distance: '0.5 km',
      priority: 'High - Signal Preemption Active',
      color: 'bg-red-500'
    },
    {
      id: 2,
      type: 'Fire Brigade',
      location: 'En route via Bandra-Worli Sea Link',
      distance: '2.5 km',
      priority: 'Medium - Routing Updated',
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="space-y-4">
      {alerts.map((alert, index) => (
        <motion.div
          key={alert.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          <Card className="border-l-4 overflow-hidden shadow-md" style={{ borderLeftColor: alert.color === 'bg-red-500' ? '#ef4444' : '#f97316' }}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-full ${alert.color === 'bg-red-500' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'} animate-pulse`}>
                  <Siren className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-gray-900 flex items-center gap-2">
                      {alert.type} Detected
                      <Badge variant="destructive" className="text-[10px] h-5 px-1.5">Priority</Badge>
                    </h4>
                    <span className="text-sm font-semibold text-gray-700">{alert.distance}</span>
                  </div>
                  <p className="text-sm text-gray-600 flex items-center gap-1 mb-2">
                    <MapPin className="w-3.5 h-3.5" /> {alert.location}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded-md w-fit">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    {alert.priority}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default EmergencyVehicleAlert;