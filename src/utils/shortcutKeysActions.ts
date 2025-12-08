import { getFromLocal, setToLocal } from "./chromeStorage";

export function toggleAutoMarkOnShiftE<T>(storageKey: keyof T) {
  document.addEventListener("keydown", async (event) => {
    const isShiftPressed = event.shiftKey;
    const isEKey = event.key === "E";

    if (isShiftPressed && isEKey) {
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
