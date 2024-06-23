## Primeiros passos

Este projeto é uma ferramenta para dar apoio ao usuário na avaliação de visualizações de dados. Nele, o usuário carrega a imagem da sua visualização e responde a uma série de perguntas sobre o seu gráfico. A partir das respostas, são gerados feedbacks para que o usuário reflita sobre sua visualização.

Para ultilizar o sistema é necessário ter a versão do Node.js igual ou superior a 21.2.0 instaladas no seu computador. Caso tenha uma outra versão você pode usar um [Node Version Manager](https://github.com/nvm-sh/nvm) para usar a versão adequada.

É necessário também ter um banco PostgreSQL para popular os dados. Para usar um banco local você deve instalar o [PostgreSQL](https://www.postgresql.org/download/) e criar um banco no [pgAdmin](https://medium.com/@authfy/how-to-create-a-database-in-postgresql-76cd799f578e)

### Instalação


Para utilizar o sistema é necessário que você clone este repositório localmente e instale os pacotes necessários.

Rode os seguintes comandos na sua linha de comando


1. Clone este repositório

```git clone git@github.com:carolfjunger/pfp-app.git```

2. Instale as dependencias necessárias

```npm install```

Para popular o seu banco local com os fluxos já previstos você deve

1. Criar um arquivo `.env ` e adicionar a variável de ambiente DATABASE_URL no seguinte formato `postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA` como o exemplo abaixo:

**.env**

```DATABASE_URL=your url" ```

2. Para popular o banco com o modelo de dados basta rodar o seguinte comando

```npx prisma migrate dev --name init ```

3. Para carregar os fluxos já criados basta rodar o script [script_inicial.sql](https://github.com/carolfjunger/pfp-app/blob/main/script_inicial.sql)


Com os fluxos carregados basta rodar o seguinte comando e o projeto estára rodando em `http://localhost:3000/`

` npm run dev `