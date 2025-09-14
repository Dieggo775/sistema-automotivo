const urlVeiculos = "http://localhost:8080/veiculos";

document.addEventListener("DOMContentLoaded", () => {
    listarVeiculos();
});

// Listar veículos
async function listarVeiculos() {
    try {
        const response = await fetch(urlVeiculos);
        if (!response.ok) throw new Error(`Erro: ${response.statusText}`);
        const data = await response.json();

        const lista = document.getElementById("lista-veiculos");
        lista.innerHTML = "";

        data.forEach(veiculo => {
            const card = document.createElement("div");
            card.className = "veiculo-card";

            const imagem = document.createElement("img");
            imagem.src = veiculo.imagemUrl || "https://via.placeholder.com/220x150?text=Sem+Imagem";
            imagem.alt = veiculo.modelo;
            card.appendChild(imagem);

            const info = document.createElement("div");
            info.innerHTML = `
                <h3>${veiculo.modelo}</h3>
                <p><strong>Marca:</strong> ${veiculo.marca}</p>
                <p><strong>Ano:</strong> ${veiculo.ano}</p>
                <p><strong>Preço:</strong> R$ ${veiculo.preco}</p>
                <p><strong>Status:</strong> ${veiculo.status}</p>
            `;
            card.appendChild(info);

            lista.appendChild(card);
        });
    } catch (error) {
        console.error("Erro ao listar veículos:", error);
    }
}
