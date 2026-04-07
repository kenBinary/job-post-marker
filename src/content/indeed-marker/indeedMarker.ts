import { autoMarkState } from "@/shared/constants/autoMarkStateKeys";
import { LOCAL_STORAGE_KEY_PREFIX } from "../constants/keyPrefixes";
import { LOCAL_STORAGE_VALUE } from "../constants/keyValues";
import type { INDEED_AUTO_MARK_TOGGLE_STATE } from "@/shared/types/chrome-storage-local.types";
import { autoMarkToggleListener } from "../utils/buttonMarkToggledListener";
import { getFromLocal } from "@/shared/utils/chromeStorage";
import { toggleAutoMarkOnKeyPress } from "../utils/shortcutKeysActions";
import { createMarkingButton } from "./createButton";
import { indeedJobObserver } from "./observers";

export function setupIndeedMarker() {
  let jobList: HTMLLIElement[] = Array.from(
    document.querySelectorAll("li:has(div:first-child[class^='job_'])"),
  ).filter((job) => {
    return !job.firstElementChild?.hasAttribute("aria-hidden");
  }) as HTMLLIElement[];

  const jobListObserverCallback: MutationCallback = (
    mutationsList,
    _observer,
  ) => {
    mutationsList.forEach(async (mutation) => {
      if (mutation.removedNodes.length) {
        for (const node of mutation.removedNodes) {
          if (
            node instanceof HTMLDivElement &&
            mutation.target instanceof HTMLLIElement &&
            Array.from(node.classList).some((className) => {
              return className.startsWith("job_");
            })
          ) {
            const previousButton = node.querySelector(".marked-as-viewed-btn");
            if (previousButton) {
              indeedJobObserver.unobserve(previousButton);
            }

            const parentJob = mutation.target;
            const jobClassList = parentJob.firstElementChild?.classList;
            if (!jobClassList) {
              return;
            }
            const jobId = [...jobClassList]
              .find((className) => className.startsWith("job_"))
              ?.split("_")[1];
            if (!jobId) {
              return;
            }
            const jobKey = `${LOCAL_STORAGE_KEY_PREFIX.INDEED_JOB_PREFIX}${jobId}`;
            const jobState = localStorage.getItem(jobKey);
            if (!jobState) {
              localStorage.setItem(jobKey, LOCAL_STORAGE_VALUE.NOT_VIEWED);
            }
            const ctaContainer = parentJob?.querySelector(".ctaContainer");
            ctaContainer?.classList.add("indeedCtaContianer");

            const button = createMarkingButton(jobKey, jobState);
            const toggleState =
              await getFromLocal<INDEED_AUTO_MARK_TOGGLE_STATE>([
                "indeedAutoMarkToggleState",
              ]);

            if (
              toggleState.indeedAutoMarkToggleState !== undefined &&
              toggleState.indeedAutoMarkToggleState === true
            ) {
              indeedJobObserver.observe(button);
            }

            const firstChild = ctaContainer?.firstChild;
            if (firstChild) {
              ctaContainer?.insertBefore(button, firstChild);
            }
          }
        }
      }
    });
  };

  const jobListObserver = new MutationObserver(jobListObserverCallback);
  const jobListObserverConfig: MutationObserverInit = {
    childList: true,
    subtree: true,
    attributes: true,
  };
  jobList.forEach((job) => {
    jobListObserver.observe(job, jobListObserverConfig);
  });

  jobList.forEach(async (job) => {
    const ctaContainer = job.querySelector(".ctaContainer");
    ctaContainer?.classList.add("indeedCtaContianer");

    const jobClassList = job.firstElementChild?.classList;
    if (!jobClassList) {
      return;
    }
    const jobId = [...jobClassList]
      .find((className) => className.startsWith("job_"))
      ?.split("_")[1];
    if (!jobId) {
      return;
    }
    const jobKey = `${LOCAL_STORAGE_KEY_PREFIX.INDEED_JOB_PREFIX}${jobId}`;
    const jobState = localStorage.getItem(jobKey);
    if (!jobState) {
      localStorage.setItem(jobKey, LOCAL_STORAGE_VALUE.NOT_VIEWED);
    }

    const button = createMarkingButton(jobKey, jobState);

    const firstChild = ctaContainer?.firstChild;
    if (firstChild) {
      ctaContainer?.insertBefore(button, firstChild);
    }

    const toggleState = await getFromLocal<INDEED_AUTO_MARK_TOGGLE_STATE>([
      "indeedAutoMarkToggleState",
    ]);

    if (
      toggleState.indeedAutoMarkToggleState !== undefined &&
      toggleState.indeedAutoMarkToggleState === true
    ) {
      indeedJobObserver.observe(button);
    }
  });

  autoMarkToggleListener(indeedJobObserver, autoMarkState.indeed);
  toggleAutoMarkOnKeyPress<INDEED_AUTO_MARK_TOGGLE_STATE>(
    "indeedAutoMarkToggleState",
  );
}
