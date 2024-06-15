import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type ActionCardProps = {
  onClick: () => void;
  link: string;
  imgSrc: string;
  imgAlt: string;
  title: string;
  description: string;
  rewards: string;
  bgColor: string;
};

const ActionCard: React.FC<ActionCardProps> = ({
  onClick,
  link,
  imgSrc,
  imgAlt,
  title,
  description,
  rewards,
  bgColor,
}) => {
  return (
    <div
      onClick={onClick}
      className={`mb-1 flex cursor-pointer flex-row content-between rounded-3xl p-4 ${bgColor}`}>
      <Link href={link} className="flex flex-1 flex-row items-stretch">
        <Image src={imgSrc} alt={imgAlt} width={32} height={32} />
        <div className="ml-2 flex flex-col items-stretch">
          <p className="self-start text-header2">{title}</p>
          <div className="flex flex-row">
            <p className="self-start text-body1 font-medium">{rewards}</p>
            <p className="ml-1 mt-1 self-start text-body2B font-medium">{description}</p>
          </div>
        </div>
      </Link>
      <div className="self-center">
        <Image src="/chevron-right.svg" alt="Chevron" width={32} height={32} />
      </div>
    </div>
  );
};

export default ActionCard;
