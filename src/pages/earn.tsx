import Head from 'next/head';
import React from 'react';

import Earn from '../components/Earn';
import Navigation from '../components/Navigation';

const EarnPage: React.FC = () => {
  return (
    <div className="flex h-screen flex-col">
      <Head>
        <title>Earn</title>
      </Head>
      <Earn />
      <Navigation />
    </div>
  );
};

export default EarnPage;
