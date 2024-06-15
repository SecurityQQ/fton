import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import Loader from '../components/Loader';
import Navigation from '../components/Navigation';
import PeriodTracking from '../components/PeriodTracking';
import { useUser } from '../contexts/UserContext';

const PeriodTracker: NextPage = () => {
  const { user, loading, refetchUser } = useUser();
  const router = useRouter();

  console.log('USER: ', user);

  const handlePeriodDateChange = () => {
    console.log('Period date change clicked');
    router.push('/calendar');
  };

  const handleStartFarming = () => {
    console.log('Start farming clicked');
    // Implement the start farming logic here
  };

  const handleViewInfo = () => {
    console.log('View info clicked');
    // Implement the view info logic here
  };

  const handleShareData = () => {
    console.log('Share data clicked');
    // Implement the share data logic here
  };

  const handleInviteUser = () => {
    console.log('Invite user clicked');
    // Implement the invite user logic here
  };

  const handleSubscribeChannels = () => {
    console.log('Subscribe to channels clicked');
    // Implement the subscribe channels logic here
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) {
        refetchUser();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [loading, refetchUser]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
      <Head>
        <title>Period Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/*todo: add popup for first session if no lastPeriodDate*/}
      {user && (
        <PeriodTracking
          lastMenstruationDate={user.lastPeriodDate ? new Date(user.lastPeriodDate) : undefined}
          tokenBalance={user.tokenBalance}
          onPeriodDateChange={handlePeriodDateChange}
          onStartFarming={handleStartFarming}
          onViewInfo={handleViewInfo}
          onShareData={handleShareData}
          onInviteUser={handleInviteUser}
          onSubscribeChannels={handleSubscribeChannels}
        />
      )}
      <Navigation />
    </div>
  );
};

export default PeriodTracker;
