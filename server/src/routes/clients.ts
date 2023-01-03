import { FastifyInstance } from "fastify";
import { z } from "zod";
import db from "../lib/prisma";
import onRequestValidation from "../utils/onRequestValidation";

const userSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const clientRouter = async (fastify: FastifyInstance) => {
  onRequestValidation(fastify);

  /* TODO: Finalizar as outras rotas */
  fastify.get("/", async (request, reply) => {
    const clients = await db.client.findMany();
    reply.send(clients);
  });
};

export default clientRouter;
