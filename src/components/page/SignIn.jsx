import { Button, Modal } from "react-bootstrap";
import "./page.css";
import logo from "../../assets/logo.png";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../../Firebase";
import { useState } from "react";

function SignIn() {
  const [show, setShow] = useState(false);

  const handleClose = (boolean) => {
    if (boolean) {
      window.location.href = "/menu";
    } else {
      window.location.href = "/";
    }
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const SignWhitGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);

      if (auth.currentUser.email === import.meta.env.VITE_REACT_APP_APP_EMAIL || auth.currentUser.email === import.meta.env.VITE_REACT_APP_APP_EMAIL2) {
        handleShow();
      } else {
        window.location.href = "/page";
      }

    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error.message);
    }
  };
  return (
    <div className="screen">
      <div className="curved">
        <div className="container ">
          <div className="bg-lightWhite padding">
            <h1 className="blue ">Bienvenido a Gruptur</h1>
            <p className="blue fontMid">
              ¿Listo para tu próxima escapada? Inicia sesión para disfrutar de todas las ventajas de ser miembro: acceso a ofertas exclusivas, historial de reservas, listas de deseos y mucho más. ¡Comienza a planificar tu viaje ideal!

            </p>
          </div>
          <div className="bg-lightWhite flexPhone">
            <img src={logo} alt="" />
            <Button onClick={SignWhitGoogle}>
              <ion-icon size="large" name="logo-google"></ion-icon>
              Iniciar sesion con google
            </Button>
          </div>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Administrador</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Hola! Estas por ingresar al administrador del sitio, deseas
              continuar?
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  handleClose(true);
                }}
              >
                Ir al administrador
              </Button>
              <Button variant="primary" onClick={() => handleClose(false)}>
                Ir a la Pagina
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
