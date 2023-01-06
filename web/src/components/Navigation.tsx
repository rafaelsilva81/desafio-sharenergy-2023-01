import React from "react";
import { Route, Routes } from "react-router-dom";
import Cats from "../pages/Cats";
import Clients from "../pages/Clients";
import Dogs from "../pages/Dogs";
import Users from "../pages/Users";

const Navigation = () => {
  return (
    <>
      <Routes>
        <Route path="/cats" element={<Cats />} />
        <Route path="/dogs" element={<Dogs />} />
        <Route path="/users" element={<Users />} />
        <Route path="/clients" element={<Clients />} />
      </Routes>
    </>
  );
};

export default Navigation;
