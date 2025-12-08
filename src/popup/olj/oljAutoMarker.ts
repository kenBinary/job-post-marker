import type { OLJ_AUTO_MARK_TOGGLE_STATE } from "../../types/chrome-storage-local.types";
import { getFromLocal, setToLocal } from "../../utils/chromeStorage";

export async function oljAutoMarkerSetup() {
  const initAutoToggleState = await getFromLocal<OLJ_AUTO_MARK_TOGGLE_STATE>([
    "oljAutoMarkToggleState",
  ]);

  const oljAutoMarkToggle = document.getElementById(
    "olj-auto-mark-toggle"
  )! as HTMLInputElement;
  if (initAutoToggleState.oljAutoMarkToggleState !== undefined) {
    oljAutoMarkToggle.checked = initAutoToggleState.oljAutoMarkToggleState;
  }

  oljAutoMarkToggle.addEventListener("change", async () => {
    const toggleState = await getFromLocal<OLJ_AUTO_MARK_TOGGLE_STATE>([
      "oljAutoMarkToggleState",
    ]);

    if (toggleState.oljAutoMarkToggleState !== undefined) {
      await setToLocal<OLJ_AUTO_MARK_TOGGLE_STATE>({
        oljAutoMarkToggleState: !toggleState.oljAutoMarkToggleState,
      });
      oljAutoMarkToggle.checked = !toggleState.oljAutoMarkToggleState;
    }
  });
}
