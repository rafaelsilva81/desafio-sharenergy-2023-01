import { FastifyInstance } from "fastify";
import { z } from "zod";
import db from "../lib/prisma";
import bcrypt from "bcrypt";

const userSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const authRouter = async (fastify: FastifyInstance) => {
  /* Registro de usuário */
  fastify.post("/register", async (request, reply) => {
    const { username, password } = userSchema.parse(request.body);
    const hashedPassword = await bcrypt.hash(password, 10);
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
        return reply.status(500).send({
          message: "Houve um erro ao criar o usuário",
          error: err,
        });
      });
  });

  /* Login de usuário */
  fastify.post("/login", async (request, reply) => {
    const { username, password } = userSchema.parse(request.body);

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

    reply.send({
      token,
      user: {
        id: user.id,
        username: user.username,
      },
      message: "Login realizado com sucesso",
    });
  });

  fastify.post("/validate", async (request, reply) => {
    const bodySchema = z.object({
      token: z.string(),
    });

    const { token } = bodySchema.parse(request.body);

    try {
      const decoded = fastify.jwt.verify(token);
      return reply.status(200).send({
        valid: true,
      });
    } catch (err) {
      return reply.status(403).send({
        valid: false,
      });
    }
  });
};

export default authRouter;
