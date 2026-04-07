import { setupShortcutConfig } from "./shortcutConfig";
import { bossjobAutoMarkerSetup } from "./bossjob/bossjobAutoMarker";
import { indeedAutoMarkerSetup } from "./indeed/indeedAutoMarker";
import { jobstreetAutoMarkerSetup } from "./jobstreet/jobstreetAutoMarker";
import { linkedinAutoMarkerSetup } from "./linkedin/linkedinAutoMarker";
import { mynimoAutoMarkerSetup } from "./mynimo/mynimoAutoMarker";
import { oljAutoMarkerSetup } from "./olj/oljAutoMarker";

await oljAutoMarkerSetup();
await linkedinAutoMarkerSetup();
await indeedAutoMarkerSetup();
await jobstreetAutoMarkerSetup();
await bossjobAutoMarkerSetup();
await mynimoAutoMarkerSetup();
await setupShortcutConfig();
