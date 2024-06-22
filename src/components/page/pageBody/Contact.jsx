import { Button, Form } from "react-bootstrap";
import Formgroup from "../../Menu/Accordion/Formgroup";
import { useState } from "react";

function Contact() {
  const [mewprice, setprice] = useState("");
  const [Newtext, setNewText] = useState("");
  console.log(mewprice, Newtext);

  const handlePriceChange = (e) => {
    setprice(e.target.value);
  };

  const handleTextChange = (e) => {
    setNewText(e.target.value);
  };
  return (
    <div className="containerWave contact">
      <div className="contactBody container">
        <h2 className="fontLarge white titles center mt-5">Contacto</h2>
        <Form>
          <Formgroup
            name={"Nombre"}
            func={handleTextChange}
            type="textarea"
            label="Nombre"
          />
          <Formgroup
            name={"Direccion de email"}
            func={handlePriceChange}
            type="email"
            label="Direccion de email"
          />
          <Formgroup
            name={"Consulta"}
            func={handlePriceChange}
            as="textarea"
            type="textarea"
            label="Escribe tu consulta aqui"
          />

          <Button variant="primary" className="mb-5" type="submit">
            Enviar
          </Button>
        </Form>
      </div>
      <div className="wave"></div>
    </div>
  );
}


export default Contact;
