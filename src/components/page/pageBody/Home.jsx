import { Button } from "react-bootstrap";
import Nav from "./Nav";

function Home() {
  return (
    <div className="home">
      <Nav />
      <div className="container ">
        <div>
          <h2 className="titles ">
            Planea tu proximo viaje <br /> con nosotros
          </h2>
          <p className="subtitles blue ">
            Mendoza, Buenos Aires, Europa, Brasil y muchos destinos mas, solo en
            Smart Tur
          </p>
        </div>
        <div className="content">
          <Button>Ir a paquetes</Button>
          <div>
            <a href="">
              <ion-icon size="large" name="logo-whatsapp"></ion-icon>
            </a>
            <a href="">
              <ion-icon size="large" name="logo-instagram"></ion-icon>
            </a>
            <a href="">
              <ion-icon size="large" name="logo-facebook"></ion-icon>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
