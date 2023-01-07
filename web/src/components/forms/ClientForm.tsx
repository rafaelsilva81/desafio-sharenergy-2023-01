import { Pen, Plus, User, X } from "phosphor-react";

interface IClientForm {
  client?: Client;
  action: "create" | "edit";
  setIsOpen: (isOpen: boolean) => void;
}

const ClientForm = (props: IClientForm) => {
  const { client, action, setIsOpen } = props;

  return (
    <form className="flex flex-col items-center gap-10 rounded-md bg-gray-800 p-8 lg:flex-row">
      <div className="flex flex-col items-center justify-center">
        <User size={80} />
        <h1 className="text-center text-2xl font-bold text-primary">
          {action === "create" ? "Cadastrar" : "Editar"} cliente
        </h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="name">
            Nome
            {action === "create" && <span className="text-red-500"> * </span>}
          </label>
          <input
            id="name"
            type="text"
            className="h-12 rounded-md p-2"
            defaultValue={client?.name}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email">
            Email
            {action === "create" && <span className="text-red-500"> * </span>}
          </label>
          <input
            id="email"
            type="text"
            className="h-12 rounded-md p-2"
            defaultValue={client?.email}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="phone">
            Telefone
            {action === "create" && <span className="text-red-500"> * </span>}
          </label>
          <input
            id="phone"
            type="text"
            className="h-12 rounded-md p-2"
            defaultValue={client?.phone}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="address">
            Endereço
            {action === "create" && <span className="text-red-500"> * </span>}
          </label>
          <input
            id="address"
            type="text"
            className="h-12 rounded-md p-2"
            defaultValue={client?.address}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="cpf">
            CPF
            {action === "create" && <span className="text-red-500"> * </span>}
          </label>
          <input
            id="cpf"
            type="text"
            className="h-12 rounded-md p-2"
            defaultValue={client?.cpf}
          />
        </div>

        <div className="flex flex-col gap-2">
          <button className="flex items-center justify-center gap-1 rounded-lg bg-white p-2 text-gray-800 transition ease-in-out hover:bg-primary">
            {action === "create" ? (
              <>
                <Plus weight="fill" />
                Cadastrar
              </>
            ) : (
              <>
                <Pen weight="fill" />
                Editar
              </>
            )}
          </button>

          <button
            className="flex items-center justify-center gap-1 rounded-lg bg-white p-2 text-gray-800 transition ease-in-out hover:bg-red-500"
            onClick={() => setIsOpen(false)}
          >
            <X weight="fill" />
            Cancelar
          </button>
        </div>
      </div>
    </form>
  );
};

export default ClientForm;
