import { NextPage } from 'next';
import Head from 'next/head';

import Navigation from '../components/Navigation';
import PeriodTracking from '../components/PeriodTracker';

const PeriodTracker: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
      <Head>
        <title>Period Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PeriodTracking />
      <Navigation />
    </div>
  );
};

export default PeriodTracker;
