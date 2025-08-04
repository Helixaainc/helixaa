// components/common/InputField.tsx
import React, { useState } from 'react';
import { IconType } from 'react-icons';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface InputFieldProps {
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  icon?: IconType | React.ElementType;
  animationDelay?: string;
  className?: string;
  inputClassName?: string;
}

const PrimaryInputField: React.FC<InputFieldProps> = ({
  label,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  required = false,
  icon: Icon,
  animationDelay = '0s',
  className = '',
  inputClassName = ''
}) => {
  const [showPassword, setShowPassword] = useState(false);
  
  // Determine the actual input type based on password visibility
  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div
      className={`space-y-1 animate-fadeInUp ${className}`}
      style={{ animationDelay }}
    >
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative border border-gray-300 rounded-lg overflow-hidden transition-all focus-within:border-helixaa-green focus-within:ring-2 focus-within:ring-helixaa-green/20">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Icon className="w-5 h-5" />
          </div>
        )}

        <input
          type={inputType}
          placeholder={placeholder}
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} ${
            type === 'password' ? 'pr-10' : 'pr-4'
          } py-3 focus:outline-none ${inputClassName}`}
          value={value}
          onChange={onChange}
          required={required}
        />
        
        {type === 'password' && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
          </button>
        )}
      </div>
    </div>
  );
};

export default PrimaryInputField;