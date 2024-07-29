import logo from "../../../assets/logo.png";
import logoAcostado from "../../../assets/logoAcostado.png";

function QuienesSomos() {
  return (
    <div className="quienesSomos mx-5" id="info">
      <h2 className="fontLarge blue titles center mt-5">¿Quienes somos?</h2>
      <div>
        <img className="logo pc" src={logo} alt="" />
        <img className="logo phone" src={logoAcostado} alt="" />

        <p className="par blue ">
          En Smart Tur, hacemos de cada viaje una experiencia inolvidable. Con
          una experiencia consolidada en el sector, te ofrecemos itinerarios
          personalizados que combinan tus intereses y nuestro conocimiento
          experto. Desde escapadas urbanas hasta aventuras en la naturaleza,
          nuestro equipo se encarga de cada detalle para que disfrutes de un
          viaje sin preocupaciones. Disfruta de destinos únicos, guías locales
          apasionados y un servicio excepcional que se adapta a tus necesidades.
          Con Smart Tur, cada aventura se convierte en un recuerdo valioso.
          ¡Prepárate para explorar el mundo con nosotros!
        </p>
      </div>
      <div>
        <img
          src="https://images.adsttc.com/media/images/55f8/d1e9/e58e/cec1/f800/0304/large_jpg/PORTADA_S_TOUR_FRONT_03.jpg?1442370019"
          alt=""
          className="phone"
        />
        <p className="par blue">
          Nuestra sede principal está convenientemente ubicada en el corazón de
          la ciudad. Puedes encontrarnos en: Dirección: Calle Ejemplo 123,
          Oficina 456, Ciudad, País Estamos a solo unos minutos de las
          principales estaciones de transporte público, lo que facilita el
          acceso para todos nuestros clientes y socios. Si prefieres venir en
          coche, disponemos de estacionamiento gratuito para nuestros
          visitantes. Horario de Atención: Lunes a Viernes: 9:00 AM - 6:00 PM
          Sábado: 10:00 AM - 2:00 PM 
        </p>

        <img
          src="https://images.adsttc.com/media/images/55f8/d1e9/e58e/cec1/f800/0304/large_jpg/PORTADA_S_TOUR_FRONT_03.jpg?1442370019"
          alt=""
          className="pc"
        />
      </div>
    </div>
  );
}

export default QuienesSomos;
