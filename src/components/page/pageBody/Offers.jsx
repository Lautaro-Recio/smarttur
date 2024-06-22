import { Button, Carousel } from "react-bootstrap";
function Offers() {
  return (
    <div className="containerWave">
      <div className=" pt-3">
        <h2 className="titles white center mb-1 fontLarge">Ofertas</h2>
        <Carousel className="fixed">
          <Carousel.Item interval={1000}>
            <img src="https://cloudfront-us-east-1.images.arcpublishing.com/infobae/XE3CZCLCOREFBF2LSJZSDFVGQY.jpg" alt="" />
            <Carousel.Caption className="deleteImage">
              <div className="deleteImageBody bg-whitee">
                <h3 className="titles blue bg-lightWhite fontMid">Europa</h3>
                <p className="blue bg-lightWhite parraf">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatum aperiam perferendis debitis molestiae ullam in
                  debitis molestiae ullam in Voluptatum aperiam perferendis
                </p>
                <div className="titles blue flex bg-lightWhite">
                  <p className="">$4000</p>
                  <p className="">$3000</p>
                </div>
                <Button>Mas Informacion</Button>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="wave"></div>
    </div>
  );
}

export default Offers;
