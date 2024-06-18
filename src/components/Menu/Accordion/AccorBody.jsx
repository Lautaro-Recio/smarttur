import Accordion from "react-bootstrap/Accordion";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import Formgroup from "./Formgroup";
import Carousel from "react-bootstrap/Carousel";
import {
  createElement,
  deleteElement,
  deleteImages,
} from "../../../../Firebase";
import Swal from "sweetalert2";

function AccorBody(props) {
  const { name, text, price, images, offerPriceBD, offerBD, offerDateBD, i } = {
    ...props,
  };

  const [mewprice, setprice] = useState(price);
  const [Newtext, setNewText] = useState(text);
  const [offer, setOffer] = useState(offerBD);
  const [offerDate, setOfferDate] = useState("");
  const [offerPrice, setOfferPrice] = useState(0);
  const [archive, setArchive] = useState([]);
  const [visible, setVisible] = useState(false);

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
        deleteElement(name)
        Swal.fire({
          title: "Eliminado",
          text: `La ${name} fue borrada`,
          icon: "success",
        });
      }
    });
  };

  const handleVisibleChange = (e) => {
    if (e.target.value == "false") {
      setVisible(true);
      setOffer(true);
    } else {
      setVisible(false);
      setOffer(false);
    }
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

  const update = () => {
    createElement(
      name,
      Newtext,
      mewprice,
      images,
      archive,
      offerBD ? offerBD : visible,
      offerDateBD ? offerDateBD : offerDate,
      offerPriceBD ? offerPriceBD : offerPrice
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

  const handleOfferDate = (e) => {
    console.log(e.target.value);
    const date = new Date(e.target.value);
    const day = (date.getDate() + 1).toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Los meses en JavaScript son indexados desde 0, por eso se suma 1
    const year = date.getFullYear();
    const formatedDate = `${day}-${month}-${year}`; // Formato DD/MM/YYYY
    setOfferDate(formatedDate);
  };
  return (
    <Accordion.Item key={name} eventKey={i}>
      <Accordion.Header>
        <h2 className="titles blue">{name}</h2>
      </Accordion.Header>
      <Accordion.Body>
        <div className="grid">
          <Form>
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
            <div>
              <Form.Check
                label="Desea poner este producto en oferta?"
                onChange={handleVisibleChange}
                value={offer}
                checked={offer}
              />
              <div className={`${!offer ? "hidden" : "visible"}`}>
                <div className="flexAround">
                  <Formgroup
                    name={offerDateBD ? offerDateBD : offerDate}
                    func={handleOfferDate}
                    type="date"
                    label="Modificacion de cierre de oferta"
                  />
                  <div className="center">
                    <Form.Label>Fecha de oferta</Form.Label>
                    <br />
                    <Form.Label>
                      {offerDateBD ? offerDateBD : offerDate}
                    </Form.Label>
                  </div>
                </div>
                <Formgroup
                  name={offerPriceBD ? offerPriceBD : offerPrice}
                  func={handlePriceOffChange}
                  type="number"
                  label="Precio de oferta"
                />
              </div>
            </div>
          </Form>
          <div>
            <h4 className="subtitles center blue">Imagenes</h4>
            <Carousel fade className="fixed">
              {images.map((imgs) => {
                return (
                  <Carousel.Item key={name + imgs.nameOfImage}>
                    <img src={imgs.url} className="" alt={imgs.nameOfImage} />
                    <Carousel.Caption className="deleteImage">
                      <Button
                        variant="danger"
                        onClick={() => deleteImage(name, imgs.nameOfImage)}
                      >
                        <ion-icon size="large" name="trash-outline"></ion-icon>
                      </Button>
                    </Carousel.Caption>
                  </Carousel.Item>
                );
              })}
            </Carousel>

            <Formgroup
              name={[]}
              func={handleFileChange}
              type="file"
              label="Subir nuevas fotos"
            />
          </div>
        </div>
        <div className="flexAround">
          <Button onClick={() => update()}>Actualizar Datos</Button>
          <Button variant="danger" onClick={() => deleteExperience(name)}>
            Eliminar experiencia
          </Button>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default AccorBody;
