import { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppContext } from "../../../AppProvider";
import airplane from "../../../assets/airplane.png";
import argentinaMap from "../../../assets/argentina-map.png";
import backpack from "../../../assets/backpack.png";
import lightning from "../../../assets/lightning.png";

function Experiences() {
  const {
    elementos,
    setGalery,
    setTitle,
    setParraf,
    setOfferPrice,
    setPrice,
    setCategoryBD,
  } = useContext(AppContext);

  const [category, setCategory] = useState([]);
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filterPrice, setFilterPrice] = useState(0);
  const [visibleCount, setVisibleCount] = useState(6); // Número de paquetes visibles inicialmente

  useEffect(() => {
    if (elementos.length > 0) {
      const prices = elementos
        .map((eles) => parseFloat(eles.price.replace(/[^0-9.,]/g, "")))
        .filter((price) => !isNaN(price));
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

  const handleCategoryChange = (categ) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(categ)) {
        return prevCategories.filter((category) => category !== categ);
      }
      return [...prevCategories, categ];
    });
  };

  useEffect(() => {
    const experiences =
      selectedCategories.length === 0
        ? elementos
        : elementos.filter((eles) =>
            selectedCategories.includes(eles.category)
          );

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
  }, [selectedCategories, elementos]);

  const handlePriceChange = (e) => {
    const maxPrice = parseFloat(e.target.value);
    const experiences = elementos.filter(
      (eles) => parseFloat(eles.price.replace(/[^0-9.,]/g, "")) <= maxPrice
    );
    setFilterPrice(maxPrice);
    setCategory(experiences);
  };

  // Mostrar más paquetes
  const showMore = () => {
    setVisibleCount(visibleCount + 6);
  };

  // Paquetes visibles
  const displayedItems = category.slice(0, visibleCount);

  return (
    <div className="experience center bggray p-2" id="experiences">
      <h2 className="fontLarge blue titles">Paquetes</h2>
      <Form.Group className="p-2 formExperiences">
        <div className="categories-container">
          {[
            { categ: "Educativo", icon: backpack },
            { categ: "Internacional", icon: airplane },
            { categ: "Nacional", icon: argentinaMap },
            { categ: "Escapada", icon: lightning },
          ].map((cat) => (
            <button
              key={cat.categ}
              className={`category-item ${
                selectedCategories.includes(cat.categ) ? "active" : ""
              }`}
              onClick={() => handleCategoryChange(cat.categ)}
            >
              <div className="icon-circle">
                <img src={cat.icon} alt="" />
              </div>
              <p>{cat.categ.toUpperCase()}</p>
            </button>
          ))}
        </div>
        <div className="hidden w-0 ">
          <p className="blue">Precio</p>
          <div className="flex">
            <p className="blue">
              {min !== null ? `$${min.toLocaleString("de-DE")}` : "N/A"}
            </p>
            <Form.Range
              min={min || 0}
              max={max || 0}
              onChange={handlePriceChange}
            />
            <p className="blue">
              {max !== null ? `$${max.toLocaleString("de-DE")}` : "N/A"}
            </p>
          </div>
          <p className="blue">$ {filterPrice.toLocaleString("de-DE")}</p>
        </div>
      </Form.Group>
      <div className="experienceBody p-2">
        {displayedItems.map((exp, index) => {
          const price = parseFloat(exp.price.replace(/[^0-9.,]/g, ""));
          const priceOff = exp.priceOff
            ? parseFloat(exp.priceOff.replace(/[^0-9.,]/g, ""))
            : null;
          const formattedPrice = price ? price.toLocaleString("de-DE") : "N/A";
          const formattedPriceOff = priceOff
            ? priceOff.toLocaleString("de-DE")
            : "N/A";

          const message = `Hola! Quería obtener más información sobre el paquete ${
            exp.category + " " + exp.name
          }`;
          const encodedMessage = encodeURIComponent(message);
          const whatsappLink = `https://wa.me/5493515184315?text=${encodedMessage}`;

          return (
            <div key={`${exp.name}-${index}`}>
              {exp.images && exp.images.length > 0 ? (
                <div className="experience-card">
                  <span className="info">
                    <Link
                      to={`experience/${exp.name}`}
                      onClick={() => {
                        setGalery(exp.images);
                        setTitle(exp.name);
                        setParraf(exp.text);
                        setOfferPrice(exp.priceOff);
                        setPrice(exp.price);
                        setCategoryBD(exp.category);
                      }}
                      style={{ textDecoration: "none" }}
                      aria-label={`Ver más sobre ${exp.name}`} // Mejora de accesibilidad
                    >
                      Ver más
                    </Link>
                  </span>

                  <img
                    src={exp.images[0].url}
                    alt={exp.images[0].nameOfImage || "Imagen de experiencia"} // Texto alternativo
                  />
                  <div>
                    <p className="subtitles">{`${exp.category} ${exp.name}`}</p>
                    <span className="flex">
                      <p
                        className={`titles ${
                          exp.priceOff !== 0 ? "tached" : ""
                        }`}
                      >
                        ${formattedPrice}
                      </p>
                      {exp.priceOff !== 0 && (
                        <p className="titles">${formattedPriceOff}</p>
                      )}
                      <a
                        type="button"
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Enviar mensaje de WhatsApp sobre ${exp.name}`} // Mejora de accesibilidad
                      >
                        <ion-icon size="large" name="logo-whatsapp"></ion-icon>
                      </a>
                    </span>
                  </div>
                </div>
              ) : (
                <p>No hay imágenes disponibles para esta experiencia.</p>
              )}
            </div>
          );
        })}
      </div>
      {category.length > visibleCount && (
        <button onClick={showMore} className="btn mt-3">
          Ver más + {category.length - visibleCount}
        </button>
      )}
    </div>
  );
}

export default Experiences;
