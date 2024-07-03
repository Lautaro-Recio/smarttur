import { useContext } from "react";
import { Carousel } from "react-bootstrap";
import { AppContext } from "../../AppProvider";
import "./Galery.css";

function GaleryCarrousel() {
  const { galery, title } = useContext(AppContext);

  return (
    <div className="galeryCarrousel">
      <Carousel>
        {galery.map((imgs, imgIndex) => (
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

      <p className="titles">{title}</p>
    </div>
  );
}

export default GaleryCarrousel;
