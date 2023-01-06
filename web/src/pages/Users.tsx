import { AxiosError } from "axios";
import { CaretLeft, CaretRight, User } from "phosphor-react";
import useSWR from "swr";
import { api } from "../lib/axios";

/* TODO: Filtro */
const Users = () => {
  const { data, error, isLoading, mutate } = useSWR<Users, AxiosError>(
    "/random-users/",
    async (url) => {
      const response = await api.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    }
  );

  if (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.reload();
    } else {
      return (
        <h1 className="p-2">
          Erro ao carregar usuários. Por favor atualize a página
        </h1>
      );
    }
  }

  return (
    <main className="flex w-full flex-1 flex-col gap-4 p-8">
      {isLoading && <h1>Loading...</h1>}

      {/* Header */}
      <section className="flex items-center justify-between gap-4 rounded-lg bg-gray-800 p-4">
        <div className="flex items-center gap-1">
          <User size={24} />
          <h1 className="font-bold"> Usuários Aleatórios </h1>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Pesquisar por"
            className="rounded-md p-2"
          />
          <select
            name="search"
            id="search"
            className="rounded-md p-2 text-black"
          >
            <option value="name">Nome</option>
            <option value="email">Email</option>
            <option value="phone">Nome de Usuário</option>
          </select>
        </div>
      </section>

      {/* User list */}
      <section className="flex w-full flex-col gap-1">
        {data?.results.map((user) => (
          <div
            key={user.login.uuid}
            className="flex items-center gap-4 rounded-lg bg-gray-800 p-4"
          >
            <img
              src={user.picture.large}
              alt={user.name.first}
              className="rounded-full"
              width={64}
            />
            <div className="flex flex-col gap-1">
              <h1 className="font-bold">
                {user.name.first} {user.name.last} - {user.dob.age} anos
              </h1>
              <span className="text-gray-400">{user.login.username}</span>

              <span className="text-gray-400">{user.email}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Pagination */}
      <section className="flex items-center justify-center gap-4 rounded-lg bg-gray-800 p-4">
        <div className="flex items-center gap-4">
          <CaretLeft weight="fill" />
          {data?.info.page}
          <CaretRight weight="fill" />
        </div>
      </section>
    </main>
  );
};

export default Users;
