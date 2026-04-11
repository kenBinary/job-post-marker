import { OBSERVER_DELAY_STORAGE_KEY } from "@/shared/constants/autoMarkStateKeys";
import type { OBSERVER_DELAY_CONFIG } from "@/shared/types/chrome-storage-local.types";
import { getFromLocal, setToLocal } from "@/shared/utils/chromeStorage";

export async function setupObserverDelayConfig() {
  const delayInput = document.getElementById(
    "observer-delay-input",
  )! as HTMLInputElement;
  const saveBtn = document.getElementById("save-delay-btn")!;
  const validationMsg = document.getElementById("delay-validation-msg")!;

  async function loadCurrentDelay() {
    const config = await getFromLocal<OBSERVER_DELAY_CONFIG>([
      OBSERVER_DELAY_STORAGE_KEY,
    ]);
    const delayConfig = config[OBSERVER_DELAY_STORAGE_KEY];

    if (delayConfig && delayConfig.delay !== undefined) {
      delayInput.value = delayConfig.delay.toString();
    } else {
      delayInput.value = "1000";
    }
  }

  function showValidationMessage(message: string, isError: boolean) {
    validationMsg.textContent = message;
    validationMsg.className = isError
      ? "text-xs text-red-600 mb-2"
      : "text-xs text-green-600 mb-2";
    
    if (!isError) {
      setTimeout(() => {
        validationMsg.textContent = "";
      }, 2000);
    }
  }

  saveBtn.addEventListener("click", async () => {
    const value = parseInt(delayInput.value, 10);

    if (isNaN(value)) {
      showValidationMessage("✗ Please enter a valid number", true);
      return;
    }

    if (value < 0 || value > 5000) {
      showValidationMessage("✗ Delay must be between 0 and 5000 ms", true);
      return;
    }

    try {
      await setToLocal<OBSERVER_DELAY_CONFIG>({
        [OBSERVER_DELAY_STORAGE_KEY]: {
          delay: value,
        },
      });
      showValidationMessage("✓ Delay saved successfully!", false);
    } catch (error) {
      showValidationMessage("✗ Failed to save delay", true);
      console.error("Error saving observer delay:", error);
    }
  });

  await loadCurrentDelay();
}
