import { AxiosError } from "axios";
import {
  CaretLeft,
  CaretRight,
  MagnifyingGlass,
  Pen,
  Plus,
  Trash,
  UsersThree,
} from "phosphor-react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import LoadingElement from "../components/LoadingElement";
import ClientModal from "../components/modals/ClientModal";
import { api } from "../lib/axios";

const Clients = () => {
  const [page, setPage] = useState(1);

  const [openModal, setOpenModal] = useState(false);
  const [client, setClient] = useState<Client>();
  const [action, setAction] = useState<"create" | "edit" | "view" | "delete">(
    "create"
  );

  const { data, error, isLoading, mutate } = useSWR<Client[], AxiosError>(
    "/clients/",
    async (url) => {
      const response = await api.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          userId: localStorage.getItem("username"),
          page: page,
        },
      });
      return response.data;
    }
  );

  useEffect(() => {
    mutate();
  }, [page]);
  if (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    } else {
      return (
        <h1 className="p-2">
          Erro ao carregar clientes. Por favor atualize a página
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
          <UsersThree size={24} />
          <h1 className="font-bold"> Clientes </h1>
        </div>
        <div className="flex flex-col gap-2 md:flex-row">
          <button
            className="flex items-center gap-2 rounded-md bg-neutral-300 p-2 text-gray-800 transition
           hover:bg-primary"
            onClick={() => {
              setClient(undefined);
              setAction("create");
              setOpenModal(true);
            }}
          >
            <Plus size={18} />
            Adicionar Cliente
          </button>
        </div>
      </section>

      {/* Items */}
      <section className="grid grid-cols-1 gap-2 md:grid-cols-3">
        {data?.map((client) => (
          <div
            key={client.id}
            className="flex items-center gap-4 rounded-lg bg-gray-800 p-4"
          >
            <div className="flex flex-col gap-1 break-all">
              <h1 className="font-bold">{client.name}</h1>
              <span className="text-sm font-bold text-primary">
                {client.email}
              </span>
              <div className="mt-1 flex gap-2">
                <button
                  className="transitionhover:bg-primary flex items-center gap-2 rounded-md bg-neutral-300 p-2 
                  text-gray-800 transition hover:bg-primary"
                  onClick={() => {
                    setClient(client);
                    setAction("view");
                    setOpenModal(true);
                  }}
                >
                  <MagnifyingGlass weight="fill" />
                </button>

                <button
                  className="flex items-center gap-2 rounded-md bg-neutral-300 p-2 text-gray-800 
                  transition hover:bg-primary"
                  onClick={() => {
                    setClient(client);
                    setAction("edit");
                    setOpenModal(true);
                  }}
                >
                  <Pen weight="fill" />
                </button>

                <button
                  className="flex items-center gap-2 rounded-md bg-neutral-300 p-2 text-gray-800 
                  transition hover:bg-primary"
                  onClick={() => {
                    setClient(client);
                    setAction("delete");
                    setOpenModal(true);
                  }}
                >
                  <Trash weight="fill" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Pagination */}
      <div className="flex items-center gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((prevPage) => prevPage - 1)}
          className="hover:text-primary disabled:pointer-events-none disabled:opacity-50"
        >
          <CaretLeft weight="fill" />
        </button>
        {page}
        <button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          className="hover:text-primary disabled:pointer-events-none disabled:opacity-50"
        >
          <CaretRight weight="fill" />
        </button>
      </div>

      {/* Modal */}
      <ClientModal
        isOpen={openModal}
        setIsOpen={setOpenModal}
        client={client}
        action={action}
      />
    </main>
  );
};

export default Clients;
