// main.js
const form = document.getElementById("form")
const submitButton = document.getElementById("submit-button")


submitButton.addEventListener("click", async (event) => {
        event.preventDefault()

        const nome = form.children[2].value; // Nome do item
        const quantidade = form.children[4].value; // Quantidade do item
    
        try {
            const response = await fetch('http://localhost:3000/lista', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome, quantidade })
            });
    
            if (!response.ok) {
                throw new Error('Erro ao adicionar item');
            }
    
            console.log('Item adicionado com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar item:', error);
        }
})

form[0].addEventListener("submit", (event) => {
    event.preventDefault()

    console.log(event.target)
})

document.addEventListener('DOMContentLoaded', () => {
    const itemList = document.getElementById('item-list');
    const buttonVerLista = document.getElementById('bt-verlista');
    console.log(itemList);
    // Função para buscar e exibir a lista
    const exibirLista = async () => {
        try {
            const response = await fetch('http://localhost:3000/lista', {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error('Erro ao buscar itens');
            }
            const data = await response.json();

            // Limpa a lista antes de adicionar os itens
            itemList.innerHTML = '';

            // Itera pelos itens e adiciona à lista
            data.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.nome} (Quantidade: ${item.quantidade})`; // Suponha que o item tenha um campo "nome"
                itemList.appendChild(li);
            });
        } catch (error) {
            console.error('Erro ao buscar itens:', error);
        }
    };

    // Adiciona evento de clique ao botão
    buttonVerLista.addEventListener('click', exibirLista);
});
