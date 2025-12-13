import { autoMarkState } from "../../constants/autoMarkStateKeys";
import type { JOBSTREET_AUTO_MARK_TOGGLE_STATE } from "../../types/chrome-storage-local.types";
import { autoMarkToggleLister } from "../../utils/buttonMarkToggledListener";
import { getFromLocal } from "../../utils/chromeStorage";
import { createMarkingButton } from "../../utils/createButton";
import { toggleAutoMarkOnShiftE } from "../../utils/shortcutKeysActions";
import { jobstreetJobObserver } from "./observer";

export function setupJobstreetMarker() {
  const jobArticles: NodeListOf<HTMLElement> =
    document.querySelectorAll("[data-job-id]");

  jobArticles.forEach(async (article) => {
    const jobId = article.getAttribute("data-job-id");
    if (!jobId) {
      return;
    }
    const buttonContainer = article!.lastElementChild!.lastElementChild!
      .lastElementChild!.lastElementChild?.lastElementChild! as HTMLElement;

    const bookMarkElement = buttonContainer.firstElementChild;

    const newButton = createMarkingButton(jobId, "JOBSTREET_JOB_PREFIX");
    buttonContainer.insertBefore(newButton, bookMarkElement);

    const toggleState = await getFromLocal<JOBSTREET_AUTO_MARK_TOGGLE_STATE>([
      "jobstreetAutoMarkToggleState",
    ]);

    if (
      toggleState.jobstreetAutoMarkToggleState !== undefined &&
      toggleState.jobstreetAutoMarkToggleState === true
    ) {
      jobstreetJobObserver.observe(newButton);
    }
  });

  autoMarkToggleLister(jobstreetJobObserver, autoMarkState.jobstreet);
  toggleAutoMarkOnShiftE<JOBSTREET_AUTO_MARK_TOGGLE_STATE>(
    "jobstreetAutoMarkToggleState"
  );
}
