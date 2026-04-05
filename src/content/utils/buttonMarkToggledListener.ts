import { autoMarkState } from "@/shared/constants/autoMarkStateKeys";

export type AutoMarkToggleStateValue =
  (typeof autoMarkState)[keyof typeof autoMarkState];

export function autoMarkToggleListener(
  observer: IntersectionObserver,
  toggleStateValue: AutoMarkToggleStateValue,
) {
  chrome.storage.onChanged.addListener((changes, areaName) => {
    const jobButtons = document.querySelectorAll(
      ".marked-as-viewed-btn, .btn-viewed",
    );
    if (areaName === "local") {
      if (changes[toggleStateValue]) {
        const storageChange = changes[toggleStateValue];
        if (storageChange.newValue === true) {
          jobButtons.forEach((button) => observer.observe(button));
        } else {
          jobButtons.forEach((button) => observer.unobserve(button));
        }
      }
    }
  });
}
