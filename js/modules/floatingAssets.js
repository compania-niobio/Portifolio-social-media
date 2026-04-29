const desktopZones = [
  { x: [3, 16], y: [58, 78] },
  { x: [78, 94], y: [12, 28] },
  { x: [64, 86], y: [80, 92] },
  { x: [7, 22], y: [14, 30] },
  { x: [86, 98], y: [52, 72] },
];

const mobileZones = [
  { x: [-4, 8], y: [63, 76] },
  { x: [88, 104], y: [15, 28] },
  { x: [70, 88], y: [86, 94] },
  { x: [2, 12], y: [16, 28] },
  { x: [94, 108], y: [56, 70] },
];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function chooseZones() {
  return window.innerWidth <= 650 ? mobileZones : desktopZones;
}

function applyFloatingPositions() {
  document.querySelectorAll("[data-floating-area]").forEach((area) => {
    const items = area.querySelectorAll("[data-float]");
    if (!items.length) return;

    const zones = chooseZones();

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

export function initFloatingAssets() {
  applyFloatingPositions();

  let resizeTimer;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(applyFloatingPositions, 180);
  }, { passive: true });
}
