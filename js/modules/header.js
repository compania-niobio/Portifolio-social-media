export function initHeader() {
  const header = document.querySelector("header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    header.classList.toggle("nav-dark", window.scrollY > 50);
  }, { passive: true });
}

