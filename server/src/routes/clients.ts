import { FastifyInstance } from "fastify";
import { z } from "zod";
import db from "../lib/prisma";
import {
  clientDeleteSchema,
  clientGetSchema,
  clientPostSchema,
  clientPutSchema,
} from "../schemas/clientSchema";
import onRequestValidation from "../utils/onRequestValidation";

const clientCreateBody = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
  cpf: z.string(),
  userId: z.string(),
});

// Transforma todos os campos em opcionais
const clientUpdateBody = clientCreateBody.partial();

const clientRouter = async (fastify: FastifyInstance) => {
  onRequestValidation(fastify);

  /* GET Cliente */
  fastify.get("/", clientGetSchema, async (request, reply) => {
    const paramsSchema = z.object({
      userId: z.string(),
      page: z
        .string()
        .transform((value) => Number(value))
        .optional(),
    });

    const params = paramsSchema.parse(request.query);

    const page = params.page || 1;

    const clients = await db.client.findMany({
      where: {
        userId: params.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 12,
      skip: page * 12 - 12,
    });

    if (!clients) {
      reply.status(500).send({
        message: "Houve um erro ao obter os clientes",
      });
    }

    reply.status(200).send({
      clients,
    });
  });

  /* POST Cliente */
  fastify.post("/", clientPostSchema, async (request, reply) => {
    const body = clientCreateBody.parse(request.body);

    // Checar se o cliente existe (campos obrigatórios)
    const userExists = await db.client.findFirst({
      where: {
        OR: [
          {
            email: body.email,
          },
          {
            cpf: body.cpf,
          },
        ],
      },
    });

    if (userExists) {
      reply.status(400).send({
        message: "Já existe um cliente com esse email ou cpf",
      });
      return;
    }

    await db.client
      .create({
        data: body,
      })
      .then((client) => {
        reply.status(201).send({
          message: "Cliente criado com sucesso",
          client,
        });
      })
      .catch((error) => {
        reply.status(500).send({
          message: "Houve um erro ao criar o cliente",
        });
      });

    return;
  });

  /* PUT Cliente */
  fastify.put("/:id", clientPutSchema, async (request, reply) => {
    const body = clientUpdateBody.parse(request.body);

    const paramsSchema = z.object({
      id: z.string(),
    });

    const params = paramsSchema.parse(request.params);

    const clientExists = await db.client.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!clientExists) {
      reply.status(400).send({
        message: "Cliente não encontrado",
      });
      return;
    }

    await db.client
      .update({
        where: {
          id: params.id,
        },
        data: body,
      })
      .then((client) => {
        reply.status(200).send({
          message: "Cliente atualizado com sucesso",
          client,
        });
      })
      .catch((error) => {
        reply.status(500).send({
          message: "Houve um erro ao atualizar o cliente",
        });
      });
  });

  /* DELETE Cliente */
  fastify.delete("/:id", clientDeleteSchema, async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const params = paramsSchema.parse(request.params);

    const clientExists = await db.client.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!clientExists) {
      reply.status(400).send({
        message: "Cliente não encontrado",
      });
      return;
    }

    await db.client
      .delete({
        where: {
          id: params.id,
        },
      })
      .then((client) => {
        reply.status(200).send({
          message: "Cliente deletado com sucesso",
        });
      })
      .catch((error) => {
        reply.status(500).send({
          message: "Houve um erro ao deletar o cliente",
        });
      });

    return;
  });
};

export default clientRouter;
