import { Button } from "react-bootstrap";
import Nav from "./Nav";

function Home() {
  return (
    <div className="home">
      <Nav />
      <div className="container">
        <div>
          <h2 className="titles white title-home">
            Planea tu proximo viaje <br /> con nosotros
          </h2>
        </div>

        <div className="content">
          <Button href="#experiences">Paquetes</Button>
          <div>
            <a href="https://wa.me/5493515184315" target="blank">
              <ion-icon size="large" name="logo-whatsapp"></ion-icon>
            </a>
            <a href="https://www.instagram.com/grupturarg/" target="blank">
              <ion-icon size="large" name="logo-instagram"></ion-icon>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61565716553425&locale=es_LA"
              target="blank"
            >
              <ion-icon size="large" name="logo-facebook"></ion-icon>
            </a>
          </div>
        </div>
      </div>

      {/* 🔹 Botón RedEVT */}
      <div className="redevtButton" title="Ir a RedEVT - Sistema de Gestión de Viajes">
        <a href="https://app.redevt.com/red/ag/login.asp?xpid=757877673430303736344331" target="_blank" title="Ir a RedEVT - Sistema de Gestión de Viajes" rel="noopener noreferrer">
          <ion-icon size="large" name="airplane-outline"></ion-icon>
          <span>RedEVT</span>
        </a>
      </div>
    </div>

  );
}

export default Home;
