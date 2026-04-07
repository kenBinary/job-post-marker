import { LOCAL_STORAGE_VALUE } from "../constants/keyValues";
import { markAsViewed, unmarkAsViewed } from "../utils/buttonMarkers";

export function createMarkingButton(
  jobKey: string,
  jobState: string | null,
): HTMLButtonElement {
  const button = document.createElement("button");
  button.textContent = "Mark Viewed";
  button.className = "marked-as-viewed-btn";
  button.setAttribute("data-job-key", jobKey);
  // indeedJobObserver.observe(button);

  button.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const currentButton = event.currentTarget as HTMLButtonElement;
    const jobKey = currentButton.getAttribute("data-job-key");
    if (!jobKey) {
      return;
    }

    const jobState = localStorage.getItem(jobKey);
    if (!jobState) {
      return;
    }
    currentButton.setAttribute("data-job-value", jobState);
    if (!jobState) {
      return;
    }

    if (jobState === LOCAL_STORAGE_VALUE.NOT_VIEWED) {
      markAsViewed(currentButton);
    } else {
      unmarkAsViewed(currentButton);
    }
  });

  if (jobState === LOCAL_STORAGE_VALUE.VIEWED) {
    markAsViewed(button);
  } else {
    unmarkAsViewed(button);
  }

  return button;
}
