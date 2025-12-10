import { setupOljMarker } from "./content/olj/oljMarker";
import "./content.css";
import { setupLinkedinMarker } from "./content/linkedin/linkedinMarker";

const hostName = window.location.hostname;

if (hostName.includes("onlinejobs.ph")) {
  setupOljMarker();
} else if (hostName.includes("linkedin.com")) {
  setupLinkedinMarker();
}
