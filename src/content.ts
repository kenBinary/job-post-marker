import { setupOljMarker } from "./content/olj/oljMarker";
import "./content.css";
import { setupLinkedinMarker } from "./content/linkedin/linkedinMarker";
import { setupIndeedMarker } from "./content/indeed/indeedMarker";
import { setupJobstreetMarker } from "./content/jobstreet/jobstreetMarker.ts";
import { observeJobStreetJobs } from "./content/jobstreet/observer.ts";
import { setupBossjobMarker } from "./content/bossjob/bossjobMarker.ts";

const hostName = window.location.hostname;

if (hostName.includes("onlinejobs.ph")) {
  setupOljMarker();
} else if (hostName.includes("linkedin.com")) {
  setupLinkedinMarker();
} else if (hostName.includes("indeed.com")) {
  setupIndeedMarker();
} else if (hostName.includes("jobstreet.com")) {
  setupJobstreetMarker();
  observeJobStreetJobs();
} else if (hostName.includes("bossjob.ph")) {
  // TODO: use observers
  setTimeout(() => {
    setupBossjobMarker();
  }, 3000);
}
