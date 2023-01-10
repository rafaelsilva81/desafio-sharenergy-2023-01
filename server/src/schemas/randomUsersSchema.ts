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
        filter: {
          type: "string",
          enum: ["email", "name", "username"],
        },
        search: { type: "string" },
      },
      required: [],
    },
    response: {
      200: {
        description: "Retorna uma lista de usuários aleatórios",
        type: "object",
        properties: {
          "": {
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
                        password: { type: "string" },
                        salt: { type: "string" },
                        md5: { type: "string" },
                        sha1: { type: "string" },
                        sha256: { type: "string" },
                      },
                    },
                    dob: {
                      type: "object",
                      properties: {
                        date: { type: "string" },
                        age: { type: "integer" },
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
                type: "object",
                properties: {
                  seed: { type: "string" },
                  results: { type: "integer" },
                  page: { type: "integer" },
                  version: { type: "string" },
                },
              },
            },
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
