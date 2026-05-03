import { initDevice } from "./modules/device.js";
import { initTheme } from "./modules/theme.js";
import { initPageTransition } from "./modules/pageTransition.js";
import { initHeader } from "./modules/header.js";
import { initParallax } from "./modules/parallax.js";
import { initCharts } from "./modules/charts.js";
import { initLazyLoad } from "./modules/lazyLoad.js";
import { initButtonEffects } from "./modules/buttonEffects.js";
import { initFloatingAssets } from "./modules/floatingAssets.js";
import { initGalleries } from "./modules/gallery.js";

const safeInit = (name, callback) => {
  try {
    callback();
  } catch (error) {
    console.warn(`[${name}] não iniciou:`, error);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  safeInit("Device", initDevice);
  safeInit("Theme", initTheme);
  safeInit("PageTransition", initPageTransition);
  safeInit("Header", initHeader);
  safeInit("Parallax", initParallax);
  safeInit("Charts", initCharts);
  safeInit("LazyLoad", initLazyLoad);
  safeInit("ButtonEffects", initButtonEffects);
  safeInit("FloatingAssets", initFloatingAssets);
  safeInit("Galleries", initGalleries);       
});
