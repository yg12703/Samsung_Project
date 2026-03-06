import React from 'react';
import { motion } from 'framer-motion';

const TrafficIndicator = ({ status, percentage }) => {
  const getColor = () => {
    switch (status) {
      case 'light':
        return '#10b981';
      case 'moderate':
        return '#f59e0b';
      case 'heavy':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const color = getColor();
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="w-24 h-24 transform -rotate-90">
        <circle
          cx="48"
          cy="48"
          r="45"
          stroke="#e5e7eb"
          strokeWidth="8"
          fill="none"
        />
        <motion.circle
          cx="48"
          cy="48"
          r="45"
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="text-2xl font-bold"
          style={{ color }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {percentage}%
        </motion.span>
      </div>
    </div>
  );
};

export default TrafficIndicator;