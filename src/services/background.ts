import type { OLJ_AUTO_MARK_TOGGLE_STATE } from "../types/chrome-storage-local.types";
import { setToLocal } from "../utils/chromeStorage";

chrome.runtime.onInstalled.addListener(async () => {
  const initialData: OLJ_AUTO_MARK_TOGGLE_STATE = {
    oljAutoMarkToggleState: false,
  };
  try {
    await setToLocal<OLJ_AUTO_MARK_TOGGLE_STATE>(initialData);
    console.log("Initial data set in chrome.storage.local:", initialData);
  } catch (error) {
    console.error("Error setting initial data in chrome.storage.local:", error);
  }
});
