import { useState, useEffect, useCallback } from 'react';

export const useTrafficData = (from, to) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchTrafficData = useCallback(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockData = {
        mainRoute: {
          routeName: 'NH48 Express (Recommended)',
          distance: '280 km',
          travelTime: '4h 45m',
          trafficStatus: 'light',
          description: 'Fastest route with minimal traffic. Clear conditions throughout most of the journey.',
          percentage: Math.floor(Math.random() * 20) + 10 // Randomize slightly to show updates
        },
        alternativeRoutes: [
          {
            routeName: 'Old Highway / State Highway',
            distance: '310 km',
            travelTime: '6h 10m',
            trafficStatus: 'moderate',
            description: 'Moderate traffic near town centers. Add 1 hour 25 minutes to travel time.',
            isAlternative: true
          },
          {
            routeName: 'Scenic Coastal/Ghat Route',
            distance: '345 km',
            travelTime: '7h 30m',
            trafficStatus: 'heavy',
            description: 'Heavy congestion in ghat sections. Scenic but significantly slower.',
            isAlternative: true
          }
        ],
        incidents: [
          { id: 1, type: 'Waterlogging', location: 'NH48, Km 45', severity: 'closure', delay: '25 min', description: 'Left lanes closed due to heavy monsoon rain.' },
          { id: 2, type: 'Accident', location: 'NH44, Km 120', severity: 'accident', delay: '40 min', description: 'Multi-vehicle collision, highway patrol on scene.' },
          { id: 3, type: 'Hazard', location: 'State Highway 10', severity: 'hazard', delay: '10 min', description: 'Cattle crossing and pothole repair work.' }
        ]
      };
      
      setData(mockData);
      setLastUpdated(new Date());
      setLoading(false);
    }, 800);
  }, [from, to]);

  useEffect(() => {
    fetchTrafficData();
    
    // Auto-refresh every 30 seconds
    const intervalId = setInterval(() => {
      fetchTrafficData();
    }, 30000);

    return () => clearInterval(intervalId);
  }, [fetchTrafficData]);

  return { data, loading, lastUpdated, refresh: fetchTrafficData };
};