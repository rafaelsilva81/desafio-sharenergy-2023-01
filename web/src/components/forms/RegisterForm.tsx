import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { Eye, EyeClosed, Lock, User } from "phosphor-react";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { TypeOf } from "zod/lib";
import { loginActionAtom } from "../../lib/atoms";
import { api } from "../../lib/axios";
import LoadingElement from "../LoadingElement";

const formSchema = z
  .object({
    username: z
      .string({
        required_error: "Esse campo é obrigatório",
      })
      .min(3, { message: "Minimo de 3 caracteres" })
      .max(255),
    password: z
      .string({
        required_error: "Esse campo é obrigatório",
      })
      .min(6, { message: "Minimo de 6 caracteres" })
      .max(255),
    passwordConfirmation: z.string({
      required_error: "Esse campo é obrigatório",
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "As senhas não são iguais",
    path: ["passwordConfirmation"],
  });

type formType = TypeOf<typeof formSchema>;

const RegisterForm = () => {
  const [_, setLoginAction] = useAtom(loginActionAtom);
  const [loading, setLoading] = useState(false);

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
  });

  const registerUser = async (data: formType) => {
    setLoading(true);
    const res = await api
      .post("/auth/register", {
        username: data.username,
        password: data.password,
      })
      .then((res) => {
        toast("Usuário registrado com sucesso! Faça login para continuar", {
          type: "success",
        });
        setLoginAction("login");
      })
      .catch((err) => {
        toast(err.response.data.message, {
          type: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const togglePassword = (e: FormEvent) => {
    e.preventDefault();
    setShowPass(!showPass);
  };

  const togglePasswordConfirm = (e: FormEvent) => {
    e.preventDefault();
    setShowConfirmPass(!showConfirmPass);
  };

  return (
    <form
      className="flex flex-col justify-center gap-4"
      onSubmit={handleSubmit(registerUser)}
    >
      {loading && <LoadingElement />}
      <h1 className="mb-6 text-center text-2xl font-bold text-primary">
        Faça seu cadastro
      </h1>

      <div className="flex w-full flex-col gap-1">
        <label
          htmlFor="username"
          className="flex items-center gap-1 text-gray-400"
        >
          <User /> Nome de usuário
        </label>
        <input
          {...register("username", { required: true })}
          type="text"
          required
          placeholder="Nome de usuário"
          className="h-12 rounded-md p-4"
        />
        {errors.username && (
          <span className="text-sm text-red-500">
            {errors.username.message}
          </span>
        )}
      </div>

      <div className="flex w-full flex-col gap-1">
        <label
          htmlFor="username"
          className="flex items-center gap-1 text-gray-400"
        >
          <Lock /> Senha
        </label>

        <div className="p- flex h-12 items-center rounded-md bg-white p-2">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Senha"
            className="flex-1 p-2"
            {...register("password")}
          />
          <button onClick={togglePassword}>
            {showPass ? (
              <EyeClosed className="text-black" size={20} />
            ) : (
              <Eye className="text-black" size={20} />
            )}
          </button>
        </div>
        {errors.password && (
          <span className="text-sm text-red-500">
            {errors.password.message}
          </span>
        )}
      </div>

      <div className="flex w-full flex-col gap-1">
        <label
          htmlFor="username"
          className="flex items-center gap-1 text-gray-400"
        >
          <Lock /> Confirmar senha
        </label>
        <div className="p- flex h-12 items-center rounded-md bg-white p-2">
          <input
            {...register("passwordConfirmation", { required: true })}
            type={showConfirmPass ? "text" : "password"}
            required
            placeholder="Confirme sua senha"
            className="h-12 rounded-md p-4"
          />
          <button onClick={togglePasswordConfirm}>
            {showConfirmPass ? (
              <EyeClosed className="text-black" size={20} />
            ) : (
              <Eye className="text-black" size={20} />
            )}
          </button>
        </div>
        {errors.passwordConfirmation && (
          <span className="text-sm text-red-500">
            {errors.passwordConfirmation.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="rounded-lg bg-white p-2 font-bold text-secondary transition duration-300 ease-in-out hover:bg-secondary hover:text-white"
      >
        Cadastro
      </button>

      <div className="flex items-center gap-1">
        <span className="text-gray-400">Já possui uma conta?</span>

        <a
          href="#"
          className="text-primary hover:text-secondary"
          onClick={(e) => {
            e.preventDefault();
            setLoginAction("login");
          }}
        >
          Fazer Login.
        </a>
      </div>
    </form>
  );
};

export default RegisterForm;
