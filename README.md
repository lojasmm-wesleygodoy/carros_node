<h1>Bem vindo a api Carros para trabalho do Marcos!</h1>

O back utiliza as seguintes tecnologias:
**Node 16.6.0**,
**Postgres**

1. Para executá-lo primeiramente instale o banco de dados Postgres, download [aqui](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)

2. No arquivo `back\sql\ddls.sql` estão as DDL's das tabelas utilizadas no sistemas, execute-as no seu banco Postgres

3. Instale o node, download [aqui](https://nodejs.org/en/download/package-manager)

4. Faça um git clone https://github.com/lojasmm-wesleygodoy/carros_node.git

5. Execute dentro da pasta `back` do projeto o comando `npm install`

6. Dentro do arquivo `back\src\config\database.js` está a conexão padrão do banco Postgres, caso seu usuário e/ou senha seja outro basta alterá-lo respeitando o seguinte formato:

`DATABASE_URL=postgres://{db_username}:{db_password}@{host}:{port}/{db_name}`

7. Dentro da pasta `back` execute o comando `npm run dev`

Pronto, sua aplicação está rodando e pronta para ser consumida!

Tip: o arquivo `back\dev_resources\requisicoes-to-import.json` está as requisições para utilizar no [insomnia](https://insomnia.rest/download)
