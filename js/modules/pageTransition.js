export function initPageTransition() {
  const transition = document.querySelector(".page-transition");
  const links = document.querySelectorAll("a[href]");

  if (!transition) return;

  links.forEach((link) => {
    const url = link.getAttribute("href");

    if (
      !url ||
      url.startsWith("#") ||
      url.startsWith("http") ||
      url.startsWith("mailto:") ||
      url.startsWith("tel:") ||
      url.startsWith("https://wa.me")
    ) {
      return;
    }

    link.addEventListener("click", (event) => {
      event.preventDefault();

      transition.classList.add("active");

      setTimeout(() => {
        window.location.href = url;
      }, 500);
    });
  });
}