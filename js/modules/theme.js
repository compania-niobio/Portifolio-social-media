const paths = {
  dayLogo: {
    src: "assets/imagens/logo_1200x1200.png",
    srcset: `
      assets/imagens/logo_300x300.png 300w,
      assets/imagens/logo_600x600.png 600w,
      assets/imagens/logo_1200x1200.png 1200w
    `,
  },
  nightLogo: {
    src: "assets/imagens/logo_white_1200x1200.png",
    srcset: `
      assets/imagens/logo_white_300x300.png 300w,
      assets/imagens/logo_white_600x600.png 600w,
      assets/imagens/logo_white_1200x1200.png 1200w
    `,
  },
  dayPerson: {
    src: "assets/imagens/isadora_black_1200x1200.png",
    srcset: `
      assets/imagens/isadora_black_300.png 300w,
      assets/imagens/isadora_black_600.png 600w,
      assets/imagens/isadora_black_1200.png 1200w
    `,
  },
  nightPerson: {
    src: "assets/imagens/isadora_1200.png",
    srcset: `
      assets/imagens/isadora_300.png 300w,
      assets/imagens/isadora_600.png 600w,
      assets/imagens/isadora_1200.png 1200w
    `,
  },
};

function setImage(image, imageData) {
  if (!image || !imageData) return;

  image.style.opacity = "0";

  window.setTimeout(() => {
    image.src = imageData.src;
    image.srcset = imageData.srcset.trim();
    image.style.opacity = "1";
  }, 120);
}

export function initTheme() {
  const applyTheme = () => {
    const hour = new Date().getHours();
    const isDay = hour >= 6 && hour < 18;
    const root = document.documentElement;
    const body = document.body;

    root.classList.toggle("tema-dia", isDay);
    root.classList.toggle("tema-noite", !isDay);
    body.classList.toggle("tema-dia", isDay);
    body.classList.toggle("tema-noite", !isDay);

    document.querySelectorAll("#logo, .js-logo-theme").forEach((logo) => {
      setImage(logo, isDay ? paths.dayLogo : paths.nightLogo);
    });

    document.querySelectorAll("#pessoa, .js-person-theme").forEach((person) => {
      setImage(person, isDay ? paths.dayPerson : paths.nightPerson);
    });
  };

  applyTheme();
  window.setInterval(applyTheme, 60_000);
}
