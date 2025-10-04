import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppProvider";
import "./Galery.css";
import { Link, useNavigate } from "react-router-dom";

function Galery() {
  const { galery, title, parraf, offerPrice, price, categoryBd } =
    useContext(AppContext);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navega a la página anterior
  };

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
      <button 
        onClick={handleGoBack} 
        className="back-button"
        aria-label="Volver atrás" 
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          background: 'rgba(255, 255, 255, 0.8)',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          zIndex: 1000,
          transition: 'background 0.3s ease'
        }}
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#333" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
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
