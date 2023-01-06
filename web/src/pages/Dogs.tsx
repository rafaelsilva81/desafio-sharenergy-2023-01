import { AxiosError } from "axios";
import { Dog } from "phosphor-react";
import { FormEvent } from "react";
import useSWRImmutable from "swr/immutable";
import { revalidateEvents } from "swr/_internal";
import LoadingElement from "../components/LoadingElement";
import { api } from "../lib/axios";

const Dogs = () => {
  const { data, error, isLoading, mutate } = useSWRImmutable<Dog, AxiosError>(
    "/dogs",
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
          Erro ao carregar o cachorro. Por favor atualize a página
        </h1>
      );
    }
  }

  return (
    <main className="flex w-full flex-1 flex-col items-center justify-center gap-8 p-8 md:flex-row">
      {isLoading && <LoadingElement />}

      {/* Input */}
      <div className="flex flex-col gap-4 md:w-1/2">
        <h1 className="font-bol flex cursor-pointer items-center gap-1 text-4xl">
          <Dog weight="fill" /> Random Dog
        </h1>
        <p className="text-lg">
          Receba uma imagem ou um video de um cachorrinho aleatório. Clique no
          item para gerar um novo!
        </p>
      </div>

      {/* Image */}
      <div className="flex flex-col gap-4 md:w-1/2">
        {data && (
          <button
            onClick={() => {
              mutate();
            }}
            className="hover:opacity-60"
          >
            {/* Checar se é mp4 */}
            {data.image.endsWith(".mp4") ? (
              <video
                src={data.image}
                className="rounded-md border-4 border-primary object-cover"
                autoPlay
                loop
              />
            ) : (
              <img
                src={data.image}
                alt="dog"
                className="rounded-md border-4 border-primary object-cover"
              />
            )}
          </button>
        )}
      </div>
    </main>
  );
};

export default Dogs;
