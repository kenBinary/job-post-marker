import { LOCAL_STORAGE_KEY_PREFIX } from "../constants/keyPrefixes";
import { LOCAL_STORAGE_VALUE } from "../constants/keyValues";
import type { LINKEDIN_AUTO_MARK_TOGGLE_STATE } from "@/shared/types/chrome-storage-local.types";
import { markAsViewed, unmarkAsViewed } from "../utils/buttonMarkers";
import { getFromLocal } from "@/shared/utils/chromeStorage";
import { linkedinBtnObserver } from "./observers";

export async function injectMarker(listingElement: HTMLDivElement) {
  const jobId = listingElement.getAttribute("data-job-id");
  if (!jobId) {
    return;
  }

  const jobChildren = listingElement.children;
  if (jobChildren.length === 0) {
    return;
  }

  const jobActionsContainer = jobChildren[jobChildren.length - 1];
  if (!jobActionsContainer) {
    return;
  }

  const markViewButton = jobActionsContainer.querySelector(
    ".marked-as-viewed-btn, .btn-viewed",
  );
  if (markViewButton) {
    return;
  }

  const jobKey = `${LOCAL_STORAGE_KEY_PREFIX.LINKEDIN_JOB_PREFIX}${jobId}`;
  const button = document.createElement("button");
  button.textContent = "Mark Viewed";
  button.className = "marked-as-viewed-btn";
  button.setAttribute("data-job-key", jobKey);

  if (!localStorage.getItem(jobKey)) {
    localStorage.setItem(jobKey, LOCAL_STORAGE_VALUE.NOT_VIEWED);
  }

  button.addEventListener("click", (event) => {
    event.stopPropagation();
    event.preventDefault();

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

  const jobState = localStorage.getItem(jobKey);
  if (jobState === LOCAL_STORAGE_VALUE.VIEWED) {
    markAsViewed(button);
  } else {
    unmarkAsViewed(button);
  }

  jobActionsContainer.appendChild(button);

  const toggleState = await getFromLocal<LINKEDIN_AUTO_MARK_TOGGLE_STATE>([
    "linkedinAutoMarkToggleState",
  ]);
  if (
    toggleState.linkedinAutoMarkToggleState !== undefined &&
    toggleState.linkedinAutoMarkToggleState
  ) {
    linkedinBtnObserver.observe(button);
  }
}
