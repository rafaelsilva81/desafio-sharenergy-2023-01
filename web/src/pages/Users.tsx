import { AxiosError } from "axios";
import { MagnifyingGlass, User } from "phosphor-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import useSWRImmutable from "swr/immutable";
import ErrorElement from "../components/errors/ErrorElement";
import LoadingElement from "../components/LoadingElement";
import Pagination from "../components/Pagination";
import { api } from "../lib/axios";

/* TODO: Filter */

const Users = () => {
  const [page, setPage] = useState(1);

  const filter = useRef<HTMLSelectElement>(null);
  const search = useRef<HTMLInputElement>(null);

  const { data, error, isLoading, mutate, isValidating } = useSWRImmutable<
    Users,
    AxiosError
  >("/random-users/", async (url) => {
    const response = await api.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      params: {
        page: page,
        ...(search && { search: search.current?.value }),
        ...(filter && { filter: filter.current?.value }),
      },
    });
    return response.data;
  });

  useEffect(() => {
    mutate();
  }, [page]);

  if (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    } else {
      return (
        <ErrorElement message="Houve um erro ao obter os dados, por favor tente novamente em alguns instantes" />
      );
    }
  }

  const updateSearch = (e: FormEvent) => {
    e.preventDefault();
    mutate();
  };

  console.log(data);
  return (
    <main className="flex flex-1 flex-col gap-4 p-8">
      {isLoading || (isValidating && <LoadingElement />)}

      {/* Header */}
      <section className="flex items-center justify-center gap-4 rounded-lg bg-gray-800 p-4 md:justify-between">
        <div className="hidden items-center gap-1 md:flex">
          <User size={24} />
          <h1 className="font-bold"> Usuários Aleatórios </h1>
        </div>
        <div className="flex flex-col gap-2 md:flex-row">
          <input
            type="text"
            ref={search}
            placeholder="Pesquisa"
            className="rounded-md p-2"
          />
          <select
            name="search"
            id="search"
            ref={filter}
            className="rounded-md p-2 text-black"
          >
            <option value="name">Nome</option>
            <option value="email">Email</option>
            <option value="phone">Nome de Usuário</option>
          </select>
          <button
            className="flex items-center justify-center gap-1 rounded-md bg-primary p-2 text-gray-800"
            onClick={updateSearch}
          >
            <MagnifyingGlass />
            Pesquisar
          </button>
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
              src={user.picture.medium}
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

              <h3 className="text-sm text-gray-400">{user.email}</h3>
            </div>
          </div>
        ))}
      </section>

      {/* Pagination */}
      <Pagination page={page} setPage={setPage} />
    </main>
  );
};

export default Users;
