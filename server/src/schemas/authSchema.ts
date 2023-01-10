import { serverErrorSchema } from "./errors/serverErrorSchema";
const registerUserSchema = {
  schema: {
    description: "Registra um novo usuário",
    tags: ["AUTH"],
    body: {
      type: "object",
      properties: {
        username: { type: "string" },
        password: { type: "string" },
      },
    },
    response: {
      201: {
        description: "Usuário registrado com sucessso",
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
      409: {
        description: "Nome de usuário já registrado",
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
      500: {
        ...serverErrorSchema,
      },
    },
  },
};

const loginUserSchema = {
  schema: {
    description: "Faz login de um usuário",
    tags: ["AUTH"],
    body: {
      type: "object",
      properties: {
        username: { type: "string" },
        password: { type: "string" },
      },
    },
    response: {
      200: {
        description: "Login realizado com sucesso",
        type: "object",
        properties: {
          token: { type: "string" },
          user: {
            type: "object",
            properties: {
              id: { type: "string" },
              username: { type: "string" },
            },
          },
          message: { type: "string" },
        },
      },
      401: {
        description: "Nome de usuário ou senha inválidos",
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
      500: {
        ...serverErrorSchema,
      },
    },
  },
};

export { registerUserSchema, loginUserSchema };
