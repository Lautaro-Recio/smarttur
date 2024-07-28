import { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { AppContext } from "../../../AppProvider";
import { Link } from "react-router-dom";

function Experiences() {
  const { elementos, setGalery, setTitle } = useContext(AppContext);
  const [category, setCategory] = useState([]);
  const [min, setMin] = useState(9999999999);
  const [max, setMax] = useState(0);

  useEffect(() => {
    setCategory(elementos);
    if (elementos.length > 0) {
      const prices = elementos.map((eles) => eles.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      // Actualiza el estado
      setMin(minPrice);
      setMax(maxPrice);
    } else {
      // Si no hay elementos, puedes establecer precios por defecto o valores nulos
      setMin(null); // O cualquier valor por defecto que consideres
      setMax(null); // O cualquier valor por defecto que consideres
    }
  }, [elementos]);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;

    // Filtra los elementos por categoría seleccionada o muestra todos si es "sin filtrar"
    const experiences =
      selectedCategory === "Sin Filtrar"
        ? elementos
        : elementos.filter((eles) => eles.category === selectedCategory);

    // Encuentra el precio mínimo y máximo solo si hay elementos
    if (experiences.length > 0) {
      const prices = experiences.map((eles) => eles.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      // Actualiza el estado
      setMin(minPrice);
      setMax(maxPrice);
    } else {
      // Si no hay elementos, puedes establecer precios por defecto o valores nulos
      setMin(null); // O cualquier valor por defecto que consideres
      setMax(null); // O cualquier valor por defecto que consideres
    }

    setCategory(experiences);
  };

  const handlePriceChange = (e) => {
    // Obtén el valor del input range
    const maxPrice = parseFloat(e.target.value);

    // Filtra los elementos según el rango de precios
    const experiences = elementos.filter((eles) => eles.price <= maxPrice);

    // Actualiza el estado
    setCategory(experiences);
  };

  return (
    <div className="experience center" id="experiences">
      <h2 className="fontLarge blue titles">Paquetes</h2>
      <Form.Group className="mb-3 formExperiences">
        <div>
          <Form.Label htmlFor="disabledSelect">
            Selecciona a que categoria pertenece
          </Form.Label>
          <Form.Select
            className=""
            id="disabledSelect"
            onChange={(e) => handleCategoryChange(e)}
          >
            <option>Sin Filtrar</option>
            <option>Estudiantil</option>
            <option>Internacional</option>
            <option>Nacional</option>
            <option>Experiencias</option>
          </Form.Select>
        </div>
        <div>
          <Form.Label>Precio</Form.Label>
          <div className="flex">
            <p className="blue">${min}</p>
            <Form.Range
              min={min}
              max={max}
              onChange={(e) => handlePriceChange(e)}
            />
            <p className="blue">${max}</p>
          </div>
        </div>
      </Form.Group>
      <div className="experienceBody ">
        {category.map((exp, index) => (
          <div className="container" key={exp.name + index}>
            {exp.images && exp.images.length > 0 ? (
              <Link
                to={`experience/${exp.name}`}
                onClick={() => {
                  setGalery(exp.images);
                  setTitle(exp.name);
                }}
                style={{ textDecoration: "none" }} // Para quitar el subrayado del enlace
              >
                <div className="experience-card">
                  <img
                    src={exp.images[0].url}
                    alt={exp.images[0].nameOfImage}
                  />
                  <div>
                    <p className="subtitles">{exp.name}</p>
                    <span className="flex">
                      <p>${exp.price}</p>
                      <p>${exp.priceOff}</p>
                    </span>
                  </div>
                </div>
              </Link>
            ) : (
              <p>No hay imágenes disponibles para esta experiencia.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Experiences;
