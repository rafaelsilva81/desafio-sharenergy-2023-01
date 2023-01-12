import { FastifyInstance } from "fastify";
import { z } from "zod";
import db from "../lib/prisma";
import bcrypt from "bcrypt";

/* Schemas */
import { loginUserSchema, registerUserSchema } from "../schemas/authSchema";

/* ZOD Validation */
const userBody = z.object({
  username: z.string(),
  password: z.string(),
});

const authRouter = async (fastify: FastifyInstance) => {
  /* Registro de usuário */
  fastify.post("/register", registerUserSchema, async (request, reply) => {
    const { username, password } = userBody.parse(request.body);
    const hashedPassword = await bcrypt.hash(password, 10);

    const userExists = await db.user.findUnique({
      where: {
        username,
      },
    });

    if (userExists) {
      return reply.status(409).send({
        message: "Nome de usuário já registrado",
      });
    }
    await db.user
      .create({
        data: {
          username,
          password: hashedPassword,
        },
      })
      .then((data) => {
        return reply.status(201).send({
          message: "Usuário criado com sucesso. Faça login para continuar",
        });
      })
      .catch((err: unknown) => {
        console.log(err);
        return reply.status(500).send({
          message: "Houve um erro ao criar o usuário",
        });
      });
  });

  /* Login de usuário */
  fastify.post("/login", loginUserSchema, async (request, reply) => {
    const { username, password } = userBody.parse(request.body);

    const user = await db.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return reply.status(401).send({
        message: "Nome de usuário ou senha inválidos",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      reply.status(401).send({
        message: "Nome de usuário ou senha inválidos",
      });
    }

    const token = fastify.jwt.sign({ uid: user.id });

    return reply.status(200).send({
      token,
      user: {
        id: user.id,
        username: user.username,
      },
      message: "Login realizado com sucesso",
    });
  });
};

export default authRouter;
