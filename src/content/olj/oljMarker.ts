import { LOCAL_STORAGE_KEY_PREFIX } from "../../constants/keyPrefixes";
import { LOCAL_STORAGE_VALUE } from "../../constants/keyValues";
import type { OLJ_AUTO_MARK_TOGGLE_STATE } from "../../types/chrome-storage-local.types";
import { getFromLocal } from "../../utils/chromeStorage";
import { JobObserver } from "../../utils/observer";
import { toggleAutoMarkOnShiftE } from "../../utils/shortcutKeysActions";

function markAsViewed(button: HTMLButtonElement) {
  const jobKey = button.getAttribute("data-job-key");
  if (!jobKey) {
    button.textContent = "Invalid Button, no job key found";
    return;
  }

  const jobState = localStorage.getItem(jobKey);
  if (jobState === LOCAL_STORAGE_VALUE.NOT_VIEWED) {
    localStorage.setItem(jobKey, LOCAL_STORAGE_VALUE.VIEWED);
  }
  button.textContent = "Viewed";
  button.className = "btn-viewed";
}

function unmarkAsViewed(button: HTMLButtonElement) {
  const jobKey = button.getAttribute("data-job-key");
  if (!jobKey) {
    button.textContent = "Invalid Button, no job key found";
    return;
  }

  const jobState = localStorage.getItem(jobKey);
  if (jobState === LOCAL_STORAGE_VALUE.VIEWED) {
    localStorage.setItem(jobKey, LOCAL_STORAGE_VALUE.NOT_VIEWED);
  }
  button.className = "marked-as-viewed-btn";
  button.textContent = "Mark As Viewed";
}

const threshold = 0.5;
const rootMargin = "0px";
const delayMillis = 1000;
const observer = JobObserver<HTMLButtonElement>(
  threshold,
  rootMargin,
  delayMillis,
  (element) => {
    markAsViewed(element);
  }
);

export function setupOljMarker() {
  const button = document.createElement("button");
  button.textContent = "Mark As Viewed";
  button.className = "marked-as-viewed-btn";

  const jobs: NodeListOf<HTMLDivElement> = document.querySelectorAll(
    "div.latest-job-post:has(> a[href^='/jobseekers/job/'])"
  );
  const jobButtons: HTMLButtonElement[] = [];

  jobs.forEach((job) => {
    const anchor: HTMLAnchorElement | null = job.querySelector(
      "a[href^='/jobseekers/job/']"
    );

    if (!anchor) {
      return;
    }

    const jobId = anchor.href.split("-").pop();
    if (!jobId) {
      return;
    }

    const jobKey = `${LOCAL_STORAGE_KEY_PREFIX.OLJ_JOB_PREFIX}${jobId}`;
    if (!localStorage.getItem(jobKey)) {
      localStorage.setItem(jobKey, LOCAL_STORAGE_VALUE.NOT_VIEWED);
    }

    const newButton = button.cloneNode(true) as HTMLButtonElement;
    jobButtons.push(newButton);
    newButton.setAttribute("data-job-key", jobKey);

    newButton.addEventListener("click", (event) => {
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
      markAsViewed(newButton);
    } else {
      unmarkAsViewed(newButton);
    }

    jobButtons.forEach(async (button) => {
      const toggleState = await getFromLocal<OLJ_AUTO_MARK_TOGGLE_STATE>([
        "oljAutoMarkToggleState",
      ]);

      if (
        toggleState.oljAutoMarkToggleState !== undefined &&
        toggleState.oljAutoMarkToggleState === true
      ) {
        observer.observe(button);
      }
    });

    job.appendChild(newButton);
  });

  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === "local") {
      if (changes.oljAutoMarkToggleState) {
        const storageChange = changes.oljAutoMarkToggleState;
        if (storageChange.newValue === true) {
          jobButtons.forEach((button) => observer.observe(button));
        } else {
          jobButtons.forEach((button) => observer.unobserve(button));
        }
      }
    }
  });

  toggleAutoMarkOnShiftE<OLJ_AUTO_MARK_TOGGLE_STATE>("oljAutoMarkToggleState");
}
