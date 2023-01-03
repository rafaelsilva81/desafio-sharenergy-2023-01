import { FastifyInstance } from "fastify";
import { z } from "zod";
import axios from "axios";
import onRequestValidation from "../utils/onRequestValidation";

const catRouter = async (fastify: FastifyInstance) => {
  onRequestValidation(fastify);

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

export default catRouter;
