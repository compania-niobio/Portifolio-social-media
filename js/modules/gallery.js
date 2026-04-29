export function initGalleries() {
  document.querySelectorAll(".project-gallery, .logo-gallery").forEach((gallery) => {
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let autoplayTimer = null;
    let autoplayPaused = false;

    const slides = Array.from(gallery.querySelectorAll("figure"));
    const card = gallery.closest(".gallery-card");

    const getSlideWidth = () => gallery.querySelector("figure")?.offsetWidth || gallery.clientWidth;

    const goNext = () => {
      const slideWidth = getSlideWidth();
      const maxScroll = gallery.scrollWidth - gallery.clientWidth;
      const isLast = gallery.scrollLeft >= maxScroll - 10;

      gallery.scrollTo({
        left: isLast ? 0 : gallery.scrollLeft + slideWidth,
        behavior: "smooth",
      });
    };

    const goPrev = () => {
      const slideWidth = getSlideWidth();
      const isFirst = gallery.scrollLeft <= 10;

      gallery.scrollTo({
        left: isFirst ? gallery.scrollWidth : gallery.scrollLeft - slideWidth,
        behavior: "smooth",
      });
    };

    const pauseAutoplay = () => {
      autoplayPaused = true;
    };

    const resumeAutoplay = () => {
      window.setTimeout(() => {
        autoplayPaused = false;
      }, 1200);
    };

    const startAutoplay = () => {
      if (slides.length <= 1 || autoplayTimer) return;

      autoplayTimer = window.setInterval(() => {
        if (!autoplayPaused && !document.hidden) goNext();
      }, 4200);
    };

    gallery.addEventListener("mousedown", (event) => {
      isDown = true;
      pauseAutoplay();
      gallery.classList.add("is-dragging");
      startX = event.pageX - gallery.offsetLeft;
      scrollLeft = gallery.scrollLeft;
    });

    gallery.addEventListener("mouseleave", () => {
      isDown = false;
      gallery.classList.remove("is-dragging");
      resumeAutoplay();
    });

    gallery.addEventListener("mouseup", () => {
      isDown = false;
      gallery.classList.remove("is-dragging");
      resumeAutoplay();
    });

    gallery.addEventListener("mousemove", (event) => {
      if (!isDown) return;
      event.preventDefault();
      const x = event.pageX - gallery.offsetLeft;
      const walk = (x - startX) * 1.4;
      gallery.scrollLeft = scrollLeft - walk;
    });

    gallery.addEventListener("touchstart", pauseAutoplay, { passive: true });
    gallery.addEventListener("touchend", resumeAutoplay, { passive: true });

    card?.addEventListener("mouseenter", pauseAutoplay);
    card?.addEventListener("mouseleave", resumeAutoplay);

    const prev = card?.querySelector(".gallery-prev");
    const next = card?.querySelector(".gallery-next");

    prev?.addEventListener("click", () => {
      pauseAutoplay();
      goPrev();
      resumeAutoplay();
    });

    next?.addEventListener("click", () => {
      pauseAutoplay();
      goNext();
      resumeAutoplay();
    });

    startAutoplay();
  });
}
