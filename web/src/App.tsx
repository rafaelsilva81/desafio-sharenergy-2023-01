import React, { ReactNode } from "react";

/* Pages */

import { Route, Routes, RouteProps } from "react-router";
import Layout from "./components/Layout";
import { BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
