# Desafio para o processo seletivo SHARENERGY 2023/01

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

# Informações do projeto

Projeto para o Desafio Sharenergy 2023/01

Autor: [Rafael Galdino da Silva](https://github.com/rafaelsilva81)

[Vídeo de apresentação](https://www.youtube.com/watch?v=Mz0UWwdh4fE)

# Instruções

1. Clonar o repositório
2. Configurar o servidor:
   1. Acessar a pasta server
   2. Executar o comando `npm install`
   3. Executar o comando `npm run setup`, esse comando irá criar o container do banco de dados além de construir e executar o projeto
   4. Executar o comando `npm run create-default-user` em outro terminal para criar o usuário padrão (_isso é necessário pois os usuários são criptografados no banco_)
   5. (OPCIONAL) Executar o comando `npm run seed` para poplar o banco de clientes
3. Configurar o front-end:
   1. Acessar a pasta client
   2. Executar o comando `npm install`
   3. Executar o comando `npm run dev`
   4. Se preferir, executar o comando `npm run build` para gerar o build de produção em seguida de `npm run preview` para visualizar o build
