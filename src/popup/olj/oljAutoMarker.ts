import type { OLJ_AUTO_MARK_TOGGLE_STATE } from "../../types/chrome-storage-local.types";

export async function oljAutoMarkerSetup() {
  const initAutoToggleState = (await chrome.storage.local.get([
    "oljAutoMarkToggleState",
  ])) as Partial<OLJ_AUTO_MARK_TOGGLE_STATE>;

  const oljAutoMarkToggle = document.getElementById(
    "olj-auto-mark-toggle"
  )! as HTMLInputElement;
  if (initAutoToggleState.oljAutoMarkToggleState !== undefined) {
    oljAutoMarkToggle.checked = initAutoToggleState.oljAutoMarkToggleState;
  }

  oljAutoMarkToggle.addEventListener("change", async () => {
    const toggleState = (await chrome.storage.local.get([
      "oljAutoMarkToggleState",
    ])) as Partial<OLJ_AUTO_MARK_TOGGLE_STATE>;

    if (toggleState.oljAutoMarkToggleState !== undefined) {
      await chrome.storage.local.set({
        oljAutoMarkToggleState: !toggleState.oljAutoMarkToggleState,
      });
      oljAutoMarkToggle.checked = !toggleState.oljAutoMarkToggleState;
    }
  });
}
