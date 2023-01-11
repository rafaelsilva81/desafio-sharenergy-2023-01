import Fastify from "fastify";
import cors from "@fastify/cors";
import * as dotenv from "dotenv";
import fastifyJwt from "@fastify/jwt";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";

/* Routes */
import authRouter from "./routes/auth";
import catRouter from "./routes/cats";
import randomUserRouter from "./routes/randomUsers";
import dogRouter from "./routes/dogs";
import clientRouter from "./routes/clients";

dotenv.config();
const port = process.env.PORT || "3333";

const bootstrap = async () => {
  const fastify = Fastify({ logger: true });

  await fastify.register(cors, { origin: true });

  await fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || "secret",
    cookie: {
      cookieName: "auth-token",
      signed: true,
    },
    sign: {
      expiresIn: "7d",
    },
  });

  // Documentação da API
  await fastify.register(fastifySwagger, {
    swagger: {
      info: {
        title: "Desafio Sharenergy 2023 API",
        description: "Documentação para API do Desafio sharenergy 2023",
        version: "1.0.0",
      },
      host: `localhost:${port}`,
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
      tags: [
        { name: "AUTH", description: "Rotas relacionadas a autenticação" },
        {
          name: "RANDOM USERS",
          description:
            "Rotas relacionadas ao serviço de usuários aleatórios coletados da API https://randomuser.me/",
        },
        {
          name: "CATS",
          description:
            "Rotas relacionadas ao serviço de Gatos HTTP coletados da API https://http.cat/",
        },
        {
          name: "DOGS",
          description:
            "Rotas relacionadas ao serviço de cachorro aleatório da APi https://random.dog/",
        },
        {
          name: "CLIENTS",
          description: "Rotas relacionadas a API interna do CRUD de Clientes",
        },
      ],
      securityDefinitions: {
        Bearer: {
          type: "apiKey",
          name: "Authorization",
          in: "header",
        },
      },
    },
  });

  await fastify.register(randomUserRouter, { prefix: "/random-users" });

  await fastify.register(authRouter, { prefix: "/auth" });

  await fastify.register(catRouter, { prefix: "/cats" });

  await fastify.register(dogRouter, { prefix: "/dogs" });

  await fastify.register(clientRouter, { prefix: "/clients" });

  await fastify.register(fastifySwaggerUI, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next();
      },
      preHandler: function (request, reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });

  await fastify.listen({
    host: "0.0.0.0",
    port: Number(port),
  });

  await fastify.ready();
  fastify.swagger();
};

console.log(`Server running on http://localhost:${port}`);
bootstrap();
