import React from 'react';

/**
 * Button Components Library
 * Consistent button styling across the application
 */

interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
}

/**
 * Primary Button - Main CTAs (Generate, Upload)
 * Colors: Coral/Salmon background with white text
 */
export const PrimaryButton: React.FC<BaseButtonProps> = ({ 
  children, 
  className = '', 
  disabled,
  isLoading,
  ...props 
}) => {
  return (
    <button
      className={`
        bg-[#eb7f6f] hover:bg-[#e87b6a] active:bg-[#e56959]
        text-white font-semibold text-[24px]
        px-12 py-6 rounded-full
        transition-all duration-200
        hover:scale-105 active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#eb7f6f]
        shadow-lg hover:shadow-xl
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  );
};

/**
 * Secondary Button - Important but not primary actions (Regenerate)
 * Colors: Same coral/salmon as primary
 */
export const SecondaryButton: React.FC<BaseButtonProps> = ({ 
  children, 
  className = '', 
  disabled,
  isLoading,
  ...props 
}) => {
  return (
    <button
      className={`
        bg-[#eb7f6f] hover:bg-[#e87b6a] active:bg-[#e56959]
        text-white font-medium text-[24px]
        px-10 py-5 rounded-full
        transition-all duration-200
        hover:scale-105 active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#eb7f6f]
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  );
};

/**
 * Tertiary Button - Less emphasized actions (Generate New)
 * Colors: Cream background with dark text
 */
export const TertiaryButton: React.FC<BaseButtonProps> = ({ 
  children, 
  className = '', 
  disabled,
  isLoading,
  ...props 
}) => {
  return (
    <button
      className={`
        bg-gradient-to-r from-[#e76d57] via-[#e2a59a] to-[#c4a287]
        hover:from-[#e56959] hover:via-[#d99b8a] hover:to-[#b89477]
        active:from-[#d66050] active:via-[#cc9080] active:to-[#a88566]
        text-white font-medium text-[24px]
        px-10 py-5 rounded-full
        transition-all duration-200
        hover:scale-105 active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e76d57]
        shadow-md hover:shadow-lg
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {children}
    </button>
  );
};

/**
 * Icon Button - Utility buttons (close, expand)
 */
interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const IconButton: React.FC<IconButtonProps> = ({ 
  children, 
  className = '', 
  size = 'md',
  ...props 
}) => {
  const sizeClasses = {
    sm: 'p-2',
    md: 'p-3',
    lg: 'p-4',
  };

  return (
    <button
      className={`
        bg-transparent hover:bg-gray-100 active:bg-gray-200
        rounded-full
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
        ${sizeClasses[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

/**
 * Selection Card Button - For multi-select options (instruments, styles, difficulty)
 */
interface SelectionCardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isSelected: boolean;
  variant?: 'default' | 'orange' | 'blue' | 'green';
}

export const SelectionCard: React.FC<SelectionCardProps> = ({ 
  children, 
  isSelected,
  variant = 'default',
  className = '', 
  ...props 
}) => {
  const variantClasses = {
    default: isSelected 
      ? 'bg-gray-50 border-gray-400' 
      : 'bg-white border-gray-200',
    orange: isSelected 
      ? 'bg-orange-50 border-orange-400' 
      : 'bg-white border-gray-200',
    blue: isSelected 
      ? 'bg-blue-50 border-blue-400' 
      : 'bg-white border-gray-200',
    green: isSelected 
      ? 'bg-green-50 border-green-400' 
      : 'bg-white border-gray-200',
  };

  return (
    <button
      className={`
        ${variantClasses[variant]}
        border-2 rounded-2xl p-4
        transition-all duration-200
        hover:shadow-md hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
