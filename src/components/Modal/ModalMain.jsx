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
  const [errors, setErrors] = useState({});

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
  const validateForm = () => {
    const newErrors = {};
    if (!newName.trim()) newErrors.name = "El nombre del paquete es obligatorio";
    if (!price || price <= 0) newErrors.price = "El precio es obligatorio y debe ser mayor a 0";
    if (archive.length === 0) newErrors.archive = "Debe subir al menos una imagen";
    if (!category) newErrors.category = "Debe seleccionar una categoría";
    if (!currency) newErrors.currency = "Debe seleccionar una moneda";
    return newErrors;
  };

  const handleSaveChanges = () => {
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    // Si no hay errores, proceder con el guardado
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
      "",
      currency,
      false
    );
    
    // Limpiar errores y cerrar el modal
    setErrors({});
    handleClose();
  };
  
  // Función para limpiar el error cuando el usuario comienza a escribir
  const clearError = (field) => {
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[field];
        return newErrors;
      });
    }
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
              <Form.Label>Nombre del paquete <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: Paquete a Bariloche"
                autoFocus
                value={newName}
                onChange={(e) => {
                  handleNameChange(e);
                  clearError('name');
                }}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
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
              <Form.Label htmlFor="currencySelect">
                Selecciona una moneda <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                id="currencySelect"
                onChange={(e) => {
                  handleCoinChange(e);
                  clearError('currency');
                }}
                value={currency}
                isInvalid={!!errors.currency}
              >
                <option value="">Selecciona una moneda</option>
                <option value="ARS">Pesos (ARS)</option>
                <option value="USD">Dólares (USD)</option>
                <option value="EUR">Euros (EUR)</option>
                <option value="BRL">Reales (BRL)</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.currency}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Precio <span className="text-danger">*</span></Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  {currencySymbols[currency]}
                </InputGroup.Text>
                <NumericFormat
                  className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                  value={price}
                  placeholder={"$150.000,00"}
                  thousandSeparator="."
                  decimalSeparator=","
                  decimalScale={2}
                  fixedDecimalScale
                  onValueChange={(values) => {
                    handlePriceChange({
                      target: {
                        name: 'price',
                        value: values.floatValue,
                      },
                    });
                    clearError('price');
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.price}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="categorySelect">
                Categoría <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                id="categorySelect"
                onChange={(e) => {
                  handleCategoryChange(e);
                  clearError('category');
                }}
                value={category}
                isInvalid={!!errors.category}
              >
                <option value="">Selecciona una categoría</option>
                <option value="Educativo">Educativo</option>
                <option value="Internacional">Internacional</option>
                <option value="Nacional">Nacional</option>
                <option value="Escapada">Escapada</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.category}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Subir imágenes del paquete <span className="text-danger">*</span></Form.Label>
              <Form.Control 
                type="file" 
                multiple 
                onChange={(e) => {
                  handleFileChange(e);
                  if (e.target.files.length > 0) {
                    clearError('archive');
                  }
                }}
                isInvalid={!!errors.archive}
              />
              <Form.Control.Feedback type="invalid">
                {errors.archive}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Sube al menos una imagen para el paquete.
              </Form.Text>
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
