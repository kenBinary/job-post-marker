import { OBSERVER_DELAY_STORAGE_KEY } from "@/shared/constants/autoMarkStateKeys";
import { getFromLocal } from "@/shared/utils/chromeStorage";
import type { OBSERVER_DELAY_CONFIG } from "@/shared/types/chrome-storage-local.types";

let currentDelay = 1000;

export async function initObserverDelay() {
  const config = await getFromLocal<OBSERVER_DELAY_CONFIG>([
    OBSERVER_DELAY_STORAGE_KEY,
  ]);
  const delayConfig = config[OBSERVER_DELAY_STORAGE_KEY];
  
  if (delayConfig && delayConfig.delay !== undefined) {
    currentDelay = delayConfig.delay;
  }

  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === "local" && changes[OBSERVER_DELAY_STORAGE_KEY]) {
      const newValue = changes[OBSERVER_DELAY_STORAGE_KEY].newValue as { delay?: number } | undefined;
      if (newValue && newValue.delay !== undefined) {
        currentDelay = newValue.delay;
      }
    }
  });
}

export function getSharedObserverDelay(): number {
  return currentDelay;
}
