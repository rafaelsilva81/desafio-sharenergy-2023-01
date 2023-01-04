import React from "react";
import useSWR from "swr";
import Sidemenu from "../components/Sidemenu";
import { api } from "../lib/axios";

const Cats = () => {
  const [status, setStatus] = React.useState(200);

  return (
    <div>
      <Sidemenu active={1} />
    </div>
  );
};

export default Cats;
