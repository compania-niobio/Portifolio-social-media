function formatar(num) {
  return num.toLocaleString("pt-BR");
}

function animarNumero(id, valor) {
  const el = document.getElementById(id);
  if (!el) return;

  let atual = 0;
  const incremento = valor / 80;

  const timer = setInterval(() => {
    atual += incremento;

    if (atual >= valor) {
      el.innerText = formatar(valor);
      clearInterval(timer);
    } else {
      el.innerText = formatar(Math.floor(atual));
    }
  }, 20);
}

function criarGraficoRosca(id, valor) {
  const canvas = document.getElementById(id);
  if (!canvas || typeof Chart === "undefined") return;

  new Chart(canvas, {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: [valor],
          backgroundColor: ["#d6b56d"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      cutout: "80%",
      rotation: -90,
      circumference: 180,
      plugins: {
        legend: { display: false },
      },
    },
  });
}

function criarGraficoLinha() {
  const canvas = document.getElementById("graficoLinha");
  if (!canvas || typeof Chart === "undefined") return;

  new Chart(canvas, {
    type: "line",
    data: {
      labels: ["Dez", "Jan", "Fev"],
      datasets: [
        {
          data: [3876, 8000, 13086],
          borderColor: "#d6b56d",
          backgroundColor: "rgba(214,181,109,.1)",
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: { display: false },
        y: { display: false },
      },
    },
  });
}

export function initCharts() {
  const section = document.querySelector(".resultados");
  if (!section) return;

  let iniciado = false;

  function iniciar() {
    if (iniciado) return;

    const pos = section.getBoundingClientRect().top;

    if (pos < window.innerHeight - 100) {
      criarGraficoRosca("graficoSemGestao", 3876);
      criarGraficoRosca("graficoComGestao", 13086);
      criarGraficoLinha();

      animarNumero("valor1", 3876);
      animarNumero("valor2", 13086);

      const crescimento = document.getElementById("crescimento");
      if (crescimento) {
        crescimento.innerText = "+238% de crescimento";
      }

      iniciado = true;
      window.removeEventListener("scroll", iniciar);
    }
  }

  iniciar();
  window.addEventListener("scroll", iniciar, { passive: true });
}