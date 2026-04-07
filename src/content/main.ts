import "./content.css";
import { setupOljMarker } from "./olj-marker/marker";
import { setupLinkedinMarker } from "./linkedin-marker/linkedinMarker";
import { setupIndeedMarker } from "./indeed-marker/indeedMarker";

const hostName = window.location.hostname;

if (hostName.includes("onlinejobs.ph")) {
  setupOljMarker();
} else if (hostName.includes("linkedin.com")) {
  setupLinkedinMarker();
} else if (hostName.includes("indeed.com")) {
  setupIndeedMarker();
}
