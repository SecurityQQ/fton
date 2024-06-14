import React from 'react';

interface LoaderProps {
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({ text = 'Loading...' }) => {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        <div className="flex size-24 animate-spin items-center justify-center rounded-full border-4 border-purple-500">
          <img src="/logo.png" alt="Loading" className="size-16" />
        </div>
        <p className="mt-4 text-blue-500">{text}</p>
      </div>
    </div>
  );
};

export default Loader;
