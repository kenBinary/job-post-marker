import { setupOljMarker } from "./content/olj/oljMarker";
import "./content.css";
import { setupLinkedinMarker } from "./content/linkedin/linkedinMarker";
import { setupIndeedMarker } from "./content/indeed/indeedMarker";

const hostName = window.location.hostname;

if (hostName.includes("onlinejobs.ph")) {
  setupOljMarker();
} else if (hostName.includes("linkedin.com")) {
  setupLinkedinMarker();
} else if (hostName.includes("indeed.com")) {
  setupIndeedMarker();
}
