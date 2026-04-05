import { setupOljMarker } from "./olj-marker/marker";
import "./content.css";

const hostName = window.location.hostname;

if (hostName.includes("onlinejobs.ph")) {
  setupOljMarker();
}
