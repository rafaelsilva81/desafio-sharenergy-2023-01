import { unauthorizedSchema } from "./errors/unauthorizedSchema";
import { serverErrorSchema } from "./errors/serverErrorSchema";

const getRandomUsersSchema = {
  schema: {
    tags: ["RANDOM USERS"],
    description:
      "Retorna uma lista de usuários aleatórios. É possível aplicar um filtro para buscar por nome, email ou username",
    params: {
      type: "object",
      properties: {
        page: { type: "number" },
      },
      required: [],
    },
    response: {
      200: {
        description: "Retorna uma lista de usuários aleatórios",
        type: "object",
        properties: {
          results: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    first: { type: "string" },
                    last: { type: "string" },
                  },
                },
                email: { type: "string" },
                login: {
                  type: "object",
                  properties: {
                    uuid: { type: "string" },
                    username: { type: "string" },
                  },
                },
                dob: {
                  type: "object",
                  properties: {
                    date: { type: "string" },
                    age: { type: "number" },
                  },
                },
                picture: {
                  type: "object",
                  properties: {
                    large: { type: "string" },
                    medium: { type: "string" },
                    thumbnail: { type: "string" },
                  },
                },
              },
            },
          },
          info: {
            seed: { type: "string" },
            results: { type: "number" },
            page: { type: "number" },
            version: { type: "string" },
          },
        },
      },
      500: {
        ...serverErrorSchema,
      },
      401: { ...unauthorizedSchema },
    },
    security: [
      {
        Bearer: [],
      },
    ],
  },
};

export { getRandomUsersSchema };
