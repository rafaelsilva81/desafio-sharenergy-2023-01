import { FastifyInstance } from "fastify";
import { z } from "zod";
import db from "../lib/prisma";
import onRequestValidation from "../utils/onRequestValidation";

const clientSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
  cpf: z.string(),
  userId: z.string(),
});

const clientRouter = async (fastify: FastifyInstance) => {
  onRequestValidation(fastify);

  /* TODO: Finalizar as outras rotas */
  fastify.get("/", async (request, reply) => {
    const clients = await db.client.findMany();
    reply.send(clients);
  });

  fastify.post("/", async (request, reply) => {
    const body = clientSchema.parse(request.body);

    const client = await db.client.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        address: body.address,
        cpf: body.cpf,
        userId: body.userId,
      },
    });

    if (client) {
      reply.status(201).send({
        message: "Cliente criado com sucesso",
        client,
      });
    }

    reply.status(500).send({
      message: "Houve um erro ao criar o cliente",
    });

    return;
  });
};

export default clientRouter;
