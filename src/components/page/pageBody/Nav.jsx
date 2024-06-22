import { useState } from 'react';
import logo2 from '../../../assets/logo2.png';
import { Link } from 'react-router-dom';

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
          <li className="subtitles"><Link>Home</Link></li>
          <li className="subtitles"><Link>Home</Link></li>
          <li className="subtitles"><Link>Home</Link></li>
          <li className="subtitles"><Link>Home</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Nav;
