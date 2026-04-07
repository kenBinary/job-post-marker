import "./content.css";
import { setupOljMarker } from "./olj-marker/marker";
import { setupLinkedinMarker } from "./linkedin-marker/linkedinMarker";
import { setupIndeedMarker } from "./indeed-marker/indeedMarker";
import { setupJobstreetMarker } from "./jobstreet-marker/jobstreetMarker";
import { observeJobStreetJobs } from "./jobstreet-marker/observer";
import { setupBossjobMarker } from "./bossjob-marker/bossjobMarker";
import { setupMynimoMarker } from "./mynimo/mynimoMarker";

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
} else if (hostName.includes("mynimo.com")) {
  setupMynimoMarker();
}
