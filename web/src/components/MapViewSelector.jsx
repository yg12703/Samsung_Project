import React, { useState } from 'react';
import { Map, Layers, Satellite } from 'lucide-react';
import { motion } from 'framer-motion';

const MapViewSelector = () => {
  const [activeView, setActiveView] = useState('standard');

  const views = [
    { id: 'standard', label: 'Standard', icon: <Map className="w-4 h-4" /> },
    { id: 'satellite', label: 'Satellite', icon: <Satellite className="w-4 h-4" /> },
    { id: 'traffic', label: 'Traffic', icon: <Layers className="w-4 h-4" /> }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-1 inline-flex relative">
      {views.map((view) => (
        <button
          key={view.id}
          onClick={() => setActiveView(view.id)}
          className={`relative flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors z-10 ${
            activeView === view.id ? 'text-primary-foreground' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {activeView === view.id && (
            <motion.div
              layoutId="activeMapView"
              className="absolute inset-0 bg-primary rounded-md -z-10"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
          {view.icon}
          <span className="hidden sm:inline">{view.label}</span>
        </button>
      ))}
    </div>
  );
};

export default MapViewSelector;