import { FastifyInstance } from "fastify";
import { z } from "zod";
import api from "../lib/axios";
import { getRandomUsersSchema } from "../schemas/randomUsersSchema";
import onRequestValidation from "../utils/onRequestValidation";

const baseUrl =
  "https://randomuser.me/api/?seed=rafaelsilva81&nat=br&inc=picture,name,email,login,dob,login";
const baseResults = 30;

const randomUserRouter = async (fastify: FastifyInstance) => {
  onRequestValidation(fastify);

  fastify.get("/", getRandomUsersSchema, async (request, reply) => {
    const querySchema = z.object({
      page: z.string().transform((value) => Number(value)),
      filter: z.enum(["name", "email", "username"]).optional(),
      search: z.string().optional(),
    });

    const { page, filter, search } = querySchema.parse(request.query);

    const { data }: { data: Users } = await api.get(
      // Obter mais resultados caso haja filtro
      `${baseUrl}&results=${baseResults}&page=${page}`
    );

    fastify.cache.set("random-users", data, 60 * 60 * 24, (err) => {
      if (err) return reply.send(err);

      if (filter && search) {
        console.log("FILTRANDO");
        switch (filter) {
          case "name":
            data.results = data.results.filter((user) =>
              user.name.first.includes(search)
            );
            break;
          case "email":
            data.results = data.results.filter((user) =>
              user.email.includes(search)
            );
            break;
          case "username":
            data.results = data.results.filter((user) =>
              user.login.username.includes(search)
            );
            break;
        }
      }

      reply.send(data);
      console.log("Cache setted! (random-users)");
    });
  });

  /* TODO: Filter */
};

export default randomUserRouter;
