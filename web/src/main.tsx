import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/* Pages */
import Cats from "./pages/Cats";
import Login from "./pages/Login";
import ErrorPage from "./components/ErrorPage";
import Dogs from "./pages/Dogs";
import Users from "./pages/Users";
import Clients from "./pages/Clients";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/cats",
    element: <Cats />,
  },
  {
    path: "/dogs",
    element: <Dogs />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/clients",
    element: <Clients />,
  },
  {
    path: "/403",
    element: (
      <ErrorPage
        statusCode="403"
        message="Você não tem permissão para acessar essa página"
      />
    ),
  },
  {
    path: "*",
    element: <ErrorPage statusCode="404" message="Página não encontrada" />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
