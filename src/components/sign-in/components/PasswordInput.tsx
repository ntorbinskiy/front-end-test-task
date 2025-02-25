import React, { useEffect, useRef } from 'react';

interface PasswordInputProps {
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

export const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  name,
  value,
  placeholder = 'Enter your password',
  onChange,
  onBlur,
  error = null,
  label = 'Password',
  required = false,
  className = '',
  disabled = false,
}) => {
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (toggleRef.current) {
      window.HSStaticMethods.autoInit();
    }
  }, []);

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium mb-2">
          {label}{required && <span className="text-red-500 ms-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type="password"
          id={id}
          name={name}
          className={`py-3 ps-4 pe-10 block w-full border rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none ${
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
        <button
          type="button"
          ref={toggleRef}
          data-hs-toggle-password={`{
            "target": "#${id}"
          }`}
          className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600"
          disabled={disabled}
        >
          <svg className="shrink-0 size-3.5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path className="hs-password-active:hidden" d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
            <path className="hs-password-active:hidden" d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
            <path className="hs-password-active:hidden" d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
            <line className="hs-password-active:hidden" x1="2" x2="22" y1="2" y2="22"></line>
            <path className="hidden hs-password-active:block" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
            <circle className="hidden hs-password-active:block" cx="12" cy="12" r="3"></circle>
          </svg>
        </button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" id={`${id}-error`}>{error}</p>
      )}
    </div>
  );
};