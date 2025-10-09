import "bootstrap/dist/css/bootstrap.min.css";
import "react-quill/dist/quill.snow.css";
import { Accordion, Button, CardGroup, Form, InputGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import Formgroup from "./Formgroup";
import Carousel from "react-bootstrap/Carousel";
import { createElement, deleteElement, deleteImages, uploadPdf, getPdfUrl, deletePdf, getFeaturedImage, setFeaturedImage as setFeaturedImageDB } from "../../../../Firebase";
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

  console.log('initOfferDateBD ======> ', initOfferDateBD)
  const [mewprice, setprice] = useState(price);
  const [Newtext, setNewText] = useState(text);
  const [newName, setNewName] = useState(name);

  const [offer, setOffer] = useState(offerBD);
  const [destacar, setDestacar] = useState(destacarBD);

  const [offerDate, setOfferDate] = useState("");
  const [initOfferDate, setInitOfferDate] = useState("");

  const [offerPrice, setOfferPrice] = useState(offerPriceBD || 0);
  const [archive, setArchive] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState("");

  // Cargar la URL del PDF existente al montar el componente
  useEffect(() => {
    const loadPdfUrl = async () => {
      try {
        const url = await getPdfUrl(name);
        if (url) {
          setPdfUrl(url);
        }
      } catch (error) {
        console.error("Error al cargar el PDF:", error);
      }
    };

    loadPdfUrl();
  }, [name]);
  const [category, setCategory] = useState("");
  const [currency, setCurrency] = useState("ARS");
  const [errors, setErrors] = useState({});
  const [featuredImage, setFeaturedImage] = useState(null);

  // Cargar imagen destacada al montar/cambiar experiencia
  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const img = await getFeaturedImage(name);
        setFeaturedImage(img || null);
      } catch (e) {
        console.error('Error al cargar imagen destacada:', e);
      }
    };
    loadFeatured();
  }, [name]);

  const handleSetFeaturedImage = async (imageName) => {
    try {
      await setFeaturedImageDB(name, imageName);
      setFeaturedImage(imageName);
      Swal.fire({
        icon: 'success',
        title: 'Imagen destacada',
        text: 'Se actualizó la imagen destacada.',
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (e) {
      console.error('Error al establecer imagen destacada:', e);
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo marcar como destacada.' });
    }
  };

  // Eliminar PDF (tarifario) con confirmación
  const handleDeletePdf = async () => {
    if (!pdfUrl) return;
    const result = await Swal.fire({
      title: '¿Eliminar tarifario?',
      text: 'Esta acción eliminará el PDF actual de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (!result.isConfirmed) return;

    try {
      await deletePdf(name);
      setPdfUrl("");
      const input = document.getElementById('formFilePdf');
      if (input) input.value = '';
      Swal.fire({ icon: 'success', title: 'Eliminado', text: 'El tarifario se eliminó correctamente.', timer: 1400, showConfirmButton: false });
    } catch (err) {
      console.error('Error eliminando PDF:', err);
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo eliminar el tarifario.' });
    }
  };

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
    if (images.length === 0 && (!archive || archive.length === 0)) newErrors.images = "Debe haber al menos una imagen";
    if (!category && !categoryBD) newErrors.category = "Debe seleccionar una categoría";
    if (!currency) newErrors.currency = "Debe seleccionar una moneda";

    // Validar campos de oferta si está activada
    if (offer) {
      const currentOfferPrice = (offerPrice !== undefined && offerPrice !== null)
        ? offerPrice
        : (offerPriceBD || 0);


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

  const update = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      // Si hay un archivo PDF seleccionado, subirlo primero
      if (pdfFile) {
        const loadingSwal = Swal.fire({
          title: 'Subiendo PDF...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        try {
          const url = await uploadPdf(name, pdfFile);
          setPdfUrl(url);
          loadingSwal.close();
        } catch (error) {
          loadingSwal.close();
          throw new Error('Error al subir el PDF');
        }
      }

      // Actualizar los demás datos
      await createElement(
        name,
        Newtext,
        mewprice,
        images,
        archive,
        Boolean(offer),
        offerDate ? offerDate : offerDateBD,
        (offerPrice !== undefined && offerPrice !== null && offerPrice > 0) ? offerPrice : (offerPriceBD || 0),
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

      // Limpiar el input de archivo después de una carga exitosa
      if (pdfFile) {
        document.getElementById('formFilePdf').value = '';
        setPdfFile(null);
      }

    } catch (error) {
      console.error('Error al actualizar los datos:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Ocurrió un error al actualizar los datos',
        confirmButtonText: 'Aceptar'
      });
    }
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
                    value={newName}
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
                    Precio
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
                    Precio de oferta
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
                  value={Newtext}
                />
              </div>
            </div>

            {/* Imágenes */}
            <div className="row row-cell">

              <div className="col-6">
                <h4 className="subtitles center blue mb-0">
                  <span className="text-danger">*</span> Imágenes
                </h4>
                {errors.images && (
                  <span className="text-danger">{errors.images}</span>
                )}
                <Carousel fade className="fixed menu">
                  {images.map((imgs) => (
                    <Carousel.Item key={name + imgs.nameOfImage} style={{ position: 'relative' }}>
                      <img src={imgs.url} className="" alt={imgs.nameOfImage} />
                      {/* Botón para destacar imagen (estrella amarilla en esquina superior izquierda) */}


                      <Carousel.Caption className="deleteImage">
                        <Button
                          variant="danger"
                          className="eliminate"
                          onClick={() => deleteImage(name, imgs.nameOfImage)}
                        >
                          <ion-icon size="large" name="trash-outline"></ion-icon>
                        </Button>
                        <Button
                          variant={featuredImage === imgs.nameOfImage ? "warning" : "outline-warning"}
                          className="featured-star"
                          style={{ position: "absolute", top: 10, left: 10, zIndex: 5, pointerEvents: 'auto' }}
                          onClick={() => handleSetFeaturedImage(imgs.nameOfImage)}
                          title={featuredImage === imgs.nameOfImage ? "Imagen destacada" : "Marcar como destacada"}
                        >
                          <ion-icon
                            size="large"
                            name={featuredImage === imgs.nameOfImage ? "star" : "star-outline"}
                            style={{ color: "#ffc107" }}
                          ></ion-icon>
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
              <div className="col-6">
                <h4 className="subtitles center blue mb-0">
                  <span className="text-danger">*</span> Tarifario
                </h4>
                {pdfUrl && (
                  <>
                    <div className="mt-2 d-flex align-items-center gap-2 flex-wrap">
                      <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-success w-fit"
                      >
                        <i className="bi bi-file-earmark-pdf me-1"></i> Ver PDF actual
                      </a>
                      <Button variant="outline-danger" size="sm" className="w-fit" onClick={handleDeletePdf}>
                        <i className="bi bi-trash me-1"></i> Eliminar PDF
                      </Button>
                    </div>
                    {/* Vista previa embebida del PDF */}
                    <div className="mt-3">
                      <div style={{ height: "313px", width: "100%" }}>
                        <iframe
                          src={pdfUrl + '#view=FitH'}
                          title="Vista previa tarifario PDF"
                          style={{ width: '100%', height: '100%', border: 0 }}
                        />
                      </div>
                    </div>
                  </>
                )}
                <div className="mt-3">
                  <Form.Group controlId="formFilePdf" className="mb-3">
                    <Form.Label>PDF de tarifario</Form.Label>
                    <Form.Control
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setPdfFile(e.target.files[0])}
                      className="mb-2"
                    />
                    <Form.Text className="text-muted">
                      El archivo se subirá al guardar los cambios.
                    </Form.Text>
                  </Form.Group>

                </div>
              </div>
            </div>

          </Form>
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
