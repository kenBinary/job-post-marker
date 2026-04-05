export async function getFromLocal<T>(keys: (keyof T)[]): Promise<Partial<T>> {
  return chrome.storage.local.get(keys) as Promise<Partial<T>>;
}

export async function setToLocal<T>(items: Partial<T>): Promise<void> {
  return chrome.storage.local.set(items);
}
