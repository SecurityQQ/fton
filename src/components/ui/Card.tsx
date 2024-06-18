import classNames from 'classnames';
import React from 'react';
import { Squircle } from 'react-ios-corners';

interface CardProps {
  gradient: 'blue' | 'pink' | 'purple' | 'orange' | 'green';
  children?: React.ReactNode;
  className?: string;
  radius?: number;
}

const Card: React.FC<CardProps> = ({ children, gradient, className = '', radius = 40 }) => {
  const gradientClasses = {
    blue: 'bg-card-gradient-blue',
    pink: 'bg-card-gradient-pink',
    purple: 'bg-card-gradient-purple',
    orange: 'bg-card-gradient-orange',
    green: 'bg-card-gradient-green',
  };

  const gradientClass = gradientClasses[gradient];

  return (
    <Squircle
      className={classNames(
        'flex w-full flex-col items-stretch justify-start gap-4 p-6',
        gradientClass,
        className
      )}
      radius={radius}>
      {children}
    </Squircle>
  );
};

export default Card;
