import { FastifyInstance } from "fastify";
import { z } from "zod";
import api from "../lib/axios";
import { getRandomUsersSchema } from "../schemas/randomUsersSchema";
import onRequestValidation from "../utils/onRequestValidation";

const baseUrl =
  "https://randomuser.me/api/?seed=rafaelsilva81&nat=br&inc=picture,name,email,login,dob,login";
const baseResults = 18;

const randomUserRouter = async (fastify: FastifyInstance) => {
  onRequestValidation(fastify);

  fastify.get("/", getRandomUsersSchema, async (request, reply) => {
    const querySchema = z.object({
      page: z.string().transform((value) => Number(value)),
    });

    const { page } = querySchema.parse(request.query) || 1;

    try {
      const { data }: { data: Users } = await api.get(
        // Obter mais resultados caso haja filtro
        `${baseUrl}&results=${baseResults}&page=${page}`
      );

      return reply.send(data);
    } catch (error) {
      return reply.status(500).send({
        message: "Erro interno do servidor",
      });
    }
  });
};

export default randomUserRouter;
