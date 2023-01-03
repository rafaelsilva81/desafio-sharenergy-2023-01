import React from "react";
import useSWR from "swr";
import { api } from "../lib/axios";

const Cats = () => {
  const [status, setStatus] = React.useState(200);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">
        <span className="text-primary">HTTP</span>
        <span className="text-white">Status</span>
        <span className="text-secondary">Cat</span>
      </h1>

      <div className="flex flex-col items-center justify-center gap-1">
        <input
          type="text"
          name="status"
          id="status"
          placeholder="Entre um código de status HTTP (ex: 200)"
          className="h-8 w-full rounded-md p-4"
        />
      </div>
    </div>
  );
};

export default Cats;
