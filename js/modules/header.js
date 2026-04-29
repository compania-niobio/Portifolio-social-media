export function initHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  let lastScroll = window.scrollY;

  const updateHeader = () => {
    const currentScroll = window.scrollY;
    const goingDown = currentScroll > lastScroll && currentScroll > 180;

    header.classList.toggle("nav-dark", currentScroll > 50);
    header.classList.toggle("nav-hidden", goingDown);

    lastScroll = Math.max(currentScroll, 0);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}
