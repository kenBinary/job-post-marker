import { autoMarkState } from "@/shared/constants/autoMarkStateKeys";
import type { MYNIMO_AUTO_MARK_TOGGLE_STATE } from "@/shared/types/chrome-storage-local.types";
import { getFromLocal, setToLocal } from "@/shared/utils/chromeStorage";

export async function mynimoAutoMarkerSetup() {
  const mynimoToggle = document.querySelector<HTMLInputElement>(
    "#mynimo-auto-mark-toggle",
  );
  if (!mynimoToggle) {
    return;
  }

  const toggleState = await getFromLocal<MYNIMO_AUTO_MARK_TOGGLE_STATE>([
    autoMarkState.mynimo,
  ]);

  // Set initial state
  if (toggleState.mynimoAutoMarkToggleState !== undefined) {
    mynimoToggle.checked = toggleState.mynimoAutoMarkToggleState;
  } else {
    mynimoToggle.checked = true; // Set to true as default like others in this project
  }

  mynimoToggle.addEventListener("change", async (event) => {
    const target = event.target as HTMLInputElement;

    await setToLocal<MYNIMO_AUTO_MARK_TOGGLE_STATE>({
      mynimoAutoMarkToggleState: target.checked,
    });
  });
}
