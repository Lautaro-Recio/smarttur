import logo from "../../../assets/logo.png";
function QuienesSomos() {
  return (
    <div className="quienesSomos">
      <h2 className="fontLarge blue titles center mt-5">¿Quienes somos?</h2>
      <div>
        <img className="logo" src={logo} alt="" />
        <p className="par blue ">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum
          delectus alias recusandae eveniet harum officia culpa repellat
          mollitia minima illum sequi doloribus, ipsam architecto reiciendis,
          distinctio numquam dolorem labore eius. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate maiores eveniet debitis natus, quaerat obcaecati minus nostrum fugit unde veniam iste tempora nemo optio est libero ex alias dolorem ad?
        </p>
      </div>
      <div>
        <p className="par blue">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum
          delectus alias recusandae eveniet harum officia culpa repellat
          mollitia minima illum sequi doloribus, ipsam architecto reiciendis,
          distinctio numquam dolorem labore eius.
        </p>

        <img
          src="https://images.adsttc.com/media/images/55f8/d1e9/e58e/cec1/f800/0304/large_jpg/PORTADA_S_TOUR_FRONT_03.jpg?1442370019"
          alt=""
        />
      </div>
    </div>
  );
}

export default QuienesSomos;
