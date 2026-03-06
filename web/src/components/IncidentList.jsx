import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Filter } from 'lucide-react';
import IncidentAlert from './IncidentAlert.jsx';

const IncidentList = ({ incidents = [] }) => {
  const [filter, setFilter] = useState('all');

  const filteredIncidents = incidents.filter(inc => {
    if (filter === 'all') return true;
    return inc.severity === filter;
  });

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            Traffic Incidents
            <span className="bg-gray-100 text-gray-600 text-xs py-0.5 px-2 rounded-full ml-2">
              {incidents.length}
            </span>
          </CardTitle>
        </div>
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
          <Button 
            variant={filter === 'all' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setFilter('all')}
            className="h-8 text-xs"
          >
            All
          </Button>
          <Button 
            variant={filter === 'accident' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setFilter('accident')}
            className="h-8 text-xs"
          >
            Accidents
          </Button>
          <Button 
            variant={filter === 'closure' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setFilter('closure')}
            className="h-8 text-xs"
          >
            Closures
          </Button>
          <Button 
            variant={filter === 'hazard' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setFilter('hazard')}
            className="h-8 text-xs"
          >
            Hazards
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {filteredIncidents.length > 0 ? (
          filteredIncidents.map((incident, index) => (
            <IncidentAlert key={incident.id || index} {...incident} />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No incidents reported for this filter.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IncidentList;    