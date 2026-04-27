// Tema dia/noite
const hour = new Date().getHours();

if (hour >= 18 || hour < 6) {
  document.body.classList.add("night");
}

// Scroll cinematográfico
const heroContent = document.querySelector(".hero-content");

// só aplica efeito no desktop
if (heroContent && window.innerWidth > 768) {

  window.addEventListener("scroll", () => {
    const scroll = window.scrollY;

    // MOVIMENTO
    heroContent.style.transform = `
      translateY(${scroll * 0.2}px)
      scale(${1 + scroll * 0.0005})
    `;

    // OPACIDADE
    heroContent.style.opacity = 1 - scroll * 0.0015;

    // BLUR
    heroContent.style.filter = `blur(${scroll * 0.01}px)`;
  });

}
// Parallax premium
window.addEventListener("scroll", () => {
  const scroll = window.scrollY;

  document.querySelectorAll(".phone.left").forEach(el => {
    el.style.transform = `rotate(-28deg) translateY(${scroll * 0.08}px)`;
  });

  document.querySelectorAll(".phone.right").forEach(el => {
    el.style.transform = `rotate(24deg) translateY(${scroll * -0.08}px)`;
  });
});
function animarContadores() {
  document.querySelectorAll(".contador").forEach((contador) => {
    const alvo = Number(contador.dataset.numero);
    let atual = 0;
    const incremento = alvo / 80;

    const timer = setInterval(() => {
      atual += incremento;

      if (atual >= alvo) {
        contador.textContent = alvo.toLocaleString("pt-BR");
        clearInterval(timer);
      } else {
        contador.textContent = Math.floor(atual).toLocaleString("pt-BR");
      }
    }, 22);
  });
}

function criarGrafico(id, valores) {
  const canvas = document.getElementById(id);
  if (!canvas) return;

  new Chart(canvas, {
    type: "doughnut",
    data: {
      labels: ["Alcance", "Engajamento"],
      datasets: [{
        data: valores,
        backgroundColor: ["#d6b56d", "#8b5cf6"],
        borderColor: "transparent",
        hoverOffset: 14
      }]
    },
    options: {
      responsive: true,
      cutout: "76%",
      animation: {
        animateRotate: true,
        duration: 1800,
        easing: "easeOutQuart"
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#111",
          titleColor: "#d6b56d",
          bodyColor: "#fff",
          padding: 14,
          cornerRadius: 14
        }
      }
    }
  });
}

let graficosCriados = false;

function iniciarGraficosPremium() {
  const area = document.querySelector(".resultados");
  if (!area || graficosCriados) return;

  const posicao = area.getBoundingClientRect().top;

  if (posicao < window.innerHeight - 120) {
    criarGrafico("graficoSemGestao", [3876, 900]);
    criarGrafico("graficoComGestao", [13086, 4000]);
    animarContadores();
    graficosCriados = true;
  }
}

window.addEventListener("scroll", iniciarGraficosPremium);
window.addEventListener("load", iniciarGraficosPremium);
function criarGrafico(id, total, base = 1000) {
  const canvas = document.getElementById(id);
  if (!canvas) return;

  const crescimento = total - base;

  new Chart(canvas, {
    type: "doughnut",
    data: {
      labels: ["Base", "Crescimento"],
      datasets: [{
        data: [base, crescimento],
        backgroundColor: ["#2c2c2c", "#d6b56d"],
        borderWidth: 0
      }]
    },
    options: {
      cutout: "78%",
      animation: {
        duration: 2000,
        easing: "easeOutExpo"
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              return ctx.label + ": " + ctx.raw.toLocaleString("pt-BR");
            }
          }
        }
      }
    }
  });
}
criarGrafico("graficoSemGestao", 3876, 2000);
criarGrafico("graficoComGestao", 13086, 2000);
function formatar(num) {
  return num.toLocaleString("pt-BR");
}

function animarNumero(id, valor) {
  let el = document.getElementById(id);
  let atual = 0;
  let incremento = valor / 80;

  let timer = setInterval(() => {
    atual += incremento;

    if (atual >= valor) {
      el.innerText = formatar(valor);
      clearInterval(timer);
    } else {
      el.innerText = formatar(Math.floor(atual));
    }
  }, 20);
}

// plugin texto centro
const centerText = {
  id: "centerText",
  beforeDraw(chart) {
    const { width } = chart;
    const { height } = chart;
    const ctx = chart.ctx;

    ctx.restore();
    ctx.font = "bold 20px Playfair Display";
    ctx.textAlign = "center";
    ctx.fillStyle = "#fff";
    ctx.fillText("", width / 2, height / 2);
    ctx.save();
  }
};

function criarGrafico(id, valor) {
  new Chart(document.getElementById(id), {
    type: "doughnut",
    data: {
      datasets: [{
        data: [valor],
        backgroundColor: ["#d6b56d"],
        borderWidth: 0
      }]
    },
    options: {
      cutout: "80%",
      rotation: -90,
      circumference: 180,
      animation: {
        duration: 2000,
        easing: "easeOutExpo"
      },
      plugins: {
        legend: { display: false }
      }
    },
    plugins: [centerText]
  });
}

