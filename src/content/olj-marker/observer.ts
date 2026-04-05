import { markAsViewed } from "../utils/buttonMarkers";
import { JobObserver } from "../utils/observer";

const threshold = 0.5;
const rootMargin = "0px";
const delayMillis = 1000;
export const oljObserver = JobObserver<HTMLButtonElement>(
  threshold,
  rootMargin,
  delayMillis,
  (element) => {
    markAsViewed(element);
  },
);
