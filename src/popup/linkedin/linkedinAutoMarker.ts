import { autoMarkState } from "../../constants/autoMarkStateKeys";
import type { LINKEDIN_AUTO_MARK_TOGGLE_STATE } from "../../types/chrome-storage-local.types";
import { getFromLocal, setToLocal } from "../../utils/chromeStorage";

export async function linkedinAutoMarkerSetup() {
  const initAutoToggleState =
    await getFromLocal<LINKEDIN_AUTO_MARK_TOGGLE_STATE>([
      autoMarkState.linkedin,
    ]);

  const linkedinAutoMarkToggle = document.getElementById(
    "linkedin-auto-mark-toggle"
  )! as HTMLInputElement;
  const initState = initAutoToggleState[autoMarkState.linkedin];
  if (initState !== undefined) {
    linkedinAutoMarkToggle.checked = initState;
  }

  linkedinAutoMarkToggle.addEventListener("change", async () => {
    const toggleState = await getFromLocal<LINKEDIN_AUTO_MARK_TOGGLE_STATE>([
      autoMarkState.linkedin,
    ]);

    if (toggleState.linkedinAutoMarkToggleState !== undefined) {
      await setToLocal<LINKEDIN_AUTO_MARK_TOGGLE_STATE>({
        [autoMarkState.linkedin]: !toggleState.linkedinAutoMarkToggleState,
      });
      linkedinAutoMarkToggle.checked = !toggleState.linkedinAutoMarkToggleState;
    }
  });
}
