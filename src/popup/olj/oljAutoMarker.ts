import { autoMarkState } from "@/shared/constants/autoMarkStateKeys";
import type { OLJ_AUTO_MARK_TOGGLE_STATE } from "@/shared/types/chrome-storage-local.types";
import { getFromLocal, setToLocal } from "@/shared/utils/chromeStorage";

export async function oljAutoMarkerSetup() {
  const initAutoToggleState = await getFromLocal<OLJ_AUTO_MARK_TOGGLE_STATE>([
    autoMarkState.olj,
  ]);

  const oljAutoMarkToggle = document.getElementById(
    "olj-auto-mark-toggle",
  )! as HTMLInputElement;
  const initState = initAutoToggleState[autoMarkState.olj];
  if (initState !== undefined) {
    oljAutoMarkToggle.checked = initState;
  }

  oljAutoMarkToggle.addEventListener("change", async () => {
    const toggleState = await getFromLocal<OLJ_AUTO_MARK_TOGGLE_STATE>([
      autoMarkState.olj,
    ]);

    if (toggleState.oljAutoMarkToggleState !== undefined) {
      await setToLocal<OLJ_AUTO_MARK_TOGGLE_STATE>({
        [autoMarkState.olj]: !toggleState.oljAutoMarkToggleState,
      });
      oljAutoMarkToggle.checked = !toggleState.oljAutoMarkToggleState;
    }
  });
}
