import { Cat, Dog, SignOut, UserCircle, UserList, Users } from "phosphor-react";
import { FormEvent } from "react";
import { NavLink } from "react-router-dom";

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
  const logout = (e: FormEvent) => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      {/* Menu para telas grandes */}
      <aside className="hidden min-h-screen w-fit flex-col items-center gap-3 bg-gray-800 p-3 pt-10 shadow-lg lg:flex">
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
            <button
              onClick={logout}
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-primary"
            >
              <SignOut /> Sair
            </button>
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
