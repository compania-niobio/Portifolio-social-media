import { getDeviceType } from "./device.js";

export function initParallax() {
  const phones = document.querySelectorAll(".phone");
  const parallaxItems = document.querySelectorAll(".parallax");
  const heroContent = document.querySelector(".hero-content");

  if (!phones.length && !parallaxItems.length && !heroContent) return;

  let ticking = false;

  const resetMobileEffects = () => {
    if (heroContent) {
      heroContent.style.transform = "none";
      heroContent.style.opacity = "1";
      heroContent.style.filter = "none";
    }

    phones.forEach((phone) => {
      phone.style.transform = "";
    });

    parallaxItems.forEach((item) => {
      item.style.transform = "none";
    });
  };

  const update = () => {
    ticking = false;

    if (getDeviceType() !== "desktop") {
      resetMobileEffects();
      return;
    }

    const scroll = window.scrollY;

    if (heroContent) {
      const opacity = Math.max(0, 1 - scroll * 0.0015);
      heroContent.style.transform = `translateY(${scroll * 0.16}px) scale(${1 + scroll * 0.00035})`;
      heroContent.style.opacity = opacity.toString();
      heroContent.style.filter = `blur(${Math.min(scroll * 0.008, 10)}px)`;
    }

    phones.forEach((phone) => {
      const isLeft = phone.classList.contains("left");
      const rotate = isLeft ? -28 : 24;
      const speed = isLeft ? 0.06 : -0.06;
      phone.style.transform = `rotate(${rotate}deg) translateY(${scroll * speed}px)`;
    });

    parallaxItems.forEach((item) => {
      const speed = Number(item.dataset.speed) || 0.15;
      item.style.transform = `translateY(${scroll * speed}px)`;
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
