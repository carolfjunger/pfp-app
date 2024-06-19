## Getting started

### Installation

1. Clone the repository

2. Install the necessary dependencies

 ```npm install ``` 


### Create and seed the database


We are assuming that you have already created a PostgreSQL database on your computer. If you don't, you should install [PostgreSQL](https://www.postgresql.org/download/) and create your database in [pgAdmin](https://medium.com/@authfy/how-to-create-a-database-in-postgresql-76cd799f578e)


1. Create a .env file on the root folder and set DATABASE_URL as follows `postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA`

**.env**

```DATABASE_URL=your url" ```

2. Run the following command to create and seed the database

```npx prisma migrate dev --name init ```

### Start the app

``` npm run dev ```









## 
