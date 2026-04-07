import { autoMarkState } from "@/shared/constants/autoMarkStateKeys";
import type { INDEED_AUTO_MARK_TOGGLE_STATE } from "@/shared/types/chrome-storage-local.types";
import { getFromLocal, setToLocal } from "@/shared/utils/chromeStorage";

export async function indeedAutoMarkerSetup() {
  const initAutoToggleState = await getFromLocal<INDEED_AUTO_MARK_TOGGLE_STATE>(
    [autoMarkState.indeed],
  );

  const indeedAutoMarkToggle = document.getElementById(
    "indeed-auto-mark-toggle",
  )! as HTMLInputElement;
  const initState = initAutoToggleState[autoMarkState.indeed];
  if (initState !== undefined) {
    indeedAutoMarkToggle.checked = initState;
  }

  indeedAutoMarkToggle.addEventListener("change", async () => {
    const toggleState = await getFromLocal<INDEED_AUTO_MARK_TOGGLE_STATE>([
      autoMarkState.indeed,
    ]);

    if (toggleState.indeedAutoMarkToggleState !== undefined) {
      await setToLocal<INDEED_AUTO_MARK_TOGGLE_STATE>({
        [autoMarkState.indeed]: !toggleState.indeedAutoMarkToggleState,
      });
      indeedAutoMarkToggle.checked = !toggleState.indeedAutoMarkToggleState;
    }
  });
}
