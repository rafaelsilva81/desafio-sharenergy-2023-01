import { zodResolver } from "@hookform/resolvers/zod";
import { Pen, Plus, User, X } from "phosphor-react";
import { useForm } from "react-hook-form";
import { TypeOf, z } from "zod";
import { api } from "../../lib/axios";

/* TODO melhorar mensagens de erro e alertas (REACT-TOASTIFY) */

interface IClientForm {
  client?: Client;
  action: "create" | "edit";
  setIsOpen: (isOpen: boolean) => void;
  update: () => void;
}

const formSchema = z.object({
  name: z.string({
    required_error: "Esse campo é obrigatório",
  }),
  email: z
    .string({
      required_error: "Esse campo é obrigatório",
    })
    .email({
      message: "Entre um endereço de e-mail válido",
    }),
  phone: z.string({
    required_error: "Esse campo é obrigatório",
  }),
  address: z.string({
    required_error: "Esse campo é obrigatório",
  }),
  cpf: z
    .string({
      required_error: "Esse campo é obrigatório",
    })
    .regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, {
      message: "Entre um cpf no formato XXX.XXX.XX-XX",
    }),
});

type formType = TypeOf<typeof formSchema>;

const ClientForm = (props: IClientForm) => {
  const { client, action, setIsOpen, update } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
  });

  const createClient = async (data: formType) => {
    await api
      .post(
        "/clients",
        {
          ...data,
          userId: localStorage.getItem("username"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          alert("Cliente criado com sucesso!");
          setIsOpen(false);
          update();
        } else {
          alert("Erro ao criar cliente");
        }
      })
      .catch((err) => {
        alert("Erro ao criar cliente");
      });
  };

  const editClient = async (data: formType) => {
    if (client) {
      await api
        .put(
          `/clients/${client?.id}`,
          {
            ...data,
            userId: localStorage.getItem("username"),
            params: {
              id: client.id,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            alert("Cliente editado com sucesso!");
            setIsOpen(false);
            update();
          } else {
            alert("Erro ao editar cliente");
          }
        })
        .catch((err) => {
          alert("Erro ao editar cliente");
        });
    } else {
      alert("Erro ao editar cliente");
    }
  };

  return (
    <form
      className="flex flex-col items-center gap-10 rounded-md bg-gray-800 p-8 lg:flex-row"
      onSubmit={handleSubmit(action === "create" ? createClient : editClient)}
    >
      <div className="flex flex-col items-center justify-center">
        <User size={80} />
        <h1 className="text-center text-2xl font-bold text-primary">
          {action === "create" ? "Cadastrar" : "Editar"} cliente
        </h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          {/* Nome */}
          <label htmlFor="name">
            Nome
            {action === "create" && <span className="text-red-500"> * </span>}
          </label>
          <input
            {...register("name")}
            required
            id="name"
            type="text"
            className="h-12 rounded-md p-2"
            defaultValue={client?.name}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email">
            Email
            {action === "create" && <span className="text-red-500"> * </span>}
          </label>
          <input
            {...register("email")}
            required
            id="email"
            type="text"
            className="h-12 rounded-md p-2"
            defaultValue={client?.email}
          />
        </div>

        {/* Telefone */}
        <div className="flex flex-col gap-1">
          <label htmlFor="phone">
            Telefone
            {action === "create" && <span className="text-red-500"> * </span>}
          </label>
          <input
            {...register("phone")}
            required
            id="phone"
            type="text"
            className="h-12 rounded-md p-2"
            defaultValue={client?.phone}
          />
        </div>

        {/* Endereço */}
        <div className="flex flex-col gap-1">
          <label htmlFor="address">
            Endereço
            {action === "create" && <span className="text-red-500"> * </span>}
          </label>
          <input
            {...register("address")}
            required
            id="address"
            type="text"
            className="h-12 rounded-md p-2"
            defaultValue={client?.address}
          />
        </div>

        {/* CPF */}
        <div className="flex flex-col gap-1">
          <label htmlFor="cpf">
            CPF
            {action === "create" && <span className="text-red-500"> * </span>}
          </label>
          <input
            {...register("cpf")}
            required
            id="cpf"
            type="text"
            className="h-12 rounded-md p-2"
            defaultValue={client?.cpf}
          />
        </div>

        {/* Botões */}
        <div className="mt-7 flex gap-2 font-bold">
          <button
            type="submit"
            className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-white p-2 
          text-gray-800 transition ease-in-out hover:bg-primary"
          >
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
            className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-red-500 p-2 text-white transition ease-in-out hover:bg-red-600"
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
