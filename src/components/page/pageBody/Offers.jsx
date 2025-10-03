import { useContext } from "react";
import { Carousel } from "react-bootstrap";
import { AppContext } from "../../../AppProvider";

function Offers() {
  const { elementos } = useContext(AppContext);

  const formatPrice = (price) => {
    if (price === null || price === undefined) return "N/A";

    if (typeof price === "number") {
      return `$${price.toLocaleString("de-DE")}`;
    }

    if (typeof price === "string") {
      const number = parseFloat(String(price).replace(/[^0-9.,]/g, ""));
      return !isNaN(number) ? `$${number.toLocaleString("de-DE")}` : "N/A";
    }

    return "N/A";
  };
  return (
    <div className="containerWave" id="offers">
      <div className="pt-3">
        <h2 className="titles white center mb-2 mt-5 fontLarge">Destacados de la semana</h2>
        <Carousel className="fixed">
          {elementos
            .filter(
              (exp) =>
                exp.destacar &&
                exp.images &&
                exp.images.length > 0 &&
                exp.images[0].url
            ) // Filtrar elementos con ofertas y URL de imagen válidos
            .map((exp) => (
              <Carousel.Item
                className="center"
                key={exp.images[0].url}
                interval={10000}
              >
                <div className="experience-card">
                  <img
                    src={exp.images[0].url}
                    alt={exp.images[0].nameOfImage || exp.name} // Uso de nombre como texto alternativo si no hay nombre de imagen
                  />
                  <div className="bg-lightWhite">
                    <h2 className="titles">{exp.category + " " + exp.name}</h2>
                    <p className=" parraf">{exp.text}</p>

                    <span className="flex">
                      <p className={`titles ${(exp.priceOff  !== null && exp.priceOff !== 0 && exp.priceOff < exp.price) ? "tached" : ""}`}>{formatPrice(exp.price)}</p>
                      {(exp.priceOff !== null && exp.priceOff !== 0 && exp.priceOff < exp.price) && (
                        <p className="titles">${exp.priceOff}</p>
                      )}
                    </span>
                    <a href="#experiences">Más Información</a>
                    <p className="mt-3">Oferta valida hasta {exp.offerDate} </p>
                  </div>
                </div>
              </Carousel.Item>
            ))}
        </Carousel>
      </div>
      <div className="wave"></div>
    </div>
  );
}

export default Offers;
