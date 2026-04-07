import { autoMarkState } from "@/shared/constants/autoMarkStateKeys";
import type { JOBSTREET_AUTO_MARK_TOGGLE_STATE } from "@/shared/types/chrome-storage-local.types";
import { autoMarkToggleListener } from "../utils/buttonMarkToggledListener";
import { getFromLocal } from "@/shared/utils/chromeStorage";
import { createMarkingButton } from "../utils/createButton";
import { toggleAutoMarkOnKeyPress } from "../utils/shortcutKeysActions";
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

  autoMarkToggleListener(jobstreetJobObserver, autoMarkState.jobstreet);
  toggleAutoMarkOnKeyPress<JOBSTREET_AUTO_MARK_TOGGLE_STATE>(
    "jobstreetAutoMarkToggleState",
  );
}
