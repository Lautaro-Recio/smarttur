import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppProvider";
import "./Galery.css";
import { Link } from "react-router-dom";

function Galery() {
  const { galery, title, parraf, offerPrice, price, categoryBd } =
    useContext(AppContext);
  const [data, setData] = useState(null);

  // Función para formatear precios, asegurando que estén definidos
  const formatPrice = (price) => {
    if (price === undefined || price === null) return "N/A";
    return `$${parseFloat(price).toLocaleString("de-DE")}`;
  };

  const message = `Hola! Queria obtener mas informacion sobre el paquete ${categoryBd + " " + title
    }`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://wa.me/5493515184315?text=${encodedMessage}`;

  useEffect(() => {
    // Primero intentamos obtener datos del contexto
    if (
      galery &&
      title &&
      parraf &&
      offerPrice !== undefined &&
      price &&
      categoryBd
    ) {
      const contextData = {
        galery,
        title,
        parraf,
        offerPrice,
        price,
        categoryBd,
      };
      // Guardar los datos en localStorage
      localStorage.setItem("galeryData", JSON.stringify(contextData));
      setData(contextData);
    } else {
      // Si no hay datos del contexto, leer de localStorage
      const storedData = localStorage.getItem("galeryData");
      if (storedData) {
        setData(JSON.parse(storedData));
      }
    }
  }, [galery, title, parraf, offerPrice, price, categoryBd]);

  if (!data) return <div>Loading...</div>; // Manejo de carga

  return (
    <div className="galeryBody">
      <div className="containerWave">
        <div className="center">
          <h1 className="white">{data.categoryBd + " " + data.title}</h1>
          <p className="white">{data.parraf}</p>
          <div className="flex">
            <p className={`titles white ${(data.offerPrice !== null && data.offerPrice !== 0 && data.offerPrice < data.price) && "tached"}`}>
              {formatPrice(data.price)}
            </p>
            {(data.offerPrice !== null && data.offerPrice !== 0 && data.offerPrice < data.priceprice) ? (
              <p className="titles white mx-5">
                {formatPrice(data.offerPrice)}
              </p>
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
            {data.galery.map((item) => (
              <Link key={item.id} to={`galery/${data.title}`}>
                <span>
                  <p>Ir a la Galeria</p>
                </span>
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
