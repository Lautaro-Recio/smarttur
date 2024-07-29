import "bootstrap/dist/css/bootstrap.min.css";
import { Accordion} from "react-bootstrap";
import AccorBody from "./AccorBody";
import ModalMain from "../../Modal/ModalMain";
import { AppContext } from "../../../AppProvider";
import { useContext } from "react";

function AccordionMain() {
  const { elementos } = useContext(AppContext); // Usa useContext con AppContext para acceder al contexto
 
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
              categoryBD={exp.category}
            />
          );
        })}
        <Accordion.Item className="flex">
          <ModalMain />
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default AccordionMain;
