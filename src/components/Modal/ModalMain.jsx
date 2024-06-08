import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { createElement } from "../../../Firebase";

function ModalMain(props) {
  const [show, setShow] = useState(false);
  const [newName, setNewName] = useState("");
  const [price, setprice] = useState(0);
  const [text, setNewText] = useState("");
  const [archive, setArchive] = useState([]);

  const handleClose = () => {
    setShow(false);
    setNewText("");
    setprice(0);
    setNewName("");
    setArchive([]);
  };
  const handleShow = () => setShow(true);
  const { whatIs } = { ...props };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setprice(e.target.value);
  };

  const handleTextChange = (e) => {
    setNewText(e.target.value);
  };

  const handleFileChange = (e) => {
    setArchive([...e.target.files]);
  };

  const handleSaveChanges = () => {
    // Luego puedes cerrar el modal
    createElement(newName, text, price, archive);

    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Sumar {whatIs}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Sumar {whatIs}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder={`${whatIs} ...`}
                autoFocus
                value={newName}
                onChange={handleNameChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Texto</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder={`Este destino se caracteriza por...`}
                value={text}
                onChange={handleTextChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                rows={3}
                placeholder={`$ 50000 (no hace falta poner el signo)`}
                value={price}
                onChange={handlePriceChange}
              />
            </Form.Group>
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label>Imagenes para slider </Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalMain;
