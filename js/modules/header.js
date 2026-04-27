export function initHeader() {
  const header = document.querySelector("header");
  if (!header) return;

  function updateHeader() {
    if (window.scrollY > 80) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}