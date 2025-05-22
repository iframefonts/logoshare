
import React, { useEffect } from 'react';
import { Logo } from '../types';
import { CloseIcon, ChevronDownIcon, FontIcon, ColorSwatchIcon, LinkIcon, ExternalLinkIcon } from '../constants';
import Button from './ui/Button'; 
import Chip from './ui/Chip'; 

interface LogoPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  logo: Logo | null;
  onOpenShareModal: (logo: Logo) => void; // New prop to open share options
}

const LogoPreviewModal: React.FC<LogoPreviewModalProps> = ({ isOpen, onClose, logo, onOpenShareModal }) => {
  const [showContent, setShowContent] = React.useState(false);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        setShowContent(true);
      });
    } else {
      setShowContent(false);
    }
  }, [isOpen]);


  if (!isOpen && !showContent) { 
    return null;
  }

  if (!logo) return null;

  const getContrastColor = (hexcolor: string): string => {
    if (!hexcolor) return '#000000';
    hexcolor = hexcolor.replace("#", "");
    const r = parseInt(hexcolor.substring(0, 2), 16);
    const g = parseInt(hexcolor.substring(2, 4), 16);
    const b = parseInt(hexcolor.substring(4, 6), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#000000' : '#FFFFFF';
  };


  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="logo-preview-modal-title"
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ease-in-out ${isOpen && showContent ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose} 
    >
      <div className="fixed inset-0 bg-black/60" />

      <div
        className={`bg-surface-container rounded-xl shadow-2xl w-full max-w-lg m-4 transform transition-all duration-300 ease-in-out overflow-hidden
                    ${isOpen && showContent ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-outline">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full mr-3 flex items-center justify-center text-sm font-semibold text-gray-600">
              {logo.client?.substring(0,1) || 'L'}
            </div>
            <span className="text-sm font-medium text-surface-contrast">{logo.client || 'Client Name'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="tertiary" 
              size="sm" 
              rightIcon={<ChevronDownIcon className="w-4 h-4"/>}
              onClick={() => onOpenShareModal(logo)} // Call the new prop
            >
              Share
            </Button>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-surface-variant focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Close modal"
            >
              <CloseIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <h2 id="logo-preview-modal-title" className="text-2xl font-semibold text-surface-contrast mb-4">{logo.name}</h2>
          
          <div className="bg-surface-variant rounded-lg p-6 mb-6 flex items-center justify-center min-h-[200px]">
            <img 
              src={logo.imageUrl} 
              alt={`Logo for ${logo.name}`} 
              className="max-h-48 object-contain"
              onError={(e) => (e.currentTarget.src = 'https://picsum.photos/400/300?grayscale&blur=2')}
            />
          </div>

          <Button variant="primary" size="lg" className="w-full !bg-black hover:!bg-gray-800 !text-white !rounded-lg mb-6">
            Download
          </Button>

          <div className="space-y-5">
            <div>
              <h3 className="text-xs font-medium text-gray-500 uppercase mb-2">Color</h3>
              <div className="flex flex-wrap gap-2">
                {logo.colors.map((color, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 border border-outline rounded-md bg-surface-containerLow">
                    <div 
                      className="w-5 h-5 rounded-full border border-gray-300" 
                      style={{ backgroundColor: color.hex }}
                      title={color.hex}
                    ></div>
                    <span className="text-sm text-surface-contrast">{color.name}</span>
                    <span className="text-xs text-gray-500">{color.hex}</span>
                  </div>
                ))}
                {logo.colors.length === 0 && <p className="text-sm text-gray-500">No colors specified.</p>}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-medium text-gray-500 uppercase mb-2">Fonts</h3>
              {logo.fontsUsed.length > 0 ? (
                <ul className="list-disc list-inside pl-1 space-y-1">
                  {logo.fontsUsed.map((font, index) => (
                    <li key={index} className="text-sm text-surface-contrast">{font}</li>
                  ))}
                </ul>
              ) : <p className="text-sm text-gray-500">No fonts specified.</p>}
            </div>

            <div>
              <h3 className="text-xs font-medium text-gray-500 uppercase mb-2">Informations</h3>
              <div className="text-sm text-surface-contrast space-y-1">
                <p><span className="font-medium">Designer:</span> {logo.designer || 'N/A'}</p>
                <p><span className="font-medium">Studio:</span> {logo.studio || 'N/A'}</p>
                <p><span className="font-medium">Licences:</span> {logo.licences || 'N/A'}</p>
              </div>
            </div>

            {logo.externalLinks && logo.externalLinks.length > 0 && (
              <div>
                <h3 className="text-xs font-medium text-gray-500 uppercase mb-2">Storage Links</h3>
                <div className="space-y-2">
                  {logo.externalLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-2 border border-outline rounded-md bg-surface-containerLow hover:bg-surface-variant transition-colors group"
                      aria-label={`Open ${link.name} in a new tab`}
                    >
                      <LinkIcon className="w-4 h-4 text-primary mr-2 flex-shrink-0"/>
                      <span className="text-sm text-surface-contrast font-medium group-hover:text-primary">{link.name}</span>
                      <ExternalLinkIcon className="w-4 h-4 text-gray-400 ml-auto group-hover:text-primary"/>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 bg-surface-variant text-center border-t border-outline">
          <p className="text-xs text-gray-500">Powered by myLogo - Terms - Privacy</p>
        </div>
      </div>
    </div>
  );
};

export default LogoPreviewModal;
