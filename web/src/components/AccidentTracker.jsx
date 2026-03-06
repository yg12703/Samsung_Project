import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Clock, MapPin } from 'lucide-react';

const AccidentTracker = () => {
  const accidents = [
    {
      id: 1,
      type: 'Severe Waterlogging',
      severity: 'severe',
      location: 'Western Express Highway',
      time: '15 mins ago',
      status: 'Traffic diverted to SV Road'
    },
    {
      id: 2,
      type: 'Pothole Repair Work',
      severity: 'minor',
      location: 'Silk Board Junction, BLR',
      time: '45 mins ago',
      status: 'Slow moving traffic'
    },
    {
      id: 3,
      type: 'Animal Crossing',
      severity: 'moderate',
      location: 'NH44 near Nagpur',
      time: '1 hour ago',
      status: 'Highway patrol clearing'
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'severe': return 'bg-red-100 text-red-800 border-red-200';
      case 'moderate': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'minor': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Incident Tracker
          </CardTitle>
          <Badge variant="destructive" className="rounded-full w-6 h-6 flex items-center justify-center p-0">
            {accidents.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {accidents.map((accident) => (
          <div key={accident.id} className="p-3 rounded-lg border border-gray-100 bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-gray-900 text-sm">{accident.type}</h4>
              <Badge className={`${getSeverityColor(accident.severity)} border text-[10px] uppercase tracking-wider`}>
                {accident.severity}
              </Badge>
            </div>
            <div className="space-y-1.5">
              <p className="text-xs text-gray-600 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gray-400" /> {accident.location}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gray-400" /> {accident.time}
                </span>
                <span className="italic">{accident.status}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AccidentTracker; 