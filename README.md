#LABECOMMERCE

## 📖 Introdução

Projeto 'Labecommerce' é uma API para armazenar todas as informações de um e-commerce na base de dados.

Você terá acesso as informações de Produtos, Cliente e Compra relacionadas entre si.

Para acessar a documentação, [aqui!](https://documenter.getpostman.com/view/24460616/2s8ZDU6QRE)!

![Preview](./src/assets/diagram.png)

## 📄 Descrição

### Instalando as dependências:
- npm install: Instala todas as dependências listadas no package.json;
- npm i cors: biblioteca para liberar acesso externo ao servido;
- npm i express : framework para criar o servidor (API);
- npm i knex: biblioteca query builder para conectar com banco de dados
- npm i sqlite3: biblioteca do banco de dados SQLite

### Executando o projeto
- npm run dev: Estabelece a conexão com o banco de dados e reinicia automaticamente o servidor localhost toda a vez que o projeto for alterado e salvo.

### Endpoints
- Ping: Endpoint de teste da API;
- GetAll clients: Retorna todas as pessoas cadastradas;
- Create client: Cadastra um novo cliente.
- Create product: Cadastra um novo produto.
- Get all products '1': Retorna todos os produtos cadastrados.
- Get all products '2': Caso seja enviada uma query params (q) deve ser retornado o resultado da busca de produtos por nome.
- Edit product by id: Edita um produto existente.
- Create Purchase: Cadastra um novo pedido.
- Delete purchase by id: Deleta um pedido existente.
- Get purchase by id: Retorna os dados de uma compra, incluindo a lista de produtos da mesma.

## 💻 Tecnologias 

![NodeJs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)

### Programas utilizados:
- Postman API Platform
- VSCode

## 📫 Contato

E-mail: emidio.daniel@hotmail.com

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/danielemidio1988/)
[![Codewars](https://img.shields.io/badge/Codewars-B1361E?style=for-the-badge&logo=Codewars&logoColor=white)](https://www.codewars.com/users/DanielEmidio1988)