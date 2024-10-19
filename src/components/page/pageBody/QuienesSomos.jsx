import logo from "../../../assets/logo2.png";
import local1 from "../../../assets/dentroLocal.jpg";
import local2 from "../../../assets/frenteLocal.jpg";

function QuienesSomos() {
  return (
    <div className="quienesSomos mx-5" id="info">
      <h2 className="fontLarge blue titles center mt-5">¿Quienes somos?</h2>
      <div>
        <img className="logo pc" src={logo} alt="" />
        <img className="logo phone" src={logo} alt="" />

        <p className=" blue ">
          En Gruptur, hacemos de cada viaje una experiencia inolvidable. Con una
          experiencia consolidada en el sector, te ofrecemos itinerarios
          personalizados que combinan tus intereses y nuestro conocimiento
          experto. Desde escapadas urbanas hasta aventuras en la naturaleza,
          nuestro equipo se encarga de cada detalle para que disfrutes de un
          viaje sin preocupaciones. Disfruta de destinos únicos, guías locales
          apasionados y un servicio excepcional que se adapta a tus necesidades.
          Con Gruptur, cada aventura se convierte en un recuerdo valioso.
          ¡Prepárate para explorar el mundo con nosotros!
        </p>
      </div>
      <div className="quien2Div">
        <div className="mapContainer">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4049.2528106870277!2d-64.19171863053751!3d-31.414066212722446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432a2820bff223f%3A0xa40c45aff053e610!2zR2FsZXLDrWEgVsOtYSBOdWV2YQ!5e0!3m2!1ses!2sar!4v1729352289783!5m2!1ses!2sar"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        <div className="infoContainer">
          <p className="infoText blue">
            Estamos a solo unos minutos de las principales estaciones de
            transporte público, lo que facilita el acceso para todos nuestros
            clientes y socios.
            <br />
            <strong>Horario de Atención:</strong>
            <br />
            Lunes a Viernes: 9:00 AM - 6:00 PM
            <br />
            Sábado: 10:00 AM - 2:00 PM
            <br />
            <strong>Dirección:</strong>
            <br />9 de Julio 333, Galería Vía Nueva, Locales 06 y 07, Córdoba
            Capital, Argentina.
          </p>

          <div className="localImages">
            <img src={local1} alt="local 1" className=" local" />
            <img src={local2} alt="local 2" className=" local" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuienesSomos;
