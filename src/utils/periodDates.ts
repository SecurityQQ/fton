export const daysInMonth = (date: Date): number =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

export const generateDates = (month: Date): Date[] => {
  const daysInCurrentMonth = daysInMonth(month);
  const dates = [];
  for (let i = 1; i <= daysInCurrentMonth; i++) {
    dates.push(new Date(month.getFullYear(), month.getMonth(), i));
  }
  return dates;
};

export const isFutureDate = (date: Date, today: Date): boolean => date > today;

export const getFirstDayOfLastPeriod = (periodDays: Date[]): Date | null => {
  if (periodDays.length === 0) return null;

  const sortedPeriodDays = [...periodDays].sort((a, b) => a.getTime() - b.getTime());
  let firstDayOfLastPeriod = sortedPeriodDays[sortedPeriodDays.length - 1];

  const maxCheckDays = Math.min(5, sortedPeriodDays.length);

  for (let i = 1; i < maxCheckDays; i++) {
    const currentDay = sortedPeriodDays[sortedPeriodDays.length - i];
    const previousDay = sortedPeriodDays[sortedPeriodDays.length - i - 1];

    if ((currentDay.getTime() - previousDay.getTime()) / (1000 * 60 * 60 * 24) >= 2) {
      break;
    }

    firstDayOfLastPeriod = previousDay;
  }

  return firstDayOfLastPeriod;
};

export const predictOvulationAndPeriod = (
  date: Date,
  firstDayOfLastPeriod: Date | null,
  cycleLength: number,
  today: Date
) => {
  if (!isFutureDate(date, today) || !firstDayOfLastPeriod) {
    return { isPeriod: false, isOvulation: false, isMaybePeriod: false };
  }

  const daysSinceFirstPeriod = Math.floor(
    (date.getTime() - new Date(firstDayOfLastPeriod).getTime()) / (1000 * 60 * 60 * 24)
  );

  const cycleDay = daysSinceFirstPeriod % cycleLength;

  const isPeriod = cycleDay >= 0 && cycleDay < 5;
  const isMaybePeriod = cycleDay === 5;
  const isOvulation = cycleDay >= 12 && cycleDay < 17;

  return { isPeriod, isOvulation, isMaybePeriod };
};

export const getCalendarNumberType = (
  date: Date,
  periodDays: Date[],
  firstDayOfLastPeriod: Date | null,
  cycleLength: number,
  today: Date,
  isEditing: boolean,
  changes: { date: Date; action: 'add' | 'delete' }[]
) => {
  const isCurrentMonth = date.getMonth() === today.getMonth();
  const isPeriodDay = periodDays.some(
    (periodDate) => periodDate.toDateString() === date.toDateString()
  );
  const { isPeriod, isOvulation, isMaybePeriod } = predictOvulationAndPeriod(
    date,
    firstDayOfLastPeriod,
    cycleLength,
    today
  );
  const isToday = date.toDateString() === today.toDateString();
  const futurePeriod = isPeriod && isFutureDate(date, today);
  const futureOvulation = isOvulation && isFutureDate(date, today);
  const futureMaybePeriod = isMaybePeriod && isFutureDate(date, today);
  const showPeriod = isPeriodDay || isPeriod;
  const showOvulation = isOvulation;
  const showMaybePeriod = isMaybePeriod;
  const isInChanges = changes.some((change) => change.date.toDateString() === date.toDateString());

  if (isEditing) {
    if (isPeriodDay) {
      return isInChanges ? 'default' : 'periodPast';
    } else if (isInChanges) {
      return isFutureDate(date, today) ? 'periodFuture' : 'periodPast';
    }
    return 'default';
  }
  if (showPeriod) {
    return futurePeriod ? 'periodFuture' : 'periodPast';
  }
  if (showMaybePeriod) {
    return 'select';
  }
  if (showOvulation) {
    return futureOvulation ? 'ovulationFuture' : 'ovulationPast';
  }
  if (isToday) {
    return 'today';
  }
  return 'default';
};

