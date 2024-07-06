import { Button, Form } from "react-bootstrap";
import Formgroup from "../../Menu/Accordion/Formgroup";
import { useState } from "react";
import logo2 from "../../../assets/logo2.png";

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
    <div className="containerWave contact" id="contact">
      <div className="contactBody container grid">
        <Form>
          <h2 className="fontLarge white titles center mt-5">Contacto</h2>
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
        <div className="center mt-5 contactDiv2">
          <img src={logo2} alt="" />
          <p className="parraf white p-5">Lorem ipsum dolor sit amet consectetur, adipisicing elit debitis totam doloremque temporibus, quae sunt nihil et voluptas possimus officiis odio, natus expedita. Veritatis, aliquam.</p>
        </div>
      </div>

      <div className="wave"></div>
    </div>
  );
}

export default Contact;
