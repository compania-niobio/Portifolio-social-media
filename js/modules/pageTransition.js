export function initPageTransition() {
  const transition = document.querySelector(".page-transition");
  if (!transition) return;

  document.querySelectorAll("a[href]").forEach((link) => {
    const url = link.getAttribute("href");
    const target = link.getAttribute("target");

    const isExternal =
      url?.startsWith("http") ||
      url?.startsWith("mailto:") ||
      url?.startsWith("tel:") ||
      url?.startsWith("https://wa.me");

    const isAnchor = url?.startsWith("#");
    const shouldIgnore = !url || isExternal || isAnchor || target === "_blank";

    if (shouldIgnore) return;

    link.addEventListener("click", (event) => {
      event.preventDefault();
      transition.classList.add("active");

      window.setTimeout(() => {
        window.location.href = url;
      }, 450);
    });
  });
}
