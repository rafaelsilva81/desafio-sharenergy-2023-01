import { FastifyInstance } from "fastify";
import { z } from "zod";
import axios from "axios";

const catRoutes = async (fastify: FastifyInstance) => {
  fastify.addHook("onRequest", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err: unknown) {
      return reply.code(403).send({
        message: "Você não tem permissão para acessar este recurso",
        error: err,
      });
    }
  });

  fastify.get("/", async (request, reply) => {
    const querySchema = z.object({
      code: z.string(),
    });

    const { code } = querySchema.parse(request.query);

    const { data } = await axios.get(`https://http.cat/${code}`, {
      responseType: "arraybuffer",
    });

    reply.code(200).type("image/png").send(data);
  });
};

export default catRoutes;
