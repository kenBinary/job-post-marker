import { markAsViewed } from "../utils/buttonMarkers";
import { JobObserver } from "../utils/observer";
import { setupJobstreetMarker } from "./jobstreetMarker";

const threshold = 0.5;
const rootMargin = "0px";
const delayMillis = 1000;
export const jobstreetJobObserver = JobObserver<HTMLButtonElement>(
  threshold,
  rootMargin,
  delayMillis,
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
