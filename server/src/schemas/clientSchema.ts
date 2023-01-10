import { unauthorizedSchema } from "./errors/unauthorizedSchema";
import { serverErrorSchema } from "./errors/serverErrorSchema";

/* GET */
const clientGetSchema = {
  schema: {
    tags: ["CLIENTS"],
    description: "Obtem a lista de clientes",
    params: {
      type: "object",
      properties: {
        userId: {
          type: "string",
          description: "ID do usuário relacionado com esse cliente",
        },
        page: { type: "number" },
      },
      required: [],
    },
    response: {
      200: {
        description: "Cliente deletado com sucesso",
        type: "object",
        properties: {
          clients: {
            type: "array",
            items: {
              type: "object",
              properties: {
                _id: { type: "string" },
                name: { type: "string" },
                email: { type: "string" },
                phone: { type: "string" },
                address: { type: "string" },
                cpf: { type: "string" },
                createdAt: { type: "string", format: "date-time" },
                updatedAt: { type: "string", format: "date-time" },
                user: {
                  type: "object",
                  properties: {
                    username: { type: "string" },
                  },
                },
                userId: { type: "string" },
              },
            },
          },
        },
      },
      500: { ...serverErrorSchema },
      401: { ...unauthorizedSchema },
    },
    security: [
      {
        Bearer: [],
      },
    ],
  },
};

/* POST */
const clientPostSchema = {
  schema: {
    tags: ["CLIENTS"],
    description: "Cria um novo cliente",
    body: {
      client: {
        type: "object",
        properties: {
          _id: { type: "string" },
          name: { type: "string" },
          email: { type: "string" },
          phone: { type: "string" },
          address: { type: "string" },
          cpf: { type: "string" },
          userId: { type: "string" },
        },
      },
    },
    response: {
      200: {
        description: "Cliente deletado com sucesso",
        type: "object",
        properties: {
          message: { type: "string" },
          client: {
            type: "object",
            properties: {
              _id: { type: "string" },
              name: { type: "string" },
              email: { type: "string" },
              phone: { type: "string" },
              address: { type: "string" },
              cpf: { type: "string" },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
              user: {
                type: "object",
                properties: {
                  username: { type: "string" },
                },
              },
              userId: { type: "string" },
            },
          },
        },
      },
      400: {
        description: "Já existe um cliente com esse email ou cpf",
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
      500: { ...serverErrorSchema },
      401: { ...unauthorizedSchema },
    },
    security: [
      {
        Bearer: [],
      },
    ],
  },
};

/* PUT */
const clientPutSchema = {
  schema: {
    tags: ["CLIENTS"],
    description: "Atualiza um cliente",
    params: {
      id: { type: "string", description: "id de um cliente" },
    },
    body: {
      type: "object",
      properties: {
        _id: { type: "string" },
        name: { type: "string" },
        email: { type: "string" },
        phone: { type: "string" },
        address: { type: "string" },
        cpf: { type: "string" },
      },
      required: [],
      additionalProperties: true,
    },
    response: {
      200: {
        description: "Cliente atualizado com sucesso",
        type: "object",
        properties: {
          message: { type: "string" },
          client: {
            type: "object",
            properties: {
              _id: { type: "string" },
              name: { type: "string" },
              email: { type: "string" },
              phone: { type: "string" },
              address: { type: "string" },
              cpf: { type: "string" },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
              user: {
                type: "object",
                properties: {
                  username: { type: "string" },
                },
              },
              userId: { type: "string" },
            },
          },
        },
      },
      400: {
        description: "Não existe um cliente com o ID solicitado",
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
      500: { ...serverErrorSchema },
      401: { ...unauthorizedSchema },
    },
    security: [
      {
        Bearer: [],
      },
    ],
  },
};

/* DELETE */
const clientDeleteSchema = {
  schema: {
    tags: ["CLIENTS"],
    description: "Deleta um cliente",
    params: {
      id: { type: "string", description: "id de um cliente" },
    },
    response: {
      200: {
        description: "Cliente deletado com sucesso",
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
      400: {
        description: "Não existe um cliente com o ID solicitado",
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
      500: { ...serverErrorSchema },
      401: { ...unauthorizedSchema },
    },
    security: [
      {
        Bearer: [],
      },
    ],
  },
};

export {
  clientGetSchema,
  clientPostSchema,
  clientDeleteSchema,
  clientPutSchema,
};
