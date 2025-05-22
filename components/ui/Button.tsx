
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  className = '',
  ...props
}) => {
  const baseStyles = "font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150 ease-in-out inline-flex items-center justify-center";

  let variantStyles = "";
  switch (variant) {
    case 'primary':
      variantStyles = "bg-primary text-primary-contrast hover:bg-primary-dark focus:ring-primary";
      break;
    case 'secondary':
      variantStyles = "bg-secondary text-secondary-contrast hover:bg-secondary-dark focus:ring-secondary";
      break;
    case 'tertiary':
      variantStyles = "bg-surface-container text-primary hover:bg-surface-container-high border border-outline focus:ring-primary";
      break;
    case 'danger':
      variantStyles = "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500";
      break;
  }

  let sizeStyles = "";
  switch (size) {
    case 'sm':
      sizeStyles = "px-3 py-1.5 text-xs";
      break;
    case 'md':
      sizeStyles = "px-4 py-2 text-sm";
      break;
    case 'lg':
      sizeStyles = "px-6 py-3 text-base";
      break;
  }

  return (
    <button
      type="button"
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;
    