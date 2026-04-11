import { markAsViewed } from "../utils/buttonMarkers";
import { JobObserver } from "../utils/observer";
import { getSharedObserverDelay } from "../utils/observerDelay";

const threshold = 0.5;
const rootMargin = "0px";
export const oljObserver = JobObserver<HTMLButtonElement>(
  threshold,
  rootMargin,
  getSharedObserverDelay,
  (element) => {
    markAsViewed(element);
  },
);
