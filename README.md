# Projeto pessoal Car Shopping

Contextualizando

Car Shopping é um projeto pessoal de um **CRUD** feito para acessar acessar, adicionar e editar carros e motos em um data base em mongoDB. Não existem dados pré-adicionados. Abaixo você encontra o modo de acesso ao **CRUD**.

## Instalação

Instalação do projeto

```bash
  git clone git@github.com:vicsantus/Car-Shopping.git
  cd Car-Shopping
  docker compose up -d (ou docker-compose up -d)
  npm i
  docker attach car_shop
```

Após a instalação você pode entrar no Visual Studio Code e com a extensão Thunder Client ou similares coloque a rota **`localhost:3001`**, e dali usar as rotas da página.

## Funcionalidades

- Feito em POO com Typescript, express e node
- Aplicado todos os principios de SOLID
- Utilizado noSQL mongoDB
- Utilizado ODM Mongoose
- Testes completos das camadas service e model **(para rodar os testes deve estar com o console fora do container docker e dentro da pasta do app, então execute em seu bash `npm run test:mocha`)**

## Rotas

- get '/cars' - Busca a lista de todos os carros
- get '/cars/:id' - Busca um carro por id **(deve necessáriamente ser um id mongo)**
- put '/cars/:id' - Atualiza um carro **(deve necessáriamente ser um id mongo)**
- post '/cars' - Adiciona um carro

- Padrão de post da rota cars

```json
{
  "model": "Marea",
  "year": 2002,
  "color": "Black",
  "status": true,
  "buyValue": 15.99,
  "doorsQty": 4,
  "seatsQty": 5
}
```

- get '/motorcycles' - Busca a lista de todos as motos
- get '/motorcycles/:id' - Busca uma moto por id **(deve necessáriamente ser um id mongo)**
- put '/motorcycles/:id' - Atualiza uma moto **(deve necessáriamente ser um id mongo)**
- post '/motorcycles' - Adiciona uma moto

- Padrão de post da rota motorcycles

```json
{
  "model": "Honda Cb 600f Hornet",
  "year": 2005,
  "color": "Yellow",
  "status": true,
  "buyValue": 30.0,
  "category": "Street",
  "engineCapacity": 600
}
```
