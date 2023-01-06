import React from "react";
import { Cat, Dog, UserList, Users, UserCircle, SignOut } from "phosphor-react";

interface INavItem {
  name: string;
  icon: JSX.Element;
  href: string;
}

const navigation: INavItem[] = [
  {
    name: "Random Users",
    icon: <UserList size={24} weight="fill" />,
    href: "/users",
  },
  {
    name: "HTTP Cat",
    icon: <Cat size={24} weight="fill" />,
    href: "/cats",
  },
  {
    name: "Random Dog",
    icon: <Dog size={24} weight="fill" />,
    href: "/dogs",
  },
  {
    name: "Clients",
    icon: <Users size={24} weight="fill" />,
    href: "/clients",
  },
];

/* Recebe um numero que indica qual elemento do array acima está ativo */
const Sidemenu = ({ active }: { active: number }) => {
  return (
    <>
      <aside className="flex min-h-screen w-fit flex-col items-center gap-3 bg-gray-800 p-2 pt-10 shadow-lg">
        {/* Seção do perfil do usuario */}
        <div className="mx-auto flex items-center gap-1">
          <UserCircle size={48} color="white" weight="fill" />
          <div className="flex flex-col">
            <span className="overflow-hidden text-ellipsis font-bold">
              Olá, NOME
            </span>
            <a
              href="#"
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-primary"
            >
              <SignOut /> Sair
            </a>
          </div>
        </div>

        <hr className="my-1 w-[90%] border-gray-700" />

        {/* Seção de navegação */}
        <nav className="flex flex-col gap-2">
          {navigation.map((item, index) =>
            index === active ? (
              <a
                key={index + "-active"}
                href={item.href}
                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-gray-800"
              >
                {item.icon}
                <span>{item.name}</span>
              </a>
            ) : (
              <a
                key={index}
                href={item.href}
                className="flex items-center gap-2 rounded-lg px-4 py-2 transition ease-in-out hover:bg-primary hover:text-gray-800"
              >
                {item.icon}
                <span>{item.name}</span>
              </a>
            )
          )}
        </nav>
      </aside>
    </>
  );
};

export default Sidemenu;
