import Accordion from "react-bootstrap/Accordion";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import { useState } from "react";
import Formgroup from "./Formgroup";

function AccorBody(props) {
  const { name, text, price, images, i } = { ...props };
  const [newName, setNewName] = useState("");
  const [mewprice, setprice] = useState(0);
  const [Newtext, setNewText] = useState("");
  const [archive, setArchive] = useState([]);

  const handleClose = () => {
    setNewText("");
    setprice(0);
    setNewName("");
    setArchive([]);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setprice(e.target.value);
  };

  const handleTextChange = (e) => {
    setNewText(e.target.value);
  };

  /*   const handleFileChange = (e) => {
    setArchive([...e.target.files]);
  }; */
  return (
    <Accordion.Item key={name} eventKey={i}>
      <Accordion.Header>
        <h2 className="titles blue">{name}</h2>
      </Accordion.Header>
      <Accordion.Body>
        <div className="grid">
          <Form>
            <Formgroup
              name={name}
              func={handleNameChange}
              type="text"
              label="Nombre"
            />
            <Formgroup
              name={text}
              func={handleTextChange}
              type="textarea"
              label="Texto presentacion"
            />

            <Formgroup
              name={price}
              func={handlePriceChange}
              as="textarea"
              type="number"
              label="Precio"
            />
          </Form>
          <div>hola</div>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default AccorBody;
