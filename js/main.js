import { initDevice } from "./modules/device.js";
import { initTheme } from "./modules/theme.js";
import { initPageTransition } from "./modules/pageTransition.js";
import { initHeader } from "./modules/header.js";
import { initParallax } from "./modules/parallax.js";
import { initCharts } from "./modules/charts.js";
import { initLazyLoad } from "./modules/lazyLoad.js";

document.addEventListener("DOMContentLoaded", () => {
  initDevice();
  initTheme();
  initPageTransition();
  initHeader();
  initParallax();
  initCharts();
  initLazyLoad();
});