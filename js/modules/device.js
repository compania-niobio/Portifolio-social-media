export function getDeviceType() {
  const width = window.innerWidth;
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  if (width <= 767) return "mobile";
  if (width <= 1024 || isTouch) return "tablet";
  return "desktop";
}

export function initDevice() {
  const applyDeviceClass = () => {
    const device = getDeviceType();

    document.body.classList.remove("mobile", "tablet", "desktop");
    document.body.classList.add(device);
    document.documentElement.dataset.device = device;
  };

  applyDeviceClass();
  window.addEventListener("resize", applyDeviceClass, { passive: true });
}
