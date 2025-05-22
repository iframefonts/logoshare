import React from 'react';
import { Logo } from '../types';
import Chip from './ui/Chip';
import { FontIcon, ColorSwatchIcon, TagIcon, ClientIcon } from '../constants';

interface LogoCardProps {
  logo: Logo;
  onLogoSelect: (logo: Logo) => void;
}

const LogoCard: React.FC<LogoCardProps> = ({ logo, onLogoSelect }) => {
  return (
    <div 
      className="bg-surface-container rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full cursor-pointer"
      onClick={() => onLogoSelect(logo)}
      onKeyDown={(e) => e.key === 'Enter' && onLogoSelect(logo)}
      role="button"
      tabIndex={0}
      aria-label={`Preview logo ${logo.name}`}
    >
      <img 
        src={logo.imageUrl} 
        alt={logo.name} 
        className="w-full h-48 object-cover" 
        onError={(e) => (e.currentTarget.src = 'https://picsum.photos/400/300?grayscale')} // Fallback
      />
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold text-primary mb-1">{logo.name}</h3>
        {logo.client && <p className="text-xs text-gray-500 mb-2 flex items-center"><ClientIcon className="w-3.5 h-3.5 mr-1 text-gray-400"/>Client: {logo.client}</p>}
        
        <div className="space-y-2 mb-3 flex-grow">
          <div className="flex items-start text-xs text-gray-600">
            <FontIcon className="w-4 h-4 mr-1.5 text-gray-400 flex-shrink-0 mt-0.5" />
            <span className="font-medium mr-1">Fonts:</span>
            <span>{logo.fontsUsed.join(', ') || 'N/A'}</span>
          </div>
          <div className="flex items-start text-xs text-gray-600">
            <ColorSwatchIcon className="w-4 h-4 mr-1.5 text-gray-400 flex-shrink-0 mt-0.5"/>
            <span className="font-medium mr-1">Colors:</span>
            <div className="flex flex-wrap gap-1">
              {logo.colors.map(color => (
                <Chip key={color.hex} label={color.name} color={color.hex} textColor={getContrastColor(color.hex)} size="sm"/>
              ))}
              {logo.colors.length === 0 && 'N/A'}
            </div>
          </div>
          <div className="flex items-start text-xs text-gray-600">
            <TagIcon className="w-4 h-4 mr-1.5 text-gray-400 flex-shrink-0 mt-0.5"/>
            <span className="font-medium mr-1">Style:</span>
            <span>{logo.style || 'N/A'}</span>
          </div>
        </div>

        {logo.tags && logo.tags.length > 0 && (
          <div className="mt-auto pt-2 border-t border-outline">
            <p className="text-xs font-medium text-gray-500 mb-1">Tags:</p>
            <div className="flex flex-wrap gap-1.5">
              {logo.tags.map(tag => (
                <Chip key={tag} label={tag} size="sm"/>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to determine text color based on background hex
function getContrastColor(hexcolor: string): string {
  if (!hexcolor) return '#000000';
  hexcolor = hexcolor.replace("#", "");
  const r = parseInt(hexcolor.substring(0, 2), 16);
  const g = parseInt(hexcolor.substring(2, 4), 16);
  const b = parseInt(hexcolor.substring(4, 6), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? '#000000' : '#FFFFFF';
}

export default LogoCard;