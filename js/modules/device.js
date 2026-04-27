export function getDeviceType() {
  const width = window.innerWidth;
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  if (width <= 768) return "mobile";
  if (width <= 1024 && isTouch) return "tablet";
  return "desktop";
}

export function initDevice() {
  function apply() {
    const device = getDeviceType();

    document.body.classList.remove("mobile", "tablet", "desktop");
    document.body.classList.add(device);

    document.documentElement.dataset.device = device;

    console.log("Dispositivo:", device);
  }

  apply();
  window.addEventListener("resize", apply);
}