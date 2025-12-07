import type { OLJ_AUTO_MARK_TOGGLE_STATE } from "../types/chrome-storage-local.types";

chrome.runtime.onInstalled.addListener(async () => {
  const initialData: OLJ_AUTO_MARK_TOGGLE_STATE = {
    oljAutoMarkToggleState: false,
  };
  try {
    await chrome.storage.local.set(initialData);
    console.log("Initial data set in chrome.storage.local:", initialData);
  } catch (error) {
    console.error("Error setting initial data in chrome.storage.local:", error);
  }
});
