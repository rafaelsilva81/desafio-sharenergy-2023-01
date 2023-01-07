import { Dialog } from "@headlessui/react";
import { User, X } from "phosphor-react";
import { api } from "../../lib/axios";
import ClientForm from "../forms/ClientForm";

/* TODO: Melhor popups de alerta (react-toastify) */

interface IClientModal {
  client?: Client;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  action: "create" | "edit" | "view" | "delete";
}

const ClientModal = (props: IClientModal) => {
  const { client, isOpen, setIsOpen, action } = props;

  const deleteClient = (client: Client) => async () => {
    await api
      .delete("/clients/" + client.id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: {
          id: client.id,
        },
      })
      .then(() => {
        setIsOpen(false);
      })
      .catch((err) => {
        alert("Erro ao excluir cliente. Por favor tente novamente.");
        console.log(err);
      });
  };

  // Detectar clique fora do modal

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed inset-0 flex items-center justify-center rounded-md bg-slate-900 bg-opacity-70"
    >
      <Dialog.Panel>
        {action === "delete" && client && (
          <div className="flex flex-col justify-center rounded-md bg-gray-800 p-8">
            <h1 className="text-center text-xl font-bold">
              Deseja realmente excluir o cliente
              <span className="text-primary"> {client?.name}</span>?
            </h1>
            <span className="mb-2 text-gray-400">
              Esta ação não poderá ser desfeita.
            </span>
            <hr />
            <div className="mt-4 flex gap-4">
              <button
                onClick={deleteClient(client)}
                className="rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-600"
              >
                Excluir
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded bg-gray-500 py-2 px-4 font-bold text-white hover:bg-gray-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {action === "create" ||
          (action === "edit" && (
            <ClientForm client={client} action={action} setIsOpen={setIsOpen} />
          ))}

        {action === "view" && client && (
          <div className="flex flex-col">
            {/* Header */}
            <div className="flex w-full justify-between rounded-t-md bg-slate-900 p-4">
              <h1 className="text-center text-xl font-bold">
                Visualizar cliente
              </h1>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:text-red-500"
              >
                <X size={24} />
              </button>
            </div>

            {/* Body */}
            <div className="flex flex-col items-center justify-center rounded-md bg-gray-800 p-8">
              <User size={80} />
              <h1 className="text-center text-2xl font-bold text-primary">
                {client?.name}
              </h1>
              <hr />
              <div className="mt-4 flex flex-col gap-4">
                <span className="text-gray-400">Email: {client?.email}</span>
                <span className="text-gray-400">Telefone: {client?.phone}</span>
                <span className="text-gray-400">
                  Endereço: {client?.address}
                </span>
                <span className="text-gray-400">Cidade: {client?.cpf}</span>
              </div>
            </div>
          </div>
        )}
      </Dialog.Panel>
    </Dialog>
  );
};

export default ClientModal;
