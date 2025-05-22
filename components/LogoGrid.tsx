
import React from 'react';
import { Logo } from '../types';
import LogoCard from './LogoCard';

interface LogoGridProps {
  logos: Logo[];
  isLoading: boolean;
  onLogoSelect: (logo: Logo) => void; // Added onLogoSelect to props
}

const LogoGrid: React.FC<LogoGridProps> = ({ logos, isLoading, onLogoSelect }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"> {/* Adjusted grid for potentially wider cards */}
        {Array.from({ length: 6 }).map((_, index) => ( // Adjusted number of skeletons
          <div key={index} className="bg-surface-container rounded-xl shadow-lg p-4 animate-pulse">
            <div className="w-full h-48 bg-surface-variant rounded mb-4"></div>
            <div className="h-6 bg-surface-variant rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-surface-variant rounded w-1/2 mb-1"></div>
            <div className="h-4 bg-surface-variant rounded w-full mb-1"></div>
            <div className="h-4 bg-surface-variant rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (logos.length === 0) {
    return (
      <div className="text-center py-10 col-span-full"> {/* Ensure it spans full width if inside a grid from parent */}
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 10.5a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3a.5.5 0 01-.5-.5zm0-2a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5z" />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-surface-contrast">No Logos Found</h3>
        <p className="mt-1 text-sm text-gray-500">
          Try adjusting your search or selected navigation item.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"> {/* Adjusted grid for potentially wider cards */}
      {logos.map((logo) => (
        // Fix: Pass onLogoSelect to LogoCard
        <LogoCard key={logo.id} logo={logo} onLogoSelect={onLogoSelect} />
      ))}
    </div>
  );
};

export default LogoGrid;