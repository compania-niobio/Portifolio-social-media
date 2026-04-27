export function initLazyLoad() {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    if (!img.hasAttribute("loading")) {
      img.setAttribute("loading", "lazy");
    }

    if (!img.hasAttribute("decoding")) {
      img.setAttribute("decoding", "async");
    }
  });
}