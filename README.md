## Descrição do Projeto

API simples para manipulação de *cards* integrado com o **Trello**, utilizando o *framework* **NestJS**.


## Instalação das Dependências

```bash
$ npm install
```

## Considerações Iniciais

Antes de rodar o projeto, favor criar um arquivo chamado `.env` na raiz da aplicação.

Este arquivo deve conter as seguintes chaves:

```
TRELLO_TOKEN
TRELLO_API_KEY
TRELLO_API_BASE_URL
```

## Inicialização do Projeto

```bash
$ npm run start
```

## Verificação dos Testes

```bash
$ npm run test
```

## Swagger

Foi adicionado o **Swagger** ao projeto. Após rodar a aplicação, o mesmo pode ser acessado ao passar a rota */docs* na **URL**. Os *endpoints* disponíveis para manipulação encontram-se logo abaixo.

## Endpoints Disponíveis

- GET `/boards` - Para recuperar todos os dados de *boards*.
- GET `/lists/:boardId` - Para recuperar todos os dados de listas de um *board* em específico.
- GET `/cards/:listId` - Para recuperar todos os dados de *cards* de uma lista em específico.
- POST `/create-card` - Para criar um *card* em uma lista.
- PUT `/update-card/:cardId` - Para atualizar os dados de um *card* específico.
- DELETE `/delete-card/:cardId` - Para deletar os dados de um *card* específico.
