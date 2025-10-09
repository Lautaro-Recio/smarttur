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
            .filter((exp) => {
              if (!exp?.destacar || !Array.isArray(exp?.images) || exp.images.length === 0) return false;
              if (exp?.featuredImage) {
                const featured = exp.images.find((img) => img.nameOfImage === exp.featuredImage);
                return Boolean(featured?.url);
              }
              return Boolean(exp.images[0]?.url);
            }) // Filtrar elementos con imagen destacada válida o primera imagen válida
            .map((exp) => {
              const featured = exp?.featuredImage
                ? exp.images.find((img) => img.nameOfImage === exp.featuredImage)
                : null;
              const imgToShow = featured || exp.images[0];
              return (
                <Carousel.Item
                  className="center"
                  key={imgToShow.url}
                  interval={10000}
                >
                  <div className="experience-card">
                    <img
                      src={imgToShow.url}
                      alt={imgToShow.nameOfImage || exp.name}
                    />
                    <div className="bg-lightWhite">
                      <h2 className="titles">{exp.category + " " + exp.name}</h2>
                      <p className=" parraf">{exp.text}</p>

                      <span className="flex">
                        {(exp.price !== null && exp.price !== 0) && (

                          <p className={`titles ${(exp.price !== null && exp.price !== 0 && exp.price < exp.price) ? "tached" : ""}`}>{formatPrice(exp.price)}</p>
                        )}

                        {(exp.priceOff !== null && exp.priceOff !== 0 && exp.priceOff < exp.price) && (
                          <p className="titles">${exp.priceOff}</p>
                        )}
                      </span>
                      <a href="#experiences">Más Información</a>
                      {(exp.offerDate && exp.initOfferDate) && (

                        <p className="mt-3">Validez desde {exp.initOfferDate} hasta {exp.offerDate} </p>
                      )}
                    </div>
                  </div>
                </Carousel.Item>
              );
            })}
        </Carousel>
      </div>
      <div className="wave"></div>
    </div>
  );
}

export default Offers;
