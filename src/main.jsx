import * as React from "react";
import * as ReactDOM from "react-dom/client";
import MenuMain from "./components/Menu/MenuMain";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import SignIn from "./components/page/SignIn";
import Page from "./components/page/Page";
import AppProvider from "./AppProvider";

const router = createBrowserRouter([
  {
    path: "/menu",
    element: <MenuMain />,
  },
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/page",
    element: <Page />,
  },
  {
    path: "page/experience/:experienceId",
    element: <h1>Hola</h1>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </AppProvider>
);
