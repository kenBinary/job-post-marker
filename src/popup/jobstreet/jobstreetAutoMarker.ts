import { autoMarkState } from "../../constants/autoMarkStateKeys";
import type { JOBSTREET_AUTO_MARK_TOGGLE_STATE } from "../../types/chrome-storage-local.types";
import { getFromLocal, setToLocal } from "../../utils/chromeStorage";

export async function jobstreetAutoMarkerSetup() {
  const initAutoToggleState =
    await getFromLocal<JOBSTREET_AUTO_MARK_TOGGLE_STATE>([
      autoMarkState.jobstreet,
    ]);

  const jobstreetAutoMarkToggle = document.getElementById(
    "jobstreet-auto-mark-toggle"
  )! as HTMLInputElement;
  const initState = initAutoToggleState[autoMarkState.jobstreet];
  if (initState !== undefined) {
    jobstreetAutoMarkToggle.checked = initState;
  }

  jobstreetAutoMarkToggle.addEventListener("change", async () => {
    const toggleState = await getFromLocal<JOBSTREET_AUTO_MARK_TOGGLE_STATE>([
      autoMarkState.jobstreet,
    ]);

    if (toggleState.jobstreetAutoMarkToggleState !== undefined) {
      await setToLocal<JOBSTREET_AUTO_MARK_TOGGLE_STATE>({
        [autoMarkState.jobstreet]: !toggleState.jobstreetAutoMarkToggleState,
      });
      jobstreetAutoMarkToggle.checked =
        !toggleState.jobstreetAutoMarkToggleState;
    }
  });
}
