import Fastify from "fastify";
import cors from "@fastify/cors";
import * as dotenv from "dotenv";
import fastifyJwt from "@fastify/jwt";

/* Routes */
import authRouter from "./routes/auth";
import catRouter from "./routes/cats";
import randomUserRouter from "./routes/randomUsers";

dotenv.config();
const port = process.env.PORT || "3333";

const bootstrap = async () => {
  const fastify = Fastify({ logger: true });

  await fastify.register(cors, { origin: true });

  /* TODO: Add secret to env */
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

  await fastify.register(authRouter, { prefix: "/auth" });

  await fastify.register(catRouter, { prefix: "/cats" });

  await fastify.register(randomUserRouter, { prefix: "/random-users" });

  await fastify.listen({
    port: Number(port),
  });
};

console.log(`Server running on http://localhost:${port}`);
bootstrap();
