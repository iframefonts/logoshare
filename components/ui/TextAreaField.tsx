import React from 'react';

interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  labelSrOnly?: boolean; // For screen-reader only labels
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({ label, id, labelSrOnly = false, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={id} 
          className={`block text-sm font-medium text-primary-textLight mb-1 ${labelSrOnly ? 'sr-only' : ''}`}
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={props.rows || 3}
        className={`
          form-textarea block w-full px-3 py-2
          border border-gray-300 
          rounded-md bg-white text-surface-contrast 
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary 
          placeholder-gray-400 transition duration-150 ease-in-out sm:text-sm
          ${className}
        `}
        {...props}
      />
    </div>
  );
};

export default TextAreaField;