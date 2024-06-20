export interface OneMonthDataUpdate {
  toAdd: Date[];
  toDelete: Date[];
}

export async function waitForAction(
  checkCondition: () => Promise<boolean>,
  attempts = 50,
  sleepDuration = 500
) {
  if (attempts <= 0) {
    throw new Error('Attempt number must be positive');
  }
  for (let i = 0; i < attempts; i++) {
    const isDone = await checkCondition();
    if (isDone) return;
    await new Promise((resolve) => {
      setTimeout(resolve, sleepDuration);
    });
  }
  throw new Error("Contract was not deployed. Check your wallet's transactions");
}

export function getMonthDataUpdates(
  toAdd: Date[],
  toDelete: Date[]
): Map<number, OneMonthDataUpdate> {
  const updates = new Map<number, OneMonthDataUpdate>();
  for (const date of toAdd) {
    const month = getMonthIndex(date);
    const update = updates.get(month) || { toAdd: [], toDelete: [] };
    update.toAdd.push(date);
    updates.set(month, update);
  }
  for (const date of toDelete) {
    const month = getMonthIndex(date);
    const update = updates.get(month) || { toAdd: [], toDelete: [] };
    update.toDelete.push(date);
    updates.set(month, update);
  }
  return updates;
}

export function getMonthIndex(date: Date): number {
  return date.getFullYear() * 12 + date.getMonth();
}
