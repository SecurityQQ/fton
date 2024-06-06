import { NextPage } from 'next';
import Head from 'next/head';

import Navigation from '../components/Navigation';
import PeriodTracking from '../components/PeriodTracking';
import { useUser } from '../contexts/UserContext';

const PeriodTracker: NextPage = () => {
  const { user, loading } = useUser();

  const handlePeriodDateChange = () => {
    console.log('Period date change clicked');
    // Implement the date change logic here
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

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <Head>
          <title>Period Tracker</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="flex flex-col items-center">
          <img src="/logo.png" alt="Loading" className="size-24 animate-spin" />
          <p className="mt-4 text-blue-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
      <Head>
        <title>Period Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && (
        <PeriodTracking
          userName={user.name}
          lastMenstruationDate={new Date(user.lastPeriodDate)}
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
