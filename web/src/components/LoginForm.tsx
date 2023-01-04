import React from "react";
import { loginActionAtom } from "../lib/atoms";
import { useAtom } from "jotai";

const LoginForm = () => {
  const [_, setLoginAction] = useAtom(loginActionAtom);
  return (
    <form className="flex flex-col justify-center gap-4">
      <h1 className="mb-6 text-center text-2xl font-bold text-primary">
        Faça login para continuar
      </h1>
      <input
        type="text"
        placeholder="Nome de usuário"
        className="h-12 rounded-md p-2"
      />
      <input
        type="password"
        placeholder="Senha"
        className="h-12 rounded-md p-2"
      />
      <button
        type="submit"
        className="rounded-lg bg-white p-2 font-bold text-secondary transition duration-300 ease-in-out hover:bg-secondary hover:text-white"
      >
        Login
      </button>

      <div className="flex justify-center gap-1">
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
