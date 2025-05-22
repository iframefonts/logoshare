import React from 'react';
import { Logo } from '../types';
import Chip from './ui/Chip';
import Button from './ui/Button';
import { EllipsisHorizontalIcon } from '../constants';

interface LogoTableProps {
  logos: Logo[];
  isLoading: boolean;
  onLogoSelect: (logo: Logo) => void;
  onShareLogo: (logo: Logo) => void; // New prop for sharing
}

const LogoTable: React.FC<LogoTableProps> = ({ logos, isLoading, onLogoSelect, onShareLogo }) => {
  if (isLoading) {
    return (
      <div className="bg-surface-container shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-outline">
          <thead className="bg-surface-variant">
            <tr>
              {[...Array(6)].map((_, i) => (
                <th key={i} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-surface-container divide-y divide-outline">
            {[...Array(5)].map((_, i) => (
              <tr key={i} className="animate-pulse">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded bg-gray-300"></div>
                    <div className="ml-4 h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </td>
                {[...Array(4)].map((_, j) => (
                  <td key={j} className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="h-6 w-6 bg-gray-300 rounded-full ml-auto"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (logos.length === 0) {
    return (
      <div className="text-center py-10 bg-surface-container shadow rounded-lg">
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
    <div className="bg-surface-container shadow-md rounded-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-outline">
        <thead className="bg-surface-variant">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Share</th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-surface-container divide-y divide-outline">
          {logos.map((logo) => (
            <tr key={logo.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div 
                    className="flex-shrink-0 h-10 w-10 cursor-pointer"
                    onClick={() => onLogoSelect(logo)}
                    onKeyDown={(e) => e.key === 'Enter' && onLogoSelect(logo)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Preview logo ${logo.name}`}
                  >
                    <img 
                        className="h-10 w-10 rounded object-cover bg-gray-200" 
                        src={logo.imageUrl.replace('/200/200', '/40/40')} 
                        alt={`Logo for ${logo.name}`}
                        onError={(e) => (e.currentTarget.src = 'https://picsum.photos/40/40?grayscale')}
                    />
                  </div>
                  <div 
                    className="ml-4 cursor-pointer group"
                    onClick={() => onLogoSelect(logo)}
                    onKeyDown={(e) => e.key === 'Enter' && onLogoSelect(logo)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Preview logo ${logo.name}`}
                  >
                    <div className="text-sm font-medium text-surface-contrast group-hover:text-primary transition-colors">{logo.name}</div>
                    {logo.client && <div className="text-xs text-gray-500 group-hover:text-primary-light transition-colors">{logo.client}</div>}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-700">{logo.categoryName}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Chip 
                  label={logo.status} 
                  size="sm"
                  color={logo.status === 'Published' ? '#D1FAE5' : '#FEF3C7'} 
                  textColor={logo.status === 'Published' ? '#065F46' : '#92400E'}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {logo.status === 'Published' ? (
                  <button 
                    onClick={() => onShareLogo(logo)}
                    className="text-primary hover:text-primary-dark text-sm font-medium"
                  >
                    Share
                  </button>
                ) : (
                  <span>-</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Button variant="tertiary" size="sm" className="!p-1 !rounded-full hover:bg-surface-container-high">
                  <EllipsisHorizontalIcon className="w-5 h-5 text-gray-500"/>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogoTable;
