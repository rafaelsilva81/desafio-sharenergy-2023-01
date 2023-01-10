import { FastifyInstance } from "fastify";
import { z } from "zod";
import onRequestValidation from "../utils/onRequestValidation";
import api from "../lib/axios";
import { AxiosError } from "axios";
import { getCatsSchema } from "../schemas/catSchema";

const catRouter = async (fastify: FastifyInstance) => {
  onRequestValidation(fastify);

  fastify.get("/", getCatsSchema, async (request, reply) => {
    const catParams = z.object({
      code: z.string(),
    });

    const { code } = catParams.parse(request.query);

    await api
      .get(`https://http.cat/${code}`, {
        responseType: "arraybuffer",
      })
      .then((response) => {
        const image = Buffer.from(response.data, "binary").toString("base64");

        return reply.status(200).send({
          image: `data:image/png;base64,${image}`,
        });
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 404) {
          return reply.status(404).send({
            message:
              "Não foi posível encontrar um resultado com o código solicitado",
          });
        } else {
          return reply.status(500).send({
            message: "Houve um erro no servidor",
          });
        }
      });
  });
};

export default catRouter;
