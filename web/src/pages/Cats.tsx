import { ChangeEvent, useEffect, useState } from "react";
import useSWR from "swr";
import LoadingElement from "../components/LoadingElement";
import { api } from "../lib/axios";
import { AxiosError } from "axios";
import { Cat } from "phosphor-react";

const Cats = () => {
  const [httpStatus, setHttpStatus] = useState(404);

  const { isLoading, data, error, mutate } = useSWR<Cat, AxiosError>(
    "/cats",
    async (url) => {
      const response = await api.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          code: httpStatus,
        },
      });
      return response.data;
    }
  );

  useEffect(() => {
    mutate();
  }, [httpStatus]);

  if (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  }

  return (
    <main className="flex w-full flex-1 flex-col items-center justify-center gap-8 p-8 md:flex-row">
      {isLoading && <LoadingElement />}
      {/* Input */}
      <div className="flex flex-col gap-4 md:w-1/2">
        <h1 className="font-bol flex cursor-pointer items-center gap-1 text-4xl">
          <Cat weight="fill" /> HTTP Cat
        </h1>
        <p className="text-lg">
          Digite um
          <a
            href="https://pt.wikipedia.org/wiki/Lista_de_c%C3%B3digos_de_estado_HTTP"
            rel="noreferrer"
            target="_blank"
            className="text-primary"
          >
            {" "}
            Código de Status HTTP{" "}
          </a>
          e receba uma imagem de um gatinho equivalente!
        </p>

        <div className="flex flex-col gap-2">
          <label htmlFor="httpStatus" className="text-gray-400">
            Código HTTP :
          </label>
          <input
            id="httpStatus"
            type="number"
            min="1"
            step="1"
            placeholder="404"
            className="h-12 rounded-md p-2"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setHttpStatus(Number(e.target.value))
            }
          />
          {!isLoading && error?.response?.status === 404 && (
            <p className="text-red-500">{"Gatinho não encontado! :("} </p>
          )}
        </div>
      </div>

      {/* Image */}
      <div className="flex flex-col gap-4 md:w-1/2">
        {data && (
          <>
            <img
              src={data.image}
              alt="HTTP Cat"
              className="bobject-cover rounded-md border-4 border-primary"
            />
          </>
        )}
      </div>
    </main>
  );
};

export default Cats;
