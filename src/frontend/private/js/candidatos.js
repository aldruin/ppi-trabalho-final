document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("#tbody-candidatos");
  const formCriar = document.querySelector("#form-criar-candidato");
  const formEditar = document.querySelector("#form-editar-candidato");
  const selectPartidoCriar = formCriar.querySelector("select[name='party_id']");
  const selectPartidoEditar = formEditar.querySelector("select[name='party_id']");
  const modalEditar = new bootstrap.Modal(document.getElementById("modalEditarCandidato"));
  const modalCriar = new bootstrap.Modal(document.getElementById("modalNovoCandidato"));

  let listaCandidatos = [];
  let listaPartidos = [];

  async function carregarPartidos() {
    try {
      const res = await fetch("http://localhost:3000/api/party");
      const data = await res.json();
      listaPartidos = data.partys || [];
      preencherSelectPartidos(selectPartidoCriar);
      preencherSelectPartidos(selectPartidoEditar);
    } catch (err) {
      console.error("Erro ao buscar partidos:", err);
    }
  }

  function preencherSelectPartidos(select) {
    select.innerHTML = '<option value="">Selecione o Partido</option>';
    listaPartidos.forEach(partido => {
      const option = document.createElement("option");
      option.value = partido.id;
      option.textContent = `${partido.number} - ${partido.initials} - ${partido.name}`;
      select.appendChild(option);
    });
  }

  async function carregarCandidatos() {
    try {
      const res = await fetch("http://localhost:3000/api/candidate");
      const data = await res.json();
      listaCandidatos = data.candidates || [];
      renderizarTabela();
    } catch (err) {
      console.error("Erro ao buscar candidatos:", err);
    }
  }

  let currentPage = 1;
const itemsPerPage = 10;

function renderizarTabela() {
  const tbody = document.querySelector("#tbody-candidatos");
  tbody.innerHTML = "";

  const totalPages = Math.ceil(listaCandidatos.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const candidatosPagina = listaCandidatos.slice(start, end);

  if (candidatosPagina.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8">Nenhum candidato encontrado.</td></tr>`;
    return;
  }

  candidatosPagina.forEach(candidato => {
    const tr = document.createElement("tr");
    const partidoNome = candidato.party
      ? `${candidato.party.number} - ${candidato.party.initials} - ${candidato.party.name}`
      : "N/A";

    tr.innerHTML = `
      <td>${candidato.name}</td>
      <td>${candidato.number}</td>
      <td>${partidoNome}</td>
      <td>${candidato.cpf}</td>
      <td>${candidato.titulo_eleitor}</td>
      <td>${candidato.cidade}</td>
      <td>${candidato.uf}</td>
      <td>
        <button class="btn-icon" onclick="editarCandidato(${candidato.id})"><i class="bi bi-pencil"></i></button>
        <button class="btn-icon" onclick="excluirCandidato(${candidato.id})"><i class="bi bi-trash"></i></button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  renderizarPaginacao(totalPages);
}

function renderizarPaginacao(totalPages) {
  let container = document.querySelector("#paginacao-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "paginacao-container";
    container.className = "mt-3 d-flex justify-content-center gap-2";
    document.querySelector("table").after(container);
  }

  container.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = `btn btn-sm ${i === currentPage ? 'btn-primary' : 'btn-outline-primary'}`;
    btn.addEventListener("click", () => {
      currentPage = i;
      renderizarTabela();
    });
    container.appendChild(btn);
  }
}

  formCriar.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(formCriar);

    const novoCandidato = Object.fromEntries(formData.entries());
    novoCandidato.number = parseInt(novoCandidato.number);
    novoCandidato.party_id = parseInt(novoCandidato.party_id);
    novoCandidato.renda_mensal = parseFloat(novoCandidato.renda_mensal);
    const partidoSelecionado = listaPartidos.find(p => p.id === novoCandidato.party_id);
    novoCandidato.party_number = partidoSelecionado ? partidoSelecionado.number : null;

    try {
      const res = await fetch("http://localhost:3000/api/candidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoCandidato)
      });

      if (res.ok) {
        formCriar.reset();
        modalCriar.hide();
        await carregarCandidatos();
      }
    } catch (err) {
      console.error("Erro ao criar candidato:", err);
    }
  });

  formEditar.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(formEditar);
    const candidatoEditado = Object.fromEntries(formData.entries());
  
    candidatoEditado.party_id = parseInt(candidatoEditado.party_id);
  
    const partidoSelecionado = listaPartidos.find(p => Number(p.id) === Number(candidatoEditado.party_id));
    candidatoEditado.party_number = partidoSelecionado ? partidoSelecionado.number : null;
  
    try {
      const res = await fetch(`http://localhost:3000/api/candidate/${candidatoEditado.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(candidatoEditado)
      });
  
      if (!res.ok) throw new Error("Erro ao atualizar candidato.");
  
      modalEditar.hide();
      formEditar.reset();
      await carregarCandidatos();
    } catch (err) {
      console.error("Erro ao atualizar candidato:", err);
    }
  });
  
  window.editarCandidato = function(id) {
    const candidato = listaCandidatos.find(c => c.id === id);
    if (!candidato) return;
  
    for (const key in candidato) {
      const input = formEditar.elements[key];
      if (input) {
        input.value = candidato[key];
      }
    }
  
    if (candidato.party && candidato.party.id) {
      selectPartidoEditar.value = candidato.party.id;
    } else {
      selectPartidoEditar.value = "";
    }
  
    modalEditar.show();
  };

  window.excluirCandidato = async (id) => {
    if (!confirm("Tem certeza que deseja excluir este candidato?")) return;

    try {
      const res = await fetch(`http://localhost:3000/api/candidate/${id}`, {
        method: "DELETE"
      });

      if (!res.ok) throw new Error("Erro ao excluir candidato.");

      listaCandidatos = listaCandidatos.filter(c => c.id !== id);
      renderizarTabela();
    } catch (err) {
      console.error("Erro ao excluir candidato:", err);
    }
  };

  carregarPartidos().then(carregarCandidatos);
});