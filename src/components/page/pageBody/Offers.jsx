import { useContext } from "react";
import { Button, Carousel } from "react-bootstrap";
import { AppContext } from "../../../AppProvider";

function Offers() {
  const { elementos } = useContext(AppContext);

  return (
    <div className="containerWave">
      <div className="pt-3">
        <h2 className="titles white center mb-1 fontLarge">Ofertas</h2>
        <Carousel className="fixed">
          {elementos.map((exp) => (
            exp.offer && exp.images[0].url && ( // Verificar que exp.offer existe y exp.images[0].url está definido
              <Carousel.Item key={exp.images[0].url} interval={1000}>
                <img src={exp.images[0].url} alt={exp.name} /> {/* Utilizar exp.name como texto alternativo */}
                <Carousel.Caption className="deleteImage">
                  <div className="deleteImageBody bg-whitee">
                    <h3 className="titles blue bg-lightWhite fontMid">{exp.name}</h3>
                    <p className="blue bg-lightWhite parraf">{exp.text}</p>
                    <div className="titles blue flex bg-lightWhite">
                      <p>$ {exp.price}</p>
                      <p>$ {exp.priceOff}</p>
                    </div>
                    <Button>Mas Informacion</Button>
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
            )
          ))}
        </Carousel>
      </div>
      <div className="wave"></div>
    </div>
  );
}

export default Offers;
