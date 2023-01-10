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

  fastify.get("/", async (request, reply) => {
    const querySchema = z.object({
      page: z.string().transform((value) => Number(value)),
      filter: z.enum(["name", "email", "username"]).optional(),
      search: z.string().optional(),
      // Enum não é a melhor opção, mas é o que é suportado pelo zod
    });

    const { page, filter, search } = querySchema.parse(request.query) || 1;

    try {
      const { data }: { data: Users } = await api.get(
        // Obter mais resultados caso haja filtro
        `${baseUrl}&results=${filter ? 100 : baseResults}&page=${page}`
      );

      if (filter && search) {
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

        data.results = data.results.slice(page - 1, baseResults);
      }

      return reply.send(data);
    } catch (error) {}
  });

  /* TODO: Filter */
};

export default randomUserRouter;
