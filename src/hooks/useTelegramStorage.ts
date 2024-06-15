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

export function saveToTelegramStorage(window: Window, key: string, value: string) {
  if (canUseStorage(window.Telegram.WebApp.version)) {
    window.Telegram.WebApp.CloudStorage.setItem(key, value);
  } else {
    localStorage.setItem(key, value);
  }
}

export function getFromTelegramStorage(window: Window, key: string): string | null {
  if (canUseStorage(window.Telegram.WebApp.version)) {
    return window.Telegram.WebApp.CloudStorage.getItem(key);
  }
  return localStorage.getItem(key);
}

export function isUseApi(): boolean {
  const type = getFromTelegramStorage(window, 'dataStorageType');
  return type === 'backend+ton' || type === 'backend';
}

export function isUseTon(): boolean {
  const type = getFromTelegramStorage(window, 'dataStorageType');
  return type === 'backend+ton' || type === 'ton';
}

export function getUserTonPrivateKey(): string | null {
  return getFromTelegramStorage(window, 'privateKey');
}
