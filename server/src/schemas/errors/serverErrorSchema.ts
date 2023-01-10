const serverErrorSchema = {
  description: "Erro interno do servidor",
  type: "object",
  properties: {
    message: { type: "string" },
  },
};

export { serverErrorSchema };
