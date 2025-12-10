import type { LINKEDIN_AUTO_MARK_TOGGLE_STATE } from "../../types/chrome-storage-local.types";
import { toggleAutoMarkOnShiftE } from "../../utils/shortcutKeysActions";
import { linkedinBtnObserver, setupLinkedinObservers } from "./observers";

export function setupLinkedinMarker() {
  setupLinkedinObservers();
  toggleAutoMarkOnShiftE<LINKEDIN_AUTO_MARK_TOGGLE_STATE>(
    "linkedinAutoMarkToggleState"
  );

  chrome.storage.onChanged.addListener((changes, areaName) => {
    const jobButtons = document.querySelectorAll(
      ".marked-as-viewed-btn, .btn-viewed"
    );
    if (areaName === "local") {
      if (changes.linkedinAutoMarkToggleState) {
        const storageChange = changes.linkedinAutoMarkToggleState;
        if (storageChange.newValue === true) {
          jobButtons.forEach((button) => linkedinBtnObserver.observe(button));
        } else {
          jobButtons.forEach((button) => linkedinBtnObserver.unobserve(button));
        }
      }
    }
  });
}
