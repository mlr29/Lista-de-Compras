// main.js
const homeContent = document.getElementById("home")
console.log(window.location.pathname)

if (window.location.pathname == "/view/index.html") { //Se estiver em index.html
    document.addEventListener('DOMContentLoaded', () => {
        const exitButton = document.getElementById("bt-exit")
        console.log(exitButton)
        exitButton.addEventListener("click", function exitProgram() {
            console.log(homeContent.children)

            let i;
            for (i = 0; i <= 3; i++) {
                homeContent.children[i].style.display = "none"
            }

            homeContent.children[i].style.display = "block"
        })
    })
}

if (window.location.pathname == "/view/adicionar-item.html") { //Se estiver em adicionar-item.html

    const submitButton = document.getElementById("submit-button")

    const enviarItem = async (event) => {
        event.preventDefault()

        const inputs = document.getElementsByTagName("input")
        const sucessMessage = document.getElementById("msg-sucess")
        const messageCloseButton = document.getElementById("close-button")
        const textMessage = document.getElementById("text")

        messageCloseButton.addEventListener("click", () => {
            sucessMessage.classList = "msg-sucess closed"
        }
        )

        const nome = inputs[0].value; // Nome do item
        const quantidade = inputs[1].value; // Quantidade do item
        console.log(nome, quantidade)

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
            textMessage.textContent = `Item ${nome} adicionado com sucesso!`
            sucessMessage.classList = "msg-sucess"
        } catch (error) {
            console.error('Erro ao adicionar item:', error);
        }
    }

    submitButton.addEventListener("click", enviarItem)
}

if (window.location.pathname == "/view/ver-lista.html") { //Se estiver em ver-lista.html
    const deleteButton = document.getElementById("bt-excluiritem")
    const itemList = document.getElementById('item-list')

    const exibirLista = async (event) => {
        event.preventDefault()
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
                li.innerHTML = `<div class="value-list">${item.nome}</div>  <div class="value-list">${item.quantidade}</div>`; // Suponha que o item tenha um campo "nome"
                li.id = `${item.nome}`
                li.className = "item"
                li.onclick = () => {
                    const liElements = document.querySelectorAll("li")
                    liElements.forEach((element) => {
                        element.className = "item"
                    })
                    li.className = "item checked"
                    console.log(li)
                }
                itemList.appendChild(li);
            });
        } catch (error) {
            console.error('Erro ao buscar itens:', error);
        }
    }


    const deletarItem = async (event) => {
        event.preventDefault()

        let idDeleteItem
        const messageCloseButton = document.getElementById("close-button")
        const sucessMessage = document.getElementById("msg-sucess")
        const liElements = document.querySelectorAll("li")
        const textMessage = document.getElementById("text")

        messageCloseButton.addEventListener("click", () => {
            sucessMessage.classList = "msg-sucess closed"
        }
        )

        liElements.forEach((element) => {
            if (element.className == "item checked") {
                idDeleteItem = element.id
            }
        })
        console.log(idDeleteItem)
        try {
            const response = await fetch(`http://localhost:3000/lista/${idDeleteItem}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao deletar item');
            }

            console.log('Item deletado com sucesso!');
            exibirLista(event)
            textMessage.textContent = `Item ${idDeleteItem} removido com sucesso!`
            sucessMessage.classList = "msg-sucess"
        } catch (error) {
            console.error('Erro ao deletar item:', error);
        }
    };

    document.addEventListener('DOMContentLoaded', exibirLista)
    deleteButton.addEventListener('click', deletarItem);
}