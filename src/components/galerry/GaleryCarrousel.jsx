import { useContext, useEffect, useState } from "react";
import { Carousel, Button } from "react-bootstrap";
import { AppContext } from "../../AppProvider";
import "./Galery.css";
import { useNavigate } from "react-router-dom";

function GaleryCarrousel() {
  const { galery, title } = useContext(AppContext);
  const [data, setData] = useState({ galery: [], title: "" });

  useEffect(() => {
    // Primero intentamos obtener datos del contexto
    if (galery.length > 0 && title) {
      const contextData = { galery, title };
      // Guardar los datos en localStorage
      localStorage.setItem('galeryCarouselData', JSON.stringify(contextData));
      setData(contextData);
    } else {
      // Si no hay datos del contexto, leer de localStorage
      const storedData = localStorage.getItem('galeryCarouselData');
      if (storedData) {
        setData(JSON.parse(storedData));
      }
    }
  }, [galery, title]);

  const navigate = useNavigate();

  if (!data.galery.length || !data.title) return <div>Loading...</div>; // Manejo de carga

  const handleGoBack = () => {
    navigate(-1); // Esto llevará al usuario a la página anterior
  };

  return (
    <div className="galeryCarrousel">
      <Button 
        onClick={handleGoBack}
        variant="light"
        style={{
          position: 'fixed',
          top: '80px',
          left: '20px',
          zIndex: 1000,
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          border: 'none'
        }}
        aria-label="Volver atrás"
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </Button>
      <Carousel>
        {data.galery.map((imgs, imgIndex) => (
          <Carousel.Item className="center" key={imgs.nameOfImage + imgIndex}>
            <img
              className="GaleryCarrouselImg"
              src={imgs.url}
              alt={imgs.nameOfImage}
            />
            <p className="second titles">{imgIndex+1}</p>
          </Carousel.Item>
        ))}
      </Carousel>

      <p className="titles">{data.title}</p>
    </div>
  );
}

export default GaleryCarrousel;
