import { useContext } from "react";
import { Carousel } from "react-bootstrap";
import { AppContext } from "../../../AppProvider";
import { Link } from "react-router-dom";

function Experiences() {
  const { elementos } = useContext(AppContext);

  return (
    <div className="experience center">
      <h2 className="fontLarge blue titles">Experiencias</h2>
      <div className="experienceBody ">
        {elementos.map((exp, index) => (
          <div className="container" key={exp.name + index}>
            <h3 className="fontLarge blue subtitle">{exp.name}</h3>
            {exp.images && exp.images.length > 0 ? (
              <Carousel>
                {exp.images.map((imgs, imgIndex) => (
                  <Carousel.Item key={exp.name + imgs.nameOfImage + imgIndex}>
                    <Link to={`experience/${exp.name}`}>
                      <img src={imgs.url} alt={imgs.nameOfImage} />
                    </Link>
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <p>No hay imágenes disponibles para esta experiencia.</p>
            )}
            <p>{exp.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Experiences;
