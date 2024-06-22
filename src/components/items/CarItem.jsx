import { Button, Carousel } from "react-bootstrap";
function CarItem(props) {
  const { name, imgs, deleteImage, where } = {
    ...props,
  };
  console.log(imgs.url);
  return (
    <>
      {where === "accor" ? (
        <Carousel.Item>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/smartturpruebas.appspot.com/o/Experiencia%20Cordoba%2Fdescarga%20(3).jpg?alt=media&token=2ad3277f-16dd-4a12-b537-8562b9cee4ac"
            className=""
            alt={imgs.nameOfImage}
          />
          <Carousel.Caption className="deleteImage">
            <Button
              className="eliminate"
              variant="danger"
              onClick={() => deleteImage(name, imgs.nameOfImage)}
            >
              <ion-icon size="large" name="trash-outline"></ion-icon>
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      ) : (
        <Carousel.Item interval={1000}>
          <img src={imgs[0].url} alt={imgs[0].nameOfImage} />
          <Carousel.Caption className="deleteImage">
            <div className="deleteImageBody bg-whitee">
              <h3 className="titles blue bg-lightWhite fontMid">{name}</h3>
              <p className="blue bg-lightWhite parraf">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatum aperiam perferendis debitis molestiae ullam in
                debitis molestiae ullam in Voluptatum aperiam perferendis
              </p>
              <div className="titles blue flex bg-lightWhite">
                <p className="">$4000</p>
                <p className="">$5000</p>
              </div>
              <Button>Mas Informacion</Button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      )}
    </>
  );
}

export default CarItem;
