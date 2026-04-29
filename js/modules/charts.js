const results = {
  semGestao: 3876,
  comGestao: 13086,
};

function formatNumber(number) {
  return Number(number).toLocaleString("pt-BR");
}

function animateNumber(id, target) {
  const element = document.getElementById(id);
  if (!element) return;

  const duration = 1400;
  const startTime = performance.now();

  const tick = (currentTime) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);

    element.textContent = formatNumber(value);

    if (progress < 1) {
      window.requestAnimationFrame(tick);
    } else {
      element.textContent = formatNumber(target);
    }
  };

  window.requestAnimationFrame(tick);
}

function createLineChart() {
  const canvas = document.getElementById("graficoLinha");
  if (!canvas || typeof Chart === "undefined") return;

  new Chart(canvas, {
    type: "line",
    data: {
      labels: ["Sem gestão", "Início", "Com gestão"],
      datasets: [{
        data: [results.semGestao, 7600, results.comGestao],
        borderColor: "#d6b56d",
        backgroundColor: "rgba(214, 181, 109, 0.12)",
        pointBackgroundColor: "#d6b56d",
        pointBorderWidth: 0,
        pointRadius: 4,
        tension: 0.42,
        fill: true,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { color: "#8a8178" } },
        y: {
          beginAtZero: true,
          grid: { color: "rgba(0, 0, 0, 0.06)" },
          ticks: { color: "#8a8178", callback: (value) => formatNumber(value) },
        },
      },
    },
  });
}

function fillStaticResults() {
  const growth = Math.round(((results.comGestao - results.semGestao) / results.semGestao) * 100);
  const crescimento = document.getElementById("crescimento");
  if (crescimento) crescimento.textContent = `+${growth}%`;
}

export function initCharts() {
  const section = document.querySelector(".resultados");
  if (!section) return;

  let started = false;

  const startCharts = () => {
    if (started) return;
    started = true;

    createLineChart();
    animateNumber("valor1", results.semGestao);
    animateNumber("valor2", results.comGestao);
    fillStaticResults();
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCharts();
          observer.disconnect();
        }
      });
    }, { threshold: 0.25 });

    observer.observe(section);
  } else {
    startCharts();
  }
}
