import React from 'react';

interface ValidationErrorProps {
    error: string | null;
    id?: string;
}

export const ValidationError: React.FC<ValidationErrorProps> = ({
  error,
  id,
}) => {
  return (
    <div className="h-6 mt-2">
      {error && (
        <p
          className="text-sm text-red-600"
          id={id ? `${id}-error` : undefined}
        >
          {error}
        </p>
      )}
    </div>
  );
};