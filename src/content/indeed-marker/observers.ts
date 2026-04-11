import { markAsViewed } from "../utils/buttonMarkers";
import { JobObserver } from "../utils/observer";
import { getSharedObserverDelay } from "../utils/observerDelay";

const threshold = 1;
const rootMargin = "0px";
export const indeedJobObserver = JobObserver<HTMLButtonElement>(
  threshold,
  rootMargin,
  getSharedObserverDelay,
  (element) => {
    markAsViewed(element);
  },
);
