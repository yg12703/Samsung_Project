import { useState, useEffect } from 'react';

export const useRouteOptimization = (from, to) => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Simulate AI calculation delay
    const timer = setTimeout(() => {
      setRoutes([
        {
          id: 'fastest',
          type: 'Fastest',
          routeName: 'NH48 Expressway',
          distance: '148 km',
          travelTime: '2h 15m',
          trafficStatus: 'light',
          description: 'Optimized for speed. Uses access-controlled expressways to bypass city congestion.',
          complexity: 'Low',
          impact: 'Minimal',
          accidentCount: 0,
          density: 25,
          hasEmergency: false,
          signalStatus: 'Optimized',
          toll: '₹320'
        },
        {
          id: 'shortest',
          type: 'Shortest',
          routeName: 'Old NH4 Direct',
          distance: '135 km',
          travelTime: '3h 40m',
          trafficStatus: 'moderate',
          description: 'Most direct path. Includes more local roads, ghat sections, and traffic signals.',
          complexity: 'Medium',
          impact: 'Moderate',
          accidentCount: 1,
          density: 65,
          hasEmergency: true,
          signalStatus: 'Standard',
          toll: '₹85'
        },
        {
          id: 'safest',
          type: 'Safest',
          routeName: 'NH44 to State Highway Bypass',
          distance: '165 km',
          travelTime: '3h 10m',
          trafficStatus: 'light',
          description: 'Avoids known accident hotspots, waterlogged areas, and heavy construction zones.',
          complexity: 'Low',
          impact: 'Low',
          accidentCount: 0,
          density: 20,
          hasEmergency: false,
          signalStatus: 'Optimized',
          toll: '₹210'
        }
      ]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [from, to]);

  return { routes, loading };
};