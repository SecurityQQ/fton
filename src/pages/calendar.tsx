import Head from 'next/head';
import React, { useState, useEffect } from 'react';

import Calendar from '../components/Calendar';
import Loader from '../components/Loader';
import Navigation from '../components/Navigation';
import { useUser } from '../contexts/UserContext';

const CalendarPage: React.FC = () => {
  const { user, loading, refetch } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [periodDays, setPeriodDays] = useState<Date[]>([]);
  const [months, setMonths] = useState(3); // Default to 3 months

  useEffect(() => {
    const fetchMenstruations = async () => {
      if (user?.id) {
        try {
          const response = await fetch(`/api/menstruation?userId=${user.id}&months=${months}`);
          if (response.ok) {
            const data = await response.json();
            setPeriodDays(data.map((m: any) => new Date(m.date)));
          } else {
            console.error('Failed to fetch menstruation dates');
          }
        } catch (error) {
          console.error('Error fetching menstruation dates:', error);
        }
      }
    };

    fetchMenstruations();
  }, [user, months]);

  if (loading) {
    return <Loader text="loading" />;
  }

  const handleSave = async (changes: { date: Date; action: 'add' | 'delete' }[]) => {
    try {
      const response = await fetch('/api/menstruation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ changes, userId: user?.id }),
      });

      if (!response.ok) {
        throw new Error('Failed to update the period dates');
      }

      // Update local periodDays state based on changes
      const updatedPeriodDays = [...periodDays];

      changes.forEach((change) => {
        if (change.action === 'add') {
          updatedPeriodDays.push(change.date);
        } else if (change.action === 'delete') {
          const index = updatedPeriodDays.findIndex(
            (periodDate) => periodDate.toDateString() === change.date.toDateString()
          );
          if (index !== -1) {
            updatedPeriodDays.splice(index, 1);
          }
        }
      });

      setPeriodDays(updatedPeriodDays);
      setIsEditing(false);
      refetch(); // Re-fetch the user data to get the updated periodDays
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
