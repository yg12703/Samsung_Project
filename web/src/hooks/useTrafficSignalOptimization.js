import { useState, useEffect } from 'react';

const INITIAL_INTERSECTIONS = [
  { id: 1, name: 'Rajiv Chowk (Connaught Place)', state: 'green', timer: 85, density: 85 },
  { id: 2, name: 'Silk Board Junction (BLR)', state: 'red', timer: 110, density: 95 },
  { id: 3, name: 'Marine Drive & Veer Nariman Rd', state: 'yellow', timer: 5, density: 60 },
];

export const useTrafficSignalOptimization = () => {
  const [intersections, setIntersections] = useState(INITIAL_INTERSECTIONS);

  useEffect(() => {
    const interval = setInterval(() => {
      setIntersections((prev) =>
        prev.map((intersection) => {
          let { state, timer, density } = intersection;
          
          timer -= 1;
          
          if (timer <= 0) {
            // AI Optimization: Calculate next duration based on density
            // Higher density = longer green light (up to 120s), shorter red light
            if (state === 'green') {
              state = 'yellow';
              timer = 5; // Yellow is always 5 seconds
            } else if (state === 'yellow') {
              state = 'red';
              timer = Math.max(60, Math.floor(120 - (density * 0.6))); // 60-120s
            } else if (state === 'red') {
              state = 'green';
              timer = Math.max(60, Math.floor(60 + (density * 0.6))); // 60-120s
              // Randomize density slightly for next cycle
              density = Math.max(10, Math.min(100, density + (Math.random() * 20 - 10)));
            }
          }
          
          return { ...intersection, state, timer, density };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return { intersections };
};