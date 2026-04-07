import { autoMarkState } from "@/shared/constants/autoMarkStateKeys";
import type { BOSSJOB_AUTO_MARK_TOGGLE_STATE } from "@/shared/types/chrome-storage-local.types";
import { getFromLocal, setToLocal } from "@/shared/utils/chromeStorage";

export async function bossjobAutoMarkerSetup() {
  const initAutoToggleState =
    await getFromLocal<BOSSJOB_AUTO_MARK_TOGGLE_STATE>([autoMarkState.bossjob]);

  const bossjobAutoMarkToggle = document.getElementById(
    "bossjob-auto-mark-toggle",
  )! as HTMLInputElement;
  const initState = initAutoToggleState[autoMarkState.bossjob];
  if (initState !== undefined) {
    bossjobAutoMarkToggle.checked = initState;
  }

  bossjobAutoMarkToggle.addEventListener("change", async () => {
    const toggleState = await getFromLocal<BOSSJOB_AUTO_MARK_TOGGLE_STATE>([
      autoMarkState.bossjob,
    ]);

    if (toggleState.bossjobAutoMarkToggleState !== undefined) {
      await setToLocal<BOSSJOB_AUTO_MARK_TOGGLE_STATE>({
        [autoMarkState.bossjob]: !toggleState.bossjobAutoMarkToggleState,
      });
      bossjobAutoMarkToggle.checked = !toggleState.bossjobAutoMarkToggleState;
    }
  });
}
