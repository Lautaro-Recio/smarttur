import { Button, Form } from "react-bootstrap";
import Formgroup from "../../Menu/Accordion/Formgroup";
import { useState } from "react";
import emailjs from "emailjs-com";
import logo2 from "../../../assets/logo.png";

function Contact() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [consulta, setConsulta] = useState("");
  const [phone, setPhone] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleConsultaChange = (e) => setConsulta(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !consulta) {
      setFormError("Todos los campos son obligatorios.");
      return;
    }

    setFormError("");

    const templateParams = {
      from_name: name,
      reply_to: email,
      phone: phone,
      message: consulta,
    };

    emailjs
      .send(
        "service_6ei2636",
        "template_3j60g2l",
        templateParams,
        "9CvK1SlCN5YNiBAdx"
      )
      .then(
        (result) => {
          console.log(result.text);
          setName("");
          setEmail("");
          setPhone("");
          setConsulta("");
          setMessageSent(true);
          setError("");
        },
        (error) => {
          console.log(error.text);
          setError("Hubo un error al enviar el mensaje. Inténtalo de nuevo.");
          setMessageSent(false);
        }
      );
  };

  return (
    <div className="containerWave contact" id="contact">
      <div className="contactBody container grid">
        <Form onSubmit={handleSubmit}>
          <h2 className="fontLarge white titles center mt-5">Contacto</h2>
          <Formgroup
            name={"name"}
            func={handleNameChange}
            type="text"
            value={name}
            label="Nombre"
          />
          <Formgroup
            name={"email"}
            func={handleEmailChange}
            type="email"
            value={email}
            label="Dirección de email"
          />
          <Formgroup
            name={"phone"}
            func={handlePhoneChange}
            type="text"
            value={phone}
            label="Teléfono"
          />
          <Formgroup
            name={"consulta"}
            func={handleConsultaChange}
            as="textarea"
            type="textarea"
            value={consulta}
            label="Escribe tu consulta aquí"
          />
          <Button variant="primary" className="mb-5" type="submit">
            Enviar
          </Button>
          <div className="formError">
            {messageSent && <p className="text-success">Mensaje enviado con éxito.</p>}
            {error && <p className="text-danger">{error}</p>}
            {formError && <p className="text-danger">{formError}</p>}
          </div>
        </Form>
        <div className="center mt-5 contactDiv2">
          <img src={logo2} alt="Logo" />
          <p className="parraf white p-5">
            No dudes en visitarnos o contactarnos por teléfono al{" "}
            <strong>+1 (234) 567-8901</strong> o por correo electrónico a{" "}
            <strong>info@smarttur.com</strong> para agendar una cita o para más
            información. ¡Esperamos verte pronto!
          </p>
        </div>
      </div>
      <div className="wave"></div>
    </div>
  );
}

export default Contact;
