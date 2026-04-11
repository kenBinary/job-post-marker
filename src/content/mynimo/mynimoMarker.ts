import { autoMarkState } from "@/shared/constants/autoMarkStateKeys";
import type { MYNIMO_AUTO_MARK_TOGGLE_STATE } from "@/shared/types/chrome-storage-local.types";
import { autoMarkToggleListener } from "../utils/buttonMarkToggledListener";
import { markAsViewed } from "../utils/buttonMarkers";
import { getFromLocal } from "@/shared/utils/chromeStorage";
import { createMarkingButton } from "../utils/createButton";
import { JobObserver } from "../utils/observer";
import { getSharedObserverDelay } from "../utils/observerDelay";
import { toggleAutoMarkOnKeyPress } from "../utils/shortcutKeysActions";

const mynimoJobObserver = JobObserver<HTMLButtonElement>(
  0.5,
  "0px",
  getSharedObserverDelay,
  (element) => {
    markAsViewed(element);
  },
);

export function setupMynimoMarker() {
  let jobCards = document.querySelectorAll("a[href*='/jobs']");
  const filteredCards = Array.from(jobCards).filter((e) => {
    return e.getAttribute("data-chakra-component") === "CPseudoBox";
  });

  filteredCards.forEach(async (card) => {
    if (card.querySelector(".marked-as-viewed-btn")) {
      return;
    }

    const href = card.getAttribute("href");
    if (!href) return;

    const match = href.match(/\/jobs\/view\/(\d+)\//);
    if (!match || !match[1]) return;
    const jobId = match[1];

    const newButton = createMarkingButton(jobId, "MYNIMO_JOB_PREFIX");

    // Stop propagation so clicking the button doesn't trigger the link
    newButton.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
    });

    card.appendChild(newButton);

    const toggleState = await getFromLocal<MYNIMO_AUTO_MARK_TOGGLE_STATE>([
      "mynimoAutoMarkToggleState",
    ]);

    if (
      toggleState.mynimoAutoMarkToggleState !== undefined &&
      toggleState.mynimoAutoMarkToggleState === true
    ) {
      mynimoJobObserver.observe(newButton);
    }
  });

  autoMarkToggleListener(mynimoJobObserver, autoMarkState.mynimo);
  toggleAutoMarkOnKeyPress<MYNIMO_AUTO_MARK_TOGGLE_STATE>(
    "mynimoAutoMarkToggleState",
  );
}
