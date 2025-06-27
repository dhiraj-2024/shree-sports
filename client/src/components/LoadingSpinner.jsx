// /Users/rajputdhiraj/Desktop/shree-sports-academy/client/src/components/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = ({ size = 'medium', color = 'blue' }) => {
  const sizeClasses = {
    small: 'h-6 w-6 border-2',
    medium: 'h-8 w-8 border-4',
    large: 'h-12 w-12 border-4',
    xlarge: 'h-16 w-16 border-4'
  };

  const colorClasses = {
    blue: 'border-blue-500 border-t-transparent',
    white: 'border-white border-t-transparent',
    gray: 'border-gray-500 border-t-transparent',
    primary: 'border-primary-500 border-t-transparent'
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]}`}
      ></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;