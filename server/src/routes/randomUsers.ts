import { FastifyInstance } from "fastify";
import { z } from "zod";
import api from "../lib/axios";
import onRequestValidation from "../utils/onRequestValidation";

const baseUrl =
  "https://randomuser.me/api/?seed=rafaelsilva81&nat=br&inc=picture,name,email,login,dob,login";
const baseResults = 18;

const randomUserRouter = async (fastify: FastifyInstance) => {
  onRequestValidation(fastify);

  fastify.get("/", async (request, reply) => {
    const querySchema = z.object({
      page: z.string().transform((value) => Number(value)),
    });

    const { page } = querySchema.parse(request.query) || 1;

    const { data } = await api.get(
      `${baseUrl}&results=${baseResults}&page=${page}`
    );
    return reply.send(data);
  });

  /* TODO: Filter */
};

export default randomUserRouter;
