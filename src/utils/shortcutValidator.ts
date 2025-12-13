import reservedShortcuts from "../constants/reserved_shortcuts.json";

type Modifier = "shift" | "alt";

interface ShortcutConfig {
  modifier: Modifier;
  key: string;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function formatShortcut(modifier: Modifier, key: string): string {
  const modifierDisplay = modifier.charAt(0).toUpperCase() + modifier.slice(1);
  return `${modifierDisplay}+${key.toUpperCase()}`;
}

function isReservedShortcut(modifier: Modifier, key: string): boolean {
  const shortcutStr = formatShortcut(modifier, key);

  const windowsReserved = reservedShortcuts.windows.some(
    (reserved) => reserved.toLowerCase() === shortcutStr.toLowerCase()
  );

  const commonReserved = reservedShortcuts.common.some(
    (reserved) => reserved.toLowerCase() === shortcutStr.toLowerCase()
  );

  return windowsReserved || commonReserved;
}

export function validateShortcut(config: ShortcutConfig): ValidationResult {
  const { modifier, key } = config;

  if (modifier !== "shift" && modifier !== "alt") {
    return {
      isValid: false,
      error: "Only Shift and Alt modifiers are allowed",
    };
  }

  if (!key || key.trim() === "") {
    return {
      isValid: false,
      error: "Please specify a key",
    };
  }

  if (key.length > 1 && !isSpecialKey(key)) {
    return {
      isValid: false,
      error:
        "Key must be a single character or special key (F1-F12, Escape, etc.)",
    };
  }

  if (isReservedShortcut(modifier, key)) {
    return {
      isValid: false,
      error: `${formatShortcut(modifier, key)} is reserved by the browser`,
    };
  }

  return { isValid: true };
}

function isSpecialKey(key: string): boolean {
  const specialKeys = [
    "F1",
    "F2",
    "F3",
    "F4",
    "F5",
    "F6",
    "F7",
    "F8",
    "F9",
    "F10",
    "F11",
    "F12",
    "Escape",
    "Tab",
    "Enter",
    "Space",
    "Backspace",
    "Delete",
    "Home",
    "End",
    "PageUp",
    "PageDown",
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
  ];

  return specialKeys.includes(key);
}

export function normalizeKey(key: string): string {
  if (key.length === 1) {
    return key.toUpperCase();
  }

  return key;
}
