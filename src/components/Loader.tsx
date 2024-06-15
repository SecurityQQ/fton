import React from 'react';

interface LoaderProps {
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({ text = 'Loading...' }) => {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        <div className="size-8 animate-spin rounded-full border-y-2 border-blue-500" />
        <p className="mt-4 text-blue-500">{text}</p>
      </div>
    </div>
  );
};

export default Loader;
