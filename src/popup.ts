import { indeedAutoMarkerSetup } from "./popup/indeed/indeedAutoMarker";
import { jobstreetAutoMarkerSetup } from "./popup/jobstreet/jobstreetAutoMarker";
import { linkedinAutoMarkerSetup } from "./popup/linkedin/linkedinAutoMarker";
import { oljAutoMarkerSetup } from "./popup/olj/oljAutoMarker";
import { setupShortcutConfig } from "./popup/shortcutConfig";

import { bossjobAutoMarkerSetup } from "./popup/bossjob/bossjobAutoMarker";
import { mynimoAutoMarkerSetup } from "./popup/mynimo/mynimoAutoMarker";

await setupShortcutConfig();
await oljAutoMarkerSetup();
await linkedinAutoMarkerSetup();
await indeedAutoMarkerSetup();
await jobstreetAutoMarkerSetup();
await bossjobAutoMarkerSetup();
await mynimoAutoMarkerSetup();
