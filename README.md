# Desafio Fullstack

Esse projeto foi gerado com o [Angular CLI](https://github.com/angular/angular-cli) versão 13.3.6.

## Banco de dados MySQL

Um servidor MySQL rodando em `http://localhost:3306/` é requerido antes de inicializar a API. o Esquema `ford_api` deve começar vazio, já que a API inicialmente cria as tabelas necessárias e preenche-as com dados de teste.

O usuário e senha de conexão, no entanto, devem ser configurados em `backend/express/config/db-connection.js`.

## Servidor de desenvolvimento

Rode `npm install` e `npm run dev` em `backend/express/` para começar um servidor de desenvolvimento para a API. Você poderá ver o seu index em `http://localhost:3000/`.

Rode `npm install` e `ng serve` em `frontend/` para ter um servidor de desenvolvimento da aplicação Angular. Navegue para `http://localhost:4200/`, onde você poderá logar como `admin` com a senha `123` – um dos dados de teste que já foram gerados.

Ambas a aplicação e a API vão recarregar automaticamente se você alterar qualquer um dos arquivos.

## Build

Rode `ng build` em `frontend/` para gerar o _build_ do projeto Angular. O resultado dessa operação será armazenado no diretório `frontend/dist/`.

## Ajuda adicional

Para obter mais ajuda sobre o Angular CLI, use `ng help` em `frontend/` ou confira a página [Angular CLI Overview and Command Reference](https://angular.io/cli).
