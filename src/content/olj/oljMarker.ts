import { LOCAL_STORAGE_KEY_PREFIX } from "../../constants/keyPrefixes";
import { LOCAL_STORAGE_VALUE } from "../../constants/keyValues";
import { JobObserver } from "../../utils/observer";

function markAsViewed(button: HTMLButtonElement) {
  const jobKey = button.getAttribute("data-job-key");
  if (!jobKey) {
    button.textContent = "Invalid Button, no job key found";
    return;
  }

  const jobState = localStorage.getItem(jobKey);
  if (jobState === LOCAL_STORAGE_VALUE.NOT_VIEWED) {
    localStorage.setItem(jobKey, LOCAL_STORAGE_VALUE.VIEWED);
    button.textContent = "Viewed";
    button.className = "btn-viewed";
  }
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
    button.textContent = "Mark As Viewed";
    button.className = "marked-as-viewed-btn";
  }
}

const threshold = 0.5;
const rootMargin = "0px";
const delayMillis = 0;
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
      observer.observe(newButton);
    }

    job.appendChild(newButton);
  });
}
