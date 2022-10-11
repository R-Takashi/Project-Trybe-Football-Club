# Trybe Football Club

# Contexto
Este projeto foi feito durante o módulo de backend na Trybe, onde o objetivo era desenvolver o backend de uma aplicação FullStack, onde simula a classificação e placar de um campeonato de futebol. Utilizando CRUDs possibilita ao usuário, fazer login, consultar times, partidas e classificações, inserir, editar e finalizar partidas.

Como padrão de organização de camadas foi utilizado o MSC ( Model, Service, Controller ) e também foi desenvolvido a habilidade de utilizar os conceitos de POO / SOLID como desafio.

Os erros foram tratados de maneira customizada utilizando express-async-errors e foi realizado testes de integração cobrindo mais de 80% das linhas de código.

## Técnologias usadas

Back-end:
> Desenvolvido usando: Typescript, NodeJS, ExpressJS, MYSQL, Sequelize, Docker, JWT.


## Instalando Dependências

> Na raíz do projeto, execute no terminal as linhas de comando
```
npm install
npm run postinstall
``` 

## Executando aplicação em Docker

* Para subir os containers da aplicação, na raíz do projeto execute no terminal a linha de comando:

  ```
  npm run compose:up
  ```

## Executando Testes

* Para rodar todos os testes, na raíz do projeto execute no terminal a linha de comando:

  ```
    npm test
  ```
 
## Aplicação em funcionamento
 
* Para ver a aplicação em funcionamento, ela estará disponível na porta 3000:
  http://localhost:3000/leaderboard no navegador
  
* Caso queira ver como são feitas as requisições utilizando algum API client, ela estará disponível na porta 3001:
  http://localhost:3001/
  
## Fechando e finalizando a aplicação

* Para descer os containers da aplicação, na raíz do projeto execute no terminal a linha de comando:

  ```
  npm run compose:down
  ```
