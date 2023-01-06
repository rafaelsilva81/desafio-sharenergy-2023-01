import { useAtom } from "jotai";
import logo from "../assets/logo_color.png";
import LoginForm from "../components/forms/LoginForm";
import RegisterForm from "../components/forms/RegisterForm";
import { loginActionAtom } from "../lib/atoms";

const Login = () => {
  const [loginAction] = useAtom(loginActionAtom);

  return (
    <div className="justify-ve flex h-screen w-screen flex-col items-center gap-20 bg-main-pattern bg-cover p-20 md:flex-row">
      <section className="flex h-full flex-1 flex-col justify-around gap-8">
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

      <section className="flex h-full w-96 flex-col justify-center rounded-md bg-gray-800 p-8">
        {loginAction === "login" ? <LoginForm /> : <RegisterForm />}
      </section>
    </div>
  );
};

export default Login;
