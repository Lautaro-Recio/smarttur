import { Button } from "react-bootstrap";
import "./page.css";
import logo from "../../assets/logo.png";

function SignIn() {
  return (
    <div className="screen">
      <div className="curved">
        <div className="container ">
          <div className="bg-lightWhite">
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
            </p>
          </div>
          <div className="bg-lightWhite">
            <img src={logo} alt="" />
            <Button>
              <ion-icon size="large" name="logo-google"></ion-icon>
              Iniciar sesion con google
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
