import Accordion from "react-bootstrap/Accordion";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, CardGroup, Form, InputGroup } from "react-bootstrap";
import { useState } from "react";
import Formgroup from "./Formgroup";
import Carousel from "react-bootstrap/Carousel";
import {
  createElement,
  deleteElement,
  deleteImages,
} from "../../../../Firebase";
import Swal from "sweetalert2";
import { NumericFormat } from "react-number-format";

function AccorBody(props) {
  const {
    name,
    text,
    price,
    images,
    offerPriceBD,
    offerBD,
    offerDateBD,
    i,
    categoryBD,
    currencyBD,
    initOfferDateBD,
    destacarBD
  } = {
    ...props,
  };

  const [mewprice, setprice] = useState(price);
  const [Newtext, setNewText] = useState(text);
  const [newName, setNewName] = useState(text);

  const [offer, setOffer] = useState(offerBD);
  const [destacar, setDestacar] = useState(destacarBD);

  const [offerDate, setOfferDate] = useState("");
  const [initOfferDate, setInitOfferDate] = useState("");

  const [offerPrice, setOfferPrice] = useState(0);
  const [archive, setArchive] = useState([]);
  const [category, setCategory] = useState("");
  const [currency, setCurrency] = useState("ARS");
  const [errors, setErrors] = useState({});

  // Mapa de símbolos según la moneda
  const currencySymbols = {
    ARS: "$",
    USD: "US$",
    EUR: "€",
    BRL: "R$",
  };



  const deleteExperience = () => {
    Swal.fire({
      title: "Estas seguro?",
      text: `Desea eliminar la ${name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteElement(name);
        Swal.fire({
          title: "Eliminado",
          text: `La ${name} fue borrada`,
          icon: "success",
        });
      }
    });
  };

  const handleVisibleChange = (e) => {
    const isChecked = e.target.checked;
    setOffer(isChecked);

    // Limpiar errores de oferta al desactivar
    if (!isChecked) {
      setOfferPrice(0);
      setOfferDate("");
      setInitOfferDate("");

      // Limpiar errores relacionados con la oferta
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.offerPrice;
        delete newErrors.offerDate;
        delete newErrors.initOfferDate;
        return newErrors;
      });
    }
  };

  const handleDestacarChange = (e) => {
    console.log('e.target.checked ======> ', e.target.checked)
    setDestacar(e.target.checked);
  };
  const deleteImage = (name, imgsName) => {
    const newImages = [];

    // Recorrer el array de imágenes existentes
    for (let i = 0; i < images.length; i++) {
      const image = images[i];

      // Verificar si el nombre de la imagen actual coincide con el nombre que queremos eliminar
      if (image.nameOfImage === imgsName) {
        // Mostrar notificación de éxito con SweetAlert
        Swal.fire({
          title: "Estas seguro?",
          text: `Desea eliminar la imagen ${name}?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, Eliminar",
        }).then((result) => {
          if (result.isConfirmed) {
            deleteImages(name, newImages);

            Swal.fire({
              title: "Eliminado",
              text: "Tu imagen fue borrada",
              icon: "success",
            });
          }
        });
      } else {
        // Si no es la imagen que queremos eliminar, la agregamos al nuevo array
        newImages.push(image);
      }
    }
    // Actualizar el estado de 'archive' con las imágenes restantes
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newName.trim()) newErrors.name = "El nombre del destino es obligatorio";
    if (!mewprice || mewprice <= 0) newErrors.price = "El precio es obligatorio y debe ser mayor a 0";
    if (images.length === 0 && (!archive || archive.length === 0)) newErrors.images = "Debe haber al menos una imagen";
    if (!category && !categoryBD) newErrors.category = "Debe seleccionar una categoría";
    if (!currency) newErrors.currency = "Debe seleccionar una moneda";

    // Validar campos de oferta si está activada
    if (offer) {
      if (!offerPrice && offerPrice !== 0) {
        newErrors.offerPrice = "El precio de oferta es obligatorio";
      } else if (offerPrice <= 0) {
        newErrors.offerPrice = "El precio de oferta debe ser mayor a 0";
      }

      if (!offerDate && !offerDateBD) {
        newErrors.offerDate = "La fecha de cierre de oferta es obligatoria";
      }

      if (!initOfferDate && !initOfferDateBD) {
        newErrors.initOfferDate = "La fecha de apertura de oferta es obligatoria";
      }

      // Validar que la fecha de inicio sea menor que la fecha de fin
      const startDate = new Date(initOfferDate || initOfferDateBD);
      const endDate = new Date(offerDate || offerDateBD);
      if (startDate >= endDate) {
        newErrors.offerDate = "La fecha de cierre debe ser posterior a la fecha de apertura";
      }
    }

    return newErrors;
  };

  const clearError = (field) => {
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const update = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    createElement(
      name,
      Newtext,
      mewprice,
      images,
      archive,
      Boolean(offer),
      offerDate ? offerDate : offerDateBD,
      offerPrice ? offerPrice : offerPriceBD,
      category ? category : categoryBD,
      initOfferDate ? initOfferDate : initOfferDateBD,
      currency ? currency : currencyBD,
      Boolean(destacar !== undefined ? destacar : destacarBD),
    );

    Swal.fire({
      position: "center",
      width: 500,
      height: 200,
      icon: "success",
      showConfirmButton: false,
      text: `Datos cargados`,
      timer: 1500,
    });
  };

  const handlePriceChange = (e) => {
    setprice(e.target.value);
  };



  const handleTextChange = (e) => {
    setNewText(e.target.value);
  };
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleFileChange = async (e) => {
    const newImages = [];
    for (let i = 0; i < e.target.files.length; i++) {
      // Verificar si el nombre de la imagen actual está presente en el otro array
      if (
        images.some((image) => image.nameOfImage === e.target.files[i].name)
      ) {
        Swal.fire({
          position: "center",
          width: 500,
          height: 200,
          icon: "warning",
          showConfirmButton: false,
          text: `La imagen ${e.target.files[i].name} ya fue cargada`,
          timer: 1500,
        });
      } else {
        newImages.push(e.target.files[i]);
      }
    }
    setArchive(newImages);
  };

  const handlePriceOffChange = (e) => {
    setOfferPrice(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleCoinChange = (e) => {
    setCurrency(e.target.value);
  };

  const handleOfferDate = (e) => {
    console.log(e.target.value);
    const date = new Date(e.target.value);
    const day = (date.getDate() + 1).toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Los meses en JavaScript son indexados desde 0, por eso se suma 1
    const year = date.getFullYear();
    const formatedDate = `${year}-${month}-${day}`; // Formato DD/MM/YYYY
    setOfferDate(formatedDate);
  };

  const handleInitOfferDate = (e) => {
    console.log(e.target.value);
    const date = new Date(e.target.value);
    const day = (date.getDate() + 1).toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Los meses en JavaScript son indexados desde 0, por eso se suma 1
    const year = date.getFullYear();
    const formatedDate = `${year}-${month}-${day}`; // Formato DD/MM/YYYY
    setInitOfferDate(formatedDate);
  };

  return (
    <Accordion.Item key={name} eventKey={i}>
      <Accordion.Header>
        <h2 className="titles blue">{categoryBD + " " + name}</h2>
      </Accordion.Header>
      <Accordion.Body>
        <div className="container-fluid">
          <Form>
            {/* Primera fila: Destino y Categoría */}
            <div className="row mb-3">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>
                    <span className="text-danger">*</span> Destino
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => {
                      handleNameChange(e);
                      clearError('name');
                    }}
                    isInvalid={!!errors.name}
                    placeholder="Escribe el nombre del destino"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>
                    <span className="text-danger">*</span> Categoría
                  </Form.Label>
                  <Form.Select
                    id="disabledSelect"
                    onChange={(e) => {
                      handleCategoryChange(e);
                      clearError('category');
                    }}
                    value={category ? category : categoryBD}
                    isInvalid={!!errors.category}
                  >
                    <option>Educativo</option>
                    <option>Internacional</option>
                    <option>Nacional</option>
                    <option>Escapada</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>

            {/* Segunda fila: Precio, Moneda y Oferta */}
            <div className="row mb-3">
              <div className="col-md-4">
                <Form.Group className="mb-3">
                  <Form.Label>
                    <span className="text-danger">*</span> Moneda
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
                    <option value="ARS">Pesos (ARS)</option>
                    <option value="USD">Dólares (USD)</option>
                    <option value="EUR">Euros (EUR)</option>
                    <option value="BRL">Reales (BRL)</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group controlId={name}>
                  <Form.Label>
                    <span className="text-danger">*</span> Precio
                  </Form.Label>
                  <InputGroup className="mb-3" hasValidation>
                    {errors.price && (
                      <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
                        {errors.price}
                      </Form.Control.Feedback>
                    )}
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
              </div>

              <div className="col-md-4 d-flex align-items-center">
                <Form.Check
                  type="switch"
                  label="Paquete en oferta"
                  onChange={handleVisibleChange}
                  checked={offer}
                  className="me-4"
                />
                <Form.Check
                  type="switch"
                  label="Destacar"
                  onChange={handleDestacarChange}
                  checked={destacar}
                />
              </div>
            </div>

            {/* Tercera fila: Oferta */}

            <div className="row mb-3">
              <div className="col-md-4">
                <Form.Group className="mb-3">
                  <Form.Label className={offer ? 'required' : ''}>
                    {offer && <span className="text-danger">*</span>} Fecha de apertura de oferta
                  </Form.Label>
                  <Form.Control
                    type="date"
                    value={initOfferDate || initOfferDateBD || ''}
                    onChange={(e) => {
                      handleInitOfferDate(e);
                      clearError('initOfferDate');
                    }}
                    disabled={!offer}
                    isInvalid={!!errors.initOfferDate}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.initOfferDate}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group className="mb-3">
                  <Form.Label className={offer ? 'required' : ''}>
                    {offer && <span className="text-danger">*</span>} Fecha de cierre de oferta
                  </Form.Label>
                  <Form.Control
                    type="date"
                    value={offerDate || offerDateBD || ''}
                    onChange={(e) => {
                      handleOfferDate(e);
                      clearError('offerDate');
                    }}
                    disabled={!offer}
                    isInvalid={!!errors.offerDate}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.offerDate}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group className="mb-3">
                  <Form.Label className={offer ? 'required' : ''}>
                    {offer && <span className="text-danger">*</span>} Precio de oferta
                  </Form.Label>
                  <InputGroup className={errors.offerPrice ? 'is-invalid' : ''}>
                    {errors.offerPrice && (
                      <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
                        {errors.offerPrice}
                      </Form.Control.Feedback>
                    )}
                    <InputGroup.Text id="basic-addon1">
                      {currencySymbols[currency]}
                    </InputGroup.Text>
                    <NumericFormat
                      name={offerPriceBD ? offerPriceBD : offerPrice}
                      disabled={!offer}
                      className="form-control"
                      placeholder={"$150.000,00"}
                      thousandSeparator="."
                      decimalSeparator=","
                      decimalScale={2}
                      value={offerPriceBD ? offerPriceBD : offerPrice}
                      fixedDecimalScale
                      onValueChange={(values) => {
                        handlePriceOffChange({
                          target: {
                            name,
                            value: values.floatValue,
                          },
                        });
                        if (values.floatValue > 0) {
                          clearError('offerPrice');
                        }
                      }}
                    />
                  </InputGroup>
                </Form.Group>

              </div>
            </div>


            {/* Texto presentación */}
            <div className="row mb-3">
              <div className="col-12">
                <Formgroup
                  name="text"
                  func={handleTextChange}
                  as="textarea"
                  label="Texto presentación"
                  placeholder="Escribe tu texto aquí"
                  value={text}
                />
              </div>
            </div>

            {/* Imágenes */}
            <div className="row">
              <div className="col-12">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="subtitles blue mb-0">
                    <span className="text-danger">*</span> Imágenes
                  </h4>
                  {errors.images && (
                    <span className="text-danger">{errors.images}</span>
                  )}
                </div>
                <Carousel fade className="fixed menu">
                  {images.map((imgs) => (
                    <Carousel.Item key={name + imgs.nameOfImage}>
                      <img src={imgs.url} className="" alt={imgs.nameOfImage} />
                      <Carousel.Caption className="deleteImage">
                        <Button
                          variant="danger"
                          className="eliminate"
                          onClick={() => deleteImage(name, imgs.nameOfImage)}
                        >
                          <ion-icon size="large" name="trash-outline"></ion-icon>
                        </Button>
                      </Carousel.Caption>
                    </Carousel.Item>
                  ))}
                </Carousel>
                <Formgroup
                  name={[]}
                  func={handleFileChange}
                  type="file"
                  label="Subir nuevas fotos"
                />
              </div>
            </div>

          </Form> {/* <-- CIERRE DEL FORM */}

          {/* Botones de acción */}
          <div className="d-flex justify-content-around mt-3">
            <Button onClick={() => update()}>Actualizar Datos</Button>
            <Button variant="danger" onClick={() => deleteExperience(name)}>
              Eliminar Paquete
            </Button>
          </div>
        </div>
      </Accordion.Body>

    </Accordion.Item>
  );
}

export default AccorBody;
