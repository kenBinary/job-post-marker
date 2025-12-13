import { SHORTCUT_STORAGE_KEY } from "../constants/autoMarkStateKeys";
import type { SHORTCUT_CONFIG } from "../types/chrome-storage-local.types";
import { getFromLocal, setToLocal } from "../utils/chromeStorage";
import {
  formatShortcut,
  normalizeKey,
  validateShortcut,
  type ValidationResult,
} from "../utils/shortcutValidator";

export async function setupShortcutConfig() {
  const shortcutInput = document.getElementById(
    "shortcut-input"
  )! as HTMLInputElement;
  const captureButton = document.getElementById("capture-shortcut-btn")!;
  const currentShortcutDisplay = document.getElementById(
    "current-shortcut-display"
  )!;
  const validationMessage = document.getElementById("shortcut-validation-msg")!;
  const toggleConfigButton = document.getElementById(
    "toggle-shortcut-config-btn"
  )!;
  const configPanel = document.getElementById("shortcut-config-panel")!;

  let isCapturing = false;
  let capturedModifier: "shift" | "alt" | null = null;
  let capturedKey: string | null = null;

  toggleConfigButton.addEventListener("click", () => {
    const isHidden = configPanel.classList.contains("hidden");
    if (isHidden) {
      configPanel.classList.remove("hidden");
      toggleConfigButton.textContent = "Cancel";
    } else {
      configPanel.classList.add("hidden");
      toggleConfigButton.textContent = "Set New Shortcut";
      if (isCapturing) {
        isCapturing = false;
        captureButton.textContent = "Capture";
        (captureButton as HTMLButtonElement).classList.remove("btn-warning");
        (captureButton as HTMLButtonElement).classList.add("btn-primary");
        shortcutInput.disabled = false;
        loadCurrentShortcut();
      }
      validationMessage.textContent = "";
    }
  });

  async function loadCurrentShortcut() {
    const config = await getFromLocal<SHORTCUT_CONFIG>([SHORTCUT_STORAGE_KEY]);
    const shortcutConfig = config[SHORTCUT_STORAGE_KEY];

    if (shortcutConfig) {
      const formatted = formatShortcut(
        shortcutConfig.modifier,
        shortcutConfig.key
      );
      currentShortcutDisplay.textContent = formatted;
      shortcutInput.value = formatted;
    }
  }

  function showValidationMessage(result: ValidationResult) {
    if (result.isValid) {
      validationMessage.textContent = "✓ Shortcut saved successfully!";
      validationMessage.className = "text-xs text-green-600";
      setTimeout(() => {
        validationMessage.textContent = "";
        configPanel.classList.add("hidden");
        toggleConfigButton.textContent = "Set New Shortcut";
      }, 2000);
    } else {
      validationMessage.textContent = `✗ ${result.error}`;
      validationMessage.className = "text-xs text-red-600";
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (!isCapturing) return;

    event.preventDefault();
    event.stopPropagation();

    if (event.shiftKey) {
      capturedModifier = "shift";
    } else if (event.altKey) {
      capturedModifier = "alt";
    } else {
      showValidationMessage({
        isValid: false,
        error: "Press Shift or Alt along with another key",
      });
      return;
    }

    if (
      event.key === "Shift" ||
      event.key === "Alt" ||
      event.key === "Control" ||
      event.key === "Meta"
    ) {
      return;
    }

    capturedKey = normalizeKey(event.key);

    const result = validateShortcut({
      modifier: capturedModifier,
      key: capturedKey,
    });

    if (result.isValid && capturedModifier && capturedKey) {
      const formatted = formatShortcut(capturedModifier, capturedKey);
      shortcutInput.value = formatted;

      saveShortcut(capturedModifier, capturedKey);
    } else {
      showValidationMessage(result);
      shortcutInput.value = "";
    }

    isCapturing = false;
    captureButton.textContent = "Capture";
    (captureButton as HTMLButtonElement).classList.remove("btn-warning");
    (captureButton as HTMLButtonElement).classList.add("btn-primary");
    shortcutInput.disabled = false;
  }

  async function saveShortcut(modifier: "shift" | "alt", key: string) {
    try {
      await setToLocal<SHORTCUT_CONFIG>({
        [SHORTCUT_STORAGE_KEY]: {
          modifier,
          key,
        },
      });

      const formatted = formatShortcut(modifier, key);
      currentShortcutDisplay.textContent = formatted;

      showValidationMessage({ isValid: true });
    } catch (error) {
      showValidationMessage({
        isValid: false,
        error: "Failed to save shortcut",
      });
      console.error("Error saving shortcut:", error);
    }
  }

  captureButton.addEventListener("click", () => {
    if (!isCapturing) {
      isCapturing = true;
      shortcutInput.value = "Press your shortcut...";
      shortcutInput.disabled = true;
      captureButton.textContent = "Capturing...";
      (captureButton as HTMLButtonElement).classList.remove("btn-primary");
      (captureButton as HTMLButtonElement).classList.add("btn-warning");
      validationMessage.textContent = "";
      capturedModifier = null;
      capturedKey = null;
    } else {
      isCapturing = false;
      captureButton.textContent = "Capture";
      (captureButton as HTMLButtonElement).classList.remove("btn-warning");
      (captureButton as HTMLButtonElement).classList.add("btn-primary");
      shortcutInput.disabled = false;
      loadCurrentShortcut();
    }
  });

  document.addEventListener("keydown", handleKeyDown);

  await loadCurrentShortcut();
}
