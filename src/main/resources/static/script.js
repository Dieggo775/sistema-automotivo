const urlVeiculos = "http://localhost:8080/veiculos";

let veiculoEditando = null;

// ===================== LOGIN =====================
document.getElementById("form-login").addEventListener("submit", async function (e) {
    e.preventDefault();

    const nome = document.getElementById("login-nome").value;
    const email = document.getElementById("login-email").value;
    const telefone = document.getElementById("login-telefone").value;

    try {
        const response = await fetch(`http://localhost:8080/usuarios/buscar?email=${encodeURIComponent(email)}`);
        let usuario;

        if (response.ok) {
            usuario = await response.json();
            document.getElementById("mensagemSucesso").innerText = "Login realizado com sucesso!";
        } else {
            const cadastrarResponse = await fetch("http://localhost:8080/usuarios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, email, telefone })
            });

            if (!cadastrarResponse.ok) throw new Error("Erro ao cadastrar usuário");
            usuario = await cadastrarResponse.json();
            document.getElementById("mensagemSucesso").innerText = "Usuário cadastrado e logado!";
        }

        document.getElementById("area-login").style.display = "none";
        document.getElementById("area-veiculos").style.display = "block";
        listarVeiculos();

    } catch (error) {
        console.error("Erro:", error);
        document.getElementById("mensagemErro").innerText = "Erro ao acessar usuário.";
    }
});

// ===================== LISTAR VEÍCULOS =====================
async function listarVeiculos() {
    try {
        const response = await fetch(urlVeiculos);
        if (!response.ok) throw new Error("Erro ao buscar veículos");

        const veiculos = await response.json();
        const lista = document.getElementById("lista-veiculos");
        lista.innerHTML = "";

        veiculos.forEach(v => {
            const card = document.createElement("div");
            card.classList.add("veiculo-card");

            card.innerHTML = `
                <img src="${v.fotoUrl}" alt="${v.modelo}" class="veiculo-foto">
                <h3>${v.marca} - ${v.modelo}</h3>
                <p><strong>Ano:</strong> ${v.ano}</p>
                <p><strong>Cor:</strong> ${v.cor}</p>
                <p><strong>Preço:</strong> R$ ${v.preco.toLocaleString()}</p>
                <p><strong>Km:</strong> ${v.quilometragem}</p>
                <p><strong>Status:</strong> ${v.status}</p>
                <button onclick="editarVeiculo(${v.id})">✏️ Editar</button>
                <button onclick="deletarVeiculo(${v.id})">🗑️ Deletar</button>
            `;
            lista.appendChild(card);
        });

    } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao listar veículos. Confira o backend.");
    }
}

// ===================== ABRIR / FECHAR FORMULÁRIO =====================
function abrirFormulario() {
    const menu = document.getElementById("menu-lateral");
    menu.classList.add("active"); // abre o menu lateral
    document.getElementById("cadastro-veiculo").style.display = "block";
}

function fecharFormulario() {
    document.getElementById("cadastro-veiculo").style.display = "none";
    document.getElementById("form-veiculo").reset();
    veiculoEditando = null;
}

// ===================== CADASTRAR / ATUALIZAR VEÍCULO =====================
document.getElementById("form-veiculo").addEventListener("submit", async (event) => {
    event.preventDefault();

    const veiculoData = {
        modelo: document.getElementById("modelo").value,
        marca: document.getElementById("marca").value,
        ano: parseInt(document.getElementById("ano").value),
        cor: document.getElementById("cor").value,
        preco: parseFloat(document.getElementById("preco").value),
        quilometragem: parseInt(document.getElementById("quilometragem").value),
        status: document.getElementById("status").value,
        fotoUrl: document.getElementById("fotoUrl").value
    };

    try {
        if (veiculoEditando) {
            await fetch(`${urlVeiculos}/${veiculoEditando.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(veiculoData)
            });
            veiculoEditando = null;
        } else {
            await fetch(urlVeiculos, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(veiculoData)
            });
        }

        listarVeiculos();
        fecharFormulario();

    } catch (error) {
        console.error("Erro ao salvar veículo:", error);
        alert("Erro ao salvar veículo.");
    }
});

// ===================== EDITAR VEÍCULO =====================
async function editarVeiculo(id) {
    try {
        const response = await fetch(`${urlVeiculos}/${id}`);
        if (!response.ok) throw new Error("Veículo não encontrado");
        veiculoEditando = await response.json();

        // Preenche os campos do formulário
        document.getElementById("modelo").value = veiculoEditando.modelo;
        document.getElementById("marca").value = veiculoEditando.marca;
        document.getElementById("ano").value = veiculoEditando.ano;
        document.getElementById("cor").value = veiculoEditando.cor;
        document.getElementById("preco").value = veiculoEditando.preco;
        document.getElementById("quilometragem").value = veiculoEditando.quilometragem;
        document.getElementById("status").value = veiculoEditando.status;
        document.getElementById("fotoUrl").value = veiculoEditando.fotoUrl;

        abrirFormulario(); // abre o menu lateral com formulário preenchido
    } catch (error) {
        console.error(error);
        alert("Erro ao carregar veículo para edição.");
    }
}

// ===================== DELETAR VEÍCULO =====================
async function deletarVeiculo(id) {
    if (!confirm("Tem certeza que deseja excluir este veículo?")) return;

    try {
        const response = await fetch(`${urlVeiculos}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Erro ao deletar veículo");

        alert("Veículo excluído com sucesso!");
        listarVeiculos();
    } catch (error) {
        console.error(error);
        alert("Erro ao deletar veículo.");
    }
}

// ===================== BOTÕES =====================
document.getElementById("btn-cadastrar-veiculo").addEventListener("click", () => {
    veiculoEditando = null;
    abrirFormulario();
});

document.getElementById("btn-cancelar").addEventListener("click", () => {
    fecharFormulario();
});

// ===================== MENU HAMBÚRGUER =====================
function toggleMenu() {
    document.getElementById("menu-lateral").classList.toggle("active");
}

// ===================== INICIALIZAÇÃO =====================
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("area-veiculos").style.display = "none";
    document.getElementById("cadastro-veiculo").style.display = "none";
});
