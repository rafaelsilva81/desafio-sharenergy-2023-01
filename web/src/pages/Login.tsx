import React from "react";
import logo from "../assets/logo_color.png";

const Login = () => {
  return (
    <div className="justify-ve flex h-screen w-screen items-center gap-20 bg-slate-900 bg-main-pattern bg-cover p-20">
      <section className="flex h-full flex-1 flex-col justify-around gap-8 text-white">
        <img src={logo} alt="Sharenergy" width={"200px"} className="" />

        <div>
          <h1 className="text-4xl font-bold leading-tight">
            Desafio Sharenergy 2023
          </h1>
          <p className="text-xl font-semibold leading-tight">
            Ajudamos pessoas e empresas a gerar a própria energia.
          </p>
          <p className="mt-6 leading-normal">
            Sabemos que negócios enfrentam desafios únicos e por isso oferecemos
            soluções turnkey, customizadas, economicamente viáveis e seguras. E
            acreditamos que as energias renováveis terão um lugar dominante em
            nossa economia pelo resto de nossas vidas.
          </p>
        </div>

        <div className="italic text-primary">
          <span>
            Desenvolvido com ❤️ por{" "}
            <a
              href="https://rafaeldev.me"
              className="underline hover:text-secondary"
              target="_blank"
              rel="noreferrer noopener"
            >
              @rafaelsilva81
            </a>
          </span>
        </div>
      </section>

      <section className="flex h-full flex-1 justify-center">
        <form className="flex h-full w-96 flex-col justify-center gap-4 rounded-md bg-gray-800 p-8">
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
              target="_blank"
              rel="noreferrer noopener"
            >
              Cadastre-se
            </a>
          </div>
          <div className="flex justify-center">
            <a
              href="#"
              className="text-gray-400 hover:text-secondary"
              target="_blank"
              rel="noreferrer noopener"
            >
              Esqueceu a senha?
            </a>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
