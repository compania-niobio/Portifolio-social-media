import { getDeviceType } from "./device.js";

export function initParallax() {
  const phones = document.querySelectorAll(".phone");
  const parallaxItems = document.querySelectorAll(".parallax");
  const heroContent = document.querySelector(".hero-content");

  function onScroll() {
    const device = getDeviceType();

    if (device !== "desktop") {
      if (heroContent) {
        heroContent.style.transform = "none";
        heroContent.style.opacity = "1";
        heroContent.style.filter = "none";
      }

      phones.forEach((phone) => {
        phone.style.transform = "none";
      });

      return;
    }

    const scroll = window.scrollY;

    if (heroContent) {
      heroContent.style.transform = `
        translateY(${scroll * 0.2}px)
        scale(${1 + scroll * 0.0005})
      `;
      heroContent.style.opacity = 1 - scroll * 0.0015;
      heroContent.style.filter = `blur(${scroll * 0.01}px)`;
    }

    phones.forEach((phone) => {
      const isLeft = phone.classList.contains("left");
      const rotate = isLeft ? -28 : 24;
      const speed = isLeft ? 0.08 : -0.08;

      phone.style.transform = `
        rotate(${rotate}deg)
        translateY(${scroll * speed}px)
      `;
    });

    parallaxItems.forEach((item) => {
      const speed = Number(item.dataset.speed) || 0.2;
      item.style.transform = `translateY(${scroll * speed}px)`;
    });
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}