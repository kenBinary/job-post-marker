import { SHORTCUT_STORAGE_KEY } from "@/shared/constants/autoMarkStateKeys";
import type { SHORTCUT_CONFIG } from "@/shared/types/chrome-storage-local.types";
import { getFromLocal, setToLocal } from "@/shared/utils/chromeStorage";

export function toggleAutoMarkOnKeyPress<T>(storageKey: keyof T) {
  document.addEventListener("keydown", async (event) => {
    const shortcutConfig = await getFromLocal<SHORTCUT_CONFIG>([
      SHORTCUT_STORAGE_KEY,
    ]);

    const config = shortcutConfig[SHORTCUT_STORAGE_KEY];

    const modifier = config?.modifier || "shift";
    const key = config?.key || "E";

    const isModifierPressed =
      modifier === "shift" ? event.shiftKey : event.altKey;
    const isKeyPressed = event.key.toUpperCase() === key.toUpperCase();

    const noExtraModifiers =
      !event.ctrlKey &&
      !event.metaKey &&
      (modifier === "shift" ? !event.altKey : !event.shiftKey);

    if (isModifierPressed && isKeyPressed && noExtraModifiers) {
      event.preventDefault();

      const toggleState = await getFromLocal<T>([storageKey]);

      const newToggleState = !toggleState[storageKey];
      const newState = {
        [storageKey]: newToggleState,
      } as Partial<T>;
      await setToLocal<T>(newState);

      const toast = document.createElement("div");
      toast.textContent = newToggleState
        ? "Auto Marking is Enabled"
        : "Auto Marking is Disabled";
      toast.className = "toast-notification";
      document.body.appendChild(toast);

      setTimeout(() => {
        toast.remove();
      }, 3000);
    }
  });
}
