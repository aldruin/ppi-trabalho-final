document.addEventListener("DOMContentLoaded", async () => {
  const qtdPartidos = document.getElementById("qtdPartidos");
  const qtdCandidatos = document.getElementById("qtdCandidatos");

  try {
    const [resPartidos, resCandidatos] = await Promise.all([
      fetch("http://localhost:3000/api/party"),
      fetch("http://localhost:3000/api/candidate")
    ]);

    const partidosJson = await resPartidos.json();
    const candidatosJson = await resCandidatos.json();

    const partidos = partidosJson.partys;
    const candidatos = candidatosJson.candidates;

    qtdPartidos.textContent = `${partidos.length} cadastrados`;
    qtdCandidatos.textContent = `${candidatos.length} cadastrados`;

  } catch (error) {
    console.error("Erro ao carregar dados do dashboard:", error);
    qtdPartidos.textContent = "Erro ao carregar";
    qtdCandidatos.textContent = "Erro ao carregar";
  }
});
