import { serverErrorSchema } from "./errors/serverErrorSchema";
import { unauthorizedSchema } from "./errors/unauthorizedSchema";

const getCatsSchema = {
  schema: {
    tags: ["CATS"],
    description:
      "Retorna um gato de acordo com o valor do código HTTP do parametro",
    params: {
      type: "object",
      properties: {
        code: {
          type: "string",
          description: "Um código HTTP Válido",
        },
      },
    },
    response: {
      200: {
        description:
          "Retorna uma imagem em base64 gato de acordo com o código HTTP",
        type: "object",
        properties: {
          image: { type: "string" },
        },
      },
      404: {
        description: "Gato não encontrado com o código enviado",
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

export { getCatsSchema };
