
import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router";
import App from "./App";
import Home from "./Sidor/home";
import Produkter from "./Sidor/produkter";
import Login from "./Sidor/login";
import Admin from "./Sidor/admin";
import About from "./Sidor/about";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,  //innehåller Header, Footer och Outlet
    children: [
      { index: true, element: <Home /> },
      { path: "produkter", element: <Produkter /> },
      { path: "login", element: <Login /> },
      { path: "admin", element: <Admin /> },
      { path: "about", element: <About /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

