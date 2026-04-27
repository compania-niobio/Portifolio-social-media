export function initHeader() {
  const header = document.querySelector("header");
  if (!header) return;

  const updateHeader = () => {
    const scrolled = window.scrollY > 40;
    header.classList.toggle("nav-dark", scrolled);
    header.classList.toggle("is-scrolled", scrolled);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}
