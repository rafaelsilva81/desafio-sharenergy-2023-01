import { FastifyInstance } from "fastify";
import onRequestValidation from "../utils/onRequestValidation";
import api from "../lib/axios";
import { getDogsSchema } from "../schemas/dogSchema";

const dogRouter = async (fastify: FastifyInstance) => {
  onRequestValidation(fastify);

  fastify.get("/", getDogsSchema, async (request, reply) => {
    await api
      .get("https://random.dog/woof.json")
      .then((response) => {
        return reply.status(200).send({
          image: response.data.url,
        });
      })
      .catch((error) => {
        return reply.status(500).send({
          error: "Houve um erro ao obter a imagem",
        });
      });
  });
};

export default dogRouter;
