import Head from 'next/head';
import React, { useState, useEffect } from 'react';

import Calendar from '../components/Calendar';
import Loader from '../components/Loader';
import Navigation from '../components/Navigation';
import { useUser } from '../contexts/UserContext';

const CalendarPage: React.FC = () => {
  const {
    user,
    loading,
    menstruations,
    menstruationsLoading,
    refetchMenstruations,
    changeMenstruations,
  } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [periodDays, setPeriodDays] = useState<Date[]>([]);
  const [months, setMonths] = useState(3); // Default to 3 months

  useEffect(() => {
    setPeriodDays(menstruations);
  }, [menstruations]);

  if (loading || menstruationsLoading) {
    return <Loader text="" />;
  }

  const handleSave = async (changes: { date: Date; action: 'add' | 'delete' }[]) => {
    try {
      await changeMenstruations(changes);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <Head>
        <title>Calendar</title>
      </Head>
      {user && (
        <Calendar
          periodDays={periodDays}
          cycleLength={28}
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      )}
      <Navigation />
    </div>
  );
};

export default CalendarPage;
