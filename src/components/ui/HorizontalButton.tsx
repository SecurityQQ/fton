// components/HorizontalButton.tsx
import classNames from 'classnames';
import React from 'react';

type HorizontalButtonProps = {
  type: 'blue' | 'pink' | 'purple' | 'purpleSecondary' | 'orange';
  leftText: string;
  rightText: string;
  leftUrl?: string;
  rightUrl?: string;
  leftOnClick?: () => void;
  rightOnClick?: () => void;
};

const HorizontalButton: React.FC<HorizontalButtonProps> = ({
  type,
  leftText,
  rightText,
  leftUrl,
  rightUrl,
  leftOnClick,
  rightOnClick,
}) => {
  const containerStyles = 'flex flex-row items-start gap-0.5 w-[259px] h-[33px]';

  const baseStyles =
    'flex justify-center items-center px-5 py-2 gap-1 font-semibold text-sm uppercase h-[33px]';

  const typeStyles = {
    blue: {
      left: 'bg-[var(--font-blue-secondary)] text-[var(--font-blue-primary)] rounded-l-[30px] rounded-r-[4px]',
      right: 'bg-gradient-blue text-white rounded-l-[4px] rounded-r-[30px]',
    },
    pink: {
      left: 'bg-[var(--font-pink-secondary)] text-[var(--font-pink-primary)] rounded-l-[30px] rounded-r-[4px]',
      right: 'bg-gradient-pink text-white rounded-l-[4px] rounded-r-[30px]',
    },
    purple: {
      left: 'bg-[var(--font-purple-secondary)] text-[var(--font-purple-primary)] rounded-l-[30px] rounded-r-[4px]',
      right: 'bg-gradient-purple text-white rounded-l-[4px] rounded-r-[30px]',
    },
    purpleSecondary: {
      left: 'bg-[var(--font-purple-secondary)] text-[var(--font-purple-primary)] rounded-l-[30px] rounded-r-[4px]',
      right:
        'bg-[var(--font-purple-secondary)] text-[var(--font-purple-primary)] rounded-l-[4px] rounded-r-[30px]',
    },
    orange: {
      left: 'bg-[var(--font-orange-secondary)] text-[var(--font-orange-primary)] rounded-l-[30px] rounded-r-[4px]',
      right: 'bg-gradient-orange text-white rounded-l-[4px] rounded-r-[30px]',
    },
  };

  const gradientTextStyles: Record<string, string> = {
    blue: 'text-gradient-blue',
    pink: 'text-gradient-pink',
    purple: 'text-gradient-purple',
    orange: 'text-[var(--font-orange-primary)]',
  };

  const renderButton = (
    text: string,
    url?: string,
    onClick?: () => void,
    buttonStyles?: string,
    textStyle?: string
  ) => {
    const buttonContent = <span className={classNames(textStyle && textStyle)}>{text}</span>;

    if (url) {
      return (
        <a
          href={url}
          className={classNames(baseStyles, buttonStyles, 'w-[128.5px]')}
          onClick={onClick}>
          {buttonContent}
        </a>
      );
    }

    return (
      <button className={classNames(baseStyles, buttonStyles, 'w-[128.5px]')} onClick={onClick}>
        {buttonContent}
      </button>
    );
  };

  return (
    <div className={containerStyles}>
      {renderButton(
        leftText,
        leftUrl,
        leftOnClick,
        typeStyles[type].left,
        gradientTextStyles[type]
      )}
      {renderButton(rightText, rightUrl, rightOnClick, typeStyles[type].right)}
    </div>
  );
};

export default HorizontalButton;
