document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("#tbody-partidos");
  const formCriar = document.querySelector("#form-criar-partido");
  const formEditar = document.querySelector("#form-editar-partido");
  const modalEditar = new bootstrap.Modal(document.getElementById("modalEditarPartido"));
  const modalCriar = new bootstrap.Modal(document.getElementById("modalNovoPartido"));

  let listaPartidos = [];

  async function carregarPartidos() {
    try {
      const res = await fetch("http://localhost:3000/api/party");
      const data = await res.json();
      listaPartidos = data.partys || [];
      renderizarTabela();
    } catch (err) {
      console.error("Erro ao buscar partidos:", err);
    }
  }

  function renderizarTabela() {
    tbody.innerHTML = "";

    if (!listaPartidos.length) {
      tbody.innerHTML = `<tr><td colspan="4">Nenhum partido encontrado.</td></tr>`;
      return;
    }

    listaPartidos.forEach((partido) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${partido.name}</td>
        <td>${partido.initials}</td>
        <td>${partido.number}</td>
        <td>
          <button class="btn-icon" onclick="editarPartido(${partido.id})"><i class="bi bi-pencil"></i></button>
          <button class="btn-icon" onclick="excluirPartido(${partido.id})"><i class="bi bi-trash"></i></button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  formCriar.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(formCriar);

    const novoPartido = {
      name: formData.get("name"),
      initials: formData.get("initials"),
      number: parseInt(formData.get("number"))
    };

    try {
      const res = await fetch("http://localhost:3000/api/party", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoPartido)
      });

      if (res.ok) {
        formCriar.reset();
        modalCriar.hide();
        await carregarPartidos();
      }
    } catch (err) {
      console.error("Erro ao criar partido:", err);
    }
  });

  formEditar.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(formEditar);
    const id = formData.get("id");

    const partidoAtualizado = {
      name: formData.get("name"),
      initials: formData.get("initials"),
      number: parseInt(formData.get("number"))
    };

    try {
      const res = await fetch(`http://localhost:3000/api/party/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(partidoAtualizado)
      });

      if (res.ok) {
        modalEditar.hide();
        await carregarPartidos();
      }
    } catch (err) {
      console.error("Erro ao editar partido:", err);
    }
  });

  window.editarPartido = (id) => {
    const partido = listaPartidos.find(p => p.id === id);
    if (!partido) return;

    const form = document.forms["form-editar-partido"];
    form.id.value = partido.id;
    form.name.value = partido.name;
    form.initials.value = partido.initials;
    form.number.value = partido.number;

    modalEditar.show();
  };

  window.excluirPartido = async (id) => {
    if (!confirm("Tem certeza que deseja excluir este partido?")) return;

    try {
      const res = await fetch(`http://localhost:3000/api/party/${id}`, { method: "DELETE" });
      if (res.ok) await carregarPartidos();
    } catch (err) {
      console.error("Erro ao excluir partido:", err);
    }
  };

  carregarPartidos();
});
