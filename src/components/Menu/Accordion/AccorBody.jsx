import Accordion from "react-bootstrap/Accordion";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import Formgroup from "./Formgroup";
import Carousel from "react-bootstrap/Carousel";
import { createElement } from "../../../../Firebase";

function AccorBody(props) {
  const { name, text, price, images, offerPriceBD, offerBD, offerDateBD, i } = {
    ...props,
  };

  const [mewprice, setprice] = useState(price);
  const [Newtext, setNewText] = useState(text);
  const [offer, setOffer] = useState(false);
  const [offerDate, setOfferDate] = useState("");
  const [offerPrice, setOfferPrice] = useState(0);
  const [archive, setArchive] = useState([]);
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (e) => {
    if (e.target.value == "false") {
      setVisible(true);
      setOffer(true);
    } else {
      setVisible(false);
      setOffer(false);
    }
  };

  const handlePriceChange = (e) => {
    setprice(e.target.value);
  };

  const handleTextChange = (e) => {
    setNewText(e.target.value);
  };

  const handleFileChange = (e) => {
    const newImages = [];
    for (let i = 0; i < images.length; i++) {
      const imageName = e.target.files[i].name;
      console.log(imageName);
      // Verificar si el nombre de la imagen actual está presente en el otro array
      if (images.some((image) => image.nameOfImage === imageName)) {
        console.log("La imagen", imageName, "está presente en ambos arrays.");
      } else {
        newImages.push(e.target.files[i]);
      }
      //TERMINAR ESTO
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
                value={offerBD ? offerBD : offer}
                checked={offerBD ? offerBD : offer}
              />
              <div className={`${offerBD == false ? "hidden" : "visible"}`}>
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
            <Carousel fade>
              {images.map((imgs) => {
                return (
                  <Carousel.Item key={name + imgs}>
                    <img src={imgs.url} className="" alt={imgs.name} />
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
        <Button
          onClick={() =>
            createElement(
              name,
              Newtext,
              mewprice,
              images,
              archive,
              offerBD ? offerBD : visible,
              offerDateBD ? offerDateBD : offerDate,
              offerPriceBD ? offerPriceBD : offerPrice
            )
          }
        >
          Actualizar
        </Button>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default AccorBody;
