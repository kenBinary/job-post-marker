import { autoMarkState } from "../constants/autoMarkStateKeys";
import type {
  LINKEDIN_AUTO_MARK_TOGGLE_STATE,
  OLJ_AUTO_MARK_TOGGLE_STATE,
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
  } catch (error) {
    console.error("Error setting initial data in chrome.storage.local:", error);
  }
});
