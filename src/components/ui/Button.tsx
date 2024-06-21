// components/ui/Button.tsx
import classNames from 'classnames';
import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'blue' | 'pink' | 'purple' | 'orange' | 'dark' | 'ghost';
  subtype?: 'primary' | 'secondary' | 'white' | 'light';
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'blue',
  subtype = 'primary',
  className,
}) => {
  const baseStyles =
    'flex justify-center items-center px-5 py-2 gap-1.5 rounded-full font-semibold text-sm uppercase';

  const typeStyles: Record<string, Record<string, string>> = {
    blue: {
      primary: 'bg-gradient-blue text-white',
      secondary: 'bg-font-blue-secondary',
      white: 'bg-white',
      transparent: 'bg-white text-gradient-blue',
    },
    pink: {
      primary: 'bg-gradient-pink text-white',
      secondary: 'bg-[var(--font-pink-secondary)]',
      white: 'bg-white text-gradient-pink',
      transparent: 'bg-white text-gradient-pink',
    },
    purple: {
      primary: 'bg-gradient-purple text-white',
      secondary: 'bg-[var(--font-purple-secondary)]',
      white: 'bg-white text-gradient-purple',
      transparent: 'bg-white text-gradient-purple',
      light:
        'bg-gradient-to-b from-[#A24CF7] to-[#D495FA] text-white opacity-40 w-full max-w-[313px] h-[33px]',
    },
    orange: {
      primary: 'bg-gradient-orange text-white',
      secondary: 'bg-[var(--font-orange-secondary)]',
      white: 'bg-white text-[var(--font-orange-primary)]',
      light: 'bg-white bg-opacity-15 text-white',
      transparent: 'text-gradient-orange',
    },
    dark: {
      primary: 'bg-[var(--font-dark-primary)] text-white',
      secondary: 'bg-[var(--font-dark-secondary)] text-[var(--font-dark-primary)]',
      white: 'bg-white text-[var(--font-dark-primary)]',
      transparent: 'bg-white text-[var(--font-dark-primary)]',
    },
    ghost: {
      primary: 'bg-[rgba(255,255,255,0.15)] text-white',
    },
  };

  // Define gradient text styles
  const gradientTextStyles: Record<string, string> = {
    blue: 'text-gradient-blue',
    pink: 'text-gradient-pink',
    purple: 'text-gradient-purple',
    orange: 'text-[var(--font-orange-primary)]',
  };

  // Handle invalid type and subtype
  const currentTypeStyles = typeStyles[type] || typeStyles.blue;
  const currentSubtypeStyles = currentTypeStyles[subtype] || currentTypeStyles.primary;

  return (
    <button onClick={onClick} className={classNames(baseStyles, currentSubtypeStyles, className)}>
      {subtype === 'secondary' && type !== 'dark' ? (
        <span className={classNames(gradientTextStyles[type])}>{children}</span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
