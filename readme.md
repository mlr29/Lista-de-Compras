# Api Rest - Seleções na Copa

Esta é uma API simples construída com Express.js com conexão à MYSQL para gerenciar seleções de futebol na copa e seus respectivos grupos.

## Como usar

1. Instale as dependências:
npm install

2. Configure o banco de dados MySQL:
   - Certifique-se de ter um servidor MySQL em execução.
   - Edite o arquivo `conexao.js` na pasta `/src/app/database/` e insira as informações de conexão com o seu banco de dados.

3. Inicie o servidor:
npm run dev

A API estará disponível em http://localhost:3000.

## Rotas / End-Points

### • Listar todas as seleções
### - GET /selecoes

Retorna uma lista de todas as seleções.

### • Criar uma nova seleção
### - POST /selecoes
Cria uma nova seleção. Envie os dados da seleção no corpo da requisição no formato JSON.

Exemplo de corpo da requisição:
{
  "selecao": "Brasil",
  "grupo": "A"
}

### • Obter uma seleção específica por id
### - GET /selecoes/:id
Retorna uma seleção específica com o ID correspondente.

### • Atualizar uma seleção por id
### - PUT /selecoes/:id
Atualiza os detalhes de uma seleção específica com o ID correspondente. Envie os dados atualizados no corpo da requisição no formato JSON.

### • Deletar uma seleção por id
### - DELETE /selecoes/:id
Remove uma seleção específica com o ID correspondente.

## Licença
Este projeto está licenciado sob a Licença MIT.
