import { autoMarkState } from "@/shared/constants/autoMarkStateKeys";
import { LOCAL_STORAGE_KEY_PREFIX } from "../constants/keyPrefixes";
import { LOCAL_STORAGE_VALUE } from "../constants/keyValues";
import type { OLJ_AUTO_MARK_TOGGLE_STATE } from "@/shared/types/chrome-storage-local.types";
import { markAsViewed, unmarkAsViewed } from "../utils/buttonMarkers";
import { autoMarkToggleListener } from "../utils/buttonMarkToggledListener";
import { getFromLocal } from "@/shared/utils/chromeStorage";
import { createMarkingButton } from "../utils/createButton";
import { toggleAutoMarkOnKeyPress } from "../utils/shortcutKeysActions";
import { oljObserver } from "./observer";

export function setupOljMarker() {
  const jobs: NodeListOf<HTMLDivElement> = document.querySelectorAll(
    "div.latest-job-post:has(> a[href^='/jobseekers/job/'])",
  );
  jobs.forEach(async (job) => {
    const anchor: HTMLAnchorElement | null = job.querySelector(
      "a[href^='/jobseekers/job/']",
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

    const newButton = createMarkingButton(jobId, "OLJ_JOB_PREFIX");

    const jobState = localStorage.getItem(jobKey);
    if (jobState === LOCAL_STORAGE_VALUE.VIEWED) {
      markAsViewed(newButton);
    } else {
      unmarkAsViewed(newButton);
    }

    const toggleState = await getFromLocal<OLJ_AUTO_MARK_TOGGLE_STATE>([
      "oljAutoMarkToggleState",
    ]);

    if (
      toggleState.oljAutoMarkToggleState !== undefined &&
      toggleState.oljAutoMarkToggleState === true
    ) {
      oljObserver.observe(newButton);
    }

    job.appendChild(newButton);
  });

  autoMarkToggleListener(oljObserver, autoMarkState.olj);
  toggleAutoMarkOnKeyPress<OLJ_AUTO_MARK_TOGGLE_STATE>(
    "oljAutoMarkToggleState",
  );
}
