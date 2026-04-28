const zones = [
  { x: [3, 18], y: [58, 78] },
  { x: [78, 94], y: [12, 28] },
  { x: [65, 88], y: [80, 93] },
  { x: [7, 22], y: [14, 30] },
  { x: [86, 98], y: [52, 72] },
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

      item.style.setProperty("--x", `${randomBetween(zone.x[0], zone.x[1]).toFixed(1)}%`);
      item.style.setProperty("--y", `${randomBetween(zone.y[0], zone.y[1]).toFixed(1)}%`);
      item.style.setProperty("--rotate", `${randomBetween(-26, 26).toFixed(1)}deg`);
      item.style.setProperty("--scale", randomBetween(.70, .90).toFixed(2));
      item.style.setProperty("--float-duration", `${randomBetween(6.4, 8.8).toFixed(2)}s`);
      item.style.setProperty("--float-delay", `${randomBetween(-3.2, -.2).toFixed(2)}s`);
    });
  });
}

document.addEventListener("DOMContentLoaded", initFloatingAssets);
