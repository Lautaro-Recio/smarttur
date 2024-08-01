import { useContext } from "react";
import { AppContext } from "../../AppProvider";
import "./Galery.css";
import { Link } from "react-router-dom";

function Galery() {
  const { galery, title, parraf, offerPrice, price, categoryBd } =
    useContext(AppContext);

  // Función para formatear precios, asegurando que estén definidos
  const formatPrice = (price) => {
    if (price === undefined || price === null) return "N/A";
    return `$${parseFloat(price).toLocaleString("de-DE")}`;
  };
  const message = `Hola! Queria obtener mas informacion sobre el paquete ${
    categoryBd + " " + title
  }`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://wa.me/5493515184315?text=${encodedMessage}`;

  return (
    <div className="galeryBody">
      <div className="containerWave">
        <div className="center">
          <h1 className="white">{categoryBd + " " + title}</h1>
          <p className="white">{parraf}</p>
          <div className="flex">
            <p className={`titles white ${offerPrice != 0 && "tached"}`}>
              {formatPrice(price)}
            </p>
            {offerPrice ? (
              <p className="titles white mx-5">{formatPrice(offerPrice)}</p>
            ) : null}
          </div>
          <div className="flotantButton">
            <a
              type="button"
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ion-icon size="large" name="logo-whatsapp"></ion-icon>
            </a>
          </div>
          <div className="galery center">
            {galery.map((item) => (
              <Link key={item.id} to={`galery/${title}`}>
                <img
                  src={item.url}
                  alt={item.nameOfImage || "Imagen de la galería"}
                />
              </Link>
            ))}
          </div>
        </div>
        {/* Aquí podrías incluir un elemento adicional si es necesario, como una ola o algo similar */}
        <div className="wave"></div>
      </div>
    </div>
  );
}

export default Galery;
