import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    className?: string;
    isLoading?: boolean;
    loadingText?: string;
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<ButtonProps> = ({
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  isLoading = false,
  loadingText,
  children,
  onClick,
}) => {
  const getVariantStyles = (): string => {
    switch (variant) {
    case 'secondary':
      return 'bg-gray-600 text-white hover:bg-gray-700';
    case 'danger':
      return 'bg-red-600 text-white hover:bg-red-700';
    case 'success':
      return 'bg-green-600 text-white hover:bg-green-700';
    case 'warning':
      return 'bg-yellow-500 text-white hover:bg-yellow-600';
    case 'primary':
    default:
      return 'bg-blue-600 text-white hover:bg-blue-700';
    }
  };

  const getSizeStyles = (): string => {
    switch (size) {
    case 'sm':
      return 'py-2 px-3 text-xs';
    case 'lg':
      return 'py-4 px-5 text-base';
    case 'md':
    default:
      return 'py-3 px-4 text-sm';
    }
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`cursor-pointer inline-flex justify-center items-center gap-x-2 font-semibold rounded-lg border border-transparent ${getVariantStyles()} ${getSizeStyles()} disabled:opacity-50 disabled:pointer-events-none ${className}`}
      onClick={onClick}
    >
      {isLoading ? (
        <>
          <span className="animate-spin inline-block w-4 h-4 border-[2px] border-current border-t-transparent text-white rounded-full"/>
          <span>{loadingText || 'Loading...'}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};