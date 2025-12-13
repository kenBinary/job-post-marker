import {
  autoMarkState,
  SHORTCUT_STORAGE_KEY,
} from "../constants/autoMarkStateKeys";
import type {
  INDEED_AUTO_MARK_TOGGLE_STATE,
  JOBSTREET_AUTO_MARK_TOGGLE_STATE,
  LINKEDIN_AUTO_MARK_TOGGLE_STATE,
  OLJ_AUTO_MARK_TOGGLE_STATE,
  SHORTCUT_CONFIG,
} from "../types/chrome-storage-local.types";
import { setToLocal } from "../utils/chromeStorage";

chrome.runtime.onInstalled.addListener(async () => {
  const initialData: OLJ_AUTO_MARK_TOGGLE_STATE = {
    oljAutoMarkToggleState: false,
  };
  try {
    await setToLocal<LINKEDIN_AUTO_MARK_TOGGLE_STATE>({
      [autoMarkState.linkedin]: false,
    });
    await setToLocal<OLJ_AUTO_MARK_TOGGLE_STATE>(initialData);
    await setToLocal<INDEED_AUTO_MARK_TOGGLE_STATE>({
      [autoMarkState.indeed]: false,
    });
    await setToLocal<JOBSTREET_AUTO_MARK_TOGGLE_STATE>({
      [autoMarkState.jobstreet]: false,
    });
    await setToLocal<SHORTCUT_CONFIG>({
      [SHORTCUT_STORAGE_KEY]: {
        modifier: "shift",
        key: "E",
      },
    });
  } catch (error) {
    console.error("Error setting initial data in chrome.storage.local:", error);
  }
});
