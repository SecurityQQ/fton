import Head from 'next/head';
import React from 'react';

import Calendar from '../components/Calendar';
import Navigation from '../components/Navigation';

const CalendarPage: React.FC = () => {
  return (
    <div className="flex h-screen flex-col">
      <Head>
        <title>Calendar</title>
      </Head>
      <Calendar />
      <Navigation />
    </div>
  );
};

export default CalendarPage;
