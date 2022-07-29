# Desafio Fullstack

Esse projeto foi gerado com o [Angular CLI](https://github.com/angular/angular-cli) versão 13.3.6 e [Node](https://nodejs.org) versão 16.16.0. A API também serve as páginas geradas pelo _build_ da aplicação, e usando `npm install` na pasta raiz instala os _node_modules_ em ambas.

Você pode acessar uma [versão de deploy](https://ford-desafio-tiagolima.herokuapp.com/) hospedada no Heroku.

## Banco de dados MySQL

Um servidor MySQL está rodando em nuvem por meio do ClearDB e Heroku. Caso se queira alternar para um desenvolvimento local, as configurações do banco de dados devem ser ajustadas em `backend/express/config/db-connection.js` – o esquema que for especificado será preenchido automaticamente com valores de teste, ao rodar a API.

## Servidor de desenvolvimento

Rode `npm run dev` para começar um servidor de desenvolvimento local para a API em `http://localhost:3000/` e para a aplicação em `http://localhost:4200/` – ambos vão recarregar automaticamente se você alterar qualquer um dos arquivos.

Também é possível usar os comandos `npm run server` e `npm run client` para rodar somente a API ou somente a aplicação, respectivamente.

Você poderá logar como `admin` com a senha `123` na aplicação, um dos dados de teste que já foram gerados.

## Build

Rode `npm run build` para gerar o _build_ da aplicação Angular. Os artefatos dessa operação serão armazenados no diretório `client/dist/`.
