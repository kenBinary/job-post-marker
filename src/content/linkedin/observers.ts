import { markAsViewed } from "../../utils/buttonMarkers";
import { JobObserver } from "../../utils/observer";
import { injectMarker } from "./injectMarker";

export const threshold = 0.5;
const rootMargin = "0px";
const delayMillis = 1000;
export const linkedinBtnObserver = JobObserver<HTMLButtonElement>(
  threshold,
  rootMargin,
  delayMillis,
  (element) => {
    markAsViewed(element);
  }
);

export function setupLinkedinObservers() {
  const bodyNode = document.querySelector("body");
  const bodyObserverCallback: MutationCallback = (mutationsList, observer) => {
    mutationsList.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        mutation.addedNodes.forEach((node) => {
          if (
            node instanceof HTMLUListElement &&
            node.matches("ul:has(li > div > div[data-job-id])")
          ) {
            const ulObserver = new MutationObserver(handleUlMutations);
            ulObserver.observe(node, ulObserverConfig);
            observer.disconnect();
          }
        });
      }
    });
  };

  const bodyObserver = new MutationObserver(bodyObserverCallback);
  const bodyObserverConfig: MutationObserverInit = {
    childList: true,
    subtree: true,
  };
  bodyObserver.observe(bodyNode!, bodyObserverConfig);

  const ulObserverConfig: MutationObserverInit = {
    childList: true,
    subtree: true,
  };

  const handleUlMutations: MutationCallback = (mutationsList, _observer) => {
    mutationsList.forEach((mutation) => {
      const mutatedNode = mutation.target;
      if (
        mutatedNode instanceof HTMLLIElement &&
        mutatedNode.matches("li[data-occludable-job-id]")
      ) {
        const job: HTMLDivElement = mutatedNode.querySelector(
          "li > div > div[data-job-id]"
        )!;

        const jobChildren = job.children;
        if (jobChildren.length === 0) {
          return;
        }

        const jobActionsContainer = jobChildren[jobChildren.length - 1];
        if (!jobActionsContainer) {
          return;
        }

        injectMarker(job);
      }
    });
  };
}
