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
    element: <Galery/>,
  },
  {
    path: "page/experience/:experienceId/galery/:galeryId",
    element: <GaleryCarrousel/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </AppProvider>
);
