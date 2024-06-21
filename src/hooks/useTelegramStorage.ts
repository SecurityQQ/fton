function canUseStorage(version: string) {
  return versionCompare(version, '6.9') >= 0;
}

function versionCompare(v1: string, v2: string): number {
  if (typeof v1 !== 'string') v1 = '';
  if (typeof v2 !== 'string') v2 = '';
  const _v1 = v1.replace(/^\s+|\s+$/g, '').split('.');
  const _v2 = v2.replace(/^\s+|\s+$/g, '').split('.');
  let a = Math.max(_v1.length, _v2.length),
    i,
    p1,
    p2;
  for (i = 0; i < a; i++) {
    p1 = parseInt(_v1[i], 10) || 0;
    p2 = parseInt(_v2[i], 10) || 0;
    if (p1 === p2) continue;
    if (p1 > p2) return 1;
    return -1;
  }
  return 0;
}

export async function saveToTelegramStorage(window: Window, key: string, value: string) {
  if (canUseStorage(window.Telegram.WebApp.version)) {
    return await new Promise((resolve) => {
      window.Telegram.WebApp.CloudStorage.setItem(key, value, (err: object, isSaved: boolean) =>
        resolve(isSaved)
      );
    });
  } else {
    localStorage.setItem(key, value);
  }
}

export async function getFromTelegramStorage(window: Window, key: string): Promise<string | null> {
  if (canUseStorage(window.Telegram.WebApp.version)) {
    const res = await new Promise((resolve) => {
      window.Telegram.WebApp.CloudStorage.getItem(key, (err: object, res: string) => resolve(res));
    });
    return res as string;
  }
  return localStorage.getItem(key);
}

export async function isUseApi(): Promise<boolean> {
  const type = await getFromTelegramStorage(window, 'dataStorageType');
  return type === 'backend+ton' || type === 'backend' || !type;
}

export async function isUseTon(): Promise<boolean> {
  const type = await getFromTelegramStorage(window, 'dataStorageType');
  return type === 'backend+ton' || type === 'ton';
}

export function getUserTonPrivateKey(): Promise<string | null> {
  return getFromTelegramStorage(window, 'privateKey');
}
