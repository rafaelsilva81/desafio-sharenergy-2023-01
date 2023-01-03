import Fastify from "fastify";
import cors from "@fastify/cors";
import * as dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || "3333";

const bootstrap = async () => {
  const fastify = Fastify({ logger: true });

  await fastify.register(cors, { origin: true });

  fastify.get("/", async (request, reply) => {
    return { hello: "world" };
  });

  await fastify.listen({
    port: Number(port),
  });
};

console.log(`Server running on http://localhost:${port}`);
bootstrap();
