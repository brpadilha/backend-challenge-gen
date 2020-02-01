<h1>Why?</h1>

This project is a part of my portfolio of a course that I made from RocketSeat's Bootcamp GoStack of FullStack Javascript. 

---

<h1>Installers</h1>

To install the packages you need to have `yarn` in your computer and run:


`yarn`

There is an Insomnia.json in the root for you import in your Insomnia to test the project.

You must create three databases containers to teste this project:

`docker run --name database -e POSTGRES_PASSWORD=docker -p 5433:5433 -d postgres`

`docker run --name mongobarber -p 27017:27017 -d -t mongo`

`docker run --name redisbarber -p 6379:6379 -d -t redis:alpine`

To manager the postgres database of this project, I used Postbird.

Don`t forget to migrate the database with:

`yarn sequelize db:migrate`