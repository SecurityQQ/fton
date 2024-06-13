import Head from 'next/head';
import React, { useState } from 'react';

import Calendar from '../components/Calendar';
import Loader from '../components/Loader';
import Navigation from '../components/Navigation';
import { useUser } from '../contexts/UserContext';

const CalendarPage: React.FC = () => {
  const { user, lastPeriodDate, loading, refetch, saveLastPeriod } = useUser();
  const [isEditing, setIsEditing] = useState(false);

  if (loading) {
    return <Loader text="saving" />;
  }

  const handleSave = async (date: Date) => {
    try {
      await saveLastPeriod(date);
      setIsEditing(false);
      refetch(); // Re-fetch the user data to get the updated lastPeriodDate
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <Head>
        <title>Calendar</title>
      </Head>
      {/*todo: add popup for first session if no lastPeriodDate*/}
      {user && (
        <Calendar
          lastMenstruationDate={lastPeriodDate ? new Date(lastPeriodDate) : undefined}
          cycleLength={28}
          mode="full"
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onSave={handleSave}
        />
      )}
      <Navigation />
    </div>
  );
};

export default CalendarPage;
