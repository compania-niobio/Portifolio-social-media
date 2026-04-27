export function initLazyLoad() {
  const images = document.querySelectorAll("img");

  images.forEach((img, index) => {
    if (index > 0 && !img.hasAttribute("loading")) {
      img.setAttribute("loading", "lazy");
    }

    if (!img.hasAttribute("decoding")) {
      img.setAttribute("decoding", "async");
    }

    img.addEventListener("error", () => {
      img.classList.add("image-error");
      img.alt = img.alt || "Imagem indisponível";
      console.warn("Imagem não carregou:", img.currentSrc || img.src);
    }, { once: true });
  });
}
