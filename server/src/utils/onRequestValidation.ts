import { FastifyInstance } from "fastify";

const onRequestValidation = (fastify: FastifyInstance) => {
  fastify.addHook("onRequest", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err: unknown) {
      return reply.code(401).send({
        message: "Você não tem permissão para acessar este recurso",
        error: err,
      });
    }
  });
};

export default onRequestValidation;
