const MODEL_RULES = [
  {
    brand: "apple",
    os: "ios",
    type: "mobile",
    minW: 390,
    maxW: 396,
    minH: 844,
    maxH: 856,
    minDpr: 2.8,
    maxDpr: 3.2,
    model: "iphone-15-ou-15-pro-provavel",
    label: "iPhone 15 / 15 Pro provável",
  },
  {
    brand: "apple",
    os: "ios",
    type: "mobile",
    minW: 427,
    maxW: 433,
    minH: 926,
    maxH: 936,
    minDpr: 2.8,
    maxDpr: 3.2,
    model: "iphone-15-plus-ou-pro-max-provavel",
    label: "iPhone 15 Plus / 15 Pro Max provável",
  },
  {
    uaIncludes: ["SM-S931"],
    brand: "samsung",
    os: "android",
    type: "mobile",
    model: "samsung-galaxy-s25",
    label: "Samsung Galaxy S25",
  },
  {
    uaIncludes: ["SM-S936"],
    brand: "samsung",
    os: "android",
    type: "mobile",
    model: "samsung-galaxy-s25-plus",
    label: "Samsung Galaxy S25+",
  },
  {
    uaIncludes: ["SM-S938"],
    brand: "samsung",
    os: "android",
    type: "mobile",
    model: "samsung-galaxy-s25-ultra",
    label: "Samsung Galaxy S25 Ultra",
  },
];

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getViewport() {
  const width = Math.round(window.innerWidth || document.documentElement.clientWidth || 0);
  const height = Math.round(window.innerHeight || document.documentElement.clientHeight || 0);

  return {
    width,
    height,
    shortSide: Math.min(width, height),
    longSide: Math.max(width, height),
    dpr: Number((window.devicePixelRatio || 1).toFixed(2)),
  };
}

function detectOS(userAgent, platform) {
  const ua = userAgent.toLowerCase();
  const pf = platform.toLowerCase();
  const touch = navigator.maxTouchPoints || 0;

  if (/iphone|ipod/.test(ua)) return "ios";
  if (/ipad/.test(ua)) return "ipados";
  if (pf === "macintel" && touch > 1) return "ipados";
  if (/android/.test(ua)) return "android";
  if (/windows/.test(ua)) return "windows";
  if (/mac os|macintosh|macintel/.test(ua) || pf.includes("mac")) return "macos";
  if (/linux/.test(ua)) return "linux";
  return "unknown";
}

function detectBrowser(userAgent) {
  const ua = userAgent.toLowerCase();

  if (ua.includes("edg/")) return "edge";
  if (ua.includes("opr/") || ua.includes("opera")) return "opera";
  if (ua.includes("firefox/")) return "firefox";
  if (ua.includes("samsungbrowser")) return "samsung-internet";
  if (ua.includes("crios") || ua.includes("chrome/")) return "chrome";
  if (ua.includes("safari/")) return "safari";
  return "unknown";
}

function detectBrand(userAgent, os) {
  const ua = userAgent.toLowerCase();

  if (os === "ios" || os === "ipados" || os === "macos") return "apple";
  if (ua.includes("samsung") || /sm-[a-z0-9]+/i.test(userAgent)) return "samsung";
  if (ua.includes("xiaomi") || ua.includes("redmi") || ua.includes("poco")) return "xiaomi";
  if (ua.includes("motorola") || ua.includes("moto")) return "motorola";
  if (ua.includes("pixel")) return "google";
  if (ua.includes("huawei")) return "huawei";
  return "unknown";
}

function getBaseType(viewport, os) {
  const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const width = viewport.shortSide;

  if (width <= 767) return "mobile";
  if (width <= 1024 || (touch && (os === "ipados" || os === "android"))) return "tablet";
  return "desktop";
}

function getViewportTier(viewport) {
  const w = viewport.shortSide;
  if (w <= 360) return "compact";
  if (w <= 430) return "phone";
  if (w <= 767) return "large-phone";
  if (w <= 1024) return "tablet";
  if (w <= 1366) return "laptop";
  return "desktop-wide";
}

function ruleMatches(rule, context) {
  const { ua, os, brand, type, viewport } = context;

  if (rule.uaIncludes?.length) {
    const hit = rule.uaIncludes.some((piece) => ua.includes(piece.toLowerCase()));
    if (!hit) return false;
  }
  if (rule.os && rule.os !== os) return false;
  if (rule.brand && rule.brand !== brand) return false;
  if (rule.type && rule.type !== type) return false;

  const { shortSide, longSide, dpr } = viewport;
  if (rule.minW && shortSide < rule.minW) return false;
  if (rule.maxW && shortSide > rule.maxW) return false;
  if (rule.minH && longSide < rule.minH) return false;
  if (rule.maxH && longSide > rule.maxH) return false;
  if (rule.minDpr && dpr < rule.minDpr) return false;
  if (rule.maxDpr && dpr > rule.maxDpr) return false;
  return true;
}

