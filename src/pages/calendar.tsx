import Head from 'next/head';
import React from 'react';

import Calendar from '../components/Calendar';
import Navigation from '../components/Navigation';
import { useUser } from '../contexts/UserContext';

const CalendarPage: React.FC = () => {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen flex-col">
      <Head>
        <title>Calendar</title>
      </Head>
      {user && (
        <Calendar
          lastMenstruationDate={new Date(user.lastPeriodDate)}
          cycleLength={28}
          mode="full"
        />
      )}
      <Navigation />
    </div>
  );
};

export default CalendarPage;
