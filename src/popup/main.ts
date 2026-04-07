import { linkedinAutoMarkerSetup } from "./linkedin/linkedinAutoMarker";
import { oljAutoMarkerSetup } from "./olj/oljAutoMarker";

await oljAutoMarkerSetup();
await linkedinAutoMarkerSetup();
