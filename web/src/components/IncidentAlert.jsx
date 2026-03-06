import React from 'react';
import { AlertTriangle, AlertCircle, AlertOctagon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const IncidentAlert = ({ type, location, severity, delay, description }) => {
  const getSeverityConfig = () => {
    switch (severity?.toLowerCase()) {
      case 'accident':
        return {
          color: 'bg-red-50 border-red-200',
          icon: <AlertOctagon className="w-5 h-5 text-red-600" />,
          badge: 'bg-red-100 text-red-800 border-red-200'
        };
      case 'closure':
        return {
          color: 'bg-orange-50 border-orange-200',
          icon: <AlertTriangle className="w-5 h-5 text-orange-600" />,
          badge: 'bg-orange-100 text-orange-800 border-orange-200'
        };
      case 'hazard':
      default:
        return {
          color: 'bg-yellow-50 border-yellow-200',
          icon: <AlertCircle className="w-5 h-5 text-yellow-600" />,
          badge: 'bg-yellow-100 text-yellow-800 border-yellow-200'
        };
    }
  };

  const config = getSeverityConfig();

  return (
    <div className={`p-4 rounded-lg border ${config.color} transition-all hover:shadow-md`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex-shrink-0">
          {config.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="font-semibold text-gray-900 truncate">{type}</h4>
            <Badge className={`${config.badge} border text-xs whitespace-nowrap`}>
              {delay} delay
            </Badge>
          </div>
          <p className="text-sm font-medium text-gray-700 mb-1">{location}</p>
          {description && (
            <p className="text-sm text-gray-600">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default IncidentAlert;