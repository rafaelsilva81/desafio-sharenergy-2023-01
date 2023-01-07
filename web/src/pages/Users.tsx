import { AxiosError } from "axios";
import {
  CaretLeft,
  CaretRight,
  User,
} from "phosphor-react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import LoadingElement from "../components/LoadingElement";
import { api } from "../lib/axios";

/* TODO: Filter */
/* TODO: Filter */
const Users = () => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    mutate();
  }, [page]);

  const { data, error, isLoading, mutate } = useSWR<
    Users,
    AxiosError
  >("/random-users/", async (url) => {
    const response = await api.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "token"
        )}`,
      },
      params: {
        page: page,
      },
    });
    return response.data;
  });

  if (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    } else {
      return (
        <h1 className="p-2">
          Erro ao carregar usuários. Por favor atualize a
          página
        </h1>
      );
    }
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-8">
      {isLoading && <LoadingElement />}

      {/* Header */}
      <section className="flex items-center justify-center gap-4 rounded-lg bg-gray-800 p-4 md:justify-between">
        <div className="hidden items-center gap-1 md:flex">
          <User size={24} />
          <h1 className="font-bold">
            {" "}
            Usuários Aleatórios{" "}
          </h1>
        </div>
        <div className="flex flex-col gap-2 md:flex-row">
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
      <section className="grid grid-cols-1 gap-2 md:grid-cols-3">
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
            <div className="flex flex-col gap-1 break-all">
              <h1 className="font-bold">
                {user.name.first} {user.name.last}
              </h1>
              <span className="text-sm font-bold text-primary">
                {user.login.username}
              </span>
              <span className="text-sm text-gray-400">
                {user.dob.age} Anos{" "}
              </span>

              <h3 className="text-sm text-gray-400">
                {user.email}
              </h3>
            </div>
          </div>
        ))}
      </section>

      {/* Pagination */}
      <section className="flex items-center justify-between gap-4 rounded-lg bg-gray-800 p-4">
        <div className="flex items-center gap-2">
          <label htmlFor="page">Ir para a página :</label>
          <input
            type="number"
            className="decoration-none w-14 rounded-md p-1 text-center"
            onChange={(e) => {
              setPage(Number(e.target.value));
            }}
            value={page}
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            disabled={page === 1}
            onClick={() =>
              setPage((prevPage) => prevPage - 1)
            }
            className="hover:text-primary disabled:pointer-events-none disabled:opacity-50"
          >
            <CaretLeft weight="fill" />
          </button>
          {data?.info.page}
          <button
            onClick={() =>
              setPage((prevPage) => prevPage + 1)
            }
            className="hover:text-primary disabled:pointer-events-none disabled:opacity-50"
          >
            <CaretRight weight="fill" />
          </button>
        </div>
      </section>
    </main>
  );
};

export default Users;
