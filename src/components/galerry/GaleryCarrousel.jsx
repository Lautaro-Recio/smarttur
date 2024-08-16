import { useContext, useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { AppContext } from "../../AppProvider";
import "./Galery.css";

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

  if (!data.galery.length || !data.title) return <div>Loading...</div>; // Manejo de carga

  return (
    <div className="galeryCarrousel">
      <Carousel>
        {data.galery.map((imgs, imgIndex) => (
          <Carousel.Item className="center" key={imgs.nameOfImage + imgIndex}>
            <img
              className="GaleryCarrouselImg"
              src={imgs.url}
              alt={imgs.nameOfImage}
            />
            <p className="second titles">{imgIndex}</p>
          </Carousel.Item>
        ))}
      </Carousel>

      <p className="titles">{data.title}</p>
    </div>
  );
}

export default GaleryCarrousel;
