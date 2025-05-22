import React from 'react';
import { UploadIcon, PlusIcon } from '../constants'; // Using PlusIcon for smaller variant

interface FileUploadPlaceholderProps {
  text: string;
  subtext?: string;
  variant?: 'large' | 'small';
}

const FileUploadPlaceholder: React.FC<FileUploadPlaceholderProps> = ({ text, subtext, variant = 'large' }) => {
  const isLarge = variant === 'large';
  
  return (
    <div 
      className={`
        flex flex-col items-center justify-center w-full 
        border-2 border-dashed border-gray-300 rounded-lg 
        cursor-pointer bg-gray-50 hover:bg-gray-100
        transition-colors duration-150
        ${isLarge ? 'p-6 min-h-[120px]' : 'p-4 min-h-[80px]'}
      `}
    >
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        {isLarge ? 
            <UploadIcon className="w-8 h-8 mb-3 text-gray-400" /> :
            <PlusIcon className="w-6 h-6 mb-2 text-gray-400" />
        }
        <p className={`mb-1 text-sm text-center ${isLarge ? 'text-gray-500' : 'text-gray-400'}`}>
          <span className="font-semibold">{text.split(',')[0]}</span>
          {text.includes(',') && text.substring(text.indexOf(','))}
        </p>
        {subtext && <p className="text-xs text-center text-gray-400">{subtext}</p>}
      </div>
      {/* Hidden input for actual file selection if this were a real uploader */}
      {/* <input id="dropzone-file" type="file" className="hidden" /> */}
    </div>
  );
};

export default FileUploadPlaceholder;