export function setupBossjobObservers() {
  console.log("Setting up Bossjob observers...");
  const bodyNode = document.querySelector("body");
  const bodyObserverCallback: MutationCallback = (mutationsList, observer) => {
    mutationsList.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            const hasJobCard = node.querySelectorAll(
              '[data-sentry-component="JobCardPc"]',
            );
            if (hasJobCard) {
              console.log("Job card added in Bossjob:", node);
            }
            // console.log("Node added in Bossjob:", node);
          }
        });
      }
      if (mutation.removedNodes.length) {
        mutation.removedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            const hasJobCard = node.querySelectorAll(
              '[data-sentry-component="JobCardPc"]',
            );
            if (hasJobCard) {
              console.log("Job card removed in Bossjob:", node);
            }
            // console.log("Node removed in Bossjob:", node);
          }
        });
      }
    });
  };

  const bodyObserver = new MutationObserver(bodyObserverCallback);
  const bodyObserverConfig: MutationObserverInit = {
    childList: true,
    subtree: true,
    attributes: true,
  };
  bodyObserver.observe(bodyNode!, bodyObserverConfig);
}
