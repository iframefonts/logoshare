import React from 'react';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelSrOnly?: boolean; // For screen-reader only labels
  icon?: React.ReactNode;
}

const TextField: React.FC<TextFieldProps> = ({ label, id, icon, labelSrOnly = false, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={id} 
          className={`block text-sm font-medium text-primary-textLight mb-1 ${labelSrOnly ? 'sr-only' : ''} ${icon ? 'pl-1' : '' }`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
            <span className="text-gray-400">{icon}</span>
          </div>
        )}
        <input
          id={id}
          className={`
            form-input block w-full 
            ${icon ? 'pl-10' : 'px-3'} py-2 
            border border-gray-300 
            rounded-md bg-white text-surface-contrast 
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary 
            placeholder-gray-400 transition duration-150 ease-in-out sm:text-sm
            ${className}
          `}
          {...props}
        />
      </div>
    </div>
  );
};

export default TextField;