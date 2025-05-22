
import React from 'react';

interface ChipProps {
  label: string;
  color?: string; // hex color for the chip background
  textColor?: string;
  icon?: React.ReactNode;
  onRemove?: () => void;
  size?: 'sm' | 'md';
}

const Chip: React.FC<ChipProps> = ({ label, color, textColor, icon, onRemove, size = 'md' }) => {
  const chipStyle = color ? { backgroundColor: color, color: textColor || 'white' } : {};
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs rounded' : 'px-2.5 py-1 text-sm rounded-md';

  return (
    <div
      className={`inline-flex items-center ${sizeClasses} font-medium ${!color ? 'bg-surface-variant text-surface-contrast' : ''} leading-none`}
      style={chipStyle}
    >
      {icon && <span className="mr-1.5">{icon}</span>}
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          className={`ml-1.5 -mr-0.5 p-0.5 rounded-full hover:bg-black/20 focus:outline-none focus:bg-black/30 transition-colors`}
          aria-label={`Remove ${label}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Chip;
    