import { getDeviceType } from "./device.js";

export function initParallax() {
  const items = document.querySelectorAll(".hero-floating .float-item, .perfil-card-modelo .float-item");
  if (!items.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  let ticking = false;

  const update = () => {
    ticking = false;

    if (getDeviceType() !== "desktop") {
      items.forEach((item) => item.style.removeProperty("--parallax-y"));
      return;
    }

    const scroll = window.scrollY;

    items.forEach((item, index) => {
      const speed = ((index % 5) + 1) * 0.012;
      item.style.translate = `0 ${scroll * speed}px`;
    });
  };

  const requestUpdate = () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  };

  update();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate, { passive: true });
}
