import { FastifyInstance } from "fastify";
import { z } from "zod";
import axios from "axios";
import onRequestValidation from "../utils/onRequestValidation";
import fs from "fs";

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

    const image = Buffer.from(data, "binary").toString("base64");

    return reply.status(200).send({
      image: `data:image/png;base64,${image}`,
    });
  });
};

export default catRouter;
