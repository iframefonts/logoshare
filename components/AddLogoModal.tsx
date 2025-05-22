
import React, { useState, useEffect } from 'react';
import TextField from './ui/TextField';
import TextAreaField from './ui/TextAreaField';
import Button from './ui/Button';
import FileUploadPlaceholder from './FileUploadPlaceholder';
import { CloseIcon, PlusIcon, MinusIcon, LinkIcon } from '../constants';
import { NewLogoData, NewColorData, NewFontData, NewExternalLinkData } from '../types';

interface AddLogoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLogo: (logoData: NewLogoData, status: 'Draft' | 'Published') => Promise<void>;
}

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-4 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-medium text-gray-700">{title}</span>
        {isOpen ? <MinusIcon className="w-5 h-5 text-gray-500" /> : <PlusIcon className="w-5 h-5 text-gray-500" />}
      </button>
      {isOpen && <div className="pb-4 text-sm">{children}</div>}
    </div>
  );
};


const AddLogoModal: React.FC<AddLogoModalProps> = ({ isOpen, onClose, onAddLogo }) => {
  const [showModalContent, setShowModalContent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [clientName, setClientName] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [designer, setDesigner] = useState('');
  const [studio, setStudio] = useState('');
  const [licencesDetails, setLicencesDetails] = useState('');

  const [colors, setColors] = useState<NewColorData[]>([]);
  const [currentColorName, setCurrentColorName] = useState('');
  const [currentColorHex, setCurrentColorHex] = useState('');

  const [fonts, setFonts] = useState<NewFontData[]>([]);
  const [currentFontName, setCurrentFontName] = useState('');

  const [externalLinks, setExternalLinks] = useState<NewExternalLinkData[]>([]);
  const [currentExternalLinkName, setCurrentExternalLinkName] = useState('');
  const [currentExternalLinkUrl, setCurrentExternalLinkUrl] = useState('');


  const resetForm = () => {
    setName('');
    setDescription('');
    setClientName('');
    setCategoryName('');
    setDesigner('');
    setStudio('');
    setLicencesDetails('');
    setColors([]);
    setCurrentColorName('');
    setCurrentColorHex('');
    setFonts([]);
    setCurrentFontName('');
    setExternalLinks([]);
    setCurrentExternalLinkName('');
    setCurrentExternalLinkUrl('');
  }

  useEffect(() => {
    if (isOpen) {
      resetForm(); // Reset form when modal opens
      requestAnimationFrame(() => {
        setShowModalContent(true);
      });
    } else {
      setShowModalContent(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isSubmitting) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose, isSubmitting]);

  const handleAddColor = () => {
    if (currentColorName.trim() && currentColorHex.trim().match(/^#[0-9a-fA-F]{6}$/)) {
      setColors([...colors, { name: currentColorName.trim(), hex_code: currentColorHex.trim() }]);
      setCurrentColorName('');
      setCurrentColorHex('');
    } else {
      alert("Please enter a valid color name and hex code (e.g., #RRGGBB).");
    }
  };

  const handleRemoveColor = (index: number) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const handleAddFont = () => {
    if (currentFontName.trim()) {
      setFonts([...fonts, { name: currentFontName.trim() }]);
      setCurrentFontName('');
    } else {
       alert("Please enter a font name.");
    }
  };

  const handleRemoveFont = (index: number) => {
    setFonts(fonts.filter((_, i) => i !== index));
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleAddExternalLink = () => {
    if (currentExternalLinkName.trim() && currentExternalLinkUrl.trim() && isValidUrl(currentExternalLinkUrl.trim())) {
      setExternalLinks([...externalLinks, { name: currentExternalLinkName.trim(), url: currentExternalLinkUrl.trim() }]);
      setCurrentExternalLinkName('');
      setCurrentExternalLinkUrl('');
    } else {
      alert("Please enter a valid link name and a full URL (e.g., https://example.com).");
    }
  };

  const handleRemoveExternalLink = (index: number) => {
    setExternalLinks(externalLinks.filter((_, i) => i !== index));
  };


  const handleSubmit = async (status: 'Draft' | 'Published') => {
    if (!name.trim()) {
      alert("Logo name is required.");
      return;
    }
    setIsSubmitting(true);
    const logoData: NewLogoData = {
      name: name.trim(),
      description: description.trim() || undefined,
      clientName: clientName.trim() || undefined,
      categoryName: categoryName.trim() || undefined,
      designer: designer.trim() || undefined,
      studio: studio.trim() || undefined,
      licencesDetails: licencesDetails.trim() || undefined,
      colors,
      fonts,
      externalLinks,
    };
    try {
      await onAddLogo(logoData, status);
      // onClose will be called by App.tsx after successful submission and data refresh
    } catch (error) {
      // Error already handled and alerted in App.tsx
    } finally {
      setIsSubmitting(false);
    }
  };


  if (!isOpen && !showModalContent) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-logo-modal-title"
      className={`fixed inset-0 z-40 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="fixed inset-0 bg-black/50" onClick={!isSubmitting ? onClose : undefined} />

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[480px] bg-surface-container shadow-xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col
                    ${showModalContent && isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 id="add-logo-modal-title" className="text-xl font-semibold text-surface-contrast">
            Add LOGO
          </h2>
          <Button
            variant="tertiary" size="sm" onClick={!isSubmitting ? onClose : undefined} disabled={isSubmitting}
            className="!p-1.5 !rounded-full hover:bg-surface-container-low" aria-label="Close modal"
          >
            <CloseIcon className="w-5 h-5 text-gray-600" />
          </Button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-5">
          <div>
            <label htmlFor="logoName" className="block text-xs font-medium text-gray-500 mb-1">Name *</label>
            <TextField id="logoName" placeholder="Enter logo name" value={name} onChange={e => setName(e.target.value)} required disabled={isSubmitting} />
          </div>
          <div>
            <label htmlFor="clientName" className="block text-xs font-medium text-gray-500 mb-1">Client Name</label>
            <TextField id="clientName" placeholder="Enter client name" value={clientName} onChange={e => setClientName(e.target.value)} disabled={isSubmitting}/>
          </div>
           <div>
            <label htmlFor="categoryName" className="block text-xs font-medium text-gray-500 mb-1">Category</label>
            <TextField id="categoryName" placeholder="e.g., Technology, Retail" value={categoryName} onChange={e => setCategoryName(e.target.value)} disabled={isSubmitting}/>
          </div>
          <div>
            <label htmlFor="logoDescription" className="block text-xs font-medium text-gray-500 mb-1">Description</label>
            <TextAreaField id="logoDescription" placeholder="Enter description" value={description} onChange={e => setDescription(e.target.value)} rows={2} disabled={isSubmitting}/>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Media (Main Image)</label>
            <FileUploadPlaceholder 
              text="Drop your image here, or click to browse" 
              subtext="Main image for preview display. 1600 × 1200 (4:3) recommended, up to 10MB. (Upload coming soon)"
              variant="large"
            />
          </div>
          
          <div className="space-y-0 border-t border-gray-200 pt-2">
            <CollapsibleSection title="Color" defaultOpen={true}>
              <div className="space-y-3">
                {colors.map((color, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 border border-gray-200 rounded-md bg-gray-50">
                    <div className="w-5 h-5 rounded-full border border-gray-300" style={{ backgroundColor: color.hex_code }}></div>
                    <span className="flex-grow text-sm text-gray-700">{color.name} ({color.hex_code})</span>
                    <Button variant="tertiary" size="sm" onClick={() => handleRemoveColor(index)} className="!p-1 !rounded-full" aria-label="Remove color" disabled={isSubmitting}>
                      <MinusIcon className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))}
                <div className="flex items-end space-x-2">
                  <TextField label="Color Name" placeholder="e.g., Primary Blue" value={currentColorName} onChange={e => setCurrentColorName(e.target.value)} className="flex-grow" disabled={isSubmitting}/>
                  <TextField label="Hex Code" placeholder="#RRGGBB" value={currentColorHex} onChange={e => setCurrentColorHex(e.target.value)} className="w-28" disabled={isSubmitting}/>
                </div>
                <Button variant="tertiary" size="sm" onClick={handleAddColor} leftIcon={<PlusIcon className="w-4 h-4"/>} className="w-full sm:w-auto" disabled={isSubmitting}>
                  Add Color
                </Button>
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="Fonts" defaultOpen={true}>
               <div className="space-y-3">
                {fonts.map((font, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 border border-gray-200 rounded-md bg-gray-50">
                    <span className="flex-grow text-sm text-gray-700">{font.name}</span>
                    <Button variant="tertiary" size="sm" onClick={() => handleRemoveFont(index)} className="!p-1 !rounded-full" aria-label="Remove font" disabled={isSubmitting}>
                      <MinusIcon className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))}
                <TextField label="Font Name" placeholder="e.g., Inter, Montserrat" value={currentFontName} onChange={e => setCurrentFontName(e.target.value)} className="flex-grow" disabled={isSubmitting}/>
                <Button variant="tertiary" size="sm" onClick={handleAddFont} leftIcon={<PlusIcon className="w-4 h-4"/>} className="w-full sm:w-auto" disabled={isSubmitting}>
                  Add Font
                </Button>
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="Details">
               <div className="space-y-3">
                <TextField label="Designer" placeholder="Designer's name" value={designer} onChange={e => setDesigner(e.target.value)} disabled={isSubmitting}/>
                <TextField label="Studio" placeholder="Studio name" value={studio} onChange={e => setStudio(e.target.value)} disabled={isSubmitting}/>
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="Licences">
              <TextAreaField label="Licence Details" placeholder="Enter licence details" value={licencesDetails} onChange={e => setLicencesDetails(e.target.value)} rows={2} disabled={isSubmitting}/>
            </CollapsibleSection>

            <CollapsibleSection title="Storage Links" defaultOpen={false}>
              <div className="space-y-3">
                {externalLinks.map((link, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 border border-gray-200 rounded-md bg-gray-50">
                    <LinkIcon className="w-4 h-4 text-gray-500 flex-shrink-0"/>
                    <div className="flex-grow text-sm text-gray-700">
                      <span className="font-medium">{link.name}:</span>
                      <a 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="ml-1 text-primary hover:underline truncate"
                        title={link.url}
                       >
                        {link.url.length > 30 ? `${link.url.substring(0, 30)}...` : link.url}
                      </a>
                    </div>
                    <Button variant="tertiary" size="sm" onClick={() => handleRemoveExternalLink(index)} className="!p-1 !rounded-full" aria-label={`Remove link ${link.name}`} disabled={isSubmitting}>
                      <MinusIcon className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))}
                <div className="flex flex-col space-y-2 sm:flex-row sm:items-end sm:space-x-2 sm:space-y-0">
                  <TextField label="Link Name" placeholder="e.g., Google Drive" value={currentExternalLinkName} onChange={e => setCurrentExternalLinkName(e.target.value)} className="flex-grow" disabled={isSubmitting}/>
                  <TextField label="Link URL" placeholder="https://example.com" value={currentExternalLinkUrl} onChange={e => setCurrentExternalLinkUrl(e.target.value)} className="flex-grow" disabled={isSubmitting} type="url"/>
                </div>
                <Button variant="tertiary" size="sm" onClick={handleAddExternalLink} leftIcon={<PlusIcon className="w-4 h-4"/>} className="w-full sm:w-auto" disabled={isSubmitting}>
                  Add Storage Link
                </Button>
              </div>
            </CollapsibleSection>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 bg-surface-containerLow flex justify-end space-x-3">
          <Button variant="tertiary" onClick={() => console.log('Preview clicked - TBD')} disabled={isSubmitting}>
            Preview
          </Button>
          <Button variant="tertiary" onClick={() => handleSubmit('Draft')} disabled={isSubmitting || !name.trim()}>
            {isSubmitting ? 'Saving...' : 'Save as Draft'}
          </Button>
          <Button variant="primary" onClick={() => handleSubmit('Published')} className="bg-blue-600 hover:bg-blue-700 text-white" disabled={isSubmitting || !name.trim()}>
            {isSubmitting ? 'Publishing...' : 'Publish'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddLogoModal;
