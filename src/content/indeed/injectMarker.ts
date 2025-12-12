export function injectMarker(div: HTMLDivElement) {
  const ctaContainer = div.querySelector(".ctaContainer");
  ctaContainer?.classList.add("indeedCtaContianer");

  const button = document.createElement("button");
  button.textContent = "Mark Viewed";
  button.className = "marked-as-viewed-btn";

  const firstChild = ctaContainer?.firstChild;
  if (firstChild) {
    ctaContainer?.insertBefore(button, firstChild);
  }
}
