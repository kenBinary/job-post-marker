import { defineManifest } from "@crxjs/vite-plugin";
import pkg from "./package.json";

export default defineManifest({
  manifest_version: 3,
  name: pkg.name,
  description:
    "A set of tools to help you mark job posts you've already applied/seen to.",
  version: pkg.version,
  icons: {
    48: "public/logo-48.png",
  },
  action: {
    default_icon: {
      48: "public/logo-48.png",
    },
    default_popup: "src/popup/index.html",
  },
  content_scripts: [
    {
      js: ["src/content/main.ts"],
      css: ["src/content/content.css"],
      matches: [
        "https://www.onlinejobs.ph/*",
        "https://www.linkedin.com/jobs/*",
        "https://*.indeed.com/jobs*",
        "https://*.jobstreet.com/*",
        "https://bossjob.ph/*",
        "https://*.bossjob.ph/*",
        "https://www.mynimo.com/*",
      ],
    },
  ],
  permissions: ["contentSettings", "activeTab", "storage"],
});
