// components/common/InputField.tsx
import React from 'react';

interface InputFieldProps {
  label?: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'password' | 'select' | 'checkbox';
  value: string | boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  placeholder?: string;
  required?: boolean;
  icon?: React.ReactNode;
  error?: string;
  options?: Array<{ value: string; label: string }>;
  containerClass?: string;
  inputClass?: string;
}

const SecondaryInputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  icon,
  error,
  options = [],
  containerClass = '',
  inputClass = ''
}) => {
  const isSelect = type === 'select';
  const isCheckbox = type === 'checkbox';

  return (
    <div className={containerClass}>
      {label && (
        <label 
          htmlFor={name} 
          className={`block text-sm font-medium text-gray-700 mb-1 ${isCheckbox ? 'inline-block' : ''}`}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && !isCheckbox && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        
        {isSelect ? (
          <>
            {icon && (
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {icon}
              </div>
            )}
            <select
              id={name}
              name={name}
              value={value as string}
              onChange={onChange}
              className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-2 border ${
                error ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:ring-helixaa-blue focus:border-helixaa-blue ${inputClass}`}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </>
        ) : isCheckbox ? (
          <div className="flex items-center">
            <input
              id={name}
              name={name}
              type="checkbox"
              checked={value as boolean}
              onChange={onChange}
              className={`h-5 w-5 text-helixaa-blue focus:ring-helixaa-blue border-gray-300 rounded ${inputClass}`}
            />
            {label && (
              <label htmlFor={name} className="ml-2 block text-sm text-gray-700">
                {label}
              </label>
            )}
          </div>
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={value as string}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-2 border ${
              error ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:ring-helixaa-blue focus:border-helixaa-blue ${inputClass}`}
          />
        )}
      </div>
      
      {error && !isCheckbox && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default SecondaryInputField;