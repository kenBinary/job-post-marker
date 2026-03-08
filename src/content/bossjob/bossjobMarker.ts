import { LOCAL_STORAGE_KEY_PREFIX } from "../../constants/keyPrefixes";
import { LOCAL_STORAGE_VALUE } from "../../constants/keyValues";
import { markAsViewed, unmarkAsViewed } from "../../utils/buttonMarkers";
import { createMarkingButton } from "../../utils/createButton";

export function setupBossjobMarker() {
  const jobCards = document.querySelectorAll(
    '[data-sentry-component="JobCardPc"]',
  );

  jobCards.forEach((card) => {
    const jobId = card.getAttribute("data-query-id");
    if (!jobId) {
      return;
    }

    const wrapper = card.firstElementChild;
    if (!wrapper) {
      return;
    }

    const jobKey = `${LOCAL_STORAGE_KEY_PREFIX.BOSSJOB_JOB_PREFIX}${jobId}`;
    if (!localStorage.getItem(jobKey)) {
      localStorage.setItem(jobKey, LOCAL_STORAGE_VALUE.NOT_VIEWED);
    }

    const newButton = createMarkingButton(jobId, "BOSSJOB_JOB_PREFIX");

    const jobState = localStorage.getItem(jobKey);
    if (jobState === LOCAL_STORAGE_VALUE.VIEWED) {
      markAsViewed(newButton);
    } else {
      unmarkAsViewed(newButton);
    }

    wrapper.appendChild(newButton);
  });
}