// gráfico linha
function graficoLinha() {
  new Chart(document.getElementById("graficoLinha"), {
    type: "line",
    data: {
      labels: ["Dez", "Jan", "Fev"],
      datasets: [{
        data: [3876, 8000, 13086],
        borderColor: "#d6b56d",
        tension: 0.4,
        fill: true,
        backgroundColor: "rgba(214,181,109,.1)"
      }]
    },
    options: {
      plugins: { legend: { display: false }},
      scales: {
        x: { display: false },
        y: { display: false }
      }
    }
  });
}

// crescimento %
function calcularCrescimento() {
  let antes = 3876;
  let depois = 13086;
  let crescimento = ((depois - antes) / antes * 100).toFixed(0);

  document.getElementById("crescimento").innerText =
    "+" + crescimento + "% de crescimento";
}

// ativação no scroll
let iniciado = false;

function iniciarTudo() {
  if (iniciado) return;

  const section = document.querySelector(".resultados");
  if (!section) return;

  const pos = section.getBoundingClientRect().top;

  if (pos < window.innerHeight - 100) {

    criarGrafico("graficoSemGestao", 3876);
    criarGrafico("graficoComGestao", 13086);

    animarNumero("valor1", 3876);
    animarNumero("valor2", 13086);

    graficoLinha();
    calcularCrescimento();

    iniciado = true;
  }
}
window.addEventListener("scroll", iniciarTudo);
window.addEventListener("load", iniciarTudo);
const links = document.querySelectorAll("a[href]");

links.forEach(link => {
  link.addEventListener("click", e => {
    const url = link.getAttribute("href");

    if (url.includes(".html")) {
      e.preventDefault();

      const transition = document.querySelector(".page-transition");
      transition.classList.add("active");

      setTimeout(() => {
        window.location.href = url;
      }, 700);
    }
  });
});
window.addEventListener("scroll", () => {
  const scroll = window.scrollY;

  document.querySelectorAll(".parallax").forEach(el => {
    const speed = el.dataset.speed || 0.2;
    el.style.transform = `translateY(${scroll * speed}px)`;
  });
});
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");

  if (window.scrollY > 80) {
    header.style.top = "10px";
    header.style.transform = "translateX(-50%) scale(0.9)";
    header.style.opacity = "0.9";
  } else {
    header.style.top = "20px";
    header.style.transform = "translateX(-50%) scale(1)";
    header.style.opacity = "1";
  }
});
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("mousemove", (e) => {
    const rect = link.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    link.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });

  link.addEventListener("mouseleave", () => {
    link.style.transform = "translate(0,0)";
  });
});
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const url = link.href;

    document.body.style.opacity = "0";

    setTimeout(() => {
      window.location.href = url;
    }, 400);
  });
});
function navBlurDinamico() {
  const header = document.querySelector("header");
  if (!header) return;

  const sections = document.querySelectorAll("section, .hero, .contato, .perfil, .projetos, .erro");

  let currentTheme = "light";

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();

    if (rect.top <= 90 && rect.bottom >= 90) {
      if (
        section.classList.contains("hero") ||
        section.classList.contains("contato") ||
        document.body.classList.contains("night")
      ) {
        currentTheme = "dark";
      }

      if (
        section.classList.contains("resultados") ||
        section.classList.contains("horizontal-section")
      ) {
        currentTheme = "gold";
      }
    }
  });

  header.classList.remove("nav-light", "nav-dark", "nav-gold");
  header.classList.add(`nav-${currentTheme}`);
}

window.addEventListener("scroll", navBlurDinamico);
window.addEventListener("load", navBlurDinamico);
const appleImg = document.querySelector(".apple-img");

if (appleImg && window.innerWidth > 900) {
  window.addEventListener("scroll", () => {
    const scroll = window.scrollY;
    const moveY = scroll * -0.04;
    const scale = 1 + scroll * 0.00012;

    appleImg.style.transform = `
      translateY(${moveY}px)
      scale(${scale})
      rotateY(${scroll * 0.006}deg)
    `;
  });

}
const isMobile = window.innerWidth <= 900;

if (!isMobile) {
  // coloque aqui efeitos 3D, parallax forte e zoom
}

if (window.innerWidth <= 768 && heroContent) {
  heroContent.style.transform = "none";
  heroContent.style.opacity = "1";
  heroContent.style.filter = "none";
}
// Detecta tipo de dispositivo
function getDeviceType() {
  const width = window.innerWidth;

  const isTouch = 
    'ontouchstart' in window || 
    navigator.maxTouchPoints > 0;

  if (width <= 480) return 'mobile';
  if (width <= 1024 && isTouch) return 'tablet';
  return 'desktop';
}

// Aplica classe no <body>
function applyDeviceClass() {
  const device = getDeviceType();

  document.body.classList.remove('mobile', 'tablet', 'desktop');
  document.body.classList.add(device);

  console.log("Dispositivo:", device);
}

// Executa ao carregar
applyDeviceClass();

// Atualiza ao redimensionar
window.addEventListener('resize', applyDeviceClass);

const heroContent = document.querySelector(".hero-content, .heroContent, .content");

const isMobileOrTablet = window.innerWidth <= 1024;

if (heroContent && isMobileOrTablet) {
  heroContent.style.transform = "none";
  heroContent.style.opacity = "1";
  heroContent.style.filter = "none";
}