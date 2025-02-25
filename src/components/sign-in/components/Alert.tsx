import React from 'react';

type AlertType = 'success' | 'danger' | 'warning' | 'info';

interface AlertProps {
    type?: AlertType;
    message: string;
    title?: string;
    className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  type = 'danger',
  message,
  title,
  className = '',
}) => {
  const getAlertStyles = (): string => {
    switch (type) {
    case 'success':
      return 'text-green-800 bg-green-50';
    case 'warning':
      return 'text-yellow-800 bg-yellow-50';
    case 'info':
      return 'text-blue-800 bg-blue-50';
    case 'danger':
    default:
      return 'text-red-800 bg-red-50';
    }
  };

  return (
    <div className={`p-4 text-sm rounded-lg ${getAlertStyles()} ${className}`} role="alert">
      {title && <span className="font-medium">{title} </span>}
      {message}
    </div>
  );
};