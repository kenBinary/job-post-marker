import { indeedAutoMarkerSetup } from "./popup/indeed/indeedAutoMarker";
import { linkedinAutoMarkerSetup } from "./popup/linkedin/linkedinAutoMarker";
import { oljAutoMarkerSetup } from "./popup/olj/oljAutoMarker";

await oljAutoMarkerSetup();
await linkedinAutoMarkerSetup();
await indeedAutoMarkerSetup();
