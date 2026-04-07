import "./content.css";
import { setupOljMarker } from "./olj-marker/marker";
import { setupLinkedinMarker } from "./linkedin-marker/linkedinMarker";

const hostName = window.location.hostname;

if (hostName.includes("onlinejobs.ph")) {
  setupOljMarker();
} else if (hostName.includes("linkedin.com")) {
  setupLinkedinMarker();
}
