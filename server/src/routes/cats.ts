import { FastifyInstance } from "fastify";
import { z } from "zod";
import onRequestValidation from "../utils/onRequestValidation";
import api from "../lib/axios";

const catRouter = async (fastify: FastifyInstance) => {
  onRequestValidation(fastify);

  fastify.get("/", async (request, reply) => {
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
      .catch((error) => {
        return reply.status(404).send({
          image: "https://http.cat/404.jpg",
        });
      });
  });
};

export default catRouter;
