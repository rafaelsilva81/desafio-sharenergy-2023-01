import { unauthorizedSchema } from "./errors/unauthorizedSchema";
import { serverErrorSchema } from "./errors/serverErrorSchema";

const getDogsSchema = {
  schema: {
    tags: ["DOGS"],
    description: "Retorna um cachorro aleatório",
    response: {
      200: {
        description:
          "Retorna uma URL para uma imagem ou vídeo de um cachorro aleatório",
        type: "object",
        properties: {
          image: { type: "string" },
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

export { getDogsSchema };
