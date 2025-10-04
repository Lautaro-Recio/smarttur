import * as React from "react";
import * as ReactDOM from "react-dom/client";
import MenuMain from "./components/Menu/MenuMain";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import SignIn from "./components/page/SignIn";
import Page from "./components/page/Page";
import AppProvider from "./AppProvider";
import Galery from "./components/galerry/Galery";
import GaleryCarrousel from "./components/galerry/GaleryCarrousel";
import NotFound from "./components/page/NotFound";

const router = createBrowserRouter([
  {
    path: "/menu",
    element: <MenuMain />,
  },
  {
    path: "/signIn",
    element: <SignIn />,
  },
  {
    path: "/",
    element: <Page />,
  },
  {
    path: "experience/:experienceId",
    element: <Galery/>,
  },
  {
    path: "experience/:experienceId/galery/:galeryId",
    element: <GaleryCarrousel/>,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </AppProvider>
);
