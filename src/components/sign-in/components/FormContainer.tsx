import React from 'react';

interface FormContainerProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

export const FormContainer: React.FC<FormContainerProps> = ({
  title,
  children,
  className = '',
}) => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div className={`bg-white shadow-md rounded-xl p-8 ${className}`}>
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
            {title}
          </h1>
          {children}
        </div>
      </div>
    </div>
  );
};