import { useState, useEffect } from 'react';

export const useRouteHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem('trafficRouteHistory');
    if (storedHistory) {
      try {
        setHistory(JSON.parse(storedHistory));
      } catch (e) {
        console.error('Failed to parse route history', e);
      }
    }
  }, []);

  const addRoute = (from, to) => {
    if (!from || !to) return;
    
    setHistory(prev => {
      // Remove duplicate if exists
      const filtered = prev.filter(route => !(route.from === from && route.to === to));
      
      const newRoute = {
        id: `${from}-${to}-${Date.now()}`,
        from,
        to,
        timestamp: new Date().toISOString()
      };
      
      const newHistory = [newRoute, ...filtered].slice(0, 10); // Keep last 10
      localStorage.setItem('trafficRouteHistory', JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('trafficRouteHistory');
  };

  return { history, addRoute, clearHistory };
};