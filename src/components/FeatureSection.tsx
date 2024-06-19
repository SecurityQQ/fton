import { LucideIcon } from 'lucide-react';
import React from 'react';

import Card from '@/components/ui/Card';

interface FeatureSectionProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: 'blue' | 'pink' | 'purple' | 'orange' | 'green';
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  icon: Icon,
  title,
  description,
  color,
}) => {
  const defaultBackground = 'rgba(255, 255, 255, 0.15)';
  const gradient = color ? color : 'blue';

  return (
    <Card gradient={gradient} className="py-0">
      <div className="flex w-full flex-row items-center rounded-xl p-4">
        <div className="flex size-6 shrink-0 items-center justify-center rounded-full">
          <Icon className="text-white" size={16} />
        </div>
        <div className="flex grow flex-col items-start">
          <span className="text-lg font-medium text-white">{title}</span>
          <span className="text-sm font-medium text-white opacity-80">{description}</span>
        </div>
      </div>
    </Card>
  );
};

export default FeatureSection;
