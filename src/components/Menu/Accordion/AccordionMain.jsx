import "bootstrap/dist/css/bootstrap.min.css";
import { Accordion } from "react-bootstrap";
import AccorBody from "./AccorBody";
import ModalMain from "../../Modal/ModalMain";
import { db } from "../../../../Firebase";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";

function AccordionMain() {
  const [elementos, setElementos] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "experiencias"),
      (snapshot) => {
        const updatedElementos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setElementos(updatedElementos); // Actualizar estado con los elementos actualizados
      },
      (error) => {
        console.error("Error al obtener elementos en tiempo real:", error);
      }
    );

    return () => unsubscribe(); // Limpieza al desmontar el componente
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
