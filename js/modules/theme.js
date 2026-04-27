function aplicarTemaPorHorario() {
  const hora = new Date().getHours();

  // Dia: 06h até 17h59
  const isDia = hora >= 6 && hora < 18;

  const root = document.documentElement;
  const logo = document.querySelector("#logo");
  const pessoa = document.querySelector("#pessoa");

  if (isDia) {
    root.classList.add("tema-dia");
    root.classList.remove("tema-noite");

    logo.src = "assets/imagens/logo_1200x1200.png";
    logo.srcset = `
      assets/imagens/logo_300x300.png 300w,
      assets/imagens/logo_600x600.png 600w,
      assets/logo_1200x1200.png 1200w
    `;

    pessoa.src = "assets/imagens/person_black_1200x1200.png";
    pessoa.srcset = `
      assets/imagens/person_black_300x300.png 300w,
      assets/imagens/person_black_600x600.png 600w,
      assets/imagens/person_black_1200x1200.png 1200w
    `;
  } else {
    root.classList.add("tema-noite");
    root.classList.remove("tema-dia");

    logo.src = "assets/imagens/logo_white_1200x1200.png";
    logo.srcset = `
      assets/imagens/logo_white_300x300.png 300w,
      assets/imagens/logo_white_600x600.png 600w,
      assets/images/logo_white_1200x1200.png 1200w
    `;

    pessoa.src = "assets/imagens/person_cut_1200x1200.png";
    pessoa.srcset = `
      assets/imagens/person_cut_300x300.png 300w,
      assets/imagens/person_cut_600x600.png 600w,
      assets/imagens/person_cut_1200x1200.png 1200w
    `;
  }
}

aplicarTemaPorHorario();

// Atualiza a cada 1 minuto
setInterval(aplicarTemaPorHorario, 60000);