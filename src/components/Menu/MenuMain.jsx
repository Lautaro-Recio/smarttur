import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import "./MenuMain.css";
import AccordionMain from "./Accordion/AccordionMain";
import logo2 from "../../assets/logo2.png";
import logo from "../../assets/logo.png";

import { auth } from "../../../Firebase";

function MenuMain() {
  const [user, setUser] = useState(null);
  const [enter, setEnter] = useState(false);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          setUser(currentUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
        setUser(null);
      }
    };

    fetchCurrentUser();
  }, [enter]);

  return (
    <>
      <div className={` ${enter ? "fadeOutTop" : "enterMenu"} center`}>
        <div>
          <img src={logo} alt="" />
          <br />
          <Button onClick={() => setEnter(true)}>Ingresar al Menu</Button>
        </div>
      </div>

      {user && user.email === import.meta.env.VITE_REACT_APP_APP_EMAIL ? (
        <div>
          <div className="nav">
            <img src={logo2} alt="logo" />
            <h2 className="titles blue">Administrador Smart Tur</h2>
            <Button variant="primary">Salir del Administrador</Button>
          </div>
          <div>
            <AccordionMain />
          </div>
        </div>
      ) : (
        <div className="access-restricted">
          <h1>Acceso Restringido</h1>
        </div>
      )}
    </>
  );
}

export default MenuMain;
