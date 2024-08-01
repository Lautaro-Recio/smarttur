import { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { AppContext } from "../../../AppProvider";
import { Link } from "react-router-dom";

function Experiences() {
  const { elementos, setGalery, setTitle, setParraf, setOfferPrice, setPrice,setCategoryBD } =
    useContext(AppContext);
  const [category, setCategory] = useState([]);
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);

  useEffect(() => {
    if (elementos.length > 0) {
      const prices = elementos
        .map((eles) => parseFloat(eles.price.replace(/[^0-9.,]/g, "")))
        .filter((price) => !isNaN(price)); // Filtra valores no numéricos
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      setMin(minPrice);
      setMax(maxPrice);
      setCategory(elementos);
    } else {
      setCategory([]);
      setMin(null);
      setMax(null);
    }
  }, [elementos]);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;

    const experiences =
      selectedCategory === "Sin Filtrar"
        ? elementos
        : elementos.filter((eles) => eles.category === selectedCategory);

    if (experiences.length > 0) {
      const prices = experiences
        .map((eles) => parseFloat(eles.price.replace(/[^0-9.,]/g, "")))
        .filter((price) => !isNaN(price));
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      setMin(minPrice);
      setMax(maxPrice);
    } else {
      setMin(null);
      setMax(null);
    }

    setCategory(experiences);
  };

  const handlePriceChange = (e) => {
    const maxPrice = parseFloat(e.target.value);

    const experiences = elementos.filter(
      (eles) => parseFloat(eles.price.replace(/[^0-9.,]/g, "")) <= maxPrice
    );

    setCategory(experiences);
  };

  return (
    <div className="experience center" id="experiences">
      <h2 className="fontLarge blue titles">Paquetes</h2>
      <Form.Group className="mb-3 formExperiences">
        <div>
          <Form.Label htmlFor="categorySelect">
            Selecciona a qué categoría pertenece
          </Form.Label>
          <Form.Select
            id="categorySelect"
            onChange={(e) => handleCategoryChange(e)}
          >
            <option>Sin Filtrar</option>
            <option>Estudiantil</option>
            <option>Internacional</option>
            <option>Nacional</option>
            <option>Experiencia</option>
          </Form.Select>
        </div>
        <div>
          <Form.Label>Precio</Form.Label>
          <div className="flex">
            <p className="blue">
              {min !== null ? `$${min.toLocaleString("de-DE")}` : "N/A"}
            </p>
            <Form.Range
              min={min || 0}
              max={max || 0}
              onChange={(e) => handlePriceChange(e)}
            />
            <p className="blue">
              {max !== null ? `$${max.toLocaleString("de-DE")}` : "N/A"}
            </p>
          </div>
        </div>
      </Form.Group>
      <div className="experienceBody">
        {category.map((exp, index) => {
          const price = parseFloat(exp.price.replace(/[^0-9.,]/g, ""));
          const priceOff = exp.priceOff
            ? parseFloat(exp.priceOff.replace(/[^0-9.,]/g, ""))
            : null;
          const formattedPrice = price ? price.toLocaleString("de-DE") : "N/A";
          const formattedPriceOff = priceOff
            ? priceOff.toLocaleString("de-DE")
            : "N/A";

          // Crear el enlace de WhatsApp dinámicamente
          const message = `Hola! Queria obtener mas informacion sobre el paquete ${
            exp.category + " " + exp.name
          }`;
          const encodedMessage = encodeURIComponent(message);
          const whatsappLink = `https://wa.me/5493515184315?text=${encodedMessage}`;

          return (
            <div key={exp.name + index}>
              {exp.images && exp.images.length > 0 ? (
                <>
                  <div className="experience-card">
                    <Link
                      to={`experience/${exp.name}`}
                      onClick={() => {
                        setGalery(exp.images);
                        setTitle(exp.name);
                        setParraf(exp.text);
                        setOfferPrice(exp.priceOff);
                        setPrice(exp.price);
                        setCategoryBD(exp.category)
                      }}
                      style={{ textDecoration: "none" }}
                    >
                      <img
                        src={exp.images[0].url}
                        alt={exp.images[0].nameOfImage}
                      />
                    </Link>

                    <div>
                      <p className="subtitles">
                        {exp.category + " " + exp.name}
                      </p>
                      <span className="flex">
                        <p
                          className={`titles ${exp.priceOff != 0 && "tached"}`}
                        >
                          ${formattedPrice}
                        </p>
                        {exp.priceOff != 0 && (
                          <p className="titles">${formattedPriceOff}</p>
                        )}
                        <a
                          type="button"
                          href={whatsappLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ion-icon
                            size="large"
                            name="logo-whatsapp"
                          ></ion-icon>
                        </a>
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <p>No hay imágenes disponibles para esta experiencia.</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Experiences;