function detectModel(context) {
  const exactOrProbable = MODEL_RULES.find((rule) => ruleMatches(rule, context));
  if (exactOrProbable) {
    return {
      model: exactOrProbable.model,
      label: exactOrProbable.label,
      confidence: exactOrProbable.uaIncludes ? "alta" : "provavel",
    };
  }

  const { os, brand, type, ua } = context;
  if (brand === "samsung") {
    const samsungModel = ua.match(/sm-[a-z0-9]+/i)?.[0]?.toUpperCase();
    return {
      model: samsungModel ? `samsung-${normalize(samsungModel)}` : "samsung-galaxy-provavel",
      label: samsungModel ? `Samsung ${samsungModel}` : "Samsung Galaxy provável",
      confidence: samsungModel ? "media" : "baixa",
    };
  }

  if (os === "ios" && type === "mobile") return { model: "iphone-generico", label: "iPhone", confidence: "media" };
  if (os === "ipados") return { model: "ipad", label: "iPad", confidence: "media" };
  if (os === "android" && type === "mobile") return { model: "android-phone", label: "Celular Android", confidence: "baixa" };
  if (type === "desktop") return { model: "desktop", label: "Desktop / Notebook", confidence: "alta" };
  return { model: "dispositivo-desconhecido", label: "Dispositivo desconhecido", confidence: "baixa" };
}

function cleanDeviceClasses(element) {
  [...element.classList].forEach((className) => {
    if (
      className.startsWith("device-") ||
      className.startsWith("os-") ||
      className.startsWith("brand-") ||
      className.startsWith("model-") ||
      className.startsWith("viewport-") ||
      className.startsWith("orientation-") ||
      className.startsWith("input-")
    ) {
      element.classList.remove(className);
    }
  });
}

function applyDeviceInfo() {
  const ua = navigator.userAgent || "";
  const platform = navigator.platform || "";
  const viewport = getViewport();
  const os = detectOS(ua, platform);
  const browser = detectBrowser(ua);
  const brand = detectBrand(ua, os);
  const type = getBaseType(viewport, os);
  const tier = getViewportTier(viewport);
  const orientation = viewport.width >= viewport.height ? "landscape" : "portrait";
  const input = ("ontouchstart" in window || navigator.maxTouchPoints > 0) ? "touch" : "mouse";
  const modelInfo = detectModel({ ua: ua.toLowerCase(), os, brand, type, viewport });

  const root = document.documentElement;
  const body = document.body;
  const classes = [
    `device-${type}`,
    `os-${os}`,
    `brand-${brand}`,
    `model-${modelInfo.model}`,
    `viewport-${tier}`,
    `orientation-${orientation}`,
    `input-${input}`,
  ];

  [root, body].forEach((element) => {
    cleanDeviceClasses(element);
    element.classList.add(...classes);
  });

  root.dataset.deviceType = type;
  root.dataset.deviceOs = os;
  root.dataset.deviceBrand = brand;
  root.dataset.deviceModel = modelInfo.model;
  root.dataset.deviceName = modelInfo.label;
  root.dataset.deviceConfidence = modelInfo.confidence;
  root.dataset.deviceBrowser = browser;
  root.dataset.viewportTier = tier;
  root.dataset.orientation = orientation;
  root.dataset.input = input;
  root.style.setProperty("--vw-real", `${viewport.width}px`);
  root.style.setProperty("--vh-real", `${viewport.height}px`);
  root.style.setProperty("--dpr", viewport.dpr);

  window.__deviceInfo = { type, os, brand, browser, model: modelInfo.model, name: modelInfo.label, confidence: modelInfo.confidence, viewport, orientation, input };
  window.dispatchEvent(new CustomEvent("device:change", { detail: window.__deviceInfo }));
}

export function getDeviceInfo() {
  return window.__deviceInfo || null;
}

export function getDeviceType() {
  return window.__deviceInfo?.type || getBaseType(getViewport(), detectOS(navigator.userAgent || "", navigator.platform || ""));
}

export function initDevice() {
  applyDeviceInfo();
  let resizeTimer = null;

  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(applyDeviceInfo, 140);
  }, { passive: true });

  window.addEventListener("orientationchange", () => {
    window.setTimeout(applyDeviceInfo, 220);
  }, { passive: true });
}