export const getDayLabel = (days: number) => {
  // TODO: delete, deprecated method
  if (days === 1) return 'день';
  if (days >= 2 && days <= 4) return 'дня';
  return 'дней';
};

export type CalendarEventButtonType =
  | 'blue'
  | 'pink'
  | 'purple'
  | 'orange'
  | 'dark'
  | 'ghost'
  | undefined;

export const calculateNextEvent = (daysSinceLastPeriod: number, cycleLength: number) => {
  const daysUntilNextPeriod = cycleLength - (daysSinceLastPeriod % cycleLength);

  if (daysSinceLastPeriod < 5) {
    return {
      eventName: 'menstruation',
      eventMessage: 'header_tracker.menstruation_message',
      daysUntilNextEvent: 5 - daysSinceLastPeriod,
      pregnancyChance: 'header_tracker.pregnancy_chance',
      eventColor: 'text-gradient-pink',
      pregnancyChanceColor: 'text-[var(--font-pink-primary)]',
      buttonType: 'pink' as CalendarEventButtonType,
      buttonText: 'header_tracker.change_dates_button',
    };
  } else if (daysSinceLastPeriod >= 12 && daysSinceLastPeriod < 17) {
    return {
      eventName: 'ovulation',
      eventMessage: 'header_tracker.ovulation_message',
      daysUntilNextEvent: 17 - daysSinceLastPeriod,
      pregnancyChance: 'header_tracker.high_pregnancy_chance',
      eventColor: 'text-gradient-blue',
      pregnancyChanceColor: 'text-[var(--font-blue-primary)]',
      buttonType: 'blue' as CalendarEventButtonType,
      buttonText: 'header_tracker.open_calendar_button',
    };
  } else if (daysSinceLastPeriod >= 28 && daysSinceLastPeriod % cycleLength <= 5) {
    return {
      eventName: 'menstruation',
      eventMessage: 'header_tracker.menstruation_start_message',
      daysUntilNextEvent: 5 - (daysSinceLastPeriod % cycleLength),
      pregnancyChance: 'header_tracker.low_pregnancy_chance',
      eventColor: 'text-gradient-pink',
      pregnancyChanceColor: 'text-[var(--font-pink-primary)]',
      buttonType: 'pink' as CalendarEventButtonType,
      buttonText: 'header_tracker.mark_menstruation_button',
    };
  } else if (daysUntilNextPeriod <= 5) {
    return {
      eventName: 'menstruation',
      eventMessage: 'header_tracker.menstruation_coming_message',
      daysUntilNextEvent: daysUntilNextPeriod,
      pregnancyChance: 'header_tracker.low_pregnancy_chance',
      eventColor: 'text-gradient-pink',
      pregnancyChanceColor: 'text-[var(--font-pink-primary)]',
      buttonType: 'pink' as CalendarEventButtonType,
      buttonText: 'header_tracker.mark_menstruation_button',
    };
  } else {
    return {
      eventName: 'default',
      eventMessage: 'header_tracker.menstruation_coming_message',
      daysUntilNextEvent: daysUntilNextPeriod,
      pregnancyChance: 'header_tracker.low_pregnancy_chance',
      eventColor: 'text-[var(--font-dark-primary)]',
      pregnancyChanceColor: 'text-[var(--font-dark-primary)]',
      buttonType: 'pink' as CalendarEventButtonType,
      buttonText: 'header_tracker.open_calendar_button',
    };
  }
};

export const DefaultEvent = {
  eventName: 'default',
  eventMessage: 'header_tracker.default_event_message',
  daysUntilNextEvent: 0,
  pregnancyChance: '',
  eventColor: 'text-[var(--font-dark-primary)]',
  pregnancyChanceColor: 'text-[var(--font-dark-primary)]',
  buttonType: 'dark' as CalendarEventButtonType,
  buttonText: 'header_tracker.open_calendar_button',
};
