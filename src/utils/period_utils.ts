interface SavedPeriod {
  startDate: Date;
  endDate: Date;
  recordIsActive: boolean;
}

interface PeriodChanges {
  periodToAddInBlockchain: SavedPeriod;
  seqnoToInactivate: number[];
}

export function getUpdatedPeriods(
  savedPeriods: (SavedPeriod | null)[],
  changes: { date: Date; action: 'add' | 'delete' }[]
): PeriodChanges {
  const itemsToAddInBlockchain: SavedPeriod[] = [];
  const seqnoToInactivate: number[] = [];
  for (let i = 0; i < savedPeriods.length; i++) {
    const period = savedPeriods[i];
    if (!period) continue;
    for (let day = period.startDate; day <= period.endDate; day.setDate(day.getDate() + 1)) {
      const change = changes.find((c) => isSameDay(c.date, day));
      if (change) {
        seqnoToInactivate.push(i);
        break;
      }
    }
  }
  const onlyAddChanges = changes.filter((c) => c.action === 'add');
  const startDate = onlyAddChanges
    .map((c) => c.date)
    .reduce((min, date) => (date < min ? date : min));
  const endDate = onlyAddChanges
    .map((c) => c.date)
    .reduce((max, date) => (date > max ? date : max));
  const periodToAddInBlockchain = { startDate, endDate, recordIsActive: true };
  return { periodToAddInBlockchain, seqnoToInactivate };
}

function justDate(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isSameDay(date1: Date, date2: Date): boolean {
  return justDate(date1).getTime() === justDate(date2).getTime();
}

function diffInDays(date1: Date, date2: Date): number {
  return Math.abs(justDate(date1).getTime() - justDate(date2).getTime()) / (1000 * 60 * 60 * 24);
}
