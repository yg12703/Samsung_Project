import { useState, useEffect } from 'react';

export const useSavedRoutes = () => {
  const [savedRoutes, setSavedRoutes] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('trafficSavedRoutes');
    if (stored) {
      try {
        setSavedRoutes(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse saved routes', e);
      }
    }
  }, []);

  const toggleSave = (route) => {
    setSavedRoutes(prev => {
      const isAlreadySaved = prev.some(r => r.routeName === route.routeName);
      let newSaved;
      
      if (isAlreadySaved) {
        newSaved = prev.filter(r => r.routeName !== route.routeName);
      } else {
        newSaved = [...prev, { ...route, savedAt: new Date().toISOString() }];
      }
      
      localStorage.setItem('trafficSavedRoutes', JSON.stringify(newSaved));
      return newSaved;
    });
  };

  const isSaved = (routeName) => {
    return savedRoutes.some(r => r.routeName === routeName);
  };

  return { savedRoutes, toggleSave, isSaved };
};