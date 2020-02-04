# About this project

This is a project made to resolve [this](https://github.com/lucasfonmiranda/gen-careers) backend challenge.

## Project resume

This project is to build a REST API that will communicate with two different payment services, stripe and paypal.

### API requirements:

- A route to create Clients;
- A route to create Transactions;
- A route to retrieve Clients;
- A route to retrieve transactions. It shall allows filtering by clients or payment service used;
- A transaction should be created in only one payment service (randomly choosed in each request);

# Why?

This project is a part of my portifolio, that I wanted to improve my skills of resolving problems and create APIs.I will be happy if you provide me any feedback about this project, anything that you can report, cam make me a better developer!

Email-me: brpadilha.dev@gmail.com

Connect with me at [Linkedin](https://www.linkedin.com/in/brpadilha/)

---

# Getting Started

<h3>Clonning the Repository</h3>

```
$ git clone git@github.com:brpadilha/backend-challenge-gen.git

$ cd backend backend-challenge-gen
```

<h3>Installing dependencies</h3>

```
$  yarn
```

<h3> Installing docker containers used in this project </h3>

```
docker run --name database -e POSTGRES_PASSWORD=docker -p 5433:5433 -d postgres
```

```
docker run --name mongobank -p 27017:27017 -d -t mongo
```

<h3> Migrate clients </h3>

I used the PostgresSQL db to register clients. So you will need to run the migrate of clients:

```
yarn sequelize db:migrate
```

I used [Postbird]('https://www.electronjs.org/apps/postbird) to check my PostgresSQL.
The login is:

```
Username: postgres
Password: docker
```

In the root of this project you can find the `insomnia.json` that you can import on [insomnia]('https://insomnia.rest/download/') to make HTTP requests, view response details of this project.

# Main libraries

```
    "bcryptjs"
    "dotenv"
    "express"
    "jsonwebtoken"
    "mongoose"
    "sequelize"
    "sequelize-cli"
    "youch"
    "yup"
```
