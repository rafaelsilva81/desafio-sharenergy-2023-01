const unauthorizedSchema = {
  description: "Usuário não autenticado ou login inválido",
  type: "object",
  properties: {
    message: { type: "string" },
    error: {
      type: "object",
      properties: {
        name: { type: "string" },
        code: { type: "string" },
        message: { type: "string" },
        statusCode: { type: "number" },
      },
    },
  },
};

export { unauthorizedSchema };
