import Fastify from "fastify";
import cors from "@fastify/cors";
import * as dotenv from "dotenv";
import fastifyJwt from "@fastify/jwt";

/* Routes */
import authRoutes from "./routes/auth";
import catRoutes from "./routes/cats";

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

  await fastify.register(authRoutes, { prefix: "/auth" });

  await fastify.register(catRoutes, { prefix: "/cat" });

  await fastify.listen({
    port: Number(port),
  });
};

console.log(`Server running on http://localhost:${port}`);
bootstrap();
