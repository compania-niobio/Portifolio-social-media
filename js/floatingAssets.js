const zonesByArea = {
  hero: [
    { x: [6, 18], y: [18, 34] },
    { x: [80, 94], y: [18, 34] },
    { x: [6, 20], y: [66, 84] },
    { x: [80, 94], y: [66, 84] },
    { x: [38, 62], y: [84, 93] },
  ],
  perfil: [
    { x: [6, 18], y: [16, 30] },
    { x: [82, 94], y: [18, 34] },
    { x: [6, 20], y: [70, 86] },
    { x: [80, 94], y: [68, 84] },
  ],
};

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function placeFloatingItems(area) {
  const areaName = area.dataset.floatingArea || (area.classList.contains('perfil-card-modelo') ? 'perfil' : 'hero');
  const items = Array.from(area.querySelectorAll('[data-float]'));
  const zones = shuffle(zonesByArea[areaName] || zonesByArea.hero);

  items.forEach((item, index) => {
    const zone = zones[index % zones.length];
    const x = randomBetween(zone.x[0], zone.x[1]);
    const y = randomBetween(zone.y[0], zone.y[1]);
    const rotate = randomBetween(-22, 22);
    const scale = randomBetween(0.68, 0.92);
    const duration = randomBetween(5.8, 9.4);
    const delay = randomBetween(-4, 0);

    item.style.setProperty('--x', `${x}%`);
    item.style.setProperty('--y', `${y}%`);
    item.style.setProperty('--rotate', `${rotate}deg`);
    item.style.setProperty('--scale', scale.toFixed(2));
    item.style.setProperty('--float-duration', `${duration.toFixed(2)}s`);
    item.style.setProperty('--float-delay', `${delay.toFixed(2)}s`);
  });
}

function initFloatingAssets() {
  document.querySelectorAll('[data-floating-area]').forEach(placeFloatingItems);
}

window.addEventListener('DOMContentLoaded', initFloatingAssets);
window.addEventListener('pageshow', initFloatingAssets);
