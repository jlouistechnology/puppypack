import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  touched?: boolean;
}

export default function FormInput({
  label,
  error,
  touched,
  id,
  className = '',
  ...props
}: FormInputProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        className={`
          w-full rounded-md shadow-sm
          ${error && touched ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-purple-500 focus:ring-purple-500'}
          ${className}
        `}
        {...props}
      />
      {error && touched && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}