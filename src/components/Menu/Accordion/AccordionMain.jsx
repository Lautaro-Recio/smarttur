import "bootstrap/dist/css/bootstrap.min.css";
import { Accordion } from "react-bootstrap";
import AccorBody from "./AccorBody";
import ModalMain from "../../Modal/ModalMain";
import { readElements } from "../../../../Firebase";
import { useEffect, useState } from "react";

function AccordionMain() {
  const [elementos, setElementos] = useState([]);

  useEffect(() => {
    const info = async () => {
      try {
        const elementosObtenidos = await readElements();
        setElementos(elementosObtenidos);
      } catch (error) {
        console.error("Error al obtener elementos:", error);
      }
    };

    info();
  }, []);

  return (
    <div>
      <Accordion>
        {elementos.map((exp, i) => {
          return (
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
            />
          );
        })}
        <Accordion.Item className="flex">
          <ModalMain whatIs={"Experiencia"} />
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default AccordionMain;
