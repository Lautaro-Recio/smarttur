import { useState } from 'react';
import logo2 from '../../../assets/logo2.png';

function Nav() {
  const [navStyle, setNavStyle] = useState('hidden');

  const show = () => {
    setNavStyle(navStyle === 'hidden' ? 'show' : 'hidden');
  };

  const handleFadeOut = () => {
    setNavStyle('hidden');
  };

  return (
    <div className="nav">
      <img src={logo2} alt="" />
      <h1>Smart tur</h1>
      <button onClick={show}>
        <ion-icon size="large" name="menu-outline"></ion-icon>
      </button>
      <div className={navStyle}>
        <button onClick={handleFadeOut}>
          <ion-icon name="close-outline"></ion-icon>
        </button>
        <ul>
          <li className="subtitles"><a href="#Home">Home</a></li>
          <li className="subtitles"><a href="#offers">Ofertas</a></li>
          <li className="subtitles"><a href="#experiences">Paquetes</a></li>
          <li className="subtitles"><a href="#info">¿Quienes Somos?</a></li>
          <li className="subtitles"><a href="#contact">Contacto</a></li>

        </ul>
      </div>
    </div>
  );
}

export default Nav;
