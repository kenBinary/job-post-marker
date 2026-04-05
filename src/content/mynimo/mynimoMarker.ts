import { autoMarkState } from "../../constants/autoMarkStateKeys";
import type { MYNIMO_AUTO_MARK_TOGGLE_STATE } from "../../types/chrome-storage-local.types";
import { autoMarkToggleLister } from "../../utils/buttonMarkToggledListener";
import { markAsViewed } from "../../utils/buttonMarkers";
import { getFromLocal } from "../../utils/chromeStorage";
import { createMarkingButton } from "../../utils/createButton";
import { JobObserver } from "../../utils/observer";
import { toggleAutoMarkOnShiftE } from "../../utils/shortcutKeysActions";

const mynimoJobObserver = JobObserver<HTMLButtonElement>(
  0.5,
  "0px",
  1000,
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

  autoMarkToggleLister(mynimoJobObserver, autoMarkState.mynimo);
  toggleAutoMarkOnShiftE<MYNIMO_AUTO_MARK_TOGGLE_STATE>(
    "mynimoAutoMarkToggleState",
  );
}
