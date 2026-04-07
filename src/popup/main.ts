import { indeedAutoMarkerSetup } from "./indeed/indeedAutoMarker";
import { linkedinAutoMarkerSetup } from "./linkedin/linkedinAutoMarker";
import { oljAutoMarkerSetup } from "./olj/oljAutoMarker";

await oljAutoMarkerSetup();
await linkedinAutoMarkerSetup();
await indeedAutoMarkerSetup();
