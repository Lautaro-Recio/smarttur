import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { createElement } from "../../../Firebase";
import { NumericFormat } from "react-number-format";
import { InputGroup } from "react-bootstrap";

function ModalMain() {
  const [show, setShow] = useState(false);
  const [newName, setNewName] = useState("");
  const [price, setPrice] = useState(0);
  const [text, setNewText] = useState("");
  const [archive, setArchive] = useState([]);
  const [category, setCategory] = useState("");
  const [currency, setCurrency] = useState("ARS");

  const handleClose = () => {
    setShow(false);
    setNewText("");
    setPrice(0);
    setNewName("");
    setArchive([]);
    setCategory("");
  };
  const currencySymbols = {
    ARS: "$",
    USD: "US$",
    EUR: "€",
    BRL: "R$",
  };

  const handleShow = () => setShow(true);

  const handleNameChange = (e) => setNewName(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleTextChange = (e) => setNewText(e.target.value);
  const handleFileChange = (e) => setArchive([...e.target.files]);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleCoinChange = (e) => {
    setCurrency(e.target.value);
  };
  const handleSaveChanges = () => {
    createElement(
      newName,
      text,
      price,
      [],
      archive,
      false,
      "",
      0,
      category,
      "",        // initOfferDate vacío
      currency,  // ahora sí el currency en su lugar
      false      // destacar por defecto
    );
    handleClose();
  };

  const isFormValid = () => {
    return newName && text && price && archive.length > 0 && category;
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Sumar Paquete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sumar Paquete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Paquete"
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
                placeholder="Este destino se caracteriza por..."
                value={text}
                onChange={handleTextChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="currencySelect">Selecciona una moneda</Form.Label>
              <Form.Select
                id="currencySelect"
                onChange={(e) => handleCoinChange(e)}
                value={currency}
              >
                <option value="ARS">Pesos (ARS)</option>
                <option value="USD">Dólares (USD)</option>
                <option value="EUR">Euros (EUR)</option>
                <option value="BRL">Reales (BRL)</option>
              </Form.Select>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Precio</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  {currencySymbols[currency]}
                </InputGroup.Text>
                <NumericFormat
                  className="form-control"
                  value={price}
                  placeholder={"$150.000,00"}
                  thousandSeparator="."
                  decimalSeparator=","
                  decimalScale={2}
                  fixedDecimalScale
                  onValueChange={(values) => {
                    handlePriceChange({
                      target: {
                        name,
                        value: values.floatValue,
                      },
                    });
                  }}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">
                Selecciona a qué categoría pertenece
              </Form.Label>
              <Form.Select
                id="disabledSelect"
                value={category}
                onChange={handleCategoryChange}
              >
                <option value="">Selecciona una opción</option>
                <option value="Educativo">Educativo</option>
                <option value="Internacional">Internacional</option>
                <option value="Nacional">Nacional</option>
                <option value="Escapada">Escapada</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label>Imágenes para slider</Form.Label>
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
          <Button
            variant="primary"
            onClick={handleSaveChanges}
            disabled={!isFormValid()}
          >
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal >
    </>
  );
}

export default ModalMain;
