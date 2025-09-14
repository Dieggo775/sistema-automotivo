const urlUsuarios = "http://localhost:8080/usuarios";
const urlVeiculos = "http://localhost:8080/veiculos";

let usuarioLogado = null;
let modoEdicao = false;
let veiculoEditandoId = null;

// Mensagens
function mostrarMensagem(msg, tipo="erro") {
    const div = tipo === "erro" ? document.getElementById("mensagemErro") : document.getElementById("mensagemSucesso");
    div.textContent = msg;
    setTimeout(()=>{ div.textContent = ""; }, 3000);
}

// ================= LOGIN / CADASTRO =================
document.getElementById("form-login").addEventListener("submit", async (event) => {
    event.preventDefault();
    const nome = document.getElementById("login-nome").value.trim();
    const email = document.getElementById("login-email").value.trim();
    const telefone = document.getElementById("login-telefone").value.trim();
    if(!nome || !email || !telefone){ mostrarMensagem("Preencha todos os campos."); return; }

    try {
        const resp = await fetch(`${urlUsuarios}?email=${encodeURIComponent(email)}`);
        const usuarios = await resp.json();
        if(usuarios.length === 0){
            const novoResp = await fetch(urlUsuarios, {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({nome,email,telefone})
            });
            usuarioLogado = await novoResp.json();
            mostrarMensagem("Usuário cadastrado!","sucesso");
        } else {
            usuarioLogado = usuarios[0];
            mostrarMensagem("Login realizado!","sucesso");
        }

        document.getElementById("area-login").style.display="none";
        document.getElementById("area-veiculos").style.display="block";
        listarVeiculos();

    } catch(err){ console.error(err); mostrarMensagem("Erro ao acessar usuário."); }
});

// ================= LISTAR VEÍCULOS =================
async function listarVeiculos(){
    try{
        const resp = await fetch(urlVeiculos);
        const data = await resp.json();
        const lista = document.getElementById("lista-veiculos");
        lista.innerHTML="";
        data.forEach(v=>{
            const card = document.createElement("div");
            card.className="veiculo-card";

            const img = document.createElement("img");
            img.src=v.imagemUrl || "https://via.placeholder.com/200x120?text=Sem+Imagem";
            img.alt=v.modelo;
            card.appendChild(img);

            const info = document.createElement("div");
            info.innerHTML=`
                <h3>${v.modelo} - ${v.marca}</h3>
                <p>Ano: ${v.ano}</p>
                <p>Cor: ${v.cor}</p>
                <p>Preço: R$ ${v.preco}</p>
                <p>Quilometragem: ${v.quilometragem} km</p>
                <p>Status: ${v.status}</p>
            `;
            card.appendChild(info);

            // Botões editar/deletar
            const btnEditar = document.createElement("button");
            btnEditar.textContent="Editar";
            btnEditar.onclick=()=>abrirEdicao(v);
            card.appendChild(btnEditar);

            const btnDeletar = document.createElement("button");
            btnDeletar.textContent="Deletar";
            btnDeletar.onclick=()=>deletarVeiculo(v.id);
            card.appendChild(btnDeletar);

            lista.appendChild(card);
        });

    } catch(err){ console.error(err); mostrarMensagem("Erro ao carregar veículos."); }
}

// ================= ADICIONAR / EDITAR =================
document.getElementById("form-veiculo").addEventListener("submit", async(event)=>{
    event.preventDefault();
    const modelo = document.getElementById("veiculo-modelo").value.trim();
    const marca = document.getElementById("veiculo-marca").value.trim();
    const ano = parseInt(document.getElementById("veiculo-ano").value);
    const cor = document.getElementById("veiculo-cor").value.trim();
    const preco = parseFloat(document.getElementById("veiculo-preco").value);
    const quilometragem = parseInt(document.getElementById("veiculo-quilometragem").value);
    const status = document.getElementById("veiculo-status").value.trim();
    const imagemUrl = document.getElementById("veiculo-imagem").value.trim();

    const veiculo = {modelo, marca, ano, cor, preco, quilometragem, status, imagemUrl};

    try{
        if(modoEdicao){
            const resp = await fetch(`${urlVeiculos}/${veiculoEditandoId}`,{
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(veiculo)
            });
            if(!resp.ok) throw new Error("Erro ao atualizar");
            mostrarMensagem("Veículo atualizado!","sucesso");
            modoEdicao=false;
            veiculoEditandoId=null;
        } else {
            const resp = await fetch(urlVeiculos,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(veiculo)
            });
            if(!resp.ok) throw new Error("Erro ao adicionar");
            mostrarMensagem("Veículo adicionado!","sucesso");
        }

        document.getElementById("form-veiculo").reset();
        listarVeiculos();

    } catch(err){ console.error(err); mostrarMensagem(err.message); }
});

// ================= ABRIR EDIÇÃO =================
function abrirEdicao(v){
    modoEdicao=true;
    veiculoEditandoId=v.id;
    document.getElementById("veiculo-modelo").value=v.modelo;
    document.getElementById("veiculo-marca").value=v.marca;
    document.getElementById("veiculo-ano").value=v.ano;
    document.getElementById("veiculo-cor").value=v.cor;
    document.getElementById("veiculo-preco").value=v.preco;
    document.getElementById("veiculo-quilometragem").value=v.quilometragem;
    document.getElementById("veiculo-status").value=v.status;
    document.getElementById("veiculo-imagem").value=v.imagemUrl;
}

// ================= DELETE =================
async function deletarVeiculo(id){
    if(!confirm("Deseja deletar este veículo?")) return;
    try{
        const resp = await fetch(`${urlVeiculos}/${id}`,{method:"DELETE"});
        if(!resp.ok) throw new Error("Erro ao deletar");
        mostrarMensagem("Veículo deletado!","sucesso");
        listarVeiculos();
    } catch(err){ console.error(err); mostrarMensagem(err.message); }
}

// ================= FILTRO =================
document.getElementById("busca-veiculo").addEventListener("input", async function(){
    const termo = this.value.toLowerCase();
    try{
        const resp = await fetch(urlVeiculos);
        const data = await resp.json();
        const filtrados = data.filter(v=>v.modelo.toLowerCase().includes(termo));
        const lista = document.getElementById("lista-veiculos");
        lista.innerHTML="";
        filtrados.forEach(v=>{
            const card = document.createElement("div");
            card.className="veiculo-card";

            const img = document.createElement("img");
            img.src=v.imagemUrl||"https://via.placeholder.com/200x120?text=Sem+Imagem";
            img.alt=v.modelo;
            card.appendChild(img);

            const info = document.createElement("div");
            info.innerHTML=`
                <h3>${v.modelo} - ${v.marca}</h3>
                <p>Ano: ${v.ano}</p>
                <p>Cor: ${v.cor}</p>
                <p>Preço: R$ ${v.preco}</p>
                <p>Quilometragem: ${v.quilometragem} km</p>
                <p>Status: ${v.status}</p>
            `;
            card.appendChild(info);

            const btnEditar = document.createElement("button"); btnEditar.textContent="Editar"; btnEditar.onclick=()=>abrirEdicao(v); card.appendChild(btnEditar);
            const btnDeletar = document.createElement("button"); btnDeletar.textContent="Deletar"; btnDeletar.onclick=()=>deletarVeiculo(v.id); card.appendChild(btnDeletar);

            lista.appendChild(card);
        });
    } catch(err){ console.error(err); mostrarMensagem("Erro ao filtrar veículos."); }
});

// ================= INICIALIZAÇÃO =================
document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("area-veiculos").style.display="none";
});
