// js/floatingAssets.js
// Posições aleatórias seguras para as imagens flutuantes.
// Mantém o centro protegido para não cobrir texto e botão.

const zones = [
  { x: [3, 18], y: [58, 78] },   // lateral esquerda baixa
  { x: [78, 94], y: [12, 28] },  // lateral direita alta
  { x: [65, 88], y: [80, 93] },  // base direita
  { x: [7, 22], y: [14, 30] },   // lateral esquerda alta
  { x: [86, 98], y: [52, 72] },  // lateral direita média
];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function initFloatingAssets() {
  document.querySelectorAll("[data-floating-area]").forEach((area) => {
    const items = area.querySelectorAll("[data-float]");
    if (!items.length) return;

    items.forEach((item, index) => {
      const zone = zones[index % zones.length];
      const x = randomBetween(zone.x[0], zone.x[1]);
      const y = randomBetween(zone.y[0], zone.y[1]);
      const rotate = randomBetween(-26, 26);
      const scale = randomBetween(0.70, 0.90);
      const duration = randomBetween(6.4, 8.8);
      const delay = randomBetween(-3.2, -0.2);

      item.style.setProperty("--x", `${x}%`);
      item.style.setProperty("--y", `${y}%`);
      item.style.setProperty("--rotate", `${rotate}deg`);
      item.style.setProperty("--scale", scale.toFixed(2));
      item.style.setProperty("--float-duration", `${duration.toFixed(2)}s`);
      item.style.setProperty("--float-delay", `${delay.toFixed(2)}s`);
    });
  });
}

document.addEventListener("DOMContentLoaded", initFloatingAssets);
