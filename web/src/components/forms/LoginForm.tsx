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
const formSchema = z.object({
  username: z.string({
    required_error: "Esse campo é obrigatório",
  }),
  password: z.string({
    required_error: "Esse campo é obrigatório",
  }),
  rememberMe: z.boolean(),
});

type formType = TypeOf<typeof formSchema>;

const LoginForm = () => {
  const [_, setLoginAction] = useAtom(loginActionAtom);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: localStorage.getItem("username") || "",
      password: localStorage.getItem("password") || "",
      rememberMe: localStorage.getItem("rememberMe") === "true" || false,
    },
  });

  const login = async (data: formType) => {
    setLoading(true);
    const res = await api
      .post("/auth/login", {
        username: data.username,
        password: data.password,
      })
      .then((res) => {
        if (data.rememberMe) {
          localStorage.setItem("password", data.password);
          localStorage.setItem("rememberMe", "true");
        }
        localStorage.setItem("username", data.username);
        localStorage.setItem("token", res.data.token);
        window.location.href = "/users";
      })
      .catch((err) => {
        toast(err.response.data.message, {
          type: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
    console.log(res);
  };

  const togglePassword = (e: FormEvent) => {
    e.preventDefault();
    setShowPass(!showPass);
  };

  return (
    <form
      className="flex flex-col justify-center gap-4"
      onSubmit={handleSubmit(login)}
    >
      {loading && <LoadingElement />}
      <h1 className="mb-6 text-center text-2xl font-bold text-primary">
        Faça login para continuar
      </h1>

      <div className="flex w-full flex-col gap-1">
        <label
          htmlFor="username"
          className="flex items-center gap-1 text-gray-400"
        >
          <User /> Nome de usuário
        </label>
        <input
          id="username"
          type="text"
          placeholder="Nome de usuário"
          className="h-12 rounded-md p-4"
          {...register("username")}
        />
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
      </div>

      <button
        type="submit"
        className="hover:text-gray-8 rounded-lg bg-white p-2 font-bold text-secondary transition duration-300 ease-in-out hover:bg-primary"
      >
        Login
      </button>

      <div className="flex flex-1 items-center gap-2">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...register("rememberMe")}
        />
        <label className="text-gray-400">Lembrar de mim</label>
      </div>

      <div className="flex items-center gap-1">
        <span className="text-gray-400">Não tem uma conta?</span>

        <a
          href="#"
          className="text-primary hover:text-secondary"
          onClick={(e) => {
            e.preventDefault();
            setLoginAction("register");
          }}
        >
          Cadastre-se
        </a>
      </div>
    </form>
  );
};

export default LoginForm;
