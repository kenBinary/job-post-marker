import { LOCAL_STORAGE_VALUE } from "../constants/keyValues";

export function markAsViewed(button: HTMLButtonElement) {
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

export function unmarkAsViewed(button: HTMLButtonElement) {
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
  button.textContent = "Mark Viewed";
}
