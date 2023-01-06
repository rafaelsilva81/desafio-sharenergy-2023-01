import { Cat, Dog, UserList, Users, UserCircle, SignOut } from "phosphor-react";
import { NavLink } from "react-router-dom";
import useSWR from "swr";
import { api } from "../lib/axios";

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

const activeStyle =
  "flex items-center gap-2 rounded-lg px-4 py-2 transition ease-in-out bg-primary text-gray-800";
const inactiveStyle =
  "flex items-center gap-2 rounded-lg px-4 py-2 transition ease-in-out hover:bg-primary hover:text-gray-800";

const Sidemenu = () => {
  /*   const { data, error, isLoading } = useSWR("/auth/me", async (url) => {
    const response = await api.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  });

  if (error) {
    console.log(error);
  }

  console.log(data); */

  return (
    <>
      <aside className="flex min-h-screen w-fit flex-col items-center gap-3 bg-gray-800 p-3 pt-10 shadow-lg">
        {/* Seção do perfil do usuario */}
        <div className="mx-auto flex items-center gap-1">
          <UserCircle size={48} color="white" weight="fill" />
          <div className="flex flex-col">
            <span className="overflow-hidden text-ellipsis">
              Olá,{" "}
              <span className="font-bold">
                {localStorage.getItem("username")}
              </span>
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
          {navigation.map((item, index) => (
            <NavLink
              key={index}
              to={item.href}
              className={({ isActive }) => {
                return isActive ? activeStyle : inactiveStyle;
              }}
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidemenu;
