# Some Notes for Code Review 1

## What kind of DB does Prisma Provide

- From some [documentation](https://www.howtographql.com/graphql-js/4-adding-a-database/), if you're using the demo DB, it might be using [AWS Aurora](https://aws.amazon.com/rds/aurora/), which is a relational DB.
    - This means that the datamodel explorer that you are using acts more like an ORM than a DB. [Prisma vs. Sequelize](https://www.prisma.io/docs/understand-prisma/prisma-vs-traditional-orms/prisma-vs-sequelize-c4fk/)
- You can currently plugin PostgreSQL as your DB for Prisma to use. [List of supported DBs and upcoming DBs](https://www.prisma.io/features/databases)
- The `.prisma` file are the models to be mapped to the DB

## Project Board

- Use one
- Think of it from the perspective of many other parties trying to get acclimated to what you are building

## GPS

- Think about anchoring
- Since you can plugin PostgreSQL into here, you can look into [PostGis](https://postgis.net/). This is a PostgreSQL plugin to handle geographical and spatial data

## Other

- Spend time understanding data flow and the differences between GraphQL APIs vs. The Traditional REST API Architecture