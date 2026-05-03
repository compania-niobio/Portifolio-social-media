const AUTOPLAY_DELAY = 5200;
const RESUME_DELAY = 1400;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getSlideWidth(gallery) {
  return gallery.querySelector("figure")?.offsetWidth || gallery.clientWidth || 1;
}

function goToNext(gallery) {
  const slideWidth = getSlideWidth(gallery);
  const maxScroll = gallery.scrollWidth - gallery.clientWidth;
  const isLast = gallery.scrollLeft >= maxScroll - 10;

  gallery.scrollTo({
    left: isLast ? 0 : gallery.scrollLeft + slideWidth,
    behavior: "smooth",
  });
}

function goToPrev(gallery) {
  const slideWidth = getSlideWidth(gallery);
  const isFirst = gallery.scrollLeft <= 10;

  gallery.scrollTo({
    left: isFirst ? gallery.scrollWidth : gallery.scrollLeft - slideWidth,
    behavior: "smooth",
  });
}

export function initGalleries() {
  if (prefersReducedMotion()) return;

  document.querySelectorAll(".project-gallery, .logo-gallery").forEach((gallery) => {
    const slides = Array.from(gallery.querySelectorAll("figure"));
    if (slides.length <= 1) return;

    const card = gallery.closest(".gallery-card");
    const prev = card?.querySelector(".gallery-prev");
    const next = card?.querySelector(".gallery-next");

    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;
    let autoplayTimer = null;
    let resumeTimer = null;
    let paused = false;

    const pauseAutoplay = () => {
      paused = true;
      window.clearTimeout(resumeTimer);
    };

    const resumeAutoplay = () => {
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => {
        paused = false;
      }, RESUME_DELAY);
    };

    const startAutoplay = () => {
      if (autoplayTimer) return;

      autoplayTimer = window.setInterval(() => {
        if (paused || document.hidden) return;
        goToNext(gallery);
      }, AUTOPLAY_DELAY);
    };

    const stopAutoplay = () => {
      window.clearInterval(autoplayTimer);
      autoplayTimer = null;
    };

    gallery.addEventListener("mousedown", (event) => {
      isDragging = true;
      pauseAutoplay();
      gallery.classList.add("is-dragging");
      startX = event.pageX - gallery.offsetLeft;
      scrollLeft = gallery.scrollLeft;
    });

    gallery.addEventListener("mousemove", (event) => {
      if (!isDragging) return;
      event.preventDefault();

      const x = event.pageX - gallery.offsetLeft;
      const walk = (x - startX) * 1.35;
      gallery.scrollLeft = scrollLeft - walk;
    });

    const finishDrag = () => {
      if (!isDragging) return;
      isDragging = false;
      gallery.classList.remove("is-dragging");
      resumeAutoplay();
    };

    gallery.addEventListener("mouseup", finishDrag);
    gallery.addEventListener("mouseleave", finishDrag);

    gallery.addEventListener("touchstart", pauseAutoplay, { passive: true });
    gallery.addEventListener("touchend", resumeAutoplay, { passive: true });
    gallery.addEventListener("focusin", pauseAutoplay);
    gallery.addEventListener("focusout", resumeAutoplay);

    card?.addEventListener("mouseenter", pauseAutoplay);
    card?.addEventListener("mouseleave", resumeAutoplay);

    prev?.addEventListener("click", () => {
      pauseAutoplay();
      goToPrev(gallery);
      resumeAutoplay();
    });

    next?.addEventListener("click", () => {
      pauseAutoplay();
      goToNext(gallery);
      resumeAutoplay();
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    });

    startAutoplay();
  });
}
