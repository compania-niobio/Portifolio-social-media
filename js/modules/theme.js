const paths = {
  dayLogo: {
    src: "assets/imagens/logo_1200x1200.png",
    srcset: "assets/imagens/logo_300x300.png 300w, assets/imagens/logo_600x600.png 600w, assets/imagens/logo_1200x1200.png 1200w",
  },
  nightLogo: {
    src: "assets/imagens/logo_white_1200x1200.png",
    srcset: "assets/imagens/logo_white_300x300.png 300w, assets/imagens/logo_white_600x600.png 600w, assets/imagens/logo_white_1200x1200.png 1200w",
  },
  dayPerson: {
    src: "assets/imagens/isadora_black_1200.png",
    srcset: "assets/imagens/isadora_black_300.png 300w, assets/imagens/isadora_black_600.png 600w, assets/imagens/isadora_black_1200.png 1200w",
  },
  nightPerson: {
    src: "assets/imagens/isadora_1200.png",
    srcset: "assets/imagens/isadora_300.png 300w, assets/imagens/isadora_600.png 600w, assets/imagens/isadora_1200.png 1200w",
  },
};

function setImage(image, imageData) {
  if (!image || !imageData) return;

  const current = image.getAttribute("src") || "";
  if (current.endsWith(imageData.src)) return;

  image.style.transition = "opacity .25s ease";
  image.style.opacity = "0";

  window.setTimeout(() => {
    image.src = imageData.src;
    image.srcset = imageData.srcset;
    image.style.opacity = "1";
  }, 120);
}

export function getIsDay() {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 18;
}

export function applyThemeByHour() {
  const isDay = getIsDay();
  const root = document.documentElement;
  const body = document.body;

  root.classList.toggle("tema-dia", isDay);
  root.classList.toggle("tema-noite", !isDay);
  body.classList.toggle("tema-dia", isDay);
  body.classList.toggle("tema-noite", !isDay);

  root.dataset.theme = isDay ? "dia" : "noite";

  const metaTheme = document.querySelector("meta[name='theme-color']");
  if (metaTheme) metaTheme.setAttribute("content", isDay ? "#fbf6ef" : "#050505");

  document.querySelectorAll("#logo, .js-logo-theme, .logo-img").forEach((logo) => {
    setImage(logo, isDay ? paths.dayLogo : paths.nightLogo);
  });

  document.querySelectorAll("#pessoa, .js-person-theme").forEach((person) => {
    setImage(person, isDay ? paths.dayPerson : paths.nightPerson);
  });
}

export function initTheme() {
  applyThemeByHour();
  window.setInterval(applyThemeByHour, 60_000);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) applyThemeByHour();
  });
}
