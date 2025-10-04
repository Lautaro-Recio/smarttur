import "bootstrap/dist/css/bootstrap.min.css";
import { Accordion } from "react-bootstrap";
import AccorBody from "./AccorBody";
import ModalMain from "../../Modal/ModalMain";
import { AppContext } from "../../../AppProvider";
import { useContext, useState } from "react";

function AccordionMain() {
  const { elementos } = useContext(AppContext);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categorias = [
    { categ: "Educativo" },
    { categ: "Internacional" },
    { categ: "Nacional" },
    { categ: "Escapada" },
  ];

  const handleCategoryChange = (categ) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(categ)) {
        return prevCategories.filter((cat) => cat !== categ);
      } else {
        return [...prevCategories, categ];
      }
    });
  };

  const filteredElementos = elementos.filter((exp) => {
    if (selectedCategories.length === 0) return true; // Si no hay filtros, mostrar todos
    return selectedCategories.includes(exp.category);
  });

  return (
    <div>
      <div className="categories-container-menu">
        {categorias.map((cat) => (
          <button
            key={cat.categ}
            className={`category-item-menu ${
              selectedCategories.includes(cat.categ) ? "active" : ""
            }`}
            onClick={() => handleCategoryChange(cat.categ)}
          >
            {cat.categ}
          </button>
        ))}
      </div>

      <Accordion>
        {filteredElementos.map((exp, i) => (
          <AccorBody
            key={i}
            name={exp.name}
            text={exp.text}
            price={exp.price}
            images={exp.images}
            offerPriceBD={exp.priceOff}
            offerBD={exp.offer}
            offerDateBD={exp.offerDate}
            i={i}
            categoryBD={exp.category}
            currencyBD={exp.currency}
            initOfferDateBD={exp.initOfferDateBD}
            destacarBD={exp.destacar}
          />
        ))}
        <Accordion.Item className="flex">
          <ModalMain />
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default AccordionMain;
