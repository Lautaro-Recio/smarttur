import { Button, Modal } from "react-bootstrap";
import "./page.css";
import logo from "../../assets/logo.png";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../../Firebase";
import { useState } from "react";

function SignIn() {
  const [userGoogle, setUserGogle] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = (boolean) => {
    if (boolean) {
      window.location.href = "/menu";
    } else {
      window.location.href = "/page";
    }
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const SignWhitGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setUserGogle(auth.currentUser.email);

      if (auth.currentUser.email === import.meta.env.VITE_REACT_APP_APP_EMAIL) {
        handleShow();
      } else {
        window.location.href = "/page";
      }

    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error.message);
    }
  };
  console.log(userGoogle);
  return (
    <div className="screen">
      <div className="curved">
        <div className="container ">
          <div className="bg-lightWhite padding">
            <h1 className="blue ">Bienvenido a Smart Tur</h1>
            <p className="blue">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
              mollitia excepturi voluptas voluptatum doloribus ut numquam nulla
              deleniti neque molestias illo ex voluptates at, amet unde
              provident? Doloremque, reiciendis autem? Lorem ipsum dolor sit
              amet consectetur
              <br />
              adipisicing elit. Architecto ipsam aliquam et nulla odio
              blanditiis. Nulla similique blanditiis veniam sint doloremque
              nobis odio fuga placeat tempore voluptate, mollitia laborum
              distinctio?
              <br />
              adipisicing elit. Architecto ipsam aliquam et nulla odio
              blanditiis. Nulla similique blanditiis veniam sint doloremque
              nobis odio fuga placeat tempore voluptate, mollitia laborum
              distinctio?
              <br />
              adipisicing elit. Architecto ipsam aliquam et nulla odio
              blanditiis. Nulla similique blanditiis veniam sint doloremque
              nobis odio fuga placeat tempore voluptate, mollitia laborum
              distinctio?
            </p>
          </div>
          <div className="bg-lightWhite">
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
