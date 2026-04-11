import { markAsViewed } from "../utils/buttonMarkers";
import { JobObserver } from "../utils/observer";
import { setupJobstreetMarker } from "./jobstreetMarker";
import { getSharedObserverDelay } from "../utils/observerDelay";

const threshold = 0.5;
const rootMargin = "0px";
export const jobstreetJobObserver = JobObserver<HTMLButtonElement>(
  threshold,
  rootMargin,
  getSharedObserverDelay,
  (element) => {
    markAsViewed(element);
  },
);

export function observeJobStreetJobs() {
  const jobStreetObserver = new MutationObserver((mutation, _observer) => {
    mutation.forEach((mut) => {
      if (mut.addedNodes.length > 0) {
        mut.addedNodes.forEach((node) => {
          if (
            node instanceof HTMLElement &&
            node.querySelectorAll("[data-job-id]").length > 0
          ) {
            jobstreetJobObserver.disconnect();
            setupJobstreetMarker();
          }
        });
      }
    });
  });
  const config: MutationObserverInit = {
    childList: true,
    attributes: true,
    subtree: true,
  };
  const target = document.querySelector('[data-automation="split-view"]');
  if (target) jobStreetObserver.observe(target, config);
}
