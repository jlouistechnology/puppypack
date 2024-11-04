import React from 'react';

interface PasswordStrengthProps {
  password: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const getStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const strength = getStrength(password);
  const strengthText = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColor = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-lime-500',
    'bg-green-500',
  ];

  return (
    <div className="mt-1 space-y-2">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`h-1 w-full rounded-full ${
              i < strength ? strengthColor[strength - 1] : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      {password && (
        <p
          className={`text-xs ${
            strength < 2
              ? 'text-red-500'
              : strength < 3
              ? 'text-orange-500'
              : strength < 4
              ? 'text-yellow-600'
              : 'text-green-600'
          }`}
        >
          Password strength: {strengthText[strength - 1] || 'Very Weak'}
        </p>
      )}
    </div>
  );
};

export default PasswordStrength;