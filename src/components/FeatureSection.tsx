import { LucideIcon } from 'lucide-react';
import React from 'react';

interface FeatureSectionProps {
  icon: LucideIcon;
  title: string;
  description: string;
  bgColor: string;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  icon: Icon,
  title,
  description,
  bgColor,
}) => {
  return (
    <div className="flex w-full flex-row items-center gap-4 rounded-xl bg-blue-50 p-4">
      <div className={`size-6 ${bgColor} flex shrink-0 items-center justify-center rounded-full`}>
        <Icon className="text-white" size={16} />
      </div>
      <div className="flex grow flex-col items-start">
        <span className="text-lg font-medium text-blue-900">{title}</span>
        <span className="text-sm font-medium text-blue-600 opacity-80">{description}</span>
      </div>
    </div>
  );
};

export default FeatureSection;
