import React from 'react';
import { ValidationError } from './ValidationError';

interface EmailInputProps {
    id: string;
    name: string;
    value: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    error?: string | null;
    label?: string;
    required?: boolean;
    className?: string;
    disabled?: boolean;
}

export const EmailInput: React.FC<EmailInputProps> = ({
  id,
  name,
  value,
  placeholder = 'Enter your email',
  onChange,
  onBlur,
  error = null,
  label = 'Email address',
  required = false,
  className = '',
  disabled = false,
}) => {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium mb-2">
          {label}{required && <span className="text-red-500 ms-1">*</span>}
        </label>
      )}
      <input
        type="email"
        id={id}
        name={name}
        className={`py-3 px-4 block w-full border rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none ${
          error ? 'border-red-500' : 'border-gray-200'
        }`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <ValidationError error={error} id={id} />
    </div>
  );
};