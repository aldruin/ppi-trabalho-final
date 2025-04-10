document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("tbody");
  const thead = document.querySelector("thead");
  const pagination = document.querySelector("#pagination");

  const itensPorPagina = 10;
  let paginaAtual = 1;
  let listaCandidatos = [];

  const titulosColunas = {
    id: "ID",
    name: "Nome",
    number: "Número",
    cpf: "CPF",
    titulo_eleitor: "Título de Eleitor",
    endereco: "Endereço",
    bairro: "Bairro",
    cidade: "Cidade",
    uf: "UF",
    cep: "CEP",
    renda_mensal: "Renda Mensal"
  };

  async function carregarCandidatos() {
    try {
      const resposta = await fetch("http://localhost:3000/api/candidate");
      if (!resposta.ok) throw new Error("Erro ao buscar candidatos.");

      const dados = await resposta.json();
      if (dados.success && Array.isArray(dados.candidates)) {
        listaCandidatos = dados.candidates;
        atualizarTabela();
        atualizarPaginacao();
      } else {
        tbody.innerHTML = `<tr><td colspan="100%">Nenhum candidato encontrado.</td></tr>`;
      }
    } catch (erro) {
      console.error("Erro ao carregar candidatos:", erro);
      tbody.innerHTML = `<tr><td colspan="100%">Erro ao carregar candidatos.</td></tr>`;
    }
  }

  function atualizarTabela() {
    thead.innerHTML = "";
    tbody.innerHTML = "";

    if (!listaCandidatos.length) return;

    const chaves = Object.keys(listaCandidatos[0]);

    const cabecalho = document.createElement("tr");
    chaves.forEach((chave) => {
      const th = document.createElement("th");
      th.textContent = titulosColunas[chave] || chave;
      cabecalho.appendChild(th);
    });

    const thAcoes = document.createElement("th");
    thAcoes.textContent = "Ações";
    cabecalho.appendChild(thAcoes);

    thead.appendChild(cabecalho);

    const inicio = (paginaAtual - 1) * itensPorPagina;
    const candidatosPagina = listaCandidatos.slice(inicio, inicio + itensPorPagina);

    candidatosPagina.forEach((candidato) => {
      const linha = document.createElement("tr");

      chaves.forEach((chave) => {
        const td = document.createElement("td");
        td.textContent = candidato[chave];
        linha.appendChild(td);
      });

      const tdAcoes = document.createElement("td");
      tdAcoes.innerHTML = `
        <button class="btn-icon"><i class="bi bi-eye"></i></button>
        <button class="btn-icon"><i class="bi bi-pencil"></i></button>
        <button class="btn-icon"><i class="bi bi-trash"></i></button>
      `;
      linha.appendChild(tdAcoes);

      tbody.appendChild(linha);
    });
  }

  function atualizarPaginacao() {
    if (!pagination) return;

    pagination.innerHTML = "";
    const totalPaginas = Math.ceil(listaCandidatos.length / itensPorPagina);

    for (let i = 1; i <= totalPaginas; i++) {
      const botao = document.createElement("button");
      botao.textContent = i;
      botao.classList.add("page-btn");
      if (i === paginaAtual) botao.classList.add("active");

      botao.addEventListener("click", () => {
        paginaAtual = i;
        atualizarTabela();
        atualizarPaginacao();
      });

      pagination.appendChild(botao);
    }
  }

  carregarCandidatos();
});